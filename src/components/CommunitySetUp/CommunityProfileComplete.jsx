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
import { Alert, Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
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

import uploadLogo from '../../asset/image/uploadLogo.png'
import bannerUpload from '../../asset/image/bannerUpload.jpeg'
import CoomunityProfileApartmentSettings from "./CoomunityProfileApartmentSettings";

const CommunityProfileComplete = ()=>{
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

  const [nameLabel, setNameLabel] = useState('Name')
  const [professionLabel, setProfessionLabel] = useState('Profession')
  const [aboutLabel, setAboutLabel] = useState('Bio')

  useEffect(()=>{
    if(msDetails.meta.community_type ==='apartment'){
      setNameLabel('Apartment Number')
      setProfessionLabel('Profession of the residents')
      setAboutLabel('Apartment Details')
    }
    if(msDetails.meta.community_type ==='business'){
      setNameLabel('Business Name')
      setAboutLabel('Business Story')
    }
    if(msDetails.meta.community_type ==='housing'){
      setNameLabel('House Number/Name')
      setProfessionLabel('Profession of the owner')
      setAboutLabel('Home Details')
    }
  },[])

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


    member_since:'',
    emergency_contact_number:'',
    phone_status:false,
    email_status:false,
    profession:'',
    willing_to_response_emgergency_needs:false,

    blood_status:false,
    blood:'',
    hobbies:'',
    school_status:false,
    school_name:'',
    college_status:false,
    college_name:'',
    university_status:false,
    university_name:'',
    hometown_status:false,
    hometown_name:'',
    homedistrict_status:false,
    homedistrict_name:'',

    builder_name:'',
    electrical_constructor_name:'',
    electrical_constructor_address:'',
    electrical_constructor_phone:'',

    plumbing_constructor_name:'',
    plumbing_constructor_address:'',
    plumbing_constructor_phone:'',

    window_glass_constructor_name:'',
    window_glass_constructor_address:'',
    window_glass_constructor_phone:'',

    landscape_constructor_name:'',
    landscape_constructor_address:'',
    landscape_constructor_phone:'',
    
    retention_wall_constructor_name:'',
    retention_wall_constructor_address:'',
    retention_wall_constructor_phone:'',

    air_condition_constructor_name:'',
    air_condition_constructor_address:'',
    air_condition_constructor_phone:'',

    owners_name_status:false,
    owners_names:'',
    owners_mobile_status:false,
    owners_mobile:'',
    owners_email_status:false,
    owners_email:'',
    business_phone:'',
    business_fax:'',
    business_email:'',
    type_of_business:'',
    products_carried:'',
    service_carried:'',

    
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  useEffect(()=>{
      if(userDetails){
        setValue('name', userDetails?.profile?.name)
        setValue('email', userDetails?.email)
        setCompanyLogo(userDetails?.profile?.avatar)
        setCompanyBanner(userDetails?.profile?.cover)
      }
  },[userDetails])

const [parseUser, setParseUser] = useState(null)

useEffect(()=>{
  const getData = sessionStorage.getItem('loggedInUserInfo')
  if(getData){
    const parseData = JSON.parse(getData)
    const userDetails = parseData?.user_details
    if(userDetails){
      const parseUser = JSON.parse(userDetails)
  
      if(parseUser?.name){setValue('name', parseUser.name)}
      if(parseUser?.email){setValue('email', parseUser.email)}

      if(parseUser?.member_since){setValue('member_since', parseUser.member_since)}
      if(parseUser?.emergency_contact_number){setValue('emergency_contact_number', parseUser.emergency_contact_number)}

      if(parseUser?.phone){setValue('phone', parseUser.phone)}
      if(parseUser?.email){setValue('email', parseUser.email)}
      if(parseUser?.profession){setValue('profession', parseUser.profession)}
      if(parseUser?.blood){setValue('blood', parseUser.profession)}
      if(parseUser?.hobbies){setValue('hobbies', parseUser.hobbies)}
      if(parseUser?.school_name){setValue('school_name', parseUser.school_name)}
      if(parseUser?.college_name){setValue('college_name', parseUser.college_name)}
      if(parseUser?.university_name){setValue('university_name', parseUser.university_name)}
      if(parseUser?.hometown_name){setValue('hometown_name', parseUser.hometown_name)}
      if(parseUser?.homedistrict_name){setValue('homedistrict_name', parseUser.homedistrict_name)}
      if(parseUser?.builder_name){setValue('builder_name', parseUser.builder_name)}

      if(parseUser?.electrical_constructor_name){setValue('electrical_constructor_name', parseUser.electrical_constructor_name)}
      if(parseUser?.electrical_constructor_address){setValue('electrical_constructor_address', parseUser.electrical_constructor_address)}
      if(parseUser?.electrical_constructor_phone){setValue('electrical_constructor_phone', parseUser.electrical_constructor_phone)}

      if(parseUser?.plumbing_constructor_name){setValue('plumbing_constructor_name', parseUser.plumbing_constructor_name)}
      if(parseUser?.plumbing_constructor_address){setValue('plumbing_constructor_address', parseUser.plumbing_constructor_address)}
      if(parseUser?.plumbing_constructor_phone){setValue('plumbing_constructor_phone', parseUser.plumbing_constructor_phone)}

      if(parseUser?.window_glass_constructor_name){setValue('window_glass_constructor_name', parseUser.window_glass_constructor_name)}
      if(parseUser?.window_glass_constructor_address){setValue('window_glass_constructor_address', parseUser.window_glass_constructor_address)}
      if(parseUser?.window_glass_constructor_phone){setValue('window_glass_constructor_phone', parseUser.window_glass_constructor_phone)}

      if(parseUser?.landscape_constructor_name){setValue('landscape_constructor_name', parseUser.landscape_constructor_name)}
      if(parseUser?.landscape_constructor_address){setValue('landscape_constructor_address', parseUser.landscape_constructor_address)}
      if(parseUser?.landscape_constructor_phone){setValue('landscape_constructor_phone', parseUser.landscape_constructor_phone)}

      if(parseUser?.retention_wall_constructor_name){setValue('retention_wall_constructor_name', parseUser.retention_wall_constructor_name)}
      if(parseUser?.retention_wall_constructor_address){setValue('retention_wall_constructor_address', parseUser.retention_wall_constructor_address)}
      if(parseUser?.retention_wall_constructor_phone){setValue('retention_wall_constructor_phone', parseUser.retention_wall_constructor_phone)}

      if(parseUser?.air_condition_constructor_name){setValue('air_condition_constructor_name', parseUser.air_condition_constructor_name)}
      if(parseUser?.air_condition_constructor_address){setValue('air_condition_constructor_address', parseUser.air_condition_constructor_address)}
      if(parseUser?.air_condition_constructor_phone){setValue('air_condition_constructor_phone', parseUser.air_condition_constructor_phone)}

      if(parseUser?.owners_names){setValue('owners_names', parseUser.owners_names)}
      if(parseUser?.owners_mobile){setValue('owners_mobile', parseUser.owners_mobile)}
      if(parseUser?.owners_email){setValue('owners_email', parseUser.owners_email)}
      if(parseUser?.business_phone){setValue('business_phone', parseUser.business_phone)}
      if(parseUser?.business_fax){setValue('business_fax', parseUser.business_fax)}
      if(parseUser?.business_email){setValue('business_email', parseUser.business_email)}
      if(parseUser?.type_of_business){setValue('type_of_business', parseUser.type_of_business)}
      if(parseUser?.products_carried){setValue('products_carried', parseUser.products_carried)}
      if(parseUser?.service_carried){setValue('service_carried', parseUser.service_carried)}



      if(parseUser?.willing_to_response_emgergency_needs ==='1'){setValue('willing_to_response_emgergency_needs', true)}else{setValue('willing_to_response_emgergency_needs', false)}
      if(parseUser?.phone_status ==='1'){setValue('phone_status', true)}else{setValue('phone_status', false)}
      if(parseUser?.email_status ==='1'){setValue('email_status', true)}else{setValue('email_status', false)}
      if(parseUser?.blood_status ==='1'){setValue('blood_status', true)}else{setValue('blood_status', false)}
      if(parseUser?.school_status ==='1'){setValue('school_status', true)}else{setValue('school_status', false)}
      if(parseUser?.college_status ==='1'){setValue('college_status', true)}else{setValue('college_status', false)}
      if(parseUser?.university_status ==='1'){setValue('university_status', true)}else{setValue('university_status', false)}
      if(parseUser?.hometown_status ==='1'){setValue('hometown_status', true)}else{setValue('hometown_status', false)}
      if(parseUser?.homedistrict_status ==='1'){setValue('homedistrict_status', true)}else{setValue('homedistrict_status', false)}
      if(parseUser?.owners_name_status ==='1'){setValue('owners_name_status', true)}else{setValue('owners_name_status', false)}
      if(parseUser?.owners_mobile_status ==='1'){setValue('owners_mobile_status', true)}else{setValue('owners_mobile_status', false)}
      if(parseUser?.owners_email_status ==='1'){setValue('owners_email_status', true)}else{setValue('owners_email_status', false)}
      
    }
   
    // setName(userDetails?.profile?.name);
  }
},[parseUser])

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
        // window.location.href='/';
        navigate('/community-profile',{state:{showInfo:true}})

        setLoaderVisible(false)
      }).catch((e)=>  {   setLoaderVisible(false)})
}

