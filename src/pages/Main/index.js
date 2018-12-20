import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withState, compose, withHandlers, withProps, lifecycle,
} from 'recompose';
import { ToastContainer } from 'react-toastify';

import { Creators as UserActions } from '../../store/ducks/users';

import Panel from '../../components/Panel';
import Map from '../../components/Map';
import ModalInput from '../../components/ModalInput';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const Main = ({
  users,
  createUserRequest,
  removeUser,
  modal,
  setModal,
  addLatLong,
  mapViewport,
  findUserOnMap,
  handleMapViewport,
}) => (
  <Fragment>
    <Panel users={users.data} removeUser={removeUser} findUser={findUserOnMap} />
    <Map
      users={users.data}
      passLatLong={addLatLong}
      viewport={mapViewport}
      onMapViewportChange={handleMapViewport}
    />
    <ModalInput opened={modal} userRequest={createUserRequest} updateStatus={setModal} />
    <ToastContainer />
  </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

const mapStateToProps = state => ({
  users: state.users,
});

const enchance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modal', 'setModal', false),
  withState('currentLongLat', 'setCurrentLongLat', {
    long: 0,
    lat: 0,
  }),
  withState('mapViewport', 'setMapViewport', {
    height: window.height,
    width: window.width,
    longitude: 0,
    latitude: 0,
    zoom: 0,
  }),
  withProps({
    resizeMap() {
      this.setMapViewport(viewport => ({
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
    addLatLong: props => (long, lat) => {
      props.setCurrentLongLat({
        ...props.currentLongLat,
        long,
        lat,
      });
      props.setModal(true);
    },
    createUserRequest: props => (username) => {
      props.addUserRequest({ ...props.currentLongLat, username });
      props.setModal(false);
    },
    findUserOnMap: props => (longitude, latitude) => props.setMapViewport(viewport => ({
      ...viewport,
      longitude,
      latitude,
      zoom: 14,
    })),
    handleMapViewport: props => viewport => props.setMapViewport({ ...viewport }),
  }),
);

export default enchance(Main);
