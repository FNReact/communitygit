
import React, { Fragment, useContext } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

import parser from 'html-react-parser'

const EventItem = ({event, handleDeleteEvent}) => { 
  const navigate = useNavigate();
  const {userDetails, msDetails} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = sessionStorage.getItem('token');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <Fragment>
            <div className="event_item">
            <a onClick={(e)=>navigate('/event-detail', {state:{uuid:event.uuid,event:event}})}>
              {event.title && <div className="event_title">{event.title}</div>} 
             </a>
             {userDetails.id === event?.meta?.create_by && <div className="dropDown"
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
            >
              <MoreVertIcon/>
            </div>}
            
            <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
                 'aria-labelledby': 'basic-button',
               }}
             >
               <MenuItem onClick={(e)=>navigate('/event-create', {state:{uuid:event.uuid,event:event,bannerUpdate:false}})}>Edit</MenuItem>
               <MenuItem onClick={(e)=>{handleDeleteEvent(event.uuid);handleClose()}}>Delete</MenuItem>
             </Menu>
             <div className="eventTime" >
                {event.date && <><AccessTimeIcon/> {event.date}</>}
             </div>
             {event.details && <div className="event_details">{parser(event.details.slice(0,300))}</div>}
         </div>
      
    </Fragment>
  );
};

export default EventItem;
