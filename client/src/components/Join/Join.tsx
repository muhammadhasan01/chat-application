import {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text"
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text"
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}/>
        </div>
        <Link onClick={e => (!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}?room=${room}`}>
          <button className="button" type="submit"><b>Sign in</b></button>
        </Link>
      </div>
    </div>
  )
}

export default Join;
