import axios from 'axios'
import { UserAction } from "../types";
import { firebaseClient } from '../firebase';

const WorkerURL = 'https://kv-dev-message.humanprotocol.workers.dev'

// user = wallet tied to many accounts
// accounts = oauth medium used to create / fetch associated user; tied to a single user

export const postUserTopics = async (address: string, topics: string[]) => {
  return await firebaseClient.addUser({
    id: address,
    topics
  });

  // const body = JSON.stringify({
  //   id: address,
  //   topics
  // })
  // const { data } = await axios.post(
  //   `${WorkerURL}/users`,
  //   body,
  //   {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  // })
  // return data
}

export const getUserTopics = async (address: string): Promise<string[]> => {
  return (await firebaseClient.getUser(address) as any).topics;
  // const { data } = await axios.get(`${WorkerURL}/users/${address}`, {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  // return data
}

export const postAccount = async (uid: string, address: string, privateKey: string) => {
  return await firebaseClient.addAccount({
    address: address, auth: []
  });
}

export const getAccount = async (uid: string) => {
  return await firebaseClient.getAccount(uid);
}

export const getUserActions = async (): Promise<UserAction[]> => {
  return await firebaseClient.getActions() as any;

  // const { data } = await axios.get(`${WorkerURL}/actions`, {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  // return data
}

export interface SendUserActionParams {
  user: string
  payload: Object
  topic: string
  id: string
}

export const sendUserAction = async (params: SendUserActionParams): Promise<UserAction[]> => {
  return await firebaseClient.addAction(params) as any
  // const body = JSON.stringify(params)
  // const { data } = await axios.post(
  //   `${WorkerURL}/actions`,
  //   body,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     }
  //   })
  // return data
}
