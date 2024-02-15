import React from 'react';
import styled from "styled-components";
import { Button } from 'antd';

const StyledSignInButton = styled(Button)`
    font-size: 16px;
    width: 300px;
`;

const SignInButton = ({ onClick, providerName, displayName }) => (
    <StyledSignInButton onClick={() => onClick(providerName)}>
      {displayName}
    </StyledSignInButton>
  );
  
export default SignInButton;