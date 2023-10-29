import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import 'suneditor/dist/css/suneditor.min.css';

import Geocode from 'react-geocode';
import { GoogleApiKey } from "../../utils/GoogleApiKey";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";
import { commuinityUrl} from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { Button, Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import MainLoader from "../PageLoadEffects/MainLoader";

const CreatCommuinityForm = () => {
  Geocode.setApiKey(GoogleApiKey);
  const typeLocation = useLocation();
  const geolocation = useGeolocation();  
  const [communityName,setCommunityName] = useState("");
  const [tagline,setTagLine] = useState("");
  const [website,setWebsite] = useState("");
  const [address,setAddress] = useState("");
  const [email,setEmail] =useState("");
  const [phone,setPhone] =useState("");
  const [details, setDetails] = useState("")
  const [location, setLocation] = useState("");
  const [logo,setLogo] = useState("");
  const [logoPreview,setLogoPreview] = useState("");
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const [actionEffectValue,setActionEffectValue] = useState(false);
  const [checked, setChecked] = useState(false);

  const token = sessionStorage.getItem('token');


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
    // get address and location
    const getLocation = () => {
      if (geolocation.error) {
        alert(geolocation.error.message);
      } else {
        Geocode.fromLatLng(geolocation.latitude, geolocation.longitude).then(
          (response) => {
            setLatitude(geolocation.latitude)
            setLongitude(geolocation.longitude)
            const address = response.results[9].formatted_address;
            setLocation(address);
          },
          (error) => {
            // console.error(error);
          }
        );
      }
    };

    // preview logo
    const handleLogo = (e)=>{
      setLogoPreview(URL.createObjectURL(e.target.files[0]))
      setLogo(e.target.files[0]);
    }



  //Create new microsite
    const handleCreate = (e) =>{
      e.preventDefault();
      setActionEffectValue(true)
      let data = new FormData();
        data.append('name', communityName);
        data.append('subtype_id', 9);
        data.append('tagline', tagline);
        data.append('location', location);
        data.append('entity_email', email);
        data.append('entity_phone', phone);
        data.append('entity_logo', logo);
        data.append('entity_details', details);
        data.append('website', website);
        data.append('address', address);
        data.append('status', '1');
        data.append('latitude', latitude);
        data.append('longitude', longitude);

        if(typeLocation?.state !==null){
          data.append('community_type', typeLocation.state.type);
        }


        let config = {
          method: 'post',
          url: commuinityUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };

        if(checked ===true && communityName.length>=3){
          axios.request(config)
          .then((response) => {
            sessionStorage.setItem('msDetails',JSON.stringify(response.data.micorsite_details));
            notifySuccess();
            setCommunityName('');
            setTagLine('');
            setLocation('');
            setAddress('');
            setDetails('');
            setEmail('');
            setPhone('');
            setLogo('');
            setLogoPreview('');
            setDetails('');
            setActionEffectValue(false)
            // window.location.href = '/login';
            window.location.href = '/community-setup';
            
          })
          .catch((err)=>{
            setActionEffectValue(false)
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          })
        }else{
          setActionEffectValue(false)
          if(communityName.length<3){
            notifyError('Name must be greater than 3 characters')
          }else{
            notifyError('Agree first with our T&C')
          }
         
        }
    }  

  return (
    <Fragment>
        <div className="creatCommuinity_form_body">
             <div className="creatCommuinity_wrapper">
              {typeLocation?.state?.type ==='apartment' && <h5>Create Apartment Owner's Community</h5>}
              {typeLocation?.state?.type ==='business' && <h5>Create Business Community</h5>}
              {typeLocation?.state?.type ==='personal' && <h5>Create Personal Community</h5>}
              {typeLocation?.state?.type ==='housing' && <h5>Create Housing Community</h5>}
            {/* <h5>Create your {typeLocation?.state?.type} community</h5> */}
               <div className="creatCommuinity_wrap CreateForm_lg">
                  <form>
                        
                        <Grid container spacing={1}>
                          {typeLocation?.state?.type ==='personal' && <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="Community Name" onChange={(e)=>setCommunityName(e.target.value)} />
                          </Grid>}
                          {typeLocation?.state?.type ==='apartment' && <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="Apartment Building Name" onChange={(e)=>setCommunityName(e.target.value)} />
                          </Grid>}
                          {typeLocation?.state?.type ==='business' && <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="Business Name" onChange={(e)=>setCommunityName(e.target.value)} />
                          </Grid>}
                          {typeLocation?.state?.type ==='housing' && <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="House number" onChange={(e)=>setCommunityName(e.target.value)} />
                          </Grid>}
                          
                          <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="Website (If any)" onChange={(e)=>setWebsite(e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <input type="email" className="form_control"  placeholder="Email (For your community use)" onChange={(e)=>setEmail(e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                              <input type="phone" className="form_control"  placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} required />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                              <input type="tagline" className="form_control"  placeholder="Tagline (a short and striking or memorable phrase)" onChange={(e)=>setTagLine(e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                              <input type="text" className="form_control"  placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                              <textarea  type="text" className="form_control" onChange={(e)=>setDetails(e.target.value)}  placeholder="Type description"></textarea>
                          </Grid>
                          {!location && <Grid item xs={12}>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={getLocation} variant="outlined" startIcon={<LocationOnIcon/>}>
                                  Set location
                                </Button>
                              </Stack>
                            
                            </Grid>}
                         
                            <Grid item xs={12}>
                              <input type="text" value={location}  className="form_control"  placeholder="Location" onChange={(e)=>setLocation(e.target.value)} />
                            </Grid>
                         
                          {!logoPreview &&
                          <Grid item xs={12}> 
                            <form className="uploadBox" onChange={handleLogo}>
                              <h1>Upload  image</h1>
                              <input type="file" name="avatar" />
                            </form>                         
                           </Grid>}
                            {logoPreview &&  <Grid item xs={12}>
                             <div className="image_place_container">
                               <img src={logoPreview} width='50%' alt="" /> 
                               <div className="img_place_overly">
                               <div className="img_cross_btn" onClick={(e)=>{setLogoPreview('');setLogo('')}}>
                                  <CloseIcon/>
                               </div>
                               </div>
                             </div>
                            </Grid> }

                          {/* <FormControlLabel required control={<Checkbox checked={checked} /> } label="Agree with our T&C" /> */}

                          <div className="pass_left">
                              <input type="checkbox" className="chequeB" onChange={handleChange}/>
                              Agree with our Term & Conditions.
                          </div>
                          <Grid item xs={12} sx={{ mt:2 }}> 
                              <Link>{(actionEffectValue !==true)?(communityName && email && phone && checked===true)?<>
                              <Button variant="contained" fullWidth onClick={(e)=> handleCreate(e)}> Create Now</Button>
                              </>: <Button variant="contained" fullWidth disabled> Create Now</Button>: MainLoader(actionEffectValue)}  </Link>
                          </Grid>
                      </Grid>
                  </form>
                </div>
            </div>
        </div>
      <ToastContainer />
   </Fragment>
  );
};

export default CreatCommuinityForm;
