import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import {  reportUrl } from "../../api/Api";
import { notifyError } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Box, Button, Grid, TextField } from "@mui/material";
import SunEditor from "suneditor-react"; 
import { useForm } from 'react-hook-form';
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import MainLoader from "../PageLoadEffects/MainLoader";
import { Upload, Modal } from 'antd';

const AdminBugSetUp = ()=>{
  const navigate = useNavigate();
  const getUrl = window.location.href;
  const segName = getUrl.split("/").pop();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [userInfo, setUserInfo] = useState(null)

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
        Upload Media
      </div>
    </div>
  );

  const {msDetails,userDetails} = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(null);

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const defaultValues = {
    subject:'',
    message:'',
  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();

  const handleEditorChange = (content,type) => {
    if(type ==='message'){
      setValue('message',content);
    }
  };


//Create new job
 const handleAdminBugReport = ()=>{
      setLoaderVisible(true)
      let data = new FormData();
      data.append('user_id', userInfo?.user?.id);
      data.append('microsite_id', msDetails?.id);
      data.append('name', userInfo?.user?.name );
      data.append('email', userInfo?.user?.email);
      data.append('message', values.message);
      // data.append('phone', );
      data.append('subject', values.subject);
      data.append('status', 0);

      if(segName ==='report-admin'){
        data.append('report_to', 'admin');
      }
      

      if(fileList.length>0){
        fileList.forEach(element => {
          data.append("files[]", element.originFileObj);
        });
      }

       var config = {
          method: 'post',
          url: `${reportUrl}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      axios.request(config)
      .then((response) => {
        setValue('subject','')
        setValue('message','')
        setFileList([])
        setLoaderVisible(false)
        setTimeout(()=>{
          navigate('/report-admin')
        },[])
        // notifySuccess();
      })
      .catch((err)=>{
        setLoaderVisible(false)
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      }
      );
 }



 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Subject" variant="filled" fullWidth  focused onChange={(e)=>setValue("subject",e.target.value)} value={values.subject} /></Box>
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
                                          "table",
                                          "fullScreen",
                                        ],
                                      ],
                                     }}
                                   />
                        </Box>
                    </Grid>

                      
          {/* ***************Logo start************* */}
                    {/* {values.logo === null && companyLogo ===null  && 
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <form className="uploadBox" onChange={(e)=>setValue('logo', e.target.files[0])}>
                              <h1>Upload  Logo</h1>
                              <input type="file" name="avatar" />
                        </form>  
                    </Grid>
                      } */}

                    <Box className="clearfix" sx={{mt:2, ml:2}}>
                        <Upload
                          action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Box>
                    
                   
{/* ***************Logo end************* */}
                  </Grid>

                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}>
                          {(values.subject !=='' && values.message !=='')
                           ?<Button fullWidth variant="contained" onClick={(e)=>handleAdminBugReport()}>Create</Button>
                           : <Button fullWidth variant="contained" disabled>Create</Button>
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

export default AdminBugSetUp

