import {ParsedQuery} from "query-string/base";

export interface ChatQueryString extends ParsedQuery {
  room: string
  name: string
}

export interface InfoBarProps {
  room: string
}

export interface Message {
  user: string
  text: string
}

export interface InputProps {
  text: string
  setText: Function
  sendMessage: Function
}

export interface MessagesProps {
  messages: Message[]
  name: string
}

export interface MessageProps {
  message: Message
  name: string
}
