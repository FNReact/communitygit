import { Box, Button, FilledInput, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SunEditor from "suneditor-react";
import { Upload } from "antd";
import {  useForm } from "react-hook-form";
import axios from "axios";
import { ClassifiedCategoryUrl, baseUrl, classifiedUrl, eventMediaUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import CloseIcon from '@mui/icons-material/Close';

import useGeoLocation from "react-ipgeolocation";


const ClassifiedCreate = ()=>{
    const token = sessionStorage.getItem('token');
    const geoLocation = useGeoLocation();
    const location = useLocation();
    const {msDetails} = useContext(UserContext)
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [getFileList, setGetFileList] = useState(null)
    const [allCategory, setAllCategory] = useState(null);
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [apiThumb, setApiThumb] = useState(null)
    


// input default state value
const defaultValues = {
  title: '',
  location:'',
  category: '',
  amount:'',
  condition:'used',
  bidding:'yes',
  brandName:'',
  phone:'',
  email:'',
  website:'',
  tag:'',
  description:'',
  address:'',
  thumb:'',
  publishedDate:''
};
const methods = useForm({defaultValues});
const {watch,setValue} = methods;
const values = watch();

//  if uuid find update fields
const getSingleClassifiedData = (uuid)=>{
  let config = {
    method: 'get',
    url: `${classifiedUrl}/${uuid}`,
    headers: { }
  };
  
  axios.request(config)
  .then((res) => {
    setValue('title',res.data.title)
    setValue('location',res.data.location)
    setValue('amount',res.data.price)
    setValue('brandName', res.data.brand)
    setValue('phone', res.data.phone)
    setValue('email', res.data.email)
    setValue('website', res.data.web_site)
    setValue('tag', res.data.tag)
    setValue('description', res.data.description)
    setValue('address', res.data.address)
    setValue('publishedDate', res.data.published_date)
    setValue('category', res.data.category.id)
    setValue('condition', res.data.condition)
    if(res.data.files.length>0){
      setGetFileList(res.data.files)
    }
    if(res.data.bidding ===1){
      setValue('bidding', 'yes')
    }else{
      setValue('bidding', 'no')
    }

    setApiThumb(res.data.thumb)
  })
}
useEffect(()=>{
  if(location.state !==null){
    getSingleClassifiedData(location.state.uuid)
  }
},[])


// Get all categories from api
const getAllClassifiedCategory = () =>{
  let config = {
    method: 'get',
    url: ClassifiedCategoryUrl,
  };
    axios.request(config)
    .then((res)=>{
      setAllCategory(res.data.data);
      if(res.data.data.length>0){
        setValue('category', res.data.data[0].id)
      }
    })
}
useEffect(()=>{
  getAllClassifiedCategory();
},[])

//Category change
    const handleCategoryChange = (event) => {
        setValue('category',event.target.value);
    };
// Ant Uploader
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };

// handle editor change
const handleEditorChange = (content) => {
 setValue('description', content)
};

// handleCreateClassified
const handleCreateClassified = ()=>{
    setLoaderVisible(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('title', values.title);
    data.append('category', values.category);
    data.append('phone', values.phone);
    data.append('status', '1');
    data.append('web_site', values.website);
    data.append('price', values.amount);
    data.append('location', values.location);
    data.append('address', values.address);
    data.append('email', values.email);
    data.append('condition', values.condition);
    // data.append('special_note', '');
    // data.append('qty', '');
    data.append('description', values.description);
    data.append('brand', values.brandName);
    data.append('tag', values.tag);
   
    data.append('published_date', values.publishedDate);
    data.append('country_code', geoLocation.country);

    if(values.bidding ==='yes'){
      data.append('bidding', 1);
    }else{
      data.append('bidding', 0);
    }

    if(values.thumb){
      data.append('thumb', values.thumb);
    }

    if(fileList.length>0){
      fileList.forEach(file=>{
        data.append("images[]", file.originFileObj);
      });
    }
  

    var config;
    if(location.state !=null){
      config = {
        method: 'post',
        url: `${classifiedUrl}/${location.state.uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
   
    }else{
      config = {
        method: 'post',
        url: classifiedUrl,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
  
    }
    axios.request(config)
    .then((response) => {
      setLoaderVisible(false)
      navigate('/classified')
      notifySuccess();
    })
    .catch((err)=>{
      setLoaderVisible(false)
      if (err?.response) {
        notifyError(err?.response?.data?.message)
      }else{
        notifyError('Something went wrong!.')
      }
    }
      
    //   (error) => {
    //   notifyError('Something went wrong !')
    // }
    
    );
}

// handle create new classifiede category
  const handleCreateCategory = () => {
    const { value: value } = Swal.fire({
      title: 'Enter category name',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else{
          let data = new FormData();
          data.append('name', value);
          data.append('status', '1');

          let config = {
            method: 'post',
            url: ClassifiedCategoryUrl,
            headers: { 
              'Authorization': `Bearer ${token}`,
            },
            data : data
          };

          axios.request(config)
          .then((response) => {
            notifySuccess();
            getAllClassifiedCategory();
          })
          .catch((err)=>{
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          })
        }
      }
    })
  }

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
        setLoaderVisible(true)
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
            setLoaderVisible(false)
            notifySuccess();
            window.location.reload()
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
    });  
}


      
    return(
        <>
           <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>
          <div className="classified_create">
             <h4>Fill the details for create your Classified post</h4> 
             <div className="classified_create_form">
                 <Grid container spacing={2}>
                    <Grid item lg={6}  md={12} sm={12} xs={12}> 
                       <Box><TextField label="Post Title(*)" variant="filled" fullWidth  focused  onChange={(e)=>setValue('title', e.target.value)} value={values.title}  /></Box>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <Box><TextField label="Brand Name" variant="filled" fullWidth  focused  onChange={(e)=>setValue('brandName', e.target.value)} value={values.brandName} /></Box>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                      <Box ><TextField label="Location" variant="filled" color="primary" fullWidth  focused onChange={(e)=>setValue("location",e.target.value)} value={values.location} /></Box>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <FormControl fullWidth variant="filled" focused>
                          <InputLabel htmlFor="filled-adornment-amount">Price(*)</InputLabel>
                          <FilledInput
                            value={values.amount}
                            id="filled-adornment-amount"
                            startAdornment={<InputAdornment position="start">{msDetails?.currency} </InputAdornment>}
                            onChange={(e)=>setValue('amount', e.target.value)}
                          />
                       </FormControl>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                        <div className="form_rowing">
                          <FormLabel>Condition : </FormLabel>
                          <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={values.condition}
                            value={values.condition}
                          >
                           <FormControlLabel value="new"  control={<Radio />} label="new" onClick={(e)=>setValue('condition', 'new')} />
                           <FormControlLabel value="used" control={<Radio />} label="used" onClick={(e)=>setValue('condition', 'used')} />
                         </RadioGroup>
                       </FormControl>
                        </div>
                        <div className="form_rowing">
                          <FormLabel>Bidding : </FormLabel>
                          <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={values.bidding}
                            value={values.bidding}
                          >
                           <FormControlLabel value="yes"  control={<Radio />} label="yes" onClick={(e)=>setValue('bidding', 'yes')} />
                           <FormControlLabel value="no" control={<Radio />} label="no" onClick={(e)=>setValue('bidding', 'no')} />
                         </RadioGroup>
                       </FormControl>
                        </div>
                    </Grid>
                    <Grid item lg={4}  md={10} sm={8} xs={8}>
                      <FormControl variant="filled" fullWidth focused> 
                         <InputLabel id="demo-simple-select-filled-label">Select Category(*)</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={values.category}
                            onChange={handleCategoryChange}>
                            {allCategory && allCategory.length>0 && allCategory.map((data, key)=>{
                              return(<MenuItem value={data.id}>{data.name}</MenuItem>)
                            })}
                         </Select>
                       </FormControl>
                    </Grid>
                    <Grid item lg={2}  md={2} sm={4} xs={4}>
                        <Button variant="contained" onClick={(e)=>handleCreateCategory()}>Add Category</Button>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <Box><TextField label="Phone" variant="filled"  fullWidth  focused onChange={(e)=>setValue('phone',e.target.value)} value={values.phone}/></Box>
                    </Grid>
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <Box><TextField label="E-mail" variant="filled" fullWidth  focused onChange={(e)=>setValue('email',e.target.value)} value={values.email}/></Box>
                    </Grid>
                    
                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <Box><TextField label="Website" variant="filled" fullWidth  focused onChange={(e)=>setValue('website',e.target.value)} value={values.website}/></Box>
                    </Grid>

                    <Grid item lg={6}  md={12} sm={12} xs={12}>
                       <Box><TextField label="Tag" variant="filled" fullWidth  focused  onChange={(e)=>setValue('tag',e.target.value)} value={values.tag} /></Box>
                    </Grid>
                    <Grid item lg={12}  md={12} sm={12} xs={12}>
                      <Box ><TextField type="date" variant="filled" label="Published Date" color="primary" fullWidth  focused  onChange={(e)=>setValue("publishedDate",e.target.value)} value={values.publishedDate} /></Box>
                    </Grid>
                    <Grid item lg={12}  md={12} sm={12} xs={12}>
                       <Box><TextField label="Address" multiline
                      rows={3} variant="filled" fullWidth  focused  onChange={(e)=>setValue('address',e.target.value)} value={values.address} /></Box>
                    </Grid>
                    <Grid item lg={12}  md={12} sm={12} xs={12}>
                        <div className="field_heading">
                             Description :
                        </div>
                       <Box>
                          <SunEditor
                                      setContents={values.description}
                                     name="Description"
                                     placeholder="Type Description Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e)}
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
                    <Grid item lg={12}  md={12} sm={12} xs={12}>
                      {values.thumb ==='' && apiThumb ===null &&  <div className="field_heading">
                          Upload Thumb : <input type="file" onChange={(e)=> setValue('thumb', e.target.files[0])} />
                      </div>}
                      {values.thumb !=='' &&  <div className="field_heading">
                           <img src={URL.createObjectURL(values.thumb)} width='10%' alt=""></img>
                           
                           <Button onClick={(e)=>setValue('thumb', '')}>Cancel</Button>
                      </div> }
                      {apiThumb !==null &&  <div className="field_heading">
                           <img src={`${baseUrl}/${apiThumb}`} width='10%' alt=""></img>
                           <Button onClick={(e)=>setApiThumb(null)}>Cancel</Button>
                      </div> }
                     
                    </Grid>
                    <Grid item lg={12}  md={12} sm={12} xs={12}>
                        <div className="field_heading">
                            Upload Post Images :
                        </div>
                       <div className="classified_images">
                           <Upload
                              action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                              listType="picture-card"
                              fileList={fileList}
                              onChange={onChange}>
                              {fileList.length < 5 && '+ Upload'}
                          </Upload>
                       </div>
                    </Grid>
                    {getFileList !==null && <Grid item xs={12}>
                         <div className="image_list_container">
                          {getFileList.length>0 && getFileList.map((data)=>{
                            return(
                              <div className="image_place">
                                {data.url && <img src={`${data.url}`} alt=""/> }
                              <div className="img_place_overly">
                              <div className="img_cross_btn">
                                 <CloseIcon onClick={(e)=>handleDeleteEventMedia(data.uuid)}/>
                              </div>
                              </div>
                            </div>
                            )
                          })}
                            
                         </div>
                      </Grid> }
                 </Grid>
                 {loaderVisible ===false &&  <div className="classified_submit">
                    {(values.title !=='' && values.category !=='' && values.amount !=='' && location.state===null) && <Button fullWidth variant="contained" onClick={(e)=> handleCreateClassified()}> Submit </Button>}
                    {(values.title !=='' && values.category !=='' && values.amount !=='' &&  location.state !=null) && <Button fullWidth variant="contained" onClick={(e)=> handleCreateClassified()}> Update </Button>}
                    {values.title ==='' && <Button fullWidth variant="contained" disabled> Submit </Button>}
                </div>}
                {loaderVisible ===true &&  <div>
                    <ThreeDotLoaderEffect/>
                 </div>}
                
             </div>
             
             <ToastContainer />
          </div>
        </>
    )
}

export default ClassifiedCreate