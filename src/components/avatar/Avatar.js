import React from "react";
import userImg from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import "../avatar/Avatar.scss";

function Avatar({ src }) {
  const navigate = useNavigate();

  return (
    <div className="Avatar hover-link">
      <img src={src ? src : userImg} alt="user-image" />
    </div>
  );
}

export default Avatar;
