import React, { Fragment, useContext, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarGroup, Box, Button, Chip, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";
import axios from "axios";
import { allMembersUrl, baseUrl, eventParticipantUrl, eventsReviewUrl, eventsUrl } from "../../api/Api";
import { Image } from "antd";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../utils/UserContext";
import Swal from "sweetalert2";
import ReactReadMoreReadLess from "react-read-more-read-less";
import MultiSelect from "./MultiSelect";


import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import parser from 'html-react-parser'

import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

import EventCommentReplay from './EventCommentReplay'


const StyledMenu = styled((props) => (
   <Menu
     elevation={0}
     anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'right',
     }}
     transformOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
     {...props}
   />
 ))(({ theme }) => ({
   '& .MuiPaper-root': {
     borderRadius: 6,
     marginTop: theme.spacing(1),
     minWidth: 180,
     color:
       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
     boxShadow:
       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
     '& .MuiMenu-list': {
       padding: '4px 0',
     },
     '& .MuiMenuItem-root': {
       '& .MuiSvgIcon-root': {
         fontSize: 18,
         color: theme.palette.text.secondary,
         marginRight: theme.spacing(1.5),
       },
       '&:active': {
         backgroundColor: alpha(
           theme.palette.primary.main,
           theme.palette.action.selectedOpacity,
         ),
       },
     },
   },
 }));
 


