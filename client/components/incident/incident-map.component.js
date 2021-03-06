'use strict';

import MapBoxGL from 'mapbox-gl';
import _ from 'lodash';
import geojsonExtent from '@mapbox/geojson-extent';

export default class IncidentMapComponent {
  constructor(mapboxConfig) {
    'ngInject';

    this.mapboxConfig = mapboxConfig;
  }

  $onInit() {
    this.initialized = true;

    const features = [];
    _.forEach(this.incidents, incident => {
      const coordinates = [incident.address.longitude, incident.address.latitude];

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates
        },
        properties: {
          title: incident.description.incident_number,
          icon: 'marker'
        }
      });
    });

    const geojson = {
      type: 'FeatureCollection',
      features
    };

    const bounds = geojsonExtent(geojson);
    const center = features.length > 0 ? features[0].geometry.coordinates : undefined;

    const map = new MapBoxGL.Map({
      container: 'incident-map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 12,
      pitch: 60,
      center
    });

    map.on('load', () => {
      map.addLayer({
        id: 'incidents',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      // Apply padding manually since MapBoxGL seems to be a bit glitchy here.
      const padding = 0.0015;
      bounds[0] -= padding;
      bounds[1] -= padding;
      bounds[2] += padding;
      bounds[3] += padding;

      map.fitBounds(bounds);
    });
  }
}
