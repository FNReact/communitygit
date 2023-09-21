import { Backdrop } from "@mui/material";
import React from "react";
import { Fragment } from "react";


const UploadLoader = ()=>{
    return(
       <Fragment>
          <div className="upload_loader">
             <div className="upload_loader_container">
                <div className="loader-5 center"><span></span></div>
                <h5>Please Wait for Upload</h5>
             </div>
          </div>
       </Fragment>
    )
}

export default UploadLoader