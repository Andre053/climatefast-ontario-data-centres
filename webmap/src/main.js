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
        '#3b82f6'
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

    const properties = feature.properties || {};
    const rows = Object.entries(properties)
      .map(([key, value]) => {
        const safeKey = escapeHtml(key);
        let valueHtml = escapeHtml(value ?? '');

        if (key === 'PDF_LINK' && value) {
          const href = `${pdfLinkPrefix}${encodeURIComponent(String(value))}`;
          valueHtml = `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">Link</a>`;
        }

        return `<tr><th style="text-align:left;padding-right:10px;vertical-align:top;">${safeKey}</th><td>${valueHtml}</td></tr>`;
      })
      .join('');
    const popupHtml = rows
      ? `<table>${rows}</table>`
      : '<em>No properties available</em>';

    new maplibregl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(popupHtml)
      .addTo(map);
  });
});
