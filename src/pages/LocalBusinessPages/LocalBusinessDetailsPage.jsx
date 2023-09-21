import { Grid, Tooltip } from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalBusinessDetailsBody from "../../components/localBusiness/LocalBusinessDetailsBody";


const LocalBusinessDetailsPage = () => { 
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
               <LocalBusinessDetailsBody/>
              </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default LocalBusinessDetailsPage;
