import React, { Fragment, useState } from "react";
import {Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

import MagazineContentList from "../../components/Magazine/MagazineContentList";
import MyMagazineContentList from "../../components/Magazine/MyMagazineContentList";

const MyMagazineContentPage = () => {
  const navigate = useNavigate();


  return ( 
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
         <Grid item xs={12} sm={12} md={8} lg={9}>
            <div className="content_body">
              <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>navigate(-1)}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>
              {/* <AdminBugSetUp /> */}
              <MyMagazineContentList />
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default MyMagazineContentPage;