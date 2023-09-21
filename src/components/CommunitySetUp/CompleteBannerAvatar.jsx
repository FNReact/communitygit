import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import { allJobCategoryUrl, allJobsUrl, baseUrl, commonUserUrl, commuinityUrl, micrositeDetailsUrl, userMicrositesUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import SunEditor from "suneditor-react"; 
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CancelIcon from '@mui/icons-material/Cancel';
import MainLoader from "../PageLoadEffects/MainLoader";
import { Typography } from "antd";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadAvater from "../../utils/Avater/UploadAvater";
import PopupAvater from "../../utils/Avater/PopupAvater";
import UploadBanner from "../../utils/Banner/UploadBanner";
import PopupBanner from "../../utils/Banner/PopupBanner";

const CompleteBannerAvatar = ()=>{
  const navigate = useNavigate();
  const location = useLocation();

  const [allJobs,setAllJobs] = useState(null);
  const [allCategory,setAllCategory] = useState([])
  const [categoryTitle,setCategoryTitle] = useState('')
  const [categoryValue,setCategoryValue] = useState('')
  const [categoryId,setCategoryId] = useState('')
  const [companyLogo,setCompanyLogo] = useState(null)
  const [companyBanner,setCompanyBanner] = useState(null)
  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);
  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const [alertShow, setAlertShow] = useState(false)

  const loggedInuserInfo = sessionStorage.getItem('loggedInUserInfo');

  const getUrl = window.location.href;
  const segName = getUrl.split("/").pop();

  useEffect(()=>{
    if(alertShow ===true){
      setTimeout(()=>{
        setAlertShow(false)
      },3000)
    }
  },[alertShow])

  const defaultValues = {
    name: '',
    email: '',
    designation:'',
    phone:'',
    website:'',
    address:'',
    tagline:'',
    details:'',
    skype:'',
    whatsapp:'',
    facebook:'',
    linkedin:'',
    github:'',
    instagram:'',
    logo:null,
    banner:null,
    apartmentNumber:''

  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  useEffect(()=>{
      if(userDetails){
        setValue('name', userDetails?.profile?.name)
        setValue('email', userDetails?.email)
        setCompanyLogo(userDetails?.profile?.avatar)
        if(loggedInuserInfo){
          const parseData = JSON.parse(loggedInuserInfo);
          const meta = JSON.parse(parseData?.meta)
          if(meta?.banner){
            setCompanyBanner(meta?.banner)
          }else{
            setCompanyBanner(userDetails?.profile?.cover)
          }
        }
      }
      
  },[userDetails])

  const handleEditorChange = (content,type) => {
    if(type ==='tagline'){
      setValue('tagline',content);
    }
    if(type ==='details'){
      setValue('details',content);
    }
  };

   //get user details of a microsite 
   const getUserDetails = ()=>{
    let config = {
        method: 'get',
        url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
       sessionStorage.setItem('loggedInUserInfo', JSON.stringify(res?.data))
        window.location.href='/';
        setLoaderVisible(false)
      }).catch((e)=>  {   setLoaderVisible(false)})
}

//Create new job
 const handleUpdateCommunity = ()=>{
      setLoaderVisible(true)
      const userInfo = sessionStorage.getItem('loggedInUserInfo')
      const parseData = JSON.parse(userInfo)
      let data = new FormData();
      data.append('microsite_id', msDetails.id);
      data.append('user_id', userDetails.id);
      data.append('user_type', parseData.user_type);
      data.append('status', 1);
      if(values.name){
        data.append('name', values.name);
      }
      if(values.email){
        data.append('email', values.email);
      }
      if(values.phone){
        data.append('phone', values.phone);
      }
      if(values.website){
        data.append('website', values.website);
      }
      if(values.skype){
        data.append('skype', values.skype);
      }
      if(values.whatsapp){
        data.append('whatsapp', values.whatsapp);
      }
      if(values.skype){
        data.append('skype', values.skype);
      }
      if(values.facebook){
        data.append('facebook', values.facebook);
      }
      if(values.linkedin){
        data.append('linkedin', values.linkedin);
      }
      if(values.github){
        data.append('git', values.github);
      }
      if(values.instagram){
        data.append('instagram', values.instagram);
      }
     
      if(values.apartmentNumber){
        data.append('apartment_number', values.apartmentNumber);
      }

      if(values.details){
        data.append('about_me', values.details);
      }

      if(values.logo){
        data.append('avater', values.logo);
      }

      if(values.banner){
        data.append('banner', values.banner);
      }
    
       var config = {
          method: 'post',
          url: `${commonUserUrl}/${JSON.parse(sessionStorage.getItem('loggedInUserInfo')).uuid}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      axios.request(config)
      .then((response) => {
        getUserDetails();
        notifySuccess();
        // window.location.href='/';
        // navigate('/community-profile')
      })
      .catch((err)=>{
        setLoaderVisible(false)
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })
 }



 const [open1, setOpen1] = React.useState(false);
 const [open2, setOpen2] = React.useState(false);
  const [image1, setImage1] = React.useState('');
  const [image2, setImage2] = React.useState('');

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };



 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
    {/* ***************Logo start************* */}
            <>
                      {companyLogo !==null && segName==='avatar' &&
                      <Grid item lg={12} md={12} sm={12} xs={12} sx={{display:'flex' , justifyContent:'center', flexDirection:'column'}}>
                        <div className="pro_img_container">
                           <div className="pro_img">
                            {values.logo !==null ? <img src={URL.createObjectURL(values.logo)} />: <img src={`${baseUrl}/${companyLogo}`} width='100px' /> }
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
                                    <UploadAvater
                                      getUploadedFile={(image) => {
                                        setOpen1(true);
                                        setImage1(image);
                                      }}
                                    />
                                    <PopupAvater
                                      open={open1}
                                      handleClose={handleClose1}
                                      image={image1}
                                      setValue={setValue}
                                      getCroppedFile={(image) => {
                                        setImage1(image);
                                        handleClose1();
                                      }}
                                    />
                                  </Box>
                                </div>
                              </i>
                           </div>
                        </div>
                      </Grid>}
               </>
          
                   
{/* ***************Logo end************* */}
{/* ***************Banner Start************* */}
                <>
                     {companyBanner !==null  && segName==='banner' && <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        {/* <CloudUploadIcon  className="cursorPointer" sx={{displa:'flex', float:'right', m:1}}  /> */}
                          <Box className="bannerImg_complete" >
                          {values.banner !==null ? <img src={URL.createObjectURL(values.banner)} />: <img src={`${baseUrl}/${companyBanner}`} width='100px' /> }
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
                     </Grid>  }
                </>
              
                  
            {/* ***************Banner End************* */}

                  </Grid>

                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}> 
                          <Button fullWidth variant="contained" onClick={(e)=>handleUpdateCommunity()}>Update</Button>
                        </Box>

                      

                    {loaderVisible === true && <MainLoader/>}
                    <div className="btn_loader">
                       {ThreeDotLoaderEffect(loaderEffect)}
                    </div>
               </div>
       <ToastContainer />
</Fragment>
)
}

export default CompleteBannerAvatar

