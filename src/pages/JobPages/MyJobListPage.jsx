import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyJobListBody from "../../components/Job/MyJobListBody";

const MyJobListPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={7}>
            <div className="content_body">
              <MyJobListBody/>
            </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MyJobListPage;
