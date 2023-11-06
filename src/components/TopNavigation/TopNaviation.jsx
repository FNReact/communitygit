import React, { Fragment, useContext, useEffect, useState } from "react";
import lms from "../../asset/image/lms.png";
import whiteLogo from "../../asset/image/logo_white.png";
import blackLogo from "../../asset/image/logo_black.png";
import "../../asset/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import newsfeed from "../../asset/image/newsfeed.png";
import { UserContext } from "../../utils/UserContext";
import Avatar from "../../asset/image/avatar.jpg";
import { baseUrl, commonUserUrl } from "../../api/Api";
import { Box, Button, Container, Grid, IconButton, Tooltip } from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import Groups3Icon from '@mui/icons-material/Groups3';
import MenuIcon from '@mui/icons-material/Menu';

import mamberImg from "../../asset/image/noticeSideC.png";
import eventImg from "../../asset/image/noticeSideE.png";
import resources from "../../asset/image/noticeSideG.png";
import resourceImg from "../../asset/image/resourceSide.png";
import jobImage from "../../asset/image/jobSideH.png";
import representiveS from "../../asset/image/representiveSide.png";
import folder from "../../asset/image/folder.png";
import localRepresentetiveImg from "../../asset/image/representetive.png";
import coupleImg from "../../asset/image/couple.png";
import magazineImg from "../../asset/image/magazine.png";

