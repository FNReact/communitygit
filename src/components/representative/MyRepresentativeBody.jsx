import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { resourceUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BoxLoadEffect } from "../PageLoadEffects";
import RepresentativeItem from "./RepresentativeItem";


const MyRepresentativeBody = () => { 

     const navigate = useNavigate();
     const [resource, setResouce] = useState(null)
     const [resourceFound, setResourceFound] = useState(false);
     const {msDetails,userDetails} = useContext(UserContext)
     const token = sessionStorage.getItem('token');
     const getAllResouces = () =>{
       let config = {
         method: 'get',
         url: `${resourceUrl}?microsite_id=${msDetails.id}&type=representative`,
         headers: { 
           'Authorization': `Bearer ${token}`,
         },
       };
       
       axios.request(config)
       .then((response) => {
         setResouce(response.data.data);
         if(response.data.data.length>0)
          response.data.data.forEach(element => {
               if(element.user.id === userDetails.id){
                    setResourceFound(true)
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
                    <h4>Representative</h4>
                    <div className="btns_row">
                      <Link to='/representative-create'>
                        <div className="Btn_one">
                           Add Representative
                        </div>
                      </Link>
                    </div>
              </div> 
        <Grid container spacing={2}>
        {(resource !==null && resource.length>0 )&& resource.map((data,key)=>{
          if(userDetails.id === data.user.id){
            return(
                 <Grid item lg={4} md={6} sm={6} xs={12}>
                    <RepresentativeItem data={data} key={key} getAllResouces={getAllResouces} admin={true}/>
                 </Grid>
            )}
            })}
        </Grid>

          {(resource !==null && resource.length===0)  && <div>
             <div className="placeholder_text">
                 No Representative Found
             </div>
         </div>}
          {resource ===null && <>
             <Grid container spacing={2} sx={{ mt:2 }}>
                <Grid item lg={4} md={6} sm={6} xs={6}>{BoxLoadEffect()}</Grid>
                <Grid item lg={4} md={6} sm={6} xs={6}>{BoxLoadEffect()}</Grid>
                <Grid item lg={4} md={6} sm={6} xs={6}>{BoxLoadEffect()}</Grid>
             </Grid>
           </> }
      </>
  );
};

export default MyRepresentativeBody;
