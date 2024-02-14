import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SignInButton from '../components/buttons/SignInButton';

const Auth0Login = () => {
  const { loginWithRedirect } = useAuth0();

  const handleAuth0SignIn = () => {
    loginWithRedirect({
      connection: 'linkedin'
    });
  };

  return (
    <SignInButton onClick={handleAuth0SignIn} providerName="Auth0" />
  );
};

export default Auth0Login;
