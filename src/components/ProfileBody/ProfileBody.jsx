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
import SettingsIcon from '@mui/icons-material/Settings';

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

    const[scrollTop, setScrollTop] = useState(true)
    
    useEffect(() => {
      if(scrollTop ===true){
        window.scrollTo(0, 0)
        setScrollTop(false)
      }
    }, [scrollTop])

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

         const date = new Date(res?.data?.created_at);
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with '0' if necessary.
         const day = String(date.getDate()).padStart(2, '0');

         const formattedDate = `${year}-${month}-${day}`;
        setJoinDate(formattedDate)

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
  if(msDetails?.id && segName !=='newCommuinity' && segName !=='community' && segName !=='community-packeges'){
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

const [nameLabel, setNameLabel] = useState('Name')

useEffect(()=>{
   if(msDetails.meta.community_type ==='apartment'){
     setNameLabel('Apartment Number')
   }
   if(msDetails.meta.community_type ==='business'){
     setNameLabel('Business Name')
   }
   if(msDetails.meta.community_type ==='housing'){
     setNameLabel('House Number/Name')
   }
 },[])   

  return (
     <Fragment>
      {location?.state?.showInfo ===true &&  <div className="user_dashBoard">
             <div className="user_profile">
              {meta?.banner 
                ? <div className="cover-photo" >
                  <img src={`${baseUrl}/${meta?.banner}`} width='100%' height='100%'></img>
                    <div className="overly_content">
                    <i onClick={(e)=> navigate('/complete-profile')}> <SettingsIcon/> </i>
                    {/* <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}><EditIcon className="cursorPointer"/></i> */}
                    </div>
                  </div>
                : 
                <>
                {userDetails?.profile?.cover
                  ?
                  <div className="cover-photo" >
                  <img src={`${baseUrl}/${userDetails?.profile?.cover}`} width='100%' height='100%'></img>
                  <div className="overly_content">
                    <i onClick={(e)=> navigate('/complete-profile')}> <SettingsIcon/> </i>
                   {/* <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}>
                    <EditIcon className="cursorPointer"/></i> */}
                  </div>
                  </div>
                  :
                  <div className="cover-photo" >
                  <img src={coverImg} width='100%' height='100%'></img>
                  <div className="overly_content">
                    <i> <SettingsIcon/> </i>
                   {/* <i onClick={(e)=> navigate('/complete-profile/banner',{state:{type:'cover'}})}>
                    <EditIcon className="cursorPointer"/></i> */}
                  </div>
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
                   
                    {userInfo &&  <div className="profile-name">
                      {(userInfo?.name)?<>{userInfo?.name} 
                      {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon className="cursorPointer"/></i> */}
                      </>
                      :
                      <>{userDetails?.profile?.name}
                       {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon className="cursorPointer"/></i> */}
                       </>
                      }
                       
                       {parseUser?.profession ? <div  className="userDesignation"> {parseUser?.profession} 
                       {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i> */}
                       </div>
                       :
                       <div  className="userDesignation"> {userDetails?.roles[0]} 
                       {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'designation'}})}><EditIcon className="cursorPointer"/></i> */}
                       </div>
                       }
                       {parseUser?.member_since && <div  className="userDesignation"><small>Member Since {parseUser?.member_since} {joinDate !==null && <>. Join On This Community {joinDate}</>}</small> </div>}
                    </div>}


                   </div>
               {/* load effects */}
                {!userInfo && ProfileCoverLoadEffect()}
                {userInfo && <div className="userAbout">{userInfo?.about_me?parse(userInfo?.about_me):"" } 
                  {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'details'}})}><EditIcon className="cursorPointer"/></i> */}
                  </div>}

                  {/* {joinDate !==null && <div className="user_join_date">Joined Date: <span>{new Date(joinDate).toLocaleDateString()}</span></div>} */}


                </div>
              </div>
              <div className="com_info_body">
               <div className="com_info_wrap">
                  <Grid container>
                        <>
                           {/* <Grid item xs={6}>
                              {parseUser?.name && <div className="info_item"> {nameLabel} : <span> {parseUser?.name}</span></div>}
                           </Grid> */}
                           {parseUser?.email_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.email && <div className="info_item"> E-mail : <span> {parseUser?.email} </span></div>}
                           </Grid>}
                           {parseUser?.phone_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.phone && <div className="info_item"> Phone : <span> {parseUser?.phone}</span></div>}
                           </Grid>} 
                           {/* {msDetails.meta.community_type !=='business' && parseUser?.profession && <Grid item xs={6}>
                                 {parseUser?.profession && <div className="info_item"> Profession : <span> {parseUser?.profession}</span></div>}
                           </Grid>}  */}
                           {parseUser?.emergency_contact_number && <Grid item xs={6}>
                                 {parseUser?.emergency_contact_number && <div className="info_item"> Emergency Contact Number : <span> {parseUser?.emergency_contact_number}</span></div>}
                           </Grid>} 
                           {/* {parseUser?.member_since && <Grid item xs={6}>
                                 {parseUser?.member_since && <div className="info_item"> Member Since : <span> {parseUser?.member_since}</span></div>}
                           </Grid>}  */}

                           {msDetails.meta.community_type ==='business' && 
                           <>
                              {parseUser?.owners_name_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.owners_names && <div className="info_item">Owners Name: <span> {parseUser?.owners_names}</span></div>}
                              </Grid>} 
                              {parseUser?.owners_mobile_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.owners_mobile && <div className="info_item">Owners Mobile: <span> {parseUser?.owners_mobile}</span></div>}
                              </Grid>} 
                              {parseUser?.owners_email_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.owners_email && <div className="info_item">Owners Email: <span> {parseUser?.owners_email}</span></div>}
                              </Grid>} 
                              {parseUser?.business_phone&& <Grid item xs={6}>
                                 {parseUser?.business_phone && <div className="info_item">Business Phone Number: <span> {parseUser?.business_phone}</span></div>}
                              </Grid>} 
                              {parseUser?.business_email&& <Grid item xs={6}>
                                 {parseUser?.business_email && <div className="info_item">Business Email: <span> {parseUser?.business_email}</span></div>}
                              </Grid>} 
                              {parseUser?.business_fax&& <Grid item xs={6}>
                                 {parseUser?.business_fax && <div className="info_item">Business FAX: <span> {parseUser?.business_fax}</span></div>}
                              </Grid>} 
                              {parseUser?.type_of_business&& <Grid item xs={6}>
                                 {parseUser?.type_of_business && <div className="info_item">Type Of Business: <span> {parseUser?.type_of_business}</span></div>}
                              </Grid>} 
                              {parseUser?.products_carried&& <Grid item xs={6}>
                                 {parseUser?.products_carried && <div className="info_item">Products Carried: <span> {parseUser?.products_carried}</span></div>}
                              </Grid>} 
                              {parseUser?.service_carried&& <Grid item xs={6}>
                                 {parseUser?.service_carried && <div className="info_item">Services Provided: <span> {parseUser?.service_carried}</span></div>}
                              </Grid>} 
                           </>}

                           {msDetails.meta.community_type ==='personal' && 
                           <>
                            {parseUser?.blood_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.blood && <div className="info_item">Blood Group: <span> {parseUser?.blood}</span></div>}
                              </Grid>}
                            {parseUser?.hobbies && <Grid item xs={6}>
                                 {parseUser?.hobbies && <div className="info_item">Hobbies: <span> {parseUser?.hobbies}</span></div>}
                              </Grid>}
                              {parseUser?.school_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.school_name && <div className="info_item">School: <span> {parseUser?.school_name}</span></div>}
                              </Grid>}
                              {parseUser?.college_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.college_name && <div className="info_item">College: <span> {parseUser?.college_name}</span></div>}
                              </Grid>}
                              {parseUser?.university_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.university_name && <div className="info_item">University : <span> {parseUser?.university_name}</span></div>}
                              </Grid>}
                              {parseUser?.hometown_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.hometown_name && <div className="info_item">Hometown : <span> {parseUser?.hometown_name}</span></div>}
                              </Grid>}
                              {parseUser?.homedistrict_status ==='1' && <Grid item xs={6}>
                                 {parseUser?.homedistrict_name && <div className="info_item">Home District : <span> {parseUser?.homedistrict_name}</span></div>}
                              </Grid>}
                           </>}
                           
                           {( msDetails.meta.community_type ==='housing') && 
                              <>
                                 <Grid item xs={6}>
                                    {parseUser?.builder_name && <div className="info_item"> Builder Name : <span> {parseUser?.builder_name}</span></div>}
                                 </Grid>
                              </>
                           }
                        </>
                  </Grid>



                  {(msDetails.meta.community_type ==='housing') && 
                  <>
                  {(parseUser?.electrical_constructor_name || parseUser?.electrical_constructor_phone || parseUser?.electrical_constructor_address)  &&
                      <Grid container>
                      <Grid item xs={12}>
                         <div className="info_item_title">
                            Electrical Contractor Information :
                         </div>
                      </Grid>
                   
                         <>
                            <Grid item xs={4}>
                               {parseUser?.electrical_constructor_name && <div className="info_item_2">  <span className="item_lebel">Name </span> <span className="info_item_bold"> : {parseUser?.electrical_constructor_name}</span></div>}
                            </Grid>
                            <Grid item xs={4}>
                               {parseUser?.electrical_constructor_phone && <div className="info_item_2"> <span className="item_lebel"> Phone</span> <span className="info_item_bold"> : {parseUser?.electrical_constructor_phone}</span></div>}
                            </Grid>
                            <Grid item xs={4}>
                               {parseUser?.electrical_constructor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>  <span className="info_item_bold"> : {parseUser?.electrical_constructor_address}</span></div>}
                            </Grid>
                         </>
                   </Grid> 
                  }
                    
                  {(parseUser?.plumbing_constructor_name  || parseUser?.plumbing_constructor_phone || parseUser?.plumbing_constructor_address) && 
                     <Grid container >
                        <Grid item xs={12}>
                           <div className="info_item_title">
                              Plumbing Contractor Information :
                           </div>
                        </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.plumbing_constructor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {parseUser?.plumbing_constructor_name}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.plumbing_constructor_phone && <div className="info_item_2"> <span className="item_lebel" > Phone</span>   <span className="info_item_bold"> : {parseUser?.plumbing_constructor_phone}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.plumbing_constructor_address && <div className="info_item_2">  <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {parseUser?.plumbing_constructor_address}</span></div>}
                              </Grid>
                     </Grid>
                  }

                  {(parseUser?.window_glass_constructor_name || parseUser?.window_glass_constructor_phone || parseUser?.window_glass_constructor_address) && 
                      <Grid container >
                        <Grid item xs={12}>
                           <div className="info_item_title">
                              Windows & Glass Contractor Information :
                           </div>
                        </Grid>
                        
                              <Grid item xs={4}>
                                 {parseUser?.window_glass_constructor_name && <div className="info_item_2">  <span className="item_lebel" >Name </span>   <span className="info_item_bold"> : {parseUser?.window_glass_constructor_name}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.window_glass_constructor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone</span>   <span className="info_item_bold"> : {parseUser?.window_glass_constructor_phone}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.window_glass_constructor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span>   <span className="info_item_bold"> : {parseUser?.window_glass_constructor_address}</span></div>}
                              </Grid>
                     </Grid>
                  }

                  {(parseUser?.landscape_constructor_name || parseUser?.landscape_constructor_phone || parseUser?.landscape_constructor_address) &&
                      <Grid container >
                        <Grid item xs={12}>
                           <div className="info_item_title">
                              Landscape Contractor Information :
                           </div>
                        </Grid>
                        
                              <Grid item xs={4}>
                                 {parseUser?.landscape_constructor_name && <div className="info_item_2"> <span className="item_lebel" >Name</span>  <span className="info_item_bold"> : {parseUser?.landscape_constructor_name}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.landscape_constructor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span> <span className="info_item_bold"> : {parseUser?.landscape_constructor_phone}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.landscape_constructor_address && <div className="info_item_2"> <span className="item_lebel" >Address</span> <span className="info_item_bold"> : {parseUser?.landscape_constructor_address}</span></div>}
                              </Grid>
                     </Grid>
                  }

                  {(parseUser?.retention_wall_constructor_name || parseUser?.retention_wall_constructor_phone || parseUser?.retention_wall_constructor_address) && 
                      <Grid container >
                        <Grid item xs={12}>
                           <div className="info_item_title">
                              Retention Wall Contractor Information :
                           </div>
                        </Grid>
                        
                              <Grid item xs={4}>
                                 {parseUser?.retention_wall_constructor_name && <div className="info_item_2"> <span className="item_lebel" >Name </span> <span className="info_item_bold"> : {parseUser?.retention_wall_constructor_name}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.retention_wall_constructor_phone && <div className="info_item_2"> <span className="item_lebel" >Phone </span>  <span className="info_item_bold"> : {parseUser?.retention_wall_constructor_phone}</span></div>}
                              </Grid>
                              <Grid item xs={4}>
                                 {parseUser?.retention_wall_constructor_address && <div className="info_item_2"> <span className="item_lebel" >Address </span> <span className="info_item_bold"> : {parseUser?.retention_wall_constructor_address}</span></div>}
                              </Grid>
                     </Grid>
                     }
                     {(parseUser?.air_condition_constructor_name || parseUser?.air_condition_constructor_phone  || parseUser?.air_condition_constructor_address) && 
                         <Grid container >
                           <Grid item xs={12}>
                              <div className="info_item_title">
                                 Air Condition Contractor Information :
                              </div>
                           </Grid>
                           
                                 <Grid item xs={4}>
                                    {parseUser?.air_condition_constructor_name && <div className="info_item_2"> <span className="item_lebel"> Name </span> <span className="info_item_bold"> : {parseUser?.air_condition_constructor_name}</span></div>}
                                 </Grid>
                                 <Grid item xs={4}>
                                    {parseUser?.air_condition_constructor_phone && <div className="info_item_2"> <span className="item_lebel">Phone</span>   <span className="info_item_bold"> : {parseUser?.air_condition_constructor_phone}</span></div>}
                                 </Grid>
                                 <Grid item xs={4}>
                                    {parseUser?.air_condition_constructor_address && <div className="info_item_2">  <span className="item_lebel">Address </span>  <span className="info_item_bold"> : {parseUser?.air_condition_constructor_address}</span></div>}
                                 </Grid>
                        </Grid>
                        }
                  </>}
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



            
          
