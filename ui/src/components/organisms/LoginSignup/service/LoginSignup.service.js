// import { http } from '@http';
import axios from 'axios';
import { loginSignupService } from '../../../../services/urls';

export const userRegistration = payload => axios.post(loginSignupService.userRegistration, payload);
export const userLogin = payload => axios.post(loginSignupService.userLogin, payload);
export const forgetPass = payload => axios.post(loginSignupService.forgetPass, payload);
export const sendUserNameResetLink = payload => axios.post(loginSignupService.sendUserNameResetLink, payload);
export const logoutUser = payload => axios.post(loginSignupService.logoutUser, payload);
