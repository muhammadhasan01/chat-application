import "./Message.css";
import {MessageProps} from "../../helper/interfaces";

const Message = ({message, name}: MessageProps) => {
  const {user, text} = message;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    return <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  }

  return <div className="messageContainer justifyStart">
    <div className="messageBox backgroundLight">
      <p className="messageText colorDark">{text}</p>
    </div>
    <p className="sentText pl-10">{user}</p>
  </div>
}

export default Message;
