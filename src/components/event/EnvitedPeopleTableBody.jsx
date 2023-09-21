import React, { useState } from 'react'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { Avatar, Backdrop, Box, Chip, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { baseUrl, eventParticipantUrl } from '../../api/Api';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MainLoader from '../PageLoadEffects/MainLoader';
import { notifyError } from '../../utils/Toast';
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
const ITEM_HEIGHT = 48;

const EnvitedPeopleTableBody = ({participent, adminId, getAllMembers}) => {
  const location = useLocation();
  const {userDetails, msDetails} = useContext(UserContext)
  const token = sessionStorage.getItem('token');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [participentStatus, setParticipentStatus] = useState(participent?.status)
  const [loaderShow , setLoaderShow] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const handleUpdateStatus =(status,uuid)=>{
    setLoaderShow(true)
    let data = new FormData();
    data.append('status', status);

    let config = {
        method: 'post',
        url: `${eventParticipantUrl}/${uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        setParticipentStatus(response?.data?.status)
        handleClose()
        getAllMembers()
        setLoaderShow(false)

      })
      .catch((err)=>{
        setLoaderShow(false)
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })

  }
 

  return (
    <>
     <Backdrop open={loaderShow} className="backdrop_contorller">
            <MainLoader />
        </Backdrop>
      <div className='table_content_item'>
          {participent !==null 
          ?  <Grid container spacing={2} alignItems="center">
                <Grid item  xs={4} md={4}> 
                    <div className="table_Item_name">
                      <Avatar alt={participent?.user?.name} src={`${baseUrl}/${participent?.user?.avatar}`} />
                      <div className="item_name">{participent?.user?.name}</div>
                  </div> 
                </Grid>
                <Grid item xs={4} md={4}>
                  <div className="table_Item_email">
                    {participent?.user?.email}
                  </div> 
                </Grid>
                <Grid item xs={2} md={2} >
                  <div className="item_status">
                  {participentStatus===0 && <Chip label="Invited" color='primary' />}
                  {participentStatus ===1 && <Chip label="Participated" color='success' />}
                  {participentStatus ===2 && <Chip label="Interested" color='warning' />}
                  {participentStatus ===3 && <Chip label="Going" color='info' />}
                  {participentStatus ===4 && <Chip label="Not Going" color='warning' />}
                  {participentStatus ===5 && <Chip label="Not Participated" color='primary' />}
                  </div>
                </Grid>
                <Grid item xs={2} md={2}>
                  {location.state !==null && userDetails.id === location.state?.eventDetail?.meta?.create_by && 
                <div className="item_action">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                
                  {/* <MenuItem >Invited</MenuItem> */}
                  
                  <MenuItem onClick={(e)=>handleUpdateStatus('1', participent?.uuid)}>Participated</MenuItem>
                  <MenuItem onClick={(e)=>handleUpdateStatus('2', participent?.uuid)}>Interested</MenuItem>
                  <MenuItem onClick={(e)=>handleUpdateStatus('3', participent?.uuid)}>Going</MenuItem>
                  <MenuItem onClick={(e)=>handleUpdateStatus('4', participent?.uuid)}>Not Going</MenuItem>
                  <MenuItem onClick={(e)=>handleUpdateStatus('5', participent?.uuid)}>Not Participated</MenuItem>
                </Menu>
              </div>}
                </Grid>
          </Grid>
          :
            <Box display='flex' justifyContent='center' style={{color:'#BFBEBD'}}>No participent found</Box>
          
        }
           
      </div>        
    </>
  )
}

export default EnvitedPeopleTableBody