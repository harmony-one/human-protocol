import { useEffect } from 'react'
import { Box, Button } from "grommet";
import { Input } from "antd";
import {useNavigate} from "react-router-dom";
import { signInWithEmail, signInWithGoogle } from '../../firebase/authService';
import { User, UserCredential } from 'firebase/auth';
import { toast } from 'react-toastify';
import { LSAccountKey, generateWallet, useUserContext } from '../../context/UserContext';
import { Wallet } from 'ethers';
import { getAccount, postAccount } from '../../api/worker';

export const HomePage = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  // TODO: unset user upon logout
  const { user, setUser } = useUserContext();

  useEffect(() => {
    console.log(`User: ${user}`);
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  const handleSignIn = async (provider: string): Promise<void> => {
    try {
      let userCredential: UserCredential;
      // TODO: ensure the error "auth/popup-closed-by-user" is triggered immediately
      switch (provider) {
        case 'google':
          userCredential = await signInWithGoogle();
          break;
        default:
          throw new Error('Unsupported provider');
      }
      await handlePostSignIn(userCredential.user);
    } catch (error) {
      console.error(error);
      toast.error('Failed to sign in', {
        autoClose: 10000
      })
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
      console.log('creating account');
      await createAccount(user.uid).then((account) => {
        setUser(account);
      });
      navigate('/welcome');
    } else { // existing user
      await fetchAccount(user.uid).then((account) => {
        setUser(account);
      });
      console.log('fetching account')
      navigate('/feed');
    }
  };

  return (
    <Box align="center" pad={{ top: '15vh' }}>      <div>
        <Button 
          onClick={() => handleSignIn('google')}
          style={{
            border: '2px solid black',
            borderRadius: '4px',
            padding: '8px 16px',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '15vw',
          }}
        >
          Google
        </Button>
        {/* <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleEmailSignIn}>Sign in with Email</Button> */}
      </div>
    </Box>
  );
}

export const createAccount = async (uid: string): Promise<Wallet> => {
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
  return generateWallet(""); // TODO
}