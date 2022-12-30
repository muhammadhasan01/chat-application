import {ParsedQuery} from "query-string/base";

export interface ChatQueryString extends ParsedQuery {
  room: string
  name: string
}
