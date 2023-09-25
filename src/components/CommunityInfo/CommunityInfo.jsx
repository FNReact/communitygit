import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { allJobCategoryUrl, allJobsUrl, baseUrl } from "../../api/Api";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Box, Button, Grid, TextField, Tooltip } from "@mui/material";
import SunEditor from "suneditor-react";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from "../../asset/image/avatar.jpg";
import EditIcon from '@mui/icons-material/Edit';
import ReactReadMoreReadLess from "react-read-more-read-less";
import parse from 'html-react-parser'
const CommunityInfo = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [loaderEffect, setLoaderEffect] = useState(false)
   const token = sessionStorage.getItem('token');
   const { msDetails, userDetails } = useContext(UserContext)

   const userInfo = JSON.parse(sessionStorage?.getItem('loggedInUserInfo')) 
   const [details, setDetails] = useState(msDetails?.entity_details?msDetails.entity_details:'')



   return (
      <Fragment>
         <Tooltip title="Back">
            <div className="backArrow" onClick={(e) => { navigate(-1) }}>
               <ArrowBackIcon />
            </div>
         </Tooltip>
         <div className="communityInfo_wrapper">
               {msDetails?.meta?.banner &&
                  <div className="commuinity_banner">
                     <img src={`${baseUrl}/${msDetails?.meta?.banner}`} alt={msDetails?.name} />
                  </div>
               }
               <div className="community_top_info">
                  <div className="com_one">
                  <div className="com_logo">
                      <img src={`${baseUrl}/${msDetails?.entity_logo}`} alt={msDetails?.name} />
                   </div>
                   <div className="com_top_left">
                      <div className="com_name"> {msDetails?.name}</div>
                      <div className="tagline">{msDetails?.tagline?parse(msDetails?.tagline):''} </div>
                   </div>
                  </div>

                 <div>
                 {userInfo?.user_type ==='admin' &&  <div className="edit_button cursorPointer" onClick={(e)=> navigate('/community-setup')}>
                    <EditIcon/>  Edit 
                  </div>}
                 </div>
                 

               </div>
               <div className="com_info_body">
               <div className="com_details">{details? parse(details):''}</div>
                  <div className="com_info_wrap">
                     {msDetails?.entity_email && <div className="info_item"> E-mail : <span> {msDetails?.entity_email} </span></div>}
                     {msDetails?.entity_phone && <div className="info_item"> Phone : <span> {msDetails?.entity_phone}</span></div>}
                     {msDetails?.location && <div className="info_item"> Location : <span> {msDetails?.location}</span></div>}
                     {msDetails?.address && <div className="info_item"> Address : <span> {msDetails?.address}</span></div>}
                     {(msDetails?.website && msDetails?.website !=="null") && <div className="info_item"> Website : <span> {msDetails?.website}</span></div>}
                  
               </div>
               </div>
            </div>
         <ToastContainer />
      </Fragment>
   )
}

export default CommunityInfo

