import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl, businessRecommendationUrl, localBusinessUrl, resourceUrl } from "../../api/Api";
import { Image, Upload } from 'antd';
import { UserContext } from "../../utils/UserContext";
import parser from 'html-react-parser'
import avatar2 from '../../asset/image/avatar.png';
import { Avatar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';

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
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const LocalBusinessDetailsBody = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const { msDetails, userDetails, loggedInUser } = useContext(UserContext)
  const [details, setDetails] = useState(null);
  const [recommended, setRecommended] = useState(location?.state?.userRecommended)


  const [loaderVisible, setLoaderVisible] = useState(false)

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getSingleResouceDetails = () => {
    let config = {
      method: 'get',
      url: `${localBusinessUrl}/${location.state.uuid}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.request(config)
      .then((response) => {

        setDetails(response.data);
      })
  }



  useEffect(() => {
    if (location.state !== null) {
      getSingleResouceDetails()
    }
  }, [])

  // create new recommendation
  const defaultValues = {
    rating: '',
    details: ''
  };
  const methods = useForm({ defaultValues });
  const { watch, setValue } = methods;
  const values = watch();

  const handleEditorChange = (content, type) => {
    setValue('details', content)
  };

  // handle create new recommendation
  const handleRecommendation = () => {
    setLoaderVisible(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('rating', values.rating);
    data.append('entity_id', details.id);
    data.append('details', values.details);

    let config = {
      method: 'post',
      url: businessRecommendationUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data
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
  const handleDeleteRecommendation = (uuid, param) => {
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
          url: `${businessRecommendationUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            notifySuccess();
            if (param === true) { setRecommended(false) }
            getSingleResouceDetails();
          })
          .catch((error) => {
            notifyError('Something went wrong')
          });
      }
    });
  }

  // handleEditRecommendation

  const handleEditRecommendation = (data) => {
    setValue('rating', data.rating);
    setValue('details', data.details)
    handleClickOpen();
  }

  // Hire Form 
  const [openHire, setOpenHire] = React.useState(false);

  const handleClickOpenHire = () => {
    setOpenHire(true);
  };

  const handleCloseHire = () => {
    setOpenHire(false);
  };


  // Hire form Uploader
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  return (
    <>
      <div className="business_details">

        <div className="b_details_top">
           {details !== null && <h4> {details.title} </h4>}
           <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickOpenHire}>
              Hire This Business
         </Button>
        </div>

       
        {details !== null && details?.subtitle !== "null" && <h6>{details.subtitle}</h6>}
        {details !== null && <p>{parser(details.details)}</p>}

        {(details !== null && details.files.length > 0) && <>
          <h5>Files</h5>
          <div className="details_file_container">
            {details.files.map((file, key) => {
              return (
                <div className="file_tab" sx={{ ml: 2 }} key={key}>
                  <Image
                    src={file.url}
                  />
                </div>
              )
            })}

          </div>
        </>}

        {details?.recommendations && details?.recommendations.length > 0 ? <div className="rating_container">
          <div className="section_top">
            <div className="sec_title">
              All Recommendations
            </div>
            {recommended === false && <div className="rating_add" onClick={handleClickOpen}>
              <AddIcon /> Recommmend this business
            </div>}

          </div>
          {details.recommendations.map((data, key) => {
            return (
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
                      {((userDetails.id === msDetails.user_id || loggedInUser.user_type === "admin") || (userDetails.id === data?.user?.id)) && <i className="cursorPointer" onClick={(e) => handleEditRecommendation(data)}><EditIcon /></i>}
                      {((userDetails.id === msDetails.user_id || loggedInUser.user_type === "admin") || (userDetails.id === data?.user?.id)) && <i className="cursorPointer" onClick={(e) => handleDeleteRecommendation(data.uuid, userDetails.id === data?.user?.id)}><DeleteIcon /></i>}
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
        </div> : <div className="rating_container">
          <div className="section_top">
            <div className="sec_title">
              All Recommendations
            </div>
            <div className="rating_add" onClick={handleClickOpen}>
              <AddIcon /> Recommmend this business
            </div>
          </div>
          <Box display='flex' justifyContent='center' justifyItems='center'>
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
                    onChange={(e) => setValue('rating', e.target.value)}
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
                  onChange={(e) => handleEditorChange(e, 'details')}
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
          {values?.rating !== '' && values?.details !== '' ? <Button variant="outlined" onClick={(e) => handleRecommendation()} autoFocus>Submit</Button> :
            <Button variant="outlined" disabled autoFocus>Submit</Button>}

        </DialogActions>
      </Dialog>


      {/* Hire Dialouge / Modal */}
        <Dialog
          fullScreen={fullScreen}
          open={openHire}
          onClose={handleCloseHire}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Hire This Business"}
          </DialogTitle>
          <DialogContent>
            <div className="recommended_body">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box><TextField label="Your estimated budget" variant="filled" type="number" fullWidth focused /></Box>
                </Grid>
                <Grid item xs={12}>
                  <SunEditor
                    name="details"
                    placeholder="Describe Here..."
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
                <Grid item xs={12}>
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && '+ Upload'}
                  </Upload>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseHire}>
              Disagree
            </Button>
            <Button onClick={handleCloseHire} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      <ToastContainer />
    </>
  );
};

export default LocalBusinessDetailsBody;
