import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl, resourceUrl } from "../../api/Api";
import { Image } from "antd";
import { UserContext } from "../../utils/UserContext";
import parser from "html-react-parser";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GooglIcon from "@mui/icons-material/Google";
import YoutubeIcon from "@mui/icons-material/YouTube";
import WebIcon from "@mui/icons-material/Web";
const ResourceDetailsBody = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const { msDetails, userDetails } = useContext(UserContext);
  const [details, setDetails] = useState(null);

  const getSingleResouceDetails = () => {
    let config = {
      method: "get",
      url: `${resourceUrl}/${location.state.uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.request(config).then((response) => {
      setDetails(response.data);
    });
  };

  useEffect(() => {
    if (location.state !== null) {
      getSingleResouceDetails();
    }
  }, []);

  console.log("details", details);

  return (
    <>
      <div className="resource_details">
        {details !== null && <h4> {details.title} </h4>}
        {details !== null && <h6>{details.subtitle}</h6>}
        {details !== null && <p>{parser(details.details)}</p>}

        {details !== null && details.files.length > 0 && (
          <>
            <h5>Resource Files</h5>
            <div className="details_file_container">
              {details.files.map((file, key) => {
                return (
                  <div className="file_tab" key={key}>
                    <Image src={file.url} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {details?.meta &&  <Grid container spacing={2}>
          {details?.meta?.facebook_url && <Grid item>
            <a target="_blank" href={details?.meta?.facebook_url} rel="noreferrer">
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              </a>
          </Grid>}
          
          {details?.meta?.twitter_url  &&  <Grid item>
            <a target="_blank" href={details?.meta?.twitter_url} rel="noreferrer">
            <IconButton color="primary" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            </a>
          </Grid>}
         
          {details?.meta?.instagram_url  &&  <Grid item>
            <a target="_blank" href={details?.meta?.instagram_url} rel="noreferrer">
            <IconButton color="primary" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            </a>
          </Grid>}
         
          {details?.meta?.google_url  && <Grid item>
            <a target="_blank" href={details?.meta?.google_url} rel="noreferrer">
            <IconButton color="primary" aria-label="LinkedIn">
              <GooglIcon />
            </IconButton>
            </a>
          </Grid> }

          {details?.meta?.youtube_url  && <Grid item>
            <a target="_blank" href={details?.meta?.youtube_url} rel="noreferrer">
            <IconButton color="primary" aria-label="LinkedIn">
              <YoutubeIcon />
            </IconButton>
            </a>
          </Grid> }
          
          {details?.meta?.website_url  && <Grid item>
            <a target="_blank" href={details?.meta?.website_url} rel="noreferrer">
            <IconButton color="primary" aria-label="LinkedIn">
              <WebIcon />
            </IconButton>
            </a>
          </Grid> }
          
        </Grid>
        }
       
      </div>
    </>
  );
};

export default ResourceDetailsBody;
