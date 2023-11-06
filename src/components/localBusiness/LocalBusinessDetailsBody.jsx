import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, businessRecommendationUrl, hirBusinessUrl, localBusinessUrl, resourceUrl } from "../../api/Api";
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

import ChatIcon from '@mui/icons-material/Chat';

import chatImage from "../../asset/image/Chat.png";



const LocalBusinessDetailsBody = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const { msDetails, userDetails, loggedInUser } = useContext(UserContext)
  const [details, setDetails] = useState(null);
  const [recommended, setRecommended] = useState(location?.state?.userRecommended)


  const [loaderVisible, setLoaderVisible] = useState(false)

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
    details: '',

    hiring_budget:'',
    hiring_details:'',
    hiring_currency: msDetails?.currency?msDetails?.currency:'',
    hiring_phone:'',
    hiring_email:'',
    hiring_location:''
  };
  const methods = useForm({ defaultValues });
  const { watch, setValue } = methods;
  const values = watch();

  const handleEditorChange = (content, type) => {
    setValue(`${type}`, content)
  };


  const [parseUser, setParseUser] = useState(null)

useEffect(()=>{
  const getData = sessionStorage.getItem('loggedInUserInfo')
  if(getData){
    const parseData = JSON.parse(getData)
    const userDetails = parseData?.user_details
    if(userDetails){
      const parseUser = JSON.parse(userDetails)
      if(parseUser){
        setValue('hiring_phone', parseUser?.phone)
        setValue('hiring_email', parseUser?.email)
      }
    }
    // setName(userDetails?.profile?.name);
  }
},[parseUser])

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

  const handleHiringBusiness = ()=>{
    setLoaderVisible(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('entity_id', details.id);
    data.append('budget', values.hiring_budget);
    data.append('details', values.hiring_details);
    data.append('email', values.hiring_email);
    data.append('phone', values.hiring_phone);
    data.append('location', values.hiring_location);
    data.append('status', 0);

    if(fileList && fileList.length>0){
      fileList.forEach(file=>{
        data.append("files[]", file.originFileObj);
      });
    }

    let config = {
      method: 'post',
      url: hirBusinessUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        handleClose()
        handleCloseHire()
         setValue('hiring_budget', '');
         setValue('hiring_details', '');
        //  setValue('hiring_email', '');
        //  setValue('hiring_phone', '');
         setValue('hiring_location','');
         setFileList([]);

        setLoaderVisible(false)
        notifySuccess('Success!.Business owner will contact you very soon.',5000)
      })
      .catch((error) => {
        setLoaderVisible(false)
        notifyError('Something went wrong !')
      });

  }




  return (
    <>
    {loaderVisible ===true &&  <MainLoader/>}

      <div className="business_details">

        <div className="b_details_top">
          <Grid container spacing={2}>
            <Grid item lg={8} md={12} sm={12} xs={12} className="xs-none">
              {details !== null && <div className="business_Title"> {details.title} </div>}
            </Grid>
            <Grid item  lg={4} md={12} sm={12} xs={12}>
              {/* <div className="hire_btn">
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickOpenHire}>
                   Service Request
                </Button>
              </div> */}
              <div className="hire_btn">
                {details?.meta?.create_by  === userDetails?.id 
                ? <Button variant="contained" endIcon={<SendIcon />} onClick={(e)=> navigate('/service-request',{state:{details:details}})}>
                    Business Requests
                  </Button>
                :
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleClickOpenHire}>
                  Hire This Business
                </Button>
              }
               
              </div>
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12} className="lg-none">
              {details !== null && <div className="business_Title"> {details.title} </div>}
            </Grid>
          </Grid>

        </div>


        {details !== null && details?.subtitle !== "null" && <h6>{details.subtitle}</h6>}
        {details !== null && details?.meta?.phone !== "null" && <h6>{details.meta.phone}</h6>}
        {details !== null && details?.meta?.email !== "null" && <h6>{details.meta.email}</h6>}
        {details !== null && details?.meta?.address !== "null" && <h6>{details.meta.address}</h6>}
        {details !== null && details?.meta?.location !== "null" && <h6>{details.meta.location}</h6>}
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
              <AddIcon /> <span>Recommend this business</span>
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
                      {userDetails.id !==data?.user?.id && <i className="cursorPointer" onClick={(e)=> navigate('/chat', {state:{user:data.user,title:details.title}})}><img src={chatImage} width={'15%'} /></i>} 
                      {((userDetails.id === data?.user?.id)) && <i className="cursorPointer" onClick={(e) => handleEditRecommendation(data)}><EditIcon /></i>}
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
              <AddIcon /> <span>Recommend this business</span>
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
                  onChange={(e) => handleEditorChange(e,'details')}
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
          className="Dialouge Fahim"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Hire This Business"}
          </DialogTitle>
          <DialogContent>
            <div className="recommended_body">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box><TextField label="Your Estimated Budget" variant="filled" type="number" fullWidth focused onChange={(e)=>setValue('hiring_budget', e.target.value)} value={values.hiring_budget} /></Box>
                </Grid>
                <Grid item xs={12}>
                  <Box><TextField label="Currency" variant="filled" fullWidth focused onChange={(e)=> setValue('hiring_currency', e.target.value)} value={values.hiring_currency} /></Box>
                </Grid>
                <Grid item xs={12}>
                  <Box><TextField label="Email" variant="filled" type="email" fullWidth focused onChange={(e)=> setValue('hiring_email', e.target.value)} value={values.hiring_email} /></Box>
                </Grid>
                <Grid item xs={12}>
                  <Box><TextField label="Phone" variant="filled" type="number" fullWidth focused onChange={(e)=> setValue('hiring_phone', e.target.value)} value={values.hiring_phone} /></Box>
                </Grid>
                <Grid item xs={12}>
                  <Box><TextField label="Location" variant="filled" fullWidth focused onChange={(e)=> setValue('hiring_location', e.target.value)} value={values.hiring_location} /></Box>
                </Grid>
                <Grid item xs={12}>
                  <SunEditor
                    name="details"
                    placeholder="Describe Here..."
                    setContents={values.hiring_details}
                    onChange={(e)=>handleEditorChange(e,'hiring_details')}
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
              Cancel
            </Button>
            {values?.hiring_budget && values.hiring_email && values?.hiring_phone 
              ?
                <Button onClick={(e)=> handleHiringBusiness(details)} autoFocus>
                  Submit
                </Button>
              :
              <Button onClick={(e)=> handleHiringBusiness(details)} autoFocus disabled>
                Submit
              </Button>
            }
           
          </DialogActions>
        </Dialog>
      <ToastContainer />
    </>
  );
};

export default LocalBusinessDetailsBody;
