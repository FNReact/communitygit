import React, { Fragment, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import H1  from '../../asset/image/homeDesign.png'
import { addUserUrl, allMembersUrl, baseUrl, commonUserUrl, loginUrl, micrositeDetailsUrl, registerUrl, userCheckUrl, userMicrositesUrl } from "../../api/Api";
import axios from 'axios';
import { notifySuccess,notifyError } from "../../utils/Toast";
import { ToastContainer} from "react-toastify";
import { ThreeCircles } from  'react-loader-spinner'
import { UserContext } from "../../utils/UserContext";
import { useEffect } from "react";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Alert, Box, Button, Container, Grid, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneralTopNavigation from "../../pages/AuthenticationPages/GeneralTopNavigation";
import parse from 'html-react-parser'
const RegisterUserSearchBody = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {msDetails, userDetails} = useContext(UserContext)

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

  const [showJoin, setShowJoin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false)
  const [showCheck, setShowCheck] = useState(true)

  const [memberFind, setMemberFind] = useState(false)
  const [memberStatus, setMemberStatus] = useState(null)
  const [memberUuid, setMemberUuid] = useState('')
  const [loggedMemberStatus, setLoggedMemberStatus] = useState(null)

  const token = sessionStorage.getItem('token');

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

        if(token){
          var find =0;
          response.data.data.forEach(element => {
              if(element.user.id === userDetails.id){
                  find =1
                  setLoggedMemberStatus(element.status)
                  setMemberUuid(element.uuid)
                  }
              });
        }
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
                    setMemberStatus(element.status)
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

              if(token){
                setShowJoin(true)
                setShowLogin(false)
                setShowRegister(false)
                setShowCheck(false)
              }else{
                setShowJoin(false)
                setShowLogin(true)
                setShowRegister(false)
                setShowCheck(false)
              }
            }else{
              // notifyError('You are already member of this community');
              // setShowJoin(false)
              if(token){
                if(memberStatus===1){
                  setShowJoin(false)
                  setShowLogin(true)
                  setShowRegister(false)
                  setShowCheck(false)
                  window.location.href='/'
                }else{
                  notifyError('Your joining request is pending...',5000)
                }
              }else{
                setMemberFind(true)
                setShowJoin(false)
                setShowLogin(true)
                setShowRegister(false)
                setShowCheck(false)
              }
            }   
          }else{
            setActionEffectValue(false)
              setShowJoin(false)
              setShowLogin(false)
              setShowRegister(true)
              setShowCheck(false)
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
              setShowJoin(false)
              setShowLogin(true)
              setShowRegister(false)
              setShowCheck(false)
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
  const  handleAddMember =(memberID,email)=>{
    setActionEffectValue(true);
   if(memberID && checked===true){
      let formData = new FormData();
      formData.append('microsite_id',msDetails.id)
      formData.append('user_id',memberID)
      formData.append('email', email);
      formData.append('status', 0);
      formData.append('user_type', 'member');
      
      axios.post(addUserUrl,formData)
      .then((res)=>{
        setActionEffectValue(true);
        notifySuccess('Request sent successfully!')
        setTimeout(()=>{
          window.location.reload()
          setActionEffectValue(false);
        },100)
      })
      .catch((err)=>{notifyError('Invalid');setActionEffectValue(false);})
   }else{
    setActionEffectValue(false);
    notifyError('Agree first')
   }
  }

  //set user microsites
  const getAllUserMicrosites = (token) => {
    let config = {
      method: 'get',
      url: `${userMicrositesUrl}?type_id=9`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.request(config)
      .then((response) => {
        var ids = [];
        if(response?.data?.data.length>0){
          response?.data?.data.forEach(element => {
            if(element.status ===1){
              ids.push(element.microsites.id)
            }
          });
        }
        sessionStorage.setItem('user-ms-ids', JSON.stringify(ids))
        window.location.reload()
      }).catch((e)=>{
      }
      )
  }


   //login function
   const loginUser = e => {
    e.preventDefault();
    if(email && password){
      setActionEffectValue(true)
      axios
      .post(loginUrl, {
        email: email,
        password: password,
        device_name: 'desktop',
      })
      .then(function (response) {
          if (response.data.token) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('data', JSON.stringify(response.data.user))
           
            setActionEffectValue(false)
            if(memberFind ===true ){
              if(memberStatus===1){
                window.location.href='/'
              }else{
                notifyError('Your joining request is pending...')
              }
            }else{
              // setShowJoin(true)
              setShowLogin(false)
              // setShowRegister(false)
              // setShowCheck(false)
              getAllUserMicrosites(response.data.token)
              
            }
            // verifyUser(email)
        }
      }).catch((error)=>{
        if (error.response) {
          setActionEffectValue(false)
          if (error?.response?.data?.errors?.email) {
            notifyError("These credentials do not match our records.");
          }
          if (error?.response?.data?.errors?.message) {
            notifyError("Your account is not yet activated.");
          }
        }
      })
      
    }
  }

  // handle joinUser
  const handleJoinUser = (e)=>{ 
    handleAddMember(userDetails?.id, userDetails.email)
  }

  // handle accept inviation

  const handleAcceptInvitation = ()=>{
    if(checked===true){
      let data = new FormData();
      data.append('microsite_id', msDetails.id);
      data.append('user_id', userDetails.id);
      data.append('status', 1);
      data.append('user_type', 'member');

      let config = {
        method: 'post',
        url: `${commonUserUrl}/${memberUuid}`,
        data : data
      };

      axios.request(config)
      .then((response) => {
        window.location.href='/'
      })
      .catch((error) => {
        notifyError('Something went wrong')
      });
    }else{
      notifyError('Agree first')
    }
          
  }

  // handleLounge
const handleLounge = ()=>{
  
  let config = {
    method: 'get',
    url: `${micrositeDetailsUrl}/${msDetails.uuid}`,
  };

  axios.request(config)
  .then((response) => {
    sessionStorage.setItem('msDetails',JSON.stringify(response.data))
    setTimeout((e)=>{
     window.location.href = '/'
   },2000)

   
  }).catch((e)=> {
    notifyError('')
    setTimeout((e)=>{
      navigate('/')
    },2000)
})

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
                       <div className="registerBody">
                        {showCheck ===true && !token &&  
                        <form >
                           <h6>Join This Community</h6>
                          <Grid container spacing={1}>
                                <Grid item xs={12}>
                                   <div className="loginInput_filed emailBody">
                                   <input type="email" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)} className="form_control" name=""  placeholder="E-mail" />
                                   </div> 
                                </Grid>
                            </Grid>
                            <div className="get_emailBtn" onClick={(e)=> getEmail(e)}>
                                Check for iCircles Account
                            </div>
                        </form>}

                        {token&& loggedMemberStatus===0 &&
                          <Alert severity="info">Your request has been sent to admin for aproval. Your joining request is pending...</Alert>
                         }
                        {token&& loggedMemberStatus===2 &&
                          <Alert severity="info">You have invited to join this community.</Alert>
                         }
                        {token&& loggedMemberStatus===3 &&
                          <Alert severity="error">You are blocked on this community !</Alert>
                         }
                       
                        {token&& loggedMemberStatus===null  &&
                          <form >
                             <Grid item xs={12}>
                                  <div className="agrrementCheq">
                                        <input type="checkbox" className="chequeB" onClick={(e)=>{handleChange(e)}} /> Agree with terms and policy.
                                    </div>  
                              </Grid>
                              <div className="get_emailBtn" onClick={(e)=> handleJoinUser(e)}>
                                  Join Now
                              </div>
                          </form>
                         }
                        {token&& loggedMemberStatus===1  &&
                          <form >
                              <div className="get_emailBtn" onClick={(e)=> handleLounge()}>
                                 Visit Lounge
                              </div>
                          </form>
                         }
                        {token&& loggedMemberStatus===2  &&
                          <form >
                             <Grid item xs={12}>
                                  <div className="agrrementCheq">
                                        <input type="checkbox" className="chequeB" onClick={(e)=>{handleChange(e)}} /> Agree with terms and policy.
                                    </div>  
                              </Grid>
                              <div className="get_emailBtn" onClick={(e)=> handleAcceptInvitation(e)}>
                                  Accept Invitation
                              </div>
                          </form>
                         }
                       
                       
                         
                        {showLogin===true &&
                          <form >
                             <h6>Login iCircles</h6>
                            <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    <div className="loginInput_filed emailBody">
                                        <input type="email" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)} value={email} className="form_control" name=""  placeholder="iCircles E-mail" />
                                      <Box sx={{mt:1}}><input  type="password" onChange={(e)=>setPassword(e.target.value)} className="form_control" name=""  placeholder="iCircles Password" /></Box>
                                    </div> 
                                  </Grid>
                              </Grid>
                              <div className="get_emailBtn" onClick={(e)=> loginUser(e)}>
                                  Login
                              </div>
                          </form>
                         }
                        
                      

                        {/* Register User */}
                        {showRegister===true && 
                        <form >
                            <h6>Register</h6>
                            <Grid container spacing={2}>
                               <Grid item xs={12}> 
                                  <div className="loginInput_filed">
                                  <input type="email" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)} value={email} className="form_control" name=""  placeholder="E-mail" />
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
                        {showJoin===true &&   
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
                                {checked ===true ? <Link>{(actionEffectValue !==true)?<><Button className='get_emailBtn' onClick={(e)=>handleAddMember(memberID, email)}> Join Now</Button></>: ThreeDotLoaderEffect(actionEffectValue)}  </Link>
                                :
                                <Button className='get_emailBtn disabled' disabled> Join Now</Button>
                                }
                                 
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

export default RegisterUserSearchBody;
