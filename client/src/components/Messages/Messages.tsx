import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";
import {MessagesProps} from "../../helper/interfaces";

const Messages = ({messages, name}: MessagesProps) => {
  return <ScrollToBottom>
    {messages.map((message, index) =>
      <div key={index}>
        {message} - {name}
      </div>
    )}
  </ScrollToBottom>
}

export default Messages;
