import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import {  addMediaUrl, baseUrl, categoryUrl, magazineMainUrl, matrimonyUrl, mediaUploadUrl, postDetailsUrl, postUrl, reportUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import SunEditor from "suneditor-react"; 
import { useForm } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import MainLoader from "../PageLoadEffects/MainLoader";
import { Upload, Modal, Image } from 'antd';
import Dragger from "antd/es/upload/Dragger";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';


const MatrimonyProfileCreate = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const getUrl = window.location.href;
  const segName = getUrl.split("/").pop();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [mediaList, setMediaList] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  const [storeImage, setStoreImage] = useState(null)
  const [storeFiles, setStoreFiles] = useState(null)

  //get user info
  useEffect(()=>{
    const getLoggedInuser = sessionStorage.getItem('loggedInUserInfo')
    const parseData = JSON.parse(getLoggedInuser)
    setUserInfo(parseData)
  },[])
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const handleCancel = () => setPreviewVisible(false);


const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  //  multiple files upload
  const handleChange = ({ fileList: newFileList }) => {
    var files = newFileList;
      setFileList(newFileList);
    }
  
  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 0,
          padding: "40px",
        }}
      >
        Feature Image
      </div>
    </div>
  );


    //  multiple files upload
    const handleMediaChange = ({ fileList: newFileList }) => {
      var files = newFileList;
      setMediaList(newFileList)
    };
  const uploadMediaButton = (
    <div>
      <div
        style={{
          marginTop: 0,
          padding: "40px",
        }}
      >
        Upload Media (Photos)
      </div>
    </div>
  );

  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');

  const getLoggedInFo = JSON.parse(sessionStorage?.getItem('loggedInUserInfo'))
  const info = JSON.parse(getLoggedInFo?.user_details)


  const defaultValues = {
    name: info?.name?info?.name:'',
    email: info?.email?info.email:'',
    phone:info?.phone?info.phone:'',
    location:info?.location?info.location:'',
    validity:'',
    dob:'',
    gender:'male',
    religion:'',
    about_me:'',
    father_details:'',
    mother_details:'',
    education_details:'',
    work_details:'',
    marital_details:'',
    marital_status:'unmarried',
    paternal_family_details:'',
    maternal_family_details:'',
    siblings_details:'',
    hobbies:'',
    expectation_from_partner:'',
    dislikes_from_partner:'',
    dont_knock_if:'',
    special_note:'',
    other_text:'',
    posted_by:'',
    status:true
  };

  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryId, setCategoryId] = useState();
  const [categoryTitle, setCategoryTitle] = useState(null);

  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  const handleEditorChange = (content,type) => {
    if(type ==='message'){
      setValue('message',content);
    }
  };
  const  handleGender = (e)=>{
    setValue('position',e.target.value)
  }
  const  handleMaritalStatus = (e)=>{
    setValue('marital_status',e.target.value)
  }
  const handleChangeStatus = (event) => {
    setValue('status', event.target.checked);
  };

  // get all Category categories
  const [categories, setCategories] = useState([]);
  const getAllCategories = () => {
    let config = {
      method: 'get',
      url: `${categoryUrl}/${msDetails.id}/all`,
    };
    
    axios.request(config)
    .then((response) => {
      setCategories(response?.data?.data);
    })
    .catch((error) => {
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);


   // handle get main magazine datas
   const handleGetMainMagazine = ()=>{
    setLoaderVisible(true);
    let config = {
      method: 'get',
      url: `${magazineMainUrl}/${msDetails.id}`,
    };

    axios.request(config)
    .then((response) => {
      sessionStorage.setItem("magazine", JSON.stringify(response.data));
      setTimeout(()=>{
        window.location.href='/magazine-content'
      },1000)
      setLoaderVisible(false);
    })
    .catch((error) => {
      setLoaderVisible(false);
    });

  }


//Create new job
const handleMatrimonyAdd = async () => {
    setLoaderVisible(true);

    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('user_id', userDetails?.id);
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('location', values.location);
    if(values.status ===true){
      data.append('status', '1');
    }else{
      data.append('status', '0');
    }
    data.append('validity', values.validity);
    data.append('dob', values.dob);
    data.append('gender', values.gender);
    data.append('religion', values.religion);
    data.append('about_me', values.about_me);
    data.append('father_details', values.father_details);
    data.append('mother_details', values.mother_details);
    data.append('education_details', values.education_details);
    data.append('work_details', values.work_details);
    data.append('marital_details', values.marital_details);
    data.append('marital_status', values.marital_status);
    data.append('paternal_family_details', values.paternal_family_details);
    data.append('maternal_family_details', values.maternal_family_details);
    data.append('siblings_details', values.siblings_details);
    data.append('hobbies', values.hobbies);
    data.append('expectation_from_partner', values.expectation_from_partner);
    data.append('dislikes_from_partner', values.dislikes_from_partner);
    data.append('dont_knock_if', values.dont_knock_if);
    data.append('special_note', values.special_note);
    data.append('other_text', values.other_text);
    data.append('posted_by', userDetails?.profile.name);
    if(mediaList && mediaList.length>0){
      mediaList.forEach(element => {
        data.append('files[]', element.originFileObj);
      });
    }
    if(fileList && fileList.length>0){
      data.append('featured_image', fileList[0]);
    }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      };

      var url;
      if(location?.state !==null){
        url = `${matrimonyUrl}/${location?.state?.row?.uuid}`
      }else{
        url = `${matrimonyUrl}/${'9a186a23-1e61-4a93-a2e7-2cfb9b866c92'}`
      }

      axios
        .post(url, data, config)
        .then((response) => {
          // handleGetMainMagazine();
          setLoaderVisible(false);
          notifySuccess();
        })
        .catch((err) => {
          notifyError();
        });
};


// get single category details
const getSingleMaritalDetails = (row)=>{
  // setLoaderVisible(true)
  let config = {
    method: 'get',
    // url: `${matrimonyUrl}/${row.uuid}`,
    url: `${matrimonyUrl}/${'9a186a23-1e61-4a93-a2e7-2cfb9b866c92'}`,
  };
  
  axios.request(config)
  .then((response) => {
    if(response?.data){
      setValue('name', response?.data?.name)
      setValue('email', response?.data?.email)
      setValue('phone', response?.data?.phone)
      setValue('location', response?.data?.location)

      if(response?.data?.status ===1){
        setValue('status', true)
      }else{
        setValue('status', false)
      }

      setValue('dob', response?.data?.meta?.dob)
      setValue('validity', response?.data?.meta?.validity)
      setValue('religion', response?.data?.meta?.religion)
      setValue('gender', response?.data?.meta?.gender)
      setValue('marital_status', response?.data?.meta?.marital_status)
      setValue('dont_knock_if', response?.data?.meta?.dont_knock_if)
      setValue('about_me', response?.data?.meta?.about_me)
      setValue('father_details', response?.data?.meta?.father_details)
      setValue('mother_details', response?.data?.meta?.mother_details)
      setValue('education_details', response?.data?.meta?.education_details)
      setValue('work_details', response?.data?.meta?.work_details)
      setValue('marital_details', response?.data?.meta?.marital_details)
      setValue('paternal_family_details', response?.data?.meta?.paternal_family_details)
      setValue('maternal_family_details', response?.data?.meta?.maternal_family_details)
      setValue('siblings_details', response?.data?.meta?.siblings_details)
      setValue('hobbies', response?.data?.meta?.hobbies)
      setValue('expectation_from_partner', response?.data?.meta?.expectation_from_partner)
      setValue('dislikes_from_partner', response?.data?.meta?.dislikes_from_partner)
      setValue('special_note', response?.data?.meta?.special_note)
      setValue('other_text', response?.data?.meta?.other_text)


      setStoreFiles(response?.data?.files)

      // if(response?.data?.featured_image !==null){
      //   setStoreImage(`${baseUrl}/${response?.data?.posts?.featured_image}`)
      // }
      
    }
    
    setLoaderVisible(false)
  })
  .catch((error) => {
    setLoaderVisible(false)
  });
}

useEffect(()=>{
  getSingleMaritalDetails()
  // if(location?.state !==null){
  //   getSingleMaritalDetails(location?.state?.row)
  // }
},[categoryValue, categories])



// handle delete item
  //handle delete a resouce
  const handleDeleteItem=(uuid)=>{
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
            url: `${addMediaUrl}/${uuid}/${msDetails.uuid}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios 
            .request(config)
            .then((response) => {
              notifySuccess();
              getSingleMaritalDetails()
              setLoaderVisible(false)
            })
            .catch((error) => {
                notifyError('Something went wrong')
                setLoaderVisible(false)
            });
        }
      });  
}


 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Name" variant="filled" fullWidth  focused onChange={(e)=> setValue('name',e.target.value)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Email" type="email" variant="filled" fullWidth  focused onChange={(e)=>setValue("email",e.target.value)} value={values.email} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Phone" type="phone" variant="filled" fullWidth  focused onChange={(e)=>setValue("phone",e.target.value)} value={values.phone} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Location" type="text" variant="filled" fullWidth  focused onChange={(e)=>setValue("location",e.target.value)} value={values.location} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="DOB" type="date" variant="filled" fullWidth  focused onChange={(e)=>setValue("dob",e.target.value)} value={values.dob} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Validity" type="date" variant="filled" fullWidth  focused onChange={(e)=>setValue("validity",e.target.value)} value={values.validity} /></Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Religion" type="text" variant="filled" fullWidth  focused onChange={(e)=>setValue("religion",e.target.value)} value={values.religion} /></Box>
                    </Grid>
                    
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            defaultValue={values.gender}
                            value={values.gender}
                            onChange={handleGender}
                            >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                           
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                          <InputLabel id="demo-simple-select-label">Marital status</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Marital status"
                            defaultValue={values.marital_status}
                            value={values.marital_status}
                            onChange={handleMaritalStatus}
                            >
                            <MenuItem value={'unmarried'}>Unmarried</MenuItem>
                            <MenuItem value={'married'}>Married</MenuItem>
                            <MenuItem value={'divorced'}>Divorced</MenuItem>
                            <MenuItem value={'widowed'}>Widowed</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <Box ><TextField label="Don't Knock If" type="text" variant="filled" fullWidth  focused onChange={(e)=>setValue("dont_knock_if",e.target.value)} value={values.dont_knock_if} /></Box>
                    </Grid>


                   {/* about me */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">About Me</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.about_me}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'about_me')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* father_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Father Details</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.father_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'father_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* mother_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Mother Details</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.mother_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'mother_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* education_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Education Details</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.education_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'education_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* work_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Work Details</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.work_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'work_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* marital_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Marital Details</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.marital_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'marital_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* paternal_family_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Paternal Family Details</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.paternal_family_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'paternal_family_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* paternal_family_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Maternal Family Details</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.maternal_family_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'maternal_family_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* siblings_details */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Sibling Details</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.siblings_details}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'siblings_details')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* hobbies */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Hobbies</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.hobbies}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'hobbies')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* expectation_from_partner */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Expectation From Partner</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.expectation_from_partner}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'expectation_from_partner')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* dislikes_from_partner */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Dislikes From Partner</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.dislikes_from_partner}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'dislikes_from_partner')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* special_note */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Special Note</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.special_note}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'special_note')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>
                   {/* other_text */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Other Details</label>
                            <SunEditor
                                     name="message"
                                     setContents={values.other_text}
                                     placeholder="Type Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'other_text')}
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
                                          "image",
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>

                      
{/* ***************Image start************* */}
                  {storeImage !==null && <Box className="" sx={{mt:2, ml:2, mb:3}}>
                      <Image src={storeImage} alt="" width='20%'></Image>
                      <Button onClick={()=>setStoreImage(null)}>Update Image</Button>
                    </Box>}

                    {storeImage===null &&  <Box className="clearfix" sx={{mt:2, ml:2, mb:3}}>
                        <Upload
                          action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Box>}
                   
{/* ***************Image end************* */}
                  </Grid>


                <div className="mediaAdd_Body">
                    <div className="mediaAdder">
                      <Dragger
                        action="https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png"
                        name="file" 
                        multiple={true}
                        listType="picture"
                        fileList={mediaList}
                        onChange={handleMediaChange}
                      >
                        {mediaList.length >= 10 ? null : uploadMediaButton}
                      </Dragger>
                    </div>
                    
                  </div>
                  <Box display='flex' justifyContent='center' justifyItems='center' sx={{mt:3, mb:3}}>
                    {storeFiles && storeFiles !==null && storeFiles.length>0 && storeFiles.map((data, i)=>{
                      return (
                          <Box key={data.uuid} className='cursorPointer'>
                            <img src={data?.url} width={'20%'} alt={data?.name}/>
                            <DeleteIcon onClick={(e)=> handleDeleteItem(data.uuid)} />
                          </Box>
                      )
                    })}
                 </Box>
                 

                  <Box sx={{ minWidth: 120 }}>
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Switch
                                    id="myToggleStatus"
                                    label="Publish"
                                    labelPlacement="start"
                                    checked={values.status}
                                    onChange={handleChangeStatus}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                }
                                label="Publish"
                              />
                              </FormGroup>
                          </FormControl>
                      </Box>
                  

                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}>
                          {(values.name !=='' && values.message !=='')
                           ? <Button fullWidth variant="contained" onClick={(e)=>handleMatrimonyAdd()}>{location?.state !==null?'Update':'Create'}</Button>
                           : <Button fullWidth variant="contained" disabled>{location?.state !==null?'Update':'Create'}</Button>
                          }
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

export default MatrimonyProfileCreate

