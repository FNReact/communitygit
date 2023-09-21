import React, { useEffect, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import tb  from '../../asset/image/test1.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, classifiedOrderUrl } from "../../api/Api";
import { notifyError } from "../../utils/Toast";


const SingleClassifiedOrderBody = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [singleOrder, setSingleOrder] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // get single order data from location
    const getSingleOrderData = ()=>{
      let config = {
        method: 'get',
        url: `${classifiedOrderUrl}?classified_id=${location.state.id}`,
      };
      
      axios.request(config)
      .then((response) => {
        if(response.data.data[0]){
          setSingleOrder(response.data.data[0])
        }
      })
      .catch((err)=>{
        if (err?.response) {
          notifyError(err?.response?.data?.message)
        }else{
          notifyError('Something went wrong!.')
        }
      })
    }

    useEffect(()=>{
      if(location.state !==null){
        getSingleOrderData();
      }
    },[])

// handle classified-details
  const handleClassifiedDetails = (uuid) =>{
    navigate('/classified-detail',{state:{uuid:uuid}})
  }

  // single order detials
const singleOrderDetails=(uuid)=>{
  navigate('/orderDetails',{state:{uuid:uuid}})
}

if(singleOrder !==null){
  return(
    <>
     <div className="classified_orderList_container">
       <h4>Classified Item Order List</h4>
         <div className="order_list_wrapper">
             <div className="order_list_wrap">
                 <div className="list_top">
                     <div className="list_top_left">
                      {singleOrder !==null && singleOrder.payment_status ===0 && <div className="oredr_id"> <CheckBoxIcon/> Order By {singleOrder.user.name}  <span>UnPaid</span> </div>}
                      {singleOrder !==null && singleOrder.payment_status ===1 && <div className="oredr_id"> <CheckBoxIcon/> Order By {singleOrder.user.name} <span>Paid</span> </div>}
                     </div>
                     {singleOrder !==null && <div className="list_top_right">{singleOrder.bill_amount} TK</div>}
                     
                 </div>
                 <div className="update_item_info">
                        <div className="item_update_left"><CalendarMonthIcon/> {singleOrder !==null && new Date(singleOrder.updated_at).toLocaleString()}</div>
                          <div className="item_update_right">
                                <div className="print_btn">
                                    <PaymentIcon/>  Pay Now
                                </div>
                                <div  onClick={(e)=>singleOrderDetails(singleOrder.uuid)} className="dteilas_btn">
                                  View Details
                                </div>
                          </div>
                 </div>
                  <div className="order_content" onClick={(e)=>handleClassifiedDetails(location.state.data.uuid)}>
                      <div className="item_img">
                          {location.state !==null && <img src={`${baseUrl}/${location.state.data.thumb}`} alt={location.state.data.title}/>}
                      </div>
                    <div className="item_info">
                      {location.state !==null && <div className="item_name">{location.state.data.title}</div>}
                      <div className="item_location"> 
                        {location.state !== null &&<><LocationOnIcon/> {location.state.data.location} </>} 
                      </div>
                    </div>
                  </div>
                
             </div>
           
         </div>
     </div>
    </>
)
}else{
  return(
    <> <div className="placeholder_text">No order found for this item</div></>
  )
}

   
}
 
export default SingleClassifiedOrderBody