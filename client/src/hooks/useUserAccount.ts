import {useEffect, useState} from "react";
import {Wallet, JsonRpcProvider} from 'ethers'
import {UserCredential} from "firebase/auth";
import {UserProfile} from "../types";
import {getAuth, onAuthStateChanged, User} from "firebase/auth";

const LSAccountKey = 'human_protocol_client_account'

const getWallet = () => {
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
  const [wallet, setWallet] = useState<Wallet>()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const data = getWallet()
    setWallet(data)
  }, []);

  useEffect(() => {
    const getData = () => {
      const data = getAuth()
      setCurrentUser(data.currentUser)
      onAuthStateChanged(data, (data) => {
        console.log('AUTH CHANGED!', data)
        setCurrentUser(data)
      })
    }

    getData()
  }, []);

  return {
    wallet,
    currentUser
  };
};
