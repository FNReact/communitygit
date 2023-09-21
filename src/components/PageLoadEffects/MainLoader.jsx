import { Backdrop } from "@mui/material";
import React from "react";
import { Fragment } from "react";


const MainLoader = ()=>{
    return(
       <Fragment>
          <div className="upload_loader">
             <div className="upload_loader_container">
                <div className="loader-5 center"><span></span></div>
             </div>
          </div>
       </Fragment>
    )
}

export default MainLoader