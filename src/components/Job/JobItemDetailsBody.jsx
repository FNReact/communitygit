import React, { useEffect } from "react";
import { Fragment } from "react";
import  Logo  from '../../asset/image/0000111.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { JobDetailsLoadEffect } from "../PageLoadEffects";
import axios from "axios";
import { allJobsUrl, baseUrl } from "../../api/Api";
import { Button } from "@mui/material";
import parser  from 'html-react-parser';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JobItemDetailsBody = ()=>{
    const location = useLocation();
    const [jobDetails, setJobDetails] = useState(null);
    
    //get single job details
    const getJobDetails = ()=>{
        let config = {
            method: 'get',
            url: `${allJobsUrl}/${location.state.uuid}`,
          };
          
          axios.request(config)
          .then((res) => {
            setJobDetails(res.data);
          })
    }

    useEffect(()=>{
        getJobDetails()
    },[])
    const navigate = useNavigate();

    return(
        <Fragment>
            {jobDetails === null && <>{JobDetailsLoadEffect()}</>}
            <div className="JobItemDetails">  
            {/* <Button sx={{mb:3}} variant="contained" startIcon={<ArrowBackIcon />} onClick={(e)=>navigate(-1)}>Go Back</Button> */}
            {jobDetails && jobDetails !==null && 
                       <div className="history_item">
                       <div className="job_info">
                              <div className="info_1">
                               {jobDetails && <h4>{jobDetails.job_title}</h4>}
                               {jobDetails && <p>({jobDetails.job_designation})</p>}
                               {/* job description */}
                               {jobDetails && jobDetails.job_description &&
                                <div className="job_text">
                                   <h6>Job Description </h6>
                                   <p>{parser(jobDetails.job_description)}</p>
                               </div> }
                               
                              </div>

                            {/* right job summary */}
                           <div className="info_2">
                                <div className="job_summary">
                                     <div className="summary_title">  Job Summary</div>
                                     <div className="job_logo">
                                       {jobDetails && jobDetails.company_logo && <img src={`${baseUrl}/${jobDetails.company_logo}`} alt={jobDetails.company_name} />}
                                     </div> 
                                   <div className="summary_info">
                                       <ul>
                                           <li> Company Name :   {jobDetails &&  <span>{jobDetails.company_name}</span> }</li>
                                           <li> Published on :  {jobDetails && jobDetails.publish_date && <span> {jobDetails.publish_date}</span>}</li>
                                           <li> Vacancy : {jobDetails && jobDetails.vacancies && <span> {jobDetails.vacancies}</span>}</li>
                                           <li> Emp. Status : {jobDetails && jobDetails.work_type && <span> {jobDetails.work_type}</span>}</li>
                                           <li> Experience : {jobDetails && jobDetails.experience_level && <span> {jobDetails.experience_level}</span>}</li>
                                           <li> Job Location : {jobDetails && jobDetails.location && <span> {jobDetails.location}</span>}</li>
                                           <li> Salary : {jobDetails && jobDetails.salary_range && <span> {jobDetails.salary_range}</span>}</li>
                                           <li> Application Deadline : {jobDetails && jobDetails.application_deadline && <span> {jobDetails.application_deadline}</span>}</li>
                                       </ul>
                                   </div>
                                </div>
                           </div>
                       </div>

                       {/* required skills */}
                       {jobDetails && jobDetails.required_skills &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/> Required Skills </h6>
                           <p>{jobDetails.required_skills}</p>
                           </div>
                        }
                       {/* educational qualification */}
                       {jobDetails && jobDetails.educational_qualification &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/> Educational Qualification </h6>
                           <p>{parser(jobDetails.educational_qualification)}</p>
                           </div>
                        }

                       {/* office details */}
                       {jobDetails && jobDetails.office_details &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/>  Office Details </h6>
                           <p>{parser(jobDetails.office_details)}</p>
                           </div>
                        }

                       {/* other facilities */}
                       {jobDetails && jobDetails.other_facilities &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/> Other Facilities </h6>
                           <p>{parser(jobDetails.other_facilities)}</p>
                           </div>
                        }
                       {/* specials note */}
                       {jobDetails && jobDetails.special_note &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/> Note </h6>
                           <p>{parser(jobDetails.special_note) }</p>
                           </div>
                        }
                     
                       {/* specials note */}
                        {jobDetails && jobDetails.work_type &&
                           <div className="job_text">
                           <h6> <FiberManualRecordIcon/> Workplace </h6>
                           <p>{parser(jobDetails.work_type) }</p>
                           </div>
                        }
                     
                      {/* <div className="apply_btn">
                            <Button variant="outlined">Apply</Button>
                      </div> */}
                      <div className="other_option">
                           <h5>E-mail</h5>
                           {jobDetails && jobDetails.meta.email && <h6>Send your CV to <a href={`mailto:${jobDetails.meta.email}`}><span>{jobDetails.meta.email}</span></a></h6>}
                             
                      </div>
                       </div>
                 } 
            </div>
        </Fragment>
    )
}

export default JobItemDetailsBody