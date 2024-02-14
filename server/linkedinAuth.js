const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
require('dotenv').config();

app.post('/api/linkedin/exchange-code', async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json({ 
      success: true, 
      accessToken: access_token, 
      userDetails: userInfoResponse.data 
    });
  } catch (error) {
    console.error('Failed to exchange LinkedIn code for token or fetch user details:', error.response ? error.response.data : error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      errorDetails: error.response ? error.response.data : error 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
