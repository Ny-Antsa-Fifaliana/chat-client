import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Stack from "@mui/material/Stack";

let socket;

const notificationSoundReceive = new Audio("/sounds/ping.mp3");
const notificationSoundSend = new Audio("/sounds/send.mp3");
const notificationSoundAdmin = new Audio("/sounds/admin.mp3");

const playNotificationSoundReceive = () => {
  notificationSoundReceive.play();
};

const playNotificationSoundSend = () => {
  notificationSoundSend.play();
};
const playNotificationSoundAdmin = () => {
  notificationSoundAdmin.play();
};

notificationSoundReceive.muted = true;
const Chat = () => {
  //variable
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [files, setFiles] = useState([]);

  const ENDPOINT = "https://lumbar-phrygian-layer.glitch.me"; //server url
  //const ENDPOINT = "http://localhost:5000"; //server url

  const location = useLocation(); // Get current URL
  //   const urlDecoded = decodeURIComponent(location.search);
  const urlDecoded = location.search;

  //initialisation
  useEffect(() => {
    const { name, room } = queryString.parse(urlDecoded); // this return object json name and room
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT); // connection au serveur
    socket.emit("joindre", { name, room }); //First emit

    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, urlDecoded]);

  // after connected
  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        setMessages([...messages, message]);
      },
      () => {}
    );
    socket.on(
      "roomData",
      (data) => {
        setUsersInRoom(data);
      },
      () => {}
    );
  }, [messages]);

  // Notification
  // Jouer le son uniquement lorsque le dernier message est envoyé par l'utilisateur actuel
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user) {
      if (
        messages[messages.length - 1].user.charAt(0).toUpperCase() +
          messages[messages.length - 1].user.slice(1).toLowerCase() ===
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      ) {
        notificationSoundReceive.muted = false;
        playNotificationSoundSend();
      } else if (
        messages[messages.length - 1].user.charAt(0).toUpperCase() +
          messages[messages.length - 1].user.slice(1).toLowerCase() ===
          "Admin" &&
        !notificationSoundReceive.muted
      ) {
        playNotificationSoundAdmin();
      } else if (notificationSoundReceive.muted) {
        window.addEventListener("click", () => {
          notificationSoundReceive.muted = false;
        });
      } else {
        playNotificationSoundReceive();
      }
    }
    return window.removeEventListener("click", () => {
      notificationSoundReceive.muted = false;
    });
  }, [messages, name]);

  //function to sendMessage
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    } else {
      sendFile();
      setMessage("");
    }
  };

  const handleTabChange = (tab) => {
    setShowInput(tab === "discussion");
  };

  // Gérer l'envoi de fichier -----------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles([selectedFile]);
    }
  };

  const sendFile = () => {
    if (files.length > 0) {
      const formData = new FormData();
      const file = files[0]; // Récupérer le premier fichier
      formData.append("file", file);
      formData.append("name", name);
      formData.append("room", room);

      fetch(ENDPOINT + "/upload", {
        method: "POST",
        body: formData,
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setMessages([
            ...messages,
            { user: name, text: data.filePaths.join(", ") },
          ]);
          setFiles([]);
        })
        .catch((error) => {
          console.error("Erreur d'upload du fichier:", error);
        });
    }
  }; // -------------------

  // Affichage
  return (
    <Stack className="conteneurChat" direction="column">
      <InfoBar room={room} />
      <Messages
        messages={messages}
        name={name}
        usersInRoom={usersInRoom}
        handleTabChange={handleTabChange}
        ENDPOINT={ENDPOINT}
      />
      {showInput && (
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleFileChange={handleFileChange}
          files={files}
        />
      )}
    </Stack>
  );
};
export default Chat;
