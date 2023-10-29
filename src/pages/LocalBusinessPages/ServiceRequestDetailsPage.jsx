import React, { Fragment, useEffect } from "react";
import { Avatar, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notFoundImage from "../../../src/asset/image/404.png";
import user from "../../../src/asset/image/user.png";
import { Image } from "antd";

const ServiceRequestDetailsPage = () => {
   const navigate = useNavigate();

   return (
      <Fragment>
         <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
            <Grid item lg={9} md={8} sm={12} xs={12}>
               <div className="content_body">
                  <Tooltip title="Back">
                     <div className="backArrow" onClick={(e) => { navigate(-1) }}>
                        <ArrowBackIcon />
                     </div>
                  </Tooltip>
                  <div className="service_request_details">
                     <div className="details_top_info">
                        <div className="user_info">
                           <Avatar alt="Travis Howard" src={user} />
                           <div className="user_name">
                              User Name
                           </div>
                        </div>
                        <div className="info_date">
                           12 October 2023
                        </div>
                     </div>
                     <div className="details_text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime fugit id, nulla iusto earum soluta. Sunt impedit, natus in ullam a maiores quibusdam laboriosam similique ipsa architecto quisquam expedita mollitia, quod nobis sint sit veritatis? Quibusdam, deleniti porro? Perspiciatis temporibus veniam exercitationem reiciendis doloribus laborum maiores quisquam laboriosam odio nam sed numquam quo quaerat libero asperiores nihil possimus corrupti quia, perferendis dolore corporis praesentium vel molestias saepe. Impedit necessitatibus nemo excepturi quia ullam. Inventore veniam officiis nisi molestias deserunt sunt vel dolores non, nobis consequatur tenetur aliquam dolorum magni illo, commodi laboriosam fuga veritatis sapiente ad ipsa necessitatibus. Rerum, dolores?
                     </div>
                     <div className="details_file_container">
                        <div className="file_tab" sx={{ ml: 2 }}>
                           <Image
                              src={user}
                           />
                        </div>

                     </div>
                  </div>
               </div>
            </Grid>
         </Grid>
      </Fragment>
   );
};

export default ServiceRequestDetailsPage;
