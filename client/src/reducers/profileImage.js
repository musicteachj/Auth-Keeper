import { SET_PROFILE_IMAGE } from '../actions/types';

export default function(state = '', action) {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return action.payload;
    default:
      return state;
  }
}


