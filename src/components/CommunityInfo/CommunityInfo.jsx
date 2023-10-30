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
   const [details, setDetails] = useState(msDetails?.entity_details ? msDetails.entity_details : '')
   const [appartmentDetails, setAppartmentDetails] = useState(msDetails?.meta?.community_settings ? msDetails?.meta?.community_settings : '')

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
                     <div className="tagline">{msDetails?.tagline ? parse(msDetails?.tagline) : ''} </div>
                  </div>
               </div>

               <div className="edit_B">
                  {userInfo?.user_type === 'admin' && <div className="edit_button cursorPointer" onClick={(e) => navigate('/community-setup')}>
                     <EditIcon />  Edit
                  </div>}
               </div>


            </div>
            <div className="com_info_body">
               <div className="com_details">{details ? parse(details) : ''}</div>
               <div className="com_info_wrap">
                  <Grid container spacing={1}>
                     <Grid item lg={6} md={6} sm={12} xs={12} >
                        {msDetails?.entity_email && <div className="info_item"> E-mail : <span> {msDetails?.entity_email} </span></div>}
                     </Grid>
                     <Grid item lg={6} md={6} sm={12} xs={12}>
                        {msDetails?.entity_phone && <div className="info_item"> Phone : <span> {msDetails?.entity_phone}</span></div>}
                     </Grid>
                     <Grid item lg={6} md={6} sm={12} xs={12}>
                        {msDetails?.location && <div className="info_item"> Location : <span> {msDetails?.location}</span></div>}
                     </Grid>
                     <Grid item lg={6} md={6} sm={12} xs={12}>
                        {(msDetails?.website && msDetails?.website !== "null") && <div className="info_item"> Website : <span> {msDetails?.website}</span></div>}
                     </Grid>

                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_building_name && <div className="info_item"> Apartment Building Name : <span> {appartmentDetails?.apartment_building_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_builder && <div className="info_item"> Apartment Builder Name : <span> {appartmentDetails?.apartment_builder}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_contractors_name && <div className="info_item"> Apartment Contractors Name : <span> {appartmentDetails?.apartment_contractors_name}</span></div>}
                           </Grid>
                        </>
                     }
                     <Grid item xs={12}>
                        {msDetails?.address && <div className="info_item"> Address : <span> {msDetails?.address}</span></div>}
                     </Grid>
                  </Grid>

                  {msDetails?.meta?.community_type === 'apartment' &&
                  <>
                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                           Electrical Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_electrical_contractor_name && <div className="info_item_2">  <span className="item_lebel">Name </span> <span className="info_item_bold"> : {appartmentDetails?.apartment_electrical_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_electrical_contractor_phone && <div className="info_item_2"> <span className="item_lebel"> Phone</span> <span className="info_item_bold"> : {appartmentDetails?.apartment_electrical_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_electrical_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>  <span className="info_item_bold"> : {appartmentDetails?.apartment_electrical_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                            Plumbing Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_plumbing_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {appartmentDetails?.apartment_plumbing_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_plumbing_contractor_phone && <div className="info_item_2"> <span className="item_lebel" > Phone</span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_plumbing_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_plumbing_contractor_address && <div className="info_item_2">  <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_plumbing_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                            Windows & Glass Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_windows_and_glass_contractor_name && <div className="info_item_2">  <span className="item_lebel" >Name </span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_windows_and_glass_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_windows_and_glass_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone</span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_windows_and_glass_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_windows_and_glass_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_windows_and_glass_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                            Landscape Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_landscape_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {appartmentDetails?.apartment_landscape_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_landscape_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span> <span className="info_item_bold"> : {appartmentDetails?.apartment_landscape_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_landscape_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span> <span className="info_item_bold"> : {appartmentDetails?.apartment_landscape_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                            Retention Wall Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_retention_wall_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name </span> <span className="info_item_bold"> : {appartmentDetails?.apartment_retention_wall_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_retention_wall_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span>  <span className="info_item_bold"> : {appartmentDetails?.apartment_retention_wall_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_retention_wall_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address </span> <span className="info_item_bold"> : {appartmentDetails?.apartment_retention_wall_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                            Air Condition Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_air_condition_contractor_name && <div className="info_item_2"> <span className="item_lebel"> Name </span> <span className="info_item_bold"> : {appartmentDetails?.apartment_air_condition_contractor_name}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_air_condition_contractor_phone && <div className="info_item_2"> <span className="item_lebel">Phone</span>   <span className="info_item_bold"> : {appartmentDetails?.apartment_air_condition_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item lg={6} md={6} sm={12} xs={12}>
                              {appartmentDetails?.apartment_air_condition_contractor_address && <div className="info_item_2">  <span className="item_lebel">Address </span>  <span className="info_item_bold"> : {appartmentDetails?.apartment_air_condition_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>
                  </>
               }
               </div>
            </div>
         </div>
         <ToastContainer />
      </Fragment>
   )
}

export default CommunityInfo

