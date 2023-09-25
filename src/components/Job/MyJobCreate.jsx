import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";  
import { allJobCategoryUrl, allJobsUrl, baseUrl } from "../../api/Api";
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



const MyJobCreate = ()=>{
  const navigate = useNavigate();
  const location = useLocation();

  const [allJobs,setAllJobs] = useState(null);
  const [allCategory,setAllCategory] = useState([])
  const [categoryTitle,setCategoryTitle] = useState('')
  const [categoryValue,setCategoryValue] = useState('')
  const [categoryId,setCategoryId] = useState('')
  const [companyLogo,setCompanyLogo] = useState(null)
  const {msDetails,userDetails} = useContext(UserContext);

  const [loaderEffect, setLoaderEffect] = useState(false)
  const token = sessionStorage.getItem('token');
  const defaultValues = {
    title: '',
    designation: '',
    companyName:'',
    email: '',
    location:'',
    address:'',
    workType:'',
    skills:'',
    experienceLavel:'',
    salaryRange:'',
    vacancies:'',
    jobCategory: allCategory.length>0?allCategory[0].category_name:'' ,
    publishedDate:'',
    deadLine:'',
    educationsDetails:'',
    jobDetails:'',
    officeDetails:'',
    otherDetails:'',
    note:'', 
    logo:null

  };
  const methods = useForm({defaultValues});
  const {watch,setValue} = methods;
  const values = watch();


  //get single job details
   const getJobDetails = ()=>{
    let config = {
        method: 'get',
        url: `${allJobsUrl}/${location.state.uuid}`,
      };
      axios.request(config)
      .then((res) => {
       setValue('title',res.data.job_title);
       setValue('designation',res.data.job_designation);
       setValue('companyName',res.data.company_name);
       setValue('email',res.data.meta.email);
       setValue('location',res.data.location);
       setValue('address',res.data.meta.address);
       setValue('workType',res.data.work_type);
       setValue('skills',res.data.required_skills);
       setValue('experienceLavel',res.data.experience_level);
       setValue('salaryRange',res.data.salary_range);
       setValue('vacancies',res.data.vacancies);
       setValue('jobCategory',res.data.job_category);
       setValue('publishedDate',res.data.publish_date);
       setValue('deadLine',res.data.application_deadline);
       setValue('educationsDetails',res.data.educational_qualification);
       setValue('jobDetails',res.data.job_description);
       setValue('officeDetails',res.data.office_details);
       setValue('otherDetails',res.data.other_facilities);
       setValue('note',res.data.special_note);

       setCompanyLogo(res.data.company_logo);
       setCategoryTitle(res?.data?.category?.category_name);
       setCategoryId(res?.data?.category?.id)
      })
}
useEffect(()=>{
  if(location.state !==null){
    getJobDetails()
  }
},[location])

  const handleEditorChange = (content,type) => {
    if(type ==='educationsDetails'){
      setValue('educationsDetails',content);
    }
    if(type ==='jobDetails'){
      setValue('jobDetails',content);
    }
    if(type ==='officeDetails'){
      setValue('officeDetails',content);
    }
    if(type ==='otherDetails'){
      setValue('otherDetails',content);
    }
  };

  //Get all jobs from api
  const getAllJobs = ()=>{
    let config = {
      method: 'get',
      url: `${allJobsUrl}?microsite_id=${msDetails.id}`,
    };
    axios.request(config)
    .then((res) => {
      setAllJobs(res.data.data);
    })
  } 
  useEffect(()=>{
    getAllJobs();
  },[])
  //Get all jobs category from api
  const getAllJobsCategory = ()=>{
    let config = {
      method: 'get',
      url: `${allJobCategoryUrl}?microsite_id=${msDetails.id}`,
    };
    axios.request(config)
    .then((res) => {
      setAllCategory(res.data.data);
    })
  } 
  useEffect(()=>{
    getAllJobsCategory();
  },[])


  // Create new Category
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
          data.append('category_name', value);
          data.append('status', '1');

          let config = {
            method: 'post',
            url: allJobCategoryUrl,
            headers: { 
              'Authorization': `Bearer ${token}`,
            },
            data : data
          };

          axios.request(config)
          .then((response) => {
            notifySuccess();
            getAllJobsCategory();
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
  
//Create new job
 const handleCreateNewJob = (uuid)=>{
      setLoaderEffect(true)
      let data = new FormData();
      data.append('job_title', values. title);
      data.append('microsite_id', msDetails.id);
      data.append('job_designation', values.designation);
      data.append('job_category', categoryId);
      data.append('publish_date', values.publishedDate);
      data.append('status', '1');
      data.append('application_deadline', values.deadLine);
      data.append('company_name', values.companyName);
      data.append('location', values.location);
      data.append('address', values.address);
      data.append('email', values.email);
      data.append('work_type', values.workType);
      data.append('required_skills', values.skills);
      data.append('educational_qualification', values.educationsDetails);
      data.append('experience_level', values.experienceLavel);
      data.append('job_description', values.jobDetails);
      data.append('salary_range', values.salaryRange);
      data.append('other_facilities', values.otherDetails);
      data.append('office_details', values.officeDetails);
      data.append('special_note', values.note);
      data.append('featured_image', '');
      data.append('company_logo', values.logo);
      data.append('vacancies', values.vacancies);


      var config;
      if(uuid !==null){
        config = {
          method: 'post',
          url: `${allJobsUrl}/${uuid}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }else{
        config = {
          method: 'post',
          url: allJobsUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
      }

      axios.request(config)
      .then((response) => {
        setLoaderEffect(false)
        notifySuccess();
        getAllJobs();
        navigate('/my-job-list')
      })
      .catch((err)=>{
        setLoaderEffect(false)
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })
 }

 // handle worktype change
 const handleWorkType = (event) => {
  setValue('workType',event.target.value);
};

 return(
    <Fragment>
         <div className="jobHome">
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box ><TextField label="Job Title"  variant="filled" fullWidth  focused onChange={(e)=>setValue ("title",e.target.value)} value={values.title} /></Box>
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Job Designation" variant="filled" fullWidth  focused onChange={(e) =>setValue("designation",e.target.value)} value={values.designation} /></Box>  
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Company Name" variant="filled" fullWidth  focused onChange={(e)=>setValue("companyName",e.target.value)} value={values.companyName} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Email" variant="filled" fullWidth  focused onChange={(e)=>setValue("email",e.target.value)} value={values.email} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Location" variant="filled" fullWidth  focused onChange={(e)=>setValue("location",e.target.value)} value={values.location} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Address" variant="filled" fullWidth  focused onChange={(e)=>setValue("address",e.target.value)} value={values.address} /></Box>
                    </Grid>
                    {/* <Grid item xs={6}>
                    <Box  ><TextField label="Work Type" variant="filled" fullWidth  focused onChange={(e)=>setValue("workType",e.target.value)} value={values.workType} /></Box>
                    </Grid> */}
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box  >
                      <FormControl fullWidth focused variant="filled">
                        <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.workType}
                          label="Work Type"
                          onChange={handleWorkType}
                        >
                          <MenuItem value='Full-time'>Full-time</MenuItem>
                          <MenuItem value='Internship'>Internship</MenuItem>
                          <MenuItem value='Remote'>Remote</MenuItem>
                          <MenuItem value='Hybrid'>Hybrid</MenuItem>
                          <MenuItem value='Other'>Other</MenuItem>
                        </Select>
                      </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={5} md={10} sm={8} xs={8}>
                         <Box>
                               <Autocomplete
                                   options={allCategory}
                                   getOptionLabel={(option) => option.category_name}
                                   onChange={(event, newValue) => {
                                     if (newValue) {
                                       setCategoryValue(newValue);
                                       setCategoryId(newValue.id);
                                       setCategoryTitle(newValue.category_name);
                                     }
                                   }}
                                   renderInput={(params) => (
                                       <TextField
                                       variant="filled"
                                       focused
                                         {...params}
                                         label={categoryTitle}
                                         placeholder="Jobs Category"
                                       />
                                   )}
                                 />
                        </Box>
                    </Grid>
                    <Grid item lg={1} md={2} sm={4} xs={4}>
                        <Box sx={{ mt:1}}>
                          <Button variant="contained" onClick={(e)=>handleCreateCategory()}>  +</Button>
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Required Skills" variant="filled" fullWidth  focused onChange={(e)=>setValue("skills",e.target.value)} value={values.skills} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Experience Level" variant="filled" fullWidth  focused onChange={(e)=>setValue("experienceLavel",e.target.value)} value={values.experienceLavel} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField type="number" label="Salary" InputProps={{ inputProps: { min: 0  } }} variant="filled" fullWidth  focused onChange={(e)=>setValue("salaryRange",e.target.value)}  value={values.salaryRange}/></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField type="number" InputProps={{ inputProps: {  min: 0  } }} label="Vacancies" variant="filled" fullWidth  focused onChange={(e)=>setValue("vacancies",e.target.value)} value={values.vacancies}  /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Box  ><TextField type="date" label="Published Date" variant="filled" fullWidth  focused  onChange={(e)=>setValue("publishedDate",e.target.value)} value={values.publishedDate} /></Box>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box  ><TextField type="date" label="Application Deadline" variant="filled" fullWidth  focused onChange={(e)=>setValue("deadLine",e.target.value)}  value={values.deadLine}/></Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box  >
                      <label>Education Qualification</label>
                          <SunEditor
                                     name="educationsDetails"
                                     setContents={values.educationsDetails}
                                     placeholder="Type Education Qualification Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'educationsDetails')}
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
                         <label> Job Details</label>
                          <SunEditor
                                     name="jobDetails"
                                     setContents={values.jobDetails}
                                     placeholder="Type Job Details Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'jobDetails')}
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                         <Box  >
                         <label> Office Details</label>
                          <SunEditor
                                     name="officeDetails"
                                     setContents={values.officeDetails}
                                     placeholder="Type Office Details Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'officeDetails')}
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box  >
                        <label> Other Details</label>
                          <SunEditor
                                     name="otherDetails"
                                     setContents={values.otherDetails}
                                     placeholder="Type Other Details Here..."
                                     showToolbar={true}
                                     setDefaultStyle="height: 200px"
                                     onChange={(e)=>handleEditorChange(e,'otherDetails')}
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box  ><TextField label="Special  Note" variant="filled" fullWidth  focused onChange={(e)=>setValue("note",e.target.value)} value={values.note} /></Box>
                    </Grid>

                    {values.logo === null && companyLogo ===null  && 
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
                      }
                   </Grid>
                      <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column',    mt:5 }}> 
                      {(values.title && values.deadLine && values.email )?(location.state !==null)?<Button fullWidth variant="contained" onClick={(e)=>handleCreateNewJob(location.state.uuid)}>Update</Button>:<Button
                      fullWidth 
                      variant="contained" onClick={(e)=>handleCreateNewJob(null)}>Create</Button>:<Button 
                      fullWidth
                      variant="contained" disabled>Create</Button>}
                    </Box>
                    <div className="btn_loader">
                       {ThreeDotLoaderEffect(loaderEffect)}
                    </div>
               </div>
       <ToastContainer />
</Fragment>
)
}

export default MyJobCreate

