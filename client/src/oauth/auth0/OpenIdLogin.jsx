import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SignInButton from '../../components/buttons/SignInButton';

const OpenIdLogin = ({ providerName, displayName }) => {
  //  this is for universal login
  // const { loginWithRedirect } = useAuth0();

  // const handleAuth0SignIn = () => {
  //   loginWithRedirect({
  //     connection: 'linkedin'
  //   });
  // };

  const handleOpenIdSignIn = () => {
    const auth0Domain = 'http://dev-j4t5eeehosnfkpcf.us.auth0.com';
    const clientId = 'y8JwYhx0JkiKCbfikRTFGTNaTy7CUpnA';
    const responseType = 'code';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth/openid-callback');
    const scope = encodeURIComponent('openid profile email');

    const loginUrl = `${auth0Domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&connection=${providerName}`;

    window.location.href = loginUrl;
  };

  return (
    <SignInButton onClick={handleOpenIdSignIn} providerName={providerName} displayName={displayName}/>

  );
};

export default OpenIdLogin;
