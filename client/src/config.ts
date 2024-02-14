const config = {
  firebase: {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  },
  neo4Graph: {
    uri: process.env.REACT_APP_NEO4J_URI,
    user: process.env.REACT_APP_NEO4J_USER,
    password: process.env.REACT_APP_NEO4J_PASSWORD,
  },
  auth0Provider: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI ?? 'http://localhost:3000/auth'
  }
}

export default config