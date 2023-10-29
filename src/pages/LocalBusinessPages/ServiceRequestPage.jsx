import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { hirBusinessUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import MainLoader from "../../components/PageLoadEffects/MainLoader";


const ServiceRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token')
  const {msDetails,userDetails} = useContext(UserContext)
  const [loaderVisible, setLoaderVisible] = useState(false)

  const [requests, setRequests] = useState([])

 // get all requests
 const getAllRequests = ()=>{
    setLoaderVisible(true)
    let config = {
        method: 'get',
        url: `${hirBusinessUrl}?microsite_id=${msDetails.id}&entity_id=${location?.state?.details.id}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        }
      };
      
      axios.request(config)
      .then((response) => {
        setRequests(response.data.data)
        setLoaderVisible(false)
      })
      .catch((error) => {
        console.log(error);
        setLoaderVisible(false)
      });
 }

 useEffect(()=>{
    if(location?.state !==null){
        getAllRequests()
    }
 },[])


 console.log('requests', requests)


  return (
    <Fragment>
        {loaderVisible === true && <MainLoader />}
       <Grid container spacing={2}>
           <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
           <Grid item lg={9} md={8} sm={12} xs={12}>
              <div className="content_body">
                    <Tooltip title="Back">
                       <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                          <ArrowBackIcon/>
                       </div> 
                   </Tooltip>
                  
                  <div className="service_requestBody">
                      <Grid container spacing={2}>
                        {requests && requests !=='undefined' && requests.length>0 && requests.map((data,i)=>{
                            return(
                                <Grid item xs={4} key={data.uuid}>
                                        <Link to='/service-request-details'>
                                            <div className="request_item">
                                                <div className="item_details_rev">
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus esse iusto dicta accusantium rem. Esse ipsa expedita tempore quod libero.
                                                </div>
                                                <div className="item_bottom">
                                                    <div className="budget">
                                                        1200.00
                                                    </div>
                                                    <div className="req_date">
                                                        12 October 2023
                                                    </div>
                                                </div>
                                            </div>
                                    </Link>
                                </Grid>
                            )
                        })}
                      </Grid>

                      {requests !=='undefined' &&requests && requests.length ===0 &&
                      <Box sx={{mt:5}} display='flex' justifyContent='center' justifyItems='center'>
                            <Button disabled>No Request found</Button>
                     </Box>}
                  </div>
               </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default ServiceRequestPage;
