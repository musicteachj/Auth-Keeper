import { FETCH_PROFILE, UPDATE_PROFILE, UPDATE_PROFILE_IMAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE:
    case UPDATE_PROFILE:
      return action.payload;
    case UPDATE_PROFILE_IMAGE:
      console.log(action.payload);
      return {...state, imageUrl: action.payload};
    default:
      return state;
  }
}


