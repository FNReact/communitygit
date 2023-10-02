import React, { Fragment } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mProfile from "../../asset/image/test4.jpg";

const MatrimonialCardDetails = () => {
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

                        <div className="matrimonial_card_details">
                            <h4>Metromonial Details</h4>
                            <div className="person_information">
                                <Grid container spacing={2}>
                                    <Grid item lg={8}>
                                        <div className="information_table">
                                            <div className="info_item_list">
                                                <div className="info_lebel">Name</div>
                                                <div className="info_item">Tania Islam</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Gender</div>
                                                <div className="info_item">Male</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Religion</div>
                                                <div className="info_item"> Islam</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Marital Status</div>
                                                <div className="info_item"> Unmarried</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Date Of Birth</div>
                                                <div className="info_item"> 12 October 1995</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">About Me</div>
                                                <div className="info_item"><p>A handsome and smart guy always goes with the best Instagram bio for boys and boyish photo captions as well. However, it can be quite tough to find the perfect Instagram bio to showcase your boyish attitude consistently. Don’t worry, just chill. Here, we have some cool and creative bio ideas for guys that will help you choose the best bio for your profile.</p></div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <div className="person_image">
                                            <img src={mProfile} alt="" />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Family Information
                                    </div>
                                    <div className="info_item_list">
                                        <div className="info_lebel">Father's Details</div>
                                        <div className="info_item"><p>A handsome and smart guy always goes with the best Instagram bio for boys and boyish photo captions as well. However, it can be quite tough to find the perfect Instagram bio to showcase your boyish attitude consistently. Don’t worry, just chill. Here, we have some cool and creative bio ideas for guys that will help you choose the best bio for your profile.</p></div>
                                    </div>

                                    <div className="info_item_list">
                                        <div className="info_lebel">Mother's Details</div>
                                        <div className="info_item"><p>A handsome and smart guy always goes with the best Instagram bio for boys and boyish photo captions as well. However, it can be quite tough to find the perfect Instagram bio to showcase your boyish attitude consistently. Don’t worry.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default MatrimonialCardDetails;
