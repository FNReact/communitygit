import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { loginUrl, passwordResetUrl, resetPasswordUrl, userMicrositesUrl, validategResetPasswordUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ThreeDotLoaderEffect } from "../../components/PageLoadEffects";
import GeneralTopNavigation from "./GeneralTopNavigation";
import { useForm } from "react-hook-form";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
const IcirclesResetPassowrdPage = () => {
  const [loaderShow, setLoadershow] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState('')

  const token = sessionStorage.getItem('token')


  const defaultValues = {
    email: '',
    code:'',
    newPaaword:'',
    confNewPassword:'',

    emailShow:true,
    codeShow:false,
    passwordShow:false,

    emailErrorMessage:null,
    emailSuccessMessage:null,

    codeErrorMessage:null,
    
    passwordErrorMessage:null
  
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


  // handle reset request
  const handleResetRequest = (e)=>{
    e.preventDefault();
    setLoadershow(true)
    let data = new FormData();
      data.append('email', values.email)

     let config = {
        method: 'post',
        url: passwordResetUrl,
        data : data
      };
    axios.request(config)
    .then((response) => {
      console.log('response', response)
      setValue('emailSuccessMessage', response?.data?.message)

      setValue('emailErrorMessage',null)

      setValue('emailShow', false)
      setValue('codeShow', true)

      setLoadershow(false)
    })
    .catch((error) => {
      if (error.response) {
        if(error.response?.data?.errors?.email[0]){
          setValue('emailErrorMessage', error.response?.data?.errors?.email[0])
        }
        setLoadershow(false)
      }
    });
  }

  // handle validate code for resettting
  const handleValidateCode = (e)=>{
    e.preventDefault();
    setLoadershow(true)
    let data = new FormData();
      data.append('email', values.email)
      data.append('code', values.code)

     let config = {
        method: 'post',
        url: validategResetPasswordUrl,
        data : data
      };
    axios.request(config)
    .then((response) => {
      setValue('codeShow', false)
      setValue('passwordShow', true)     
      setValue('codeErrorMessage', null)
      setValue('emailSuccessMessage', null)
      setLoadershow(false)
    })
    .catch((error) => {
      if (error.response) {
        if(error.response?.data?.errors?.message[0]){
          setValue('codeErrorMessage', error.response?.data?.errors?.message[0])
        }
        setLoadershow(false)
      }
    });
  }

  // handle set new password
  const handleSetNewPassword = (e)=>{
    e.preventDefault();
    setLoadershow(true)
    let data = new FormData();
      data.append('email', values.email)
      data.append('code', values.code)
      data.append('new_password', values.newPaaword)
      data.append('new_password_confirmation', values.confNewPassword)

     let config = {
        method: 'post',
        url: resetPasswordUrl,
        data : data
      };
    axios.request(config)
    .then((response) => {
        setLoadershow(false)
        notifySuccess('Reset Successfully !.')
        setTimeout(()=>{
            navigate('/login-icircles')
        },1500)
    })
    .catch((error) => {
      if (error.response) {
        if(error.response?.data?.errors?.new_password_confirmation[0]){
          setValue('passwordErrorMessage', error.response?.data?.errors?.new_password_confirmation[0])
        }
        setLoadershow(false)
      }
    });
  }


  return (
    <Fragment>
      {loaderShow === true && <MainLoader />}
        <div className="creatCommuinity_form_body">
              <GeneralTopNavigation back={false} />
             <div className="creatCommuinity_wrapper">
             <div className="creatCommuinity_wrap">
              <h5>Reset iCircles Password</h5>
                    <form>
                      {values.emailSuccessMessage !==null && <Alert severity="info">{values.emailSuccessMessage}</Alert>}
                      {values.emailShow ===true &&  <Box>
                          <form onSubmit={(e)=> handleResetRequest(e)}>
                            <Grid container spacing={1} sx={{mt:2}}>
                              <Grid item xs={12}>
                                <input type="text" className="form_control" onChange={(e)=> setValue('email', e.target.value)} value={values.email}  placeholder="iCircles Email" />
                                 {(values.emailErrorMessage !==null) && <Typography sx={{mt:1}} color={'red'} >{values.emailErrorMessage}</Typography>}
                              </Grid>
                              <Grid item xs={12}>
                                <Box sx={{mt:1 }}><Button variant="contained" fullWidth onClick={(e)=> handleResetRequest(e)} type="submit" >Request Reset</Button></Box>
                              </Grid>
                            </Grid>
                            </form>
                          </Box>}

                        {values.codeShow === true && <Box>
                          <form onSubmit={(e)=> handleValidateCode(e)}>
                            <Grid container spacing={1} sx={{mt:2}}>
                              <Grid item xs={12}>
                                <input type="text" className="form_control" value={values.email} disabled  placeholder="iCircles Email" />
                              </Grid>
                              <Grid item xs={12}>
                                <input type="password" className="form_control"  placeholder="Code" onChange={(e)=> setValue('code', e.target.value)} value={values.code} />
                                {(values.codeErrorMessage !==null) && <Typography sx={{mt:1}} color={'red'} >{values.codeErrorMessage}</Typography>}
                              </Grid>
                              <Grid item xs={12}>
                                <Box sx={{mt:1 }}><Button variant="contained" fullWidth type="submit" onClick={(e)=> handleValidateCode(e)} >Validate Code</Button></Box>
                              </Grid>
                            </Grid>
                            </form>
                          </Box>}
                         
                         {values.passwordShow === true &&  <Box>
                            <form onSubmit={(e)=> handleSetNewPassword(e)}>
                              <Grid container spacing={1} sx={{mt:2}}>
                                <Grid item xs={12}>
                                  <input type="text" className="form_control" value={values.email} disabled  placeholder="iCircles Email" />
                                </Grid>
                                <Grid item xs={12}>
                                  <input type="password" className="form_control"  placeholder="New Password" onChange={(e)=> setValue('newPaaword', e.target.value)} value={values.newPaaword} />
                                </Grid>
                                <Grid item xs={12}>
                                  <input type="password" className="form_control"  placeholder="Confirm New Password" onChange={(e)=> setValue('confNewPassword', e.target.value)} value={values.confNewPassword} />
                                </Grid>
                                {(values.passwordErrorMessage !==null) && <Typography sx={{mt:1}} color={'red'} >{values.passwordErrorMessage}</Typography>}
                                <Grid item xs={12}>
                                  <Box sx={{mt:1 }}><Button variant="contained" fullWidth type="submit" onClick={(e)=> handleSetNewPassword(e)} >Reset Password</Button></Box>
                                </Grid>
                              </Grid>
                            </form>
                          </Box>}
                    </form>

                    <Box sx={{mt:5}} display='flex'  justifyContent='center' justifyItems='center'>
                      <Button onClick={(e)=> navigate('/login-icircles')}>Go Back To Log In</Button>
                    </Box>
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

export default IcirclesResetPassowrdPage;
