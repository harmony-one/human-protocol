import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserContext } from './context/UserContext';

const AuthMiddleware: React.FC = () => {
  const navigate = useNavigate();
  const { wallet } = useUserContext();

  useEffect(() => {
    if (wallet === undefined) {
      navigate('/');
    }
  }, [wallet, navigate]);

  return wallet !== undefined ? <Outlet /> : null;
};

export default AuthMiddleware;
