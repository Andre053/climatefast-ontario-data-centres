'use client';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../globals.css';

import * as React from 'react';
import { Map } from 'react-map-gl/maplibre';
import { useRef } from 'react';
import { MapRef } from 'react-map-gl/maplibre';

import { env } from 'node:process';

/*
    Refactored code from Sonal's work in webmap
    - To display in React, must change it into a component to display on a page
    - react-map-gl https://github.com/visgl/react-map-gl
    - Or use react-maplibre might be the react alternative https://visgl.github.io/react-maplibre/docs/get-started
    - Get proper mapstyle using geoapify https://apidocs.geoapify.com/docs/maps/map-tiles/
*/

const CONFIRMED_IDS = [
  'R-010-8117713841', 'R-010-1117714393', 'R-010-5117184906',
  'R-010-5116455461', 'R-010-8116545441', 'R-010-1115938005',
  'R-010-8115379009', 'R-010-7111813541', 'R-010-9115462187',
  'R-010-4110707431', 'R-010-3110187224'
];

const DatacenterMap = () => {
  const sourceId = 'my-geojson';
  const pointLayerId = 'my-points';
  const pdfLinkPrefix =
    'https://www.accessenvironment.ene.gov.on.ca/AEWeb/ae/ViewDocument.action?documentRefID=';

  const apiKey = env.GEOAPIFY_KEY;
  const tilesUrl =
    'https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=' + apiKey;

  const escapeHtml = (value: any) =>
    String(value).replace(/[&<>"']/g, char => {
      const entities: any = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return entities[char] || char;
    });

  const mapRef = useRef<MapRef>(null);

  const onMapLoad = React.useCallback(async () => {
    const map = mapRef.current;
    if (!map) return;

    const mapInstance = map.getMap();

    const response = await fetch('data/EASR-AIR-TYPE_APPROVAL.geojson');
    if (!response.ok) {
      throw new Error(
        `Failed to load GeoJSON: ${response.status} ${response.statusText}`
      );
    }
    const geojson = await response.json();

    mapInstance.addSource(sourceId, {
      type: 'geojson',
      generateId: true,
      data: geojson
    });

    mapInstance.addLayer({
      id: pointLayerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#f59e0b',
          ['match', ['get', 'APPROVAL_N'],
            CONFIRMED_IDS,
            '#ec4899',
            '#9ca3af'
          ]
        ],
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          14,
          ['match', ['get', 'APPROVAL_N'],
            CONFIRMED_IDS,
            12,
            5
          ]
        ],
        'circle-opacity': [
          'match', ['get', 'APPROVAL_N'],
          CONFIRMED_IDS, 1,
          0.75
        ],
        'circle-stroke-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          '#ffffff',
          ['match', ['get', 'APPROVAL_N'],
            CONFIRMED_IDS,
            '#ffffff',
            '#374151'
          ]
        ],
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3,
          ['match', ['get', 'APPROVAL_N'],
            CONFIRMED_IDS,
            2.5,
            1
          ]
        ]
      }
    });

    // Zoom to the confirmed data centres, fall back to all points
    const confirmedBounds = new maplibregl.LngLatBounds();
    let hasConfirmed = false;
    const allBounds = new maplibregl.LngLatBounds();
    let hasAny = false;

    for (const feature of geojson.features) {
      const coords =
        feature.geometry?.type === 'Point' ? feature.geometry.coordinates : null;
      if (!Array.isArray(coords) || coords.length < 2) continue;
      allBounds.extend([coords[0], coords[1]]);
      hasAny = true;
      if (CONFIRMED_IDS.includes(feature.properties?.APPROVAL_N)) {
        confirmedBounds.extend([coords[0], coords[1]]);
        hasConfirmed = true;
      }
    }

    if (hasConfirmed) {
      map.fitBounds(confirmedBounds, { padding: 80, maxZoom: 11 });
    } else if (hasAny) {
      map.fitBounds(allBounds, { padding: 40, maxZoom: 14 });
    }

    let hoveredFeatureId: any | null = null;

    map.on('mousemove', pointLayerId, e => {
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

    map.on('click', pointLayerId, e => {
      const feature = e.features?.[0];
      if (!feature) return;

      const p = feature.properties || {};
      const pdfHref = p.PDF_LINK
        ? `${pdfLinkPrefix}${encodeURIComponent(String(p.PDF_LINK))}`
        : null;

      const row = (label: string, value: any) =>
        value != null && value !== ''
          ? `<tr><td style="color:#374151;font-weight:600;padding:3px 10px 3px 0;white-space:nowrap;vertical-align:top;">${label}</td><td style="color:#111827;padding:3px 0;">${escapeHtml(value)}</td></tr>`
          : '';

      const popupHtml = `
        <div style="font-family:system-ui,sans-serif;font-size:13px;max-width:300px;color:#111827;">
          <div style="font-weight:700;font-size:14px;margin-bottom:6px;border-bottom:2px solid #ec4899;padding-bottom:4px;color:#111827;">${escapeHtml(p.BUSINESS_N ?? '')}</div>
          <table style="border-collapse:collapse;width:100%;">
            ${row('Registration #', p.APPROVAL_N)}
            ${row('Address', p.ADDRESS)}
            ${row('Municipality', p.MUNICIPALI)}
            ${row('Postal Code', p.POSTAL_COD)}
            ${row('Status', p.STATUS)}
            ${row('Approval Type', p.APPROVAL_T)}
            ${row('MOE District', p.MOE_DISTRI)}
            ${row('Source Water Protection', p.SWP_AREA_N)}
            ${pdfHref ? `<tr><td style="color:#374151;font-weight:600;padding:3px 10px 3px 0;">Document</td><td><a href="${pdfHref}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">View PDF</a></td></tr>` : ''}
          </table>
        </div>`;

      new maplibregl.Popup({ maxWidth: '320px' })
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(mapInstance);
    });
  }, []);

  return (
    <Map
      ref={mapRef}
      onLoad={onMapLoad}
      style={{ width: '100%', height: 'clamp(400px, 70vh, 800px)' }}
      mapStyle={tilesUrl}
    />
  );
};

export default DatacenterMap;
