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


     //get single job details
   const getMicrositeDetails = ()=>{
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
       
        document.getElementById('bgImage').style.backgroundImage = `url(${baseUrl}/${meta?.banner})`;
       }
      }).catch((e)=>  { setLoaderVisible(false)})
}
useEffect(()=>{
  if(msDetails?.id){
    getMicrositeDetails()
  }
},[])




// console.log('store user', storeUser) //as user
// console.log('userInfo', userInfo) // as user_details

    

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
                {/* <Box>
                   <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                     <Tab label="Posts" {...a11yProps(0)} />
                     <Tab label="About Community" {...a11yProps(1)} />
                     <Tab label="Friends" {...a11yProps(2)} />
                   </Tabs>
                </Box>             */}
              </div>  
          {/* <TabPanel value={value} index={0}>
             <UserPostOther userInfo={userInfo} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
         </TabPanel> */}
          <div>
            <UserPostOther userInfo={storeUser} />
         </div>
      <ToastContainer />
     </Fragment>
  );
};

export default ProfileBodyOther;



            
          
