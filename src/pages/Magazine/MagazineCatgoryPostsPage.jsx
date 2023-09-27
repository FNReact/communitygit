import React, { Fragment, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ban1 from "../../asset/image/test4.jpg";

const MagazineCatgoryPostsPage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <div className="content_body">
            <Tooltip title="Back">
              <div className="backArrow" onClick={(e) => navigate(-1)}>
                <ArrowBackIcon />
              </div>
            </Tooltip>
            <div className="magazine_category_wrapper">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <div className="mag_category_Item">
                    <div className="mag_category_Item_img">
                      <img src={ban1} alt="" />
                    </div>
                    <div className="mag_category_Item_text">
                      <h4>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </h4>
                      <p>Lorem ipsum dolor sit amet. Labore, ratione ipsa harum ad aliquam eaque debitis soluta dolore, odit sint assumenda suscipit, numquam porro nemo minus animi error voluptatibus illo?</p>
                    </div>
                  </div>

                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MagazineCatgoryPostsPage;
