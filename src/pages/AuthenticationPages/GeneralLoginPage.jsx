import { Avatar, Backdrop, Button, Container, Grid, IconButton } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notifyError } from "../../utils/Toast";
import axios from "axios";
import {
  allMicrositeUrl,
  baseUrl,
  commonUserUrl,
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
import GeneralTopNavigation from "./GeneralTopNavigation";
import { ToastContainer } from "react-toastify";
const GeneralLoginPage = () => {
  const { userDetails,msDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null)
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loaderEffect, setLoaderEffect] = useState(false);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();

  const [allMicrosites, setAllMicrosites] = useState(null);

  const getData = sessionStorage.getItem('data')
  const token = sessionStorage.getItem('token')
  const getUserMicrositeIds = sessionStorage.getItem('user-ms-ids')




  // handle visit microsite
  const handleVisitNow = (uuid) => {
    let config = {
      method: "get",
      url: `${micrositeDetailsUrl}/${uuid}`,
    };

    axios.request(config).then((response) => {
      sessionStorage.setItem("msDetails", JSON.stringify(response.data));
      if(userDetails?.id && token){
        let config = {
          method: 'get',
          url: `${commonUserUrl}/${userDetails.id}/${msDetails.id}`,
        };
        axios.request(config)
        .then((response) => {
          window.location.href='/'
        })
        .catch((error) => {
          window.location.href='/register'
        });
      }else{
        window.location.href='/login-icircles'
      }
    });
  };

  //handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // handle search method
  const handleSearch = e => {
    e.preventDefault();
    setLoaderEffect(true);
    let data = new FormData();
    let config = {
      method: "get",
      url: `${allMicrositeUrl}?type_id=9&keyword=${inputValue}`,
      data: data,
    };


    if(inputValue ===''){
      setLoaderEffect(false);
      notifyError('Write something to search...',5000)
    }else{
      axios
      .request(config)
      .then((response) => {
        setLoaderEffect(false);
        setAllMicrosites(response.data.data);
      })
      .catch(() => {
        setLoaderEffect(false);
      });
    }
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

  // handle join

  const handleJoin = (data)=>{
    let config = {
      method: "get",
      url: `${micrositeDetailsUrl}/${data.uuid}`,
    };

    axios.request(config).then((response) => {
      sessionStorage.setItem("msDetails", JSON.stringify(response.data));
      window.location.href='/register-user-search'
    });
  }
  const handleLounge = (data)=>{
    let config = {
      method: "get",
      url: `${micrositeDetailsUrl}/${data.uuid}`,
    };

    axios.request(config).then((response) => {
      sessionStorage.setItem("msDetails", JSON.stringify(response.data));
      window.location.href='/'
    });
  }




  return (
    <Fragment>
      <GeneralTopNavigation back={false} />
      <form onSubmit={handleSearch}>
      <div className="entryWrapper">
        <div className="entry_wrap">
        <div className="home_title">
              Welcome to iCircles Community Microsites
            </div>
          <div className="commuinity_search_form">  
            <div className="searchBar">
              <input
                type="text"
                placeholder="Search Communities"
                className="form_control"
                onChange={(e) => handleInput(e)}
                value={inputValue}
              />
              <i ><Button   type="submit">
                <FontAwesomeIcon
                  icon={faSearch}
                /></Button>
              </i>
            </div>
          </div>
          <div className="community_list_item">
            {allMicrosites !== null && allMicrosites.length === 0 && (
              <>
                <div className="placeholder_text">No Data Found</div>
              </>
            )}
            <Grid container spacing={2}>
              {allMicrosites !== null &&
                allMicrosites.length > 0 &&
                allMicrosites.map((data, key) => {
                  var memberStatus;
                  if(sessionStorage?.getItem('user-ms-ids')){
                     memberStatus = sessionStorage?.getItem('user-ms-ids').indexOf(data.id)
                  }
                 if(data.subtype_id===9){
                  return (
                    <Grid item lg={3} sm={6} md={4} xs={12} key={key}>
                      <div className="commuinity_item">
                        <div className="commuinty_img">
                          {data.entity_logo !== null && (
                            <img
                              src={`${baseUrl}/${data.entity_logo}`}
                              alt=""
                            />
                          )}
                          {data.entity_logo === null && (
                            <img src={noImageNound} alt="" />
                          )}
                        </div>
                        {data.name !== null && (
                          <div className="commuinity_name">{data.name}</div>
                        )}

                        <div className="commuinity_location">
                          {data.location !== null && (
                            <>
                              <span>Address :</span> {data.location}
                            </>
                          )}
                        </div>
                        <div className="card_footer">
                          {/* <div
                            className="viewBtn"
                            onClick={(e) => navigate('/community-info-public', {state:{uuid:data.uuid, memberStatus:memberStatus}})}
                          >
                            Show More
                          </div> */}
                          {token &&  memberStatus !==-1 &&
                          <div
                            className="viewBtn"
                            onClick={(e) => handleLounge(data)}
                          >
                            Lounge
                          </div>}
                          {token &&  memberStatus ===-1  &&
                          <div
                            className="viewBtn"
                            onClick={(e) => handleJoin(data)}
                          >
                            Show More/Join
                          </div>}
                          {!token && 
                          <div
                            className="viewBtn"
                            onClick={(e) => handleJoin(data)}
                          >
                            Show More/Join
                          </div>}
                        </div>
                      </div>
                    </Grid>
                  );
                 }
                 
                })}
            </Grid>
          </div>
          {loaderEffect === true && <MainLoader />}
        </div>

        <ToastContainer />

        {/* Copyright text  */}
        <div className="Home_copy_right">
          @All rights reserved & powered by iCircles LLC.
        </div>
      </div>
      </form>
    </Fragment>
  );
};

export default GeneralLoginPage;
