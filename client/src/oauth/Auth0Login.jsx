import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth0Login = () => {
  const { loginWithRedirect } = useAuth0();

  const loginWithLinkedIn = () => {
    loginWithRedirect({
      connection: 'linkedin'
    });
  };

  return (
    <button onClick={loginWithLinkedIn}>
      Log In with Auth0
    </button>
  );
};

export default Auth0Login;
