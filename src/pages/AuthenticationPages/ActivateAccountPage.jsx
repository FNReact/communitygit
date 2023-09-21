import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { loginUrl } from "../../api/Api";
import { notifyError } from "../../utils/Toast";
import { ThreeDotLoaderEffect } from "../../components/PageLoadEffects";
import GeneralTopNavigation from "./GeneralTopNavigation";
const ActivateAccountPage = () => {

  const [loaderShow, setLoadershow] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState('')

  //login function
  const loginUser = ()=>{
    if(email && password){
      setLoadershow(true)
      axios
      .post(loginUrl, {
        email: email,
        password: password,
        device_name: 'desktop',
      })
      .then(function (response) {
          if (response.data.token) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('data', JSON.stringify(response.data.user))
            window.location.href='/commuinityList'
            // navigate('/commuinityList')
            // navigate('/create/newCommuinity')
            // setToken(response.data.token)
            setLoadershow(false)
        }else{
          navigate('/create/register', {state:{email:email}})
        }
      }).catch((error)=>{
        if (error.response) {
          setLoadershow(false)
          if (error?.response?.data?.errors?.email) {
            notifyError("These credentials do not match our records.");
          }
          if (error?.response?.data?.errors?.message) {
            notifyError("Your account is not yet activated.");
          }
        }
      })
      
    }
  }

  useEffect(()=>{
    if(location.state !=null){
      setEmail(location.state.email)
    }
  },[])


  return (
    <Fragment>
        <div className="creatCommuinity_form_body">
              <GeneralTopNavigation back={true} />
             <div className="creatCommuinity_wrapper">
             <div className="creatCommuinity_wrap">
              <h5> Activate your account.</h5>
              {/* <h6>To create Community you need to login your iCircles account first.</h6> */}
              {(location.state !== null && location.state.message===true ) && <button className="btn btn-warning" disabled>Your account is not yet activated.An activation link was sent to your email. Active first to create your microsite.</button>}
                    <form>
                        <Grid container spacing={1} sx={{mt:2}}>
                            <Grid item xs={12}>
                              <input type="password" className="form_control"  placeholder="Password" />
                            </Grid>
                            <Grid item xs={12}>
                              <input type="password" className="form_control"  placeholder="Confirm Password"/>
                            </Grid>
                            <Grid item xs={12}>
                              <Box sx={{mt:1 }}><Button variant="contained" fullWidth  >Reset Now</Button></Box>
                            </Grid>
                            <div className="btn_loader">
                                {ThreeDotLoaderEffect(loaderShow)}
                            </div>
                        </Grid>
                    </form>
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

export default ActivateAccountPage;
