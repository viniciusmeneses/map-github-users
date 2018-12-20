import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withState, compose, withHandlers } from 'recompose';

import { Creators as UserActions } from '../../store/ducks/users';

import Panel from '../../components/Panel';
import Map from '../../components/Map';
import ModalInput from '../../components/ModalInput';

const Main = ({ users, createUserRequest, modal }) => (
  <Fragment>
    <Panel users={users.data} />
    <Map />
    <ModalInput opened={modal} userRequest={createUserRequest} />
  </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

const mapStateToProps = state => ({
  users: state.users,
});

const enchance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('modal', 'setModal', true),
  withHandlers({
    createUserRequest: props => (username) => {
      props.addUserRequest(username);
      props.setModal(false);
    },
  }),
);

export default enchance(Main);
