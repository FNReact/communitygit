import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import {  baseUrl, categoryUrl, magazineMainUrl, reportUrl } from "../../api/Api";
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

const MagazineMenuCreate = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const getUrl = window.location.href;
  const segName = getUrl.split("/").pop();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
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

  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const defaultValues = {
    name:'',
    type:'',
    position:'',
    status:true,
    message:'',
  };

  const [parentValue, setParentValue] = useState(null);
  const [parentId, setParentId] = useState();
  const [parentTitle, setParentTitle] = useState(null);

  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  const handleEditorChange = (content,type) => {
    if(type ==='message'){
      setValue('message',content);
    }
  };

  const  handleChangeType = (e)=>{
    setValue('type',e.target.value)
  }
  const  handleChangePosition = (e)=>{
    setValue('position',e.target.value)
  }
  const handleChangeStatus = (event) => {
    setValue('status', event.target.checked);
  };

  // get all parent categories
  const [allParentCategories, setAllParentCategories] = useState([]);
  const getAllCategories = () => {
    let config = {
      method: 'get',
      url: `${categoryUrl}/${msDetails.id}/all`,
    };

    const storeCat =[];
    axios.request(config)
    .then((response) => {
      if(response?.data?.data && response?.data?.data.length>0){
        response?.data?.data.forEach(element => {
          if(element?.parent_id ===null){
            storeCat.push(element)
          }
        });
      }
     setAllParentCategories(storeCat)
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
        window.location.href='/magazine-menu'
      },1000)
      setLoaderVisible(false);
    })
    .catch((error) => {
      setLoaderVisible(false);
      // console.log(error);
    });

  }


//Create new job
const handleMenuAdd = async () => {
  setLoaderVisible(true);
  let formData = new FormData(); //formdata object
  formData.append("uuid", msDetails.uuid); //append the values with key, value pair
  formData.append("microsite_id", msDetails.id);
  formData.append("name", values.name);
  // formData.append("type", values.type);
  formData.append("type", 'menu');
  formData.append("position", values.position);
  formData.append("details", values.message);

  if(fileList && fileList.length>0){
    formData.append("featured_image", fileList[0].originFileObj);
  }
  if (parentId) {
    formData.append("parent", parentId);
  }
  if(values.status ===true){
    formData.append("status", 1);
  }else{
    formData.append("status", 0);
  }
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  var url;
  if(location?.state !==null){
    url = `${categoryUrl}/${location?.state?.row?.uuid}`
  }else{
    url = `${categoryUrl}`
  }

  axios
    .post(url, formData, config)
    .then((response) => {
      setLoaderVisible(false);
      notifySuccess();
      handleGetMainMagazine();
    })
    .catch((err) => {
      notifyError();
    });
};


// get single category details
const getSingleCategoryDetails = (row)=>{
  // setLoaderVisible(true)
  let config = {
    method: 'get',
    url: `${categoryUrl}/${row.uuid}`,
  };
  
  axios.request(config)
  .then((response) => {
    if(response?.data){
      setValue('name', response?.data?.name)
      setValue('type', response?.data?.type)
      setValue('position', response?.data?.position)
      if(response?.data?.status ==='0'){
        setValue('status', false)
      }else{
        setValue('status', true)
      }
      setValue('message', response?.data?.details)

      if(response?.data?.featured_image !==null){
        setStoreImage(`${baseUrl}/${response?.data?.featured_image}`)
      }
      

      if(response?.data?.parent_id){
          allParentCategories.forEach(element => {
            if(element.id ===response?.data?.parent_id){
              setParentValue(element)
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
    getSingleCategoryDetails(location?.state?.row)
  }
},[parentValue, allParentCategories])



 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Category Name" variant="filled" fullWidth  focused onChange={(e)=>setValue("name",e.target.value)} value={values.name} /></Box>
                    </Grid>
                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                          <InputLabel id="demo-simple-select-label">Category Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category Type"
                            defaultValue={values.type}
                            value={values.type}
                            onChange={handleChangeType}
                            >
                            <MenuItem value={'menu'}>Menu</MenuItem>
                            <MenuItem value={'post'}>Post</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid> */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                          <InputLabel id="demo-simple-select-label">Category Position</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category Position"
                            defaultValue={values.position}
                            value={values.position}
                            onChange={handleChangePosition}
                            >
                            {/* <MenuItem value={'no_position'}>No Position</MenuItem> */}
                            <MenuItem value={'main_nav'}>Main Menu</MenuItem>
                            <MenuItem value={'sub_nav1'}>Sub Menu</MenuItem>
                            {/* <MenuItem value={'sub_nav2'}>Sub Nav 2</MenuItem> */}
                            {/* <MenuItem value={'front_page_sections'}>Front Section</MenuItem> */}
                            {/* <MenuItem value={'stiky_sections'}>Sticky Section</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth focused>
                        <Autocomplete
                            sx={{ mt: -2 }}
                            options={allParentCategories}
                            getOptionLabel={(option) => option.name}
                            id="parentCategory"
                            defaultValue={parentValue}
                            value={parentValue}
                            focused
                            disabled={values.position ==='sub_nav1'?false:true}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                setParentValue(newValue);
                                setParentId(newValue.id);
                                setParentTitle(newValue.name);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                focused
                                label="Parent Category"
                                margin="normal"
                              />
                            )}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box  >
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
                           ? <Button fullWidth variant="contained" onClick={(e)=>handleMenuAdd()}>{location?.state !==null?'Update':'Create'}</Button>
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

export default MagazineMenuCreate

