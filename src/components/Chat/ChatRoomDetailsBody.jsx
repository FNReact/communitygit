import React, { useContext, useEffect, useState } from 'react'
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
import { Avatar, Grid, TextField, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import { baseUrl, chatMessagesUrl, chatRoomUrl } from '../../api/Api';
import { UserContext } from '../../utils/UserContext';
import parser from 'html-react-parser';

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from 'axios';
import MainLoader from '../PageLoadEffects/MainLoader';
import Pusher from 'pusher-js';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { notifyError } from '../../utils/Toast';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



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

const ChatRoomDetailsBody = ({ chatRoomDetails, singleRoom, setChatRoomDetails, handleChatDetails, getAllChatRooms,allMembers }) => {
    const token = sessionStorage.getItem('token');
    const { userDetails,msDetails } = useContext(UserContext);
    const [emojiShow, setEmojiShow] = useState(0)
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null)
    const [loaderVisible, setLoaderVisible] = useState(false)

    const [headerTime, setHeaderTime] = useState(null)

    const [groupName, setGroupName] = useState('')
    const [storeGroupMembers, setStoreGroupMembers] = useState([])

    const [storeExistedMembers, setStoreExistedMembers] = useState([])
    const [memberTobeAdd, setStoreMemberToBeAdd] = useState([])
    const [ownerFind, setOwnerFind] = useState(false)

    const getAllExistedMembers = (chatRoomUuid)=>{
        console.log('hit')
        let config = {
            method: "get",
            url: `${chatRoomUrl}/${chatRoomUuid}/members?uuid=${chatRoomUuid}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios
            .request(config)
            .then((response) => {
                setStoreExistedMembers(response?.data)

                if(response?.data && response?.data.length>0){
                    response?.data.forEach(member => {
                        if(member?.is_owner ===true && userDetails.uuid === member?.user.uuid){
                            setOwnerFind(true)
                        }
                    });
                }


                var members =[];
                if(allMembers && allMembers.length>0){
                    allMembers.forEach(element => {
                        members.push(element.user)
                    });
                }
                // var difference = members.filter((x) => !response?.data.includes(x));

                var difference = members.filter(item1 => !response.data.some(item2 => (item2.name === item1.name)))

                console.log('difference', difference)

                var membertoAdd = [];
                if(difference && difference.length>0){
                    difference.forEach(element => {
                        if(element?.user?.uuid !==userDetails.uuid){
                            membertoAdd.push(element)
                        }
                    });
                }
                setStoreMemberToBeAdd(membertoAdd)

            })
            .catch((error) => { });
    }

    console.log('chatRoomDetails', chatRoomDetails)

    useEffect(()=>{
        if(chatRoomDetails?.meta?.chat_room){
            getAllExistedMembers(chatRoomDetails?.meta?.chat_room.uuid)
        }
    },[chatRoomDetails])


    useEffect(() => {
        var pusher = new Pusher("69ef518953032858d64d", {
            cluster: "ap1",
            encrypted: true,
            secret: 'b0f4e94b427b3b7529ce',
        });
        var channel = pusher.subscribe('presence.Users');
        channel.bind('presence.Users', async function (response) {
            alert('some notification');
        })
    }, []);



    useEffect(() => {
        // Get the GMT offset
        const date = new Date();
        const gmtOffsetHours = date.getTimezoneOffset() / 60; // Convert minutes to hours
        const gmtOffsetMinutes = date.getTimezoneOffset() % 60;

        // Create a string representation of the GMT offset
        const gmtOffsetString = (gmtOffsetHours >= 0 ? '+' : '-') +
            ('0' + Math.abs(gmtOffsetHours)).slice(-2)

        setGMTOffset(gmtOffsetString);

    }, []);



    // hnadle submit post
    const handleSubmitPost = () => {
        if (media !== null) {
            setLoaderVisible(true)
            let data = new FormData();
            data.append('chat_room', JSON.stringify(singleRoom));
            data.append('message', 'hh');
            data.append('file', media);
            let config = {
                method: 'post',
                url: chatMessagesUrl,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: data
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
        if (media === null) {
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
                data: data
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
    useEffect(() => {
        const date = new Date();
        const gmtOffsetHours = -date.getTimezoneOffset() / 60; // Convert minutes to hours
        const gmtOffsetMinutes = -date.getTimezoneOffset() % 60;

        // Create a string representation of the GMT offset
        const gmtOffsetString = (gmtOffsetHours >= 0 ? '+' : '-') +
            ('0' + Math.abs(gmtOffsetHours)).slice(-2)

        setGMTOffset(gmtOffsetString);
        if (chatRoomDetails?.meta?.chat_room) {
            const newTime = new Date(chatRoomDetails?.meta?.chat_room?.updated_at);
            const updateTime = newTime.setHours((newTime.getHours()) + (parseInt(gmtOffsetString)));

            let diffTime = Math.abs(updateTime.valueOf() - new Date().valueOf());
            let days = diffTime / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let secs = (minutes % 1) * 60;
            [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
            var fullTime;

            if (secs !== 0) {
                fullTime = secs + 's';
            }
            if (minutes !== 0 && secs !== 0) {
                fullTime = minutes + 'm' + " " + secs + 's';
            }
            if (hours !== 0 && minutes !== 0 && secs !== 0) {
                fullTime = hours + 'h' + " " + minutes + 'm' + " " + secs + 's';
            }
            if (days !== 0 && hours !== 0 && minutes !== 0 && secs !== 0) {
                fullTime = days + 'd' + " " + hours + 'h' + " " + minutes + 'm' + " " + secs + 's';
            }
            setHeaderTime(fullTime)
        }
    }, [])

    // Chat Group
    const [chatGroup, setchatGroup] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpenChatGroup = () => {
        setchatGroup(true);
    };

    const handleCloseChatGroup = () => {
        setchatGroup(false);
    };

    // handle create chat group
    const  handleCreateGroup = () =>{
        setLoaderVisible(true)
       
        var data = JSON.stringify({
            // "is_public_group": 'false',
            "members": storeGroupMembers,
            // "name": `${groupName} -Group In ${msDetails.name}`
        });
        let config = {
            method: 'post',
            url: `${chatRoomUrl}/${chatRoomDetails?.meta?.chat_room.uuid}/members`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                handleChatDetails(response?.data?.uuid);
                getAllChatRooms()
                handleCloseChatGroup()
                getAllExistedMembers(chatRoomDetails?.meta?.chat_room.uuid)
                setGroupName('')
                setStoreGroupMembers([])
                setLoaderVisible(false)
            })
            .catch((error) => {
                setLoaderVisible(false)
            });
    }


    console.log('chatRoomDetails', chatRoomDetails)


    // remove member from group
  const handleDeleteItem=(member)=>{
    Swal.fire({
        heightAuto: false,
        backdrop: false,
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            setLoaderVisible(true)
            var data = JSON.stringify({
                // "is_public_group": 'false',
                "members": member,
                "uuid":member?.user.uuid
                // "name": `${groupName} -Group In ${msDetails.name}`
            });
          let config = {
            method: "delete",
            url: `${chatRoomUrl}/${chatRoomDetails?.meta?.chat_room.uuid}/members`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data:data
          };
          axios 
            .request(config)
            .then((response) => {
                // handleChatDetails(response?.data?.uuid);
                getAllChatRooms()
                handleCloseChatGroup()
                getAllExistedMembers(chatRoomDetails?.meta?.chat_room.uuid)
                setGroupName('')
                setStoreGroupMembers([])
                setLoaderVisible(false)
            })
            .catch((error) => {
                notifyError('Something went wrong')
                setLoaderVisible(false)
            });
        }
      });  
}

    console.log('ownerFind', ownerFind)


    return (
        <>
            {loaderVisible === true && <MainLoader />}
            <div className="chatter_box_container">
                <div className="fixed_profilr_header">
                    <div className="ct_left">
                        <div className="profile">
                            {chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar ?
                                <img src={`${baseUrl}/${chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar}`} alt={chatRoomDetails?.meta?.name} />
                                : <Avatar alt={chatRoomDetails?.meta?.chat_room?.name} src="/static/images/avatar/1.jpg" />}
                        </div>
                        <div className="name_T">
                            <div className="name"> {chatRoomDetails?.meta?.chat_room?.name}</div>
                            <div className="active_status">{chatRoomDetails?.meta?.chat_room?.member_count?`${chatRoomDetails?.meta?.chat_room?.member_count} Members`:headerTime !== null && headerTime}</div>
                        </div>
                    </div>
                    <div className="ct_right">
                        <div className="chat_title_dashed">
                            <div className="dashed_btn" onClick={handleClickOpenChatGroup}>
                                <GroupAddIcon />
                            </div>
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
                    {chatRoomDetails && chatRoomDetails?.data && chatRoomDetails.data.length > 0 && chatRoomDetails.data.map((data, i) => {

                        const newTime = new Date(data?.sent_at);

                        // Add the GMT offset to the time
                        const updateTime = newTime.setHours((newTime.getHours()) + (parseInt(gmtOffset)));
                        // let diffTime = Math.abs(new Date().valueOf() - new Date(chat.created_at).valueOf());
                        let diffTime = Math.abs(new Date(updateTime).valueOf() - new Date().valueOf());
                        let days = diffTime / (24 * 60 * 60 * 1000);
                        let hours = (days % 1) * 24;
                        let minutes = (hours % 1) * 60;
                        let secs = (minutes % 1) * 60;
                        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
                        var fullTime;

                        if (secs !== 0) {
                            fullTime = secs + 's';
                        }
                        if (minutes !== 0 && secs !== 0) {
                            fullTime = minutes + 'm' + " " + secs + 's';
                        }
                        if (hours !== 0 && minutes !== 0 && secs !== 0) {
                            fullTime = hours + 'h' + " " + minutes + 'm' + " " + secs + 's';
                        }
                        if (days !== 0 && hours !== 0 && minutes !== 0 && secs !== 0) {
                            fullTime = days + 'd' + " " + hours + 'h' + " " + minutes + 'm' + " " + secs + 's';
                        }

                        return (
                            <>
                                {/* Owner text and media */}
                                {data?.message !== 'chat_room_create' && data?.user.uuid === userDetails.uuid &&
                                    <>
                                        {data?.message && data.message !== '%%chat_attachment_%%' && <div className="own_massage_item">
                                            <div className="own_chat">
                                                <div className="senting_massage">
                                                    {parser(data?.message)}
                                                    <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                        </div>}

                                        {data?.attachments && data?.attachments.length > 0 &&
                                            <div className="own_media_massage_item">
                                                {data.attachments.map((media, i) => {
                                                    const getMediaType = media?.mime.split('/')
                                                    if (getMediaType[0] === 'image') {
                                                        return (
                                                            <>
                                                                <div className="media_content">
                                                                    <img src={media.url} alt="" />
                                                                </div>
                                                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                            </>
                                                        )
                                                    }
                                                    if (media?.mime === 'video/mp4') {
                                                        return (
                                                            <>
                                                                <div className="media_content">
                                                                    <video class="video_file_img" controls controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                                                        <source src={media.url} type="video/mp4" autostart="false" />
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
                                                {chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar ?
                                                    <img src={`${baseUrl}/${chatRoomDetails?.meta?.chat_room?.member?.profile?.avatar}`} alt={chatRoomDetails?.meta?.name} />
                                                    : <Avatar alt={chatRoomDetails?.meta?.chat_room?.name} src="/static/images/avatar/1.jpg" />}
                                            </div>
                                        </div>

                                        {data?.message && data.message !== '%%chat_attachment_%%' &&
                                            <div className="chatter_chat">
                                                <div className="senting_massage">
                                                    {parser(data?.message)}
                                                    <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                </div>
                                            </div>}

                                        {data?.attachments && data?.attachments.length > 0 && <div className="chatter_media_massage_item">
                                            {data.attachments.map((media, i) => {
                                                if (media?.mime === 'image/jpeg') {
                                                    return (
                                                        <>
                                                            <div className="chatter_chat">
                                                                <div className="media_content">
                                                                    <img src={media.url} alt="" />
                                                                </div>

                                                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                            </div>

                                                        </>

                                                    )
                                                }
                                                if (media?.mime === 'video/mp4') {
                                                    return (
                                                        <>
                                                            <div className="chatter_chat">
                                                                <div className="media_content">
                                                                    <video class="video_file_img" controls controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                                                        <source src={media.url} type="video/mp4" autostart="false" />
                                                                    </video>
                                                                </div>
                                                                <div className="chat_timing"><i><FontAwesomeIcon icon={faCircleCheck} /></i> {new Date(updateTime).toLocaleTimeString()}</div>
                                                            </div>

                                                        </>
                                                    )
                                                }
                                            })}

                                        </div>}


                                        {/* <div className="massage_D">
                                            <i><FontAwesomeIcon icon={faReply} /></i>
                                            <i><FontAwesomeIcon icon={faTrash} /></i>
                                        </div> */}
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>
                <div className="chatting_Input_container">
                    <div className="attachment_content">

                        {/* Photo Part */}
                        {media && media !== null && media.type !== 'video/mp4' &&
                            <div className="photo_content">
                                <div className="photo_item">
                                    <img src={URL.createObjectURL(media)} alt="" />
                                    <div className="photo_overly" onClick={(e) => setMedia(null)}>
                                        <CloseIcon />
                                    </div>
                                </div>
                            </div>}

                        {/* Vedio Part */}
                        {media && media !== null && media.type === 'video/mp4' &&
                            <div className="vedio_content">
                                <div className="vedio_item">
                                    <video class="video_file_img" controlsList="nodownload" preload="metadata" webkit-playsinline="webkit-playsinline" >
                                        <source src={URL.createObjectURL(media)} type="video/mp4" />
                                    </video>
                                    <div className="vedio_overly" onClick={(e) => setMedia(null)}>
                                        <CloseIcon />
                                    </div>
                                    <i className="play_icon"> <PlayCircleOutlineIcon /></i>
                                </div>
                            </div>}
                    </div>
                    <div className="chating_path">
                        <div className="path_side_1">
                            <div className={'file-input'}>
                                <input
                                    disabled={content !== '' ? true : false}
                                    type="file"
                                    name="file-input"
                                    id="file-input"
                                    class={'file-input__input'}
                                    onChange={(e) => setMedia(e.target.files[0])}
                                />
                                <label class="file-input__label" for="file-input">
                                    <i className={content !== '' ? 'cursor_denied' : ''}><AddToPhotosIcon /></i></label>
                            </div>
                            <i onClick={(e) => { emojiShow === 0 ? setEmojiShow(1) : setEmojiShow(0); }}><EmojiEmotionsIcon /></i>
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
                            className={media && media !== null ? "cursor_denied path_side_2 " : "path_side_2"}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={media && media !== null ? true : false}
                        />
                        <div className="path_side_3" onClick={(e) => handleSubmitPost()}>
                            <i><SendIcon /> </i>
                        </div>
                    </div>
                </div>
            </div>

            


            {/* Chat Group Create Modal */}
            <Dialog
                fullScreen={fullScreen}
                open={chatGroup}
                onClose={handleCloseChatGroup}
                aria-labelledby="responsive-dialog-title"
                className='chat_group_modal'
            >
                <DialogTitle sx={{mt:4}} id="responsive-dialog-title">
                    {`Member ${chatRoomDetails?.meta?.chat_room?.name}`}
                </DialogTitle>
                <DialogContent>
                    <div className="chat_group_body">
                        <Grid container spacing={2}>
                            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField label="Group Name" variant="filled" fullWidth focused onChange={(e)=> setGroupName(e.target.value)} value={groupName} />
                            </Grid> */}
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div className="search_user">
                                <Autocomplete
                                    sx={{mt:2}}
                                    multiple
                                    id="checkboxes-tags-demo"
                                    // value={memberTobeAdd}
                                    onChange={(event, newValue) => {
                                        setStoreGroupMembers(newValue);
                                    }}
                                    options={memberTobeAdd}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option?.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Add Member" placeholder="Search " />
                                    )}
                                />
                                </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} sx={12}>
                                <div className='list_title'>Member List </div>
                                {storeExistedMembers && storeExistedMembers.length>0 && storeExistedMembers.map((member,i)=>{
                                    return(
                                        <div className="Aded_list" key={i}>
                                            <div className="list_item">
                                                <div className="item_left">
                                                <Avatar alt={member?.name} src={member?.user?.profile?.avatar?`${baseUrl}/${member?.user?.profile?.avatar}`:''} />
                                                <div className="u_name">
                                                    {member?.name}
                                                </div>
                                                </div>
                                                {ownerFind ===true && userDetails.uuid !== member?.user.uuid &&  <div className="item_right">
                                                    <i onClick={(e)=> handleDeleteItem(member)} ><DeleteIcon/></i>
                                                </div>}
                                               
                                            </div>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseChatGroup}>
                        Cancel
                    </Button>
                    <Button  variant="contained" onClick={(e)=> handleCreateGroup()}>
                        Add Now
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}







export default ChatRoomDetailsBody

