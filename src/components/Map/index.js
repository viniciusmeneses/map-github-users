import React from 'react';
import {
  compose, lifecycle, withProps, withState, withHandlers,
} from 'recompose';
import MapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ viewport, handleMapClick, handleMapViewport }) => (
  <MapGL
    {...viewport}
    onClick={handleMapClick}
    mapStyle="mapbox://styles/mapbox/basic-v9"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={handleMapViewport}
  >
    <Marker
      latitude={-23.5439948}
      longitude={-46.6065452}
      onClick={handleMapClick}
      captureClick
    >
      <img
        style={{
          borderRadius: 100,
          width: 48,
          height: 48,
        }}
        alt="Github User"
        src="http://www.conaaud.com.br/wp-content/uploads/2018/09/avatar-png-1.png"
      />
    </Marker>
  </MapGL>
);

const enchance = compose(
  withState('viewport', 'setViewport', {
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: -23.5439948,
    longitude: -46.6065452,
    zoom: 14,
  }),
  withProps({
    resizeMap() {
      this.setViewport(viewport => ({
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('resize', () => this.props.resizeMap());
      this.props.resizeMap();
    },
    componentWillUnmount() {
      window.removeEventListener('resize', () => this.props.resizeMap());
    },
  }),
  withHandlers({
    handleMapClick: props => (e) => {
      const [latitude, longitude] = e.lngLat;
      alert(`Latitude: ${latitude} \nLongitude: ${longitude}`);
    },
    handleMapViewport: props => viewport => props.setViewport(() => (viewport)),
  }),
);

export default enchance(Map);
