import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useGetUser = () => {
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
      navigate('/auth/login');
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
