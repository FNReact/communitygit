import React from "react";
import ClassifiedCreate from "../../components/classified/ClassifiedCreate";
import { Grid } from "@mui/material";

const ClassifiedCreatePage = () => {
  return (
    <>
     <Grid container spacing={2}>
           <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
           <Grid item lg={9} md={8} sm={12} xs={12}>
                <div className="content_body">
                    <ClassifiedCreate/>
                </div>
           </Grid>
       </Grid>
    </>
  );
};
export default ClassifiedCreatePage;
