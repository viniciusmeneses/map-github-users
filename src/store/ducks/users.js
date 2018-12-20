import { toast } from 'react-toastify';

// TYPES
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_FAILURE: 'users/ADD_FAILURE',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  REMOVE_USER: 'users/REMOVE_USER',
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
    case Types.REMOVE_USER:
      return {
        ...state,
        data: state.data.filter(user => user.login !== action.payload.userLogin),
      };
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
  removeUser: (userLogin) => {
    toast.info('Github user removed!', {
      className: 'main__toast-info',
    });
    return {
      type: Types.REMOVE_USER,
      payload: { userLogin },
    };
  },
};
