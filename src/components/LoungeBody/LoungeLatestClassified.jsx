import React, { Fragment } from "react";
import L3  from '../../asset/image/test3.webp'
import L1  from '../../asset/image/test1.png'
import {  faCross, faGroupArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl, classifiedUrl } from "../../api/Api";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import { Button } from "@mui/material";
import noImage from '../../asset/image/noImage.jpg'

const LoungeLatestClassified = () => {
    const navigate = useNavigate()
    const {msDetails} =  useContext(UserContext)
    const [latestClassified, setLatestCalssified] = useState(null);

    // get all classifieds
    const getAllClassified =()=>{
        let config = {
            method: 'get',
            url: `${classifiedUrl}?microsite_id=${msDetails.id}`,
          };
          
          axios.request(config)
          .then((response) => {
            setLatestCalssified(response.data.data)
          })
    }

    useEffect(()=>{
        getAllClassified()
    },[])

  // handle classified-details
  const handleClassifiedDetails = (uuid) =>{
   navigate('/classified-detail',{state:{uuid:uuid}})
 }

  return (
    <Fragment>
           <div className="ConnectWith">
               <div className="list_heading">
                    Latest Classifieds
               </div>

               {(latestClassified !==null && latestClassified.length===0) &&  <div className="connectWith_item">
                   <h5>No Classified Found</h5>
                   <Link to='/classified-create'>
                    <div className="job_createBtn">
                        Create New Classified
                    </div>
                   </Link>
               </div>}
                {(latestClassified !==null && latestClassified.length>0) && latestClassified.slice(0,4).map((data)=>{
                    return(
                        <div className="connectWith_item">
                            <div className="item_content">
                            {data.thumb !==null && <div className="connectWith_left cursorPointer" onClick={(e)=>handleClassifiedDetails(data.uuid)}> <img src={`${baseUrl}/${data.thumb}`} alt={data.title} /></div>}
                            {data.thumb ===null && <div className="connectWith_left cursorPointer" onClick={(e)=>handleClassifiedDetails(data.uuid)}> <img src={noImage} alt={data.title} /></div>}
                            <div className="connectWith_right"> 
                               <div className="connector_name cursorPointer" onClick={(e)=>handleClassifiedDetails(data.uuid)}>{data.title}</div>
                               <div className="connectro_commuinity_name"><i><FontAwesomeIcon icon=      {faGroupArrowsRotate} /></i>{data.location}</div>

                               <div className="connectButtonGroup">
                                <div className="Connect_btn">{msDetails?.currency} {data.price}</div>
                                {data.bidding ===1 && <div className="Connect_btn" onClick={(e)=>handleClassifiedDetails(data.uuid)}> Bid Now </div>}
                            </div>
                            </div>
                            </div>
                        </div>
                    )
                })}
               {(latestClassified !==null && latestClassified.length>4) &&
                 <Link to="/classified"><div className="seeMore_btn"> Show More</div></Link>}
                 
           </div>
    </Fragment>
  );
};

export default LoungeLatestClassified;
