import React, { Fragment } from "react";
import notFoundImage from '../../asset/image/404.png';
const NotFoundComponent = () =>{

    return(
        <Fragment>
            <div className="notfound_wrapper">
               <div className="errorImg">
                  <img src={notFoundImage}></img>
               </div>
           </div>
        </Fragment>
    )
}

export default NotFoundComponent