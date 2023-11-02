/* external imports */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

/* internal components */
import Home from '../../pages/Home';
import PostPage from '../../pages/Postpage/Postpage';
import TestPage from '../../pages/TestPage';
import App from '../App';
import PageNotFound from '../configs/PageNotFound';
import ForgetPassword from '../../components/organisms/LoginSignup/components/forgetPassword';

function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/posts/:category" element={<PostPage />} />
      <Route path="/resetpasswordSS" element={<ForgetPassword />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RouteConfig;
