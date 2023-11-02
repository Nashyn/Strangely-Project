import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Button, Input, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { setLoading } from '../../data/LoginSingup.actions';
import {
  EMPTY_FUNCTION,
} from '../../../../../resources/shared/global.constant';
import { forgetPass, sendUserNameResetLink } from '../../service/LoginSignup.service';
import styles from './forgetPassword.module.scss';

function ForgotPassword({
  isLoading,
  onSetLoading,
}) {
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('resetToken');

  const handleUsernameChange = (evt) => {
    const {
      currentTarget: { value },
    } = evt;
    setUsername(value);
  };

  const handlePassChange = (evt) => {
    const {
      currentTarget: { value },
    } = evt;
    setPass(value);
  };

  const handleResetPassword = async () => {
    onSetLoading(true);
    const payload = {
      resetToken,
      newPassword: password,
    };
    forgetPass(payload)
      .then(() => {
        message.success('Password reset email sent successfully');
      })
      .catch(() => {
        message.error({
          content: 'Password reset failed. Please try again.',
          duration: 2,
        });
      })
      .finally(() => {
        onSetLoading(false);
      });
  };

  const handleSendResetLink = () => {
    const payload = {
      username,
    };
    sendUserNameResetLink(payload)
      .then(() => {
        message.success('If the user exists, we will send you the reset link');
      })
      .catch(() => {
        message.error({
          content: 'Please enter a valid username.',
          duration: 2,
        });
      })
      .finally(() => {
        onSetLoading(false);
      });
  };

  return (
    <div className={styles.forgetPassContainer}>
      <div className={styles.forgetInnerContainer}>
        <h1>Forgot Password</h1>
        {resetToken ? (
          <>
            <p>Enter your new password</p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassChange}
            />
            <Button
              type="primary"
              onClick={handleResetPassword}
              loading={isLoading}
            >
              Reset Password
            </Button>
          </>
        ) : (
          <>
            <p>Enter your username</p>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <Button
              type="primary"
              onClick={handleSendResetLink}
              loading={isLoading}
            >
              Send Reset Link
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  isLoading: PropTypes.bool,
  onSetLoading: PropTypes.func,
};

ForgotPassword.defaultProps = {
  isLoading: false,
  onSetLoading: EMPTY_FUNCTION,
};

const mapStateToProps = ({ loginSignupReducer }) => ({
  isLoading: _get(loginSignupReducer, 'isLoading'),
});

const mapDispatchToProps = dispatch => ({
  onSetLoading: payload => dispatch(setLoading(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
