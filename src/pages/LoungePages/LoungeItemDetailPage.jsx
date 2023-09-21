import React, { Fragment } from "react";
import LoungeItemDetail from "../../components/LoungeItemDetail/LoungeItemDetail";
import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";


const LoungeItemDetailPage = () => {
  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
         <Grid item xs={12} sm={12} md={8} lg={9}>
            <div className="content_body">
              <LoungeItemDetail />
            </div>
         </Grid>
      </Grid>
      <ToastContainer/>
    </Fragment>
  );
};

export default LoungeItemDetailPage;
