import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl, commonUserUrl, createFeedsUrl, userDetailsUrl } from "../../api/Api";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import { faSkype} from "@fortawesome/free-brands-svg-icons";
import { ProfileCoverLoadEffect } from "../PageLoadEffects";
import { useLocation, useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPost from "./UserPost";

import EditNoteIcon from '@mui/icons-material/EditNote';
import { Grid } from "@mui/material";
import MainLoader from "../PageLoadEffects/MainLoader";

import parse from 'html-react-parser';

import coverImg from '../../asset/image/bannerUpload.jpeg' 
import Avatar from '../../asset/image/avatar.jpg'
import { notifyError } from "../../utils/Toast";

// Tabs Functionalities Start
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Tabs Functionalities End

const ProfileBody = () => {
    const navigate = useNavigate();
    const location  = useLocation();
    const [userInfo,setUserInfo] = useState(null);
    const [meta,setMeta] = useState(null);
    const token  = sessionStorage.getItem('token');
    const {msDetails,userDetails} = useContext(UserContext)
    const [allFeeds,setAllFeeds] = useState(null)
    const [modalData, setModalData] = useState();
    const [modalShowExtraImage, setModalShowExtraImage] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [joinDate, setJoinDate] = useState(null)
    const [name, setName] = useState('')
    const getUrl = window.location.href;
    const segName = getUrl.split("/").pop();

    

    //Get all feeds
    const getAllFeeds = useCallback(async () => {
      let config = {
        method: "get",
        url: `${createFeedsUrl}?microsite_id=${msDetails.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setAllFeeds(response.data.data);
        })
        .catch((error) => {});
    }, []);

    useEffect(() => {
      getAllFeeds();
    }, []);

    const setHidden = () => {
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "initial";
      } else {
        document.body.style.overflow = "scroll";
      }
    };


    // get and set user General info

     //get single job details
   const getMicrositeDetails = ()=>{
    setLoaderVisible(true)
    let config = {
        method: 'get',
        url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
       setLoaderVisible(false)

       if(res?.data && res?.data?.status ===2){
        notifyError('You ware invited please accept invitation first')
        setTimeout(()=>{
          navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:2, reload:true}})
        },2000)
      }
      if(res?.data && res?.data?.status ===3){
        notifyError('You are blocked on this community')
        setTimeout(()=>{
          navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:3,reload:true}})
        },2000)
      }
      if(res?.data && res?.data?.status ===0){
        notifyError('Your joining status is pending...')
        setTimeout(()=>{
          navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:0,reload:true}})
        },2000)
      }

      if(res?.data && res?.data?.status ===1){
        setJoinDate(res?.data?.created_at)
        const storeData = res?.data?.user_details
        const storeMeta = res?.data?.meta
        if(storeData){
         const info = JSON.parse(storeData)
         const meta = JSON.parse(storeMeta)
 
         setUserInfo(info)
         setMeta(meta)
 
         // document.getElementById('bgImage').style.backgroundImage = `url(${baseUrl}/${meta?.banner})`;
        
        }
      }
      
      }).catch((e)=>  {
        notifyError('Your are not member of this comminity join first.')
          setTimeout(()=>{
            navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:-1,reload:true}})
          },1500)
       })
}
useEffect(()=>{
  if(msDetails?.id && segName !=='newCommuinity'){
    getMicrositeDetails()
  }
},[])


const [parseUser, setParseUser] = useState(null)

useEffect(()=>{
  const getData = sessionStorage.getItem('loggedInUserInfo')
  if(getData){
    const parseData = JSON.parse(getData)
    const userDetails = parseData?.user_details
    if(userDetails){
      const parseUser = JSON.parse(userDetails)
      setParseUser(parseUser)
      if(parseUser){
        setName(parseUser?.name)
      }else{
        setName(userDetails?.profile?.name)
      }
      
    }
   
    // setName(userDetails?.profile?.name);
  }
},[])



console.log('parseUser', parseUser)

   

  return (
     <Fragment>
      {location?.state?.showInfo ===true &&  <div className="user_dashBoard">
             <div className="user_profile">
              {meta?.banner 
                ? <div className="cover-photo" >
                  <img src={`${baseUrl}/${meta?.banner}`} width='100%' height='100%'></img>
                    <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}><EditIcon className="cursorPointer"/></i>
                  </div>
                : 
                <>
                {userDetails?.profile?.cover
                  ?
                  <div className="cover-photo" >
                  <img src={`${baseUrl}/${userDetails?.profile?.cover}`} width='100%' height='100%'></img>
                   <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}>
                    <EditIcon className="cursorPointer"/></i>
                  </div>
                  :
                  <div className="cover-photo" >
                  <img src={coverImg} width='100%' height='100%'></img>
                   <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}>
                    <EditIcon className="cursorPointer"/></i>
                  </div>
                }
                </>
               
              }
              
                <div className="user_profile_content">
                  <div className="content_top">
                   <div className="user_profileImg">
                    {userDetails?.profile?.avatar 
                      ? <img src={`${baseUrl}/${userDetails?.profile?.avatar}`}  className="profile"/>
                      : <img src={`${Avatar}`} width='10%'  className="profile"/>
                    }
                    </div>

                    {userDetails &&  <div className="profile-name">
                      {name !==undefined&& <div  className="user_name">{name}
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon className="cursorPointer"/></i></div>}

                      {userInfo && userInfo?.apartment_number && <div  className="userDesignation">Apartment/Holding: {userInfo?.apartment_number} 
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'apartment_number'}})}><EditIcon className="cursorPointer"/></i></div>}
                       
                       {userInfo && userInfo?.designation ? <div  className="userDesignation"> {userInfo?.designation} 
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i></div>
                       :
                       <div  className="userDesignation"> {userDetails?.roles[0]} 
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i></div>
                       }
                    </div>}
                    {/* {userInfo &&  <div className="profile-name">
                      {(userInfo?.name)?<>{userInfo?.name} <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon className="cursorPointer"/></i></>
                      :
                      <>{userDetails?.profile?.name} <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon className="cursorPointer"/></i></>
                      }
                       
                       {userInfo && userInfo?.designation ? <div  className="userDesignation"> {userInfo?.designation} 
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i></div>
                       :
                       <div  className="userDesignation"> {userDetails?.roles[0]} 
                       <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i></div>
                       }
                    </div>} */}


                   </div>
               {/* load effects */}
                {!userInfo && ProfileCoverLoadEffect()}
                {userInfo && <div className="userAbout">{userInfo?.about_me?parse(userInfo?.about_me):"" } 
                  <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'details'}})}><EditIcon className="cursorPointer"/></i></div>}

                  {joinDate !==null && <div className="user_join_date">Joined Date: <span>{new Date(joinDate).toLocaleDateString()}</span></div>}


                </div>
              </div>
              <div className="com_info_body">
               <div className="com_info_wrap">
                  <Grid container spacing={1}>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                        {parseUser?.individual_email_status ===1 && <Grid item xs={6}>
                              {parseUser?.individual_email && <div className="info_item"> E-mail : <span> {parseUser?.individual_email} </span></div>}
                          </Grid>}
                        {parseUser?.individual_mobile_status ===1 && <Grid item xs={6}>
                              {parseUser?.individual_mobile && <div className="info_item"> Phone : <span> {parseUser?.individual_mobile}</span></div>}
                          </Grid>} 
                         
                           <Grid item xs={6}>
                              {parseUser?.apartment_number && <div className="info_item"> Apartment Number : <span> {parseUser?.apartment_number}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_builder && <div className="info_item"> Apartment Builder Name : <span> {parseUser?.individual_builder}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_contractors_name && <div className="info_item"> Apartment Contractors Name : <span> {parseUser?.individual_contractors_name}</span></div>}
                           </Grid>
                        </>
                     }
                    
                  </Grid>

                  <Grid container spacing={1}>
                     <Grid item xs={12}>
                        <div className="info_item_title">
                           Electrical Contractor Information :
                        </div>
                     </Grid>
                     {msDetails?.meta?.community_type === 'apartment' &&
                        <>
                           <Grid item xs={6}>
                              {parseUser?.individual_electrical_contractor_name && <div className="info_item_2">  <span className="item_lebel">Name </span> <span className="info_item_bold"> : {parseUser?.individual_electrical_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_electrical_contractor_phone && <div className="info_item_2"> <span className="item_lebel"> Phone</span> <span className="info_item_bold"> : {parseUser?.individual_electrical_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_electrical_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>  <span className="info_item_bold"> : {parseUser?.individual_electrical_contractor_address}</span></div>}
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
                           <Grid item xs={6}>
                              {parseUser?.individual_plumbing_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {parseUser?.individual_plumbing_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_plumbing_contractor_phone && <div className="info_item_2"> <span className="item_lebel" > Phone</span>   <span className="info_item_bold"> : {parseUser?.individual_plumbing_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_plumbing_contractor_address && <div className="info_item_2">  <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {parseUser?.individual_plumbing_contractor_address}</span></div>}
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
                           <Grid item xs={6}>
                              {parseUser?.individual_windows_and_glass_contractor_name && <div className="info_item_2">  <span className="item_lebel" >Name </span>   <span className="info_item_bold"> : {parseUser?.individual_windows_and_glass_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_windows_and_glass_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone</span>   <span className="info_item_bold"> : {parseUser?.individual_windows_and_glass_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_windows_and_glass_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {parseUser?.individual_windows_and_glass_contractor_address}</span></div>}
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
                           <Grid item xs={6}>
                              {parseUser?.individual_landscape_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {parseUser?.individual_landscape_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_landscape_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span> <span className="info_item_bold"> : {parseUser?.individual_landscape_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_landscape_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span> <span className="info_item_bold"> : {parseUser?.individual_landscape_contractor_address}</span></div>}
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
                           <Grid item xs={6}>
                              {parseUser?.individual_retention_wall_contractor_name && <div className="info_item_2"> <span className="item_lebel" >Name </span> <span className="info_item_bold"> : {parseUser?.individual_retention_wall_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_retention_wall_contractor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span>  <span className="info_item_bold"> : {parseUser?.individual_retention_wall_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_retention_wall_contractor_address && <div className="info_item_2"> <span className="item_lebel" >Address </span> <span className="info_item_bold"> : {parseUser?.individual_retention_wall_contractor_address}</span></div>}
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
                           <Grid item xs={6}>
                              {parseUser?.individual_air_condition_contractor_name && <div className="info_item_2"> <span className="item_lebel"> Name </span> <span className="info_item_bold"> : {parseUser?.individual_air_condition_contractor_name}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_air_condition_contractor_phone && <div className="info_item_2"> <span className="item_lebel">Phone</span>   <span className="info_item_bold"> : {parseUser?.individual_air_condition_contractor_phone}</span></div>}
                           </Grid>
                           <Grid item xs={6}>
                              {parseUser?.individual_air_condition_contractor_address && <div className="info_item_2">  <span className="item_lebel">Address </span>  <span className="info_item_bold"> : {parseUser?.individual_air_condition_contractor_address}</span></div>}
                           </Grid>
                        </>}
                  </Grid>
               </div>
              </div>           
          </div>}
          
         
         <div>
            <UserPost />
         </div>
         {loaderVisible === true && <MainLoader/>}
      <ToastContainer />
     </Fragment>
  );
};

export default ProfileBody;



            
          
