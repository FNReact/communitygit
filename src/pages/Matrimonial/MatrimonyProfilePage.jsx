import React, { Fragment, useState } from "react";
import {Box, Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom";
import MagazineContentCreate from "../../components/Magazine/MagazineContentCreate";

const MatrimonyProfilePage = () => {
  const navigate = useNavigate();


  return ( 
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
         <Grid item xs={12} sm={12} md={8} lg={9}>
            <div className="content_body">

            <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>

                <div className="section_headear">
                    <h4>Matrimony Profile</h4>
                    <div className="btns_row">
                        <Link to='/my-matrimony-profile-create'>
                           <div className="Btn_one">
                              Create
                           </div>
                        </Link>
                     </div>
                 </div> 
             
              {/* <AdminBugSetUp /> */}
              {/* <MagazineContentCreate /> */}
              <Box>This is matrimony profile page</Box>
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default MatrimonyProfilePage;