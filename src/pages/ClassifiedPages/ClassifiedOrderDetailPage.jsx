import { Button, Grid, Tooltip } from "@mui/material";
import React from "react";
import ClassifiedOrderDetailBody from "../../components/classifiedOrder/ClassifiedOrderDetailBody";
import { useRef } from "react";
import ReactToPrint from "react-to-print"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


const ClassifiedOrderDetailPage = () => {
  const componentRef = useRef();
  const navigate = useNavigate();

  return (
    <>
     <Grid container spacing={2}>
         <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
         <Grid item lg={9} md={8} sm={12} xs={12}>
            <div className="content_body">
              <div className="order_detail_header">
                <div className="detail_header_left">
                   <Tooltip title="Back">
                      <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                         <ArrowBackIcon/>
                      </div> 
                    </Tooltip>
                </div>
                 <div>
                   <ReactToPrint
                     trigger={() => (
                       <Button variant="contained" className="print_btn">
                         Print this order!
                       </Button>
                     )}
                     content={() => componentRef.current}
                   />
                 </div>
              </div>
                <ClassifiedOrderDetailBody  ref={componentRef}/>
            </div>
         </Grid>
     </Grid>
    </>
  );
};

export default ClassifiedOrderDetailPage;
