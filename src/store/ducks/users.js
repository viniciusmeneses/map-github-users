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
        data: [...state.data, action.payload.user],
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
    type: TypeError.ADD_REQUEST,
    payload: { username },
  }),
  addUserSuccess: user => ({
    type: Types.ADD_SUCCESS,
    payload: { user },
  }),
  addUserError: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
};
