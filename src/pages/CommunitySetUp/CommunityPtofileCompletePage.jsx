import React, { Fragment } from "react";
import {Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import CommunitySetUp from "../../components/CommunitySetUp/CommunitySetUp";
import CommunityProfileUpdate from "../../components/CommunitySetUp/CommunityProfileUpdate";
import CommunityProfileComplete from "../../components/CommunitySetUp/CommunityProfileComplete";

const CommunityPtofileCompletePage = () => {
  const navigate = useNavigate();
 

  return ( 
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
         <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="content_body">
              <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>
              <CommunityProfileComplete />
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommunityPtofileCompletePage;