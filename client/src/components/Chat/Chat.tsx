import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {io, Socket} from 'socket.io-client';
import {useLocation} from "react-router";
import {ChatQueryString} from "../../helper/interfaces";

let socket: Socket;

const Chat = () => {
  const [name, setName] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const endpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const {search} = useLocation();

  useEffect(() => {
    const {name, room} = queryString.parse(search) as ChatQueryString;

    setName(name);
    setRoom(room);

    socket = io(endpoint, {
      withCredentials: true,
      transports: ['websocket']
    });

    socket.emit('join', {name, room});

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [search, endpoint]);

  return (
    <h1>
      Chat
    </h1>
  )
}

export default Chat;
