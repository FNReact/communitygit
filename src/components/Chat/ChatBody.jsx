import { faArrowRight, faBoxArchive, faCircleCheck, faCircleUp, faMessage, faPlusSquare, faReply, faTrash, faUser, faUserGroup, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import L1 from '../../asset/image/profile2.png';
import test1 from '../../asset/image/com.jpg';
import test2 from '../../asset/image/Add.mp4';
import test3 from '../../asset/image/test1.png';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import { FreeMode } from "swiper";
import { Grid } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const ChatBody = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const openChatMenu = Boolean(anchorEl);
    const chatMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const chatMenuClose = () => {
        setAnchorEl(null);
    };

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
    const navigate = useNavigate();

    return (
        <Fragment>
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
                                Active Now
                            </div>
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={0}
                                freeMode={true}
                                modules={[FreeMode]}
                                className="mySwiper">
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="activeMamber">
                                        <img src={L1} alt='' />
                                        <div className="active_btn"></div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                         </div>
                        <div className="chat_list">
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <div className="chat_list_item active">
                                        <div className="profile_active">
                                            <div className="profile">
                                                <img src={L1} alt='' />
                                                <div className="massage_count">
                                                    10+
                                                </div>
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Fahim Ahmed </div>
                                            <div className="overview_massage">
                                                Lorem ipsum  sit amet elit.
                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            2 hr.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile active_online">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Nayem Munshi </div>
                                            <div className="overview_massage">
                                                Ok

                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            1 W.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item ">
                                        <div className="profile_active">
                                            <div className="profile">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Fahim Ahmed </div>
                                            <div className="overview_massage">
                                                Lorem ipsum  sit amet elit.
                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            2 hr.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile active_online">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Nayem Munshi </div>
                                            <div className="overview_massage">
                                                Ok

                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            1 W.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name"> Shahin Alam</div>
                                            <div className="overview_massage">
                                                Acca.
                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            8 hr.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Fahim Ahmed </div>
                                            <div className="overview_massage">
                                                Lorem ipsum  sit amet elit.
                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            2 hr.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile active_online">
                                                <img src={L1} alt='' />
                                            </div>

                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name">Nayem Munshi </div>
                                            <div className="overview_massage">
                                                Ok

                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            1 W.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="chat_list_item">
                                        <div className="profile_active">
                                            <div className="profile">
                                                <img src={L1} alt='' />
                                            </div>
                                        </div>
                                        <div className="chat_overview">
                                            <div className="profile-name"> Shahin Alam</div>
                                            <div className="overview_massage">
                                                Acca.
                                            </div>
                                        </div>
                                        <div className="lastMassage-time">
                                            8 hr.
                                        </div>
                                        <div className="senting">
                                            <i><FontAwesomeIcon icon={faCircleCheck} /></i>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="chatter_box_container">
                        <div className="fixed_profilr_header">
                            <div className="ct_left">
                                <div className="profile">
                                    <img src={L1} alt='' />
                                </div>
                                <div className="name_T">
                                    <div className="name">Fahim Ahmed</div>
                                    <div className="active_status">Active 2 hr. left</div>
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
                            {/* Chatter message delet */}
                            <div className="chat_delet_massage_item">
                                <div className="chat_delet_message">
                                  The message was deleted..
                                </div>
                            </div>

                            {/* Own message delet */}
                            <div className="own_delet_massage_item">
                                <div className="own_delet_message">
                                  The message was deleted..
                                </div>
                            </div>
                            {/* Owner Image */}
                            <div className="own_media_massage_item">
                                <div className="media_content">
                                    <img src={test3} alt="" />
                                </div>
                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                            </div>

                            {/* Chatter Image */}
                            <div className="chat_massage_item">
                                <div className="profile_part">
                                    <div className="chatter_profile">
                                        <img src={L1} alt='' />
                                    </div>
                                </div>

                                <div className="chatter_chat">
                                    <div className="chatter_media_massage_item">
                                        <div className="media_content">
                                            <img src={test3} alt="" />
                                        </div>
                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                                    </div>
                                    <div className=" massage_D">
                                        <ul>
                                            <li> <i><FontAwesomeIcon icon={faReply} /></i>  </li>
                                            <li> <i><FontAwesomeIcon icon={faTrash} /></i>  </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* chatter Media Vedio */}
                            <div className="chat_massage_item">
                                <div className="profile_part">
                                    <div className="chatter_profile">
                                        <img src={L1} alt='' />
                                    </div>
                                </div>

                                <div className="chatter_chat">
                                    <div className="chatter_media_massage_item">
                                        <div className="media_content">
                                            <video class="video_file_img" controls  controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                                <source src={test2} type="video/mp4"  autostart="false"/>
                                            </video>
                                        </div>
                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                                    </div>
                                    <div className=" massage_D">
                                        <ul>
                                            <li> <i><FontAwesomeIcon icon={faReply} /></i>  </li>
                                            <li> <i><FontAwesomeIcon icon={faTrash} /></i>  </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Chatter Massage */}
                            <div className="chat_massage_item">
                                <div className="profile_part">
                                    <div className="chatter_profile">
                                        <img src={L1} alt='' />
                                    </div>
                                </div>
                                <div className="chatter_chat">
                                    <div className="senting_massage">
                                        What are you doing right now?
                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                                    </div>
                                </div>
                            </div>

                            {/* Owner Media Vedio  */}

                            <div className="own_media_massage_item">
                                <div className="media_content">
                                    <video class="video_file_img" controls controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                        <source src={test2} type="video/mp4" autostart="false"/>
                                    </video>
                                </div>
                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                            </div>
                            
                            {/* Owner Massage */}
                            <div className="own_massage_item">
                                <div className="own_chat">
                                    <div className="senting_massage">
                                        OK Dear ?
                                        <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i>  12:38 AM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chatting_Input_container">
                            <div className="attachment_content">

                                {/* Photo Part */}

                                {/* <div className="photo_content">
                                    <div className="photo_item">
                                        <img src={test1} alt="" />
                                        <div className="photo_overly"> 
                                            <CloseIcon />
                                        </div>
                                    </div>
                                </div> */}

                                {/* Vedio Part */}

                                {/* <div className="vedio_content">
                                    <div className="vedio_item">
                                        <video class="video_file_img" controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                            <source src={test2} type="video/mp4" />
                                        </video>
                                        <div className="vedio_overly">
                                            <CloseIcon />
                                        </div>
                                        <i className="play_icon"> <PlayCircleOutlineIcon/></i>
                                    </div>
                                </div> */}
                            </div>
                            <div className="chating_path">
                                <div className="path_side_1">
                                    <div class="file-input">
                                        <input
                                            type="file"
                                            name="file-input"
                                            id="file-input"
                                            class="file-input__input"
                                        />
                                        <label class="file-input__label" for="file-input">
                                            <i><AddToPhotosIcon /></i></label>
                                    </div>
                                    <i><EmojiEmotionsIcon /></i>
                                </div>
                                {/* <div className="path_side_2">
                               
                            </div> */}
                                <StyledTextarea aria-label="empty textarea" placeholder="Type .. " className="path_side_2" />
                                <div className="path_side_3">
                                    <i><SendIcon/> </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ChatBody;