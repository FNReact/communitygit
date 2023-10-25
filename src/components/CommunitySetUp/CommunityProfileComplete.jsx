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

    apartmentNumber:'',

    individual_house_no:'', //this will be user id
    individual_member_since:'',
    individual_emergency_contact_number:'',
    individual_mobile_status:false,
    individual_mobile:'',
    individual_email_status:false,
    individual_email:'',
    individual_profession:'',
    individual_willing_to_response_emgergency_needs:false,
    individual_contractors_name:'',
    individual_builder:'',

    individual_electrical_contractor_name:'',
    individual_electrical_contractor_address:'',
    individual_electrical_contractor_phone:'',

    individual_plumbing_contractor_name:'',
    individual_plumbing_contractor_address:'',
    individual_plumbing_contractor_phone:'',

    individual_windows_and_glass_contractor_name:'',
    individual_windows_and_glass_contractor_address:'',
    individual_windows_and_glass_contractor_phone:'',

    individual_landscape_contractor_name:'',
    individual_landscape_contractor_address:'',
    individual_landscape_contractor_phone:'',

    individual_retention_wall_contractor_name:'',
    individual_retention_wall_contractor_address:'',
    individual_retention_wall_contractor_phone:'',
    
    individual_air_condition_contractor_name:'',
    individual_air_condition_contractor_address:'',
    individual_air_condition_contractor_phone:'',

  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  console.log('values', values)

  useEffect(()=>{
      if(userDetails){
        setValue('name', userDetails?.profile?.name)
        setValue('email', userDetails?.email)
        setCompanyLogo(userDetails?.profile?.avatar)
        setCompanyBanner(userDetails?.profile?.cover)
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
        // window.location.href='/';
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

      if(values.individual_house_no){
        data.append('banner', values.individual_house_no);
      }
      if(values.individual_house_no){
        data.append('individual_house_no', values.individual_house_no);
      }
      if(values.individual_member_since){
        data.append('individual_member_since', values.individual_member_since);
      }
      if(values.individual_emergency_contact_number){
        data.append('individual_emergency_contact_number', values.individual_emergency_contact_number);
      }
      if(values.individual_mobile_status ===true){
        data.append('individual_mobile_status', 1);
      }else{
        data.append('individual_mobile_status', 0);
      }
      if(values.individual_mobile){
        data.append('individual_mobile', values.individual_mobile);
      }

      if(values.individual_email_status ===true){
        data.append('individual_email_status', 1);
      }else{
        data.append('individual_email_status', 0);
      }
      if(values.individual_mobile){
        data.append('individual_email', values.individual_email);
      }

      if(values.individual_profession){
        data.append('individual_profession', values.individual_profession);
      }

      if(values.individual_willing_to_response_emgergency_needs ===true){
        data.append('individual_willing_to_response_emgergency_needs', 1);
      }else{
        data.append('individual_willing_to_response_emgergency_needs', 0);
      }

      if(values.individual_contractors_name){
        data.append('individual_contractors_name', values.individual_contractors_name);
      }
      if(values.individual_builder){
        data.append('individual_builder', values.individual_builder);
      }

      if(values.individual_electrical_contractor_name){
        data.append('individual_electrical_contractor_name', values.individual_electrical_contractor_name);
      }
      if(values.individual_electrical_contractor_address){
        data.append('individual_electrical_contractor_address', values.individual_electrical_contractor_address);
      }
      if(values.individual_electrical_contractor_phone){
        data.append('individual_electrical_contractor_phone', values.individual_electrical_contractor_phone);
      }


      if(values.individual_plumbing_contractor_name){
        data.append('individual_plumbing_contractor_name', values.individual_plumbing_contractor_name);
      }
      if(values.individual_plumbing_contractor_address){
        data.append('individual_plumbing_contractor_address', values.individual_plumbing_contractor_address);
      }
      if(values.individual_plumbing_contractor_phone){
        data.append('individual_plumbing_contractor_phone', values.individual_plumbing_contractor_phone);
      }


      if(values.individual_windows_and_glass_contractor_name){
        data.append('individual_windows_and_glass_contractor_name', values.individual_windows_and_glass_contractor_name);
      }
      if(values.individual_windows_and_glass_contractor_address){
        data.append('individual_windows_and_glass_contractor_address', values.individual_windows_and_glass_contractor_address);
      }
      if(values.individual_windows_and_glass_contractor_phone){
        data.append('individual_windows_and_glass_contractor_phone', values.individual_windows_and_glass_contractor_phone);
      }


      if(values.individual_landscape_contractor_name){
        data.append('individual_landscape_contractor_name', values.individual_landscape_contractor_name);
      }
      if(values.individual_landscape_contractor_address){
        data.append('individual_landscape_contractor_address', values.individual_landscape_contractor_address);
      }
      if(values.individual_landscape_contractor_phone){
        data.append('individual_landscape_contractor_phone', values.individual_landscape_contractor_phone);
      }


      if(values.individual_retention_wall_contractor_name){
        data.append('individual_retention_wall_contractor_name', values.individual_retention_wall_contractor_name);
      }
      if(values.individual_retention_wall_contractor_address){
        data.append('individual_retention_wall_contractor_address', values.individual_retention_wall_contractor_address);
      }
      if(values.individual_retention_wall_contractor_phone){
        data.append('individual_retention_wall_contractor_phone', values.individual_retention_wall_contractor_phone);
      }

      if(values.individual_air_condition_contractor_name){
        data.append('individual_air_condition_contractor_name', values.individual_air_condition_contractor_name);
      }
      if(values.individual_air_condition_contractor_address){
        data.append('individual_air_condition_contractor_address', values.individual_air_condition_contractor_address);
      }
      if(values.individual_air_condition_contractor_phone){
        data.append('individual_air_condition_contractor_phone', values.individual_air_condition_contractor_phone);
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
        navigate('/community-profile',{state:{showInfo:true}})
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
                      <Box ><TextField name="name" label={`Name on the ${msDetails.name}`}  variant="filled" fullWidth  focused onChange={(e)=>setValue("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    {msDetails.meta.community_type ==='apartment' && 
                      <>
                       <Grid item lg={4} md={4} sm={12} xs={12}>
                            <Box ><TextField name="HoldingNumber" label="Apartment/Holding Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue("apartmentNumber",e.target.value)} value={values.apartmentNumber} /></Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField name="House No" label="House No"  variant="filled" fullWidth  focused onChange={(e)=>setValue("individual_house_no",e.target.value)} value={values.individual_house_no} /></Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <Box ><TextField type="date" name="Member Since" label="Member Since"  variant="filled" fullWidth  focused onChange={(e)=>setValue("individual_member_since",e.target.value)} value={values.individual_member_since} /></Box>
                        </Grid>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                          <Box ><TextField  name="Emergency Contact Number" label="Emergency Contact Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue("individual_emergency_contact_number",e.target.value)} value={values.individual_emergency_contact_number} /></Box>
                        </Grid>
                        <Grid container spacing={2}>
                            <CoomunityProfileApartmentSettings 
                              values={values} 
                              setValue={setValue} 
                              handleChangeStatus={handleChangeStatus}
                            />
                        </Grid>
                        
                      </>
                     }
                   
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                       <Box ><TextField label="Email"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("email",e.target.value)} value={values.email} /></Box>
                     </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                       <Box ><TextField label="Phone Number"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("phone",e.target.value)} value={values.phone} /></Box>
                     </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
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
                    </Grid> 


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
                     {companyBanner !==null  && <Grid item lg={8} md={8} sm={12} xs={12}>
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

