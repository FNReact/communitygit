import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { addUserUrl, allMembersUrl, baseUrl, userCheckUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { Avatar, Box, Button,  Grid, InputLabel, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import MainLoader from "../PageLoadEffects/MainLoader";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  })
);

const AddMemberBody = () => {
  const {msDetails} = useContext(UserContext);
  const [allMembers, setAllMembers] = useState(null);
  const [memberName, setMemberName] = useState();
  const [open, setOpen] = useState(false);

  const[email, setEmail] = useState('');
  const[name, setName] = useState('');
  const[userName,setUserName] = useState('');
  const[mobile,setMobile] = useState('');
  const[address,setAddress] = useState('');
  const[memberID,setMemberID] = useState('');
  const[coverImage,setCoverImage] = useState('');
  const[apartmentNumber, setApartmentNumber] = useState('')
  const [loaderEffect, setLoaderEffect] = useState(false)

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [checked2, setChecked2] = useState(false);
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //get all members
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
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    setLoaderEffect(true)
      axios.post(userCheckUrl,{
        email: email
      }).then((response)=>{
        setLoaderEffect(false)
        if(response.data[0]){
          var find =0;
          allMembers.forEach(element => {
          if(element.user.id === response.data[0].id){
                find =1
            }
          });
          if(find ===1){
            notifyError('User already added.')
          }else{
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
          }
        }else{
          // notifyError('User must be registered in iCircles.')
          let formData = new FormData();
          formData.append('microsite_id',msDetails.id)
        
          formData.append('status',2)
          formData.append('user_type','member')
          formData.append('requested_to','join')
          formData.append('email',email)
          formData.append('join_url', window.location.origin + "/invitation?s=new_user&m=" + msDetails.uuid+"&user_type=member"+"&email="+email)
          
          axios.post(addUserUrl,formData)
          .then((res)=>{
            setLoaderEffect(false)
            notifySuccess('Invitation sent successfully !.')
            setTimeout(()=>{
              window.location.href = '/member'
            },3000)
          })
          .catch((err)=>{notifyError();setLoaderEffect(false)})
        }
      }).catch((err)=>{setLoaderEffect(false)})
  }

  // add new user
  const  handleAddMember =()=>{
    setLoaderEffect(true)
    if(msDetails?.meta?.community_type ==='apartment'){
      if(apartmentNumber){
      let formData = new FormData();
      formData.append('microsite_id',msDetails.id)
      formData.append('user_id',memberID)
    
      formData.append('status',2)
      formData.append('user_type','member')
      formData.append('requested_to','join')
      formData.append('name',name)
      formData.append('email',email)
      formData.append('apartment_number', apartmentNumber);
      formData.append('join_url', window.location.origin + "/member-invitation?s=new_user&m=" + msDetails.uuid+"&user_type=member"+"&email="+email)
      
      axios.post(addUserUrl,formData)
      .then((res)=>{
        setLoaderEffect(false)
        notifySuccess('Invitation sent successfully !.')
        setTimeout(()=>{
          window.location.href = '/member'
        },3000)
      })
      .catch((err)=>{notifyError();setLoaderEffect(false)})
      }else{
        notifyError('Apartment number required')
      }
    }else{
      if(memberID){
        let formData = new FormData();
        formData.append('microsite_id',msDetails.id)
        formData.append('user_id',memberID)
      
        formData.append('status',2)
        formData.append('user_type','member')
        formData.append('requested_to','join')
        formData.append('name',name)
        formData.append('email',email)
        formData.append('join_url', window.location.origin + "/member-invitation?s=new_user&m=" + msDetails.uuid+"&user_type=member"+"&email="+email)
        
        axios.post(addUserUrl,formData)
        .then((res)=>{
          setLoaderEffect(false)
          notifySuccess('Invitation sent successfully !.')
          setTimeout(()=>{
            window.location.href = '/member'
          },3000)
        })
        .catch((err)=>{notifyError();setLoaderEffect(false)})
     }else{
      notifyError('Member not found')
     }
    }
  //  if(memberID){
  //     let formData = new FormData();
  //     formData.append('microsite_id',msDetails.id)
  //     formData.append('user_id',memberID)
    
  //     formData.append('status',2)
  //     formData.append('user_type','member')
  //     formData.append('requested_to','join')
  //     formData.append('name',name)
  //     formData.append('email',email)
  //     formData.append('apartment_number', apartmentNumber);
  //     formData.append('join_url', window.location.origin + "/member-invitation?s=new_user&m=" + msDetails.uuid+"&user_type=member"+"&email="+email)
      
  //     axios.post(addUserUrl,formData)
  //     .then((res)=>{
  //       setLoaderEffect(false)
  //       notifySuccess()
  //       setTimeout(()=>{
  //         window.location.href = '/member'
  //       },3000)
  //     })
  //     .catch((err)=>{notifyError();setLoaderEffect(false)})
  //  }
  }

  

  return (
    <Fragment>
       <div className="mamber_hedingSIde">
          <Box sx={{mt:3}} display='flex' justifyContent='center' justifyItems='center'  className="headingSection">
              Add new member
          </Box>
        </div>

 
        {!memberID &&
              <div className="MemberSearch_body">
                   <h4>Enter E-mail</h4>
                   <div className="memberSearch_wrapper">
                      <input type="text" placeholder="E-mail" className="form_contorl" onChange={(e)=>setEmail(e.target.value)} value={email} />
                       <i onClick={getEmail} ><SearchIcon/></i>
                   </div>
              </div>
              }

           {memberID && 
           <div className="addMember_card">
               <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box  sx={{ display: 'flex',  justifyContent: 'center', alignItems: 'center',  flexDirection: 'column'}}>
                      <Avatar  alt={name} src={`${baseUrl}/${coverImage}`} sx={{ width: 100, height: 100 }}/>
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box><TextField label="Name"  variant="filled" fullWidth  focused  value={name} disabled/></Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Box><TextField label="User Name"  variant="filled" fullWidth  focused  value={userName} disabled/></Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box><TextField label="E-mail"  variant="filled" fullWidth  focused value={email} disabled/></Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box><TextField label="Phone" variant="filled" fullWidth  focused value={mobile} disabled/></Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                {msDetails?.meta?.community_type ==='apartment' &&
                  <Box><TextField label="Apartment/Holding Number" multiline rows={1} variant="filled" fullWidth  focused value={apartmentNumber} onChange={(e)=>setApartmentNumber(e.target.value)} /></Box>
                }
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box><TextField label="Address" multiline rows={3} variant="filled" fullWidth  focused value={address} disabled/></Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box>
                    {email 
                    ? <Button fullWidth variant="contained" onClick={handleAddMember}>Add Now</Button>
                    : <Button fullWidth variant="contained" disabled>Add Now</Button>
                   }
                   
                  </Box>
                </Grid>
              </Grid> 
              
           </div>
          }
        {/* {loaderEffect === true && <MainLoader />} */}
      <ToastContainer />
    </Fragment>
  );
};

export default AddMemberBody;
