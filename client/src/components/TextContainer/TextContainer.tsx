import OnlineIcon from "@/icons/onlineIcon.png";
import {TextContainerProps} from "@/helper/interfaces";

import "./TextContainer.css";

const TextContainer = ({users}: TextContainerProps) => {
  return <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
    </div>
    {
      users.length > 0 ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(name => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={OnlineIcon}/>
                  {name}
                </div>)
              )}
            </h2>
          </div>
        </div>
      ) : null
    }
  </div>
}

export default TextContainer;
