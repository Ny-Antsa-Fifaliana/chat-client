import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Input.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Input = ({
  message,
  setMessage,
  sendMessage,
  handleFileChange,
  files,
}) => {
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    // Faire défiler l'input dans la vue
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <form>
      <div className="outer__input">
        <div className="empty">
          <p>Copyright &copy; 2024 | by Fifa. All rights reserved.</p>
        </div>
        <div className="input__message">
          <TextField
            fullWidth
            label="Taper un message..."
            size="small"
            value={message}
            InputProps={{
              style: { borderRadius: "2rem", backgroundColor: "white" },
              ref: inputRef,
            }}
            InputLabelProps={{
              className: "custom-label", // Ajoutez une classe personnalisée pour le label
            }}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            onFocus={handleInputFocus}
          ></TextField>
          {/* for send file ------------------------------------------------ */}
          <div
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              fontSize: "10px",
              overflow: "hidden",
              marginLeft: "12px",
              textOverflow: "ellipsis",
            }}
          >
            {files.length > 0 && files[0].name}
          </div>
          <Button
            style={{ borderRadius: "50%" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <AttachFileIcon />
          </Button>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            style={{ borderRadius: "50%" }}
            onClick={(e) => {
              sendMessage(e);
            }}
          >
            <i
              className="bx bxs-send"
              style={{ fontSize: "22px", color: "#1a73e8" }}
            ></i>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Input;
