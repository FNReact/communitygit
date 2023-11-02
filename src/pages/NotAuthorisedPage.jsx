import React, { Fragment, useContext, useEffect, useState} from "react";
import { UserContext } from "../utils/UserContext";
import LoungePage from "./LoungePages/LoungePage";
import { commonUserUrl } from "../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils/Toast";

const NotAuthorisedPage = () => {
  const navigate = useNavigate();
  const {msDetails} = useContext(UserContext)
  const getUserInfo = sessionStorage?.getItem('loggedInUserInfo')
  const storeUserDetailsParse = JSON?.parse(getUserInfo)
  const [state, setState] = useState(true)

  useEffect(()=>{
    
    if(storeUserDetailsParse?.status ===2){
      console.log('hit from not authorised page')
     notifyError('Your membership confirmation is waiting for pending aproval!.Please accept invitation!')
     setTimeout(()=>{
       navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:2,reload:true}})
     },100)
    }
    if(storeUserDetailsParse?.status ===3){
     notifyError('You are blocked from this community!')
     setTimeout(()=>{
        navigate('/commuinityList')
     },100)
    }
    if(storeUserDetailsParse?.status ===1 && storeUserDetailsParse?.user_details){
      const parseData = JSON.parse(storeUserDetailsParse?.user_details)
      if(!parseData?.name){
        window.location.href='/complete-profile'
      }
    }
  },[])

  return (
    <Fragment>
      {/* <LoungePage /> */}
      <div>Not Authorised page</div>
    </Fragment>
  );
};
export default NotAuthorisedPage;
