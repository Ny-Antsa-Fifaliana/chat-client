import React, { useState } from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name, ENDPOINT }) => {
  // variable
  let isSendByCurrentUser = false;
  const isFile = text.startsWith("/uploads/");
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (user.trim().toLowerCase() === name.trim().toLowerCase()) {
    isSendByCurrentUser = true;
  }
  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  };
  if (user === "admin") {
    return (
      <div className="adminText">
        <p>
          {ReactEmoji.emojify(
            text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
          )}
        </p>
      </div>
    );
  }

  //affichage
  return isSendByCurrentUser ? (
    <div className="justifyEnd">
      {isFile ? (
        <div>
          {text.match(/\.(jpeg|jpg|png|gif)$/) ? (
            <img
              src={`${ENDPOINT}${text}`}
              alt="file"
              className={` ${isFullScreen ? "full-screen" : "file-image"}`}
              onClick={handleImageClick}
            />
          ) : (
            <a
              href={`${ENDPOINT}${text}`}
              style={{ color: "#0075e8" }}
              download
            >
              {text.split("/").pop()}
            </a>
          )}
        </div>
      ) : (
        <div className="backgroundBlue">
          <p style={{ wordBreak: "break-all" }}>{ReactEmoji.emojify(text)}</p>
        </div>
      )}
    </div>
  ) : (
    <div className="justifyStart">
      <p style={{ wordBreak: "break-all" }} className="sentText">
        {user.charAt(0).toUpperCase() + user.slice(1).toLowerCase()}
      </p>
      <div className="containerTextSender">
        {isFile ? (
          <div>
            {text.match(/\.(jpeg|jpg|png|gif)$/) ? (
              <img
                src={`${ENDPOINT}${text}`}
                alt="file"
                className={` ${isFullScreen ? "full-screen" : "file-image"}`}
                onClick={handleImageClick}
              />
            ) : (
              <a href={`${ENDPOINT}${text}`} download>
                {text.split("/").pop()}
              </a>
            )}
          </div>
        ) : (
          <p style={{ wordBreak: "break-all" }}>{ReactEmoji.emojify(text)}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
