import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import EnvitedPeopleTableBody from './EnvitedPeopleTableBody';
import { UserContext } from '../../utils/UserContext';
import { allMembersUrl, eventParticipantUrl } from '../../api/Api';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Backdrop, Box } from '@material-ui/core';
import MainLoader from '../PageLoadEffects/MainLoader';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const EventInvitedPeoples = () => {
  const location  = useLocation();
  const [adminId, setAdminId] =useState('')
  const {msDetails, userDetails} = useContext(UserContext); 
  const [participents, setParticipents] = useState(null)


// handle get all participents of a event
const handleGetParticipant = (eventId) =>{
  let config = {
     method: 'get',
     url: `${eventParticipantUrl}/${eventId}`,
   };
   
   axios.request(config)
   .then((response) => {
     setParticipents(response.data.data)
   })
   .catch((error) => {
   });
}

  useEffect(()=>{
    if(location.state.eventDetail){
      handleGetParticipant(location.state.eventDetail.id)
    }
  },[])

  

  //get all members
  const membersUrl = `${allMembersUrl}/${msDetails.id}`;
  const getAllMembers = ()=>{
    let config = {
      method: "get",
      url: membersUrl,
    };

    axios
      .request(config)
      .then((response) => {
        if(response.data.data.length>0){
          response.data.data.forEach(data => {
            var objLength = Object.keys(data.user_details).length;
                  if(objLength>2){
                    var userOwnerDetails =  JSON.parse(data.user_details)
                    if(userOwnerDetails.owner==='yes'){
                      setAdminId(data.user_id)
                    }
                  }
          });
        }

      })
      .catch((error) => {});
  }
  useEffect(() => {
    getAllMembers()
  }, []);



  return (
    <>
  
      <div className="invited_list_container">
          <div className="invited_list_header">
               <Grid container spacing={2} >
                   <Grid item xs={4} md={4}> 
                       <div className="table_heading">
                          Name
                       </div> 
                    </Grid>
                   <Grid item xs={4} md={4}>
                      <div className="table_heading">
                          Email
                      </div> 
                   </Grid>
                   <Grid item xs={2} md={2}>
                      <div className="table_heading text_center">
                         Status
                      </div> 
                   </Grid>
                   <Grid item xs={2} md={2}>
                        {location.state !==null && userDetails.id === location.state?.eventDetail?.meta?.create_by && <div className="table_heading text_end"> Actions </div> } 
                   </Grid>
              </Grid>
          </div>
              <div className="table_content">
                 {participents !=null && participents.map((participent, key)=>{
                  if(location?.state?.going ===false){
                    return(<EnvitedPeopleTableBody participent={participent} key={key} adminId={adminId} getAllMembers={getAllMembers} />)
                  }else{
                    if(participent.status===3){
                      return(<EnvitedPeopleTableBody participent={participent} key={key} adminId={adminId} getAllMembers={getAllMembers} />)
                    }else{
                      return(<EnvitedPeopleTableBody participent={null} key={key} adminId={adminId} getAllMembers={getAllMembers} />)
                    }
                  }
                  }) }
              </div>
      </div>
    </>
  )
}

export default EventInvitedPeoples