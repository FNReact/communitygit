import React, { Fragment, useContext, useEffect, useState} from "react";
import { UserContext } from "../utils/UserContext";
import LoungePage from "./LoungePages/LoungePage";
import { commonUserUrl } from "../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utils/Toast";

const HomePage = () => {
  const navigate = useNavigate();
  const {msDetails} = useContext(UserContext)
  const getUserInfo = sessionStorage?.getItem('loggedInUserInfo')
  const storeUserDetailsParse = JSON?.parse(getUserInfo)
  const [state, setState] = useState(true)
  const getUrl = window.location.href;
  const segNamae = getUrl.split("/").pop();

  useEffect(()=>{
    
    if(storeUserDetailsParse?.status ===2 && segNamae !=='newCommuinity' && segNamae !=='community-packeges'){

     notifyError('Your membership confirmation is waiting for pending aproval!.Please accept invitation!')
     setTimeout(()=>{
       navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:2,reload:true}})
     },100)
    }
    if(storeUserDetailsParse?.status ===3 && segNamae !=='newCommuinity' && segNamae !=='community-packeges'){
     notifyError('You are blocked from this community!')
     setTimeout(()=>{
        navigate('/commuinityList')
     },100)
    }
    
  },[])

  useEffect(()=>{
    if(storeUserDetailsParse?.status ===1 && storeUserDetailsParse?.user_details){
      const parseData = JSON.parse(storeUserDetailsParse?.user_details)
      if(!parseData?.name){
        window.location.href='/complete-profile'
      }
    }
  },[getUserInfo,storeUserDetailsParse])

  return (
    <Fragment>
      <LoungePage />
    </Fragment>
  );
};
export default HomePage;
