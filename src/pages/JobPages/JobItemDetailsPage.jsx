import React, { Fragment} from "react";
import JobItemDetailsBody from "../../components/Job/JobItemDetailsBody";
import { Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


const JobItemDetailsPage = () => {
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
              <JobItemDetailsBody />
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default JobItemDetailsPage;
