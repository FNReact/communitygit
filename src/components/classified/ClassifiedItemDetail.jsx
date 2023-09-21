import React, { useEffect, useState } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Swiper, SwiperSlide } from "swiper/react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ModeFanOffIcon from '@mui/icons-material/ModeFanOff';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Box, FilledInput, FormControl, Grid, InputAdornment, InputLabel, TextField } from "@mui/material";
import ClassifiedItem2 from "./ClassifiedItem2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, classifiedBidsUrl, classifiedOrderUrl, classifiedUrl } from "../../api/Api";
import ReactReadMoreReadLess from "react-read-more-read-less";
import tb  from '../../asset/image/test1.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/Toast";
import Swal from "sweetalert2";
import noImage from '../../asset/image/noImage.jpg'
import InfoIcon from '@mui/icons-material/Info';
const ClassifiedItemDetail = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const {msDetails, userDetails}  = useContext(UserContext)
    const [details, setDetails] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [order, setOrder] = useState(false);
    const [classifiedItem, setClassifiedItemm]  = useState(null);
    const [bidAmount, setBidAmount] = useState('')
    const [bidUuid, setBidUuid] = useState(null);
    const [bidStatus, setBidStatus] = useState(0)
    const [bitFindUser, setBitFindUser] = useState(false)
    const [payableAmount, setPayAbleAmount] = useState(0)

    const [orderName, setOrderName] = useState(userDetails?userDetails?.profile?.name:null)
    const [orderEmail, setOrderEmail] = useState(userDetails?userDetails?.email:null)
    const [orderPhone, setOrderPhone] = useState(null)
    const [orderQuantity, setOrderQuantity] = useState(null)
    const [orderAddress, setOrderAddress] = useState(null)
    const [orderNote, setOrderNote] = useState(null)
 
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const orderFormOpen = () => {
      setOrder(true);
    };
    const orderFormClose = () => {
      setOrder(false);
    };

    const [bid, setBid] = useState(false);
    const bidFormOpen = () => {
        setBid(true);
    };
    const bidFormClose = () => {
        setBid(false);
    };

    // get single classified details 
    const getSingleClassifiedDetails = (uuid)=>{
      let config = {
         method: 'get',
         url:  `${classifiedUrl}/${uuid}`,
       };
       
       axios.request(config)
       .then((response) => {
         setDetails(response.data);
         if(response.data.bids.length>0 && response.data.bids.map((bidData, key)=>{
            if(userDetails.id === bidData.user_id){
               setBitFindUser(true)
            }
         }));
         if(response.data.bids.length>0 && response.data.bids.map((bidData, key)=>{
            if(bidData.status ===1){
               setBidStatus(1);
            }
         }));
       })
    }
    useEffect(()=>{
      if(location.state !==null){
         getSingleClassifiedDetails(location.state.uuid)
      }
      
    },[])


//Get all classified  items
const getAllClassifiedItems = ()=>{
   let config = {
      method: 'get',
      url: `${classifiedUrl}?microsite_id=${msDetails.id}`,
    };
    
    axios.request(config)
    .then((response) => {
      setClassifiedItemm(response.data.data)
    })
}
useEffect(()=>{
   getAllClassifiedItems();
},[])

 // handle classified-details
 const handleClassifiedDetails = (uuid) =>{
   navigate('/classified-detail',{state:{uuid:uuid}})
   window.location.reload()
 }

 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);
 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
   setAnchorEl(null);
 };

 // handle create new bid 

 const handleCreateBid = (classifiedId,status,uuid)=>{
      let data = new FormData();
      data.append('amount', bidAmount);
      data.append('classified_id', classifiedId);
      data.append('status', status);
      var config;
      if(uuid !==null){
         config = {
            method: 'post',
            url: `${classifiedBidsUrl}/${uuid}`,
            headers: { 
               'Authorization': `Bearer ${token}`, 
            },
            data : data
            };
      }else{
         config = {
            method: 'post',
            url: classifiedBidsUrl,
            headers: { 
               'Authorization': `Bearer ${token}`, 
            },
            data : data
            };
      }

      axios.request(config)
      .then((response) => {
         getSingleClassifiedDetails(location.state.uuid)
         notifySuccess()
      })
      .catch((err)=>{
         if (err?.response) {
           notifyError(err?.response?.data?.message)
         }else{
           notifyError('Something went wrong!.')
         }
       })
 }
// handle delete bid
const handleDeleteBid = (uuid) =>{
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
          url: `${classifiedBidsUrl}/${uuid}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios 
          .request(config)
          .then((response) => {
           window.location.reload()
            notifySuccess();
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

// handle accept bid

const handleAcceptBid = (classifiedId,uuid)=>{
   Swal.fire({
      heightAuto: false,
      backdrop: false,
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
         setBidStatus(1);
         setBidUuid(uuid);
         handleCreateBid(classifiedId)
      }
    });  
}

//handle classified order

const handleClassifiedOrder = (classifiedId)=>{
   let data = new FormData();
   data.append('classified_id', classifiedId);
   data.append('name', orderName);
   data.append('email', orderEmail);
   data.append('phone', orderPhone);
   data.append('quantity', 1);
   data.append('bill_amount', payableAmount);
   data.append('payment_status', '');
   data.append('paid_amount', '');
   data.append('special_identifier', '');
   data.append('shipping_address', orderAddress);
   data.append('description', '');
   data.append('special_note', orderNote);

   let config = {
   method: 'post',
   url: classifiedOrderUrl,
   headers: { 
      'Authorization': `Bearer ${token}`, 
   },
   data : data
   };

   axios.request(config)
   .then((response) => {
      orderFormClose()
      navigate('/orderList')

   })
   .catch((err)=>{
      if (err?.response) {
        notifyError(err?.response?.data?.message)
      }else{
        notifyError('Something went wrong!.')
      }
    })
}

    return(
      <>
             <div className="classified_item_detail">
                   <div className="top_classified_navigate">
                      <ul>
                           <li>Classsified </li>
                           {details !=null && <li> <NavigateNextIcon/> {details.brand} </li>}
                           {details !=null && <li className="active"> <NavigateNextIcon/> {details.category.name} </li>}
                       </ul> 
                   </div>
                     <Grid container spacing={2}>
                         <Grid item lg={6} md={12} sm={12} xs={12}>
                         <div className="classified_item_Img_container">
                           {details !== null && details.thumb !==null && details.files.length ===0 && <img src={`${baseUrl}/${details.thumb}`} alt={details.title} width='80%' />}
                           {details !== null && details.thumb ===null && details.files.length ===0 && <img src={noImage} alt={details.title} width='100%' />}
                         
                           <Swiper
                                style={{
                                   "--swiper-navigation-color": "#fff",
                                   "--swiper-pagination-color": "#fff",
                                }}
                                loop={false}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                                >
                                 {(details !==null && details.files.length>0) && details.files.map((data, key)=>{
                                    return (
                                       <SwiperSlide key={data.uuid}>
                                          <img src={data.url}/>
                                       </SwiperSlide>
                                    )
                                 }) }
                        </Swiper>
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          loop={false}
                          spaceBetween={10}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper classified_img_navigate_content">
                            {(details !==null && details.files.length>0) && details.files.map((data, key)=>{
                                 return(
                                    <SwiperSlide className="navigate_img" key={data.uuid}>
                                       <img src={data.url}/>
                                    </SwiperSlide>
                                 )
                              }) }
                        </Swiper>
                    </div>
                </Grid>
                <Grid item g={6} md={12} sm={12} xs={12}>
                   <div className="swipper_item_content">
                        {details !==null && <h4> {details.title} </h4>}
                       <div className="product_price">
                          {details !==null && <><span>{msDetails?.currency}</span>{details.price}</>}
                       </div>
                       <div className="seller_profile">
                          {details !==null && <><AccountCircleIcon/> {details.user.name} </>}
                       </div>
                       <div className="item_detail_list">
                          <ul>
                              {details !==null && <li> <ModeFanOffIcon/> Condition <span> : {details.condition} </span> </li>}
                              {details !==null && <li> <LocationOnIcon/> Location <span> : {details.location} </span> </li>}
                              {details !==null && <li> <AddModeratorIcon/> Brand <span> : {details.brand} </span> </li>}
                              {details !==null && <li> <LocalPhoneIcon/> Phone <span>  : {details.phone} </span> </li>}
                              {details !==null && <li> <EmailIcon/> Email <span> : {details.email}</span> </li>}
                              {details !==null && <li> <ScheduleIcon/> Published date <span>: {details.published_date}</span></li>}
                          </ul>
                          {/* <div className="order_btn" onClick={orderFormOpen}>
                             Get Order
                          </div> */}
                       </div>
                       <Box sx={{m:5}}>
                            {details !==null && details.bidding ===0 && <Button variant="contained" onClick={(e)=>{setPayAbleAmount(details.price);orderFormOpen()} }>Get Order</Button>}
                       </Box>
                       
                   </div> 
                </Grid>
                   </Grid>
                   <div className="item_about">
                      <h4>About This Item</h4>
                      <p>
                        {details !==null &&  <ReactReadMoreReadLess
                           charLimit={500}
                           readMoreText={"Read more"}
                           readLessText={"Read less"}
                        >
                           {details.description}
                        </ReactReadMoreReadLess>}
                      </p>
                   </div>
                   {details !==null && details.bidding ===1 &&   <div className="bidding_container">
                     {details !==null && userDetails.id !== details.user.id && bitFindUser===false && <div className="bidding_btn" onClick={bidFormOpen}>Create a Bid</div>}
                     {/* {bitFindUser === false && <div className="bidding_btn" onClick={bidFormOpen}>Create a Bid</div>} */}
                    
                       <div className="bidding_item">
                        {details !==null && details.bids.length>0 && details.bids.map((data,key)=>{
                           
                             let diffTime = Math.abs(new Date().valueOf() - new Date(data.created_at).valueOf());
                             let days = diffTime / (24*60*60*1000);
                             let hours = (days % 1) * 24;
                             let minutes = (hours % 1) * 60;
                             let secs = (minutes % 1) * 60;
                             [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
                             var fullTime;
                          
                             if(secs !== 0 ){
                               fullTime = secs+'s';
                             }
                             if(minutes !== 0 &&  secs !== 0 ){
                               fullTime = minutes+'m'+ " "+ secs+'s';
                             }
                             if(hours !==0 && minutes !== 0 &&  secs !== 0 ){
                               fullTime = hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
                             }
                             if(days !==0 && hours !==0 && minutes !== 0 &&  secs !== 0 ){
                               fullTime = days+'d'+ " "+hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
                             }
                           return(
                              <div className="item_top">
                                <div className="top_left">
                                   <div className="user_img">
                                       <img src={`${baseUrl}/${data.user.avatar}`} alt={data.user.name} />
                                   </div>
                                   <div className="use_info">
                                      <div className="userName"> {data.user.name}</div>
                                      {fullTime !==null && <div className="time"> {fullTime} ago </div>}
                                   </div>
                                </div>
                                <div className="bidamount">
                                   <span>Bid amount</span> 
                                     {msDetails?.currency} {data.amount} 
                                </div>
                                {(details.user.id === userDetails.id && bidStatus ===0) && <Button variant="outlined" onClick={(e)=>handleCreateBid(details.id,1,data.uuid)}>Accept Bid</Button>}
                                {(details.user.id === userDetails.id && bidStatus ===1) && <Button variant="outlined" disabled>Accepted Bid</Button>}
                                {(details.user.id !== userDetails.id && data.status ===1) && <Button variant="contained" onClick={(e)=>{setPayAbleAmount(data.amount);orderFormOpen()} }>Get Order</Button>}
                                {userDetails.id === data.user.id &&  <div className="top_right">
                                   <MoreVertIcon id="basic-button"
                                     aria-controls={open ? 'basic-menu' : undefined}
                                     aria-haspopup="true"
                                     aria-expanded={open ? 'true' : undefined}
                                     onClick={handleClick}/>
                                   <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                          'aria-labelledby': 'basic-button',
                                        }}
                                      >
                                        <MenuItem onClick={(e)=>{setBidUuid(data.uuid);bidFormOpen(); setBidAmount(data.amount);handleClose()}}>Edit</MenuItem>
                                        <MenuItem onClick={(e)=>{handleDeleteBid(data.uuid);handleClose()}}>Delete</MenuItem>
                                    </Menu>
                                </div>}
                               
                            </div>
                           )
                        })}
                        {details !==null && details.bids.length ===0 && <>No Bids Found</> }
                        </div>
                   </div> }

                   
                 
              </div>

              <div className="d_top">
                <h4>Similar</h4>
                 <Grid container spacing={2}>
                    {(classifiedItem !==null && classifiedItem.length>0) && classifiedItem.map((data,key)=>{
                        if(details !==null && details?.category.id === data?.category?.id && details.id !==data.id){
                           return(
                              <Grid item lg={6} md={6} sm={12} xs={12} key={data.uuid}>
                                 <div  onClick={(e)=>handleClassifiedDetails(data.uuid)}>
                                    <div className="classified_itemLayout2">
                                       <div className="classified_item_img">
                                          {data.thumb !==null && <img src={`${baseUrl}/${data.thumb}`} alt={data.title} />}
                                          {data.thumb ===null && <img src={noImage} alt={data.title} />}
                                       </div>
                                       <div className="item_content">
                                          <div className="post_title">
                                             {data.title}
                                          </div>
                                          <div className="post_bottom">
                                          <div className="post_amount">
                                            {msDetails?.currency} {data.price}
                                          </div>
                                          <div className="cart_icon">
                                                {/* <ShoppingCartIcon/> */}
                                                <InfoIcon/>
                                          </div>
                                         </div>
                                        </div>
                                       </div>
                                    </div>
                              </Grid>
                           )
                        }
                    })} 
                 </Grid>
              </div>
 {/* Classified order form              */}
               <Dialog
                 fullScreen={fullScreen}
                 open={order}
                 onClose={orderFormClose}
                 aria-labelledby="responsive-dialog-title">
                 <DialogTitle id="responsive-dialog-title">
                    Get Order
                 </DialogTitle>
                 <DialogContent>
                     <div className="classified_order_form">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={6}>
                               <Box><TextField label="Name" variant="filled" fullWidth  focused onChange={(e)=> setOrderName(e.target.value)} value={orderName} /></Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                               <Box><TextField label="Email" variant="filled" fullWidth  focused onChange={(e)=> setOrderEmail(e.target.value)} value={orderEmail} /></Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                               <Box><TextField label="Phone" variant="filled" fullWidth  focused onChange={(e)=> setOrderPhone(e.target.value)}/></Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                               <Box><TextField label="Payable Amount" multiline
                                variant="filled" value={payableAmount} fullWidth  focused disabled={true} /></Box>
                            </Grid>
                            {/* <Grid item xs={6}>
                               <Box><TextField type="number"  InputProps={{ inputProps: { min: 0, max: 10 } }} label="Quantity" variant="filled" fullWidth  focused onChange={(e)=>setOrderQuantity(e.target.value)}/></Box>
                            </Grid> */}
                            <Grid item xs={12} md={12} lg={12}>
                               <Box><TextField label="Shipping Address" multiline
                              rows={3} variant="filled" fullWidth  focused onChange={(e)=>setOrderAddress(e.target.value)} /></Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                               <Box><TextField label="Special Note" multiline
                                variant="filled" fullWidth  focused onChange={(e)=>setOrderNote(e.target.value)}/></Box>
                            </Grid>
                        </Grid>
                        {(orderName !==null && orderEmail !==null && orderPhone !==null)? <Button sx={{ mt:2 }} variant="contained" color="success" fullWidth onClick={(e)=>handleClassifiedOrder(details.id)} >Order Now</Button>
                        : <Button sx={{ mt:2 }} variant="contained" color="success" fullWidth disabled >Order Now</Button>
                        }
                     </div>
                 </DialogContent>
               </Dialog>
         {/* classified bid form */}
               <Dialog
                 fullScreen={fullScreen}
                 open={bid}
                 onClose={bidFormClose}
                 aria-labelledby="responsive-dialog-title">
                 <DialogTitle id="responsive-dialog-title">
                   New Bid
                 </DialogTitle>
                 <DialogContent>
                     <div className="bid_form">
                      <FormControl fullWidth variant="filled" focused>
                         <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                         <FilledInput
                           id="filled-adornment-amount"
                           type="number"
                           startAdornment={<InputAdornment position="start">{msDetails?.currency}</InputAdornment>}
                           value={bidAmount}
                           onChange={(e)=>setBidAmount(e.target.value)}
                         />
                      </FormControl>
                      <Button sx={{ mt:1 }} variant="contained"  color="success" fullWidth onClick={(e)=>{handleCreateBid(details.id,0,null); bidFormClose()}}>Submit</Button>
                     </div>
                 </DialogContent>
               </Dialog>
               <ToastContainer />
          </>
       )
}

export default ClassifiedItemDetail