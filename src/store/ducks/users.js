import { toast } from 'react-toastify';

// TYPES
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_FAILURE: 'users/ADD_FAILURE',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
};

// REDUCER
export default function users(state = { loading: false, data: [] }, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.userData],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

// ACTIONS
export const Creators = {
  addUserRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: { data },
  }),
  addUserSuccess: (userData) => {
    toast.success('Github user added!', {
      className: 'main__toast-success',
    });
    return {
      type: Types.ADD_SUCCESS,
      payload: { userData },
    };
  },
  addUserFailure: (error) => {
    toast.error(error, {
      className: 'main__toast-error',
    });
    return {
      type: Types.ADD_FAILURE,
      payload: { error },
    };
  },
};
