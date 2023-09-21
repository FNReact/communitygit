import React, { Fragment, useEffect, useState } from "react";
import RegisterBody from "../../components/RegisterBody/RegisterBody";
import { micrositeDetailsUrl } from "../../api/Api";
import axios from "axios";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import InvitationBody from "../../components/Invitation/InvitationBody";

const InvitatonPage = () => {
  const url = window.location.href;
  let params = new URLSearchParams(url);
    var msUuid = '';
       msUuid  = params.get("m");
    var user_type   = params.get("user_type");
    var getEmail   = params.get("email");


    const [loaderVisible, setLoaderVisible] = useState(false)
    const token = sessionStorage.getItem('token')
    const [msInfo, setMsInfo] = useState(null)
    const getMicrositeDetails = (getUuid)=>{
      setLoaderVisible(true)
      let config = {
        method: 'get',
        url: `${micrositeDetailsUrl}/${getUuid}`,
      };

      axios.request(config)
      .then((response) => {
        sessionStorage.setItem('msDetails',JSON.stringify(response.data))
        setMsInfo(response.data)
        setLoaderVisible(false)
        if(!token){
          window.location.href='/register-user-search'
        }
      }).catch((e)=>{
        setLoaderVisible(false)
      })
    }

    useEffect(()=>{
        if(msUuid !==''){
          getMicrositeDetails(msUuid)
        }
    },[])
  return (
    <Fragment>
      {loaderVisible ===true && <MainLoader/>}
      {msInfo !==null &&  <InvitationBody msInfo={msInfo} findEmail={getEmail}/>}
    </Fragment>
  );
};

export default InvitatonPage;
