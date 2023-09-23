import { Backdrop, Button, Container, Grid, IconButton } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "../../utils/Toast";
import axios from "axios";
import {
  allMicrositeUrl,
  baseUrl,
  loginUrl,
  micrositeDetailsUrl,
} from "../../api/Api";
import logo from "../../asset/image/lms.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import noImageNound from "../../asset/image/noImage.jpg";
import ComBanner from "../../asset/image/BannerC.jpg";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from "../../utils/UserContext";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Groups3Icon from '@mui/icons-material/Groups3';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '../../asset/image/avatar.jpg'
const GeneralTopNavigation = ({back}) => {
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loaderEffect, setLoaderEffect] = useState(false);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();

  const [allMicrosites, setAllMicrosites] = useState(null);



  // handle visit microsite
  const handleVisitNow = (uuid) => {
    let config = {
      method: "get",
      url: `${micrositeDetailsUrl}/${uuid}`,
    };

    axios.request(config).then((response) => {
      sessionStorage.setItem("msDetails", JSON.stringify(response.data));
      window.location.href = "/login";
    });
  };

  //handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // handle search method
  const handleSearch = () => {
    setLoaderEffect(true);
    let data = new FormData();
    let config = {
      method: "get",
      url: `${allMicrositeUrl}?type_id=9&keyword=${inputValue}`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoaderEffect(false);
        setAllMicrosites(response.data.data);
      })
      .catch(() => {
        setLoaderEffect(false);
      });
  };

  useEffect(()=>{
    const getInfo = sessionStorage.getItem('data')
    const info = JSON.parse(getInfo)
    setName(userDetails?.profile?.name);
    setAvatar(userDetails?.profile?.avatar);
    setUserInfo(info)
},[])   

  // Dropdown 
  const [open, setOpen] = React.useState(false);
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

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("data");
    sessionStorage.removeItem("loggedInUserInfo");
    sessionStorage.removeItem("msDetails");
    sessionStorage.removeItem("user-ms-ids");
    
    window.location.href = "/home";
  };

  const getUrl = window.location.href;
  const segNamae = getUrl.split("/").pop();

  return (
    <Fragment>
      <div className="entry_header">
        <Container>
          <div className="entry_header_wrap">
            <Link to='/home'>
              <div className="entryHeader_logo">
                <img src={logo} alt="" />
              </div>
            </Link>
          
            <div className="entryHeader_right">
             
            
              <Link to="/create">
                <div className="createBtn">Create Community</div>
              </Link>
              {userInfo === null &&  
              <Link to="/login-icircles">
                <div className="createBtn">Log in</div>
              </Link>}
             
             

                {userInfo !== null &&   <div className="profile_dashed">
                      <IconButton
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}>
                        {
                          //Avatar
                          avatar ? (
                            <div className="profile_img">
                              <img
                                src={`${baseUrl}/${avatar}`}
                                alt={name}
                              />
                            </div>
                          ) : (
                            <div className="profile_img">
                              <img
                                src={Avatar}
                                alt={name}
                              />
                            </div>
                          )
                        }
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
                                <div className="menu_wrapper"
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}>
                                  <Link onClick={handleClose}>
                                    <div className="menu_profile" onClick={(e)=> window.location.href='/community-profile'}>
                                      <div className="menu_profile_left">
                                        {avatar ? (
                                          <div className="profile_img">
                                            <img
                                              src={`${baseUrl}/${avatar}`}
                                              alt={name}
                                            />
                                          </div>
                                        ) : (
                                          <div className="profile_img">
                                            <img
                                              src={`${Avatar}`}
                                              alt={name}
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <div className="userName">
                                        {name}
                                      </div>
                                    </div>
                                  </Link>
                                  <div className="menu_wrapper_list" onClick={(e) => window.location.href = '/commuinityList'}>
                                    <i><Groups3Icon /></i>
                                    <span>My Communities</span>
                                  </div>
                                
                                  
                                  <div className="menu_wrapper_list" onClick={logout}>
                                    <i><LogoutIcon /></i>
                                    <span>Log Out</span>
                                  </div>
                                </div>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                  </div>}
                 
                   
            </div>
          </div>
        </Container>
        {/* <div className="home_banner"> 
            <img src={ComBanner} alt="" />
         </div> */}
         {back ===true && segNamae!=='community-info-public' &&   
              <div className="backArrow_head" onClick={(e)=>{navigate(-1)}}>
                  <ArrowBackIcon/>
              </div>}
      {segNamae==='community-info-public' &&   
              <div className="backArrow_head" onClick={(e)=>{navigate('/home')}}>
                  <ArrowBackIcon/>
              </div>}
      </div>
    </Fragment>
  );
};

export default GeneralTopNavigation;
