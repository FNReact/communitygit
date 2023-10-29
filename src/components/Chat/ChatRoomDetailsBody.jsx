import React, { useContext, useEffect, useState } from 'react'
import L1 from '../../asset/image/profile2.png';
import test1 from '../../asset/image/com.jpg';
import test2 from '../../asset/image/Add.mp4';
import test3 from '../../asset/image/test1.png';
import { faArrowRight, faBoxArchive, faCircleCheck, faCircleUp, faMessage, faPlusSquare, faReply, faTrash, faUser, faUserGroup, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import { baseUrl, chatMessagesUrl, chatRoomUrl } from '../../api/Api';
import { UserContext } from '../../utils/UserContext';
import parser from 'html-react-parser';

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from 'axios';
import MainLoader from '../PageLoadEffects/MainLoader';



// Style text area Part
const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    padding: 10px 10px 10px 0px;
    border-radius: 12px;
    border:none;
    background-color:#f3f3f3;

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const ChatRoomDetailsBody = ({chatRoomDetails, singleRoom,setChatRoomDetails,handleChatDetails,getAllChatRooms}) => {
    const token = sessionStorage.getItem('token');
    const {userDetails} = useContext(UserContext);
    const [emojiShow, setEmojiShow] =  useState(0)
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null)
    const [loaderVisible, setLoaderVisible] = useState(false)

    const [hearerTime, setHeaderTime] = useState(null)



    // hnadle submit post
    const handleSubmitPost = ()=>{
        if(media !==null){
            setLoaderVisible(true)
            let data = new FormData();
                data.append('chat_room',JSON.stringify(singleRoom));
                data.append('message', 'hh');
                data.append('file', media);
            let config = {
                method: 'post',
                url: chatMessagesUrl,
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                },
                data : data
            };
    
            axios.request(config)
            .then((response) => {
                getAllChatRooms()
                handleChatDetails(singleRoom.uuid)
                setContent('')
                setMedia(null)
                setLoaderVisible(false)
            })
            .catch((error) => {
                setLoaderVisible(false)
            });
        }
        if(media ===null){
            setLoaderVisible(true)
           var data = JSON.stringify({
                "message": content,
                "chat_room": singleRoom
            });

            let config = {
                method: 'post',
                url: chatMessagesUrl,
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
    
            axios.request(config)
            .then((response) => {
                getAllChatRooms()
                handleChatDetails(singleRoom.uuid)
                setContent('')
                setMedia(null)
                setLoaderVisible(false)
            })
            .catch((error) => {
                setLoaderVisible(false)
            });
        }
    }

    const [gmtOffset, setGMTOffset] = useState('');

    // set header time details
    useEffect(()=>{

        const date = new Date();
        const gmtOffsetHours = -date.getTimezoneOffset() / 60; // Convert minutes to hours
        const gmtOffsetMinutes = -date.getTimezoneOffset() % 60;
    
        // Create a string representation of the GMT offset
        const gmtOffsetString = (gmtOffsetHours >= 0 ? '+' : '-') +
          ('0' + Math.abs(gmtOffsetHours)).slice(-2)

          setGMTOffset(gmtOffsetString);


        if(chatRoomDetails?.meta?.chat_room){
            const newTime = new Date(chatRoomDetails?.meta?.chat_room?.updated_at);
            const updateTime =  newTime.setHours((newTime.getHours()) + (parseInt(gmtOffsetString)));

            let diffTime = Math.abs(updateTime.valueOf() - new Date().valueOf());
            let days = diffTime / (24*60*60*1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let secs = (minutes % 1) * 60;
            [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
            var fullTime;
    
            if(secs !== 0 ){
                fullTime = secs+'s';
            }
            if(minutes !== 0 &&  secs !== 0 ){
                fullTime = minutes+'m'+" "+ secs+'s';
            }
            if(hours !==0 && minutes !== 0 &&  secs !== 0 ){
                fullTime = hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
            }
            if(days !==0 && hours !==0 && minutes !== 0 &&  secs !== 0 ){
                fullTime = days+'d'+ " "+hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
            }
            setHeaderTime(fullTime)
        }
    },[])


  return (
    <>
        {loaderVisible ===true && <MainLoader/>}
          <div className="chatter_box_container">
                        <div className="fixed_profilr_header">
                            <div className="ct_left">
                                <div className="profile">
                                {chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar? 
                                    <img src={`${baseUrl}/${chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar}`} alt={chatRoomDetails?.meta?.name} />
                                    :<Avatar alt={chatRoomDetails?.meta?.chat_room?.name} src="/static/images/avatar/1.jpg"/>}
                                </div>
                                <div className="name_T">
                                    <div className="name"> {chatRoomDetails?.meta?.chat_room?.name}</div>
                                    <div className="active_status">{hearerTime !==null && hearerTime}</div>
                                </div>
                            </div>
                            <div className="ct_right">
                                <div className="chat_title_dashed">
                                    <div className="dashed_btn">
                                        <CallIcon />
                                    </div>
                                    <div className="dashed_btn">
                                        <VideocamIcon />
                                    </div>
                                    <div className="chat_D">
                                        <div className="info_btn">
                                            <MoreVertIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat_body">
                           {chatRoomDetails && chatRoomDetails?.data && chatRoomDetails.data.length>0 && chatRoomDetails.data.map((data, i)=>{

                                    const newTime = new Date(data?.sent_at);

                                    // Add the GMT offset to the time
                                    const updateTime =  newTime.setHours((newTime.getHours()) + (parseInt(gmtOffset) ));
                                    // let diffTime = Math.abs(new Date().valueOf() - new Date(chat.created_at).valueOf());
                                    let diffTime = Math.abs(new Date(updateTime).valueOf()- new Date().valueOf());
                                    let days = diffTime / (24*60*60*1000);
                                    let hours = (days % 1) * 24;
                                    let minutes = (hours % 1) * 60;
                                    let secs = (minutes % 1) * 60;
                                    [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
                                    var fullTime;

                                    if(secs !== 0 ){
                                        fullTime = secs+'s';
                                    }
                                    if(minutes !== 0 &&  secs !== 0 ){
                                        fullTime = minutes+'m'+" "+ secs+'s';
                                    }
                                    if(hours !==0 && minutes !== 0 &&  secs !== 0 ){
                                        fullTime = hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
                                    }
                                    if(days !==0 && hours !==0 && minutes !== 0 &&  secs !== 0 ){
                                        fullTime = days+'d'+ " "+hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
                                    }

                                return(
                                    <>
                                     {/* Owner text and media */}
                                     {data?.message !=='chat_room_create' && data?.user.uuid === userDetails.uuid && 
                                        <>  
                                            {data?.message && data.message !=='%%chat_attachment_%%' && <div className="own_massage_item">
                                                <div className="own_chat">
                                                    <div className="senting_massage">
                                                        {parser(data?.message)}
                                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>
                                            </div>}
                                            
                                            {data?.attachments && data?.attachments.length>0 &&  
                                                <div className="own_media_massage_item">
                                                    {data.attachments.map((media,i)=>{
                                                        const getMediaType = media?.mime.split('/')
                                                        if(getMediaType[0] ==='image'){
                                                            return(
                                                                <>
                                                                    <div className="media_content">
                                                                        <img src={media.url} alt="" />
                                                                    </div>
                                                                    <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                                </>
                                                            )
                                                        }
                                                        if(media?.mime ==='video/mp4'){
                                                            return(
                                                                <>
                                                                 <div className="media_content">
                                                                    <video class="video_file_img" controls controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                                                    <source src={media.url} type="video/mp4" autostart="false"/>
                                                                    </video>
                                                                </div>
                                                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </div>}
                                        </>
                                     }
                                        

                                        {/* Chatter text and media */}
                                        {data?.user.uuid !== userDetails.uuid && 
                                            <div className="chat_massage_item">
                                                <div className="profile_part">
                                                    <div className="chatter_profile">
                                                        {chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar? 
                                                        <img src={`${baseUrl}/${chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar}`} alt={chatRoomDetails?.meta?.name} />
                                                        :<Avatar alt={chatRoomDetails?.meta?.chat_room?.name} src="/static/images/avatar/1.jpg"/>}
                                                    </div>
                                                </div>
                                                
                                            {data?.message && data.message !=='%%chat_attachment_%%' &&
                                                <div className="chatter_chat">
                                                    <div className="senting_massage">
                                                        {parser(data?.message)}
                                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                    </div>
                                                </div>}

                                                <div className="chatter_chat">
                                                    {data?.attachments && data?.attachments.length>0 && <div className="chatter_media_massage_item">
                                                    {data.attachments.map((media,i)=>{
                                                        if(media?.mime ==='image/jpeg'){
                                                            return(
                                                                <>
                                                                    <div className="media_content">
                                                                        <img src={media.url} alt="" />
                                                                    </div>
                                                                    <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                                </>
                                                            )
                                                        }
                                                        if(media?.mime ==='video/mp4'){
                                                            return(
                                                                <>
                                                                 <div className="media_content">
                                                                    <video class="video_file_img" controls controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                                                        <source src={media.url} type="video/mp4" autostart="false"/>
                                                                    </video>
                                                                </div>
                                                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                       
                                                    </div>}
                                                    
                                                    <div className=" massage_D">
                                                        <ul>
                                                            <li> <i><FontAwesomeIcon icon={faReply} /></i>  </li>
                                                            <li> <i><FontAwesomeIcon icon={faTrash} /></i>  </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        }  
                                    </>
                                )
                           }) } 
                            {/* Chatter message delet */}
                            {/* <div className="chat_delet_massage_item">
                                <div className="chat_delet_message">
                                  The message was deleted..
                                </div>
                            </div> */}

                            {/* Own message delet */}
                            {/* <div className="own_delet_massage_item">
                                <div className="own_delet_message">
                                  The message was deleted..
                                </div>
                            </div> */}

                        </div>
                        <div className="chatting_Input_container">
                            <div className="attachment_content">

                                {/* Photo Part */}
                                {media && media !==null && media.type !=='video/mp4' && 
                                <div className="photo_content">
                                    <div className="photo_item">
                                        <img src={URL.createObjectURL(media)} alt="" />
                                        <div className="photo_overly" onClick={(e)=>setMedia(null)}> 
                                            <CloseIcon />
                                        </div>
                                    </div>
                                </div>}

                                {/* Vedio Part */}
                                {media  && media !==null && media.type ==='video/mp4' && 
                                <div className="vedio_content">
                                    <div className="vedio_item">
                                        <video class="video_file_img" controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                            <source src={URL.createObjectURL(media)} type="video/mp4" />
                                        </video>
                                        <div className="vedio_overly" onClick={(e)=>setMedia(null)}>
                                            <CloseIcon />
                                        </div>
                                        <i className="play_icon"> <PlayCircleOutlineIcon/></i>
                                    </div>
                                </div>}
                            </div>
                            <div className="chating_path">
                                <div className="path_side_1">
                                    <div  className={'file-input'}>
                                        <input
                                            disabled={content !==''?true:false}
                                            type="file"
                                            name="file-input"
                                            id="file-input"
                                            class={'file-input__input'}
                                            onChange={(e)=> setMedia(e.target.files[0])}
                                        />
                                        <label  class="file-input__label" for="file-input">
                                            <i className={content !==''?'cursor_denied':''}><AddToPhotosIcon /></i></label>
                                    </div>
                                    <i onClick={(e) => {emojiShow === 0 ? setEmojiShow(1) : setEmojiShow(0);}}><EmojiEmotionsIcon /></i>
                                    <div className="chat_emojy_picker">
                                        {emojiShow === 1 && (
                                            <Picker
                                                style={{ height: '300px' }}
                                                data={data}
                                                previewPosition={"none"}
                                                onEmojiSelect={(e) => {
                                                setContent(content + " " + e.native);
                                                setSelectedEmoji(e.native);
                                                }}
                                            />
                                        )}  
                                        </div>
                                </div>
                                {/* <div className="path_side_2">
                               
                            </div> */}
                                <StyledTextarea 
                                    aria-label="empty textarea" 
                                    placeholder="Type .. " 
                                    className={media && media !==null?"cursor_denied path_side_2 ":"path_side_2"}  
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={media && media !==null?true:false}
                                />
                                <div className="path_side_3" onClick={(e)=> handleSubmitPost()}>
                                    <i><SendIcon/> </i>
                                </div>
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default ChatRoomDetailsBody