import { JsonRpcProvider, Wallet } from "ethers";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";

export const LSAccountKey = 'human_protocol_client_account';

interface UserContextType {
  wallet: Wallet | undefined;
  setWallet: Dispatch<SetStateAction<Wallet | undefined>>;
  currentUser: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const privateKeyLS = window.localStorage.getItem(LSAccountKey);
    if (privateKeyLS) {
      try {
        const data = generateWallet(privateKeyLS);
        setWallet(data);
      } catch (error) {
        console.error('Failed to load user wallet from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const getData = () => {
      const data = getAuth()
      setCurrentUser(data.currentUser)
      onAuthStateChanged(data, (data) => {
        console.log('Auth changed!', data)
        setCurrentUser(data);
      });
    }

    getData()
  }, []);

  return (
    <UserContext.Provider value={{ wallet, setWallet, currentUser }}>
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

export const generateWallet = (privateKey: string): Wallet => {
  const provider = new JsonRpcProvider();
  const wallet = new Wallet(privateKey, provider);
  return wallet;
}
