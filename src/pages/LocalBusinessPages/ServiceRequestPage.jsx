import React, { Fragment, useEffect } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ServiceRequestPage = () => {
  const navigate = useNavigate();

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
                  <div className="service_requestBody">
                      <Grid container spacing={2}>
                          <Grid item xs={4}>
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
                      </Grid>
                  </div>
               </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default ServiceRequestPage;
