import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { addUserUrl, allJobCategoryUrl, allJobsUrl, allMembersUrl, baseUrl, commonUserUrl, micrositeDetailsUrl } from "../../api/Api";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Alert, Box, Button, Grid, TextField, Tooltip } from "@mui/material";

import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import parse from 'html-react-parser'
import { notifyError, notifySuccess } from "../../utils/Toast";
const CommunityInfoPublic = ({msPublicDetails, memberStatus}) => {
   const navigate = useNavigate();
   const location = useLocation();
   const [loaderEffect, setLoaderEffect] = useState(false)
   const token = sessionStorage.getItem('token');
   const {userDetails, msDetails} = useContext(UserContext)

   const [memberUuid, setMemberUuid] = useState('')
   const [loggedMemberStatus, setLoggedMemberStatus] = useState(null)
   const [checked, setChecked] = useState(false);
   const [details, setDetails] = useState(msPublicDetails?.entity_details?msPublicDetails.entity_details:'')

   const handleChange = (event) => {
    setChecked(event.target.checked);
  };
// handle join 

const handlejoin =()=>{
  if(token){
   let formData = new FormData();
   formData.append('microsite_id',msPublicDetails.id)
   formData.append('user_id',userDetails.id)
   formData.append('status',0)
   formData.append('user_type','member') 
   axios.post(addUserUrl,formData)
   .then((res)=>{
     notifySuccess('Your request has been sent to admin for aproval!')
     setTimeout(()=>{
      window.location.reload();
     },1000)
   })
   .catch((err)=>notifyError(err.response.data.errors.message[0]))
  }else{
   if(msDetails){
      window.location.href='/register-user-search'
   }else{
      let config = {
         method: "get",
         url: `${micrositeDetailsUrl}/${msPublicDetails.uuid}`,
       };
   
       axios.request(config).then((response) => {
         sessionStorage.setItem("msDetails", JSON.stringify(response.data));
         window.location.href='/register-user-search'
       });
   }
  
  
  }
}


  // add new user
  const  handleAddMember =(memberID,email)=>{
   if(memberID && checked===true){
      let formData = new FormData();
      formData.append('microsite_id',msDetails.id)
      formData.append('user_id',memberID)
      formData.append('email', email);
      formData.append('status', 0);
      formData.append('user_type', 'member');
      
      axios.post(addUserUrl,formData)
      .then((res)=>{
        notifySuccess('Request sent successfully!')
        setTimeout(()=>{
          window.location.reload()
        },100)
      })
      .catch((err)=>{
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })
   }else{
    notifyError('Agree first')
   }
  }


  // handle joinUser
  const handleJoinUser = (e)=>{ 
    // handleAddMember(userDetails?.id, userDetails.email)
  }

  // handle accept inviation

  const handleAcceptInvitation = ()=>{
      let data = new FormData();
      data.append('microsite_id', msDetails.id);
      data.append('user_id', userDetails.id);
      data.append('status', 1);
      data.append('user_type', 'member');

      let config = {
        method: 'post',
        url: `${commonUserUrl}/${memberUuid}`,
        data : data
      };

      axios.request(config)
      .then((response) => {
        window.location.href='/'
      })
      .catch((err)=>{
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })
  }





// handleLounge

const handleLounge = ()=>{
  
      let config = {
        method: 'get',
        url: `${micrositeDetailsUrl}/${msPublicDetails.uuid}`,
      };

      axios.request(config)
      .then((response) => {
        sessionStorage.setItem('msDetails',JSON.stringify(response.data))
        setTimeout((e)=>{
         window.location.href = '/'
       },2000)

       
      }).catch((e)=> {
        notifyError('')
        setTimeout((e)=>{
          navigate('/')
        },2000)
    })
 
}



  //get all members of a microsite

  const getAllMembers = ()=>{
   const membersUrl = `${allMembersUrl}/${msPublicDetails.id}`;
   let config = {
     method: "get",
     url: membersUrl,
   };

   axios
     .request(config)
     .then((response) => {
       if(token){
         var find =0;
         response.data.data.forEach(element => {
             if(element.user.id === userDetails.id){
                 find =1
                 setLoggedMemberStatus(element.status)
                 setMemberUuid(element.uuid)
                 }
             });
       }
     })
     .catch((error) => {});
 }


 useEffect(() => {
   if(token && msPublicDetails){
     getAllMembers()
   }
 }, []);




   return (
      <Fragment>
         <div className="communityInfo_wrapper">
               {msPublicDetails?.meta?.banner &&
                  <div className="commuinity_banner">
                     <img src={`${baseUrl}/${msPublicDetails?.meta?.banner}`} alt={msPublicDetails?.name} />
                  </div>
               }
               <div className="community_top_info">
                  <div className="com_one">
                  <div className="com_logo">
                      <img src={`${baseUrl}/${msPublicDetails?.entity_logo}`} alt={msPublicDetails?.name} />
                   </div>
                   <div className="com_top_left">
                      <div className="com_name"> {msPublicDetails?.name}</div>
                      <div className="tagline">{msPublicDetails?.tagline?parse(msPublicDetails?.tagline):''} </div>
                   </div>
                  </div>

                 {/* {token && memberStatus ===1 && 
                    <div className="community_view_btn" onClick={(e)=> handleLounge()}> Lounge </div>
                 } 
                
                 {(!token || memberStatus ===-1 ) && 
                   <div className="community_view_btn" onClick={(e)=>  handlejoin()}> Join </div>
                 } */}
                 
                  {/* <div className="edit_button cursorPointer" onClick={(e)=> navigate('/community-setup')}>
                    <EditIcon/>  Edit 
                  </div> */}

                        {token&& loggedMemberStatus===0 &&
                          <Alert severity="info">Your request has been sent to admin for aproval. Your joining request is pending...</Alert>
                         }
                        {token&& loggedMemberStatus===2 &&
                          <Alert severity="info">Your ware invited to join this community.</Alert>
                         }
                        {token&& loggedMemberStatus===3 &&
                          <Alert severity="error">You are blocked on this community !</Alert>
                         }
                       
                        {token&& loggedMemberStatus===null  &&
                          <div className="community_view_btn" onClick={(e)=>  handlejoin()}> Join </div>
                         }
                        {!token&& loggedMemberStatus===null  &&
                          <div className="community_view_btn" onClick={(e)=>  handlejoin()}> Join </div>
                         }
                        {token&& loggedMemberStatus===1  &&
                         <div className="community_view_btn" onClick={(e)=> handleLounge()}> Visit Lounge </div>
                         }
                        {token&& loggedMemberStatus===2  &&
                          <div className="community_view_btn" onClick={(e)=> handleAcceptInvitation(e)}> Accept Invitation </div>
                         }

               </div>
               <div className="com_info_body">
               <div className="com_details">{details? parse(details):''}</div>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <div className="com_info_wrap">
                     {msPublicDetails?.entity_email && <div className="info_item"> E-mail : <span> {msPublicDetails?.entity_email} </span></div>}
                     {msPublicDetails?.entity_phone && <div className="info_item"> Phone : <span> {msPublicDetails?.entity_phone}</span></div>}
                     {msPublicDetails?.location && <div className="info_item"> Location : <span> {msPublicDetails?.location}</span></div>}
                     {msPublicDetails?.address && <div className="info_item"> Address : <span> {msPublicDetails?.address}</span></div>}
                     {(msPublicDetails?.website && msPublicDetails?.website !=="null") && <div className="info_item"> Website : <span> {msPublicDetails?.website}</span></div>}
                  </div>
                    </Grid>
                    <Grid item xs={4}>
                       <div className="qr_img">
                          <img src= {`${baseUrl}/storage/images/microsites/qr/${msPublicDetails.id}.png`} alt="" />
                       </div>
                    </Grid>
                 </Grid>
               </div>
               
            </div>
         <ToastContainer />
      </Fragment>
   )
}

export default CommunityInfoPublic

