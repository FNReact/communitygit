import React, { Fragment } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mProfile from "../../asset/image/test4.jpg";


const MatrimonialPage = () => {
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

                  <div className="section_headear">
                     <h4>Matrimonial Center</h4>
                     <div className="btns_row">
                        <Link to='/my-matrimony-profile'>
                           <div className="Btn_one">
                              My Matrimonial Profile
                           </div>
                        </Link>
                     </div>
                  </div>

                  <div className="matrimonial_wrapper">
                     <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className="matrimonial_card">
                                <div className="card_top">
                                 <div className="card_profil">
                                    <img src={mProfile} alt="" />
                                 </div>
                                 <div className="person_name">
                                    Tania Islam  
                                 </div>
                                 <div className="DOB">
                                    DOB : 12 October 1999
                                 </div>
                                </div>
                                 <div className="card_content">
                                    <div className="content_box">
                                       <div className="box_content_item">
                                            <div className="box_item">
                                             Marital Status 
                                            </div>
                                            <div className="box_item bold_text">
                                               Unmarried
                                            </div>
                                       </div>
                                       
                                       <div className="box_content_item">
                                            <div className="box_item">
                                               Location 
                                            </div>
                                            <div className="box_item bold_text">
                                               Dhaka
                                            </div>
                                       </div>


                                       <div className="box_content_item">
                                            <div className="box_item">
                                               Religion 
                                            </div>
                                            <div className="box_item bold_text">
                                               Islam
                                            </div>
                                       </div>
                                    </div>

                                    <div className="view_details">
                                        View Details
                                    </div>
                                 </div>
                            </div>
                        </Grid>
                     </Grid>
                  </div>
               </div>
            </Grid>
         </Grid>
      </Fragment>
   );
};

export default MatrimonialPage;
