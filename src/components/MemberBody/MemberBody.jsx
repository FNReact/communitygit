import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { addUserUrl, allMembersUrl, baseUrl, commonUserUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import { MemberLoadEffect } from "../PageLoadEffects";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import Avatar from "../../asset/image/avatar.png";
import ic from "../../asset/image/ic.png";
import RememberMeIcon from '@mui/icons-material/RememberMe';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MainLoader from "../PageLoadEffects/MainLoader";


const MemberBody = () => {
  const navigate = useNavigate();
  // drop down  start
  const token = sessionStorage.getItem('token');

  // Drop Down End
  const {msDetails, userDetails} = useContext(UserContext);
  const [allMembers, setAllMembers] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loaderEffect, setLoaderEffect] = useState(false)
  const [info, setInfo] = useState(null)

  const [isCopied, setIsCopied] = useState(false);

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(
      window.location.origin + "/invitation?s=new_user&m=" + msDetails.uuid+"&user_type=member"
    );
    setIsCopied(true);
  }


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
        if(response.data.data.length>0){
          response.data.data.forEach(data => {
            
            var objLength = Object.keys(data.user_details).length;
                  if(objLength>2){
                    var userOwnerDetails =  JSON.parse(data.user_details)
                    if(userOwnerDetails.owner==='yes'){
                      setAdminId(data.user_id)
                    }
                  }
          });
        }

      })
      .catch((error) => {});
  }
  useEffect(() => {
    getAllMembers()
  }, []);


