import React, { Fragment } from "react";
import NotificationBody from "../../components/Notification/NotificationBody";
import { Grid } from "@mui/material";

const NotificationPage = () => {
  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={3}> </Grid>
         <Grid item xs={9}>
            <div className="content_body">
              <NotificationBody />
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default NotificationPage;
