import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import H1  from '../../asset/image/homeDesign.png'
import { addUserUrl, allMembersUrl, baseUrl, commonUserUrl, micrositeDetailsUrl, registerUrl, userCheckUrl } from "../../api/Api";
import axios from 'axios';
import { notifySuccess,notifyError } from "../../utils/Toast";
import { ToastContainer} from "react-toastify";
import { ThreeCircles } from  'react-loader-spinner'
import { UserContext } from "../../utils/UserContext";
import { useEffect } from "react";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneralTopNavigation from "../../pages/AuthenticationPages/GeneralTopNavigation";
import parse from 'html-react-parser'
const InvitationMemberBody = ({msInfo,findEmail, userInfo}) => {
  const navigate = useNavigate();
  const msDetails = msInfo;


  

  const [email, setEmail] = useState(findEmail?findEmail:'');
  const [name, setName] = useState('');
  const [userName,setUserName] = useState('');
  const [mobile,setMobile] = useState('');
  const [address,setAddress] = useState('');
  const [memberID,setMemberID] = useState('');
  const [coverImage,setCoverImage] = useState(null);
  const [allMembers,setAllMembers] = useState('');
  const [password,setPassword] = useState('');
  const [confPassword,setConfPassword] = useState('');
  const [showRegForm,setRegForm] = useState(0);
  const [actionEffectValue,setActionEffectValue] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //get all members of a microsite
  const membersUrl = `${allMembersUrl}/${msDetails.id}`;
  const getAllMembers = ()=>{
    let config = {
      method: "get",
      url: membersUrl,
    };

    axios
      .request(config)
      .then((response) => {
        setAllMembers(response.data.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getAllMembers()
  }, []);



  // get email input
  const getEmail = (e)=>{
    e.preventDefault();
    setActionEffectValue(true);
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regex)) {
        axios.post(userCheckUrl,{
          email: email
        }).then((response)=>{
          if(response.data.length>0){
            setActionEffectValue(false)
            var find =0;
            allMembers.forEach(element => {
            
              if(element.user.id === response.data[0].id && element.status ===1){
                  find =1
                  }
              });
            if(find ===0){
              setMemberID(response.data[0].id)
              setName(response.data[0].name)
              setUserName(response.data[0].username)
              setCoverImage(response.data[0].avatar)
    
              if(response.data[0].meta.hasOwnProperty('mobile')){
              setMobile(response.data[0].meta.mobile)
              }
              if(response.data[0].meta.hasOwnProperty('present_address')){
                setAddress( response.data[0].meta.present_address)
              }
            }else{
              notifyError('You are already member of this community');
            }   
          }else{
            setActionEffectValue(false)
            setRegForm(1)
          }
      }).catch((err)=>{setActionEffectValue(false)})
    }else{
      setActionEffectValue(false)
      notifyError('Not a valid email')
    }
  }


    //Register function
    const registerFunction = () =>{
      setActionEffectValue(true);
      let data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('username', userName);
        data.append('password', password);
        data.append('password_confirmation', password);
  
        let config = {
          method: 'post',
          url: `${registerUrl}`,
          data : data
        };
  
        if(password === confPassword){
          axios.request(config)
          .then((response) => {
            setActionEffectValue(false);
            setMemberID(response.data.id);
          })
          .catch((error) => {
            if (error.response) {
              setActionEffectValue(false);
              if (error?.response?.data?.errors?.email) {
                notifyError("The Email has already been taken");
              }
              if (error?.response?.data?.errors?.username) {
                notifyError("The Username has already been taken");
              }
            }
          });
         
        }else{
          setActionEffectValue(false);
          notifyError('Password does not matched !');
        }
    }
  

  // add new user
  const  handleAddMember =()=>{
    setActionEffectValue(true);
    let data = new FormData();
    data.append('microsite_id', msDetails.id);
    data.append('user_id', userInfo.user_id);
    data.append('status', 1);
    data.append('user_type', 'member');
    

    let config = {
      method: 'post',
      url: `${commonUserUrl}/${userInfo.uuid}`,
      data : data
    };

    axios.request(config)
    .then((response) => {
      setActionEffectValue(false);
      // notifySuccess()
      sessionStorage.removeItem('backbutton')
      setTimeout(()=>{
        window.location.href='/'
      },1500)
    })
    .catch((err)=>{
      setActionEffectValue(false)
      if (err?.response) {
        notifyError(err?.response?.data?.message)
      }else{
        notifyError('Something went wrong!.')
      }
    })
  }


  return (
    <Fragment>
    <div className="homeMainContent">
          <GeneralTopNavigation back ={false} />   
               <div className="login_D_form">
                    <div className="login_d_left">
                         {msDetails && <div className="commuinity_name">{msDetails.name}</div>}
                         {msDetails && msDetails.entity_logo !==null && <div className="Community_img ">
                            {msDetails && <img src={`${baseUrl}/${msDetails.entity_logo}`} alt={msDetails?.name} />}
                          </div>}
                          {msDetails && <div className="community_location"> <LocationOnIcon/> {msDetails?.location}</div> }
                          {msDetails && <div className="tag_line">{msDetails?.tagline?parse(msDetails?.tagline):''}</div> }
                          {msDetails && <p>{msDetails?.entity_details?parse(msDetails?.entity_details):''}</p>}
                          {msDetails && <> <div className="commnity_contactor"> Contact : {msDetails.entity_email} </div> </> }
                    </div>
                    <div className="login_d_right">
                      <h6>Join This Community</h6>
                       <div className="registerBody">
                        {/* set details */}
                        {userInfo !==null &&   
                        <form >
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                 <Link>{(actionEffectValue !==true)?<><div className='get_emailBtn' onClick={handleAddMember}> Join Now</div></>: ThreeDotLoaderEffect(actionEffectValue)}  </Link>
                              </Grid>
                            </Grid>
                        </form>}
                      
                       </div>
                    </div>
               </div>
            </div>
        {/* Copyright text  */}
        <div className="copy_right">
          @All rights reserved & powered by iCircles LLC. 
        </div>
    <ToastContainer />
   </Fragment>
  );
};

export default InvitationMemberBody;
