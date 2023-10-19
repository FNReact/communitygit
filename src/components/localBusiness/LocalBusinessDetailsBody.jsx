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
import avatar2 from '../../asset/image/avatar.png';
import { Avatar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';


const LocalBusinessDetailsBody = () => { 
  const [value, setValue] = React.useState(2);
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
             <div className="rating_container">
          <div className="section_top">
            <div className="sec_title">
              Section Title
            </div>
            <div className="rating_add">
             <AddIcon/> Add Recommended
            </div>
          </div>
          <div className="rating_item">
            <div className="user_avatar">
              <Avatar alt="Remy Sharp" src={avatar2} />
            </div>
            <div className="rating_content">
              <div className="user_name">
                Fahim Ahmed
              </div>
              <div className="rating_star">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div className="review_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati temporibus nobis natus laudantium. Nam molestias doloribus ab recusandae aliquid quas iusto, mollitia ratione veniam.
              </div>
            </div>
          </div>
          <div className="rating_item">
            <div className="user_avatar">
              <Avatar alt="Remy Sharp" src={avatar2} />
            </div>
            <div className="rating_content">
              <div className="user_name">
                Sumon Khan
              </div>
              <div className="rating_star">
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue); 
                  }}
                />
              </div>
              <div className="review_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae obcaecati temporibus nobis natus laudantium. Nam molestias doloribus ab recusandae aliquid quas iusto, mollitia ratione veniam.
              </div>
            </div>
          </div>
        </div>
       </div>
      </>
  );
};

export default LocalBusinessDetailsBody;
