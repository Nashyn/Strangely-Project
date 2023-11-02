/* external imports */
import React from 'react';
/* internal components */
import withNavbar from '../../resources/shared/hoc/navbar';

function Test() {
  return (
    <h1> Test </h1>
  );
}

export default withNavbar(Test);
