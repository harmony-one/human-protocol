import axios from 'axios'
import {UserAction} from "../types";

const WorkerURL = 'https://kv-dev-message.humanprotocol.workers.dev'

export const postUserTopics = async (address: string, topics: string[]) => {
  const body = JSON.stringify({
    id: address,
    topics
  })
  const { data } = await axios.post(
    `${WorkerURL}/users`,
    body,
    {
      headers: {
        "Content-Type": "application/json"
      }
  })
  return data
}

export const getUserTopics = async (address: string): Promise<string[]> => {
  const { data } = await axios.get(`${WorkerURL}/users/${address}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return data
}

export const getUserActions = async (): Promise<UserAction[]> => {
  const { data } = await axios.get(`${WorkerURL}/actions`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return data
}
