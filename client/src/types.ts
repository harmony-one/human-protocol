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

export type UserTopicType = 'blockchain' | 'event' | 'nft' | 'dao' | 'protocol' | 'app'

export interface UserTopic {
  name: string
  type: UserTopicType
  logoOutline: any
  logo: any
  group: number
}
