import { JsonRpcProvider, Wallet } from "ethers";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firebaseClient } from "../firebase";

export const LSAccountKey = 'human_protocol_client_account';

interface UserContextType {
  wallet: Wallet | undefined;
  setWallet: Dispatch<SetStateAction<Wallet | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const privateKeyLS = window.localStorage.getItem(LSAccountKey);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    if (location.pathname === '/auth' || location.pathname === '/') {
      console.log('[user context] /auth route, special handling');
      // navigate('/messages')
    }

    if (privateKeyLS) {
      try {
        const data = getWalletFromPrivateKey(privateKeyLS);
        setWallet(data);
        console.log('[user context] Restored blockchain wallet from private key: ', data.address)
        // navigate('/messages')
      } catch (error) {
        console.error('[user context] Failed to load user wallet from localStorage:', error);
      }
    } else {
      const newWallet = createRandomWallet()
      setWallet(newWallet)
      window.localStorage.setItem(LSAccountKey, newWallet.privateKey);
      console.log('[user context] Generated new blockchain wallet: ', newWallet.address)

      firebaseClient.addAccount({
        address: newWallet.address,
        auth: []
      });

      // navigate('/welcome')
    }
  }, [privateKeyLS]);

  const value = useMemo(() => {
    return {
      wallet,
      setWallet,
    } as any
  }, [wallet])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const createRandomWallet = (): Wallet => {
  const hdWallet = Wallet.createRandom();
  return getWalletFromPrivateKey(hdWallet.privateKey);
}

const getWalletFromPrivateKey = (privateKey: string): Wallet => {
  const provider = new JsonRpcProvider();
  return new Wallet(privateKey, provider);
}
