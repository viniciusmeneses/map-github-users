// TYPES
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_FAILURE: 'users/ADD_FAILURE',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
};

// REDUCER
export default function users(state = { loading: false, data: [], error: '' }, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: [...state.data, action.payload.userData],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

// ACTIONS
export const Creators = {
  addUserRequest: username => ({
    type: Types.ADD_REQUEST,
    payload: { username },
  }),
  addUserSuccess: userData => ({
    type: Types.ADD_SUCCESS,
    payload: { userData },
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
};