//Create new job
 const handleUpdateCommunity = (e)=>{
      e.preventDefault();
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

      if(values.member_since){
        data.append('member_since', values.member_since);
      }
      if(values.emergency_contact_number){
        data.append('emergency_contact_number', values.emergency_contact_number);
      }

      if(values.phone_status ===true){
        data.append('phone_status', 1);
      }else{
        data.append('phone_status', 0);
      }
      if(values.email_status ===true){
        data.append('email_status', 1);
      }else{
        data.append('email_status', 0);
      }

      if(values.profession){
        data.append('profession', values.profession);
      }

      if(values.willing_to_response_emgergency_needs ===true){
        data.append('willing_to_response_emgergency_needs', 1);
      }else{
        data.append('willing_to_response_emgergency_needs', 0);
      }

      if(values.blood_status ===true){
        data.append('blood_status', 1);
      }else{
        data.append('blood_status', 0);
      }
      if(values.blood){
        data.append('blood', values.blood);
      }

      if(values.hobbies){
        data.append('hobbies', values.hobbies);
      }

      if(values.school_status ===true){
        data.append('school_status', 1);
      }else{
        data.append('school_status', 0);
      }
      if(values.school_name){
        data.append('school_name', values.school_name);
      }

      if(values.college_status ===true){
        data.append('college_status', 1);
      }else{
        data.append('college_status', 0);
      }
      if(values.college_name){
        data.append('college_name', values.college_name);
      }


      if(values.university_status ===true){
        data.append('university_status', 1);
      }else{
        data.append('university_status', 0);
      }
      if(values.university_name){
        data.append('university_name', values.university_name);
      }


      if(values.hometown_status ===true){
        data.append('hometown_status', 1);
      }else{
        data.append('hometown_status', 0);
      }
      if(values.hometown_name){
        data.append('hometown_name', values.hometown_name);
      }


      if(values.homedistrict_status ===true){
        data.append('homedistrict_status', 1);
      }else{
        data.append('homedistrict_status', 0);
      }
      if(values.homedistrict_name){
        data.append('homedistrict_name', values.homedistrict_name);
      }


      if(values.builder_name){
        data.append('builder_name', values.builder_name);
      }


      if(values.electrical_constructor_name){
        data.append('electrical_constructor_name', values.electrical_constructor_name);
      }
      if(values.electrical_constructor_address){
        data.append('electrical_constructor_address', values.electrical_constructor_address);
      }
      if(values.electrical_constructor_phone){
        data.append('electrical_constructor_phone', values.electrical_constructor_phone);
      }


      if(values.plumbing_constructor_name){
        data.append('plumbing_constructor_name', values.plumbing_constructor_name);
      }
      if(values.plumbing_constructor_address){
        data.append('plumbing_constructor_address', values.plumbing_constructor_address);
      }
      if(values.plumbing_constructor_phone){
        data.append('plumbing_constructor_phone', values.plumbing_constructor_phone);
      }


      if(values.window_glass_constructor_name){
        data.append('window_glass_constructor_name', values.window_glass_constructor_name);
      }
      if(values.window_glass_constructor_address){
        data.append('window_glass_constructor_address', values.window_glass_constructor_address);
      }
      if(values.window_glass_constructor_phone){
        data.append('window_glass_constructor_phone', values.window_glass_constructor_phone);
      }

      
      if(values.landscape_constructor_name){
        data.append('landscape_constructor_name', values.landscape_constructor_name);
      }
      if(values.landscape_constructor_address){
        data.append('landscape_constructor_address', values.landscape_constructor_address);
      }
      if(values.landscape_constructor_phone){
        data.append('landscape_constructor_phone', values.landscape_constructor_phone);
      }

    
      if(values.retention_wall_constructor_name){
        data.append('retention_wall_constructor_name', values.retention_wall_constructor_name);
      }
      if(values.retention_wall_constructor_address){
        data.append('retention_wall_constructor_address', values.retention_wall_constructor_address);
      }
      if(values.retention_wall_constructor_phone){
        data.append('retention_wall_constructor_phone', values.retention_wall_constructor_phone);
      }

      
      if(values.air_condition_constructor_name){
        data.append('air_condition_constructor_name', values.air_condition_constructor_name);
      }
      if(values.air_condition_constructor_address){
        data.append('air_condition_constructor_address', values.air_condition_constructor_address);
      }
      if(values.air_condition_constructor_phone){
        data.append('air_condition_constructor_phone', values.air_condition_constructor_phone);
      }


      if(values.owners_name_status ===true){
        data.append('owners_name_status', 1);
      }else{
        data.append('owners_name_status', 0);
      }
      if(values.owners_names){
        data.append('owners_names', values.owners_names);
      }


      if(values.owners_mobile_status ===true){
        data.append('owners_mobile_status', 1);
      }else{
        data.append('owners_mobile_status', 0);
      }
      if(values.owners_mobile){
        data.append('owners_mobile', values.owners_mobile);
      }

      
      if(values.owners_email_status ===true){
        data.append('owners_email_status', 1);
      }else{
        data.append('owners_email_status', 0);
      }
      if(values.owners_email){
        data.append('owners_email', values.owners_email);
      }


      if(values.business_phone){
        data.append('business_phone', values.business_phone);
      }
      if(values.business_fax){
        data.append('business_fax', values.business_fax);
      }
      if(values.business_email){
        data.append('business_email', values.business_email);
      }
      if(values.type_of_business){
        data.append('type_of_business', values.type_of_business);
      }
      if(values.products_carried){
        data.append('products_carried', values.products_carried);
      }
      if(values.service_carried){
        data.append('service_carried', values.service_carried);
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

 return(
    <Fragment>
         <div className="jobHome">
            <Box sx={{mb:1}}> 
            <Alert severity="warning">{`Update your information on ${msDetails.name}!`}</Alert>
            </Box>

            
         
                <Grid container spacing={2}>
                    
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField name="name" label={nameLabel}  variant="filled" fullWidth  focused onChange={(e)=>setValue("name",e.target.value)} value={values.name} /></Box>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Box ><TextField type="date" name="Member In The Community Since" label="Member In The Community Since"  variant="filled" fullWidth  focused onChange={(e)=>setValue("member_since",e.target.value)} value={values.member_since} /></Box>
                      </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Box ><TextField  name="Emergency Contact Number" label="Emergency Contact Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue("emergency_contact_number",e.target.value)} value={values.emergency_contact_number} /></Box>
                    </Grid>

                    {/* mobile */}
                    <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
                      <Box sx={{ml:2}} >
                        <FormControl component="fieldset" variant="standard">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  id="myToggleStatus"
                                  label="Publish"
                                  labelPlacement="start"
                                  checked={JSON.parse(values.phone_status)}
                                  onChange={(e) => handleChangeStatus(e, "phone_status")}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label="Phone Number Visibility"
                            />
                          </FormGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
                      <Box>
                        <TextField
                          type="number"
                          label="Phone Number"
                          disabled={JSON.parse(values.phone_status)=== true ? false : true}
                          variant="filled"
                          fullWidth
                          focused
                          onChange={(e) => setValue("phone", e.target.value)}
                          value={values.phone}
                        />
                      </Box>
                    </Grid>

                  {/* email */}
                    <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
                      <Box sx={{ml:2}} >
                        <FormControl component="fieldset" variant="standard">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  id="myToggleStatus"
                                  label="Publish"
                                  labelPlacement="start"
                                  checked={JSON.parse(values.email_status)}
                                  onChange={(e) => handleChangeStatus(e, "email_status")}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label="Email Visibility"
                            />
                          </FormGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
                      <Box>
                        <TextField
                          label="Email"
                          disabled={JSON.parse(values.email_status)=== true ? false : true}
                          variant="filled"
                          fullWidth
                          focused
                          onChange={(e) => setValue("email", e.target.value)}
                          value={values.email}
                        />
                      </Box>
                    </Grid>

                 

                    {msDetails.meta.community_type !=='business' && 
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box ><TextField name="Profession" label="Profession"  variant="filled" fullWidth  focused onChange={(e)=>setValue("profession",e.target.value)} value={values.profession} /></Box>
                       </Grid>
                    }

                    {/* business information  */}
                    {msDetails.meta.community_type ==='business' && 
                      <>
                        {/* owners name */}
                        <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.owners_name_status)}
                                      onChange={(e) => handleChangeStatus(e, "owners_name_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Owner's Name Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="Owner's Name"
                              disabled={JSON.parse(values.owners_name_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("owners_names", e.target.value)}
                              value={values.owners_names}
                            />
                          </Box>
                        </Grid>      
                        {/* owners mobile */}
                        <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.owners_mobile_status)}
                                      onChange={(e) => handleChangeStatus(e, "owners_mobile_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Owner's Mobile Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="Owner's Mobile"
                              disabled={JSON.parse(values.owners_mobile_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("owners_mobile", e.target.value)}
                              value={values.owners_mobile}
                            />
                          </Box>
                        </Grid>      
                        {/* owners email */}
                        <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.owners_email_status)}
                                      onChange={(e) => handleChangeStatus(e, "owners_email_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Owner's Email Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="Owner's Email"
                              disabled={JSON.parse(values.owners_email_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("owners_email", e.target.value)}
                              value={values.owners_email}
                            />
                          </Box>
                        </Grid>  

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Box sx={{mt:2}}><TextField name="Business Phone" label="Business Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("business_phone",e.target.value)} value={values.business_phone} /></Box>
                        </Grid>    
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="Business Fax" label="Business Fax"  variant="filled" fullWidth  focused onChange={(e)=>setValue("business_fax",e.target.value)} value={values.business_fax} /></Box>
                        </Grid>    
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="Business Email" label="Business Email"  variant="filled" fullWidth  focused onChange={(e)=>setValue("business_email",e.target.value)} value={values.business_email} /></Box>
                        </Grid>   

                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="Type Of Business" label="Type Of Business"  variant="filled" fullWidth  focused onChange={(e)=>setValue("type_of_business",e.target.value)} value={values.type_of_business} /></Box>
                        </Grid>    
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="Products Carried" label="Products Carried"  variant="filled" fullWidth  focused onChange={(e)=>setValue("products_carried",e.target.value)} value={values.products_carried} /></Box>
                        </Grid>    
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="Service Carried" label="Service Carried"  variant="filled" fullWidth  focused onChange={(e)=>setValue("service_carried",e.target.value)} value={values.service_carried} /></Box>
                        </Grid>    
                      </>
                    }

                     {/* personal information */}
                    {msDetails.meta.community_type ==='personal' &&
                      <>
                       <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box ><TextField name="Hobbies" label="Hobbies"  variant="filled" fullWidth  focused onChange={(e)=>setValue("hobbies",e.target.value)} value={values.hobbies} /></Box>
                        </Grid>

                      {/* blood */}
                        {/* <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.blood_status)}
                                      onChange={(e) => handleChangeStatus(e, "blood_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Blood Group Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="Blood Group"
                              disabled={JSON.parse(values.blood_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("blood", e.target.value)}
                              value={values.blood}
                            />
                          </Box>
                        </Grid> */}

                        {/* school */}
                        <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.school_status)}
                                      onChange={(e) => handleChangeStatus(e, "school_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="School Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="School Name"
                              disabled={JSON.parse(values.school_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("school_name", e.target.value)}
                              value={values.school_name}
                            />
                          </Box>
                        </Grid>
                        {/* college */}
                        <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.college_status)}
                                      onChange={(e) => handleChangeStatus(e, "college_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="College Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="College Name"
                              disabled={JSON.parse(values.college_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("college_name", e.target.value)}
                              value={values.college_name}
                            />
                          </Box>
                        </Grid>
                        {/* University */}
                        <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.university_status)}
                                      onChange={(e) => handleChangeStatus(e, "university_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="University Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="College Name"
                              disabled={JSON.parse(values.university_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("university_name", e.target.value)}
                              value={values.university_name}
                            />
                          </Box>
                        </Grid>
                        {/* hometown /village */}
                        <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.hometown_status)}
                                      onChange={(e) => handleChangeStatus(e, "hometown_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Hometown/Village Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="College Name"
                              disabled={JSON.parse(values.hometown_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("hometown_name", e.target.value)}
                              value={values.hometown_name}
                            />
                          </Box>
                        </Grid>
                        {/* home district */}
                        {/* <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
                          <Box sx={{ml:2}} >
                            <FormControl component="fieldset" variant="standard">
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      id="myToggleStatus"
                                      label="Publish"
                                      labelPlacement="start"
                                      checked={JSON.parse(values.homedistrict_status)}
                                      onChange={(e) => handleChangeStatus(e, "homedistrict_status")}
                                      inputProps={{ "aria-label": "controlled" }}
                                    />
                                  }
                                  label="Home District Visibility"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
                          <Box>
                            <TextField
                              label="Home District Name"
                              disabled={JSON.parse(values.homedistrict_status)=== true ? false : true}
                              variant="filled"
                              fullWidth
                              focused
                              onChange={(e) => setValue("homedistrict_name", e.target.value)}
                              value={values.homedistrict_name}
                            />
                          </Box>
                        </Grid> */}


                      </>
                    }

                    {/* housing information */}
                    {(msDetails.meta.community_type ==='housing') &&
                    <>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box ><TextField name="Builder" label="Builder Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("builder_name",e.target.value)} value={values.builder_name} /></Box>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Electrical Contractor</Box>
                          <Box>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Electrical Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("electrical_constructor_name",e.target.value)} value={values.electrical_constructor_name} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Electrical Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("electrical_constructor_address",e.target.value)} value={values.electrical_constructor_address} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Electrical Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("electrical_constructor_phone",e.target.value)} value={values.electrical_constructor_phone} /></Box>
                                </Grid>
                              </Grid>
                          </Box>
                        </Card>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Plumbing Contractor</Box>
                          <Box>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Plumbing Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("plumbing_constructor_name",e.target.value)} value={values.plumbing_constructor_name} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Plumbing Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("plumbing_constructor_address",e.target.value)} value={values.plumbing_constructor_address} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Plumbing Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("plumbing_constructor_phone",e.target.value)} value={values.plumbing_constructor_phone} /></Box>
                                </Grid>
                              </Grid>
                          </Box>
                        </Card>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Window And Glass Contractor</Box>
                          <Box>
                            <Grid container spacing={2}>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Window And Glass Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("window_glass_constructor_name",e.target.value)} value={values.window_glass_constructor_name} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Window And Glass Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("window_glass_constructor_address",e.target.value)} value={values.window_glass_constructor_address} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Window And Glass Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("window_glass_constructor_phone",e.target.value)} value={values.window_glass_constructor_phone} /></Box>
                              </Grid>
                              </Grid>
                          </Box>
                        </Card>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Landscape Contractor</Box>
                          <Box>
                          <Grid container spacing={2}>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Landscape Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("landscape_constructor_name",e.target.value)} value={values.landscape_constructor_name} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Landscape Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("landscape_constructor_address",e.target.value)} value={values.landscape_constructor_address} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Landscape Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("landscape_constructor_phone",e.target.value)} value={values.landscape_constructor_phone} /></Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Card>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Retention Wall Contractor</Box>
                          <Box>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Retention Wall Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("retention_wall_constructor_name",e.target.value)} value={values.retention_wall_constructor_name} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Retention Wall Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("retention_wall_constructor_address",e.target.value)} value={values.retention_wall_constructor_address} /></Box>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                  <Box ><TextField name="Retention Wall Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("retention_wall_constructor_phone",e.target.value)} value={values.retention_wall_constructor_phone} /></Box>
                                </Grid>
                              </Grid>
                          </Box>
                        </Card>
                       </Grid>

                       <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{p:3}}>
                          <Box sx={{mb:1}}>Air Condition Contractor</Box>
                          <Box>
                            <Grid container spacing={2}>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Air Condition Constructor Name" label="Name"  variant="filled" fullWidth  focused onChange={(e)=>setValue("air_condition_constructor_name",e.target.value)} value={values.air_condition_constructor_name} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Air Condition Constructor Address" label="Address"  variant="filled" fullWidth  focused onChange={(e)=>setValue("air_condition_constructor_address",e.target.value)} value={values.air_condition_constructor_address} /></Box>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Box ><TextField name="Air Condition Constructor Phone" label="Phone"  variant="filled" fullWidth  focused onChange={(e)=>setValue("air_condition_constructor_phone",e.target.value)} value={values.air_condition_constructor_phone} /></Box>
                              </Grid>
                              </Grid>
                          </Box>
                        </Card>
                       </Grid>
                    </>
                    }
                   


                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{mt:3}} >
                      <Box >
                        <FormControl component="fieldset" variant="standard">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  id="myToggleStatus"
                                  label="Publish"
                                  labelPlacement="start"
                                  checked={JSON.parse(values.willing_to_response_emgergency_needs)}
                                  onChange={(e) => handleChangeStatus(e, "willing_to_response_emgergency_needs")}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label="Willing to respond in emergency needs"
                            />
                          </FormGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                    
                    {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Wesite"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("website",e.target.value)} value={values.website} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Skype"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("skype",e.target.value)} value={values.skype} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Whatsapp"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("whatsapp",e.target.value)} value={values.whatsapp} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Facebook"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("facebook",e.target.value)} value={values.facebook} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Linkedin"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("linkedin",e.target.value)} value={values.linkedin} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Github"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("github",e.target.value)} value={values.github} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Box ><TextField label="Instagram"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("instagram",e.target.value)} value={values.instagram} /></Box>
                    </Grid>  */}


    {/* ***************Logo start************* */}
        
            <>
                      {companyLogo !==null && 
                      <Grid item lg={4} md={4} sm={12} xs={12} sx={{display:'flex' , justifyContent:'center', flexDirection:'column'}}>
                        <div className="pro_img_container">
                           <div className="pro_img">
                            {values.logo !==null ? <img src={URL.createObjectURL(values.logo)} />: <img src={`${baseUrl}/${companyLogo}`} width='100px' /> }
                              <i>
                              {/* <CloudUploadIcon /> */}
                              <div>
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
                                </div>
                              </i>
                           </div>
                           <Box display='flex' justifyContent='center' justifyItems='center'>Avatar</Box>
                        </div>
                      </Grid>}
               </>
          
                   
{/* ***************Logo end************* */}
{/* ***************Banner Start************* */}
                <>
                     {companyBanner !==null  && <Grid item lg={8} md={8} sm={12} xs={12}>
                      <Card sx={{ minHeight: 225 }}>
                        {/* <CloudUploadIcon  className="cursorPointer" sx={{displa:'flex', float:'right', m:1}}  /> */}
                          <Box className="bannerImg_complete" >
                          {values.banner !==null ? <img src={URL.createObjectURL(values.banner)} />: <img src={`${baseUrl}/${companyBanner}`} width='100px' /> }
                              <i>
                              {/* <CloudUploadIcon /> */}
                              <div>
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
                                </div>
                              </i>
                          </Box>
                          <Box display='flex' justifyContent='center' justifyItems='center'>Banner</Box>
                        </Card>
                     </Grid>  }
                </>
              
                  
            {/* ***************Banner End************* */}
                       <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box>
                            <label>{aboutLabel}</label>
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
                    
                   

                      

                  </Grid>

                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}> 
                          <Button fullWidth variant="contained" onClick={(e)=>handleUpdateCommunity(e)}>Update</Button>
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

export default CommunityProfileComplete

