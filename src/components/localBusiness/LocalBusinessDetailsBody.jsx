import React, { useContext, useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import searchD from "../../asset/image/serachSide.png";
import DescriptionIcon from '@mui/icons-material/Description';
import { Tooltip } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl, localBusinessUrl, resourceUrl } from "../../api/Api";
import { Image } from 'antd';
import { UserContext } from "../../utils/UserContext";
import parser from 'html-react-parser'

const LocalBusinessDetailsBody = () => { 
    const location = useLocation(); 
    const token = sessionStorage.getItem('token');
    const {msDetails,userDetails} = useContext(UserContext)
    const [details, setDetails] = useState(null);
   

    const getSingleResouceDetails = ()=>{
      let config = {
        method: 'get',
        url: `${localBusinessUrl}/${location.state.uuid}`,
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
       <div className="business_details">

            {details !==null && <h4> {details.title} </h4>}
            {details !==null && details?.subtitle !=="null"  && <h6>{details.subtitle}</h6>}
            {details !==null &&  <p>{parser(details.details)}</p>}

             {(details !==null && details.files.length>0) && <>
              <h5>Files</h5>
             <div className="details_file_container">
                    {details.files.map((file,key)=>{
                      return(
                        <div className="file_tab" sx={{ml:2}} key={key}>
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

export default LocalBusinessDetailsBody;
