import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import mamberImg from "../../asset/image/noticeSideC.png";
import eventImg from "../../asset/image/noticeSideE.png";
import resources from "../../asset/image/noticeSideG.png";
import resourceImg from "../../asset/image/resourceSide.png";
import jobImage from "../../asset/image/jobSideH.png";
import representiveS from "../../asset/image/representiveSide.png";
import folder from "../../asset/image/folder.png";
import localRepresentetiveImg from "../../asset/image/representetive.png";
import coupleImg from "../../asset/image/couple.png";
import magazineImg from "../../asset/image/magazine.png";


import coverImage from "../../asset/image/cover.jpeg";
import { UserContext } from "../../utils/UserContext";
import newsfeed from "../../asset/image/newsfeed.png";
import Avatar from "../../asset/image/avatar.jpg";
import { ShimmerSectionHeader } from "react-shimmer-effects";
import { baseUrl, commonUserUrl } from "../../api/Api";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { notifyError } from "../../utils/Toast";
const LeftSideBar = () => {
  const navigate = useNavigate()
  const {userDetails,msDetails} = useContext(UserContext);
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [cover, setCover] = useState();
  const [loader, setLoader] = useState("profile-Loader");

  const getUrl = window.location.href;
  const segNamae = getUrl.split("/").pop();

  useEffect(() => {
    if (userDetails !== null) {
      setLoader("profile-Loader d-none");
    }
  }, []);

    //get details
    const getMicrositeDetails = ()=>{
      let config = {
          method: 'get',
          url: `${commonUserUrl}/${userDetails?.id}/${msDetails?.id}`,
        };
        axios.request(config)
        .then((res) => {

          if(res?.data && res?.data?.status ===2){
            notifyError('You ware invited please accept invitation first')
            setTimeout(()=>{
              navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:2, reload:true}})
            },2000)
          }
          if(res?.data && res?.data?.status ===3){
            notifyError('You are blocked on this community')
            setTimeout(()=>{
              navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:3,reload:true}})
            },2000)
          }
          if(res?.data && res?.data?.status ===0){
            notifyError('Your joining status is pending...')
            setTimeout(()=>{
              navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:0,reload:true}})
            },2000)
          }

          if(res?.data && res?.data?.status ===1){
            sessionStorage.setItem('loggedInUserInfo', JSON.stringify(res?.data))
            const storeData = res?.data?.user_details
            const storeMeta = res?.data?.meta
            if(storeData){
             const info = JSON.parse(storeData)
             const meta = JSON.parse(storeMeta)
   
             if(info?.name){
               setName(info?.name);
             }else{
               setName(res?.data?.user?.name);
             }
            if(info?.avater){
              setAvatar(info?.avater);
            }else{
              setAvatar(userDetails?.profile?.avatar);
            }
            if(meta?.banner){
              setCover(meta?.banner)
            }else{
              setCover(userDetails?.profile?.cover);
            }
            }
          }

        
        }).catch((e)=>  {
          notifyError('Your are not member of this comminity join first.')
            setTimeout(()=>{
              navigate('/community-info-public', {state:{uuid:msDetails.uuid, memberStatus:-1,reload:true}})
            },1500)
         })
  }

  useEffect(()=>{
    if(segNamae !=='newCommuinity'){
      getMicrositeDetails()
    }
    if(userDetails){
      setName(userDetails?.profile?.name);
    }
    
  },[])

  useEffect(()=>{
    const getData = sessionStorage.getItem('loggedInUserInfo')
    if(!getData && msDetails && userDetails){
      setName(userDetails?.profile?.name);
      setAvatar(userDetails?.profile?.avatar);
    }
  },[])




  return (
    <Fragment>
      <div className="main_c p-relative">
        <div className="side-menu">
          <div className="side_wrapper">
          <div className="profile_main">
            <div className="cover_photo">
              {
                //Cover
                (cover !==undefined && cover !==null) ? (
                  <div className="profile_img">
                    <img src={`${baseUrl}/${cover}`} alt={name} />
                  </div>
                ) : (
                  <>
                  <div className="leftsideCover">
                    {/* <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'cover'}})}><EditIcon className="cursorPointer"/></i> */}
                    <div className="profile_img">
                      <img src={`${coverImage}`} alt={name} />
                    </div>
                  </div>
                  </>
                 
                )
              }
            </div>
            <div className="profilr_debox">
              <div className="followers_Box"></div>
              <div className="image_container">
                {
                  //Avatar
                 ( avatar !==undefined && avatar !==null) ? (
                    <div className="profile_img">
                      <img src={`${baseUrl}/${avatar}`} alt={name} />
                    </div>
                  ) : (
                    <div className="profile_img">
                      <img src={Avatar} alt={name} />
                    </div>
                  )
                }
              </div>

              <div className="followers_Box"></div>
            </div>

            <div className="user_control">
              {userDetails ===null &&  <div className='profile-Loader'>
                <ShimmerSectionHeader center />
              </div>}
             

              <div className="user_name">
                <a>
                  {name}
                </a>
                <i onClick={(e)=> navigate('/community-profile/update',{state:{type:'name'}})}><EditIcon/></i>
              </div>
              {/* <div className="user_profile_name"> @{username}</div> */}
              {/* <div className="user_shortDiscription">{email}</div> */}
              <div className="profileBtn">
                {/* <a href={`${baseUrl}/persons/${userDetails.uuid}`} target="_blank">
                   Profile
                </a> */}
                <a onClick={(e)=> navigate('/community-profile',{state:{showInfo:true}})}>Community Profile</a>
              </div>
            </div>
          </div>
          <div className="sidebar_list">
            <ul> 
                <Link to="/member">
                   <li>
                     <span><img src={mamberImg} alt="" /></span>
                     <span>Member</span>
                  </li>
                </Link>

                <a className="cursorPointer">
                    <li onClick={(e)=> navigate('/community-profile',{state:{showInfo:false}})}>
                       <span> <img src={newsfeed} alt="" /></span>
                       <span>My Posts</span>
                   </li>
                </a>
                <Link to="/my-job-list">
                   <li>
                       <span> <img src={jobImage} alt="" /></span>
                       <span>Jobs</span>
                   </li>
                </Link>
                <Link to="/event">
                   <li>
                       <span> <img src={eventImg} alt="" /></span>
                       <span>Event</span>
                   </li>
                </Link>
                <Link to="/resource">
                   <li>
                       <span> <img src={resources} alt="" /></span>
                       <span>Resources</span>
                   </li>
                </Link>
                
                <Link to="/media">
                   <li>
                       <span> <img src={folder} alt="" /></span>
                       <span>Media</span>
                   </li>
                </Link>
                <Link to="myClassified">
                  <li>
                      <span><img src={resourceImg} alt="" /></span>
                      <span>Classifieds</span>
                  </li>
                </Link>
                <Link to="/localBusiness">
                   <li>
                       <span> <img src={representiveS} alt="" /></span>
                       <span>Community Business</span>
                   </li>
                </Link>
                <Link to="/local-representatives">
                   <li>
                       <span> <img src={localRepresentetiveImg} alt="" /></span>
                       <span>Local Representative</span>
                   </li>
                </Link>
                <Link to="/matrimonial">
                   <li>
                       <span> <img src={coupleImg} alt="" /></span>
                       <span>Matrimonial Center</span>
                   </li>
                </Link>
                <Link to="/magazine">
                   <li>
                       <span> <img src={magazineImg} alt="" /></span>
                       <span>Community Magazine</span>
                   </li>
                </Link>
            </ul>
          </div>
          <div className="Commuinity_Detail">
            <ul>
              <li>Privecy & Terms </li>
              <li>Help</li>
               {/* <a href="https://icircles.app/" target="_blank" ><li>Powered By icircles.app</li></a> */}
               <li><a href="https://icircles.app/" target="_blank"> Powered By <img src="https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png" width='20%'/></a></li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LeftSideBar;
