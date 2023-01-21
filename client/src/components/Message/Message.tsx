import {MessageProps} from "@/helper/interfaces";
import emoji from "react-easy-emoji";
import "./Message.css";

const Message = ({message, name}: MessageProps) => {
  const {user, text} = message;

  if (user.localeCompare(name, "en-EN", {sensitivity: "base"}) === 0) {
    return <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{emoji(text)}</p>
      </div>
    </div>
  }

  return <div className="messageContainer justifyStart">
    <div className="messageBox backgroundLight">
      <p className="messageText colorDark">{emoji(text)}</p>
    </div>
    <p className="sentText pl-10">{user}</p>
  </div>
}

export default Message;
