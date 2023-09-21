import { Upload } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import userPic from "../../asset/image/femaleAvatar.png";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Avatar, AvatarGroup, Backdrop, Box, Button, Card, Grid , Tooltip, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { baseUrl, eventMediaUrl, eventsUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import { notifyError, notifySuccess } from "../../utils/Toast";

import CancelIcon from '@mui/icons-material/Cancel';

import bannerUpload  from '../../asset/image/bannerUpload.jpeg'
import MainLoader from "../PageLoadEffects/MainLoader";
import bannerDefault from '../../asset/image/bannerUpload.jpeg'
import UploadBanner from "../../utils/Banner/UploadBanner";
import PopupBanner from "../../utils/Banner/PopupBanner";



const EventBannerBody = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  // Date Time Star
  const [getFileList, setGetFileList] = useState(null)
  const {msDetails,userDetails} = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fileList, setFileList] = useState([]);
  const [loaderEffectValue, setLoaderEffectValue] = useState(false)
  const [eventBanner,setEventBanner] = useState(null)
  const [loadershow, setLoaderShow] = useState('none')

  // date and time handle
  const handleDateChange = (date) => {
    
    var dateString = new Date(date - (date.getTimezoneOffset() * 60000 )) .toISOString() .split("T")[0]
    var getHour = date.getHours();
    var getMinutes =  date.getMinutes();
    var timeString = `${getHour}:${getMinutes}`;
    var joinDate = dateString.concat(" ",timeString)
    setSelectedDate(joinDate);
  };

  // Date Time End
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

  const handleEditorChange = (content,type) => {
    setValue('details', content)
  };


  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const defaultValues = {
    title: '',
    subtitle: '',
    location:'',
    details:'',
    directionUrl:'',
    banner:null
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


  // const handle create event
  const handleCreateEvent = () =>{
    setLoaderEffect(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('title', values.title);
    data.append('subtitle', values.subtitle);
    data.append('location', values.location);
    data.append('date', selectedDate);
    data.append('details', values.details);

    data.append('direction_url', values.directionUrl);

    if(values.banner){
      data.append('banner', values.banner);
    }

    if(fileList.length>0){
      fileList.forEach(file=>{
        data.append("files[]", file.originFileObj);
      });
    }

    var config;

    if(location.state !==null){
      config = {
        method: 'post',
        url: `${eventsUrl}/${location.state.uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
    }else{
      config = {
        method: 'post',
        url:  eventsUrl,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
    }
    
    axios.request(config)
    .then((response) => {
      setLoaderEffect(false)
      if(location.state !==null){
        // window.location.reload();
        navigate('/event-detail', {state:{uuid:location.state.uuid,event:location.state.event}})
      }else{
        navigate('/event');
      }
    })
    .catch((err)=>{
      setLoaderEffect(false)
      if (err?.response) {
        notifyError(err?.response?.data?.message)
      }else{
        notifyError('Something went wrong!.')
      }
    })
    
  }


  // get details item
const getSingleEventDetails = ()=>{
  setLoaderShow('')
  let config = {
    method: 'get',
    url: `${eventsUrl}/${location.state.uuid}`,
    headers: { 
      'Authorization': `Bearer ${token}`,
    },
  };
  axios.request(config)
  .then((response) => {
    setLoaderShow('none')
    if(response.data){
      setValue('title', response.data.title)
      setValue('subtitle', response.data.subtitle)
      setValue('location', response.data.location)
      setValue('details', response.data.details)

      setValue('directionUrl', response?.data?.meta?.direction_url)
      setSelectedDate(response.data.date);

      setEventBanner(response?.data?.meta?.banner)


      if(response.data.files.length>0){
        setGetFileList(response.data.files)
      }
    }
  })
}

useEffect(()=>{
  if(location.state !==null){
    getSingleEventDetails()
  }
},[])

 //handle delete a resouce media
 const handleDeleteEventMedia=(uuid)=>{
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
        setLoaderEffectValue(true)
        let config = {
          method: "delete",
          url: `${eventMediaUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios 
          .request(config)
          .then((response) => {
            setLoaderEffectValue(false)
            notifySuccess();
            window.location.reload()
          })
          .catch((err)=>{
            setLoaderEffect(false)
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          })
      }
    });  
}


const [open2, setOpen2] = useState(false);
const [image2, setImage2] = useState('');


 const handleClose2 = () => {
   setOpen2(false);
 };



  return (
    <Fragment>
        
        <Box display={loadershow}>  <MainLoader  /></Box>
      
        <div className="event_create">
           <h4>Banner Update</h4>
           <div className="event_form">
              <Grid container spacing={2}>
                
                {/* ***************Banner Start************* */}
                    {/* {values.banner ===null && (eventBanner ===null || eventBanner ===undefined) &&   <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        <Box className="uploadBannerBox">
                            <input
                                style={{ display: "none" }}
                                id="contained-button-file"
                                type="file"
                                onChange={(e)=>setValue('banner', e.target.files[0])}
                              />
                             <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                  Upload Banner
                                </Button>
                              </label>
                              
                          </Box>
                        </Card>
                     </Grid>
                    }
                  
                    {values.banner !==null &&  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        <CancelIcon className="cursorPointer" sx={{displa:'flex', float:'right', m:1}} onClick={(e)=> setValue('banner',null)} />
                        <Box className="bannerImg">
                            <img src={URL.createObjectURL(values.banner)} />
                          </Box>
                        </Card>
                     </Grid>  }

                     {(eventBanner !==null && eventBanner !==undefined) &&  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        <CancelIcon className="cursorPointer" sx={{displa:'flex', float:'right', m:1}} onClick={(e)=> setEventBanner(null)} />
                        <Box className="bannerImg">
                            <img src={`${baseUrl}/${eventBanner}`} />
                          </Box>
                        </Card>
                     </Grid>  } */}

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        {/* <CloudUploadIcon  className="cursorPointer" sx={{displa:'flex', float:'right', m:1}}  /> */}
                          <Box className="bannerImg_complete" >
                          {values.banner !==null ? <img src={URL.createObjectURL(values.banner)} />: eventBanner? <img src={`${baseUrl}/${eventBanner}`} width='100px' />:<img src={bannerDefault} width='100px' /> }
                              <i>
                              {/* <CloudUploadIcon /> */}
                              <div>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center"
                                    }}
                                  >
                                    <UploadBanner
                                      getUploadedFile={(image) => {
                                        setOpen2(true);
                                        setImage2(image);
                                      }}
                                    />
                                    <PopupBanner
                                      open={open2}
                                      handleClose={handleClose2}
                                      image={image2}
                                      setValue={setValue}
                                      getCroppedFile={(image) => {
                                        setImage2(image);
                                        handleClose2();
                                      }}
                                    />
                                  </Box>
                                </div>
                              </i>
                          </Box>
                        </Card>
                     </Grid>
                  
      {/* ***************Banner End************* */}



                  <Grid item xs={12}>
                    {loaderEffect === false && <div className="eventSubmit_btn" onClick={(e)=> handleCreateEvent()} >
                        Submit
                   </div>}
                   <div className="btn_loader">
                       {ThreeDotLoaderEffect(loaderEffect)}
                    </div>
                 </Grid>
              </Grid>
           </div>
        </div>
    </Fragment>
  );
};

export default EventBannerBody;
