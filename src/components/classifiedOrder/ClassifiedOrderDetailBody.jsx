import React, { useContext, useEffect, useRef, useState } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import { Grid } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl, classifiedOrderUrl } from "../../api/Api";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import { notifyError } from "../../utils/Toast";

const ClassifiedOrderDetailBody = React.forwardRef((props, ref)=>{
   const navigate = useNavigate();
    const location = useLocation();
    const {msDetails, userDetails} = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [singleOrder, setSingleOrder] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

   //  get single order details
    const getSingleOrderDetails = (uuid)=>{
      let config = {
         method: 'get',
         url: `${classifiedOrderUrl}/${uuid}`,
       };
       
       axios.request(config)
       .then((response) => {
         setSingleOrder(response.data)
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
         getSingleOrderDetails(location.state.uuid)
      }
    },[])

   // handle classified-details
  const handleClassifiedDetails = (uuid) =>{
   navigate('/classified-detail',{state:{uuid:uuid}})
 }

    return(
        <>
         <div className="classified_orderList_container" ref={ref}>
            <h4>My Purchases Details :</h4>
             <div className="order_list_wrapper">
               <div className="order_list_wrap">
                     <div className="list_top">
                         <div className="list_top_left">
                          {singleOrder !==null && singleOrder.payment_status ===0 && <div className="oredr_id"> <CheckBoxIcon/> Order By {singleOrder.user.name}  <span>Unpaid</span> </div>}
                          {singleOrder !==null && singleOrder.payment_status ===1 && <div className="oredr_id"> <CheckBoxIcon/> Order By {singleOrder.user.name} <span>Paid</span> </div>}
                         </div>
                         {singleOrder !==null && <div className="list_top_right">{msDetails?.currency} {singleOrder.bill_amount}</div>}
                         
                     </div>
                     <div className="update_item_info">
                        <div className="item_update_left">
                          <CalendarMonthIcon/> {singleOrder !==null && new Date(singleOrder.updated_at).toLocaleString()}
                        </div>
                     </div>
                      <div className="order_content" onClick={(e)=>handleClassifiedDetails(singleOrder.classified.uuid)}>
                          <div className="item_img">
                              {singleOrder !==null && <img src={`${baseUrl}/${singleOrder.classified.thumb}`} alt={singleOrder.classified.title}/>}
                          </div>
                        <div className="item_info">
                          {singleOrder !==null && <div className="item_name">{singleOrder.classified.title}</div>}
                          <div className="item_location"> 
                            {singleOrder !== null &&<><LocationOnIcon/> {singleOrder.classified.location} </>} 
                          </div>
                        </div>
                      </div>
                 </div>
             </div>
             <div className="order_info_wrapper">
                <h5> Order Information :</h5>
                <div className="order_info_wrap">
                   <Grid container spacing={3}>
                      <Grid item lg={6} xs={12}> 
                        <div className="info_item">
                           <div className="info_left">
                              Name 
                           </div>
                           <div className="info_right">
                              {singleOrder !==null &&<><span> : </span> {singleOrder.name}</>}
                           </div>
                        </div>
                      </Grid>
                      <Grid item lg={12} xs={6}> 
                        <div className="info_item">
                           <div className="info_left">
                              Phone 
                           </div>
                           <div className="info_right">
                              {singleOrder !==null &&<><span> : </span> {singleOrder.phone}</>}
                           </div>
                        </div>
                      </Grid>
                      <Grid item lg={12} xs={6}> 
                        <div className="info_item">
                           <div className="info_left">
                              E-mail 
                           </div>
                           <div className="info_right">
                              {singleOrder !==null &&<><span> : </span> {singleOrder.email}</>}
                           </div>
                        </div>
                      </Grid>
                      <Grid item lg={12} xs={6}> 
                        <div className="info_item">
                           <div className="info_left">
                              Quantity 
                           </div>
                           <div className="info_right">
                              {singleOrder !==null &&<><span> : </span> {singleOrder.quantity}</>}
                           </div>
                        </div>
                      </Grid>
                      <Grid item lg={12} xs={12}> 
                        <div className="info_item">
                           <div className="info_left">
                              Shipping Address 
                           </div>
                           <div className="info_right">
                              {singleOrder !==null &&<><span> : </span> {singleOrder.shipping_address}</>}
                           </div>
                        </div>
                      </Grid>
                   </Grid>
                </div>
             </div>
         </div>
        </>
    )
})
 
export default ClassifiedOrderDetailBody