import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { localBusinessUrl, resourceUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LocalBusinessItem from "./LocalBusinessItem";
import { BoxLoadEffect } from "../PageLoadEffects";


const MyLocalBusinessbody = () => { 

     const navigate = useNavigate();
     const [business, setResouce] = useState(null)
     const [businessFound, setbusinessFound] = useState(false);
     const {msDetails,userDetails} = useContext(UserContext)
     const token = sessionStorage.getItem('token');
     const getAllResouces = () =>{
       let config = {
         method: 'get',
         url: `${localBusinessUrl}?microsite_id=${msDetails.id}`,
         headers: { 
           'Authorization': `Bearer ${token}`,
         },
       };
       
       axios.request(config)
       .then((response) => {
         setResouce(response.data.data);
         if(response.data.data.length>0)
          response.data.data.forEach(element => {
               if(element.meta.create_by === userDetails.id){
                    setbusinessFound(true)
               }
          });
       })
     }
   
     useEffect(()=>{
       getAllResouces();
     },[])


  return (
      <>
         <div className="section_headear">
                    <h4>Community Business</h4>
                    <div className="btns_row">
                      <Link to='/localBusiness-create'>
                        <div className="Btn_one">
                           Add Community Business
                        </div>
                      </Link>
                    </div>
                 </div> 
        <Grid container spacing={2}>
        {(business !==null && business.length>0 )&& business.map((data,key)=>{
          if(userDetails.id === data.meta.create_by){
            return(
                 <Grid item lg={12} md={12} sm={12} xs={12}>
                    <LocalBusinessItem data={data} key={key} getAllResouces={getAllResouces} admin={true}/>
                 </Grid>
            )}
            })}  
               
        </Grid>
        {(business !==null && business.length===0)  && <div>
             <div className="placeholder_text">
                 No Community Business Found
             </div>
         </div>}
          {business ===null && <>
             <Grid container spacing={2} sx={{ mt:2 }}>
                <Grid item lg={12} md={12} sm={12} xs={12}>{BoxLoadEffect()}</Grid>
             </Grid>
           </> }
      </>
  );
};

export default MyLocalBusinessbody;
