import React, { useState, useEffect } from 'react';
import { handleOpenIdLogin } from '../../oauth/auth0/OpenIdLogin';
import { handleLinkedinLogin } from '../../oauth/linkedin/LinkedinLogin';

function UsernamePrompt({ providerName, displayName, providerShorthand, authType }) {
  const [buttonLabel, setButtonLabel] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem(`${providerName}Username`);
    if (storedUsername) {
      setButtonLabel(providerShorthand + "/" + storedUsername);
    } else {
      setButtonLabel(displayName);
    }
  }, [providerName]);

  const handlePrompt = () => {
    const userInput = window.prompt(`${displayName} name?`);
    if (userInput !== null && userInput.trim() !== "") {
      localStorage.setItem(`${providerName}Username`, userInput);
      setButtonLabel(providerShorthand + "/" + userInput);
      alert(`${displayName} name added.`);
    } else {
      if (authType === 'openid') {
        handleOpenIdLogin({providerName})
      } else if (authType === 'linkedin') {
        handleLinkedinLogin()
      }
    }
  };

  return (
    <div>
      <button 
        onClick={handlePrompt} 
        style={{
          background: 'none',
          color: 'black',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default UsernamePrompt;
