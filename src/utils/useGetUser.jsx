import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useGetUser = () => {

  const location = useLocation()

  const [user, setUser] = useState(() => {
    const storedUserData = Cookies.get('user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [token, setToken] = useState(() => {
    const storedTokenData = Cookies.get('token');
    return storedTokenData ? storedTokenData : null;
  });

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    setUser(null);
    navigate(`/auth/login?returnUrl=${location.pathname}`)
  };

  return {
    user,
    setUser,
    token,
    setToken,
    logout,
  };
};

export default useGetUser;
