import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withState, compose, withHandlers } from 'recompose';
import { ToastContainer } from 'react-toastify';

import { Creators as UserActions } from '../../store/ducks/users';

import Panel from '../../components/Panel';
import Map from '../../components/Map';
import ModalInput from '../../components/ModalInput';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const Main = ({ users, createUserRequest, modal, setModal, addLatLong }) => (
  <Fragment>
    <Panel users={users.data} />
    <Map users={users.data} passLatLong={addLatLong} />
    <ModalInput opened={modal} userRequest={createUserRequest} updateStatus={setModal} />
    <ToastContainer />
  </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

const mapStateToProps = state => ({
  users: state.users,
});

const enchance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('modal', 'setModal', false),
  withState('currentLatLong', 'setCurrentLatLong', {
    lat: 0,
    long: 0,
  }),
  withHandlers({
    addLatLong: props => (long, lat) => {
      props.setCurrentLatLong({
        ...props.currentLatLong,
        lat,
        long,
      });
      props.setModal(true);
    },
    createUserRequest: props => (username) => {
      props.addUserRequest({ ...props.currentLatLong, username });
      props.setModal(false);
    },
  }),
);

export default enchance(Main);
