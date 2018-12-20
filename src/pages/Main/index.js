import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withState, compose } from 'recompose';

import { Creators as UserActions } from '../../store/ducks/users';

import Panel from '../../components/Panel';
import Map from '../../components/Map';
import ModalInput from '../../components/ModalInput';

const Main = ({ users, addUserRequest, modal, setModal }) => (
  <Fragment>
    <Panel users={users.data} />
    <Map />
    <ModalInput opened={modal} userRequest={addUserRequest} updateStatus={setModal} />
  </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

const mapStateToProps = state => ({
  users: state.users,
});

const enchance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('modal', 'setModal', false),
);

export default enchance(Main);
