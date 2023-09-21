import React, { Fragment, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import H1  from '../../asset/image/homeDesign.png'
import { addUserUrl, allMembersUrl, baseUrl, micrositeDetailsUrl, registerUrl, userCheckUrl } from "../../api/Api";
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
const RegisterBody = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {msDetails} = useContext(UserContext)

  const [email, setEmail] = useState('');
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
  const [showJoin, setShowJoin] = useState(true)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //get all members of a microsite

  const getAllMembers = ()=>{
    const membersUrl = `${allMembersUrl}/${msDetails.id}`;
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
    if(msDetails?.id){
      getAllMembers()
    }
   
  }, []);



  // get email input
  const getEmail = (e)=>{
    e?.preventDefault();
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email !=='') {
      setActionEffectValue(true);
        axios.post(userCheckUrl,{
          email:email
        }).then((response)=>{
          if(response.data.length>0){
            setActionEffectValue(false)
            var find =0;
            allMembers.forEach(element => {
              if(element.user.id === response.data[0].id){
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
              // notifyError('You are already member of this community');
              setShowJoin(false)
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


  // method for user verifications

  const verifyUser = (email)=>{
    setActionEffectValue(true);
    axios.post(userCheckUrl,{
      email:email
    }).then((response)=>{
      if(response.data.length>0){
        setActionEffectValue(false)
        var find =0;
        allMembers.forEach(element => {
          if(element.user.id === response.data[0].id){
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
          // notifyError('You are already member of this community');
          setShowJoin(false)
        }   
      }else{
        setActionEffectValue(false)
        setRegForm(1)
      }
  }).catch((err)=>{setActionEffectValue(false)})
  }



  useEffect(()=>{
    const getData = sessionStorage.getItem('data')
    const token = sessionStorage.getItem('token')
    const parseData = JSON.parse(getData)
    if(parseData){
      axios.post(userCheckUrl,{
        email:parseData?.email
      }).then((response)=>{
        
        if(response.data.length>0){
          setActionEffectValue(false)
          var find =0;
          allMembers.forEach(element => {
            if(element.user.id === response.data[0].id){
                find =1
                }
            });
          if(find ===0){
            setMemberID(response.data[0].id)
            setName(response.data[0].name)
            setUserName(response.data[0].username)
            setCoverImage(response.data[0].avatar)
            setEmail(parseData?.email)
  
            if(response.data[0].meta.hasOwnProperty('mobile')){
            setMobile(response.data[0].meta.mobile)
            }
            if(response.data[0].meta.hasOwnProperty('present_address')){
              setAddress( response.data[0].meta.present_address)
            }
          }else{
            // notifyError('You are already member of this community');
            setShowJoin(false)
          }   
        }else{
          setActionEffectValue(false)
          setRegForm(1)
        }
    }).catch((err)=>{setActionEffectValue(false)})
     
    }
  })
  useEffect(()=>{
    if(location?.state?.email){
      axios.post(userCheckUrl,{
        email:location?.state?.email
      }).then((response)=>{
        
        if(response.data.length>0){
          setActionEffectValue(false)
          var find =0;
          allMembers.forEach(element => {
            if(element.user.id === response.data[0].id){
                find =1
                }
            });
          if(find ===0){
            setMemberID(response.data[0].id)
            setName(response.data[0].name)
            setUserName(response.data[0].username)
            setCoverImage(response.data[0].avatar)
            setEmail(location?.state?.email)
  
            if(response.data[0].meta.hasOwnProperty('mobile')){
            setMobile(response.data[0].meta.mobile)
            }
            if(response.data[0].meta.hasOwnProperty('present_address')){
              setAddress( response.data[0].meta.present_address)
            }
          }else{
            // notifyError('You are already member of this community');
            setShowJoin(false)
          }   
        }else{
          setActionEffectValue(false)
          setRegForm(1)
        }
    }).catch((err)=>{setActionEffectValue(false)})
     
    }
  })


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
   if(memberID && checked===true){
      let formData = new FormData();
      formData.append('microsite_id',msDetails.id)
      formData.append('user_id',memberID)
      
      axios.post(addUserUrl,formData)
      .then((res)=>{
        setActionEffectValue(false);
        notifySuccess()
        setTimeout(()=>{
          window.location.href = '/login'
        },3000)
      })
      .catch((err)=>{notifyError('Invalid');setActionEffectValue(false);})
   }else{
    setActionEffectValue(false);
    notifyError('Agree first')
   }
  }


  return (
    <Fragment>
    <div className="homeMainContent">
          <GeneralTopNavigation back ={true} />   
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
                      {showJoin===true? <h6>Join This Community</h6>: <h6>Visit This Community</h6>}
                     
                       <div className="registerBody">
                        {/* check email */}
                        {!name && !userName && showRegForm===0 && <form >
                          {showJoin ===true &&  <Grid container spacing={1}>
                                <Grid item xs={12}>
                                   <div className="loginInput_filed emailBody">
                                   <input type="email" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)} className="form_control" name=""  placeholder="E-mail" />
                                   </div> 
                                </Grid>
                            </Grid>}
                           
                            {(actionEffectValue !==true && showJoin===true)?<>
                            <div className="get_emailBtn" onClick={(e)=> getEmail(e)}>
                                Check
                            </div>
                            </>:ThreeDotLoaderEffect(actionEffectValue)}
                            {(actionEffectValue !==true && showJoin===false)?<>
                            <div className="get_emailBtn" onClick={(e)=> window.location.href='/'}>
                                Visit Now
                            </div>
                            </>:ThreeDotLoaderEffect(actionEffectValue)}
                            
                        </form>}

                        {/* Register User */}
                        {showRegForm===1 && memberID ==='' && <form >
                            <Grid container spacing={2}>
                              
                               <Grid item xs={12}> 
                                  <div className="loginInput_filed">
                                     <input type="email" value={email} className="form_control" name="" placeholder="Email" disabled /> 
                                  </div>
                               </Grid>
                               <Grid item xs={12}> 
                                  <div className="loginInput_filed">
                                     <input type="name"  className="form_control" name="" placeholder="Name" onChange={(e)=>setName(e.target.value)} /> 
                                  </div>
                               </Grid>
                               <Grid item xs={12}>
                                  <div className="loginInput_filed">
                                      <input type="userName"  className="form_control" name="" placeholder="UserName" onChange={(e)=>setUserName(e.target.value)} /> 
                                  </div>   
                               </Grid>
                               <Grid item xs={12}> 
                                 <div className="loginInput_filed">
                                   <input type="password"  className="form_control" name="" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                                 </div>
                               </Grid>
                               <Grid item xs={12}> 
                                 <div className="loginInput_filed">
                                    <input type="password"  className="form_control" name="" placeholder="Confirm Password" onChange={(e)=>setConfPassword(e.target.value)} />
                                 </div>
                               </Grid>
                            </Grid>

                            {(actionEffectValue !==true)?<><div className="text-center"><Button sx={{ mt:2}} fullWidth variant="contained" onClick={(e)=> registerFunction(e)}>Create</Button ></div></>:ThreeDotLoaderEffect(actionEffectValue)}
                            
                        </form>}
                       

                        {/* set details */}
                        {memberID !=='' &&   
                        <form >
                          {coverImage !==null &&  <div className="coverImg"><img src={`${baseUrl}/${coverImage}`} alt={name} /></div>}
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <div className="loginInput_filed">
                                  <TextField label="Name" variant="filled" fullWidth focused value={name} onChange={(e)=>setName(e.target.value)}  />
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <div className="loginInput_filed">
                                  <TextField label="Username" variant="filled" fullWidth focused value={userName} onChange={(e)=>setUserName(e.target.value)} />
                                </div>
                              </Grid>
                              <Grid item xs={12}> 
                                 <div className="loginInput_filed">
                                  <TextField label="E-mail" variant="filled" fullWidth focused value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                  <div className="agrrementCheq">
                                        <input type="checkbox" className="chequeB" onClick={(e)=>{handleChange(e)}} /> Agree with terms and policy.
                                    </div>  
                              </Grid>
                              
                             
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

export default RegisterBody;
