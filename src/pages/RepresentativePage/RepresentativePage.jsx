import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ResourceItem from "../../components/resource/ResourceItem";
import axios from "axios";
import { resourceUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { BoxLoadEffect} from "../../components/PageLoadEffects";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import RepresentativeItem from "../../components/representative/RepresentativeItem";
const RepresentativePage = () => {
   const navigate = useNavigate();
  const [resource, setResouce] = useState(null)
  const {msDetails,userDetails, loggedInUser} = useContext(UserContext)
  const token = sessionStorage.getItem('token');
  const getAllResouces = () =>{
    let config = {
      method: 'get',
      url: `${resourceUrl}?microsite_id=${msDetails.id}&type=representative`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    };
    
    axios.request(config)
    .then((response) => {
      setResouce(response.data.data);
    })
  }

  useEffect(()=>{
    getAllResouces();
  },[])

  console.log('loggedInUserInfo', loggedInUser)
  return (
    <Fragment>
       <Grid container spacing={2}>
           <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
           <Grid item lg={9} md={8} sm={12} xs={12}>
              <div className="content_body">
              <Tooltip title="Back">
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
               </Tooltip>
                 <div className="section_headear">
                    <Tooltip title="Representative" arrow>
                      <h4>Representative <span><InfoIcon /></span> </h4>
                    </Tooltip>
                    
                    <div className="btns_row">
                      {/* <Link to='/my-representative'>
                        <div className="Btn_one">
                           My Representative
                        </div>
                      </Link> */}
                      {(loggedInUser?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && 
                       <Link to='/representative-create'>
                        <div className="Btn_two">
                           Add Representative
                        </div>
                      </Link>}
                     
                    </div>
                 </div> 
                 
                 <div className="resource_wrapper">
                        {(resource !==null && resource.length ===0) &&
                         <div  className="placeholder_text">
                             No Representative Found    
                        </div>}
                    <Grid container spacing={2}>
                      {(resource !==null && resource.length>0 )&& resource.map((data,key)=>{
                        return(
                           <Grid item lg={4} md={6} sm={12} xs={12}>
                             <RepresentativeItem data={data} key={key} getAllResouces={getAllResouces} admin={(loggedInUser?.user_type ==='admin' || userDetails?.id===msDetails.user_id)?true:false}/>
                           </Grid>
                        )
                      })}  
                       
                    </Grid>
                    {resource ===null && <>
                      <Grid container spacing={2}>
                         <Grid item lg={4} md={6} sm={12} xs={12}>{BoxLoadEffect()}</Grid>
                         <Grid item lg={4} md={6} sm={12} xs={12}>{BoxLoadEffect()}</Grid>
                         <Grid item lg={4} md={6} sm={12} xs={12}>{BoxLoadEffect()}</Grid>
                      </Grid>
                    </>}
                 </div>
              </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default RepresentativePage;
