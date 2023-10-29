import { faArrowRight, faBoxArchive, faCircleCheck, faCircleUp, faMessage, faPlusSquare, faReply, faTrash, faUser, faUserGroup, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext, useEffect, useState } from "react";
import L1 from '../../asset/image/profile2.png';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import { FreeMode } from "swiper";
import { Avatar, Box, Button, Grid } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { allMembersUrl, baseUrl, chatMessagesUrl } from "../../api/Api";
import ChatRoomDetailsBody from "./ChatRoomDetailsBody";
import axios from "axios";
import MainLoader from "../PageLoadEffects/MainLoader";
import { UserContext } from "../../utils/UserContext";

import Pusher from 'pusher-js';


const ChatBody = ({chatRooms,setChatRooms, getAllChatRooms}) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const {msDetails, userDetails} = useContext(UserContext)
    const [chatRoomDetails, setChatRoomDetails] = useState(null)
    const [singleRoom, setSingleRoom] = useState(null)
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [allMembers, setAllMembers] = useState([])

    const [storeMembers, setStoreMembers] = useState([])

    const [anchorEl, setAnchorEl] = useState(null);
    const openChatMenu = Boolean(anchorEl);
    const chatMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const chatMenuClose = () => {
        setAnchorEl(null);
    };

const [chatDetailsOpner, setChatDetailsOpner] = useState(true)    

// set default chat
useEffect(()=>{
    if(chatRooms && chatRooms?.data?.length>0 && chatDetailsOpner ===true){
        handleChatDetails(chatRooms?.data[0].uuid);
        setSingleRoom(chatRooms?.data[0])
        setChatDetailsOpner(false)
    }
},[chatRooms])



