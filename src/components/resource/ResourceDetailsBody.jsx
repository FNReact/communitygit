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
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import avatar from '../../asset/image/20.png';
import avatar2 from '../../asset/image/avatar.png';
import { Avatar, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SunEditor from "suneditor-react";

const ResourceDetailsBody = () => {
  const [value, setValue] = React.useState(2);
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

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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

        {details?.meta && <Grid container spacing={2}>
          {details?.meta?.facebook_url && <Grid item>
            <a target="_blank" href={details?.meta?.facebook_url} rel="noreferrer">
              <IconButton color="primary" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
            </a>
          </Grid>}

          {details?.meta?.twitter_url && <Grid item>
            <a target="_blank" href={details?.meta?.twitter_url} rel="noreferrer">
              <IconButton color="primary" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
            </a>
          </Grid>}

          {details?.meta?.instagram_url && <Grid item>
            <a target="_blank" href={details?.meta?.instagram_url} rel="noreferrer">
              <IconButton color="primary" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </a>
          </Grid>}

          {details?.meta?.google_url && <Grid item>
            <a target="_blank" href={details?.meta?.google_url} rel="noreferrer">
              <IconButton color="primary" aria-label="LinkedIn">
                <GooglIcon />
              </IconButton>
            </a>
          </Grid>}

          {details?.meta?.youtube_url && <Grid item>
            <a target="_blank" href={details?.meta?.youtube_url} rel="noreferrer">
              <IconButton color="primary" aria-label="LinkedIn">
                <YoutubeIcon />
              </IconButton>
            </a>
          </Grid>}

          {details?.meta?.website_url && <Grid item>
            <a target="_blank" href={details?.meta?.website_url} rel="noreferrer">
              <IconButton color="primary" aria-label="LinkedIn">
                <WebIcon />
              </IconButton>
            </a>
          </Grid>}

        </Grid>
        }

        <div className="rating_container">
          <div className="section_top">
            <div className="sec_title">
              Section Title
            </div>
            <div className="rating_add" onClick={handleClickOpen}>
              <AddIcon /> Add Recommended
            </div>
          </div>
          <div className="rating_item">
            <div className="user_avatar">
              <Avatar alt="Remy Sharp" src={avatar2} />
            </div>
            <div className="rating_content">
              <div className="user_name">
                Fahim Ahmed
              </div>
              <div className="rating_star">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className="review_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati temporibus nobis natus laudantium. Nam molestias doloribus ab recusandae aliquid quas iusto, mollitia ratione veniam.
              </div>
            </div>
          </div>
          <div className="rating_item">
            <div className="user_avatar">
              <Avatar alt="Remy Sharp" src={avatar2} />
            </div>
            <div className="rating_content">
              <div className="user_name">
                Sumon Khan
              </div>
              <div className="rating_star">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className="review_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati temporibus nobis natus laudantium. Nam molestias doloribus ab recusandae aliquid quas iusto, mollitia ratione veniam.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add Your Recommended Here"}
        </DialogTitle>
        <DialogContent>
          <div className="recommended_body">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box><TextField label="Input Field One" variant="filled" fullWidth focused /></Box>
              </Grid>
              <Grid item xs={12}>
                <Box><TextField label="Input Field Two" variant="filled" fullWidth focused /></Box>
              </Grid>
              <Grid item xs={12}>
                <SunEditor
                  name="details"
                  placeholder="Details Here..."
                  showToolbar={true}
                  setDefaultStyle="height: 140px"
                  setOptions={{
                    buttonList: [
                      [
                        "fontSize",
                        "formatBlock",
                        "paragraphStyle",
                        "blockquote",
                        "bold",
                        "underline",
                        "italic",
                        "hiliteColor",
                        "align",
                        "list",
                        "link",
                        "codeView",
                      ],
                    ],
                  }}
                />
              </Grid>
            </Grid>

          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResourceDetailsBody;
