import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreglWorkerUrl from 'maplibre-gl/dist/maplibre-gl-csp-worker.js?url';
import './style.css';

const sourceId = 'my-geojson';
const pointLayerId = 'my-points';
const pdfLinkPrefix =
  'https://www.accessenvironment.ene.gov.on.ca/AEWeb/ae/ViewDocument.action?documentRefID=';

// Force a stable worker bundle path for Vite/browser compatibility.
maplibregl.setWorkerUrl(maplibreglWorkerUrl);

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors'
      }
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }
    ]
  },
  center: [-79.3832, 43.6532],
  zoom: 11
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char] || char;
  });

map.on('load', async () => {
  const response = await fetch('data/EASR-AIR-TYPE_APPROVAL.geojson');
  if (!response.ok) {
    throw new Error(`Failed to load GeoJSON: ${response.status} ${response.statusText}`);
  }
  const geojson = await response.json();

  map.addSource(sourceId, {
    type: 'geojson',
    generateId: true,
    data: geojson
  });

  map.addLayer({
    id: pointLayerId,
    type: 'circle',
    source: sourceId,
    paint: {
      'circle-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#f59e0b',
        ['match', ['get', 'APPROVAL_N'],
          ['R-010-8117713841', 'R-010-1117714393', 'R-010-5117184906',
           'R-010-5116455461', 'R-010-8116545441', 'R-010-1115938005',
           'R-010-8115379009', 'R-010-7111813541', 'R-010-9115462187',
           'R-010-4110707431', 'R-010-3110187224'],
          '#ec4899',
          '#9ca3af'
        ]
      ],
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        8,
        5
      ],
      'circle-opacity': 0.9,
      'circle-stroke-color': '#1f2937',
      'circle-stroke-width': 1
    }
  });

  const bounds = new maplibregl.LngLatBounds();
  let hasPointCoordinates = false;
  for (const feature of geojson.features) {
    const coordinates =
      feature.geometry?.type === 'Point' ? feature.geometry.coordinates : null;
    if (Array.isArray(coordinates) && coordinates.length >= 2) {
      bounds.extend([coordinates[0], coordinates[1]]);
      hasPointCoordinates = true;
    }
  }
  if (hasPointCoordinates) {
    map.fitBounds(bounds, { padding: 40, maxZoom: 14 });
  }

  let hoveredFeatureId = null;

  map.on('mousemove', pointLayerId, (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features?.[0];
    if (!feature) return;

    if (hoveredFeatureId !== null) {
      map.setFeatureState(
        { source: sourceId, id: hoveredFeatureId },
        { hover: false }
      );
    }

    hoveredFeatureId = feature.id;
    map.setFeatureState(
      { source: sourceId, id: hoveredFeatureId },
      { hover: true }
    );
  });

  map.on('mouseleave', pointLayerId, () => {
    map.getCanvas().style.cursor = '';
    if (hoveredFeatureId !== null) {
      map.setFeatureState(
        { source: sourceId, id: hoveredFeatureId },
        { hover: false }
      );
    }
    hoveredFeatureId = null;
  });

  map.on('click', pointLayerId, (e) => {
    const feature = e.features?.[0];
    if (!feature) return;

    const p = feature.properties || {};
    const pdfHref = p.PDF_LINK
      ? `${pdfLinkPrefix}${encodeURIComponent(String(p.PDF_LINK))}`
      : null;

    const row = (label, value) =>
      value != null && value !== ''
        ? `<tr><td style="color:#555;padding:2px 8px 2px 0;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:2px 0;">${escapeHtml(value)}</td></tr>`
        : '';

    const popupHtml = `
      <div style="font-family:system-ui,sans-serif;font-size:13px;max-width:300px;">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px;border-bottom:2px solid #ec4899;padding-bottom:4px;">${escapeHtml(p.BUSINESS_N ?? '')}</div>
        <table style="border-collapse:collapse;width:100%;">
          ${row('Registration #', p.APPROVAL_N)}
          ${row('Address', p.ADDRESS)}
          ${row('Municipality', p.MUNICIPALI)}
          ${row('Postal Code', p.POSTAL_COD)}
          ${row('Status', p.STATUS)}
          ${row('Approval Type', p.APPROVAL_T)}
          ${row('MOE District', p.MOE_DISTRI)}
          ${row('Source Water Protection', p.SWP_AREA_N)}
          ${pdfHref ? `<tr><td style="color:#555;padding:2px 8px 2px 0;">Document</td><td><a href="${pdfHref}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">View PDF</a></td></tr>` : ''}
        </table>
      </div>`;

    new maplibregl.Popup({ maxWidth: '320px' })
      .setLngLat(e.lngLat)
      .setHTML(popupHtml)
      .addTo(map);
  });
});
