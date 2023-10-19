import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import mProfile from "../../asset/image/test4.jpg";
import { baseUrl, matrimonyUrl } from "../../api/Api";
import axios from "axios";

import parser from "html-react-parser";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import { Image } from "antd";
import { UserContext } from "../../utils/UserContext";

const MatrimonyProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {msDetails, userDetails} = useContext(UserContext)
  const [details, setDetails] = useState(null);
  const token = sessionStorage.getItem("token");
  const [loaderVisible, setLoaderVisible] = useState(false);


  const handleStoreUserProfile = ()=>{
    setLoaderVisible(true);
    let config = {
      method: "get",
      url: `${matrimonyUrl}?microsite_id=${msDetails.id}&user_id=${userDetails.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if(response?.data?.data && response?.data?.data.length>0){
          setDetails(response?.data?.data[0])
        }
        setLoaderVisible(false);
      })
      .catch((error) => {
        setLoaderVisible(false);
      });
  }

  useEffect(() => {
    handleStoreUserProfile();
  }, []);
  return (
    <Fragment>
      {loaderVisible === true && <MainLoader />}
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <div className="content_body">
            <Tooltip title="Back">
              <div
                className="backArrow"
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </div>
            </Tooltip>

            {loaderVisible === false && details === null &&<>
               <div className="section_headear">
                     <h4>My Matrimony Profile</h4>
                     <div className="btns_row">
                         <Link to='/my-matrimony-profile-create'>
                            <div className="Btn_one">
                               Create
                            </div>
                         </Link>
                      </div>
               </div>
               <Box display='flex' justifyContent='center' justifyItems='center' sx={{mt:20}}>
                  <Button disabled>You don't have create your profile yet..</Button>
                  <Link to='/my-matrimony-profile-create'>
                            <Box className="Btn_one" sx={{mt:0.7}}>
                               Create now
                            </Box>
                         </Link>
                  </Box>
               </>
            }
            {loaderVisible === false && details !== null &&<>
               <div className="section_headear">
                     <h4>My Matrimony Profile</h4>
                     <div className="btns_row">
                         <a onClick={(e)=> navigate('/my-matrimony-profile-create',{state:{uuid:location?.state?.data.uuid}})}>
                            <div className="Btn_one">
                               Update
                            </div>
                         </a>
                      </div>
               </div>
               </>
            }
            {loaderVisible === false && details !== null && (
              <div className="matrimonial_card_details">
                <h4>{details?.name}'s Details</h4>
                <div className="person_information">
                  <Grid container spacing={2}>
                    <Grid item lg={8}>
                      <div className="information_table">
                        <div className="info_item_list">
                          <div className="info_lebel">Name</div>
                          <div className="info_item">{details?.name}</div>
                        </div>

                        <div className="info_item_list">
                          <div className="info_lebel">Gender</div>
                          <div className="info_item">
                            {details?.meta?.gender}
                          </div>
                        </div>

                        <div className="info_item_list">
                          <div className="info_lebel">Religion</div>
                          <div className="info_item">
                            {" "}
                            {details?.meta?.religion}
                          </div>
                        </div>

                        <div className="info_item_list">
                          <div className="info_lebel">Marital Status</div>
                          <div className="info_item">
                            {" "}
                            {details?.meta?.marital_status}
                          </div>
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
                          {details?.meta?.about_me && (
                            <div className="info_item">
                              <p>{parser(details?.meta?.about_me)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={4}>
                      <div className="person_image">
                        {details !== null &&
                          details?.featured_image !== null && (
                            <img
                              src={`${baseUrl}/${details?.featured_image}`}
                              alt={details?.name}
                            />
                          )}
                      </div>
                    </Grid>
                  </Grid>
                </div>

                {details !== null &&
                  details?.files &&
                  details?.files.length > 0 && (
                    <div className="person_information">
                      <div className="information_table">
                        <div className="section_title">Gallery</div>
                        <div className="image_lists">
                        <Image.PreviewGroup>
                          {details?.files.map((data, key) => {
                            return (
                              <Image
                                key={data.uuid}
                                width={250}
                                src={`${data.url}`}
                              />
                            );
                          })}
                        </Image.PreviewGroup>
                        </div>
                      </div>
                    </div>
                  )}

                <div className="person_information">
                  <div className="information_table">
                    <div className="section_title">Family Information</div>
                    {details?.meta?.father_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Father's Details</div>
                        {details?.meta?.father_details && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.father_details)}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {details?.meta?.mother_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Mother's Details</div>
                        {details?.meta?.mother_details && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.mother_details)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.siblings_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Siblings's Details</div>
                        {details?.meta?.siblings_details && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.siblings_details)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.paternal_family_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">
                          Paternal Family Details
                        </div>
                        {details?.meta?.paternal_family_details && (
                          <div className="info_item">
                            <p>
                              {parser(details?.meta?.paternal_family_details)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.maternal_family_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">
                          Maternal Family Details
                        </div>
                        {details?.meta?.maternal_family_details && (
                          <div className="info_item">
                            <p>
                              {parser(details?.meta?.maternal_family_details)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {details !== null &&
                  details?.meta?.marital_status === "married" && (
                    <div className="person_information">
                      <div className="information_table">
                        <div className="section_title">Marital Details</div>
                        <div className="info_item_list">
                          {details?.meta?.marital_details && (
                            <p>{parser(details?.meta?.marital_details)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                <div className="person_information">
                  <div className="information_table">
                    <div className="section_title">Career Information</div>
                    {details?.meta?.education_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Education Details</div>
                        {details?.meta?.education_details && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.education_details)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.work_details !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Work Details</div>
                        {details?.meta?.work_details && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.work_details)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {details !== null && details?.meta?.hobbies === "married" && (
                  <div className="person_information">
                    <div className="information_table">
                      <div className="section_title">Hobbies</div>
                      <div className="info_item_list">
                        {details?.meta?.hobbies && (
                          <p>{parser(details?.meta?.hobbies)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="person_information">
                  <div className="information_table">
                    <div className="section_title">Note</div>
                    {details?.meta?.dislikes_from_partner !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Dislikes From Partner</div>
                        {details?.meta?.dislikes_from_partner && (
                          <div className="info_item">
                            <p>
                              {parser(details?.meta?.dislikes_from_partner)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.dont_knock_if !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Dont Knock If</div>
                        {details?.meta?.dont_knock_if && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.dont_knock_if)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {details?.meta?.special_note !== "" && (
                      <div className="info_item_list">
                        <div className="info_lebel">Special Note</div>
                        {details?.meta?.special_note && (
                          <div className="info_item">
                            <p>{parser(details?.meta?.special_note)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {details !== null && details?.meta?.other_text !== "" && (
                  <div className="person_information">
                    <div className="information_table">
                      <div className="section_title">Others</div>
                      <div className="info_item_list">
                        {details?.meta?.other_text && (
                          <p>{parser(details?.meta?.other_text)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MatrimonyProfilePage;
