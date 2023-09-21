import React, { Fragment } from "react";
import { Button, Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EventItem from "../../components/event/EventItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventItem2 from "../../components/event/EventItem2";
import { useState } from "react";
import axios from "axios";
import { eventsUrl } from "../../api/Api";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { useEffect } from "react";
import { JobsLoadEffect } from "../../components/PageLoadEffects";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import {notifySuccess,notifyError } from '../../utils/Toast';


const EventPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [allEvents, setAllEvents] = useState(null);
  const {msDetails,userDetails} = useContext(UserContext);
  const getAllEvents = ()=>{
   let config = {
      method: 'get',
      url: `${eventsUrl}?microsite_id=${msDetails.id}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      }
    };
    
    axios.request(config)
    .then((response) => {
      setAllEvents(response.data.data)
    })
    .catch((error) => {
      // console.log(error);
    });
  }

  useEffect(()=>{
   getAllEvents();
  },[])


  // Delete job by user
   const handleDeleteEvent = (uuid)=>{
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
            url: `${eventsUrl}/${uuid}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios 
            .request(config)
            .then((response) => {
              notifySuccess();
              getAllEvents();
            })
            .catch((error) => {
                notifyError('Something went wrong')
            });
        }
      });  
}

var toDayEventCount = 0;


  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
         <Grid item lg={9} md={8} sm={12} xs={12}>
            <div className="content_body">
                 <div className="section_headear">
                  <Tooltip title="Back">
                       <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                          <ArrowBackIcon/>
                       </div> 
                   </Tooltip>
                    <div className="btns_row">
                      <Link to='/event-create'>
                        <div className="Btn_one">
                           Create Event
                        </div>
                      </Link>
                    </div>
                 </div> 

                 <div className="even_wrapper">
                    <Grid container spacing={2}>
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                           <h4>All Events</h4>
                            {allEvents !==null && allEvents.map((event,key)=>{
                              return(
                                <EventItem key={event.uuid} event={event} getAllEvents={getAllEvents} handleDeleteEvent={handleDeleteEvent}/>
                              )
                            })}
                           {(allEvents ===null) && <>{JobsLoadEffect()}</>}
                           {(allEvents !==null && allEvents.length ===0) && <><Button disabled>No Events Created Yet...</Button></>}
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                           <h4>Today's Events</h4>
                           { allEvents !==null && allEvents.map((event,key)=>{
                            const today = new Date().toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
                            const createdDate = event.date.split(' ')
                            if(today===createdDate[0]){
                              toDayEventCount = 1;
                              return(
                                <EventItem2 key={event.uuid} event={event} getAllEvents={getAllEvents} handleDeleteEvent={handleDeleteEvent} />
                                )
                              }
                            })}
                            {toDayEventCount ===0 && <><Button disabled>No Events Found For Today.</Button></>}
                            {(allEvents ===null) && <>{JobsLoadEffect()}</>}
                        </Grid>
                    </Grid>
                 </div>
            </div>
         </Grid>
      </Grid>
      <ToastContainer />
    </Fragment>
  );
};

export default EventPage;
