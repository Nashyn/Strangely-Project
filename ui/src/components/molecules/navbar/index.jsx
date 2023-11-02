/* eslint-disable jsx-a11y/no-static-element-interactions */
/* external imports */
import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
/* utils */
import _get from 'lodash/get';
/* resource */
import logoutIcon from '../../../resources/assets/logout.svg';
/* styles */
import styles from './Navbar.module.scss';
import Utilites from '../../../utilities/utilities';
/* constants */
import { EMPTY_OBJECT } from '../../../resources/shared/global.constant';
/* service */
import { logoutUser } from '../../organisms/LoginSignup/service/LoginSignup.service';

function Navbar({
  userData = EMPTY_OBJECT,
}) {
  const userDatas = localStorage.getItem('userData');
  const location = useLocation();
  const handleLogout = () => {
    logoutUser(userData)
      .then()
      .catch();
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/home"
            className={styles.navLink}
          >
            Home
          </Link>
        </li>
        {
          (Utilites.isObjectDefined(userDatas)
          && location.pathname !== '/') && (
            <li className={styles.navItem}>
              <div
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                <img
                  src={logoutIcon}
                  alt="Logout"
                />
              </div>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  userData: PropTypes.bool,
};

Navbar.defaultProps = {
  userData: EMPTY_OBJECT,
};

const mapStateToProps = ({ loginSignupReducer }) => ({
  userData: _get(loginSignupReducer, 'userData'),
});

export default connect(
  mapStateToProps,
  null,
)(Navbar);
