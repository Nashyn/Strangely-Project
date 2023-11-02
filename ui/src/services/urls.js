export const baseURL = 'http://172.17.1.123:8073';

export const loginSignupService = {
  userRegistration: `${baseURL}/registerSS`,
  userLogin: `${baseURL}/loginSS`,
  forgetPass: `${baseURL}/resetpasswordSS`,
  sendUserNameResetLink: `${baseURL}/resetSS`,
  logoutUser: `${baseURL}/logoutSS`,
};
