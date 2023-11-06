import React, { useContext, useEffect, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, classifiedMyOrderUrl } from "../../api/Api";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import { Box } from "@mui/material";


const ClassifiedOrderListBody = ()=>{
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const { msDetails,userDetails} = useContext(UserContext)
    const [myOrder, setMyOrder] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // get all my orders
    const getAllMyOrder = ()=>{
      let config = {
        method: 'get',
        url: `${classifiedMyOrderUrl}?microsite_id=${msDetails.id}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.request(config)
      .then((response) => {
        setMyOrder(response.data.data)
      })
    }

    useEffect(()=>{
      getAllMyOrder()
    }, [])

// handle classified-details
  const handleClassifiedDetails = (uuid) =>{
    navigate('/classified-detail',{state:{uuid:uuid}})
  }

// single order detials

const singleOrderDetails=(uuid)=>{
  navigate('/orderDetails',{state:{uuid:uuid}})
}

   

    return(
        <>
         <div className="classified_orderList_container">
            <h4>My Purchases</h4>
            <div className="order_list_wrapper">
              {myOrder !==null && myOrder.length ===0 && <> <div className="placeholder_text"> No Order Found  </div></>}
              {(myOrder !==null && myOrder.length>0) && myOrder.map((singleOrder,key)=>{
                var count=0;
                if(singleOrder?.classified !==null){ 
                  count = count+1;
                return(
                    <div className="order_list_wrap">
                    <div className="list_top">
                         <div className="list_top_left">
                          {userDetails !==null && singleOrder.payment_status ===0 && <div className="oredr_id"> <CheckBoxIcon/> <span className="sm_none">Order</span> By <span className="o_name"> {userDetails.profile.name} </span>   <span className="status_update">UnPaid</span> </div>}
                          {userDetails !==null && singleOrder.payment_status ===1 && <div className="oredr_id"> <CheckBoxIcon/> <span className="sm_none">Order</span> By  <span className="o_name"> {userDetails.profile.name}</span>  <span className="status_update">Paid</span> </div>}
                         </div>
                         {singleOrder !==null && <div className="list_top_right">{msDetails?.currency} {singleOrder.bill_amount}</div>}
                         
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
                        <div className="order_content" onClick={(e)=>handleClassifiedDetails(singleOrder.classified.uuid)}>
                            <div className="item_img">
                                {(singleOrder !==null && singleOrder.classified !==null) && <img src={`${baseUrl}/${singleOrder.classified.thumb}`} alt={singleOrder.classified.title} />}
                            </div>
                          <div className="item_info">
                            {(singleOrder !==null && singleOrder.classified !==null)  && <div className="item_name">{singleOrder.classified.title}</div>}
                            <div className="item_location"> 
                              {(singleOrder !==null && singleOrder.classified !==null)  &&<><LocationOnIcon/> {singleOrder.classified.location} </>} 
                            </div>
                          </div>
                     </div>
                    </div>
                )}
               {count ===0 &&  <Box>No Classified Order Found</Box>}
              })}
            </div>
         </div>
        </>
    )
}
 
export default ClassifiedOrderListBody