import React, { Fragment, useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { baseUrl, hirBusinessUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import notFoundImage from "../../../src/asset/image/404.png";
import user from "../../../src/asset/image/user.png";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "../../utils/Toast";

import parser from 'html-react-parser'

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


//    handle delete recommendation
   const handleDeleteResource = (data) => {
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
          url: `${hirBusinessUrl}/${data.uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .request(config)
          .then((response) => {
            notifySuccess();
            getAllRequests();
          })
          .catch((error) => {
            notifyError('Something went wrong')
          });
      }
    });
  }

//   /service-request-details

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
                                    <a>
                                        <div className="request_item">
                                                    <div className="delet_btn" onClick={(e)=> handleDeleteResource(data)}>
                                                        <DeleteIcon/>
                                                    </div>
                                                <Box className='cursorPointer' onClick={(e)=> navigate('/service-request-details',{state:{data:data}})}>
                                                    {data && data?.media && data?.media.length>0 && 
                                                            <div className="item_img">
                                                                <img src={`${baseUrl}/storage/media/${data?.media[0].id}/${data?.media[0].file_name}`} alt="" />
                                                            </div>
                                                        }
                                                        {data && data?.details &&  <div className="item_details_rev">
                                                            {parser(data?.details)}
                                                        </div> }
                                                    {data && data?.user &&  <div className="user_info">
                                                            <Avatar alt={data?.user?.name} src={data?.user?.avatar?`${baseUrl}/${data?.user?.avatar}`:''} />
                                                            <div className="user_name"> {data?.user?.name}</div>
                                                        </div>}
                                                   
                                                        <div className="item_bottom">
                                                            {data?.budget && <div className="budget">
                                                              {msDetails?.currency}  {data?.budget}
                                                            </div> }
                                                            
                                                            <div className="req_date">
                                                                {new Date(data?.created_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                </Box>
                                                   
                                        </div>
                                    </a>
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
