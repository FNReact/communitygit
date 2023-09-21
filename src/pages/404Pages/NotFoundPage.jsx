import React, { Fragment } from "react";
import notFoundImage from "../../../src/asset/image/404.png";

const NotFoundPage = () => {
  const getUrl = window.location.href;
  var uuid = getUrl.split("/").pop();

  return (
    <Fragment>
      {(uuid.length>25)?<>
        <div className="notfound_wrapper">
           <div className="cheking_div">
              Please wait for checking...
           </div>
        </div>
      </>:<>
        <div className="notfound_wrapper">
           <div className="errorImg">
             <img src={notFoundImage}></img>
           </div>
        </div>
      </>}
    </Fragment>
    
  );
};

export default NotFoundPage;