const EventDetailsBody = () => { 
   const location = useLocation();
   const navigate = useNavigate();
   const token = sessionStorage.getItem('token');
   const {userDetails, msDetails} = useContext(UserContext)
   const [eventDetail, setEventDetail] = useState(null)
   const [eventComment, setEventComment] = useState([]);
   const [reviewDetails, setReviewDetails] = useState(null)
   const [loaderEffect, setLoaderEffect] = useState(false)
   const [eventID, setEventID] = useState(null)
   const [options, setOptions] = useState( [])
   const [participents, setParticipents] = useState(null)
   const [value, setValue] = useState([]);

   const [participentStatus, setParticipentStatus] = useState(null);
   const [participentUuid, setParticipentUuid] = useState(null);

   const [evevntCreateBy, setEventCreateBy] = useState((location.state !==null)?location.state.event.meta.create_by:null)

   const [replayClass, setReplayClass] = useState(`review_add_field d-none`)


 
   

// get single details from api
const handleGetSingleDetail = ()=>{
   let config = {
      method: 'get',
      url: `${eventsUrl}/${location.state.uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setEventDetail(response.data)
      getAllEventComments(response.data.id);
      handleGetParticipant(response.data.id)
      getAllMembers();
      setEventID(response.data.id)
    })
    .catch((error) => {
     
    });

}
// call Single Details
useEffect(()=>{
   if(location.state !==null){
      handleGetSingleDetail();
   }
},[])

// Get all event comment
const getAllEventComments = (eventId)=>{
   let config = {
      method: 'get',
      url: `${eventsReviewUrl}?events_id=${eventId}`,
      headers: { 
         'Authorization': `Bearer ${token}`
       }
    };
    
    axios.request(config)
    .then((response) => {
      
      setEventComment(response.data.data)
    })
    .catch((error) => {
     
    });
    
}

// handle review Created
const handleReviewCreated = (uuid,text, parentId)=>{
   setLoaderEffect(true)
   let data = new FormData();
      data.append('events_id', eventDetail.id);
      if(uuid ===null){
         data.append('details', reviewDetails);
      }
      if(text !==null && text !==''){
         data.append('details', text);
      }

      if(parentId !==null){
         data.append('parent_id', parentId);
      }

      data.append('status', '1');

      var config;
      if(uuid !==null){
         config = {
            method: 'post',
            url: `${eventsReviewUrl}/${uuid}`,
            headers: { 
               'Authorization': `Bearer ${token}`,
            },
            data : data
         };
      }else{
         config = {
            method: 'post',
            url: eventsReviewUrl,
            headers: { 
               'Authorization': `Bearer ${token}`,
            },
            data : data
         };
      }

      axios.request(config)
      .then((response) => {
         setReviewDetails('')
         setLoaderEffect(false)
         getAllEventComments(eventDetail.id);
         notifySuccess();
      })
      .catch((err)=>{
         setReviewDetails('')
         setLoaderEffect(false)
         if (err?.response) {
           notifyError(err?.response?.data?.message)
         }else{
           notifyError('Something went wrong!.')
         }
       })
}

// handdle delete event commment
const handleDeleteEventComment = (uuid)=>{
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
         let config = {
           method: "delete",
           url: `${eventsReviewUrl}/${uuid}`,
           headers: {
             Authorization: `Bearer ${token}`,
           },
         };
         axios 
           .request(config)
           .then((response) => {
             notifySuccess();
             getAllEventComments(eventID);
           })
           .catch((err)=>{
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          })
       }
     });  
}

// handle comment edit modal 
const handleCommentEdit =async(comment)=>{
   
   const { value: text } = await Swal.fire({
      inputValue:comment.details,
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      handleReviewCreated(comment.uuid, text, null)
      // Swal.fire(text)
    }
}


// handle get all participents of a event
const handleGetParticipant = (eventId) =>{
   let config = {
      method: 'get',
      url: `${eventParticipantUrl}/${eventId}`,
    };
    
    axios.request(config)
    .then((response) => {
      setParticipents(response.data.data)
      response.data.data.forEach(element => {
         if(element?.user_id === userDetails.id){
            setParticipentStatus(element.status)
            setParticipentUuid(element.uuid)
         }
      });
     
    })
    .catch((error) => {
    });
}

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
      if (response.data.data.length > 0) {
         
         response.data.data.forEach((element) => {
          options.push({
            label: element?.user?.name,value: element?.user_id
          });
        });
      }

    })
    .catch((error) => {});
}



// handleInviteMember
const handleInviteMember = ()=>{
   value.forEach(element => {
      let data = new FormData();
      data.append('events_id', eventDetail.id);
      data.append('user_id', element.value);
      data.append('status', '0');

      let config = {
      method: 'post',
      url: eventParticipantUrl,
      headers: { 
         'Authorization': `Bearer ${token}`, 
      },
      data : data
      };

      axios.request(config)
      .then((response) => {
         
         handleGetParticipant(eventDetail.id);
         handleClose2();
      })
   });
}


//handle update participents status
const handleUpdateStatus =(status)=>{
   let data = new FormData();
   data.append('status', status);

   let config = {
       method: 'post',
       url: `${eventParticipantUrl}/${participentUuid}`,
       headers: { 
         'Authorization': `Bearer ${token}`,
       },
       data : data
     };

     axios.request(config)
     .then((response) => {
      handleGetSingleDetail()
     })
     .catch((err)=>{
      if (err?.response) {
        notifyError(err?.response?.data?.message)
      }else{
        notifyError('Something went wrong!.')
      }
    })

 }



   
  // Dialogue Part
  const [invite, setInvite] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setInvite(true);
  };

  const handleClose2 = () => {
    setInvite(false);
  };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };
    const handleCloseInterested = () => {
      setAnchorEl2(null);
    };

  

  return (
    <Fragment>
        <div className="event_details_body">
            <div className="event_details_top" style={{backgroundImage: `url(${baseUrl}/${eventDetail?.meta?.banner})`}}>
                 <div className="details_header">
                    <h4>Event Details</h4>
                    <div className="details_header_right">
                        {userDetails?.id ===eventDetail?.user_id  && <div className="dropDown_icon" onClick={(e)=>navigate('/event-banner', {state:{uuid:location.state.uuid,event:location.state.event}})}>
                          <EditIcon/>
                       </div> }
                       
                       {/* <div className="dropDown_icon" onClick={(e)=>{navigate(-1)}}>
                          <CloseIcon/>
                       </div> */}
                    </div>
                 </div>
                 <div className="event_info">
                  {(eventDetail !==null && eventDetail.title) && <div className="event_title">{eventDetail.title}</div>}
                     <div className="eventTime" >
                        {(eventDetail !==null && eventDetail.date) && <><AccessTimeIcon/> {eventDetail.date}</>}
                        <Box sx={{ml:1}}>
                            {(eventDetail !==null && eventDetail.location) && <><LocationSearchingIcon/> {eventDetail.location}</>}
                        </Box>
                       
                     </div>
                     {eventDetail?.meta?.direction_url &&  <div className="event_location">
                       <a  href={eventDetail?.meta?.direction_url} target="_blank" ><LocationOnIcon /> Venue Direction</a> 
                     </div>}
                    
                 </div>
            </div>

            <div className="invite_section">
                    <div className="invite_top">
                        <div className="invite_top_left">
                       <div className="member_div">
                       <span onClick={(e)=>navigate('/event/invite',{state:{participents:participents,eventDetail:eventDetail,going:false}})}>People invited</span>
                           <div className="guestList_ShortView">
                           <AvatarGroup max={4}>
                              {participents !==null && participents.map((participant,key)=>{
                                 return(
                                       <Tooltip title={participant?.user?.name}>
                                          <Avatar src={`${baseUrl}/${participant?.user?.avatar}`} alt={participant?.user?.name}/>
                                       </Tooltip>
                                 )
                              })}
                           </AvatarGroup>
                           </div>
                       </div>
                           

                            <Divider orientation="vertical" variant="middle" flexItem >|</Divider>
                           <div className="member_div">
                           <span onClick={(e)=>navigate('/event/invite',{state:{participents:participents,eventDetail:eventDetail,going:true}})}>People Going</span>
                            <div className="guestList_ShortView" sx={{ml:3}}>
                              <AvatarGroup max={4}>
                                 {participents !==null && participents.map((participant,key)=>{
                                    if(participant.status ===3){
                                       return(
                                          <Tooltip title={participant?.user?.name}>
                                             <Avatar src={`${baseUrl}/${participant?.user?.avatar}`} alt={participant?.user?.name}/>
                                          </Tooltip>
                                    )
                                    }
                                 })}
                              </AvatarGroup>
                           </div>
                           </div>
                           

                        </div>
                        {participentStatus===0 && userDetails.id !== evevntCreateBy && <Chip label="Invited" color='primary' />}
                        {participentStatus ===1 && userDetails.id !== evevntCreateBy && <Chip label="Participated" color='success' />}
                        {participentStatus ===2 && userDetails.id !== evevntCreateBy && <Chip label="Interested" color='warning' />}
                        {participentStatus ===3 && userDetails.id !== evevntCreateBy && <Chip label="Going" color='info' />}
                        {participentStatus ===4 && userDetails.id !== evevntCreateBy && <Chip label="Not Going" color='warning' />}
                        {participentStatus ===5 && userDetails.id !== evevntCreateBy && <Chip label="Not Participated" color='primary' />}
                        <div className="invite_top_right">
                           {location.state !==null && userDetails.id === location.state.event.meta.create_by && 
                           <div className="invite_btn" onClick={(e)=>{handleClickOpen()}}>
                                 <AddIcon/> Invite People
                            </div>}
                           {location.state !==null && participentStatus !==1 && userDetails.id !== evevntCreateBy && participentUuid !==null &&
                            <div>
                              <Button
                                
                                 id="demo-customized-button"
                                 aria-controls={open2 ? 'demo-customized-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={open2 ? 'true' : undefined}
                                 variant="contained"
                                 disableElevation
                                 onClick={handleClick2}
                                 endIcon={<KeyboardArrowDownIcon />}
                                 >
                                 Are You Interested To ?
                              </Button>
                                 <StyledMenu
                                 id="demo-customized-menu"
                                 MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                 }}
                                 anchorEl={anchorEl2}
                                 open={open2}
                                 onClose={handleCloseInterested}
                                 >
                                    {participentStatus ===null && <MenuItem onClick={(e)=> {handleUpdateStatus('0');handleCloseInterested()}} disableRipple>Get Invitation</MenuItem>}
                                    <MenuItem onClick={(e)=> {handleUpdateStatus('1');handleCloseInterested()}} disableRipple>Participated</MenuItem>
                                    <MenuItem onClick={(e)=> {handleUpdateStatus('2');handleCloseInterested()}} disableRipple>Interested</MenuItem>
                                    <MenuItem onClick={(e)=> {handleUpdateStatus('3');handleCloseInterested()}} disableRipple>Going</MenuItem>
                                    <MenuItem onClick={(e)=> {handleUpdateStatus('4');handleCloseInterested()}} disableRipple>Not Going</MenuItem>
                                    <MenuItem onClick={(e)=> {handleUpdateStatus('5');handleCloseInterested()}} disableRipple>Not Participated</MenuItem>
                                 </StyledMenu>
                           </div>
                            
                            }
                           
                        </div>
                    </div>
             </div>
             <div className="event_details">
                <h5>Event Description</h5>
                {(eventDetail !==null && eventDetail.details) &&<>{parser(eventDetail.details)}</>}
             </div>
             
             <div className="details_file_container">
                {(eventDetail !==null && eventDetail.files) && eventDetail.files.map((event, key)=>{
                  return(
                     <div className="file_tab" key={event.uuid}>
                         <Image
                              width={200}
                              src={event.url}
                           />
                        {/* <img src={event.url} alt={event.name} /> */}
                     </div>
                  )
                })}
             </div>

             <div className="reviewsWrapper">
                <div className="reviews_heading">
                    <h4>Notification</h4>
                </div>
                <div className="review_add_field">
                  <TextField
                    value={reviewDetails}
                    id="filled-multiline-static"
                    label="Type Here..."
                    multiline
                    fullWidth
                    rows={3}
                    variant="filled"
                    focused
                    onChange={(e)=> setReviewDetails(e.target.value)}
                  />
                </div>
                  <div className="submit_riview">
                     {(reviewDetails !==null && reviewDetails !=='') && <Button variant="contained" onClick={(e)=>handleReviewCreated(null,null,null)} endIcon={<SendIcon />} ></Button>}
                     {(reviewDetails === null || reviewDetails ==='') && <Button variant="outlined" disabled endIcon={<SendIcon />}></Button>}
                  </div>
                  <div className="btn_loader">
                       {ThreeDotLoaderEffect(loaderEffect)}
                    </div>
                 {(eventDetail !==null && eventComment.length ===0) && <div><Button disabled>No Reviews Found</Button></div>} 
               


                     {(eventDetail !==null && eventComment.length>0) 
                     && 
                        <div className="review_item" >
                        {/* <div className="review_item_wrapper"> */}
                           {/* <div className="reviewer_img">
                              {comment?.user?.avatar && <img src={`${baseUrl}/${comment.user.avatar}`} />}
                           </div>
                           <div className="review_content">
                              <div className="reviewr_info">
                                 {comment?.user?.name &&<>{comment.user.name}<span>{new Date(comment.created_at).toLocaleDateString()}</span></>}
                              </div>
                              {comment?.details &&
                              <div className="review_massage">
                                 <ReactReadMoreReadLess
                                    charLimit={500}
                                    readMoreText={"Read more"}
                                    readLessText={"Read less"}
                                 >
                                    {comment.details}
                                 </ReactReadMoreReadLess>
                              </div>}
                              
                           </div> */}

                        {/* </div> */}

                                 <div class="comments-container">
                                    <ul id="comments-list" class="comments-list">
                                    {(eventDetail !==null && eventComment.length>0) && eventComment.map((comment, key)=>{
                                       return(
                                          <EventCommentReplay 
                                          key={comment.uuid} 
                                          comment={comment} 
                                          reviewDetails={reviewDetails} 
                                          setReviewDetails={setReviewDetails} 
                                          handleReviewCreated={handleReviewCreated} 
                                          userDetails={userDetails} 
                                          handleCommentEdit={handleCommentEdit}
                                          handleDeleteEventComment={handleDeleteEventComment}
                                          />
                                       )
                                       })
                                    } 
                                    </ul>
                                 </div>

                        
                        </div>
                     }
                   
                
             </div>
        </div>
      <Dialog
        fullScreen={fullScreen}
        open={invite}
        aria-labelledby="responsive-dialog-title"
      >
         <div className="selector_body">
           <MultiSelect
               items={options}
               // getOptionDisabled={getOptionDisabled}
               label="Select member to invite"
               placeholder="Select member to invite"
               selectAllLabel="Select all"
               onChange={setValue}
               participents={participents}
            />
         </div>
         <Box
            sx={{mb:3}}
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
             {(value.length>0)?<Button className="invite_modal_btn" variant="contained" onClick={(e)=> handleInviteMember()}>Invite Now</Button>
             :
             <Button className="invite_btn_disable" variant="contained" disabled>Invite Now</Button>
             }  
           
           <Button className="invite_cancel_btn" onClick={(e)=>{handleClose2(); setValue([])}}>Cancel</Button>
            
         </Box>
      </Dialog>
      <ToastContainer />
    </Fragment>
  );
};

export default EventDetailsBody;
