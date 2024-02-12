import {useEffect} from 'react'
import { Box } from "grommet";
import { Button, Typography } from 'antd';
import {useNavigate} from "react-router-dom";
import {signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook} from '../../firebase/authService';
import {User, UserCredential} from 'firebase/auth';
import {toast} from 'react-toastify';
import {useUserContext} from '../../context/UserContext';
import {getAccount} from '../../api/worker';
import styled from "styled-components";

const SignInButton = styled(Button)`
    font-size: 16px;
    width: 300px;
`

export const HomePage = () => {
  const navigate = useNavigate();

  // TODO: unset user upon logout
  // const { wallet } = useUserContext();

  // useEffect(() => {
  //   if(wallet) {
  //     console.log(`[Home] User wallet address: ${wallet.address}`);
  //     navigate('/feed');
  //   }
  // }, [wallet, navigate]);

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

  // const handleEmailSignIn = async (): Promise<void> => {
  //   try {
  //     const userCredential = await signInWithEmail(email, password);
  //     await handlePostSignIn(userCredential.user);
  //     navigate('/feed');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Failed to sign in', {
  //       autoClose: 10000
  //     })
  //   }
  // };

  const handlePostSignIn = async (user: User) => {
    if (user.metadata.creationTime === user.metadata.lastSignInTime) { // new user
      navigate('/welcome');
    } else { // existing user
      navigate('/feed');
    }
  };

  return (
    <Box align="center" pad={{ top: '15vh' }} gap={'16px'}>
        <Typography.Title>
          Auth
        </Typography.Title>
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
        {/* <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleEmailSignIn}>Sign in with Email</Button> */}
    </Box>
  );
}
