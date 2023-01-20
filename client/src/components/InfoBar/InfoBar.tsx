import "./InfoBar.css";
import onlineIcon from "@/icons/onlineIcon.png";
import closeIcon from "@/icons/closeIcon.png";
import {InfoBarProps} from "@/helper/interfaces";

const InfoBar = ({ room }: InfoBarProps) => {
  return <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online"/>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close"/>
      </a>
    </div>
  </div>
}

export default InfoBar;
