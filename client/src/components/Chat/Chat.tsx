import {useState, useEffect} from "react";
import queryString from "query-string";
import {io, Socket} from "socket.io-client";
import {useLocation} from "react-router";
import {ChatQueryString} from "../../helper/interfaces";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";

let socket: Socket;

const Chat = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

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

    socket.emit('join', {name, room}, () => {

    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    }
  }, [search, endpoint]);

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages])

  const sendMessage = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    socket.emit("sendMessage", message, () => setMessage(''));
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  )
}

export default Chat;
