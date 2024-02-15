import React from 'react'
import SignInButton from '../../components/buttons/SignInButton';

const LinkedinAuth = () => {
  const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REACT_APP_LINKEDIN_REDIRECT_URI);
  const state = '123456';
  const scope = encodeURIComponent('openid profile email');

  const handleLinkedInLogin = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  };
  return (
    <div>
        <SignInButton onClick={handleLinkedInLogin} providerName="LinkedIn" displayName="LinkedIn (without Auth0)"/>
    </div>
  )
}

export default LinkedinAuth