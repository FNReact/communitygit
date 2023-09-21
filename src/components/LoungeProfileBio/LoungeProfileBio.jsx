import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import { baseUrl, createFeedsUrl } from "../../api/Api";
import { notifySuccess } from "../../utils/Toast";
import { UserContext } from "../../utils/UserContext";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/EditNote';
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

import PeopleIcon from '@mui/icons-material/People';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { ToastContainer } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';

const LoungeProfileBio = ({ data, getAllFeeds,getSingleFeedDetails,modalOpen,modalClose,createPost,setContent,setStoreUuid }) => {
 
  const getUrl = window.location.href;
  const segName = getUrl.split("/").pop();
  const navigate = useNavigate();
  const {userDetails, msDetails} = useContext(UserContext);
  const [userInfo, setUserInfo] = useState('')
  const token = sessionStorage.getItem("token");
  const [uuid, setUuid] = useState(
    data.user !== undefined ? data.user.uuid : ""
  );
  const [name, setName] = useState(
    data.user !== undefined ? data.user.name : ""
  );
  const [avater, setAvater] = useState(
    data.user !== undefined ? data.user.avatar : ""
  );
  const options = { year: "numeric", month: "short", day: "numeric" };
  const [date, setDate] = useState(
    data !== undefined
      ? new Date(data.created_at).toLocaleDateString("en-US", options)
      : ""
  );



  //get loggedin userinfo
  useEffect(()=>{
    const getLoggedInUserInfo = sessionStorage.getItem('loggedInUserInfo')
    // if(getLoggedInUserInfo){
    //   const parseInfo =JSON.parse(getLoggedInUserInfo)
    //   const parseUserDetails = JSON.parse(parseInfo?.user_details)
    //   setUserInfo(parseUserDetails)
    // }
  },[])



  // Delete  single feed
  const handleDeleteFeed = (uuid) => {
    Swal.fire({
      heightAuto: false,
      backdrop: false,
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "delete",
          url: `${createFeedsUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            notifySuccess();
            getAllFeeds();
            if(getSingleFeedDetails !==undefined){
              getSingleFeedDetails()
            }
          })
          .catch((error) => {});
      }
    });
  };

  // Hide single Feed
  const handleHideFeed = (uuid, getStatus) => {
    Swal.fire({
      heightAuto: false,
      backdrop: false,
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = new FormData();
        data.append("status", getStatus);
        let config = {
          method: "post",
          url: `${createFeedsUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        axios
          .request(config)
          .then((response) => {
            notifySuccess();
            getAllFeeds();
            if(getSingleFeedDetails !==undefined){
              getSingleFeedDetails()
            }
          })
          .catch((error) => {});
      }
    });
  };

  // Edit Post

  const handleEditFeed = (uuid, content) =>{
    setContent(content)
    setStoreUuid(uuid)
    modalOpen()
  }


  // MEnubar
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Fragment>
      <div className="profile_bio">
        <div className="profile_img">
          {userInfo?.avater?<img src={`${baseUrl}/${userInfo?.avater}`} alt={name} />:<img src={`${baseUrl}/${avater}`} alt={name} />}
        </div>
        
        <div className="profile_info">
          <div className="userName">
             {/* <a target="_blank"
                href={`${baseUrl}/persons/${uuid}`}
                className="profile_title">
                {name}
                </a> */}
                {(data?.user_id === userDetails.id)
                ?  <a className="profile_title cursorPointer" onClick={(e)=>navigate('/community-profile',{state:{uuid:uuid,userId:data.user_id,userData:data?.user}})}> {name}{' '}</a>
                :  <a className="profile_title cursorPointer" onClick={(e)=>navigate('/community-profile/other',{state:{uuid:uuid,userId:data.user_id,userData:data?.user}})}> {name}{' '}</a> }

                {userInfo !=='' && userInfo?.apartment_number 
                  && <a className="profile_title">{`(Apartment/Holding - ${userInfo?.apartment_number })`}</a>
                }
                
                {data && data.location && 
                 <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {data.location}
                 </span>}
          </div>
          <div className="post_timing">
            {date && date}{' '}
            {(data.status ===1)? <PeopleIcon/>: <PersonOffIcon/>}      
        </div>
        </div>
 
        <div className="postInfo">
            
            {userDetails.id === data.user.id && (
                <>
                  <IconButton
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={open ? 'composition-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      
                      <MoreHorizIcon/>
                    </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              {(data.status ===0)? <MenuItem 
                                  onClick={(e) =>{ handleClose(e); handleHideFeed(data.uuid,1)}}>
                                  <VisibilityIcon/>Make Public 
                              </MenuItem>
                              :
                              <MenuItem 
                               className="dropdown_menu_item"
                                  onClick={(e) =>{ handleClose(e); handleHideFeed(data.uuid,0)}}>
                                  <VisibilityOffIcon/> Make Private
                              </MenuItem>
                              }
                             
                              <MenuItem 
                                  onClick={(e) =>{ handleClose(e);  handleEditFeed(data.uuid, data.content)}}>
                                  <EditIcon/> Edit Post 
                              </MenuItem>
                              <MenuItem 
                                  onClick={(e) =>{ handleClose(e);  handleDeleteFeed(data.uuid)}}>
                                  <DeleteIcon/> Delete Post 
                              </MenuItem>
                            </MenuList>


                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              )}
              {segName ==='loungeitemDetail' &&  <div className="post_back_btn">
               <CloseIcon onClick={(e)=>{navigate(-1)}}/>
             </div>}
            
        </div>
      </div>
      {/* <ToastContainer/> */}
    </Fragment>
  );
};

export default LoungeProfileBio;
