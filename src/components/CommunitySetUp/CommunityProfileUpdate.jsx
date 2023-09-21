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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CancelIcon from '@mui/icons-material/Cancel';
import MainLoader from "../PageLoadEffects/MainLoader";
import { Typography } from "antd";


const CommunityProfileUpdate = ()=>{
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
  const [storeMemberUuid, setStoreMemberUuid] = useState(null)

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');

  const [alertShow, setAlertShow] = useState(false)

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
    currency:'',
    location:'',
    address:'',
    tagline:'',
    details:'',
    logo:null,
    banner:null,
    apartmentNumber:''

  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

 


  //get details
   const getMicrositeDetails = ()=>{
    setLoaderVisible(true)
    let config = {
        method: 'get',
        url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
      };
      axios.request(config)
      .then((res) => {
       setLoaderVisible(false)
       setStoreMemberUuid(res?.data?.uuid)
       const storeData = res?.data?.user_details
       const storeMeta = res?.data?.meta
       if(storeData){
        const info = JSON.parse(storeData)
        const meta = JSON.parse(storeMeta)

        if(info?.name){
          setValue('name',info?.name);
        }else{
          setValue('name',res?.data?.user?.name);
          setAlertShow(true)
        }
        setValue('designation',info?.designation);
        setValue('details',info?.about_me);
        setValue('apartmentNumber',info?.apartment_number);
        setCompanyLogo(info?.avater);
        setCompanyBanner(meta?.banner)
       }
      }).catch((e)=>  { setLoaderVisible(false)})
}
useEffect(()=>{
  if(msDetails?.id){
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
      if(values.designation){
        data.append('designation', values.designation);
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
          url: `${commonUserUrl}/${storeMemberUuid}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      axios.request(config)
      .then((response) => {
        notifySuccess();
        getMicrositeDetails()
        window.location.href='/';
        // window.location.href='/community-profile';
        // navigate('/community-profile')
        setLoaderVisible(false)
       
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



 return(
    <Fragment>
         <div className="jobHome">
            <Box sx={{mb:1}}> 
              {alertShow === true && <Alert severity="warning">Update your name!</Alert>}
            </Box>
         
                <Grid container spacing={2}>
                    {location?.state?.type ==='name' && 
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    }

                    {location?.state?.type ==='designation' &&
                       <Grid item lg={12} md={12} sm={12} xs={12}>
                       <Box ><TextField label="Designation"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("designation",e.target.value)} value={values.designation} /></Box>
                     </Grid>
                    }
                    {location?.state?.type ==='apartment_number' &&
                       <Grid item lg={12} md={12} sm={12} xs={12}>
                       <Box ><TextField label="Apartment/Holding Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_number",e.target.value)} value={values.apartmentNumber} /></Box>
                     </Grid>
                    }
                    
                   
                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Wesite"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Skype"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Whatsapp"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Facebook"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Linkedin"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Github"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Instagram"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>
                    </Grid> */}

                    {location?.state?.type ==='details' && 
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
                    }
                   

                      
          {/* ***************Logo start************* */}
          {location?.state?.type ==='avatar' && 
            <>
             {values.logo === null && companyLogo ===null  && 
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <form className="uploadBox" onChange={(e)=>setValue('logo', e.target.files[0])}>
                              <h1>Upload  Logo</h1>
                              <input type="file" name="avatar" />
                        </form>  
                    </Grid>}

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
                       </Grid>}
                      {companyLogo !==null && 
                      <Grid item lg={12} md={12} sm={12} xs={12} display='flex' justifyContent='center'>
                        <Box  ><img src={`${baseUrl}/${companyLogo}`} width='100px' /></Box>
                        <Button onClick={(e)=> setCompanyLogo(null)}>Upload</Button> 
                      </Grid>}
            </>
          }
                   
{/* ***************Logo end************* */}
{/* ***************Banner Start************* */}

              {location?.state?.type ==='cover' && 
                <>
                {values.banner ===null && (companyBanner ===null || companyBanner ===undefined) &&  <Grid item lg={12} md={12} sm={12} xs={12}>
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

                     {(companyBanner !==null && companyBanner !==undefined) &&  <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        <CancelIcon className="cursorPointer" sx={{displa:'flex', float:'right', m:1}} onClick={(e)=> setCompanyBanner(null)} />
                          <Box className="bannerImg">
                            <img src={`${baseUrl}/${companyBanner}`} />
                          </Box>
                        </Card>
                     </Grid>  }
                </>
              }
                  
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

export default CommunityProfileUpdate

