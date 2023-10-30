import React, { Fragment, useEffect } from "react";
import { Avatar, Box, Grid, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notFoundImage from "../../../src/asset/image/404.png";
import user from "../../../src/asset/image/user.png";
import { Image } from "antd";
import { baseUrl } from "../../api/Api";
import parser from 'html-react-parser'


const ServiceRequestDetailsPage = () => {
   const navigate = useNavigate();

   const location = useLocation();


   return (
      <Fragment>
         <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
            <Grid item lg={9} md={8} sm={12} xs={12}>
               <div className="content_body">
                  <Tooltip title="Back">
                     <div className="backArrow" onClick={(e) => { navigate(-1) }}>
                        <ArrowBackIcon />
                     </div>
                  </Tooltip>
                  <div className="service_request_details">
                     <div className="details_top_info">
                        <div className="user_info">
                           <Avatar alt={location?.state?.data?.user?.name} src={location?.state?.data?.user?.avatar?`${baseUrl}/${location?.state?.data?.user?.avatar}`:''} />
                           <div className="user_name">
                             {location?.state?.data?.user?.name}
                           </div>
                        </div>
                        <div className="info_date">
                          {new Date(location?.state?.data?.created_at).toLocaleDateString()}
                        </div>
                     </div>
                     <div className="details_text">
                        {parser(location?.state?.data?.details)}

                     </div>
                     <div className="details_file_container">
                     <div className="file_tab" sx={{ ml: 2 }}>
                        {location?.state !==null && location?.state?.data && location?.state?.data?.media && location?.state?.data?.media.length>0 && location?.state?.data?.media.map((data,i)=>{
                           return(
                              <Image src={`${baseUrl}/storage/media/${data.id}/${data.file_name}`} width={'15%'} />
                             
                              )
                           })}
                       
                       </div>
                     </div>
                  </div>
               </div>
            </Grid>
         </Grid>
      </Fragment>
   );
};

export default ServiceRequestDetailsPage;
