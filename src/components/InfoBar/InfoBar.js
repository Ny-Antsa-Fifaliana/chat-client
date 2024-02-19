import React from 'react';
import './InfoBar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
const InfoBar = ({room})=>(

  <Box sx={{ position: 'relative'}} >
    <AppBar position="static" elevation={1} style={{ borderRadius:'0 0 10px 10px', background:'#f3f6fb', color:'#1a73e8'}}>
      <Toolbar variant="dense"  className='BarTop'>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: .8 }}
        >
          <i className='logo bx bxs-message-rounded-dots'></i>
        </IconButton>
        <Typography  component="div" sx={{ flexGrow: 1, display:'flex', flexDirection:'column'}}>
                  <p className='pInfoBar' style={{  letterSpacing:'1px', padding:'0', margin:'0'}}>inchat</p>
                  <span className='spanInfoBar' style={{fontFamily:'"Poppins",sans-Serif', padding:'0', margin:'0', color:'gray'}}>{room.charAt(0).toUpperCase() + room.slice(1).toLowerCase()}</span>        
        </Typography>
        <Button className='btn__deconnected' color="inherit"><a href='/'><i className='exit bx bx-exit' style={{color:'#1a73e8'}}></i></a></Button>
      </Toolbar>
    </AppBar>
  </Box>


)

export default InfoBar;



// syntax import image
// import fifaimg from '../../icons/fifaimg';