import ChatIcon from '@mui/icons-material/Chat';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationsIcon from '@mui/icons-material/Notifications';
import BugReportIcon from '@mui/icons-material/BugReport';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
const TopNaviation = (props) => {

  const { userDetails, msDetails,loggedInUser } = useContext(UserContext);
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate();
  const [navElement, setNavElement] = useState({
    navBarTitle: "navTitle", //pass a className name
    navBarLogo: [whiteLogo], //pass an object
    navVariant: "dark",
    navBackgroundColor: "navBackground",
    navItemsColor: "navItems",
    pageTitle: props.title,
  });
  const onScroll = () => {
    if (window.scrollY > 100) {
      setNavElement({
        navBarTitle: "navTitleScroll",
        navBarLogo: [blackLogo],
        navVariant: "light",
        navBackgroundColor: "navBackgroundScroll",
        navItemsColor: "navItemsScroll",
      });
    } else if (window.scrollY < 100) {
      setNavElement({
        navBarTitle: "navTitle",
        navVariant: "dark",
        navBarLogo: [whiteLogo],
        navBackgroundColor: "navBackground",
        navItemsColor: "navItems",
      });
    }
  };

  window.addEventListener("scroll", onScroll);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("data");
    sessionStorage.removeItem("loggedInUserInfo");
    sessionStorage.removeItem("msDetails");
    
    window.location.href = "/home";
  };






   //get details
   const getMicrositeDetails = ()=>{
    let config = {
        method: 'get',
        url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
       const storeData = res?.data?.user_details
       const storeMeta = res?.data?.meta
       if(storeData){
        const info = JSON.parse(storeData)
        const meta = JSON.parse(storeMeta)

        if(info?.name){
          setName(info?.name);
        }else{
          setName(userDetails?.profile?.name);
        }
       
       
        if(info?.avater){
          setAvatar(info?.avater);
        }else{
          setAvatar(userDetails?.profile?.avatar);
        }
        // setCover(meta?.banner)
       }
      }).catch((e)=>  { })
}
useEffect(()=>{
  getMicrositeDetails()
  // if(userDetails){
  //   setName(userDetails?.profile?.name);
  //   setAvatar(userDetails?.profile?.avatar);
  // }
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

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);


  // Drawer 
  const [state, setState] = React.useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleMenuDrawer = (anchor) => {
    setState({ ...state, [anchor]: false });
  }


  return (
    <Fragment>
      <title>{navElement.pageTitle}</title>
      <header>
        <div className="header">
          <Container>
            <div className="header_content">
              <div className="mobile_commuinity_name">
                {/* {msDetails.name.length<24? <><div className="commuinity_name">{msDetails.name}</div></>:<>
                        <div className="commuinity_name">{msDetails.name.slice(0,24)}..</div></>} */}
              </div>
              <Grid container alignItems="center" className="mob_header_grid">
                <Grid item lg={4} xs={4}>
                  <div className="header_item">
                    <Link className="logo" to="/community-info">
                      <img src={lms} alt="" />
                    </Link>

                    {msDetails.name.length < 14 ? <><div onClick={(e)=> navigate('/community-info')} className="commuinity_name cursorPointer">{msDetails.name}</div></> : <>
                      <div onClick={(e)=> navigate('/community-info')} className="commuinity_name cursorPointer">{msDetails?.name?.slice(0, 14)}..</div></>}
                  </div>
                </Grid>
                <Grid item lg={4} xs={6}>
                  <div className="header_item_wrapper">
                    <Tooltip title="Home">
                      <Link to="/" onClick={(e)=> window.scroll(0,0)}>
                        <div className="header_item_list">
                          <HomeIcon />
                        </div>
                      </Link>
                    </Tooltip>
                    {/* <Link >
                        <div className="header_item_list">
                          <Badge badgeContent={4} color="primary">
                            <NotificationsIcon color="action" />
                          </Badge>
                        </div>
                      </Link> */}
                    <Tooltip title="Jobs">
                      <Link to="/job">
                        <div className="header_item_list">
                          <WorkIcon color="action" />
                        </div>
                      </Link>
                    </Tooltip>

                    <Tooltip title="Classified">
                      <Link to="/classified">
                        <div className="header_item_list">
                          <StoreIcon color="action" />
                        </div>
                      </Link>
                    </Tooltip>
                     
                      <Link >
                        <div className="header_item_list mob_none" onClick={(e)=>window.location.href='/home'}>
                          <SearchIcon color="action" />
                        </div>
                      </Link>
                   
                  </div>
                  
                </Grid>
                
                <Grid item lg={4} xs={2}>
                  <div className="header_item_wrapper2">
                  {(loggedInUser?.user_type ==='admin' || userDetails.id === msDetails?.user_id) &&
                      <Tooltip title="Community Setup" className="mob_none">
                            <Link to="/community-setup">
                            <div className="header_item_list">
                                <SettingsIcon color="action" />
                            </div>
                          </Link>
                        </Tooltip>
                      }
                  <Tooltip title="Report to admin" className="mob_none">
                      <Link to="/report-admin">
                        <div className="header_item_list">
                          <ReportIcon color="action" />
                        </div>
                      </Link>
                    </Tooltip>
                    {/* <Tooltip title="Report to developer">
                      <Link to="/report-developer">
                        <div className="header_item_list">
                          <BugReportIcon color="action" />
                        </div>
                      </Link>
                    </Tooltip> */}
                    <div className="profile_dashed">
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
                                src={`${Avatar}`}
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
                                  <Link >
                                    <div className="menu_profile" onClick={(e)=> {window.location.href=('/community-profile'); handleClose()}}>
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
                                  {(loggedInUser?.user_type ==='admin' || userDetails.id === msDetails?.user_id) && <div className="menu_wrapper_list" onClick={(e) => {navigate('/complete-profile');handleToggle()}}>
                                    <i><SettingsIcon /></i>
                                    <span>Complete Profile</span>
                                  </div>
                                  }
                                  
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
                    </div>
                    {['left'].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <div className="mobile_hamburger_icon" onClick={toggleDrawer(anchor, true)}>
                          <MenuIcon />
                        </div>
                        <SwipeableDrawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                          onOpen={toggleDrawer(anchor, true)}
                        >
                          {/* {list(anchor)} */}
                          <div className="drawer_Wrapper">
                            <Link>
                              <div className="profile_dashed_mob" onClick={(e)=> window.location.href='/community-profile'}>
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
                                <div className="user_name">
                                  {name}
                                </div>
                              </div>
                            </Link>
                            {/* <Link to="/commuinityList" onClick={(e)=> toggleDrawer(anchor, false)}>
                                  <div className="my_commuinity">
                                     <i><Groups3Icon/></i>
                                     <span>My Communities</span>
                                   </div>
                                </Link> */}
                             <Link to='/home' onClick={(e) => handleMenuDrawer(anchor)} >
                              <div className="my_commuinity" >
                                <i><SearchIcon /></i>
                                <span>Search Communities</span>
                              </div>
                            </Link>   
                            <Link to='/commuinityList' onClick={(e) => handleMenuDrawer(anchor)}>
                              <div className="my_commuinity">
                                <i><Groups3Icon /></i>
                                <span>My Communities</span>
                              </div>
                            </Link>

                            <Link to='/report-admin' onClick={(e) => handleMenuDrawer(anchor)}>
                              <div className="my_commuinity">
                                <i><ReportIcon /></i>
                                <span>Report to admin</span>
                              </div>
                            </Link>
                            {/* <Link to='/classified' onClick={(e) => handleMenuDrawer(anchor)} >
                              <div className="my_commuinity" >
                                <i><StoreIcon /></i>
                                <span>Classified</span>
                              </div>
                            </Link>    */}

                            {msDetails?.meta?.community_settings ===undefined && (loggedInUser?.user_type ==='admin' || userDetails.id === msDetails?.user_id) &&
                                <div className="sidebar_list">
                                  <Box display='flex' justifyContent='center' justifyItems='center'>
                                    <Button variant="contained" onClick={(e) => navigate('/community-setup')}>Setup Menu</Button>
                                  </Box>
                                </div>
                              }

                            {msDetails?.meta?.community_settings && <div className="sidebar_list">
                              {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.member_enable==='1'  
                                && msDetails?.meta?.community_settings?.member_menu_name &&
                                  <Link to='/member' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={mamberImg} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.member_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                               }
                              {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.my_lounge_post_enable==='1'  
                                  && msDetails?.meta?.community_settings?.my_lounge_menu_name &&
                                    <Link to='/community-profile' onClick={(e) => handleMenuDrawer(anchor)}>
                                      <div className="sidebar_list_item">
                                        <div className="list_icon">
                                          <img src={newsfeed} alt="" />
                                        </div>
                                        <div className="list_name">
                                          {msDetails?.meta?.community_settings?.my_lounge_menu_name}
                                        </div>
                                      </div>
                                    </Link>
                                }
                                {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.my_job_enable==='1'  
                                  && msDetails?.meta?.community_settings?.my_job_menu_name &&
                                  <Link to='/my-job-list' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={jobImage} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.my_job_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                              }
                              {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.event_enable==='1'  
                                && msDetails?.meta?.community_settings?.event_menu_name && 
                                <Link to='/event' onClick={(e) => handleMenuDrawer(anchor)}>
                                  <div className="sidebar_list_item">
                                    <div className="list_icon">
                                      <img src={eventImg} alt="" />
                                    </div>
                                    <div className="list_name">
                                      {msDetails?.meta?.community_settings?.event_menu_name}
                                    </div>
                                  </div>
                                </Link>
                               }
                                {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.resource_enable==='1'  
                                  && msDetails?.meta?.community_settings?.resource_menu_name &&  
                                  <Link to='/resource' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={resources} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.resource_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                              }
                               {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.media_enable==='1'  
                                  && msDetails?.meta?.community_settings?.media_menu_name &&
                                  <Link to='/media' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={folder} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.media_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                              }
                              {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.my_classified_enable==='1'  
                                && msDetails?.meta?.community_settings?.my_classified_menu_name &&
                                <Link to='/myClassified' onClick={(e) => handleMenuDrawer(anchor)}>
                                  <div className="sidebar_list_item">
                                    <div className="list_icon">
                                      <img src={resourceImg} alt="" />
                                    </div>
                                    <div className="list_name">
                                        {msDetails?.meta?.community_settings?.my_classified_menu_name}
                                    </div>
                                  </div>
                                </Link>
                              }
                              {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.business_enable==='1'  
                              && msDetails?.meta?.community_settings?.business_menu_name &&
                                <Link to='/localBusiness' onClick={(e) => handleMenuDrawer(anchor)}>
                                  <div className="sidebar_list_item">
                                    <div className="list_icon">
                                      <img src={representiveS} alt="" />
                                    </div>
                                    <div className="list_name">
                                      {msDetails?.meta?.community_settings?.business_menu_name}
                                    </div>
                                  </div>
                                </Link>
                              }
                               {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.representative_enable==='1'  
                                && msDetails?.meta?.community_settings?.representative_menu_name &&
                                  <Link to='/local-representatives' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={localRepresentetiveImg} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.representative_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                               }
                                {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.matrimony_enable==='1'  
                                  && msDetails?.meta?.community_settings?.matrimony_menu_name &&
                                  <Link to='/matrimonial' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={coupleImg} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.matrimony_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                                }
                               {msDetails?.meta?.community_settings && msDetails?.meta?.community_settings?.magazine_menu_enable==='1'  
                                && msDetails?.meta?.community_settings?.magazine_menu_name && 
                                  <Link to='/magazine' onClick={(e) => handleMenuDrawer(anchor)}>
                                    <div className="sidebar_list_item">
                                      <div className="list_icon">
                                        <img src={magazineImg} alt="" />
                                      </div>
                                      <div className="list_name">
                                        {msDetails?.meta?.community_settings?.magazine_menu_name}
                                      </div>
                                    </div>
                                  </Link>
                              }
                            </div>}

                            <div className="logout_btn"  onClick={logout}>
                              Logout
                            </div>
                          </div>
                        </SwipeableDrawer>
                      </React.Fragment>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </header>
    </Fragment>
  );
};

export default TopNaviation;
