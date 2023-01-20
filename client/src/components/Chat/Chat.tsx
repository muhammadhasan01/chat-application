import React, {useState, useEffect} from "react";
import queryString from "query-string";
import {io, Socket} from "socket.io-client";
import {useLocation} from "react-router";
import {ChatQueryString, Message} from "../../helper/interfaces";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket: Socket;

const Chat = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

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
    socket.on('message', (message: Message) => {
      console.log("We have received the holy", message);
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({users}: {users: string[]}) => {
      console.log("Received", users);
      setUsers(users);
    })
  }, [messages])

  console.log({text, messages});
  console.log({users});

  const sendMessage = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    socket.emit("sendMessage", text, () => setText(''));
  };

  return (
    <div className="outerContainer">
      <TextContainer users={users}/>
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input text={text} setText={setText} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;
