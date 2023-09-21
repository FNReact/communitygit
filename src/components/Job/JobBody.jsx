import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import JobSearch from "./JobSearch";
import JobFilter from "./JobFilter";
import JobItem from "./JobItem";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { allJobsUrl } from "../../api/Api";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { JobsLoadEffect } from "../PageLoadEffects";

const JobBody = () => {
  const [allJobs,setAllJobs] = useState(null);
  const {msDetails} = useContext(UserContext) 
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

  return (
    <Fragment>
        <Grid container spacing={2}>
           <Grid item xs={12} sm={12} md={12} lg={8}>
             <JobSearch getAllJobs={getAllJobs} setAllJobs={setAllJobs} />
                <div className="job_item">
                   {allJobs === null && <>{JobsLoadEffect()}</>}
                    {allJobs && allJobs.length>0 && allJobs.map((data,key)=>{
                      return(<JobItem job={data} key={key}/>)
                    })}
                    
                    {allJobs &&  allJobs.length ===0 && 
                    <div className="placeholder_text">No Jobs Found</div>
                    }   
                </div> 
            </Grid>
           <Grid item xs={12} sm={12} md={12} lg={4}>
             <JobFilter getAllJobs={getAllJobs} setAllJobs={setAllJobs} />
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default JobBody;