export interface ChatProp {
  room: string
  name: string
}

export interface UserModel {
  id: string
  name: string
  room: string
}

export interface CreateUserResponse {
  error?: string
  user?: UserModel
}
