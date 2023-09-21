import { Grid, Tooltip } from "@mui/material";
import React from "react";
import ClassifiedOrderListBody from "../../components/classifiedOrder/ClassifiedOrderListBody";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ClassifiedOrderListPage = () => {
  const navigate = useNavigate();

  return (
    <>
     <Grid container spacing={2}>
         <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
         <Grid item lg={9} md={8} sm={12} xs={12}>
          
            <div className="content_body">
            <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>
                <ClassifiedOrderListBody/>
            </div>
         </Grid>
     </Grid>
    </>
  );
};

export default ClassifiedOrderListPage;
