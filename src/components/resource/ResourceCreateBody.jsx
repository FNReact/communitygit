import { Box, Button, Grid, TextField } from "@mui/material";
import { Upload } from "antd";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { get, set, useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { resourceMediaUrl, resourceUrl } from "../../api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import jobImage from "../../asset/image/jobSideH.png";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import SunEditor from "suneditor-react"; 
import UploadLoader from "../PageLoadEffects/UploadLoader";
const ResourceCreateBody = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const {msDetails,userDetails} = useContext(UserContext)
  const [fileList, setFileList] = useState([]);
  const [getFileList, setGetFileList] = useState(null)
  const [loaderEffectValue, setLoaderEffectValue] = useState(false)
  const token = sessionStorage.getItem('token');
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // input default state value
const defaultValues = {
  title: '',
  subtitle:'',
  details: '',
  websiteUrl:'',
  googleUrl:'',
  facebookUrl:'',
  instagramUrl:'',
  youtubeUrl:'',
  twitterUrl:''
};
const methods = useForm({defaultValues});
const {watch,setValue} = methods;
const values = watch();

const handleEditorChange = (content,type) => {
  setValue('details', content)
};


// get details item
const getSingleResouceDetails = ()=>{
  let config = {
    method: 'get',
    url: `${resourceUrl}/${location.state.uuid}`,
  headers: { 
    'Authorization': `Bearer ${token}`,
  },
  };
  axios.request(config)
  .then((response) => {
    if(response.data){
      setValue('title', response.data.title)
      setValue('subtitle', response.data.subtitle)
      setValue('details', response.data.details)

      setValue('websiteUrl', response?.data?.meta?.website_url)
      setValue('googleUrl', response?.data?.meta?.google_url)
      setValue('facebookUrl', response?.data?.meta?.facebook_url)
      setValue('instagramUrl', response?.data?.meta?.instagram_url)
      setValue('youtubeUrl', response?.data?.meta?.youtube_url)
      setValue('twitterUrl', response?.data?.meta?.twitter_url)

      if(response.data.files.length>0){
        setGetFileList(response.data.files)
      }
    }
  })
}

useEffect(()=>{
  if(location.state !==null){
    getSingleResouceDetails()
  }
},[])


// handle create new resource
const handleResouce = ()=>{
  setLoaderEffectValue(true)
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('user_id', userDetails.id);
    data.append('title', values.title);
    data.append('subtitle', values.subtitle);
    data.append('details', values.details);

    data.append('website_url', values.websiteUrl);
    data.append('google_url', values.googleUrl);
    data.append('facebook_url', values.facebookUrl);
    data.append('instagram_url', values.instagramUrl);
    data.append('youtube_url', values.youtubeUrl);
    data.append('twitter_url', values.twitterUrl);
    data.append('type', 'resource');

    if(fileList.length>0){
      fileList.forEach(file=>{
        data.append("files[]", file.originFileObj);
      });
    }
    var config;
    if(location.state !==null){
      config = {
        method: 'post',
        url: `${resourceUrl}/${location.state.uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
    }else{
      config = {
        method: 'post',
        url: `${resourceUrl}`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };
    }

    axios.request(config)
    .then((response) => {
      setLoaderEffectValue(false)
      notifySuccess();
      // if(location.state !==null){
      //   window.location.reload();
      // }else{
      //   navigate('/myResource');
      // }
      navigate('/resource');
     
    })
    .catch((error) => {
      setLoaderEffectValue(false)
      notifyError('Something went erong')
    });
}


 //handle delete a resouce media
 const handleDeleteResourceMedia=(uuid)=>{
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
        setLoaderEffectValue(true)
        let config = {
          method: "delete",
          url: `${resourceMediaUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios 
          .request(config)
          .then((response) => {
            setLoaderEffectValue(false)
            notifySuccess();
            window.location.reload()
          })
          .catch((error) => {
              setLoaderEffectValue(false)
              notifyError('Something went wrong')
          });
      }
    });  
}



  return (
    <Fragment>
         <div className="resource_create">
             <h4>{location?.state !==null?'Update Resource':'Create Resource'}</h4>
             <div className="resource_form">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box><TextField label="Resource Title"  variant="filled" fullWidth  focused onChange={(e)=>setValue('title', e.target.value)} value={values.title}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Resource Sub-title"  variant="filled" fullWidth  focused onChange={(e)=>setValue('subtitle', e.target.value)} value={values.subtitle}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Website URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('websiteUrl', e.target.value)} value={values.websiteUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Google URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('googleUrl', e.target.value)} value={values.googleUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Facebook URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('facebookUrl', e.target.value)} value={values.facebookUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Instagram URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('instagramUrl', e.target.value)} value={values.instagramUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="YouTube URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('youtubeUrl', e.target.value)} value={values.youtubeUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box><TextField label="Twitter URL"  variant="filled" fullWidth  focused onChange={(e)=>setValue('twitterUrl', e.target.value)} value={values.twitterUrl}/></Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box> 
                      <SunEditor
                                     name="details"
                                     setContents={values.details}
                                     placeholder="Details Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'details')}
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
                  
                    <Grid item xs={12}>
                        <div className="field_heading">
                            Upload Post Images :
                        </div>
                       <div className="resource_files_container">
                       <Upload
                           action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                           listType="picture-card"
                           fileList={fileList}
                           onChange={onChange}
                           onPreview={onPreview}
                         >
                           {fileList.length < 5 && '+ Upload'}
                         </Upload>
                       </div>
                    </Grid>
                    {getFileList !==null && <Grid item xs={12}>
                         <div className="image_list_container">
                          {getFileList.length>0 && getFileList.map((data)=>{
                            return(
                              <div className="image_place">
                                {data.url && <img src={`${data.url}`}/> }
                              <div className="img_place_overly">
                              <div className="img_cross_btn">
                                 <CloseIcon onClick={(e)=>handleDeleteResourceMedia(data.uuid)}/>
                              </div>
                              </div>
                            </div>
                            )
                          })}
                            
                         </div>
                      </Grid> }

                     {loaderEffectValue===true &&<>{<UploadLoader/>}</> }
                     {loaderEffectValue ===false && <Grid item xs={12}>
                      {(values.title && values.details)?<Button onClick={(e)=>handleResouce()} variant="contained" fullWidth> Submit </Button>
                      :
                      <Button variant="contained" fullWidth disabled> Submit </Button>
                      }
                    </Grid>}
                    
                </Grid>
             </div>
         </div>
         <ToastContainer />
    </Fragment>
  );
};

export default ResourceCreateBody;
