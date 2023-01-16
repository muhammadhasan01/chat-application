import {ParsedQuery} from "query-string/base";

export interface ChatQueryString extends ParsedQuery {
  room: string
  name: string
}

export interface InfoBarProps {
  room: string
}

export interface InputProps {
  message: string
  setMessage: Function
  sendMessage: Function
}

export interface MessagesProps {
  messages: string[]
  name: string
}
