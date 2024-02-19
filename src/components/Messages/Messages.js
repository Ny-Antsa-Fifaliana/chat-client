import React, { useEffect, useRef } from 'react';
import './Messages.css';
import Message from '../Message/Message';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import multiavatar from '@multiavatar/multiavatar/esm'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// for mobile device
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div >{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
//   end for mobile device





const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


//   Creation du composant
const Messages = ({ messages, name ,usersInRoom, handleTabChange }) => {
    const chatRefOnline = useRef(null);
    const chatRefDiscussion = useRef(null);
    // for mobile device tab ------------------
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
      setValue(newValue);
      handleTabChange(newValue === 0 ? 'discussion' : 'online');
    };
    // ---------------------------


    useEffect(() => {
        if (chatRefOnline.current) {
            chatRefOnline.current.scrollTo({
                top: chatRefOnline.current.scrollHeight,
                behavior: 'smooth' 
            });
        }
        if (chatRefDiscussion.current) {
            chatRefDiscussion.current.scrollTo({
                top: chatRefDiscussion.current.scrollHeight,
                behavior: 'smooth' 
            });
        }
    }, [messages]);



// affichage ----------------------------------------------------------------------------------------------------------------
    return (
        <>
        <Stack direction="row" id='outerMessages'>
    
            <Card className='firstContainer'>
                <div className='onlineContainer'>
                    <div className='personOuter'>
                        <div className='personChild'>
                        {usersInRoom.users && Array.from(new Set(usersInRoom.users.map(user => user.name))).map((userName, i) => (
                            userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() === name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() && (<img key={i} src={`data:image/svg+xml;base64,${btoa(multiavatar(userName))}`} alt="Avatar" style={{ width: 70, height: 70 , border:'solid 10px #f3f6fb', borderRadius:'50%'}} />)
                            
                            ))}
                        </div>
                        <p>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
                    </div>
                
                    <div className='onLine'>
                        <p className="titleOnline"> En ligne</p>
                        <div className='UserOnline'>
                            {usersInRoom.users && Array.from(new Set(usersInRoom.users.map(user => user.name))).map((userName, i) => (
                                userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() !== name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() && (
                                    <div className='listeUserOnline' key={i} >
                                        <div className='umptyDivOnline'></div>
                                        <div className='divUserOnline' >
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot">
                                                <img src={`data:image/svg+xml;base64,${btoa(multiavatar(userName))}`} alt="Avatar" style={{ width: 25, height: 25 }} />
                                            </StyledBadge>
                                            <p>{userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}</p>  
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    {((usersInRoom?.users === null) || (usersInRoom.users?.length === 0) || (usersInRoom.users === undefined) || (Array.from(new Set(usersInRoom.users.map(user => user.name))).length === 1)) && (<p className="textInfo" style={{    color: '#9d9d9d', fontSize:".8rem"}}>Aucun utilisateur connecté...</p>)}
                    </div>
                </div>

            </Card>
            <div className='secondContainer' ref={chatRefOnline} >
                <div className='card-message'>
                    {messages.map((mess, i) => <div key={i}><Message message={mess} name={name} /></div>)}
                </div>
            </div>
        </Stack>



        {/*-------------------- For mobile device tab ------------------------------------------------------- */}
        <div className='tab'>
            <Box className='chooseTab' sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                    <Tab sx={{fontSize:'12px', color:'#646368'}} label="Discussion" {...a11yProps(1)} />
                    <Tab sx={{fontSize:'12px', color:'#646368'}} label="En ligne" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <CustomTabPanel className='tabOnline' value={value} index={1}>
                            <div className='personOuterTab'>
                                <div className='personChildTab'>
                                {usersInRoom.users && Array.from(new Set(usersInRoom.users.map(user => user.name))).map((userName, i) => (
                                    userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() === name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() && (<img key={i} src={`data:image/svg+xml;base64,${btoa(multiavatar(userName))}`} alt="Avatar" style={{ width: 70, height: 70 , border:'solid 5px #f3f6fb', borderRadius:'50%'}} />)
                                    
                                    ))}
                                </div>
                                <p>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
                            </div>
                        
                            <div className='onLineTab'>
                                <div className="titleOnlineTab">
                                    <p>En ligne</p>
                                </div>
                                <div className='UserOnlineTab'>
                                    {usersInRoom.users && Array.from(new Set(usersInRoom.users.map(user => user.name))).map((userName, i) => (
                                        userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase() !== name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() && (
                                            <div className='listeUserOnlineTab' key={i} >
                                                <div className='umptyDivOnlineTab'></div>
                                                <div className='divUserOnlineTab' >
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        variant="dot">
                                                        <img src={`data:image/svg+xml;base64,${btoa(multiavatar(userName))}`} alt="Avatar" style={{ width: 25, height: 25 }} />
                                                    </StyledBadge>
                                                    <p>{userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}</p>  
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                            {((usersInRoom?.users === null) || (usersInRoom.users?.length === 0) || (usersInRoom.users === undefined) || (Array.from(new Set(usersInRoom.users.map(user => user.name))).length === 1)) && (<p className="textInfo" style={{color: '#9d9d9d', fontSize:".8rem", textAlign:'center'}}>Aucun utilisateur connecté...</p>)}                        
                
            </CustomTabPanel>
            <CustomTabPanel className='tabDiscussion' value={value} index={0}>
                <div ref={chatRefDiscussion} className='card-messageTab'>
                        {messages.map((mess, i) => <div key={i}><Message message={mess} name={name} /></div>)}
                </div>

            </CustomTabPanel>
            
        </div>

    </>

    );
}

export default Messages;
