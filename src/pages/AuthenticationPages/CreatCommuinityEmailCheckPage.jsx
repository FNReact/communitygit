import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { userCheckUrl } from "../../api/Api";
import { Box, Button, Grid } from "@mui/material";
import { ThreeDotLoaderEffect } from "../../components/PageLoadEffects";
import GeneralTopNavigation from "./GeneralTopNavigation";
const CreatCommuinityEmailCheckPage = () => {
  const navigate = useNavigate();
  const [email,setEmail] =useState("");
  const [loaderShow, setLoadershow] = useState(false);

    // get email input
  const getEmail = (e)=>{
    setLoadershow(true)
    e.preventDefault();
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (email) {
      axios.post(userCheckUrl,{
        email: email
      }).then((response)=>{
        setLoadershow(false)
        if(response.data.length>0){
          navigate('/create/login', {state:{email:response.data[0].email}})
        }else{
          navigate('/create/register', {state:{email:email}})
        }
        
      }).catch((e)=> setLoadershow(false))
    }
  }

  useEffect(()=>{
    const getData = sessionStorage.getItem('data');
    if(getData){
        const data = JSON.parse(getData)
        // navigate('/create/newCommuinity')
        navigate('/community-packeges')
    }
    
  },[])


  return (
    <Fragment>
        <div className="creatCommuinity_form_body">
             <GeneralTopNavigation back={true} />
             <div className="creatCommuinity_wrapper">
             <div className="creatCommuinity_wrap">
              <h5>Email Check</h5>
              <h6>Check if you are connected to our iCircles .</h6>
                    <form>
                        <Grid sx={{mt:1}} container spacing={2}>
                            <Grid item xs={12}>
                              <input type="email" className="form_control" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your E-mail" />
                            </Grid>
                            <Grid item xs={12}>
                              {(email)? <Box><Button variant="contained" fullWidth onClick={(e)=> getEmail(e)} >Enter</Button></Box>
                              : <Box><Button variant="contained" fullWidth disabled >Enter</Button></Box>
                              }
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

export default CreatCommuinityEmailCheckPage;
