import React, { Fragment, useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mProfile from "../../asset/image/test4.jpg";
import { baseUrl, matrimonyUrl } from "../../api/Api";
import axios from "axios";

import parser from 'html-react-parser'
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import { Image } from "antd";

const MatrimonialCardDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [details, setDetails] = useState(null)
    const token = sessionStorage.getItem("token");
    const [loaderVisible, setLoaderVisible] = useState(false)



    const getSingleDetils = (uuid)=>{
        setLoaderVisible(true)
        let config = {
            method: 'get',
            url: `${matrimonyUrl}/${uuid}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
          };
          axios.request(config)
          .then((response) => {
            setDetails(response.data)
            setLoaderVisible(false)
          })
          .catch((error) => {
            setLoaderVisible(false)

          });
          
    }

    useEffect(()=>{
        if(location.state !==null){
            getSingleDetils(location?.state?.data.uuid)
        }
    },[])

    return (
        <Fragment>
            {loaderVisible === true  && <MainLoader />}
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
                            <h4>{details?.name}'s Details</h4>
                            <div className="person_information">
                                <Grid container spacing={2}>
                                    <Grid item lg={8} md={12} sm={12} xs={12}>
                                        <div className="information_table">
                                            <div className="info_item_list">
                                                <div className="info_lebel">Name</div>
                                                <div className="info_item">{details?.name}</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Gender</div>
                                                <div className="info_item">{details?.meta?.gender}</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Religion</div>
                                                <div className="info_item"> {details?.meta?.religion}</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Marital Status</div>
                                                <div className="info_item"> {details?.meta?.marital_status}</div>
                                            </div>

                                            <div className="info_item_list">
                                                <div className="info_lebel">Date Of Birth</div>
                                                <div className="info_item"> {details?.meta?.dob}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Height</div>
                                                <div className="info_item"> {details?.meta?.height}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Weight</div>
                                                <div className="info_item"> {details?.meta?.weight}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Complexion</div>
                                                <div className="info_item"> {details?.meta?.complexion}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Blood Group</div>
                                                <div className="info_item"> {details?.meta?.blood_group}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Location</div>
                                                <div className="info_item"> {details?.location}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">Address</div>
                                                <div className="info_item"> {details?.meta?.address}</div>
                                            </div>
                                            <div className="info_item_list">
                                                <div className="info_lebel">About Me</div>
                                                {details?.meta?.about_me &&  <div className="info_item"><p>{parser(details?.meta?.about_me)}</p></div>}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12} xs={12}> 
                                        <div className="person_image">
                                            {details !==null && details?.featured_image !==null &&  <img src={`${baseUrl}/${details?.featured_image}`} alt={details?.name}/> }
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            {details !==null && details?.files && details?.files.length>0 && 
                                <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Gallery
                                    </div>
                                    <Image.PreviewGroup>
                                        <div className="gallery_wrap">
                                            <Grid container spacing={2}>
                                            {details?.files.map((data, key)=>{
                                                return(
                                                    <Grid item lg={3} md={3} sm={4} xs={4}>
                                                       <Image key={data.uuid} src={`${data.url}`}/>
                                                    </Grid>
                                                )
                                            })}
                                            </Grid> 
                                        </div>
                                    </Image.PreviewGroup>
                                
                                </div>
                             </div>
                            }
                            
                            <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Family Information
                                    </div>
                                    {details?.meta?.father_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Father's Details</div>
                                         {details?.meta?.father_details && <div className="info_item"><p>{parser(details?.meta?.father_details)}</p></div>}
                                    </div>}

                                    {details?.meta?.mother_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Mother's Details</div>
                                         {details?.meta?.mother_details && <div className="info_item"><p>{parser(details?.meta?.mother_details)}</p></div>}
                                    </div>}
                                    {details?.meta?.siblings_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Siblings's Details</div>
                                         {details?.meta?.siblings_details && <div className="info_item"><p>{parser(details?.meta?.siblings_details)}</p></div>}
                                    </div>}
                                    {details?.meta?.paternal_family_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Paternal Family Details</div>
                                         {details?.meta?.paternal_family_details && <div className="info_item"><p>{parser(details?.meta?.paternal_family_details)}</p></div>}
                                    </div>}
                                    {details?.meta?.maternal_family_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Maternal Family Details</div>
                                         {details?.meta?.maternal_family_details && <div className="info_item"><p>{parser(details?.meta?.maternal_family_details)}</p></div>}
                                    </div>}
                                </div>
                            </div>

                            {details !==null &&  details?.meta?.marital_status ==='married' && <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Marital Details
                                    </div>
                                    <div className="info_item_list">
                                    {details?.meta?.marital_details && <p>{parser(details?.meta?.marital_details)}</p>}
                                    </div>
                                </div>
                            </div>}
                           

                            <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Career Information
                                    </div>
                                    {details?.meta?.education_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Education Details</div>
                                         {details?.meta?.education_details && <div className="info_item"><p>{parser(details?.meta?.education_details)}</p></div>}
                                    </div>}
                                    {details?.meta?.work_details !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Work Details</div>
                                         {details?.meta?.work_details && <div className="info_item"><p>{parser(details?.meta?.work_details)}</p></div>}
                                    </div>}
                                  
                                </div>
                            </div>
                            {details !==null &&  details?.meta?.hobbies ==='married' && <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Hobbies
                                    </div>
                                    <div className="info_item_list">
                                    {details?.meta?.hobbies && <p>{parser(details?.meta?.hobbies)}</p>}
                                    </div>
                                </div>
                            </div>}
                            
                            <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Note
                                    </div>
                                    {details?.meta?.dislikes_from_partner !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Dislikes From Partner</div>
                                         {details?.meta?.dislikes_from_partner && <div className="info_item"><p>{parser(details?.meta?.dislikes_from_partner)}</p></div>}
                                    </div>}
                                    {details?.meta?.dont_knock_if !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Dont Knock If</div>
                                         {details?.meta?.dont_knock_if && <div className="info_item"><p>{parser(details?.meta?.dont_knock_if)}</p></div>}
                                    </div>}
                                    {details?.meta?.special_note !=='' && <div className="info_item_list">
                                        <div className="info_lebel">Special Note</div>
                                         {details?.meta?.special_note && <div className="info_item"><p>{parser(details?.meta?.special_note)}</p></div>}
                                    </div>}
                                </div>
                            </div>

                            {details !==null &&  details?.meta?.other_text !=='' && <div className="person_information">
                                <div className="information_table">
                                    <div className="section_title">
                                        Others
                                    </div>
                                    <div className="info_item_list">
                                    {details?.meta?.other_text && <p>{parser(details?.meta?.other_text)}</p>}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default MatrimonialCardDetails;
