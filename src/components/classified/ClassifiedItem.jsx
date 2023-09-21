import React, { useContext } from "react";
import noImg from '../../asset/image/noImage.jpg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, classifiedUrl } from "../../api/Api";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserContext } from "../../utils/UserContext";
import InfoIcon from '@mui/icons-material/Info';

const ClassifiedItem = ({data,creater, getAllClassifiedItems})=>{
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {msDetails, userDetails} = useContext(UserContext)
    const open = Boolean(anchorEl);
    const getUrl = window.location.href;
    var pageName = getUrl.split("/").pop();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    //handle delete a classified
    const handleDeleteClassified=(uuid)=>{
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
                url: `${classifiedUrl}/${uuid}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              axios 
                .request(config)
                .then((response) => {
                  notifySuccess();
                  getAllClassifiedItems();
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
  
    //handle edit a classified
    const handleEditClassified = (uuid)=>{
      navigate('/classified-create', {state:{uuid:uuid}})
    }

    // handle classified-details
    const handleClassifiedDetails = (uuid) =>{
      navigate('/classified-detail',{state:{uuid:uuid}})
    }

    //handle classified order
    const handleClassifiedOrders = (classifiedId, data) =>{
      navigate('/singleOrder',{state:{id:classifiedId, data:data}})
    }


    return(
        <>
           <div className="classified_item">
            <div  onClick={(e)=>handleClassifiedDetails(data.uuid)}>
                {data.thumb !==null? <div className="classified_item_img"><img src={`${baseUrl}/${data.thumb}`} alt={data.title} /></div>
                :
                <div className="classified_item_img"><img src={noImg} alt={data.title} /></div>
                }
                
                <div className="item_content">
                    {data.title && <div className="post_title">{data.title}</div>}
                </div>
            </div>
                <div className="post_bottom">
                    {data.price && <div className="post_amount">{msDetails?.currency} {data.price}</div>}
                    {creater === false && <div className="cart_icon" onClick={(e)=>handleClassifiedDetails(data.uuid)}>
                        {/* <ShoppingCartIcon/> */}
                        <InfoIcon />
                    </div>}
                    
                      {creater ===true && pageName !=="classified" && <Box>
                      <div className="classified_option"
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      >
                         <MoreVertIcon/>
                      </div>
                     <Menu
                         id="demo-positioned-menu"
                         aria-labelledby="demo-positioned-button"
                         anchorEl={anchorEl}
                         open={open}
                         onClose={handleClose}
                         anchorOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                         }}
                         transformOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                         }}
                     >
                      <div className="classifiedPost_dropDown">
                         <ul>
                            <li onClick={(e)=>handleClassifiedOrders(data.id, data)}>Orders</li>
                            {data.bidding ===1 && <li onClick={(e)=>handleClassifiedDetails(data.uuid)}> Bids </li>}
                            <li onClick={(e)=>handleEditClassified(data.uuid)}> Edit</li>
                            <li onClick={(e)=>{handleDeleteClassified(data.uuid); handleClose()}}> Delete</li>
                         </ul>
                      </div>
                     </Menu>
                 </Box>}
                </div>
          </div>
        <ToastContainer />
      </>
    )
}
 
export default ClassifiedItem