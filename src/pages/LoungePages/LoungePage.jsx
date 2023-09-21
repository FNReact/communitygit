import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import LoungeBody from "../../components/LoungeBody/LoungeBody";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "../../api/Api";
import EditIcon from '@mui/icons-material/Edit';
import parse from 'html-react-parser'
import { useNavigate } from "react-router-dom";

import bannerUploadImage from '../../asset/image/bannerUpload.jpeg'
import uploadLogo from '../../asset/image/uploadIcon.png'
// import uploadLogo from '../../asset/image/upload-logo.jpeg'



const LoungePage = () => {
  const navigate = useNavigate();
  const { msDetails, userDetails } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState('')
  // const userInfo = JSON.parse(sessionStorage?.getItem('loggedInUserInfo')) 
  const info = JSON.parse(sessionStorage?.getItem('loggedInUserInfo'))
  useEffect(()=>{
    if(info){
      setUserInfo(info)
    }
  },[])

  return (
    <Fragment>
        <Grid container spacing={2}>
           <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
           <Grid item xs={12} sm={12} md={8} lg={9}>
             <div className="content_body">
                {/* {msDetails?.meta?.banner &&
                  <div className="home_banner">
                    <img src={`${baseUrl}/${msDetails?.meta?.banner}`} alt={msDetails?.name} />
                  </div>
                 } */}

                 <Box sx={{mb:2}}>
                  <div className="communityInfo_wrapper">
                        <div className="commuinity_banner">
                          {msDetails?.meta?.banner?<img src={`${baseUrl}/${msDetails?.meta?.banner}`} alt={msDetails?.name} />
                          :
                            <img src={bannerUploadImage} alt='' />
                          }
                        </div>
                    
                    <div className="community_top_info">
                        <div className="com_one">
                        <div className="com_logo">
                          {msDetails?.entity_logo?<img src={`${baseUrl}/${msDetails?.entity_logo}`} alt={msDetails?.name} />
                          :
                          <img src={uploadLogo} alt='' />
                          }
                            
                        </div>
                        <div className="com_top_left">
                            <div className="com_name"> {msDetails?.name}</div>
                            <div className="tagline">{msDetails?.tagline?parse(msDetails?.tagline):''} </div>
                        </div>
                        </div>
                         <div className="com_botttom">
                         {(userInfo?.user_type ==='admin' || msDetails?.user_id ===userDetails?.id) &&  <div className="edit_button cursorPointer" onClick={(e)=> navigate('/community-setup',{state:{path:'/'}})}>
                          <EditIcon/>  Edit 
                        </div>}
                         </div>
                       
                      

                    </div>
                  </div>
                 </Box>


               
                {msDetails && userDetails && <LoungeBody />}     
              </div>
           </Grid>
        </Grid>
        <ToastContainer />
    </Fragment>
  );
};

export default LoungePage;
