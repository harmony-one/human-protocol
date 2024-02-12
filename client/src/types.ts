export interface UserAction {
  user: string
  payload: any
  topic: string
  action: string
  timestamp: string
}

export interface UserProfile {
  username: string
  providerId: string | null;
}

export interface UserTopic {
  name: string
  alias: string
  logo: any
}
