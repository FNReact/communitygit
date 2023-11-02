import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl, commonUserUrl, createFeedsUrl, userDetailsUrl } from "../../api/Api";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import { faSkype} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { ProfileCoverLoadEffect } from "../PageLoadEffects";
import { useLocation, useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPostOther from "./UserPostOther";
import { Grid } from "@mui/material";

import parse from 'html-react-parser';

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

const ProfileBodyOther = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState('');
    const token  = sessionStorage.getItem('token');
    const {msDetails,userDetails} = useContext(UserContext)
    const [allFeeds,setAllFeeds] = useState(null)
    const [modalData, setModalData] = useState();
    const [modalShowExtraImage, setModalShowExtraImage] = React.useState(false);
    const [joinDate, setJoinDate] = useState(null)
    const [meta,setMeta] = useState(null);
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [storeUser, setStoreUser] = useState(false)
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


    const [parseUser, setParseUser] = useState(null)
     //get single job details
   const getUserDetails = ()=>{
    setLoaderVisible(true)
    let config = {
        method: 'get',
        url: `${commonUserUrl}/${location?.state?.userId}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
       setLoaderVisible(false)
       setJoinDate(res?.data?.created_at)
       const storeData = res?.data?.user_details
       const storeMeta = res?.data?.meta
       setStoreUser(res?.data?.user)
       if(storeData){
        const info = JSON.parse(storeData)
        const meta = JSON.parse(storeMeta)

        setUserInfo(info)
        setMeta(meta)

        setParseUser(info)

        document.getElementById('bgImage').style.backgroundImage = `url(${baseUrl}/${meta?.banner})`;
       }
      }).catch((e)=>  { setLoaderVisible(false)})
}
useEffect(()=>{
  if(msDetails?.id){
    getUserDetails()
  }
},[])


  return (
     <Fragment>
         <div className="user_dashBoard">
             <div className="user_profile">
               <div className="cover-photo" id="bgImage"></div>
                <div className="user_profile_content">
                   <div className="content_top">
                    <div className="user_profileImg">
                      {storeUser && <img src={`${baseUrl}/${storeUser?.avatar}`}  className="profile"/>}
                    </div>

                    {storeUser &&  <div className="profile-name">
                        {storeUser?.name}
                       
                       {userInfo && userInfo?.designation && <div  className="userDesignation"> {userInfo?.designation} </div>}

                    </div>}
                   </div>

               {/* load effects */}
               {userInfo && userInfo?.about_me && <div className="userAbout">{userInfo?.about_me?parse(userInfo?.about_me):"" }
                 </div>}
                 
                 {joinDate !==null && <div className="user_join_date">Joined Date: <span>{new Date(joinDate).toLocaleDateString()}</span></div>}

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
              </div> 
          <div>
            <UserPostOther userInfo={storeUser} />
         </div>
      <ToastContainer />
     </Fragment>
  );
};

export default ProfileBodyOther;



            
          
