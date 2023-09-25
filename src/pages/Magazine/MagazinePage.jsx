import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Swiper, SwiperSlide } from "swiper/react";
import ban1 from "../../asset/image/test4.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const MagazinePage = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <div className="content_body">
            <Tooltip title="Back">
              <div
                className="backArrow"
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </div>
            </Tooltip>
            <div className="magazine">
              <div className="magazine_top">
                <div className="magazine_t">Community Magazine</div>
                <div className="top_left">
                  <Button variant="outlined" sx={{mr:2}} onClick={(e)=> navigate('/magazine-menu') } >Menu</Button>
                  <Button variant="contained" onClick={(e)=> navigate('/magazine-content') } >Content</Button>
                </div>
              </div>
              <div className="mag_category_list">
                {/* <h4>Category List</h4> */}
                <ul>
                  <li> Home</li>
                  <li> Nav-1</li>
                  <li> Nav-2</li>
                  <li> Nav-3</li>
                  <li> Nav-4</li>
                  <li> Nav-5</li>
                </ul>
              </div>
              <div className="magzine_slider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="magzine_slider_content">
                      <img src={ban1} alt="" />
                      <div className="mag_content">
                        <div className="content_info">
                          <h2>Slider Heading Is Here</h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="main_contant">
                <div className="sec_head">Mian Content</div>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <div className="main_content_item">
                      <div className="item_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="content_title">This Is Content Title</div>
                      <p>
                        Lorem ipsum dolor sit amet consec dd tetur, adipisicing
                        elit.
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="main_content_item">
                      <div className="item_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="content_title">This Is Content Title</div>
                      <p>
                        Lorem ipsum dolor sit amet consec dd tetur, adipisicing
                        elit.
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className="main_content_item">
                      <div className="item_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="content_title">This Is Content Title</div>
                      <p>
                        Lorem ipsum dolor sit amet consec dd tetur, adipisicing
                        elit.
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MagazinePage;
