import React, { useContext, useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useNavigate } from "react-router-dom";
import searchD from "../../asset/image/serachSide.png";
import { baseUrl, localBusinessUrl, resourceUrl } from "../../api/Api";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from "sweetalert2";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

import parser from 'html-react-parser'

const LocalBusinessItem = ({data,admin, getAllResouces}) => { 
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const dropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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
                url: `${localBusinessUrl}/${uuid}`,
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
                .catch((err)=>{
                  if (err?.response) {
                    notifyError(err?.response?.data?.message)
                  }else{
                    notifyError('Something went wrong!.')
                  }
                })
            }
          });  
    }



  return (
      <>
        
      <a>
     
      <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={dropdown}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }} >
            <div className="dropdown_menuTab">
                <ul>
                    <li onClick={(e)=>navigate('/localBusiness-create', {state:{uuid:data.uuid}})}> Edit</li>
                    <li onClick={(e)=>{handleDeleteResource(data.uuid);handleClose()} }> Delete Community Business </li>
                </ul>
            </div>
          </Menu>
          
        <div className="business_item">
          {data && data.type &&  <div className="business_type">{data.type}</div>}
          {data && data.title &&  <div className="resource_title" onClick={(e)=>navigate('/localBusiness-details', {state:{uuid:data.uuid}})}>{data.title}</div>}
          {data && data.details && <div className="business_item_details" onClick={(e)=>navigate('/localBusiness-details', {state:{uuid:data.uuid}})}>{parser(data.details.slice(0,300))}</div>}
          {admin ===true &&  
              <div className="admin_dropdown"
                id="demo-positioned-button"
                aria-controls={dropdown ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={dropdown ? 'true' : undefined}
                onClick={handleClick}>
              <MoreVertIcon/>
            </div>
            }
         </div>
      </a>
      <ToastContainer />
      </>
  );
};

export default LocalBusinessItem;
