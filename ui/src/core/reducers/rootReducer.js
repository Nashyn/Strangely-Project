import { combineReducers } from 'redux';
import loginSignupReducer from '../../components/organisms/LoginSignup/data/LoginSignup.reducer';

const rootReducer = combineReducers({
  loginSignupReducer,
});

export default rootReducer;
