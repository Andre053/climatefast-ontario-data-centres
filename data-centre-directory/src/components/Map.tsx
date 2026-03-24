'use client'

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../globals.css';

import * as React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

import { Map, Popup } from 'react-map-gl/maplibre';
import { useRef, useCallback } from 'react';
import { MapRef } from 'react-map-gl/maplibre';

import {env} from 'node:process'

/*
    Refactored code from Sonal's work in webmap
    - To display in React, must change it into a component to display on a page
    - react-map-gl https://github.com/visgl/react-map-gl
    - Or use react-maplibre might be the react alternative https://visgl.github.io/react-maplibre/docs/get-started
    - Get proper mapstyle using geoapify https://apidocs.geoapify.com/docs/maps/map-tiles/
*/

const DatacenterMap = () => {
    // map reference https://visgl.github.io/react-map-gl/docs/api-reference/maplibre/map
    const maxZoom = 1;

    const width = 1000;
    const height = 800;

    const sourceId = 'my-geojson';
    const pointLayerId = 'my-points';
    const pdfLinkPrefix =
    'https://www.accessenvironment.ene.gov.on.ca/AEWeb/ae/ViewDocument.action?documentRefID=';

    const apiKey = env.GEOAPIFY_KEY
    const tilesUrl = "https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=" + apiKey
    

    // set all the callbacks as Sonal did
    
    const escapeHtml = (value: any) =>
        String(value).replace(/[&<>"']/g, (char) => {
            const entities: any = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
        return entities[char] || char;
    });
    // 1. add navigation control to 'top-right' ??

    const mapRef = useRef<MapRef>(null)
    const popupRef = useRef<maplibregl.Popup>(null)

    const onMapLoad = React.useCallback(async () => {
        const map = mapRef.current; // exposes map methods safe to call on load
        if (!map) {
            return 
        }

        const mapInstance = map.getMap() // used to expose hidden members

        // 1. get the data from public
        const response = await fetch('data/EASR-AIR-TYPE_APPROVAL.geojson');
        if (!response.ok) {
            throw new Error(`Failed to load GeoJSON: ${response.status} ${response.statusText}`);
        }
        const geojson = await response.json();

        // 2. add source data
        mapInstance.addSource(sourceId, {
            type: 'geojson',
            generateId: true,
            data: geojson
        })
        
        mapInstance.addLayer({
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
            console.log({hasPointCoordinates})
            map.fitBounds(bounds, { padding: 40, maxZoom: 14 });
        }
        
        let hoveredFeatureId: any | null;
        hoveredFeatureId = null;
        // on move
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

            //const popupHtml = rows
            //    ? `<table>${rows}</table>`
            //    : '<em>No properties available</em>';
            
            //new maplibregl.Popup()
            //    .setLngLat(e.lngLat)
            //    .setHTML(popupHtml)
            //    .addTo(map);

        })
    }, [])

    /**
     * 
    <Popup latitude={0} longitude={0} ref={popupRef}>
        Tooltip
    </Popup>
     */
    return (
        <Map
            ref={mapRef}
            onLoad={onMapLoad}
            style={{
                width: width, 
                height: height
            }}
            mapStyle={tilesUrl}
        />
    )
}

export default DatacenterMap