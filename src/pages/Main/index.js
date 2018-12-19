import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UserActions } from '../../store/ducks/users';

import Panel from '../../components/Panel';
import Map from '../../components/Map';


const Main = ({ users, addUserRequest }) => (
  <Fragment>
    <Panel users={users.data} />
    <Map />
  </Fragment>
);

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
