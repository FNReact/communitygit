import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl, resourceUrl } from "../../api/Api";
import { Image } from 'antd';
import { UserContext } from "../../utils/UserContext";
import parser from 'html-react-parser';
const RepresentativeDetailsBody = () => { 
    const location = useLocation(); 
    const token = sessionStorage.getItem('token');
    const {msDetails,userDetails} = useContext(UserContext)
    const [details, setDetails] = useState(null);
   

    const getSingleResouceDetails = ()=>{
      let config = {
        method: 'get',
        url: `${resourceUrl}/${location.state.uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      };
      axios.request(config)
      .then((response) => {
        setDetails(response.data); 
      })
    }

    useEffect(()=>{
      if(location.state !==null){
        getSingleResouceDetails()
      }
    },[])
  
  return (
      <>
       <div className="resource_details">

            {details !==null && <h4> {details.title} </h4>}
            {details !==null && <h6>{details.subtitle}</h6>}
            {details !==null &&  <p>{parser(details.details)}</p>}

             {(details !==null && details.files.length>0) && <>
              <h5>Representative Files</h5>
             <div className="details_file_container">
                    {details.files.map((file,key)=>{
                      return(
                        <div className="file_tab" key={key}>
                          <Image
                            src={file.url}
                          />
                      </div>
                      )
                    })}
                   
             </div>
             </> }
       </div>
      </>
  );
};

export default RepresentativeDetailsBody;
