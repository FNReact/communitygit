import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Fragment } from "react";
import JobItem from "./JobItem";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { allJobCategoryUrl, allJobsUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { JobsLoadEffect } from "../PageLoadEffects";
import { Box, Button, Grid, TextField, Tooltip } from "@mui/material";
import SunEditor from "suneditor-react";
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MyJobListBody = ()=>{
  const [allJobs,setAllJobs] = useState(null);
  const {msDetails,userDetails} = useContext(UserContext);
  const [allCategory,setAllCategory] = useState()

  const [userFind,setUserFind] = useState(false);

  //Get all jobs from api
  const getAllJobs = ()=>{
    let config = {
      method: 'get',
      url: `${allJobsUrl}?microsite_id=${msDetails.id}`,
    };
    axios.request(config)
    .then((res) => {
      setAllJobs(res.data.data);
      res.data.data.forEach(element => {
        if(userDetails.id === element.user.id){
          setUserFind(true)
        }
      });
    })
  } 
  useEffect(()=>{
    getAllJobs();
  },[])
  //Get all jobs category from api
  const getAllJobsCategory = ()=>{
    let config = {
      method: 'get',
      url: allJobCategoryUrl,
    };
    axios.request(config)
    .then((res) => {
      setAllCategory(res.data.data);
    })
  } 
  useEffect(()=>{
    getAllJobsCategory();
  },[])
  const navigate = useNavigate();


    return(
        <Fragment>
             <div className="top_section">
             <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
             </Tooltip>
               <div className="top_section_right">
                   <Box> 
                    <Link to='/my-job'><Button  variant="contained" color="success" >Create new Job</Button></Link> 
                  </Box>
               </div>
             </div>
             <div className="job">
                 <div className="job_item">
                         <Grid container spacing={2}>
                             <Grid item xs={12}>
                                {allJobs === null && <>{JobsLoadEffect()}</>}
                                 {allJobs && allJobs.length>0 && allJobs.map((data,key)=>{
                                   if(data.user.id === userDetails.id){
                                     return(<JobItem job={data} getAllJobs={getAllJobs} key={key}/>)
                                   }
                                 })}
                             </Grid>
                         </Grid>
                         {userFind === false && <div className="placeholder_text">No Jobs Found</div>}
                     </div>  
                  </div>
           <ToastContainer />
          </Fragment>
    )
}

export default MyJobListBody
