import {Grid, Tooltip } from "@mui/material";

import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import CommunityInfoPublic from "../components/CommunityInfo/CommunityInfoPublic";
import { addUserUrl, micrositeDetailsUrl } from "../api/Api";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/Toast";
import { ToastContainer } from "react-toastify";
import GeneralTopNavigation from "./AuthenticationPages/GeneralTopNavigation";


const CommunityInfoPublicPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('token');
    var joiningRequest='';

    var uuid = location?.state?.uuid
    if(!uuid){
      const searchParams = new URLSearchParams(location.search);
      uuid = searchParams.get('com_uuid');
      joiningRequest = searchParams.get('joining_request');
    }
    const [details, setDetails] = useState('')
    const [status, setStatus] = useState(location?.state?.memberStatus?location.state.memberStatus:-1)
    useEffect(()=>{
      if(uuid){
          let config = {
            method: 'get',
            url: `${micrositeDetailsUrl}/${uuid}`,
          };
    
          axios.request(config)
          .then((response) => {
            setDetails(response.data)
            if(joiningRequest){
              if(token){
                let formData = new FormData();
                formData.append('microsite_id',response.data.id)
                formData.append('user_id',JSON.parse(sessionStorage.getItem('data')).id)
                formData.append('status',2)
                formData.append('user_type','member') 
                axios.post(addUserUrl,formData)
                .then((res)=>{
                  notifySuccess('Your request is pending for admin aproval!')
                })
                .catch((err)=>notifyError(err.response.data.errors.message[0]))
               }else{
                navigate('/login-icircles',{state:{redrirectTo:`/community-info-public?joining_request=yes&com_uuid=${response.data.uuid}`}})
               }
            }

          }).catch((e)=> {
            notifyError('Community not found!')
            setTimeout((e)=>{
              navigate('/home')
            },3000)
        })
      }else{
        navigate('/home')
      }
    },[])


  return (
    <Fragment>
        <GeneralTopNavigation back={true} />
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={12} lg={12}>
          {details &&   <div className="content_body">
              <CommunityInfoPublic msPublicDetails={details} memberStatus={status}  />
            </div>}
         </Grid>
      </Grid>
      <ToastContainer />
    </Fragment>
  )
}

export default CommunityInfoPublicPage