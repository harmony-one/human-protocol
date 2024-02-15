import {useEffect} from 'react'
import { Box } from "grommet";
import { Button, Typography } from 'antd';
import {useNavigate} from "react-router-dom";
import {signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook } from '../../firebase/authService';
import {User, UserCredential} from 'firebase/auth';
import {toast} from 'react-toastify';
import {useUserContext} from '../../context/UserContext';
import {getAccount} from '../../api/worker';
import styled from "styled-components";
import UsernamePrompt from '../../components/modals/UsernamePrompt';

export const HomePage = () => {
  // const navigate = useNavigate();

  // TODO: unset user upon logout
  // const { wallet } = useUserContext();

  // useEffect(() => {
  //   if(wallet) {
  //     console.log(`[Home] User wallet address: ${wallet.address}`);
  //     navigate('/feed');
  //   }
  // }, [wallet, navigate]);

  //   // @ts-ignore
  //   if(userCredential && userCredential.user) {
  //     try {
  //       await handlePostSignIn(userCredential.user);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  // const handlePostSignIn = async (user: User) => {
  //   if (user.metadata.creationTime === user.metadata.lastSignInTime) { // new user
  //     navigate('/welcome');
  //   } else { // existing user
  //     navigate('/messages');
  //   }
  // };

  return (
    <Box align="center" pad={{ top: '15vh' }} gap={'16px'}>
      <UsernamePrompt providerName="google-oauth2" displayName="Google" providerShorthand="g" authType="openid" />
      <UsernamePrompt providerName="twitter" displayName="Twitter" providerShorthand="x" authType="openid" />
      <UsernamePrompt providerName="github" displayName="Github" providerShorthand="git" authType="openid" />
      <UsernamePrompt providerName="linkedin" displayName="LinkedIn" providerShorthand="l" authType="openid" />
      <UsernamePrompt providerName="discord" displayName="Discord" providerShorthand="d" authType="openid" />
      <UsernamePrompt providerName="linkedIn" displayName="LinkedIn (without Auth0)" providerShorthand="l" authType="linkedin" />
    </Box>
  );
}
