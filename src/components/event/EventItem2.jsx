
import React, { Fragment } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

const EventItem2 = ({event , handleDeleteEvent}) => { 
  const {userDetails, msDetails} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <Fragment>
      
            <div className="event_item_two cursorPointer" >
                <a onClick={(e)=>navigate('/event-detail', {state:{uuid:event.uuid,event:event}})}>
                  {(event.title) && <div className="event_title">{event.title}</div>}
                </a>
                {/* {userDetails.id === event.user_id && <div className="dropDown"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  >
                    <MoreVertIcon/>
                </div>} */}
                
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={(e)=>{handleDeleteEvent(event.uuid);handleClose()}}>Delete</MenuItem>
                </Menu>
                <div className="eventTime" >
                    {event.date && <><AccessTimeIcon/> {event.date}</>}
                </div>
            </div>
    </Fragment>
  );
};

export default EventItem2;
