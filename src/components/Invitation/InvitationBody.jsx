import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import H1  from '../../asset/image/homeDesign.png'
import { addUserUrl, allMembersUrl, baseUrl, micrositeDetailsUrl, registerUrl, userCheckUrl } from "../../api/Api";
import axios from 'axios';
import { notifySuccess,notifyError } from "../../utils/Toast";
import { ToastContainer} from "react-toastify";
import { ThreeCircles } from  'react-loader-spinner'
import { UserContext } from "../../utils/UserContext";
import { useEffect } from "react";
import { ThreeDotLoaderEffect } from "../PageLoadEffects";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneralTopNavigation from "../../pages/AuthenticationPages/GeneralTopNavigation";
import parse from 'html-react-parser'
const InvitationBody = ({msInfo,findEmail}) => {
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

  const [checked2, setChecked2] = useState(false);
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
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
   if(memberID && checked2===true){
      let formData = new FormData();
      formData.append('microsite_id',msDetails.id)
      formData.append('user_id',memberID)
      formData.append('user_type','member')
      formData.append('status',0)
      
      axios.post(addUserUrl,formData)
      .then((res)=>{
        setActionEffectValue(false);
        notifySuccess('Your request has been sent to admin for aproval..')
        setTimeout(()=>{
          window.location.href = '/home'
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
               <div className="invite_D_form">
                    <div className="invite_d_left">
                         {msDetails && <div className="commuinity_name">{msDetails.name}</div>}
                         {msDetails && msDetails.entity_logo !==null && <div className="Community_img ">
                            {msDetails && <img src={`${baseUrl}/${msDetails.entity_logo}`} alt={msDetails?.name} />}
                          </div>}
                          {msDetails && <div className="community_location"> <LocationOnIcon/> {msDetails?.location}</div> }
                          {msDetails && <div className="tag_line">{msDetails?.tagline?parse(msDetails?.tagline):''}</div> }
                          {msDetails && <p>{msDetails?.entity_details?parse(msDetails?.entity_details):''}</p>}
                          {msDetails && <> <div className="commnity_contactor"> Contact : {msDetails.entity_email} </div> </> }
                    </div>
                    <div className="invite_d_right">
                      <h6>Join This Community</h6>
                       <div className="registerBody">
                        {/* check email */}
                        {!name && !userName && showRegForm===0 && <form >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                   <div className="loginInput_filed emailBody">
                                   <input type="email" onKeyPress={(e) => e.key === 'Enter' && getEmail(e)} onChange={(e)=>setEmail(e.target.value)} className="form_control" name=""  placeholder="E-mail" value={email} />
                                   </div> 
                                </Grid>
                            </Grid>
                            {(actionEffectValue !==true)?<>
                            <div className="get_emailBtn" onClick={(e)=> getEmail(e)}>
                                Check
                            </div>
                            </>:ThreeDotLoaderEffect(actionEffectValue)}
                            
                        </form>}

                        {/* Register User */}
                        {showRegForm===1 && memberID ==='' && <form >
                            <Grid container spacing={2}>
                              
                               <Grid item xs={12} sx={{mt:2}}> 
                                  <div className="loginInput_filed">
                                     <input type="email" value={email} className="form_control" name="" placeholder="Email" disabled /> 
                                  </div>
                               </Grid>
                               <Grid item xs={12}> 
                                  <div className="loginInput_filed">
                                     <input type="text"  className="form_control" name="" placeholder="Name" onChange={(e)=>setName(e.target.value)} /> 
                                  </div>
                               </Grid>
                               <Grid item xs={12}>
                                  <div className="loginInput_filed">
                                      <input type="text"  className="form_control" name="" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)} /> 
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
                               <Grid item xs={12}>
                                    <div className="invite_check">
                                    <FormGroup>
                                          <FormControlLabel control={ <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>} label="Acknowledge that I agree for an iCircles account.(*)" />
                                        </FormGroup>
                                      <FormGroup>
                                          <FormControlLabel control={ <Checkbox checked={checked2} onChange={handleChange2} inputProps={{ 'aria-label': 'controlled' }}/>} label="I agree to the terms & conditions and privacy policy.(*)" />
                                        </FormGroup>
                                    </div>
                                </Grid>
                            </Grid>

                            {(actionEffectValue !==true)
                            ?<><div className="text-center">
                              {name !='' && email !='' && password ===confPassword && checked ===true && checked2===true
                                ? <Button sx={{ mt:2}} fullWidth variant="contained" onClick={(e)=> registerFunction(e)}>Create</Button >
                                : <Button sx={{ mt:2}} fullWidth variant="contained" disabled>Create</Button >
                              }
                              </div></>
                            :ThreeDotLoaderEffect(actionEffectValue)}
                            
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
                              <Grid item xs={12} sx={{mt:1}}>
                                <div className="loginInput_filed">
                                  <TextField label="Username" variant="filled" fullWidth focused value={userName} onChange={(e)=>setUserName(e.target.value)} />
                                </div>
                              </Grid>
                              <Grid item xs={12} sx={{mt:1}}> 
                                 <div className="loginInput_filed">
                                  <TextField label="E-mail" variant="filled" fullWidth focused value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                              </Grid>
                              <Grid item xs={12} sx={{mt:1}}>
                                    <div className="invite_check">
                                      <FormGroup>
                                          <FormControlLabel control={ <Checkbox checked={checked2} onChange={handleChange2} inputProps={{ 'aria-label': 'controlled' }}/>} label="I agree to the terms & conditions and privacy policy.(*)" />
                                        </FormGroup>
                                    </div>
                                </Grid>
                              <Grid item xs={12} sx={{mt:1}}>
                                 <Link>{(actionEffectValue !==true)
                                 ?<>
                                  <div className='get_emailBtn' onClick={handleAddMember}> Join Now</div>
                                  </>
                                 : ThreeDotLoaderEffect(actionEffectValue)}  </Link>
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

export default InvitationBody;
