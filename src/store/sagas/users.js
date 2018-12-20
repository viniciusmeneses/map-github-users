import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const isDuplicated = yield select(state => state.users.data.find(
      user => user.login === action.payload.data.username,
    ));

    if (isDuplicated) {
      return yield put(UserActions.addUserFailure('User already added!'));
    }

    const { data } = yield call(api.get, `/users/${action.payload.data.username}`);

    const userData = {
      login: data.login,
      name: data.name,
      url: data.html_url,
      avatar: data.avatar_url,
      lat: action.payload.data.lat,
      long: action.payload.data.long,
    };

    yield put(UserActions.addUserSuccess(userData));
  } catch (err) {
    yield put(UserActions.addUserFailure('An error occurred!'));
  }
}
