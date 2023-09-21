import React, { Fragment, useEffect } from "react";
import L3  from '../../asset/image/test3.webp'
import L1  from '../../asset/image/test1.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { useState } from "react";
import axios from "axios";
import { allJobsUrl, baseUrl } from "../../api/Api";
import { Button } from "@mui/material";

const LoungeLatestJob = () => {
    const navigate = useNavigate();
    const {msDetails} = useContext(UserContext)
    const [latestJob, setLatestJob] = useState(null)

    const getAllLatestJobs = ()=>{
        let config = {
            method: 'get',
            url: `${allJobsUrl}?microsite_id=${msDetails.id}`,
          };
          axios.request(config)
          .then((response) => {
            setLatestJob(response.data.data)
          })
    }

    useEffect(()=>{
        getAllLatestJobs();
    },[])



  return (
    <Fragment>
           <div className="MoreComuinity_list">
               <div className="list_heading">
                  Latest Jobs
               </div>

                {(latestJob !==null && latestJob.length ===0) &&  <div className="commuinity_list">
                   <h5>No Jobs Found</h5>
                   <Link to='/my-job'>
                    <div className="job_createBtn">
                         Create New Job
                    </div>
                    </Link>
               </div>}
               
                {(latestJob !==null && latestJob.length>0) && latestJob.slice(0,2).map((job)=>{
                    return(
                        <div className="commuinity_list" key={job.uuid}>
                            <div className="commuinity_list_top">
                                    {job && job.company_logo !==null && <div className="comuinity_img"><img src={`${baseUrl}/${job.company_logo}`} alt={job.job_title} /></div> }
                                    <div className="community_text">
                                        {job && job.job_title && <div className="community_name">{job.job_title}</div>}
                                        {job && job.job_designation && <div className="commuinity_hint">{job.job_designation}</div>}
                                        
                                    </div>
                            </div>
                            <div className="commuinity_list_bottom"  onClick={(e)=>{navigate('/job-details',{state:{uuid:job.uuid}})}}>See Details</div>
                        </div>
                    )
                }) }
                
                {(latestJob !==null && latestJob.length>2) &&
                 <Link to="/job"><div className="seeMore_btn">Show More</div></Link>}
           </div>
    </Fragment>
  );
};

export default LoungeLatestJob;
