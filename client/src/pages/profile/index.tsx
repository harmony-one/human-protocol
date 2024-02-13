import {useEffect} from 'react'
import { Box } from "grommet";
import { Button, Typography } from 'antd';
import {useNavigate} from "react-router-dom";
import {signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook} from '../../firebase/authService';
import {User, UserCredential, getAuth} from 'firebase/auth';
import {toast} from 'react-toastify';
import {useUserContext} from '../../context/UserContext';
import styled from "styled-components";

const SignInButton = styled(Button)`
    font-size: 16px;
    width: 300px;
`

export const UserProfile = () => {
  const navigate = useNavigate();
  const { wallet, currentUser } = useUserContext();

  const handleSignIn = async (provider: string): Promise<void> => {
    let userCredential: UserCredential;

    try {
      // TODO: ensure the error "auth/popup-closed-by-user" is triggered immediately
      switch (provider) {
        case 'google':
          userCredential = await signInWithGoogle();
          break;
        case 'twitter':
          userCredential = await signInWithTwitter();
          break;
        case 'github':
          userCredential = await signInWithGithub();
          break;
        case 'facebook':
          userCredential = await signInWithFacebook();
          break;
        default:
          throw new Error('Unsupported provider');
      }
    } catch (error) {
      console.error(error);
    }

    // @ts-ignore
    if(userCredential && userCredential.user) {
      try {
        await handlePostSignIn(userCredential.user);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePostSignIn = async (user: User) => {
    if (user.metadata.creationTime === user.metadata.lastSignInTime) { // new user
      navigate('/welcome');
    } else { // existing user
      navigate('/messages');
    }
  };

  return (
    <Box align="center" pad={{ top: '15vh' }} gap={'16px'}>
      <Typography.Title>
        User Profile
      </Typography.Title>
      <Box>
        <Typography.Text copyable={{ text: wallet?.address }} style={{ fontSize: '16px' }}>
          User address: {wallet?.address}
        </Typography.Text>
      </Box>
      <SignInButton onClick={() => handleSignIn('google')}>
        Google
      </SignInButton>
      <SignInButton onClick={() => handleSignIn('twitter')}>
        Twitter
      </SignInButton>
      <SignInButton onClick={() => handleSignIn('github')}>
        Github
      </SignInButton>
      <SignInButton onClick={() => handleSignIn('facebook')}>
        Facebook
      </SignInButton>
    </Box>
  );
}
