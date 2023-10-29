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
import { UserContext } from "../../utils/UserContext";
import { Avatar, AvatarGroup, Box, Rating } from "@mui/material";

import noImage from '../../asset/image/noImage.jpg'


const LocalBusinessItem = ({data,admin, getAllResouces,resource, handleDeleteResource}) => { 
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRecommended, setUserRecommended] = useState(false);

  const [rating, setRating] = useState(0);

  const { msDetails, userDetails,loggedInUser } = useContext(UserContext);


  const dropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (data?.recommendations && data.recommendations.length > 0) {
      var count = 0;
      data.recommendations.forEach((element) => {
        count = parseInt(element.rating) + count;

        if (element?.user.id === userDetails.id) {
          setUserRecommended(true);
        }
      });

      const storeRating = count / data.recommendations.length;
      setRating(storeRating);
    }
  }, []);


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
          <div className="business_item_img">
             <img  src={data?.media[0]?.id?`${baseUrl}/storage/media/${data?.media[0]?.id}/${data?.media[0]?.file_name}`:noImage} alt="" />
            </div>          
           <div className="bisiness_item_content">
           {data && data.type &&  <div className="business_type">{data.type}</div>}
          {data && data.title &&  <div className="resource_title" onClick={(e)=>navigate('/localBusiness-details', {state:{uuid:data.uuid,userRecommended:userRecommended}})}>{data.title}</div>}
          {data && data.details && <div className="business_item_details" onClick={(e)=>navigate('/localBusiness-details', {state:{uuid:data.uuid,userRecommended:userRecommended}})}>{parser(data.details.slice(0,300))}</div>}
          {((userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") || (userDetails.id === data?.user?.id)) && 
              <div className="admin_dropdown"
                id="demo-positioned-button"
                aria-controls={dropdown ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={dropdown ? 'true' : undefined}
                onClick={handleClick}>
              <MoreVertIcon/>
            </div>
            }
             {data?.recommendations && data.recommendations.length > 0 && (
          <div className="recomment_overview">
            <AvatarGroup max={3}>
              {data.recommendations.map((data, key) => {
                return (
                  <>
                    <Avatar
                      key={data.uuid}
                      alt={data?.user?.name}
                      src={`${baseUrl}/${data?.user?.avatar}`}
                    />
                  </>
                );
              })}

              <div className="star_mark">
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating name="hover-feedback" value={rating} readOnly />
                </Box>
              </div>
            </AvatarGroup>
          </div>
        )}
           </div>
         </div>

        
      </a>
      <ToastContainer />
      </>
  );
};

export default LocalBusinessItem;
