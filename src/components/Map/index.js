import React from 'react';
import { compose, withHandlers } from 'recompose';
import MapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

const Map = ({
  viewport, handleMapClick, users, onMapViewportChange,
}) => (
  <MapGL
    {...viewport}
    width={window.innerWidth}
    height={window.innerHeight}
    onClick={handleMapClick}
    mapStyle="mapbox://styles/mapbox/basic-v9"
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={onMapViewportChange}
  >
    {users.map(user => (
      <Marker
        key={user.login}
        latitude={user.lat}
        longitude={user.long}
        onClick={handleMapClick}
        captureClick
      >
        <a
          href={user.url}
          target="_blank"
          rel="noopener noreferrer"
          className="map__marker-wrapper"
        >
          <img className="map__marker-avatar" alt={user.name} src={user.avatar} />
        </a>
      </Marker>
    ))}
  </MapGL>
);

Map.propTypes = {
  viewport: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
  }).isRequired,
  handleMapClick: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
      avatar: PropTypes.string,
      lat: PropTypes.number,
      long: PropTypes.number,
    }),
  ).isRequired,
  onMapViewportChange: PropTypes.func.isRequired,
};

const enchance = compose(
  withHandlers({
    handleMapClick: props => (e) => {
      const [longitude, latitude] = e.lngLat;
      props.passLatLong(longitude, latitude);
    },
  }),
);

export default enchance(Map);
