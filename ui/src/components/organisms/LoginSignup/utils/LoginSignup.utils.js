import { EMPTY_STRING } from '../../../../resources/shared/global.constant';
import Utilities from '../../../../utilities/utilities';

class LoginSignupUtils {
  static getSignUpPayload = ({
    name = EMPTY_STRING,
    email = EMPTY_STRING,
    password = EMPTY_STRING,
    phoneNumber = EMPTY_STRING,
  }) => {
    const {
      firstName = EMPTY_STRING,
      lastName = EMPTY_STRING,
    } = Utilities.getSplitString(name, 'firstName', 'lastName');
    return {
      username: name,
      password,
      phone: phoneNumber,
      email,
      firstName,
      lastName,
      joiningdate: '',
      areaId: '1',
    };
  };

  static setToken = (token) => {
    localStorage.setItem('token', token);
  };
}

export default LoginSignupUtils;
