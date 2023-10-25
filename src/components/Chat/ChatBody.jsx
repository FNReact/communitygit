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
import { allMembersUrl, baseUrl, chatDetailsUrl } from "../../api/Api";
import ChatRoomDetailsBody from "./ChatRoomDetailsBody";
import axios from "axios";
import MainLoader from "../PageLoadEffects/MainLoader";
import { UserContext } from "../../utils/UserContext";

const ChatBody = ({chatRooms,setChatRooms, getAllChatRooms}) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const {msDetails} = useContext(UserContext)
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
            url: `${chatDetailsUrl}?chat_room=${roomUuid}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
          axios.request(config)
          .then((response) => {
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
    

    console.log('allMembers', allMembers)

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
                                    return(
                                        <SwiperSlide>
                                            <div className="activeMamber" key={member.uuid}>
                                                <img src={`${baseUrl}/${member?.user?.avatar}`} alt={member?.user?.name} />
                                                <div className="active_btn"></div>
                                            </div>
                                        </SwiperSlide>
                                    )
                               })}  
                            </Swiper>
                        </div>
                         </div>
                        <div className="chat_list">
                            <Grid container spacing={0}>
                                {storeMembers 
                                    && storeMembers.length>0 
                                    && storeMembers.map((chat, i)=>{
                                        // let diffTime = Math.abs(new Date().valueOf() - new Date(chat.created_at).valueOf());
                                        let diffTime = Math.abs(new Date(chat?.updated_at).valueOf() - new Date().valueOf());
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
                                                            {chat?.is_group ===true? 
                                                            <Avatar alt={chat?.name} src="/static/images/avatar/1.jpg"/>
                                                            :<img src={`${baseUrl}/${chat?.member?.profile?.avatar}`} alt={chat?.name} />}
                                                            {/* <div className="massage_count">
                                                                10+
                                                            </div> */}
                                                        </div>
            
                                                    </div>
                                                    <div className="chat_overview">
                                                        <div className="profile-name">{chat?.name && chat?.name.length>20?`${chat.name.slice(0,20)}...`:chat.name}</div>
                                                        <div className="overview_massage">
                                                            {chat?.message && chat?.message.length>20?`${chat.message.slice(0,20)}...`:chat.message}
                                                        </div>
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