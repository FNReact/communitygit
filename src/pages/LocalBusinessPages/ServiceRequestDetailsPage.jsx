import React, { Fragment, useEffect } from "react";
import { Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ServiceRequestDetailsPage = () => {
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
                  <div className="service_request_details">
                     <div className="details_text">
                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime fugit id, nulla iusto earum soluta. Sunt impedit, natus in ullam a maiores quibusdam laboriosam similique ipsa architecto quisquam expedita mollitia, quod nobis sint sit veritatis? Quibusdam, deleniti porro? Perspiciatis temporibus veniam exercitationem reiciendis doloribus laborum maiores quisquam laboriosam odio nam sed numquam quo quaerat libero asperiores nihil possimus corrupti quia, perferendis dolore corporis praesentium vel molestias saepe. Impedit necessitatibus nemo excepturi quia ullam. Inventore veniam officiis nisi molestias deserunt sunt vel dolores non, nobis consequatur tenetur aliquam dolorum magni illo, commodi laboriosam fuga veritatis sapiente ad ipsa necessitatibus. Rerum, dolores?
                     </div>
                  </div>
               </div>
           </Grid>
        </Grid>
    </Fragment>
  );
};

export default ServiceRequestDetailsPage;
