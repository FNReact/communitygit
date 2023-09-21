import {Grid, Tooltip } from "@mui/material";

import React, { Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import CommunityInfo from "../components/CommunityInfo/CommunityInfo";


const CommunityInfoPage = () => {
    const navigate = useNavigate();
  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
         <Grid item xs={12} sm={12} md={8} lg={9}>
            <div className="content_body">
              <CommunityInfo />
            </div>
         </Grid>
      </Grid>
    </Fragment>
  )
}

export default CommunityInfoPage