import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import mProfile from "../../asset/image/test4.jpg";
import { baseUrl, matrimonyUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MatrimonialPage = () => {
  const navigate = useNavigate();
  const { msDetails, userDetails } = useContext(UserContext);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const token = sessionStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [storeProfile, setStoreProfile] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false)


  // handle store current user profile
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
        setStoreProfile(response?.data?.data[0])
        setLoaderVisible(false);
      })
      .catch((error) => {
        setLoaderVisible(false);
      });
  }

  const getAllUsers = () => {
    setLoaderVisible(true);
    let config = {
      method: "get",
      url: `${matrimonyUrl}?microsite_id=${msDetails.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setUsers(response.data.data);
        handleStoreUserProfile()
        setLoaderVisible(false);
      })
      .catch((error) => {
        setLoaderVisible(false);
      });
  };


// handle search set
const handleSearchSet =(e)=>{
  if(e.target.value.length===0){
    handleSearch()
    setSearchQuery('')
  }else{
    setSearchQuery(e.target.value)
  }
}



// Function to handle the search
const handleSearch = () => {
  setLoaderVisible(true);
  let config = {
    method: "get",
    url: `${matrimonyUrl}?microsite_id=${msDetails.id}&keyword=${searchQuery}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      var storeUsers=[];
      if(response?.data?.data.length>0){
          response?.data?.data.forEach(element => {
             if(element?.microsite_id ===msDetails.id){
              storeUsers.push(element)
             }
          });
      }
      setUsers(storeUsers);
      setLoaderVisible(false);
    })
    .catch((error) => {
      setLoaderVisible(false);
    });
};

// Function to handle the Enter key press in the search input
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
  

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleMyProfile = ()=>{
      navigate('/my-matrimony-profile',{state:{data:storeProfile}})
  }
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

            <div className="section_headear section_header_2">
              <h4>Matrimonial Center</h4>
              <div className="btns_row">
                <a >
                  <div className="Btn_one" onClick={(e)=> handleMyProfile()}>My Matrimonial Profile</div>
                </a>
              </div>
            </div>

          
          <div className="matromonial_search_form">  
            <div className="searchBar">
              <input type="text" placeholder="Search Here"
                className="form_control"
                value={searchQuery}
                onChange={(e) =>handleSearchSet(e)}
                onKeyPress={handleKeyPress}
                />
              <i onClick={handleSearch}><Button type="submit">
                <FontAwesomeIcon icon={faSearch}/></Button>
              </i>
            </div>
          </div>

          {loaderVisible === false && users && users.length === 0 && (
              <Box display="flex" justifyContent="center" justifyItems="center">
                <Button disabled>No post found...</Button>
              </Box>
            )}

            <div className="matrimonial_wrapper">
              <Grid container spacing={2}>
                {loaderVisible === false &&
                  users &&
                  users.length > 0 &&
                  users.map((data, key) => {
                    return (
                      <Grid item lg={4} md={6} sm={12} xs={12} key={data.uuid}>
                        <div className="matrimonial_card">
                          <div className="card_top">
                            <div className="card_profil">
                              {data?.featured_image !==null && <img src={`${baseUrl}/${data.featured_image}`} alt={data?.name} />}
                            </div>
                            <div className="person_name">{data?.name}</div>
                            <div className="DOB">DOB : {data?.meta?.dob}</div>
                          </div>
                          <div className="card_content">
                            <div className="content_box">
                              <div className="box_content_item">
                                <div className="box_item">Marital Status</div>
                                <div className="box_item bold_text">
                                  {data?.meta?.marital_status}
                                </div>
                              </div>

                              <div className="box_content_item">
                                <div className="box_item">Location</div>
                                <div className="box_item bold_text">{data?.location}</div>
                              </div>

                              <div className="box_content_item">
                                <div className="box_item">Religion</div>
                                <div className="box_item bold_text">{data?.meta?.religion}</div>
                              </div>
                              <div className="box_content_item">
                                <div className="box_item">Gender</div>
                                <div className="box_item bold_text">{data?.meta?.gender}</div>
                              </div>
                              <div className="box_content_item">
                                <div className="box_item">Height</div>
                                <div className="box_item bold_text">{data?.meta?.height}</div>
                              </div>
                              <div className="box_content_item">
                                <div className="box_item">Weight</div>
                                <div className="box_item bold_text">{data?.meta?.weight}</div>
                              </div>
                              <div className="box_content_item">
                                <div className="box_item">Blood Group</div>
                                <div className="box_item bold_text">{data?.meta?.blood_group}</div>
                              </div>
                              {data?.meta?.complexion !=='undefined' && 
                                <div className="box_content_item">
                                  <div className="box_item">Complexion</div>
                                  <div className="box_item bold_text">{data?.meta?.complexion}</div>
                                </div>}
                              
                            </div>

                            <div className="view_details" onClick={(e)=> navigate('/matrimonial-details',{state:{data}})}>View Details</div>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MatrimonialPage;
