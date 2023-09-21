import React, { Fragment, useEffect } from "react";
import ClassifiedBody from "../../components/classified/ClassifiedBody";
import { Grid, Tooltip } from "@mui/material";

const MyClassifiedPage = () => {
  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
         <Grid item lg={9} md={8} sm={12} xs={12}>
            <div className="content_body">
              <ClassifiedBody visitor={false}/>
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default MyClassifiedPage;
