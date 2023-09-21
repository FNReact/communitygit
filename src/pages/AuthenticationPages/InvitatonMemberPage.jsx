import React, { Fragment, useEffect, useState } from "react";
import RegisterBody from "../../components/RegisterBody/RegisterBody";
import { commonUserUrl, micrositeDetailsUrl, userCheckUrl } from "../../api/Api";
import axios from "axios";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
import InvitationBody from "../../components/Invitation/InvitationBody";
import InvitationMemberBody from "../../components/Invitation/InvitationMemberBody";

const InvitatonMemberPage = () => {
  const url = window.location.href;
  let params = new URLSearchParams(url);
    var msUuid = '';
       msUuid  = params.get("m");
    var user_type   = params.get("user_type");
    var getEmail   = params.get("email");


    const [loaderVisible, setLoaderVisible] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
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
      }).catch((e)=>{
        setLoaderVisible(false)
      })
    }

    useEffect(()=>{
        if(msUuid !==''){
          getMicrositeDetails(msUuid)
        }
    },[])




    
    useEffect(()=>{
        if(getEmail){
          setLoaderVisible(true)
          axios.post(userCheckUrl,{
            email: getEmail
          }).then((response)=>{
            if(response?.data[0]){
              setUserId(response?.data[0]?.id)
            }
        }).catch((err)=>{  setLoaderVisible(false)})
        }
    },[])



    useEffect(()=>{
      if(userId !=null){
        setLoaderVisible(true)
        let config = {
          method: 'get',
          url: `${commonUserUrl}/${userId}/${msInfo.id}`,
        };
        
        axios.request(config)
        .then((res) => {
          sessionStorage.setItem('backbutton', false)
          setUserInfo(res.data)
          setLoaderVisible(false)
        })
        .catch((error) => {
          setLoaderVisible(false)
        });
      }
    },[userId])



  return (
    <Fragment>
      {loaderVisible ===true && <MainLoader/>}
      {(msInfo !==null && userInfo !==null) &&  <InvitationMemberBody msInfo={msInfo} findEmail={getEmail} userInfo={userInfo}/>}
    </Fragment>
  );
};

export default InvitatonMemberPage;
