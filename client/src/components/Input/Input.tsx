import "./Input.css";
import {InputProps} from "../../helper/interfaces";

const Input = ({message, setMessage, sendMessage}: InputProps) => {
  return <form className="form">
    <input
      className="input"
      type="text"
      placeholder="type a message..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
    />
    <button
      className="sendButton"
      onClick={e => sendMessage(e)}
    >
      Send
    </button>
  </form>
}

export default Input;
