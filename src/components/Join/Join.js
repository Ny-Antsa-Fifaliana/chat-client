import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./Join.css";

const Join = () => {
  //variable
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  //function

  //Affichage
  return (
    <Stack spacing={6} className="outerContainer">
      <Stack spacing={3} className="container">
        <p className="echat">Hairun ChatBox</p>

        <TextField
          helperText="Entrez votre pseudo."
          id="nameId"
          label="Pseudo"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          helperText="Créer ou rejoindre une discussion."
          id="roomId"
          label="Nom de la discussion..."
          onChange={(e) => setRoom(e.target.value)}
        />
        {/* <Link style={{textDecoration:'none'}} className='btn__join' onClick={e=>(!name || !room)? e.preventDefault() : null} to={'/chat?'+encodeURIComponent('name='+name+'&room='+room)}> */}
        <Link
          style={{ textDecoration: "none" }}
          className="btn__join"
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={"/chat?name=" + name + "&room=" + room}
        >
          <Button fullWidth type="submit" variant="contained">
            Rejoindre
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Join;
