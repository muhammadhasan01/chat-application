import {ChangeEvent, useState} from "react";
import "./Join.css";
import {useNavigate} from "react-router";

const Join = () => {
  const [name, setName] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !room) {
      alert("Name and Room must be filled");
      return;
    }
    navigate(`/chat?name=${name}&room=${room}`);
  }

  return (
    <div className="joinOuterContainer">
      <form onSubmit={handleSubmit} className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text"
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text"
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}/>
        </div>
        <button className="button" type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Join;
