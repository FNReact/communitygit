import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Swiper, SwiperSlide } from "swiper/react";
import ban1 from "../../asset/image/test4.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import parser from 'html-react-parser'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import MagazineTopNavigation from "../../components/Magazine/MagazineTopNavigation";
import { UserContext } from "../../utils/UserContext";
import { baseUrl, postUrl } from "../../api/Api";
import axios from "axios";

const MagazinePage = () => {
  const navigate = useNavigate();
  const {magazine, msDetails, userDetails, loggedInUser} = useContext(UserContext);
  const [frontPageData, setFrontPageData] = useState([])

  //get front page data
  const getFrontPageData=()=>{
    let config = {
      method: 'get',
      url: `${postUrl}/${msDetails.id}`,
    };

    var storeData = [];
    axios.request(config)
    .then((response) => {
      if(response?.data?.data && response?.data?.data.length>0){
        response?.data?.data.forEach(element => {
          if(element.position ==='front_page'){
            storeData.push(element)
          }
        });
      }
      setFrontPageData(storeData)
    })
    .catch((error) => {
      // console.log(error);
    });
  }

  useEffect(()=>{
    getFrontPageData();
  },[])

  // handle details
  const handleDetails = (data)=>{
    navigate('/magazine-details', {state:{data:data}})
  }

  // handle see all
  const handleSeeAll =(position)=>{
    navigate(`/magazine-see-all/${position}`,{state:{position:position}})
  }

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
             
            {/* top navigation */}
            <MagazineTopNavigation />

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
                  {magazine && magazine?.slider && magazine?.slider?.length >0 && magazine?.slider.map((data,key)=>{
                      return(
                        <SwiperSlide key={data.uuid}>
                          <div className="magzine_slider_content">
                            <img src={`${baseUrl}/${data?.featured_image}`} alt={data?.title} />
                            <div className="mag_content">
                              <div className="content_info">
                                <h2>{data?.title}</h2>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                  }) }
                </Swiper>
              </div>

              {/* Sticky Section are here */}
              <div className="sticky_section">
                <Box display='flex' justifyContent='space-between' justifyItems='space-between'>
                  {/* <div className="sec_head">Sticky Section</div> */}
                  <div className="sec_head"></div>
                   {magazine && magazine?.stiky && magazine?.stiky?.length>5 &&<Button onClick={(e)=> handleSeeAll('stiky')} >See All</Button>}
                </Box>
                <div className="sticky_wrapper">
                  <Grid container spacing={2}>
                    <Grid item xs={7}>
                      {magazine?.stiky && magazine?.stiky.length>0 &&  
                      <div className="sticky_wrapper_main" onClick={(e)=> handleDetails(magazine?.stiky[0])}>
                        <div className="main_img">
                          <img src={`${baseUrl}/${magazine?.stiky[0].featured_image}`} alt={magazine?.stiky[0].title} />
                        </div>
                        <div className="main_text">
                          <h4>{magazine?.stiky[0]?.title}</h4>
                          <p>{parser(magazine?.stiky[0]?.body?.slice(0,200))}</p>
                          <div className="read_btn" onClick={(e)=> handleDetails(magazine?.stiky[0])}>
                            Read more <ArrowForwardIcon />
                          </div>
                        </div>
                      </div>}
                     

                     {magazine?.stiky && magazine?.stiky.length>3 &&
                      <div className="sticky_list">
                        <ul>
                          <li onClick={(e)=> handleDetails(magazine?.stiky[3])}>
                            <Link>
                              <ArrowRightIcon />{magazine?.stiky[3].title}
                            </Link>
                          </li>
                          <li onClick={(e)=> handleDetails(magazine?.stiky[4])}>
                            <Link>
                              <ArrowRightIcon /> {magazine?.stiky[4].title}
                            </Link>
                          </li>
                        </ul>
                      </div> }
                     
                    </Grid>
                    <Grid item xs={5}>
                    {magazine?.stiky && magazine?.stiky.length>1 &&
                    <>
                      <div className="sticky_wrapper_sub" onClick={(e)=> handleDetails(magazine?.stiky[1])}>
                        <div className="sub_img">
                          <img src={`${baseUrl}/${magazine?.stiky[1].featured_image}`} alt={magazine?.stiky[1].title} />
                        </div>
                        <div className="sub_text">
                          <h4>{magazine?.stiky[1].title}</h4>
                        </div>
                      </div>
                      <div className="sticky_wrapper_sub" onClick={(e)=> handleDetails(magazine?.stiky[2])}>
                        <div className="sub_img">
                          <img src={`${baseUrl}/${magazine?.stiky[2].featured_image}`} alt={magazine?.stiky[2].title} />
                        </div>
                        <div className="sub_text">
                          <h4>{magazine?.stiky[2].title}</h4>
                        </div>
                      </div>
                    </>
                    }
                    </Grid>
                  </Grid>
                </div>
              </div>

               {/* Exclusive Section are here */}
               <div className="exclusive_section">
                <div className="exclusive_wrapper">
                  <Box display='flex' justifyContent='space-between' justifyItems='space-between'>
                    {/* <div className="sec_head">Exclusive Header</div> */}
                    <div className=""></div>
                    {magazine && magazine?.exclusive && magazine?.exclusive?.length>5 &&<Button onClick={(e)=> handleSeeAll('exclusive')} >See All</Button>}
                  </Box>
                  <ul>
                    {magazine?.exclusive && magazine?.exclusive.length>0 && magazine?.exclusive.slice(0,5).map((data, key)=>{
                      return(
                        <li onClick={(e)=> handleDetails(data)}>
                          <Link>
                            <ArrowRightIcon /> {data?.title}
                          </Link>
                      </li>
                      )
                    }) }
                  </ul>
                </div>
              </div>

              {/* Main Ccontent are here */}
              <div className="main_contant">
                <Box display='flex' justifyContent='space-between' justifyItems='space-between'>
                  {/* <div className="sec_head">Main Content</div> */}
                  <div className="sec_head"></div>
                   {magazine && magazine?.main && magazine?.main?.length>4 &&<Button onClick={(e)=> handleSeeAll('main')} >See All</Button>}
                </Box>
                <Grid container spacing={2}>
                  {magazine && magazine?.main && magazine?.main?.length>0 && magazine?.main.slice(0,4).map((data,key)=>{
                    return(
                      <Grid item xs={3} key={data.uuid} onClick={(e)=> handleDetails(data)}>
                          <div className="main_content_item">
                            <div className="item_img">
                              <img src={`${baseUrl}/${data?.featured_image}`} alt={data?.title} />
                            </div>
                            <div className="content_title">{data?.title}</div>
                            <p>{parser(data?.body?.slice(0,100))}</p>
                          </div>
                        </Grid>
                    )
                  })}
                </Grid>
              </div>
             

              {/* Front Page Section Here are here */}

              <div className="front_section">
                  <Box display='flex' justifyContent='space-between' justifyItems='space-between'>
                    {/* <div className="sec_head">Front Section</div> */}
                    <div className="sec_head"></div>
                    {magazine && magazine?.frontPageData && magazine?.frontPageData?.length>7 &&<Button onClick={(e)=> handleSeeAll('front_page')} >See All</Button>}
                  </Box>
                   <Grid container spacing={2}>
                    {frontPageData && frontPageData.length>0 && 
                    <Grid item xs={3}>
                        <div className="front_main" onClick={(e)=> handleDetails(frontPageData[0])}>
                          <div className="front_main_img">
                            <img src={`${baseUrl}/${frontPageData[0].featured_image}`} alt={frontPageData[0].title} />
                          </div>
                          <div className="front_main_text">
                            <h4>{frontPageData[0].title}</h4>
                          </div>
                        </div>
                       </Grid> }
                       
                       {frontPageData && frontPageData.length>1 &&
                       <Grid item xs={5}>
                          <div className="front_sub" onClick={(e)=> handleDetails(frontPageData[1])}>
                           <div className="front_sub_img">
                            <img src={`${baseUrl}/${frontPageData[1].featured_image}`} alt={frontPageData[1].title} />
                           </div>
                           <div className="front_sub_text">
                            <h4>{frontPageData[1].title}</h4>
                           </div>
                         </div>
                         {frontPageData[2]?.featured_image &&
                          <div className="front_sub" onClick={(e)=> handleDetails(frontPageData[2])}>
                           <div className="front_sub_img">
                            <img src={`${baseUrl}/${frontPageData[2]?.featured_image}`} alt={frontPageData[2]?.title} />
                           </div>
                           <div className="front_sub_text">
                            <h4>{frontPageData[2]?.title}</h4>
                           </div>
                         </div>}
                          
                       </Grid>}
                       {frontPageData && frontPageData.length>3 &&
                       <Grid item xs={4}>
                       <div className="front_list">
                        <ul>
                          <li onClick={(e)=> handleDetails(frontPageData[3])}>
                            <Link>
                              <ArrowRightIcon /> {frontPageData[3]?.title}
                            </Link>
                          </li>
                          {frontPageData[4]?.title && <li onClick={(e)=> handleDetails(frontPageData[4])}>
                            <Link>
                              <ArrowRightIcon /> {frontPageData[4]?.title}
                            </Link>
                          </li>}
                          {frontPageData[5]?.title && <li onClick={(e)=> handleDetails(frontPageData[5])}>
                            <Link>
                              <ArrowRightIcon /> {frontPageData[5]?.title}
                            </Link>
                          </li>}
                          
                          {frontPageData[6]?.title && <li onClick={(e)=> handleDetails(frontPageData[6])}>
                            <Link>
                              <ArrowRightIcon /> {frontPageData[6]?.title}
                            </Link>
                          </li>}
                         {frontPageData[7]?.title && <li onClick={(e)=> handleDetails(frontPageData[7])}>
                            <Link>
                              <ArrowRightIcon /> {frontPageData[7]?.title}
                            </Link>
                          </li>}
                        </ul>
                      </div>
                       </Grid>}
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
