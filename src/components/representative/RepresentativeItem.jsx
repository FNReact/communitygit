import React, { useContext, useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useNavigate } from "react-router-dom";
import searchD from "../../asset/image/serachSide.png";
import { baseUrl, resourceUrl } from "../../api/Api";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from "sweetalert2";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

import parser from 'html-react-parser'

const RepresentativeItem = ({data,admin, getAllResouces}) => { 
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
                    <li onClick={(e)=>navigate('/resource-create', {state:{uuid:data.uuid}})}> Edit</li>
                    <li onClick={(e)=>{handleDeleteResource(data.uuid);handleClose()} }> Delete Representative </li>
                </ul>
            </div>
          </Menu>
            <div className="resource_item">
              <div className="resource_item_top">
              {data && data.title &&  <div className="resource_title" onClick={(e)=>navigate('/representative-details', {state:{uuid:data.uuid}})}>{data.title.slice(0,22)}..</div>}
              {admin ===true &&   <div className="admin_dropdown"
                        id="demo-positioned-button"
                        aria-controls={dropdown ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={dropdown ? 'true' : undefined}
                        onClick={handleClick}>
                    <MoreVertIcon/>
                </div>}
            
              </div>
              {data && data.details && <div className="resource_item_details" onClick={(e)=>navigate('/representative-details', {state:{uuid:data.uuid}})}>{parser(data.details.slice(0,120))} ...</div>}

                <div className="resource_footer">
                  <div className="res_footer_left">
                      {(data && data.user.avatar) && <div className="admin_profile"><img src={`${baseUrl}/${data.user.avatar}`} alt={data.user.name} /></div>}
                      {data && <div className="admin_name">{data.user.name.slice(0,10)}..</div>}
                  </div>
                  <div className="res_footer_right">
                    <div className="resource_date">
                        {data &&<><AccessTimeIcon/>{new Date(data.created_at).toLocaleDateString()}</>}
                    </div>
                   
                  </div>
                </div>

                
                
            </div>
      </a>
      <ToastContainer />
      </>
  );
};

export default RepresentativeItem;