//get all members
  const membersUrl = `${allMembersUrl}/${msDetails.id}`;
  const getAllMembers = ()=>{
    let config = {
      method: "get",
      url: membersUrl,
    };

    axios
      .request(config)
      .then((response) => {
        setAllMembers(response.data.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getAllMembers()
  }, []);

    // handle handleChatDetails
    const handleChatDetails =(roomUuid)=>{
        setLoaderVisible(true)
        let config = {
            method: 'get',
            url: `${chatMessagesUrl}?chat_room=${roomUuid}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
          axios.request(config)
          .then((response) => {
            getAllChatRooms()
            setChatRoomDetails(response.data)
            setLoaderVisible(false)
          })
          .catch((error) => {
            setLoaderVisible(false)

          });
    }


    // store members
    useEffect(()=>{
        const findsMember = [];
        if(chatRooms && chatRooms?.data && chatRooms?.data.length>0 && allMembers && allMembers.length>0){
            chatRooms?.data.forEach(chat => {
                allMembers.forEach(member => {
                    if(member?.user?.uuid === chat?.member?.uuid){
                        findsMember.push(chat)
                    }
                });
            });
        }
        setStoreMembers(findsMember)
    },[chatRooms])


    // handle chat Member

    const handleMemberChat = (member) =>{
        setLoaderVisible(true)
        let config = {
            method: 'get',
            url: `${chatMessagesUrl}?user=${member?.user?.uuid}`,
            headers: { 
              'Authorization': `Bearer ${token}`, 
            }
          };
          
          axios.request(config)
          .then((response) => {

            // handleChatDetails(chat.uuid);
            // setSingleRoom(chat)
            if(response?.data?.meta?.chat_room !==null){
                handleChatDetails(response?.data?.meta?.chat_room.uuid);
                setSingleRoom(response?.data?.meta?.chat_room)
            }else{
                var data = JSON.stringify({
                    "message": 'chat_room_create',
                    "chat_room": null,
                    "user": member?.user
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
                handleChatDetails(response?.data?.data?.chat_room.uuid);
                setSingleRoom(response?.data?.data?.chat_room)
                setLoaderVisible(false)
            })
            .catch((error) => {
                setLoaderVisible(false)
            });
            }

          })
          .catch((error) => {
            console.log(error);
            setLoaderVisible(false)
          });
    }


    useEffect(() => {
        var pusher = new Pusher("69ef518953032858d64d", {
          cluster: "ap1",
          encrypted: true,
        });   
        var channel = pusher.subscribe("notifyChannel");
         channel.bind("notifyChannel", async function (response) {
             alert('some notification');
         })
   });

   const [gmtOffset, setGMTOffset] = useState('');

   useEffect(() => {
     // Get the GMT offset
     const date = new Date();
     const gmtOffsetHours = -date.getTimezoneOffset() / 60; // Convert minutes to hours
     const gmtOffsetMinutes = -date.getTimezoneOffset() % 60;
 
     // Create a string representation of the GMT offset
     const gmtOffsetString = (gmtOffsetHours >= 0 ? '+' : '-') +
       ('0' + Math.abs(gmtOffsetHours)).slice(-2)
 
     setGMTOffset(gmtOffsetString);
     
   }, []);

    
    return (
        <Fragment>
            {loaderVisible ===true && <MainLoader/>}
            <div className="chat_content_wrapper">
                <div className="chat">
                    <div className="chat_left">
                         <div className="chat_top_content">
                         <div className="chat_left_top">
                            <div className="chat_h"> <span onClick={(e)=>{navigate(-1)}}> < ArrowBackIcon/> </span>  Messages  </div>
                            <div className="chat_D">
                                <div className="info_btn"
                                    id="basic-button"
                                    aria-controls={openChatMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openChatMenu ? 'true' : undefined}
                                    onClick={chatMenuOpen}>
                                    <MoreVertIcon />
                                </div>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openChatMenu}
                                    onClose={chatMenuClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                    <MenuItem onClick={chatMenuClose}> Creat a Group </MenuItem>
                                    <MenuItem onClick={chatMenuClose}> Unread Chats </MenuItem>
                                    <MenuItem onClick={chatMenuClose}> Archived Chats </MenuItem>
                                    <MenuItem onClick={chatMenuClose}> Help </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className="chat_search">
                            <div className="search_box">
                                <form action="#">
                                    <input type="text" placeholder="Search" className="form_control" />
                                    <i><FontAwesomeIcon icon={faArrowRight} /></i>
                                </form>
                            </div>
                        </div>
                        <div className="active_list">
                            <div className="active_title">
                                {/* Active Now */}
                                Members
                            </div>
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={0}
                                freeMode={true}
                                modules={[FreeMode]}
                                className="mySwiper">
                               {allMembers && allMembers.length>0 && allMembers.map((member,i)=>{
                                    if(userDetails?.id !==member?.user?.id && member.status ===1){
                                        return(
                                            <SwiperSlide>
                                                <div className="activeMamber" key={member.uuid} onClick={(e)=> handleMemberChat(member)}>
                                                    {/* <img src={`${baseUrl}/${member?.user?.avatar}`} alt={member?.user?.name} /> */}
                                                    <Avatar alt={member?.user?.name} src={`${baseUrl}/${member?.user?.avatar}`}/>
    
                                                    <div className="active_btn"></div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    }
                               })}  
                            </Swiper>
                        </div>
                         </div>
                        <div className="chat_list">
                            <Grid container spacing={0}>
                                {storeMembers 
                                    && storeMembers.length>0 
                                    && storeMembers.map((chat, i)=>{
                                        const newTime = new Date(chat?.updated_at);

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
                                            <Grid item xs={12} key={chat.uuid} onClick={(e)=> {handleChatDetails(chat.uuid);setSingleRoom(chat)}}>
                                                <div className="chat_list_item active">
                                                    <div className="profile_active">
                                                        <div className="profile">
                                                            <Avatar alt={chat?.name} src={chat?.member?.profile?.avatar !=='null'?`${baseUrl}/${chat?.member?.profile?.avatar}`:"/static/images/avatar/1.jpg"}  />
                                                            {/* <div className="massage_count">
                                                                10+
                                                            </div> */}
                                                        </div>
            
                                                    </div>
                                                    <div className="chat_overview">
                                                        <div className="profile-name">{chat?.name && chat?.name.length>20?`${chat.name.slice(0,20)}...`:chat.name}</div>
                                                        {chat?.message !=='chat_room_create' && 
                                                             <div className="overview_massage">
                                                             {chat?.message && chat?.message.length>20?`${chat.message.slice(0,20)}...`:chat.message}
                                                         </div>
                                                        }
                                                       
                                                    </div>
                                                    <div className="lastMassage-time">
                                                       {fullTime}
                                                    </div>
                                                    <div className="senting">
                                                        <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    }) }
                               
                            </Grid>
                        </div>
                    </div>
                    {chatRoomDetails ===null &&  <Box display='flex' justifyContent='center' justifyItems='center'>
                        <Button sx={{ml:25}} disabled>No chats to show </Button>
                    </Box>}
                   {chatRoomDetails !==null && <ChatRoomDetailsBody chatRoomDetails={chatRoomDetails} singleRoom={singleRoom} setChatRoomDetails={setChatRoomDetails} handleChatDetails={handleChatDetails} getAllChatRooms={getAllChatRooms} />}
                </div>
            </div>
        </Fragment>
    );
};

export default ChatBody;