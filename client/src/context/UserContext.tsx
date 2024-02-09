import { JsonRpcProvider, Wallet } from "ethers";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

export const LSAccountKey = 'human_protocol_client_account';

interface UserContextType {
  user: Wallet | undefined;
  setUser: Dispatch<SetStateAction<Wallet | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    const privateKeyLS = window.localStorage.getItem(LSAccountKey);
    if (privateKeyLS) {
      try {
        const wallet = generateWallet(privateKeyLS);
        setUser(wallet);
      } catch (error) {
        console.error('Failed to load user wallet from localStorage:', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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