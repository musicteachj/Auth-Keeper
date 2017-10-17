import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import profileReducer from './profile';
import usersReducer from './users';
import profileImageReducer from './profileImage';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer,
  profileImage: profileImageReducer
});

export default rootReducer;
