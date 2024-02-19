import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';



const Message = ({message:{user,text}, name})=>{
    // variable
    let isSendByCurrentUser = false;
    const trimedName= name.trim().toLowerCase();

    if(user===trimedName){
        isSendByCurrentUser=true;
    }

    if(user==='admin'){
        return(
                <div className='adminText'>
                    <p>{ReactEmoji.emojify(text.charAt(0).toUpperCase()+text.slice(1).toLowerCase())}</p>
                </div>
        )
    }


    //affichage
    return(
        isSendByCurrentUser?(
            <div className='justifyEnd'>
                <div  className='backgroundBlue' >
                    <p style={{ wordBreak: 'break-all'}}>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : 
        (
            <div className='justifyStart'>
                <p style={{ wordBreak: 'break-all'}} className='sentText'>{user.charAt(0).toUpperCase()+user.slice(1).toLowerCase()}</p>
                <div className='containerTextSender'>
                    <p style={{ wordBreak: 'break-all'}}>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        
    )

}

export default Message;


 
 