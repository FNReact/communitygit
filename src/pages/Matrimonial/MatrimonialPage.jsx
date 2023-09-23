import React, { Fragment, useEffect } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const MatrimonialPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
       <Grid container spacing={2}>
           <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
           <Grid item lg={9} md={8} sm={12} xs={12}>
              <div className="content_body">
                    <Tooltip title="Back">
                       <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                          <ArrowBackIcon/>
                       </div> 
                   </Tooltip>
                  <Box display='flex' justifyContent='center' justifyItems='center'>
                    <Button disabled><h1>Upcoming...</h1></Button>
                  </Box>
               </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default MatrimonialPage;
