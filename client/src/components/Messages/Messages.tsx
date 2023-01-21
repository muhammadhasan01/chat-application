import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";
import {MessagesProps} from "@/helper/interfaces";
import Message from "@/components/Message/Message";

const Messages = ({messages, name}: MessagesProps) => {
  return <ScrollToBottom className="messages">
    {messages.map((message, index) =>
      <div key={index}>
        <Message message={message} name={name}/>
      </div>
    )}
  </ScrollToBottom>
}

export default Messages;
