import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { registerUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ThreeDotLoaderEffect } from "../../components/PageLoadEffects";
import GeneralTopNavigation from "./GeneralTopNavigation";


const CreatCommuinityRegisterPage = () => {
  const [loaderShow, setLoadershow] = useState(false);

  const getLocation = useLocation();
  const navigate = useNavigate();
  
  const [communityName,setCommunityName] = useState("");
  const [tagline,setTagLine] = useState("");
  const [website,setWebsite] = useState("");
  const [address,setAddress] = useState("");
  const [email,setEmail] =useState((getLocation.state !==null)?getLocation.state.email:'');
  const [phone,setPhone] =useState("");
  const [details, setDetails] = useState("")
  const [location, setLocation] = useState("");
  const [logo,setLogo] = useState("");
  const [logoPreview,setLogoPreview] = useState("");

  const [name,setName] = useState("");
  const [userName,setUserName] = useState("");
  const [showName,setShowName] = useState(0);
  const [showUserName,setShowUserName] = useState(0);
  const [memberID,setMemberID] = useState("");
  const [password,setPassword] = useState("");
  const [confPassword,setConfPassword] = useState("");
  const [showPassword,setShowPassword] = useState(0);
  const [showConfPassword,setShowConfPassword] = useState(0);
  const [getToken,setToken] = useState("");
  const [activationMsg,setActivationMsg] = useState(0);
  const [actionEffectValue,setActionEffectValue] = useState(false);


  const token = sessionStorage.getItem('token');

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [checked2, setChecked2] = useState(false);
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };


  //Register function
  const registerFunction = () =>{
    setLoadershow(true)
    setActionEffectValue(true)
    let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('username', userName);
      data.append('password', password);
      data.append('password_confirmation', password);

      let config = {
        method: 'post',
        url: `${registerUrl}`,
        data : data
      };

     
        axios.request(config)
        .then((response) => {
          setLoadershow(false)
          setActionEffectValue(false);
          setName('');
          setUserName('');
          setConfPassword('');
          setShowName(0);
          setShowUserName(0);
          setShowPassword(1);
          setShowConfPassword(0);
          setActivationMsg(1);
          notifySuccess('Registration success',2000)
          setTimeout(()=>{
            navigate('/create/login',{state:{message:true,email:email}})
          },3000)
        })
        .catch((error) => {
          if (error.response) {
            setActionEffectValue(false);
             setLoadershow(false)
            if (error?.response?.data?.errors?.email) {
              notifyError("The Email has already been taken");
            }
            if (error?.response?.data?.errors?.username) {
              notifyError("The Username has already been taken");
            }
          }
        });
        // .catch((error) => {
        //   console.log('err', error)
        //   if(password.length<6){
        //     notifyError('The Password must be at least 6 characters.')
        //   }
        //   setActionEffectValue(false);
        //   setLoadershow(false)

        // });
      
  }




  

  return (
    <Fragment>
      <div className="creatCommuinity_form_body">
          <GeneralTopNavigation back ={true} />   
                    <div className="creatCommuinity_wrapper">
                         <div className="creatCommuinity_wrap">
                          {/* <h5>Create iCircles account</h5> */}
                          <h5>Create  account</h5>
                          {/* <h6>For creating Commuinity you need to create iCircles account first !</h6> */}
                         
                              <form>
                                  <Grid container spacing={1} sx={{mt:2}}>
                                     <Grid item xs={12}>
                                       <input type="email" className="form_control"  placeholder="Email(*)" onChange={(e)=>setEmail(e.target.value)} value={email} />
                                     </Grid>
                                     <Grid item xs={12}>
                                       <input type="text" className="form_control"  placeholder="Name(*)" onChange={(e)=>setName(e.target.value)} />
                                     </Grid>
                                     <Grid item xs={12}>
                                       <input type="text" className="form_control"  placeholder="User Name(*)" onChange={(e)=>setUserName(e.target.value)} />
                                     </Grid>
                                     <Grid item xs={12}>
                                       <input type="password" className="form_control"  placeholder="Password(*)" onChange={(e)=>setPassword(e.target.value)} />
                                     </Grid>
                                     <Grid item xs={12}>
                                       <input type="password" className="form_control"  placeholder="Confirm Password(*)" onChange={(e)=>setConfPassword(e.target.value)} />
                                     </Grid>
                                     <Grid item xs={12} sx={{mt:2}}>
                                      <FormGroup>
                                          <FormControlLabel control={ <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="Acknowledge that I agree for an iCircles account.(*)" />
                                        </FormGroup>
                                      <FormGroup>
                                          <FormControlLabel control={ <Checkbox checked={checked2} onChange={handleChange2} inputProps={{ 'aria-label': 'controlled' }}/>} label="I agree to the terms & conditions and privacy policy.(*)" />
                                        </FormGroup>
                                     </Grid>
                                     <Grid item xs={12} sx={{mt:2}}>
                                        {(email && name && userName &&password !=='' &&confPassword !=='' &&  password ===confPassword && checked===true && checked2===true)?<Button variant="contained" fullWidth onClick={(e)=>registerFunction()}>Create Now</Button>
                                        :<Button variant="contained" fullWidth disabled>Create Now</Button>}
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

export default CreatCommuinityRegisterPage;
