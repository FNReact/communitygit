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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CoomunityMenuSettings from "./CoomunityMenuSettings";


const CommunitySetUp = ()=>{
  const navigate = useNavigate();
  const location = useLocation();

  const [companyLogo,setCompanyLogo] = useState(null)
  const [companyBanner,setCompanyBanner] = useState(null)
  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const [loaderEffect, setLoaderEffect] = useState(false)

  const [navigatePath, setNavigatePath] = useState(location?.state?.path?location.state.path:'/community-info')

  const [magazineLogo, setMagazineLogo] = useState([]);
  const [storeMagazineImage, setStoreMagazineImage] = useState(null)

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
    banner:null,

    member_enable:false,
    member_menu_name:'Member',
    
    my_job_enable:false,
    my_job_menu_name:'Jobs',

    my_lounge_post_enable:false,
    my_lounge_menu_name:'My Post',

    event_enable:false,
    event_menu_name:'Event',

    resource_enable:false,
    resource_menu_name:'Resources',

    media_enable:false,
    media_menu_name:'Media',

    my_classified_enable:false,
    my_classified_menu_name:'Classifieds',

    business_enable:false,
    business_menu_name:'Community Business',

    representative_enable:false,
    representative_menu_name:'Local Representetive',

    matrimony_enable:false,
    matrimony_menu_name:'Matrimonial Center',

    magazine_menu_enable:false,
    magazine_menu_name:'Community Magazine',
    magazine_name_enable:false,
    magazine_name:'',
    
    magazine_logo_enable:false,
    magazine_logo: null,



    apartment_building_name:'',
    apartment_contractors_name:'',
    apartment_builder:'',

    apartment_electrical_contractor_name:'',
    apartment_electrical_contractor_address:'',
    apartment_electrical_contractor_phone:'',

    apartment_plumbing_contractor_name:'',
    apartment_plumbing_contractor_address:'',
    apartment_plumbing_contractor_phone:'',

    apartment_windows_and_glass_contractor_name:'',
    apartment_windows_and_glass_contractor_address:'',
    apartment_windows_and_glass_contractor_phone:'',

    apartment_landscape_contractor_name:'',
    apartment_landscape_contractor_address:'',
    apartment_landscape_contractor_phone:'',

    apartment_retention_wall_contractor_name:'',
    apartment_retention_wall_contractor_address:'',
    apartment_retention_wall_contractor_phone:'',
    
    apartment_air_condition_contractor_name:'',
    apartment_air_condition_contractor_address:'',
    apartment_air_condition_contractor_phone:'',
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

       // set all appartments data
       if(res?.data?.meta?.community_settings){
          setValue('apartment_building_name',res?.data?.meta?.community_settings?.apartment_building_name )
          setValue('apartment_contractors_name',res?.data?.meta?.community_settings?.apartment_contractors_name )
          setValue('apartment_builder',res?.data?.meta?.community_settings?.apartment_builder )
          setValue('apartment_electrical_contractor_name',res?.data?.meta?.community_settings?.apartment_electrical_contractor_name )
          setValue('apartment_electrical_contractor_address',res?.data?.meta?.community_settings?.apartment_electrical_contractor_address )
          setValue('apartment_electrical_contractor_phone',res?.data?.meta?.community_settings?.apartment_electrical_contractor_phone )
          setValue('apartment_plumbing_contractor_name',res?.data?.meta?.community_settings?.apartment_plumbing_contractor_name )
          setValue('apartment_plumbing_contractor_address',res?.data?.meta?.community_settings?.apartment_plumbing_contractor_address )
          setValue('apartment_plumbing_contractor_phone',res?.data?.meta?.community_settings?.apartment_plumbing_contractor_phone )
          setValue('apartment_windows_and_glass_contractor_name',res?.data?.meta?.community_settings?.apartment_windows_and_glass_contractor_name )
          setValue('apartment_windows_and_glass_contractor_address',res?.data?.meta?.community_settings?.apartment_windows_and_glass_contractor_address )
          setValue('apartment_windows_and_glass_contractor_phone',res?.data?.meta?.community_settings?.apartment_windows_and_glass_contractor_phone )
          setValue('apartment_landscape_contractor_name',res?.data?.meta?.community_settings?.apartment_landscape_contractor_name )
          setValue('apartment_landscape_contractor_address',res?.data?.meta?.community_settings?.apartment_landscape_contractor_address )
          setValue('apartment_landscape_contractor_phone',res?.data?.meta?.community_settings?.apartment_landscape_contractor_phone )
          setValue('apartment_retention_wall_contractor_name',res?.data?.meta?.community_settings?.apartment_retention_wall_contractor_name )
          setValue('apartment_retention_wall_contractor_address',res?.data?.meta?.community_settings?.apartment_retention_wall_contractor_address )
          setValue('apartment_retention_wall_contractor_phone',res?.data?.meta?.community_settings?.apartment_retention_wall_contractor_phone )
          setValue('apartment_air_condition_contractor_name',res?.data?.meta?.community_settings?.apartment_air_condition_contractor_name )
          setValue('apartment_air_condition_contractor_address',res?.data?.meta?.community_settings?.apartment_air_condition_contractor_address )
          setValue('apartment_air_condition_contractor_phone',res?.data?.meta?.community_settings?.apartment_air_condition_contractor_phone )
        }
       
       // set all settings data
       if(res?.data?.meta?.community_settings){
        if(res?.data?.meta?.community_settings?.member_enable==='1'){
          setValue('member_enable',true)
          }else{setValue('member_enable',false)}
        setValue('member_menu_name',res?.data?.meta?.community_settings?.member_menu_name)

        if(res?.data?.meta?.community_settings?.my_job_enable==='1'){
          setValue('my_job_enable',true)
          }else{setValue('my_job_enable',false)}
        setValue('my_job_menu_name',res?.data?.meta?.community_settings?.my_job_menu_name)

        if(res?.data?.meta?.community_settings?.my_lounge_post_enable==='1'){
          setValue('my_lounge_post_enable',true)
          }else{setValue('my_lounge_post_enable',false)}
        setValue('my_lounge_menu_name',res?.data?.meta?.community_settings?.my_lounge_menu_name)

        if(res?.data?.meta?.community_settings?.event_enable==='1'){
          setValue('event_enable',true)
          }else{setValue('event_enable',false)}
        setValue('event_menu_name',res?.data?.meta?.community_settings?.event_menu_name)

        if(res?.data?.meta?.community_settings?.resource_enable==='1'){
          setValue('resource_enable',true)
          }else{setValue('resource_enable',false)}
        setValue('resource_menu_name',res?.data?.meta?.community_settings?.resource_menu_name)

        if(res?.data?.meta?.community_settings?.media_enable==='1'){
          setValue('media_enable',true)
          }else{setValue('media_enable',false)}
        setValue('media_menu_name',res?.data?.meta?.community_settings?.media_menu_name)

        if(res?.data?.meta?.community_settings?.my_classified_enable==='1'){
          setValue('my_classified_enable',true)
          }else{setValue('my_classified_enable',false)}
        setValue('my_classified_menu_name',res?.data?.meta?.community_settings?.my_classified_menu_name)

        if(res?.data?.meta?.community_settings?.business_enable==='1'){
          setValue('business_enable',true)
          }else{setValue('business_enable',false)}
        setValue('business_menu_name',res?.data?.meta?.community_settings?.business_menu_name)

        if(res?.data?.meta?.community_settings?.representative_enable==='1'){
          setValue('representative_enable',true)
          }else{setValue('representative_enable',false)}
        setValue('representative_menu_name',res?.data?.meta?.community_settings?.representative_menu_name)

        if(res?.data?.meta?.community_settings?.matrimony_enable==='1'){
          setValue('matrimony_enable',true)
          }else{setValue('matrimony_enable',false)}
        setValue('matrimony_menu_name',res?.data?.meta?.community_settings?.matrimony_menu_name)

        if(res?.data?.meta?.community_settings?.magazine_menu_enable==='1'){
          setValue('magazine_menu_enable',true)
          }else{setValue('magazine_menu_enable',false)}
        setValue('magazine_menu_name',res?.data?.meta?.community_settings?.magazine_menu_name)

        if(res?.data?.meta?.community_settings?.magazine_name_enable==='1'){
          setValue('magazine_name_enable',true)
          }else{setValue('magazine_name_enable',false)}
        setValue('magazine_name',res?.data?.meta?.community_settings?.magazine_name)

        if(res?.data?.meta?.community_settings?.magazine_logo_enable==='1'){
          setValue('magazine_logo_enable',true)
          }else{setValue('magazine_logo_enable',false)}
       }
       var magazineUrl =null;
       if(res?.data?.meta?.community_settings?.magazine_logo){
        magazineUrl=`${baseUrl}/${res?.data?.meta?.community_settings?.magazine_logo}`
       }
        setStoreMagazineImage(magazineUrl)
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

      // appends for appartments 
       data.append('apartment_building_name', values.apartment_building_name);
       data.append('apartment_contractors_name', values.apartment_contractors_name);
       data.append('apartment_builder', values.apartment_builder);

       data.append('apartment_electrical_contractor_name', values.apartment_electrical_contractor_name);
       data.append('apartment_electrical_contractor_address', values.apartment_electrical_contractor_address);
       data.append('apartment_electrical_contractor_phone', values.apartment_electrical_contractor_phone);

       data.append('apartment_plumbing_contractor_name', values.apartment_plumbing_contractor_name);
       data.append('apartment_plumbing_contractor_address', values.apartment_plumbing_contractor_address);
       data.append('apartment_plumbing_contractor_phone', values.apartment_plumbing_contractor_phone);

       data.append('apartment_windows_and_glass_contractor_name', values.apartment_windows_and_glass_contractor_name);
       data.append('apartment_windows_and_glass_contractor_address', values.apartment_windows_and_glass_contractor_address);
       data.append('apartment_windows_and_glass_contractor_phone', values.apartment_windows_and_glass_contractor_phone);

       data.append('apartment_landscape_contractor_name', values.apartment_landscape_contractor_name);
       data.append('apartment_landscape_contractor_address', values.apartment_landscape_contractor_address);
       data.append('apartment_landscape_contractor_phone', values.apartment_landscape_contractor_phone);

       data.append('apartment_retention_wall_contractor_name', values.apartment_retention_wall_contractor_name);
       data.append('apartment_retention_wall_contractor_address', values.apartment_retention_wall_contractor_address);
       data.append('apartment_retention_wall_contractor_phone', values.apartment_retention_wall_contractor_phone);

       data.append('apartment_air_condition_contractor_name', values.apartment_air_condition_contractor_name);
       data.append('apartment_air_condition_contractor_address', values.apartment_air_condition_contractor_address);
       data.append('apartment_air_condition_contractor_phone', values.apartment_air_condition_contractor_phone);

      if(JSON.parse(values.member_enable)===true){
        data.append('member_enable', 1)
        }else{data.append('member_enable', 0)}
      data.append('member_menu_name', values.member_menu_name);

      if(JSON.parse(values.my_job_enable)===true){
        data.append('my_job_enable', 1)
        }else{data.append('my_job_enable', 0)}
      data.append('my_job_menu_name', values.my_job_menu_name);

      if(JSON.parse(values.my_lounge_post_enable)===true){
        data.append('my_lounge_post_enable', 1)
        }else{data.append('my_lounge_post_enable', 0)}
      data.append('my_lounge_menu_name', values.my_lounge_menu_name);

      if(JSON.parse(values.event_enable)===true){
        data.append('event_enable', 1)
        }else{data.append('event_enable', 0)}
      data.append('event_menu_name', values.event_menu_name);

      if(JSON.parse(values.resource_enable)===true){
        data.append('resource_enable', 1)
        }else{data.append('resource_enable', 0)}
      data.append('resource_menu_name', values.resource_menu_name);

      if(JSON.parse(values.media_enable)===true){
        data.append('media_enable', 1)
        }else{data.append('media_enable', 0)}
      data.append('media_menu_name', values.media_menu_name);

      if(JSON.parse(values.my_classified_enable)===true){
        data.append('my_classified_enable', 1)
        }else{data.append('my_classified_enable', 0)}
      data.append('my_classified_menu_name', values.my_classified_menu_name);

      if(JSON.parse(values.business_enable)===true){
        data.append('business_enable', 1)
        }else{data.append('business_enable', 0)}
      data.append('business_menu_name', values.business_menu_name);

      if(JSON.parse(values.representative_enable)===true){
        data.append('representative_enable', 1)
        }else{data.append('representative_enable', 0)}
      data.append('representative_menu_name', values.representative_menu_name);

      if(JSON.parse(values.matrimony_enable)===true){
        data.append('matrimony_enable', 1)
        }else{data.append('matrimony_enable', 0)}
      data.append('matrimony_menu_name', values.matrimony_menu_name);

      if(JSON.parse(values.magazine_menu_enable)===true){
        data.append('magazine_menu_enable', 1)
        }else{data.append('magazine_menu_enable', 0)}
      data.append('magazine_menu_name', values.magazine_menu_name);

      if(JSON.parse(values.magazine_name_enable)===true){
        data.append('magazine_name_enable', 1)
        }else{data.append('magazine_name_enable', 0)}
      data.append('magazine_name', values.magazine_name);

      if(JSON.parse(values.magazine_logo_enable)===true){
        data.append('magazine_logo_enable', 1)
        }else{data.append('magazine_logo_enable', 0)}

      if(values?.magazine_logo && values?.magazine_logo.length >0){
        data.append('magazine_logo', values?.magazine_logo[0]?.originFileObj);
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

  const handleChangeStatus = (event,field) => {
    setValue(`${field}`, event.target.checked);
  };

  console.log('values', values)


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
                      && <Box sx={{mt:1}}><TextField label="Community Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>}
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    {msDetails?.meta?.community_type ==='business' 
                      && <Box sx={{mt:1}}><TextField label="Business Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("name",e.target.value)} value={values.name} /></Box>}
                    </Grid>

                  {/* for appartment start */}
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                        && <Box sx={{mt:1}}><TextField label="Apartment Building Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_building_name",e.target.value)} value={values.apartment_building_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Apartment Contractors Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_contractors_name",e.target.value)} value={values.apartment_contractors_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Apartment Builder"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_builder",e.target.value)} value={values.apartment_builder} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Electrical Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_electrical_contractor_name",e.target.value)} value={values.apartment_electrical_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Electrical Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_electrical_contractor_address",e.target.value)} value={values.apartment_electrical_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField type="number" label="Electrical Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_electrical_contractor_phone",e.target.value)} value={values.apartment_electrical_contractor_phone} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Plumbing Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_plumbing_contractor_name",e.target.value)} value={values.apartment_plumbing_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Plumbing Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_plumbing_contractor_address",e.target.value)} value={values.apartment_plumbing_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField type="number" label="Plumbing Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_plumbing_contractor_phone",e.target.value)} value={values.apartment_plumbing_contractor_phone} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Windows & Glass Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_windows_and_glass_contractor_name",e.target.value)} value={values.apartment_windows_and_glass_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Windows & Glass Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_windows_and_glass_contractor_address",e.target.value)} value={values.apartment_windows_and_glass_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField type="number" label="Windows & Glass Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_windows_and_glass_contractor_phone",e.target.value)} value={values.apartment_windows_and_glass_contractor_phone} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Landscape Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_landscape_contractor_name",e.target.value)} value={values.apartment_landscape_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Landscape Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_landscape_contractor_address",e.target.value)} value={values.apartment_landscape_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField type="number" label="Landscape Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_landscape_contractor_phone",e.target.value)} value={values.apartment_landscape_contractor_phone} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Retention Wall Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_retention_wall_contractor_name",e.target.value)} value={values.apartment_retention_wall_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Retention Wall Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_retention_wall_contractor_address",e.target.value)} value={values.apartment_retention_wall_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Retention Wall Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_retention_wall_contractor_phone",e.target.value)} value={values.apartment_retention_wall_contractor_phone} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Air Condition Contractor Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_air_condition_contractor_name",e.target.value)} value={values.apartment_air_condition_contractor_name} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField label="Air Condition Contractor Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_air_condition_contractor_address",e.target.value)} value={values.apartment_air_condition_contractor_address} /></Box>}
                    </Grid>  
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      {msDetails?.meta?.community_type ==='apartment' 
                      && <Box sx={{mt:1}} ><TextField type="number" label="Air Condition Contractor Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("apartment_air_condition_contractor_phone",e.target.value)} value={values.apartment_air_condition_contractor_phone} /></Box>}
                    </Grid>  
                    {/* for appartment end */}

                      
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Email" variant="filled" fullWidth  focused onChange={(e)=>setValue("email",e.target.value)} value={values.email} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Phone" variant="filled" fullWidth  focused onChange={(e) =>setValue("phone",e.target.value)} value={values.phone} /></Box>  
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Website" variant="filled" fullWidth  focused onChange={(e)=>setValue("website",e.target.value)} value={values.website} /></Box>
                    </Grid>
                    <Grid item lg={2} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Currency" variant="filled" fullWidth  focused onChange={(e)=>setValue("currency",e.target.value)} value={values.currency} /></Box>
                    </Grid>
                   
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Location" variant="filled" fullWidth  focused onChange={(e)=>setValue("location",e.target.value)} value={values.location} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{mt:1}} ><TextField label="Address" variant="filled" fullWidth  focused onChange={(e)=>setValue("address",e.target.value)} value={values.address} /></Box>
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
                 {/* menu settings    */}
                 <CoomunityMenuSettings 
                    values={values} 
                    setValue={setValue} 
                    handleChangeStatus={handleChangeStatus}
                    magazineLogo={magazineLogo}
                    setMagazineLogo={setMagazineLogo}
                    storeMagazineImage={storeMagazineImage}
                    setStoreMagazineImage={setStoreMagazineImage}
                  />
                    
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

