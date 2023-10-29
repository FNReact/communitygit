import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ResourceItem from "../../components/resource/ResourceItem";
import axios from "axios";
import { resourceUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { BoxLoadEffect } from "../../components/PageLoadEffects";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import ResourceItem2 from "../../components/resource/ResourceItem2";
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
const ResourcePage = () => {
  const navigate = useNavigate();
  const [resource, setResouce] = useState(null)
  const { msDetails, userDetails } = useContext(UserContext)
  const token = sessionStorage.getItem('token');
  const getAllResouces = () => {
    let config = {
      method: 'get',
      url: `${resourceUrl}?microsite_id=${msDetails.id}&type=resource`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    axios.request(config)
      .then((response) => {
        setResouce(response.data.data);
      })
  }
  useEffect(() => {
    getAllResouces();
  }, [])



  //handle delete a resouce
  const handleDeleteResource=(uuid)=>{
    Swal.fire({
        heightAuto: false,
        backdrop: false,
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          let config = {
            method: "delete",
            url: `${resourceUrl}/${uuid}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios 
            .request(config)
            .then((response) => {
              notifySuccess();
              getAllResouces();
            })
            .catch((error) => {
                notifyError('Something went wrong')
            });
        }
      });  
}




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
              <Tooltip title="Doctor's office, Law chambers, Post office...." arrow>
                <h4>Resources <span><InfoIcon /></span> </h4>
              </Tooltip>

              <div className="btns_row">
                {/* <Link to='/myResource'>
                  <div className="Btn_one">
                    My Resource
                  </div>
                </Link> */}
                <Link to='/resource-create'>
                  <div className="Btn_two">
                    Add Resource
                  </div>
                </Link>
              </div>
            </div>

            <div className="resource_wrapper">
              {(resource !== null && resource.length === 0) &&
                <div className="placeholder_text">
                  No Resource Found
                </div>}
              {/* <Grid container spacing={2}>
                {(resource !== null && resource.length > 0) && resource.map((data, key) => {
                  return (
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                      <ResourceItem data={data} key={key} getAllResouces={getAllResouces} admin={false} />
                    </Grid>
                  )
                })}
              </Grid> */}
              <Grid container spacing={2}>
                {(resource !== null && resource.length > 0) && resource.map((data, key) => {
                  return(
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                      <ResourceItem2 resource={data} handleDeleteResource={handleDeleteResource} />
                    </Grid>
                  )
                })}
              </Grid>
              {resource === null && <>
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
      <ToastContainer />
    </Fragment>
  );
};

export default ResourcePage;
