import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Swiper, SwiperSlide } from "swiper/react";
import ban1 from "../../asset/image/test4.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const MagazineDemoPage = () => {
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
                {/* <div className="top_left">
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={(e) => navigate("/magazine-menu")}
                  >
                    Menu
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => navigate("/magazine-content")}
                  >
                    Content
                  </Button>
                </div> */}
              </div>
              <div className="magazine_nav">
                <ul class="nav_list">
                  <li>
                    <a href="#"> Home </a>
                  </li>
                  <li class="droppper">
                    <a href="#">
                      About
                      <i>
                        <ArrowDropDownIcon />
                      </i>
                    </a>
                    <ul class="sub_down">
                      <li>
                        <a href="#">Mission</a>
                      </li>
                      <li>
                        <a href="#">Vission</a>
                      </li>
                      <li>
                        <a href="#">Our team</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#"> Admission </a>
                  </li>
                  <li>
                    <a href="#"> Gallery </a>
                  </li>
                  <li>
                    <a href="#"> Teachers </a>
                  </li>
                  <li>
                    <a href="#"> Results </a>
                  </li>
                  <li>
                    <a href="#"> Contact </a>
                  </li>
                </ul>
                <div className="mag_search">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form_control"
                  />
                  <i>
                    <SearchIcon />
                  </i>
                </div>
              </div>

              {/* Magazine Slider are here */}
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

              {/* Main Ccontent are here */}
              <div className="main_contant">
                <div className="sec_head">Mian Content</div>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
                    <div className="main_content_item">
                      <div className="item_img">
                        <img src={ban1} alt="" />
                      </div>
                      <div className="content_title">This Is Content Title</div>
                      <p>Lorem ipsum dolor sit amet dd tetur.</p>
                    </div>
                  </Grid>
                </Grid>
              </div>

              {/* Sticky Section are here */}
              <div className="sticky_section">
                <div className="sec_head">Sticky Section</div>
                <div className="sticky_wrapper">
                  <Grid container spacing={2}>
                    <Grid item xs={7}>
                      <div className="sticky_wrapper_main">
                        <div className="main_img">
                          <img src={ban1} alt="" />
                        </div>
                        <div className="main_text">
                          <h4>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                          </h4>
                          <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Nemo, porro sit praesentium inventore{" "}
                          </p>
                          <div className="read_btn">
                            Read more <ArrowForwardIcon />
                          </div>
                        </div>
                      </div>
                      <div className="sticky_list">
                        <ul>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this mistaken idea
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div className="sticky_wrapper_sub">
                        <div className="sub_img">
                          <img src={ban1} alt="" />
                        </div>
                        <div className="sub_text">
                          <h4>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                          </h4>
                        </div>
                      </div>
                      <div className="sticky_wrapper_sub">
                        <div className="sub_img">
                          <img src={ban1} alt="" />
                        </div>
                        <div className="sub_text">
                          <h4>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                          </h4>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>

              {/* Exclusive Section are here */}
              <div className="exclusive_section">
                <div className="exclusive_wrapper">
                  <div className="exclusive_head">Exclusive Header</div>
                  <ul>
                    <li>
                      <Link>
                        <ArrowRightIcon /> But I must explain to you how all
                        this.
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <ArrowRightIcon /> But I must explain to you how all
                        this But I must explain to .
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <ArrowRightIcon /> But I must explain to you But I must
                        explain to you how all this how all this
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <ArrowRightIcon /> But I must all this how all this
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <ArrowRightIcon /> But I must explain to you how all
                        this all this
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Front Page Section Here are here */}

              <div className="front_section">
                  <div className="sec_head">Front Section One</div>
                   <Grid container spacing={2}>
                       <Grid item xs={3}>
                       <div className="front_main">
                        <div className="front_main_img">
                          <img src={ban1} alt="" />
                        </div>
                        <div className="front_main_text">
                          <h4>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                          </h4>
                        </div>
                      </div>
                       </Grid>
                       <Grid item xs={5}>
                          <div className="front_sub">
                           <div className="front_sub_img">
                             <img src={ban1} alt="" />
                           </div>
                           <div className="front_sub_text">
                             <h4>
                               Lorem ipsum dolor sit, amet consectetur adipisicing
                               elit.
                             </h4>
                           </div>
                         </div>
                          <div className="front_sub">
                           <div className="front_sub_img">
                             <img src={ban1} alt="" />
                           </div>
                           <div className="front_sub_text">
                             <h4>
                               Lorem ipsum dolor sit, amet consectetur adipisicing
                               elit.
                             </h4>
                           </div>
                         </div>
                       </Grid>
                       <Grid item xs={4}>
                       <div className="front_list">
                        <ul>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this mistaken idea
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this mistaken idea
                            </Link>
                          </li>
                         
                          <li>
                            <Link>
                              <ArrowRightIcon /> But I must explain to you how
                              all this
                            </Link>
                          </li>
                        </ul>
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

export default MagazineDemoPage;
