import React from 'react';
import styled from "styled-components";
import { Button } from 'antd';

const StyledSignInButton = styled(Button)`
    font-size: 16px;
    width: 300px;
`;

const SignInButton = ({ onClick, providerName }) => (
    <StyledSignInButton onClick={() => onClick(providerName)}>
      {providerName}
    </StyledSignInButton>
  );
  
export default SignInButton;