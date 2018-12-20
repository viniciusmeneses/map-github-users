import React from 'react';
import {
  compose, lifecycle, withProps, withState, withHandlers,
} from 'recompose';
import MapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

const Map = ({
  viewport, handleMapClick, handleMapViewport, users,
}) => (
  <MapGL
    {...viewport}
    onClick={handleMapClick}
    mapStyle="mapbox://styles/mapbox/basic-v9"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={handleMapViewport}
  >
    {users.map(user => (
      <Marker
        key={user.login}
        latitude={user.lat}
        longitude={user.long}
        onClick={handleMapClick}
        captureClick
      >
        <a href={user.url} target="_blank" rel="noopener noreferrer" className="map__marker-wrapper">
          <img className="map__marker-avatar" alt={user.name} src={user.avatar} />
        </a>
      </Marker>
    ))}
  </MapGL>
);

const enchance = compose(
  withState('viewport', 'setViewport', {
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: 0,
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
      const [longitude, latitude] = e.lngLat;
      props.passLatLong(longitude, latitude);
    },
    handleMapViewport: props => viewport => props.setViewport(() => viewport),
  }),
);

export default enchance(Map);
