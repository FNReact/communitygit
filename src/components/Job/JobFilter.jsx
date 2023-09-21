import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";

import Slider from '@mui/material/Slider';
import { allJobCategoryUrl, allJobsUrl } from "../../api/Api";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";



function valuetext(salaryRangeValue) {
  return `${salaryRangeValue}°C`;
}

  

const JobFilter = ({getAllJobs,setAllJobs})=>{
    const [allCategory,setAllCategory] = useState(null)
    const [jobCategoryValue, setJobCategoryValue] = useState('');
    const [salaryValue, setSalaryValue] = useState('salaryOne');
    const [salaryRangeValue, setSalaryRangeValue] = useState([10000, 50000]);
    const [jobTypeValue, setJobTypeValue] = useState(null)
    const {msDetails,userDetails} = useContext(UserContext);
    const [jobType, setJobType] = useState('Not Selected');

  // set state  values
    const jobCategoryValueHandle = (event) => {
      setJobCategoryValue(event.target.value);
      handleFilter('',event.target.value)
    };
    const salaryHandleChange = (event) => {
        setSalaryValue(event.target.value);
      };
    const handleChange3 = (event, newValue) => {
        setSalaryRangeValue(newValue);
    };
    const handleJobType =(type) =>{
      setJobType(type)
      handleFilter(type,'')
    }


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


  // handle all filter method
  const handleFilter = (inputValue,selectCatId) =>{
    let config = {
        method: 'get',
        url: `${allJobsUrl}?microsite_id=${msDetails.id}&keyword=${inputValue}&job_category=${selectCatId}`,
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
    })
   
}

// handle clear
  const handleClear = ()=>{
    setJobCategoryValue('')
    setJobType("Not Selected")
    getAllJobs()
  }

 

    return(
        <Fragment>
            <div className="job_filter">
                <div className="job_filter_top">
                    <div className="job_filter_top_left">
                        Filter
                    </div> 
                    <div className="job_filter_top_right">
                      <Button variant="outlined" onClick={(e)=>handleClear()} >Clear All </Button>
                    </div> 
                </div>
                <div className="job_filter_Content">
                  <div className="job_filter_item">
                  <FormControl fullWidth>
                   <h4>Select Category</h4>
                    <Select
                      value={jobCategoryValue}
                      onChange={jobCategoryValueHandle}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">Select </MenuItem>
                      {allCategory !==null && allCategory.length>0 && allCategory.map((data,key)=>{
                          return(
                            <MenuItem value={data.id}>{data.category_name}</MenuItem>
                          )
                      })}
                    </Select>
                  </FormControl>
                  </div>
                
                  <div className="job_filter_item item_border">
                      <h4>Job Type</h4>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={jobType}
                          name="radio-buttons-group"
                        >
                          <FormControlLabel disabled value='Not Selected' control={<Radio checked={jobType === 'Not Selected'} />} label="Not Selected" onClick={(e)=>{handleJobType('Not Selected');setJobType("Not Selected")}} />
                          <FormControlLabel value="Full-time"     control={<Radio checked={jobType === 'Full-time'} />} label="Full-time" onClick={(e)=>{handleJobType('Full-time');setJobType("Full-time")}} />
                          <FormControlLabel value="Internship"    control={<Radio checked={jobType === 'Internship'} />} label="Internship" onClick={(e)=>{handleJobType('Internship');setJobType("Internship")}} />
                          <FormControlLabel value="Remote"        control={<Radio checked={jobType === 'Remote'} />} label="Remote" onClick={(e)=>{handleJobType('Remote');setJobType("Remote")}} />
                          <FormControlLabel value="Hybrid"        control={<Radio checked={jobType === 'Hybrid'} />} label="Hybrid" onClick={(e)=>{handleJobType('Hybrid');setJobType("Hybrid")}} />
                          <FormControlLabel  value="other"        control={<Radio checked={jobType === 'Other'} />} label="Other" onClick={(e)=>{handleJobType('Other');setJobType("Other")}} />
                        </RadioGroup>
                      </FormControl>
                  </div>
                  
                  {/* <div className="job_filter_item item_border">
                   <h4>Salary Range</h4>
                     <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={salaryValue}
                        onChange={salaryHandleChange}
                        defaultValue="salaryOne"
                        >
                        <FormControlLabel value="salaryOne" control={<Radio />} label="Under 10,000 Tk" />
                        <FormControlLabel value="salaryTwo" control={<Radio />} label="10,100 Tk to 20,000 Tk" />
                        <FormControlLabel value="salaryThree" control={<Radio />} label="20,100 Tk to 1,00,000 Tk" />
                        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                      </RadioGroup>
                      <div className="salaryRange_slider">
                         <Box fullWidth>
                          <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={salaryRangeValue}
                            onChange={handleChange3}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="on"
                            min={0}
                            max={100000}
                            step={1000}
                          />
                        </Box>
                      </div>
                      
                  </div>

                  <div className="job_filter_item">
                   <h4>Job Type</h4>
                  </div> */}
                </div>
            </div>
        </Fragment>
    )
}

export default JobFilter