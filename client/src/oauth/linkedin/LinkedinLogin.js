const handleLinkedinLogin = () => {
  const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REACT_APP_LINKEDIN_REDIRECT_URI);
  const state = '123456';
  const scope = encodeURIComponent('openid profile email');

  const loginUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

  window.location.href = loginUrl;
};

export { handleLinkedinLogin };
