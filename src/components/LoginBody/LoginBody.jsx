import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import H1 from "../../asset/image/homeDesign.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allMembersUrl,baseUrl,loginUrl } from "../../api/Api";


import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/Toast";

import { ThreeCircles } from "react-loader-spinner";
import { UserContext } from "../../utils/UserContext";
import { Box, Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GeneralTopNavigation from "../../pages/AuthenticationPages/GeneralTopNavigation";

import parse from 'html-react-parser'


const LoginBody = () => {
  const{msDetails, userDetails} = useContext(UserContext);
  const[allMembers,setAllMembers] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [device, setDevice] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState("login_btn");
  const [joinVisible, setJoinVisible] = useState(true);
  const [backButtonShow, setBackButtonShow] = useState(true)
  const [userCheck, setUserCheck] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setDevice("tablet");
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      setDevice("mobile");
    }
    setDevice("desktop");
  },[]);
  

  
  //get all members of a microsite
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

  const submitloginData = () => {
    setVisible(true);
    setLoginVisible("login_btn d-none");
    axios
      .post(loginUrl, {
        email: name,
        password: password,
        device_name: device,
      })
      .then(function (response) {
        setName("");
        setPassword("");
          if (response?.data?.token) {
              var find =0;
              var getStatus=0;
                allMembers.forEach(element => {
                  if(element?.user?.id === response?.data?.user?.id){
                      find =1;
                      getStatus =element.status
                      }
                  });
              if(find ===1){
                if(getStatus===1){
                  sessionStorage.setItem("token", response.data.token);
                  sessionStorage.setItem("data", JSON.stringify(response.data.user));
                  notifySuccess();
                  setVisible(false);
                  setLoginVisible("login_btn");
                  window.location.href = "/";
                }else{
                  setVisible(false);
                  setLoginVisible("login_btn");
                  notifyError('Pending access approval');
                }
              }else{
                setVisible(false);
                setLoginVisible("login_btn");
                notifyError('You are not the member of this community. Join First');
                setTimeout(()=>{
                  //  window.location.href='/register'
                  navigate('/register', {state:{email:name}})
                },3000)
              }
        }
      })
      .catch((error) => {
        setName("");
        setPassword("");
        setVisible(false);
        setLoginVisible("login_btn");
        if (error.response) {
          if (error?.response?.data?.errors?.email) {
            notifyError("The given data was invalid.");
          }
          if (error?.response?.data?.errors?.message) {
            notifyError("Your account is not yet activated.");
          }
        }
      });
      
  };


  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(()=>{
    const backbuttonStatus = sessionStorage.getItem('backbutton')
    if(backbuttonStatus ==='false'){
      setBackButtonShow(false)
    }
   },[])
  


  return (
    <Fragment>
           <div className="homeMainContent">
            <GeneralTopNavigation back ={backButtonShow} />   
               <div className="login_D_form">
                    <div className="login_d_left">
                         {msDetails && <div className="commuinity_name">{msDetails.name}</div>}
                        <div className="Community_img mb-5">
                            {msDetails && <img src={`${baseUrl}/${msDetails.entity_logo}`} alt={msDetails?.name} />}
                          </div>
                          {msDetails && <div className="community_location"> <LocationOnIcon/> {msDetails?.location}</div> }
                          {msDetails && <div className="tag_line">{msDetails?.tagline? parse(msDetails?.tagline):''}</div> }
                          {/* {msDetails && <p>{msDetails?.entity_details?.slice(0,240)} ... </p>} */}
                          {msDetails && <p>{msDetails?.entity_details? parse(msDetails?.entity_details):''}</p>}
                          {msDetails && <> <div className="commnity_contactor"> Contact : {msDetails?.entity_email} </div> </> }
                          {/* <Link to="/create" className="createCommuinity"> 
                            <div className="createCommunityBtn">
                               Create Your Community
                            </div>
                          </Link> */}
                    </div>
                    <div className="login_d_right">
                      <h6> Welcome ! </h6>
                      <div className="login_bday">
                        <form action="#">
                          <Grid container spacing={1}>
                           <Grid item xs={12}>
                              <div className="loginInput_filed">
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="form_control"
                                  name=""
                                  placeholder="Email or Username "
                                />
                              </div> 
                            </Grid>
                           
                          <Grid item xs={12}>
                            <div className="loginInput_filed">
                            <FormControl fullWidth >
                              <OutlinedInput
                                id="outlined-adornment-password"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>}/>
                            </FormControl>
                            </div>
                           </Grid>
                          
                             <Grid item xs={12}>
                               <div className="login_pass_save">
                                <div className="pass_left">
                                  <input type="checkbox" className="chequeB" />{" "}
                                  Remember
                                </div>
                                <div className="pass_right">
                                  Forget Password?
                                </div>
                              </div>
                            </Grid>
                          
                            {/* <Grid item xs={12}>
                              <Link to='/register'><div className={loginVisible}>Join Now</div></Link>
                            </Grid> */}

                          

                          <Grid item xs={12}>
                              <Link><div className={loginVisible}  onClick={submitloginData} >Log In</div></Link>
                            </Grid>
                           
                            <Grid item xs={12}>
                              <div className="loading_cercle">
                                <ThreeCircles
                                  height="50"
                                  width="50"
                                  color="#fefefe"
                                  wrapperStyle={{}}
                                  wrapperClass=""
                                  visible={visible}
                                  ariaLabel="three-circles-rotating"
                                  outerCircleColor=""
                                  innerCircleColor=""
                                  middleCircleColor=""
                                />
                              </div>
                            </Grid>
                            {/* <Grid item xs={12}>
                               <Link to="/register">
                                <h3> No account? Create account and log in.</h3>
                              </Link>
                            </Grid> */}
                            
                            {/* <Grid item xs={12}>
                               <Link to="/register">
                                <h3> Not member?.Join this community.</h3>
                              </Link>
                            </Grid> */}
                            
                          </Grid>
                        </form>
                      </div>
                    </div>
               </div>
            </div>
        {/* Copyright text  */}
        <div className="copy_right">
          @All rights reserved & powered by iCircles LLC. 
        </div>
      <ToastContainer />
    </Fragment>
  );
};

export default LoginBody;
