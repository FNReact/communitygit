import React, { Fragment, useEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import ban1 from "../../asset/image/test4.jpg";
import { MagazineRightSide } from "../../components/Magazine/MagazineRightSide";
import axios from "axios";
import { baseUrl, categoryUrl, postDetailsUrl } from "../../api/Api";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import parser from 'html-react-parser'
import MagazineTopNavigation from "../../components/Magazine/MagazineTopNavigation";
const MagazineCategoryDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token'); 
  const [details, setDetails] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)


  const getDetails = (uuid) => {
    setLoaderVisible(true)
    let config = {
      method: "get",
      url: `${categoryUrl}/${uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setDetails(response?.data)
        setScrollTop(true)
        setLoaderVisible(false)
      })
      .catch((error) => {
        setLoaderVisible(false)
        // console.log(error);
      });
  };

  useEffect(()=>{
    if(location?.state !==null){
      getDetails(location?.state?.data.uuid)
    }
  },[location])

  useEffect(() => {
    if(scrollTop ===true){
      window.scrollTo(0, 0)
      setScrollTop(false)
    }
  }, [scrollTop])

  return (
    <Fragment>
      {/* {loaderVisible === true && <MainLoader />}  */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <div className="content_body">
            <Tooltip title="Back">
              <div className="backArrow" onClick={(e) => navigate(-1)}>
                <ArrowBackIcon />
              </div>
            </Tooltip>

            <div className="magazine_details">
              <MagazineTopNavigation />
              <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={8}>
                  <div className="magazine_details_wrapper">
                    <div className="magzine_img">
                    {details?.featured_image !==null && <img src={`${baseUrl}/${details?.featured_image}`} alt={details?.name} />}
                    </div>
                    <div className="content_title">{details?.name}</div>
                    <div className="content_text">
                      {details?.details && <p>{parser(details?.details)}</p>}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <MagazineRightSide />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MagazineCategoryDetailsPage;
