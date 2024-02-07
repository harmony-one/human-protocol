import {useEffect, useState} from "react";
import {ethers, Wallet, JsonRpcProvider} from 'ethers'

const LSAccountKey = 'human_protocol_client_account'

const getAccount = () => {
  const provider = new JsonRpcProvider()
  const privateKeyLS = window.localStorage.getItem(LSAccountKey)
  if(privateKeyLS) {
    try {
      const acc = new Wallet(privateKeyLS, provider)
      if(acc) {
        return acc
      }
    } catch (e) {}
  }

  try {
    const hdWallet = Wallet.createRandom()
    const acc = new Wallet(hdWallet.privateKey, provider)
    window.localStorage.setItem(LSAccountKey, acc.privateKey)
    return acc
  } catch (e) {
    console.error('Cannot create account', e)
  }
}

export const useUserAccount = () => {
  const [account, setAccount] = useState<Wallet>()

  useEffect(() => {
    const acc = getAccount()
    setAccount(acc)
  }, []);

  return {
    account
  };
};
