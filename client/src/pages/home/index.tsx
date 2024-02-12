import {useEffect} from 'react'
import { Box } from "grommet";
import { Button, Typography } from 'antd';
import {useNavigate} from "react-router-dom";
import {signInWithGithub, signInWithGoogle, signInWithTwitter} from '../../firebase/authService';
import {User, UserCredential} from 'firebase/auth';
import {toast} from 'react-toastify';
import {generateWallet, LSAccountKey, useUserContext} from '../../context/UserContext';
import {Wallet} from 'ethers';
import {getAccount, postAccount} from '../../api/worker';
import styled from "styled-components";

const SignInButton = styled(Button)`
    font-size: 16px;
    width: 300px;
`

export const HomePage = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  // TODO: unset user upon logout
  const { wallet, setWallet, currentUser } = useUserContext();

  useEffect(() => {
    if(currentUser) {
      console.log(`User wallet: ${wallet}`);
      if (wallet) {
        navigate('/message');
      }
    }
  }, [currentUser, wallet, navigate]);

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
        default:
          throw new Error('Unsupported provider');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign in', {
        autoClose: 10000
      })
    }

    // @ts-ignore
    if(userCredential && userCredential.user) {
      try {
        await handlePostSignIn(userCredential.user);
      } catch (e) {
        console.error(e)
        toast.error('Failed to create wallet', {
          autoClose: 10000
        })
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
      console.log('creating account...', user);
      await createWallet(user.uid).then((account) => {
        setWallet(account);
      });
      navigate('/welcome');
    } else { // existing user
      console.log('fetching account...', user)
      await fetchAccount(user.uid).then((account) => {
        setWallet(account);
      }).catch(e => {
        console.error('Failed to get account', e);
      });
      navigate('/feed');
    }
  };

  return (
    <Box align="center" pad={{ top: '15vh' }} gap={'16px'}>
        <Typography.Title>
          Human Protocol
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
        {/* <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleEmailSignIn}>Sign in with Email</Button> */}
    </Box>
  );
}

export const createWallet = async (uid: string): Promise<Wallet> => {
  const hdWallet = Wallet.createRandom();
  await postAccount(uid, hdWallet.publicKey, hdWallet.privateKey);
  window.localStorage.setItem(LSAccountKey, hdWallet.privateKey);
  return generateWallet(hdWallet.privateKey);
}

export const fetchAccount = async (uid: string): Promise<Wallet> => {
  const accountData = await getAccount(uid);
  if (accountData) {
    window.localStorage.setItem(LSAccountKey, accountData.privateKey);
    return generateWallet(accountData.privateKey);
  }
  return createWallet(uid)
}
