/* eslint-disable no-console */
/* external import */
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { message } from 'antd';
/* styles */
import styles from './GoogleAuth.module.scss';

function GoogleAuth() {
  const login = useGoogleLogin({
    // onSuccess: tokenResponse => message.info(tokenResponse.access_token),
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      message.info('logged in...');
    },
    onError: () => message.error('Login Failed'),

  });

  const handleOnLoginClick = () => {
    login();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.socialContainer}
      onClick={handleOnLoginClick}
    >
      <i className="fab fa-google-plus-g" />
    </div>
  );
}

export default GoogleAuth;
