import React, { Fragment, useEffect } from "react";
import NoticeBody from "../../components/NoticeBody/NoticeBody";
import {Grid } from "@mui/material";

const NoticePage = () => {
  return (
    <Fragment>
        <Grid container spacing={2}>
           <Grid item xs={3}></Grid>
           <Grid item xs={9}>
              <div className="content_body">
                 <NoticeBody />
               </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default NoticePage;
