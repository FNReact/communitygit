import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import ban1 from "../../asset/image/test4.jpg";
import { MagazineRightSide } from "../../components/Magazine/MagazineRightSide";
import MagazineTopNavigation from "../../components/Magazine/MagazineTopNavigation";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import { baseUrl, getPostsByCatIdUrl, postUrl } from "../../api/Api";
import parser from "html-react-parser";
import MainLoader from "../../components/PageLoadEffects/MainLoader";

const MagazineSeeAllPostsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { msDetails } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [scrollTop, setScrollTop] = useState(false)


    //get front page data
    const getFrontPageData=(position)=>{
      let config = {
        method: 'get',
        url: `${postUrl}/${msDetails.id}`,
      };
  
      var storeData = [];
      axios.request(config)
      .then((response) => {
        if(response?.data?.data && response?.data?.data.length>0){
          response?.data?.data.forEach(element => {
            if(element.position ===position){
              storeData.push(element)
            }
          });
        }
        setPosts(storeData)
        setScrollTop(true)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
    useEffect(()=>{
      if(location?.state !==null){
        getFrontPageData(location?.state?.position);
      }
    },[])

  // handle details
  const handleDetails = (data) => {
    navigate("/magazine-details", { state: { data: data } });
  };

  useEffect(() => {
    if(scrollTop ===true){
      window.scrollTo(0, 0)
      setScrollTop(false)
    }
  }, [scrollTop])

  return (
    <Fragment>
        {/* {loaderVisible === true && <MainLoader/>} */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <div className="content_body">
            <Tooltip title="Back">
              <div className="backArrow" onClick={(e) => navigate(-1)}>
                <ArrowBackIcon />
              </div>
            </Tooltip>

            <div className="magazine_category_wrapper magazine_details">
              <MagazineTopNavigation />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={8}>
                  {posts &&
                    posts.length > 0 &&
                    posts.map((data, key) => {
                      return (
                        <div
                          className="mag_category_Item"
                          key={data.uuid}
                          onClick={(e) => handleDetails(data)}
                        >
                          <div className="mag_category_Item_img">
                            <img
                              src={`${baseUrl}/${data?.featured_image}`}
                              alt={data?.title}
                            />
                          </div>
                          <div className="mag_category_Item_text">
                            <h4>{data?.title}</h4>
                            <p>{parser(data?.body?.slice(0, 100))}</p>
                          </div>
                        </div>
                      );
                    })}

                  {posts && posts?.length === 0 && loaderVisible ===false && 
                    <Box
                      display="flex"
                      justifyContent="center"
                      justifyItems="center"
                    >
                      <Button disabled>No posts found</Button>
                    </Box>
                  }
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

export default MagazineSeeAllPostsPage;
