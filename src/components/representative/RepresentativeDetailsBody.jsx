import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl, businessRecommendationUrl, recommendationUrl, resourceRecommendationUrl, resourceUrl } from "../../api/Api";
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
import { useForm } from "react-hook-form";
import MainLoader from "../PageLoadEffects/MainLoader";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/Toast";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RepresentativeDetailsBody = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const { msDetails, userDetails,loggedInUser } = useContext(UserContext);
  const [details, setDetails] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(false)
  const [recommended, setRecommended] = useState(location?.state?.userRecommended)


  const getSingleResouceDetails = () => {
    setLoaderVisible(true)
    let config = {
      method: "get",
      url: `${resourceUrl}/${location.state.uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.request(config).then((response) => {
      setDetails(response.data);
      setLoaderVisible(false)
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


  // create new recommendation
const defaultValues = {
  rating: '',
  details:''
};
const methods = useForm({defaultValues});
const {watch,setValue} = methods;
const values = watch();

const handleEditorChange = (content,type) => {
  setValue('details', content)
};


console.log('details', details)

// handle create new recommendation
const handleRecommendation = () =>{
    setLoaderVisible(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('rating',  values.rating);
    data.append('resource_id', details.id);
    data.append('details', values.details);

    let config = {
      method: 'post',
      url: resourceRecommendationUrl,
      headers: { 
        Authorization: `Bearer ${token}`,
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      handleClose()
      setRecommended(true)
      getSingleResouceDetails()
      setValue('rating', '')
      setValue('details', '')
      setLoaderVisible(false)
      notifySuccess('Success!')
    })
    .catch((error) => {
      setLoaderVisible(false)
      notifyError('Something went wrong !')
    });
}

// handle delete recommendation
const handleDeleteRecommendation = (uuid, param)=>{
  Swal.fire({
    heightAuto: false,
    backdrop: false,
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let config = {
        method: "delete",
        url: `${resourceRecommendationUrl}/${uuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios 
        .request(config)
        .then((response) => {
          notifySuccess();
          if(param ===true){ setRecommended(false)}
          getSingleResouceDetails();
        })
        .catch((error) => {
            notifyError('Something went wrong')
        });
    }
  });  
}

// handleEditRecommendation

const handleEditRecommendation =(data)=>{
  console.log('data', data)
  setValue('rating', data.rating);
  setValue('details', data.details)
  handleClickOpen();
}

console.log('details', details)

  return (
    <>
      {loaderVisible === true  && <MainLoader />}
      <div className="resource_details">
        {details !== null && <h4> {details.title} </h4>}
        {details !== null && <h6>{details.subtitle}</h6>}
        {details !== null && <p>{parser(details.details)}</p>}

        {details !== null && details.files.length > 0 && (
          <>
            <h5>Representetive Files</h5>
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

      {details?.recommendations && details?.recommendations.length>0 ?  <div className="rating_container">
          <div className="section_top">
            <div className="sec_title">
              All Recommendations
            </div>
            {recommended ===false &&  <div className="rating_add" onClick={handleClickOpen}>
              <AddIcon /> Recommmend this resource
            </div>}
           
          </div>
          {details.recommendations.map((data, key)=>{
            return(
              <div className="rating_item" key={data.uuid}>
                <div className="user_avatar">
                  <Avatar alt={data?.user?.name} src={`${baseUrl}/${data?.user?.avatar}`} />
                </div>
                <div className="rating_content">
                  <div className="content_top">
                  <div className="user_name">
                   {data?.user?.name} 
                  </div>
                  <div className="action_btn">
                    {((userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") || (userDetails.id === data?.user?.id)) && <i className="cursorPointer" onClick={(e)=> handleEditRecommendation(data)}><EditIcon/></i>}
                    {((userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") || (userDetails.id === data?.user?.id)) && <i className="cursorPointer" onClick={(e)=> handleDeleteRecommendation(data.uuid,userDetails.id === data?.user?.id )}><DeleteIcon/></i>}
                  </div>
                  </div>
                  <div className="rating_star">
                    <Rating
                      name="simple-controlled"
                      value={data?.rating}
                      readOnly
                    />
                  </div>
                  <div className="review_text">
                    {parser(data.details)}
                  </div>
                </div>
            </div>
            )
          })}
        </div>: <div className="rating_container">
            <div className="section_top">
              <div className="sec_title">
                All Recommendations
              </div>
              <div className="rating_add" onClick={handleClickOpen}>
                <AddIcon /> Recommmend this resource
              </div>
            </div>
            <Box display='flex'  justifyContent='center' justifyItems='center'>
                  <Button disabled>No data found.</Button>
              </Box>
          </div>
          }
       
      </div>

      {/* Add Modal */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add Your Recommendation Here"}
        </DialogTitle>
        <DialogContent>
          <div className="recommended_body">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <label>Give Rating</label>
              <Box>
                <Rating
                      label="Give Rating"
                      name="simple-controlled"
                      value={values.rating}
                      onChange={(e)=>setValue('rating', e.target.value)}
                    />
                </Box>
              </Grid>
              {/* <Grid item xs={12}>
                <Box><TextField label="Input Field Two" variant="filled" fullWidth focused /></Box>
              </Grid> */}
              <Grid item xs={12}>
                <SunEditor
                  name="details"
                  placeholder="Details Here..."
                  setContents={values.details}
                  showToolbar={true}
                  onChange={(e)=>handleEditorChange(e,'details')}
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
          {values?.rating !=='' && values?.details !==''? <Button variant="outlined" onClick={(e)=> handleRecommendation()} autoFocus>Submit</Button>:
           <Button variant="outlined" disabled autoFocus>Submit</Button>  }
         
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default RepresentativeDetailsBody;
