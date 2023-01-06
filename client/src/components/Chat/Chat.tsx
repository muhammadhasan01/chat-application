import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {io, Socket} from 'socket.io-client';
import {useLocation} from "react-router";
import {ChatQueryString} from "../../helper/interfaces";
import {ChatMessage} from "../../../../server/src/helper/interfaces";

let socket: Socket;

const Chat = () => {
  const [name, setName] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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
    socket.on('message', (message: ChatMessage) => {
      setMessages([...messages, message]);
    });
  }, [messages])

  const sendMessage = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    socket.emit("sendMessage", message, () => setMessage(null));
  };

  if (!message) {
    return <div>Loading...</div>;
  }

  console.log({name, room});
  console.log({message, messages});

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message.text}
          onChange={e => setMessage({name: message.name, text: e.target.value})}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  )
}

export default Chat;
