import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { loginUrl, userMicrositesUrl } from "../../api/Api";
import { notifyError } from "../../utils/Toast";
import { ThreeDotLoaderEffect } from "../../components/PageLoadEffects";
import GeneralTopNavigation from "./GeneralTopNavigation";
const IcirclesLoginPage = () => {

  const [loaderShow, setLoadershow] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState('')

  const [rediresctTo, setRedirectTo] = useState('/commuinityList')
  const token = sessionStorage.getItem('token')

  useEffect(()=>{
    if(token){
      navigate(rediresctTo)
    }
    if(location.state !==null && location.state?.redrirectTo){
      setRedirectTo(location.state.redrirectTo)
    }
  },[])


  const getAllUserMicrosites = (token) => {
    let config = {
      method: 'get',
      url: `${userMicrositesUrl}?type_id=9`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.request(config)
      .then((response) => {
        var ids = [];
        if(response?.data?.data.length>0){
          response?.data?.data.forEach(element => {
            if(element.status ===1){
              ids.push(element.microsites.id)
            }
          });
        }
        sessionStorage.setItem('user-ms-ids', JSON.stringify(ids))
        window.location.href=`${rediresctTo}`
      }).catch((e)=>{
      }
      )
  }


  //login function
  const loginUser = e => {
    e.preventDefault();
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
            getAllUserMicrosites(response.data.token)
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
              <GeneralTopNavigation back={false} />
             <div className="creatCommuinity_wrapper">
             <div className="creatCommuinity_wrap">
              <h5> Login</h5>
              {(location.state !== null && location.state.message===true ) && <button className="btn btn-warning" disabled>Your account is not yet activated.An activation link was sent to your email. Active first to create your microsite.</button>}
                    <form onSubmit={loginUser}>
                        <Grid container spacing={1} sx={{mt:2}}>
                            <Grid item xs={12}>
                              <input type="text" className="form_control" onChange={(e)=> setEmail(e.target.value)} value={email}  placeholder="Enter Your E-mail/ Username" />
                            </Grid>
                            <Grid item xs={12}>
                              <input type="password" className="form_control"  placeholder="Enter iCircles Password" onChange={(e)=> setPassword(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                              <Box sx={{mt:1 }}><Button variant="contained" fullWidth  type="submit">Login</Button></Box>
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

export default IcirclesLoginPage;
