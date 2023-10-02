import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import {  baseUrl, categoryUrl, magazineMainUrl, mediaUploadUrl, postDetailsUrl, postUrl, reportUrl } from "../../api/Api";
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

const MagazineContentCreate = ()=>{
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
        Upload Media (Photo,Video,Files)
      </div>
    </div>
  );

  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const defaultValues = {
    name:'',
    slug:'',
    position:'',
    status:true,
    message:'',
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
  const  handleChangePosition = (e)=>{
    setValue('position',e.target.value)
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
const handleContentAdd = async () => {
  setLoaderVisible(true);
  let formData = new FormData(); //formdata object
  formData.append("uuid", msDetails.uuid); //append the values with key, value pair
  formData.append("microsite_id", msDetails.id);
  formData.append("title", values.name);
  formData.append("slug", values.slug);
  formData.append("position", values.position);
  formData.append("body", values.message);

  if(fileList && fileList.length>0){
    formData.append("featured_image", fileList[0].originFileObj);
  }
  if (categoryId) {
    formData.append("category_id", categoryId);
  }
  if(values.status ===true){
    formData.append("status", 1);
  }else{
    formData.append("status", 0);
  }

  if(mediaList && mediaList.length>0){
    mediaList.forEach(element => {
      var type= element?.type;
      var sliceType = type?.split('/')
      // formData.append("files[]", element.originFileObj);
      if(sliceType[0]==='video'){
        formData.append("file_for", "video");
        formData.append("file", element?.originFileObj);
      }
      if(sliceType[0]==='application'){
        formData.append("file_for", "attachments");
        formData.append("file", element?.originFileObj);
      }
      if(sliceType[0]==='gallery'){
        formData.append("file_for", "gallery");
        formData.append("file", element?.originFileObj);
      }
    });
  }
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  var url;
  if(location?.state !==null){
    url = `${postUrl}/${location?.state?.row?.uuid}`
  }else{
    url = `${postUrl}`
  }

  axios
    .post(url, formData, config)
    .then((response) => {
      handleGetMainMagazine();
      setLoaderVisible(false);
      notifySuccess();
    })
    .catch((err) => {
      notifyError();
    });
};


// get single category details
const getSingleContentDetails = (row)=>{
  // setLoaderVisible(true)
  let config = {
    method: 'get',
    url: `${postDetailsUrl}/${row.uuid}`,
  };
  
  axios.request(config)
  .then((response) => {
    if(response?.data){
      setValue('name', response?.data?.posts?.title)
      setValue('slug', response?.data?.posts?.slug)
      setValue('position', response?.data?.posts?.position)
      setValue('status', response?.data?.posts?.status)
      setValue('message', response?.data?.posts?.body)

      if(response?.data?.featured_image !==null){
        setStoreImage(`${baseUrl}/${response?.data?.posts?.featured_image}`)
      }
      if(response?.data?.posts?.category?.id){
          categories.forEach(element => {
            if(element.id ===response?.data?.posts?.category?.id){
              setCategoryValue(element)
            }
          });
      }

    }
    
    setLoaderVisible(false)
  })
  .catch((error) => {
    setLoaderVisible(false)
  });
}

useEffect(()=>{
  if(location?.state !==null){
    getSingleContentDetails(location?.state?.row)
  }
},[categoryValue, categories])



// handle slug 
    const handleSlug = (e)=>{
      const inputValue = e.target.value;
      setValue('name',inputValue)
      const slug = inputValue.toLowerCase().replace(/[^\w-]+/g, '-');
      setValue('slug',slug)
    }

 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Content Title" variant="filled" fullWidth  focused onChange={(e)=> handleSlug(e)} value={values.name} /></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Content Slug" variant="filled" fullWidth  focused onChange={(e)=>setValue("slug",e.target.value)} value={values.slug} /></Box>
                    </Grid>
                    
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                          <InputLabel id="demo-simple-select-label">Content Position</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category Position"
                            defaultValue={values.position}
                            value={values.position}
                            onChange={handleChangePosition}
                            >
                            {/* <MenuItem value={'no_position'}>No Position</MenuItem> */}
                            <MenuItem value={'main'}>Main Section</MenuItem>
                            <MenuItem value={'stiky'}>Sticky</MenuItem>
                            <MenuItem value={'exclusive'}>Exclusive</MenuItem>
                            <MenuItem value={'slider'}>Slider</MenuItem>
                            {/* <MenuItem value={'footer_nav'}>Footer Navigation</MenuItem> */}
                            {/* <MenuItem value={'important1'}>Important 1</MenuItem> */}
                            {/* <MenuItem value={'important2'}>Important 2</MenuItem> */}
                            <MenuItem value={'front_page'}>Bottom Section</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                        <Autocomplete
                            sx={{ mt: -2 }}
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            id="categoryCategory"
                            defaultValue={categoryValue}
                            value={categoryValue}
                            focused
                            onChange={(event, newValue) => {
                              if (newValue) {
                                setCategoryValue(newValue);
                                setCategoryId(newValue.id);
                                setCategoryTitle(newValue.name);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                focused
                                label="Content Category"
                                margin="normal"
                              />
                            )}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box>
                          <label htmlFor="message">Content</label>
                          <SunEditor
                                     name="message"
                                     setContents={values.message}
                                     placeholder="Type message Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'message')}
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


                {location?.state !==null &&  <div className="mediaAdd_Body">
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
                    
                  </div>}
                 

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
                           ? <Button fullWidth variant="contained" onClick={(e)=>handleContentAdd()}>{location?.state !==null?'Update':'Create'}</Button>
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

export default MagazineContentCreate

