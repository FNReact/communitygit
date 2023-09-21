import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { UserContext } from "../../utils/UserContext";
import { allJobsUrl } from "../../api/Api";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const JobSearch = ({getAllJobs,setAllJobs})=>{
    const [inputValue, setInputValue] = useState(null);
    const {msDetails,userDetails} = useContext(UserContext);
    const token = sessionStorage.getItem('token');


    //handle input
    const handleInput = (e) =>{
        setInputValue(e.target.value);
        if(inputValue ===null){
            getAllJobs();
        }
    }

    // handle search method
    const handleSearch = () =>{
        let config = {
            method: 'get',
            url: `${allJobsUrl}?microsite_id=${msDetails.id}&keyword=${inputValue}`,
        };
        axios.request(config)
        .then((response) => {
            var storeJobs= [];
            if(response?.data?.data && response?.data?.data.length>0){
              response?.data?.data.forEach(element => {
                if(element?.microsite_id !==null && element?.microsite_id ===msDetails.id){
                  storeJobs.push(element)
                }
              });
            }
            setAllJobs(storeJobs);
            setInputValue(null);
        })
       
    }

    return(
        <Fragment>
            <div className="job_searchBar">
                <div className="jobsearchButtonAndText">
                    <h4>Are you looking for new Job?</h4> 
                    <span className="jobsearchButton" ></span>
                </div>  
                <p className="mt-3">Here you can find your dream job in various skills from this community.</p>
                
               <ul className="job_plate">
                   <li  className="job_srach_item-1">
                       <input type="text" className="form_control" placeholder="Search your dream job here" name="" onChange={(e)=>handleInput(e)} />
                   </li>
                   <li className="job_btn">
                       <span onClick={(e)=>handleSearch(e)}>Search</span>
                   </li>
                 </ul>
            </div>
            <div className="jobHome_heading">
                <div className="heading_left">
                   Job list
                </div>
                <div className="heading_right">
                   <Link to='/my-job'><Button variant="contained" color="success" >Post new Job</Button></Link>
                </div>
            </div>
        </Fragment>
    )
}

export default JobSearch