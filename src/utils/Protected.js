import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props)=>{
    const{Component} = props;
    const navigate = useNavigate();
    const url = window.location.href;
    // let url = `https://example.com?&u=e47f1237-2f17-449f-b4da-82d94fe52445&t=1135|D5MPogmB0fr41T36qhlPmAKRxVdwQNd5cdxowlDm`;
    // console.log(params.get("u")); // "value1"
    // console.log(params.get("t")); // "value2"

    let params = new URLSearchParams(url);
    var urlToken  = params.get("t");
    var urlUuid   = params.get("u");

    useEffect(()=>{
        let token  = sessionStorage.getItem('token');
        let msDetails = sessionStorage.getItem('msDetails')
        let loggedInUser = sessionStorage.getItem('loggedInUserInfo')
        let userDetails = sessionStorage.getItem('data')
        if(!urlToken && !urlUuid && !token && !msDetails && !userDetails){
            window.location.href =  '/home'
        }
        if(!urlToken && !urlUuid && msDetails && !token){
          window.location.href =  '/login'
        }
    });

    return(
        <Fragment>
            <Component />
        </Fragment>
    )

}

export default Protected;