// handle activate/deactive member
  const handleMemberActive = (userId, uuid,getStatus,role)=>{
    
    Swal.fire({
      heightAuto: false,
      backdrop: false,
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      
      if (result.isConfirmed) {
            setLoaderEffect(true)
            let data = new FormData();
            data.append('microsite_id', msDetails.id);
            data.append('user_id', userId);
            data.append('status', getStatus);

            if(role !==null){
              data.append('user_type', role);
            }

            let config = {
              method: 'post',
              url: `${commonUserUrl}/${uuid}`,
              data : data
            };

            axios.request(config)
            .then((response) => {
              setLoaderEffect(false)
              notifySuccess()
              getAllMembers();
            })
            .catch((error) => {
              setLoaderEffect(false)
              notifyError('Something went wrong')
            });
      }else{
        setLoaderEffect(false)
      }
    });  
  }

  const handleRemoveMember = (uuid) =>{
    setLoaderEffect(true)
    let config = {
      method: 'delete',
      url: `${addUserUrl}/${uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setLoaderEffect(false)
      getAllMembers();
    })
    .catch((error) => {
      setLoaderEffect(false)
      notifyError('Something went wrong')
    });
  }


  // handle input search

  const handleInputSearch = (e)=>{
      if(e.target.value === ''){
        getAllMembers();
      }else{
        setSearchValue(e.target.value)
      }
  }


  // Handle search members
  const handleSearch = (e)=>{
    e.preventDefault();
    let config = {
      method: 'get',
      url: `${allMembersUrl}/${msDetails.id}?user_type=member&keyword=${searchValue}`,
    };
    
    axios.request(config)
    .then((response) => {
      var serachMembers = []
      if(response.data.data.length>0){
        response.data.data.forEach(element => {
          if(element.microsite_id ===msDetails.id && (element.user_type==='member' || element.user_type==='admin')){
            serachMembers.push(element)
          }
        });
        
      }
      setAllMembers(serachMembers)
    })
    .catch((error) => {
    });
  }

  // get current loggedin userinfo

  useEffect(()=>{
    const currentData = sessionStorage.getItem('loggedInUserInfo')
    const infoUser = JSON.parse(currentData)
    if(infoUser){
      setInfo(infoUser)
    }
  },[])



  return (
    <Fragment>
      <div className="mamber_hedingSIde">
          <div className="headingSection"> <span onClick={(e)=>{navigate(-1)}}><ArrowBackIcon/></span>  Member List</div>
          <div className="mamber_hedingSide_right">
            <Button
                sx={{mr:3}}
                variant="contained"
                onClick={copyLinkToClipboard}
              >
                {isCopied
                  ? "Link copied! for invitation"
                  : "Copy link for invitation"}
              </Button>
              <Link to="/add-member" className="addMamber_btn"> <AddIcon/> Add Member</Link>
              <form onSubmit={handleSearch}>
                <div className="search_box">
                  <input type="text" placeholder="Search" className="form_control" onChange={(e)=> handleInputSearch(e)} />
                  <SearchIcon onClick={(e)=>handleSearch(e)}/>
                </div> 
              </form>
             
          </div>
        </div>
        {allMembers !==null && allMembers.length ===0 && <Box sx={{display:'flex', justifyContent:'center', justifyItems:'center', mt:5}} disabled>
          <Button disabled>Result not found...</Button>
        </Box>}
        <div className="mamber">
          <div className="mamber_wrapper">
          {allMembers === null && <>{MemberLoadEffect()}</>}
            <Grid container spacing={2}>
            {allMembers !==null &&
                allMembers.map((data, key) => {
                  var objLength = Object.keys(data?.user_details)?.length;
                  var owner = false;
                  if(objLength>2){
                    var userOwnerDetails =  JSON.parse(data?.user_details)
                    if(userOwnerDetails.owner==='yes'){
                      owner = true
                    }
                    if(data?.user_type ==='admin'){
                      owner = true
                    }
                  }
                  return (
                    <>
                    {(info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) ?
                    <Grid item lg={3} md={4} sm={4}  xs={6} key={data?.uuid}>
                        <div className="memberItem">

                        <div className="user_info">
                           <div className="user_img">
                            {(userDetails?.avater)?<>
                              {(userDetails?.avater )?<img src={`${baseUrl}/${userDetails?.avater}`} alt={data?.user?.name} />
                                :<img src={Avatar} alt=""/>
                                }
                            </>:<>
                              {(data?.user?.avatar !==null)?<img src={`${baseUrl}/${data?.user?.avatar}`} alt={data?.user?.name} />
                              :<img src={Avatar} alt="" />
                              }
                            </> }
                           
                           </div>
                           <div className="user_name">
                            {data?.user?.name?.length<17? <>{data?.user?.name}</>:<>{data?.user?.name?.slice(0,17)}..</>}
                           </div>
                           <div className="join_date">
                             Joined date : {new Date(data?.created_at)?.toLocaleDateString()}
                           </div>
                        </div>
                        <div className="icon_list">
                          <a onClick={(e)=>navigate('/community-profile/other',{state:{uuid:data?.user?.uuid,userId:data?.user?.id,userData:data?.user}})}>
                          <Tooltip title="Commuinity Profile">
                              <div className="icon">
                                  <PersonIcon/>
                              </div>
                           </Tooltip>
                          </a>
                           
                           <a href={`${baseUrl}/person/${data?.user?.uuid}`} target="_blank"> 
                           <Tooltip title="Webcard">
                           <div className="icon">
                                <RememberMeIcon/>
                           </div>
                           </Tooltip>
                           </a>

                           <a href={`${baseUrl}/persons/${data?.user?.uuid}`} target="_blank">
                           
                           <Tooltip title="iCircles Profile">
                              <div className="icon">
                                  <img src={ic} alt="" />
                              </div>
                            </Tooltip>
                          </a>
                           
                           
                        </div>
                        

                        <div>
                           <div className="memberCard_footer">
                              <div className="memberCard_footer_left">
                                 {((info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && data?.user_id===msDetails.user_id && data?.status ===1) && <div className="owner_member">
                                      {'Admin'}
                                  </div>}
                                 {((info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && data?.user_type!=='admin' && data?.user_id!==msDetails.user_id && data?.status ===1) && <div className="owner_member">
                                      {'member'}
                                  </div>}
                                 {((info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && data?.user_type==='admin' && data?.user_id!==msDetails.user_id && data?.status ===1) && <div className="owner_member">
                                      {'Admin'}
                                  </div>}
                                
                               
                                 {((info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && data?.status ===2) && <div className="owner_member">
                                      {'Invited'}
                                  </div>}
                                 {((info?.user_type ==='admin' || userDetails?.id===msDetails.user_id) && data?.status ===3) && <div className="owner_member">
                                      {'Blocked'}
                                  </div>}
                                
                                  {(owner ===false && data?.status ===0) && 
                                  <span>
                                    {(info?.user_type ==='admin' || userDetails?.id===msDetails.user_id)? <div className="memberApproved_btn"> <Button fullWidth variant="contained" onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'member')} >Approve Now </Button> 
                                    </div> :
                                      <Tooltip title="Only admin can approved">
                                        <div className="memberApproved_btn">
                                            <Button fullWidth variant="contained"  disabled>Not Approve</Button>
                                          </div>
                                      </Tooltip>
                                       }
                                  </span> }
                              </div>
                              {(info?.user_type ==='admin' || userDetails?.id===msDetails.user_id)&&
                              <div className="memberCard_footer_right">
                               {data?.user_id !==adminId  && <div className="memeber_dropDown">
                                     <MoreVertIcon/>
                                 </div>}
                                
                                 <div className="member_dropdown_Plate">
                                     <ul>
                                     {(data?.user_type==='member' && data?.status===1) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,3,'member')}>Block User</li>}
                                     {(data?.user_type==='user' && data?.status===1) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,3,'member')}>Block User</li>}

                                     {(data?.user_type==='member' && data?.status===3) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'member')}>UnBlock User</li>}
                                     {(data?.user_type==='user' && data?.status===3) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'member')}>UnBlock User</li>}

                                     {(data?.user_type==='admin' && data?.status===1) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'member')}>Remove Admin</li>}

                                     {(data?.user_type==='member' && data?.status===1) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'admin')}>Make Admin</li>}
                                     {(data?.user_type==='user' && data?.status===1) &&  <li onClick={(e)=>handleMemberActive(data?.user_id,data?.uuid,1,'admin')}>Make Admin</li>}

                                     {(data?.user_type==='member' && data?.status===1)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove User</li>}
                                     {(data?.user_type==='user' && data?.status===1)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove User</li>}

                                     {(data?.user_type==='member' && data?.status===0)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove User</li>}
                                     {(data?.user_type==='user' && data?.status===0)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove User</li>}

                                     {(data?.user_type==='member' && data?.status===2)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove Invitation</li>}
                                     {(data?.user_type==='user' && data?.status===2)  &&  <li onClick={(e)=>handleRemoveMember(data?.uuid)} >Remove Invitation</li>}
                                     </ul>
                                 </div>
                              </div>
                              }
                           </div>
                        </div>
                        
                        </div>
                      </Grid>
                     :
                     <>
                     {data?.status ===1 &&   <Grid item lg={3} md={4} sm={4}  xs={6} key={data?.uuid}>
                        <div className="memberItem">

                        <div className="user_info">
                           <div className="user_img">
                            {(userDetails?.avater)?<>
                              {(userDetails?.avater )?<img src={`${baseUrl}/${userDetails?.avater}`} alt={data?.user?.name} />
                                :<img src={Avatar} alt=""/>
                                }
                            </>:<>
                              {(data?.user?.avatar !==null)?<img src={`${baseUrl}/${data?.user?.avatar}`} alt={data?.user?.name} />
                              :<img src={Avatar} alt=""/>
                              }
                            </> }
                           
                           </div>
                           <div className="user_name">
                            {data?.user?.name?.length<17? <>{data?.user?.name}</>:<>{data?.user?.name?.slice(0,17)}..</>}
                           </div>
                           <div className="join_date">
                             Joined date : {new Date(data?.created_at)?.toLocaleDateString()}
                           </div>
                        </div>
                        <div className="icon_list">
                          <a onClick={(e)=>navigate('/community-profile/other',{state:{uuid:data?.user?.uuid,userId:data?.user?.id,userData:data?.user}})}>
                          <Tooltip title="Commuinity Profile">
                              <div className="icon">
                                  <PersonIcon/>
                              </div>
                           </Tooltip>
                          </a>
                           
                           <a href={`${baseUrl}/person/${data?.user?.uuid}`} target="_blank"> 
                           <Tooltip title="Webcard">
                           <div className="icon">
                                <RememberMeIcon/>
                           </div>
                           </Tooltip>
                           </a>

                           <a href={`${baseUrl}/persons/${data?.user?.uuid}`} target="_blank">
                           
                           <Tooltip title="iCircles Profile">
                              <div className="icon">
                                  <img src={ic} alt="" />
                              </div>
                            </Tooltip>
                          </a>
                         

                         
                        </div>
                        {info?.user_id  === data?.user_id &&  <Box display="flex" justifyContent="center" alignItems='center' sx={{mt:2}} >
                          <Button  variant="contained" onClick={(e)=>handleRemoveMember(data?.uuid)} >Leave</Button>
                        </Box>}
                        </div>
                      </Grid>}
                   
                     </>

                     }
                    
                    </>
                  );
                }
                )}
            </Grid>

                              
            {loaderEffect === true && <MainLoader />}
          </div>
        </div>
      <ToastContainer />
    </Fragment>
  );
};

export default MemberBody;
