import React, { Fragment } from "react";
import { Grid } from "@mui/material";

import MemberBody from "../../components/MemberBody/MemberBody";
const MemberPage = () => {
  return (
    <Fragment>
      <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={12} xs={12}> </Grid>
          <Grid item lg={9} md={8} sm={12} xs={12}> 
            <div className="content_body">
              <MemberBody />
            </div>
          </Grid>
      </Grid>
    </Fragment>
  );
};
export default MemberPage;
