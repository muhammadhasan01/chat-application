import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {io} from 'socket.io-client';
import {useLocation} from "react-router";
import {ChatQueryString} from "../../helper/interfaces";

const socket = io(import.meta.env.VITE_SERVER_ENDPOINT, {
  withCredentials: true,
  transports: ['websocket']
});

const Chat = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const {search} = useLocation();

  useEffect(() => {
    const {name, room} = queryString.parse(search) as ChatQueryString;
    setName(name);
    setRoom(room);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return (
    <h1>
      Chat
    </h1>
  )
}

export default Chat;
