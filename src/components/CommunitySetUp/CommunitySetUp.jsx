import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import { allJobCategoryUrl, allJobsUrl, baseUrl, commuinityUrl, micrositeDetailsUrl, userMicrositesUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Box, Button, Grid, TextField } from "@mui/material";
import SunEditor from "suneditor-react"; 
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CancelIcon from '@mui/icons-material/Cancel';
import MainLoader from "../PageLoadEffects/MainLoader";
import { Typography } from "antd";
import bannerUpload  from '../../asset/image/bannerUpload.jpeg'
import UploadAvater from "../../utils/Avater/UploadAvater";
import PopupAvater from "../../utils/Avater/PopupAvater";
import UploadBanner from "../../utils/Banner/UploadBanner";
import PopupBanner from "../../utils/Banner/PopupBanner";

import uploadLogo from '../../asset/image/upload-logo.jpeg'
import bannerDefault from '../../asset/image/bannerUpload.jpeg'

const CommunitySetUp = ()=>{
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

  const [navigatePath, setNavigatePath] = useState(location?.state?.path?location.state.path:'/community-info')

  const token = sessionStorage.getItem('token');
  const defaultValues = {
    name: '',
    email: '',
    phone:'',
    website:'',
    currency:'',
    location:'',
    address:'',
    tagline:'',
    details:'',
    logo:null,
    banner:null

  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  //get single job details
   const getMicrositeDetails = ()=>{
    setLoaderVisible(true)
    let config = {
        method: 'get',
        url: `${micrositeDetailsUrl}/${msDetails?.uuid}`,
      };
      axios.request(config)
      .then((res) => {
       sessionStorage.setItem('msDetails',JSON.stringify(res.data))
    
       setLoaderVisible(false)
       setValue('name',res?.data?.name);
       setValue('email',res?.data?.entity_email);
       setValue('phone',res?.data?.entity_phone);
       setValue('website',res?.data?.website);
       setValue('currency',res?.data?.currency);

       setValue('location',res?.data?.location);
       setValue('address',res?.data?.address);

       setValue('tagline',res?.data?.tagline);
       setValue('details',res?.data?.entity_details);

       setCompanyLogo(res?.data?.entity_logo);
       setCompanyBanner(res?.data?.meta?.banner)
      }).catch((e)=>  { setLoaderVisible(false)})
}
useEffect(()=>{
  if(msDetails?.uuid){
    getMicrositeDetails()
  }
},[])

  const handleEditorChange = (content,type) => {
    if(type ==='tagline'){
      setValue('tagline',content);
    }
    if(type ==='details'){
      setValue('details',content);
    }
  };

//Create new job
 const handleUpdateCommunity = ()=>{
      setLoaderVisible(true)
      let data = new FormData();
      data.append('name', values.name);
      data.append('entity_email', values.email);
      data.append('entity_phone', values.phone);
      data.append('website', values.website);
      data.append('currency', values.currency);
      data.append('location', values.location);
      data.append('address', values.address);
      data.append('tagline', values.tagline);
      data.append('entity_details', values.details);

      if(values.logo){
        data.append('entity_logo', values.logo);
      }

      if(values.banner){
        data.append('banner', values.banner);
      }
    
       var config = {
          method: 'post',
          url: `${commuinityUrl}/${msDetails?.uuid}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      axios.request(config)
      .then((response) => {
        setLoaderVisible(false)
        notifySuccess();
        setValue('logo', null)
        setValue('banner', null)
        let config = {
          method: 'get',
          url: `${micrositeDetailsUrl}/${msDetails?.uuid}`,
        };
        axios.request(config)
        .then((res) => {
         sessionStorage.setItem('msDetails',JSON.stringify(res.data))
         setTimeout((e)=>{
          window.location.href=`${navigatePath}`
         },2000)
        }).catch((e)=>  { setLoaderVisible(false)})
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column' }}> 
                          {(values.name &&  values.email ) && <Button fullWidth variant="contained" onClick={(e)=>handleUpdateCommunity()}>Update</Button>}
                        </Box>

                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    {msDetails?.meta?.community_type ==='personal' 
                      && <Box ><TextField label="Community Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>}
                    {msDetails?.meta?.community_type ==='apartment' 
                      && <Box ><TextField label="Apartment Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>}
                    {msDetails?.meta?.community_type ==='business' 
                      && <Box ><TextField label="Business Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>}
                      
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Email" variant="filled" fullWidth  focused onChange={(e)=>setValue("email",e.target.value)} value={values.email} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Phone" variant="filled" fullWidth  focused onChange={(e) =>setValue("phone",e.target.value)} value={values.phone} /></Box>  
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Website" variant="filled" fullWidth  focused onChange={(e)=>setValue("website",e.target.value)} value={values.website} /></Box>
                    </Grid>
                    <Grid item lg={2} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Currency" variant="filled" fullWidth  focused onChange={(e)=>setValue("currency",e.target.value)} value={values.currency} /></Box>
                    </Grid>
                   
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Location" variant="filled" fullWidth  focused onChange={(e)=>setValue("location",e.target.value)} value={values.location} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box  ><TextField label="Address" variant="filled" fullWidth  focused onChange={(e)=>setValue("address",e.target.value)} value={values.address} /></Box>
                    </Grid>
                    
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box  >
                          <SunEditor
                                     name="tagline"
                                     setContents={values.tagline}
                                     placeholder="Type Tag Line Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 100px"
                                     onChange={(e)=>handleEditorChange(e,'tagline')}
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
                        </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box  >
                          <SunEditor
                                     name="details"
                                     setContents={values.details}
                                     placeholder="Type Details Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'details')}
                                     setOptions={{
                                      buttonList: [
                                        [
                                          "font",
                                          "fontSize",
                                          "formatBlock",
                                          "paragraphStyle",
                                          "blockquote",
                                          "bold",
                                          "underline",
                                          "italic",
                                          "strike",
                                          "fontColor",
                                          "align",
                                          "horizontalRule",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>

                      
          {/* ***************Logo start************* */}
                      <Grid item lg={12} md={12} sm={12} xs={12} sx={{display:'flex' , justifyContent:'center', flexDirection:'column'}}>
                        <div className="pro_img_container">
                           <div className="pro_img">
                            {values.logo !==null ? <img src={URL.createObjectURL(values.logo)} />: companyLogo? <img src={`${baseUrl}/${companyLogo}`} width='100px' />:<img src={uploadLogo} width='10px' /> }
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
                      </Grid>
                    {/* {values.logo === null && companyLogo ===null  && 
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <form className="uploadBox" onChange={(e)=>setValue('logo', e.target.files[0])}>
                              <h1>Upload  Logo</h1>
                              <input type="file" name="avatar" />
                        </form>  
                    </Grid>
                      
                      }
                      {values.logo !==null && 
                       <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box  ><img  width='100px' /></Box>

                            <div className="image_place_container">
                               <img src={URL.createObjectURL(values.logo)} /> 
                               <div className="img_place_overly">
                               <div className="img_cross_btn" onClick={(e)=> setValue('logo', null)}>
                                  <CloseIcon/>
                               </div>
                               </div>
                             </div>
                       </Grid>

                      }
                      {companyLogo !==null && 
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box  ><img src={`${baseUrl}/${companyLogo}`} width='100px' /><Button onClick={(e)=> setCompanyLogo(null)}>Update</Button> </Box>
                      </Grid>
                      } */}
{/* ***************Logo end************* */}
{/* ***************Banner Start************* */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        {/* <CloudUploadIcon  className="cursorPointer" sx={{displa:'flex', float:'right', m:1}}  /> */}
                          <Box className="bannerImg_complete" >
                          {values.banner !==null ? <img src={URL.createObjectURL(values.banner)} />: companyBanner? <img src={`${baseUrl}/${companyBanner}`} width='100px' />:<img src={bannerDefault} width='100px' /> }
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
                  {/* {values.banner ===null && (companyBanner ===null || companyBanner ===undefined) &&   <Grid item lg={12} md={12} sm={12} xs={12}>
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

                    {(companyBanner !==null && companyBanner !==undefined) && <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        <CancelIcon className="cursorPointer" sx={{displa:'flex', float:'right', m:1}} onClick={(e)=> setCompanyBanner(null)} />
                        <Box className="bannerImg">
                            <img src={`${baseUrl}/${companyBanner}`} />
                          </Box>
                        </Card>
                     </Grid>  } */}
                  
      {/* ***************Banner End************* */}
                  </Grid>

                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}> 
                          {(values.name &&  values.email ) && <Button fullWidth variant="contained" onClick={(e)=>handleUpdateCommunity()}>Update</Button>}
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

export default CommunitySetUp

