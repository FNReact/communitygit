import {
    faLocationDot,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { Fragment, useContext, useEffect } from "react";
  import { useState } from "react";
  import LoungeProfileBio from "../LoungeProfileBio/LoungeProfileBio";
  import LoungeItemContent from "../LoungeItemContent/LoungeItemContent";
  import PhotoIcon from '@mui/icons-material/Photo';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import LocationOnIcon from '@mui/icons-material/LocationOn';
  import {
    BigPlayButton,
    ControlBar,
    ForwardControl,
    Player,
  } from "video-react";
  
  import {
    allMembersUrl,
    baseUrl,
    createFeedsUrl,
  } from "../../api/Api";
  import axios from "axios";
  import useGeolocation from "react-hook-geolocation";
  import Dragger from "antd/es/upload/Dragger";
  import { notifySuccess, notifyError } from "../../utils/Toast";
  import { ToastContainer } from "react-toastify";
  import { UserContext } from "../../utils/UserContext";
  
  import Autocomplete from "@mui/material/Autocomplete";
  import TextField from "@mui/material/TextField";
  import Stack from "@mui/material/Stack";
    
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { FeedLoadEffect } from "../PageLoadEffects";
  
  import data from "@emoji-mart/data";
  import Picker from "@emoji-mart/react";
  
  import Geocode from 'react-geocode';
  import { GoogleApiKey } from "../../utils/GoogleApiKey";
  import { Box, Grid, TextareaAutosize, Typography } from "@mui/material";
  
  
  // Uploader Modal Attached
  import Button from '@mui/material/Button';
  import Dialog from '@mui/material/Dialog';
  import DialogContent from '@mui/material/DialogContent';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import { useTheme } from '@mui/material/styles';
  import Avatar from "../../asset/image/avatar.jpg";
  import UploadLoader from "../PageLoadEffects/UploadLoader";
  import LoungeCommentTwo from "../LoungeItemContent/LoungeCommentTwo";
  import { useNavigate } from "react-router-dom";
  
  
  const UserPost = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()
  
    const handleClickOpen = () => {
      setOpen(true);
    }; 
    const handleClose2 = () => {
      setOpen(false);
    };
  

    // Sticky right side
    Geocode.setApiKey(GoogleApiKey);
    const geolocation = useGeolocation();
    const [stickyNav, setStickyNav] = useState(false);
    const [visible, setVisible] = useState(false);
    const [postBtnVisible, setPostBtnVisible] = useState("btn btn-primary");
    const {userDetails , msDetails} = useContext(UserContext);
    const [gender, setGender] = useState();
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [cover, setCover] = useState();
    const [members, setAllMembers] = useState([]);
    const [tagValue, settagValue] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowExtraImage, setModalShowExtraImage] = React.useState(false);


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [totalMedia, setTotalMedia] = useState(null);
    const [allFeeds, setAllFeeds] = useState(null);
    const [modalData, setModalData] = useState();
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [emojiShow, setEmojiShow] = useState(0);
    const maxNumber = 90;
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [professional, setProfessional] = useState(0);
    const [status, setStatus] = useState("1");
    const [storePositionY, setStorePositionY] = useState(0);
    const token = sessionStorage.getItem("token");
  
    const [storeUuid, setStoreUuid] = useState(null);
    const [postFound, setPostFound] = useState(false)
  
    //get all members
    const membersUrl = `${allMembersUrl}/${msDetails.id}?current_page=1`;
    useEffect(() => {
      let config = {
        method: "get",
        url: membersUrl,
      };
  
      axios
        .request(config)
        .then((response) => {
          setAllMembers(response.data.data);
        })
        .catch((error) => { });
    }, []);
  
    //set User information
    useEffect(() => {
      window.onscroll = () => {
        setStorePositionY(window.scrollY);
        setStickyNav(window.pageYOffset >= 350 ? true : false);
        return () => (window.onscroll = null);
      };
      if (userDetails !== null) {
        setName(userDetails.profile.name);
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setGender(userDetails.profile.gender.name);
        setAvatar(userDetails.profile.avatar);
        setCover(userDetails.profile.cover);
      }
    }, []);
  
    //Get all feeds
     //Get all feeds
  const getAllFeeds =() => {
    let config = {
      method: "get",
      url: `${createFeedsUrl}?microsite_id=${msDetails.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setAllFeeds(response.data.data);

        if(response.data.data?.length>0){
          response.data.data.forEach(element => {
            if(element?.user?.id === userDetails.id){
              setPostFound(true)
            }
          });
        }
      })
      .catch((error) => { });
  };
  useEffect(() => {
    getAllFeeds();
  }, []);
    const getLocation = () => {
      if (geolocation.error) {
        alert(geolocation.error.message);
      } else {
        Geocode.fromLatLng(geolocation.latitude, geolocation.longitude).then(
          (response) => {
            const address = response.results[9].formatted_address;
            setLocation(address);
          },
          (error) => {
            // console.error(error);
          }
        );
      }
    };
  
    const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    };
  
    //  multiple files upload
    const handleChange = ({ fileList: newFileList }) => {
      var files = newFileList;
      var fileCount = 0;
      var videoCount = 0;
      for (var i = 0; i < files.length; i++) {
        if (
          files[i].type === "video/mp4" ||
          files[i].type === "video/mov" ||
          files[i].type === "video/avi" ||
          files[i].type === "video/mkv"
        ) {
          videoCount = videoCount + 1;
        }
        if (
          files[i].type === "application/pdf" ||
          files[i].type === "application/msword" ||
          files[i].type === "application/zip"
        ) {
          fileCount = fileCount + 1;
        }
        if (
          files[i].type === "image/png" ||
          files[i].type === "image/jpg" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/gif"
        ) {
        }
      }
  
      if (videoCount > 1 || fileCount > 1) {
        notifyError("Limit exit (max: 1 video , max: 1 File)");
      } else {
        setFileList(newFileList);
      }
    };
    const uploadButton = (
      <div>
        <div
          style={{
            marginTop: 0,
            padding: "40px",
          }}
        >
          Upload Media (Photo,Video,Files)
        </div>
      </div>
    );
    const handleDone = () => {
      setTotalMedia(fileList.length);
      setModalShow(false);
    };
  
    const createPost = async (event) => {
      setPostBtnVisible("btn btn-primary d-none");
      setVisible(true);
      event.preventDefault();
      var files = fileList;
  
      const formData = new FormData();
      formData.append("content", content);
      formData.append("microsite_id", msDetails.id);
      formData.append("location", location);
      formData.append("professional", professional);
      formData.append("status", status);
      let allow = "1";
      for (var i = 0; i < files.length; i++) {
        if (
          files[i].type === "application/pdf" ||
          files[i].type === "application/msword" ||
          files[i].type === "image/png" ||
          files[i].type === "image/jpg" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/gif"
        ) {
          formData.append("files[]", files[i].originFileObj);
        }
        if (
          files[i].type === "video/mp4" ||
          files[i].type === "video/mov" ||
          files[i].type === "video/avi" ||
          files[i].type === "video/mkv"
        ) {
          formData.append("video", files[i].originFileObj);
        }
      }
  
      var feedUrl;
      if(storeUuid !==null){
        feedUrl = `${createFeedsUrl}/${storeUuid}`
      }else{
        feedUrl = createFeedsUrl
      }
  
  
      let config = {
        method: 'post',
        url: feedUrl,
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        data : formData
      };

      setTotalMedia(null);
      setFileList([]);
      setContent("");
      
      axios.request(config)
      .then((response) => {
        setContent('');
        getAllFeeds();
        setTotalMedia(null);
        setFileList([]);
        notifySuccess();
        setPostBtnVisible("btn btn-primary");
        setVisible(false);
        setOpen(false);
        if(storeUuid !==null){
          window.location.reload();
        }
      })
      .catch((error) => {
        notifyError("Try again!");
        setVisible(false);
        setPostBtnVisible("btn btn-primary");
        setOpen(false);
      });
    };
    const setHidden = () => {
      if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "initial";
      } else {
        document.body.style.overflow = "scroll";
      }
    };
  
  
    const [bgShow,setBgShow] = useState(0);
    const toggleBgShow = ()=>{
      if(bgShow=== 0){
        setBgShow(1)
      }else{
        setBgShow(0)
      }
    }
    const [bgShow2,setBgShow2] = useState(0);
    const toggleBgShow2 = ()=>{
      if(bgShow2=== 0){
        setBgShow2(1)
      }else{
        setBgShow2(0)
      }
    }
    const [showMediaModal,setShowMediaModal] = useState('dialogContent-1') 



  
  
    return (
      <Fragment>
        <div className="lounge">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className="upload_box_container" onClick={handleClickOpen}>
                <div className="upload_box_top">
                  <div className="uploader_profile">
                  {
                    //Avatar
                    avatar ? (
                      <div className="profile_img">
                        <img src={`${baseUrl}/${avatar}`} alt={name} />
                      </div>
                    ) : (
                      <div className="profile_img">
                        <img src={`${Avatar}`} alt={name} />
                      </div>
                    )
                  }
                  </div>
                  <div className="uploader_input">
                    <input type="text" className="form_control" placeholder="Text Here"/>
                  </div>
                </div>
              </div>
               {/* no post found */}
               {postFound ===false && <Box display='flex' justifyContent='center'>
                  <Typography color="#B8B7B7">No posts found</Typography>
                </Box>} 
              {/* Uploader Container End */}
              {allFeeds === null && <>{FeedLoadEffect()}</>}
              <div className="news-feed">
              {allFeeds &&
                    allFeeds.map((data, key) => {
                      if (
                        data.user.id === userDetails.id &&
                        data.video === null &&
                        data.media.length === 0
                      ) {
                        return (
                          <>
                            <div className="longue_item" key={data.uuid}>
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                <div className="uploadede_content cursorPointer" >
                                  {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                </div>
                                {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                              </div>
                          </>
                        );
                      }
                      /* Single Image  View */ 
                      if (
                        data.user.id === userDetails.id && 
                        data.video === null &&
                        data.media.length === 1
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            {/* <div className="uploaded_img_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}> */}
                                            <div className="uploaded_img_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                             <div className="single_img">
                                                <img onClick={(e) => {
                                                    setHidden();
                                                  }} src={data.media[0].url}
                                                  alt={data.media[0].name}/>
                                              </div>
                                              <div className="image_overly">
                                                <img onClick={(e) => {
                                                    setHidden();
                                                  }} src={data.media[0].url}
                                                  alt={data.media[0].name}/>
                                              </div>
                                           </div>
                                          </Grid>
                                    </Grid>
                                    <div className="uploadede_content cursorPointer" >
                                      {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                    </div>
                                    {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
  
                                     {/* <LoungeComment/> */}
                              </div>
                          </>
                        );
                      }
                      /* 2 Image  View */ 
                      if (
                        data.user.id === userDetails.id &&
                        data.video === null &&
                        data.media.length === 2
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                  <div className="uploadede_item">
                                    <Grid container spacing={1}>
                                      <Grid item xs={6} >
                                        <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[0].url}
                                                alt={data.media[0].name}
                                                />
                                          </div>
                                      </Grid>
                                      <Grid item xs={6} >
                                         <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[1].url}
                                                alt={data.media[1].name}
                                              /> 
                                          </div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                  {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                            </div>
                          </>
                        );
                      }
                      
                        /* 3 Image  View */
                      
                      if (
                        data.user.id === userDetails.id &&
                        data.video === null &&
                        data.media.length === 3
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                  <div className="uploadede_item">
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                           <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                                <img
                                                  src={data.media[0].url}
                                                  alt={data.media[0].name}
                                                />
                                          </div>
                                      </Grid>
                                      <Grid item xs={6}>
                                         <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[1].url}
                                                alt={data.media[1].name}
                                              />
                                          </div>
                                      </Grid>
                                      <Grid item xs={6} >
                                          <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[2].url}
                                                alt={data.media[2].name}/>
                                          </div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                  {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                            </div>
                          </>
                        );
                      }
                      
                        /* 3+ Image  View */
                      
                      if (
                        data.user.id === userDetails.id &&
                        data.video === null &&
                        data.media.length > 3
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                  <div className="uploadede_item">
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                        <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[0].url}
                                                alt={data.media[0].name}
                                              />
                                          </div>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <div className="image_container" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                              <img
                                                src={data.media[1].url}
                                                alt={data.media[1].name}
                                              />
                                          </div>
                                      </Grid>
  
                                      <Grid item xs={6}>
                                         <div className="image_container extra_img_relative" onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
                                             <img
                                                src={data.media[2].url}
                                                alt={data.media[2].name}
                                              />
                                            <div
                                              className="extra_img_overly2"
                                              onClick={(e) => {
                                                setModalData(data.media);
                                                setModalShowExtraImage(true);
                                              }}
                                            >
                                              <span>
                                                {data.media.length - 3}+
                                              </span>
                                            </div>
                                          </div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                  {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                            </div>
                          </>
                        );
                      }
                      
                        /* single video and single photo */
                      if (
                        data.user.id === userDetails.id  &&
                        data.video !== null &&
                        data.media.length === 1
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                  <div className="uploadede_item">
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                        <div className="uploaded_Video_container">
                                          <Player  src={data.video}>
                                            <BigPlayButton position="center" />
                                            <ControlBar
                                              autoHide={false}
                                              className="my-class"
                                            >
                                              <ForwardControl
                                                seconds={10}
                                                order={3.2}
                                              />
                                            </ControlBar>
                                          </Player>
                                        </div>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <div className="image_container">
                                              <img
                                                src={data.media[0].url}
                                                alt={data.media[0].name}
                                              />
                                          </div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                  {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                            </div>
                          </>
                        );
                      }
                      
                      if (
                        data.user.id === userDetails.id &&
                        data.video !== null &&
                        data.media.length === 2
                      ) {
                        return (
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                  <div className="uploadede_item">
                                    <Grid container spacing={1}>
                                      <Grid item xs={12}>
                                        <div className="uploaded_Video_container">
                                          <Player  src={data.video}>
                                            <BigPlayButton position="center" />
                                            <ControlBar
                                              autoHide={false}
                                              className="my-class"
                                            >
                                              <ForwardControl
                                                seconds={10}
                                                order={3.2}
                                              />
                                            </ControlBar>
                                          </Player>
                                        </div>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <div className="image_container">
                                             <img
                                                src={data.media[0].url}
                                                alt={data.media[0].name}
                                              />
                                          </div>
                                      </Grid>
                                      <Grid item xs={6}>
                                         <div className="image_container">
                                             <img
                                                src={data.media[1].url}
                                                alt={data.media[1].name}
                                              />
                                          </div>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                  {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
                            </div>
                          </>
                        );
                      }
                      
                      if (
                        data.user.id === userDetails.id &&
                        data.video !== null &&
                        data.media.length === 0
                      ) {
                        return ( 
                          <>
                            <div className="longue_item">
                            <LoungeProfileBio
                                getAllFeeds={getAllFeeds}
                                data={data}
                                modalOpen={handleClickOpen}
                                modalClose={handleClose2}
                                createPost={createPost}
                                setContent={setContent}
                                setStoreUuid={setStoreUuid}
                              />
                                <div className="uploadede_item">
                                  <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                      <div className="uploaded_Video_container">
                                        <Player
                                          
                                          src={`${baseUrl}/${data.video}`}
                                        >
                                          <BigPlayButton position="center" />
                                          <ControlBar
                                            autoHide={false}
                                            className="my-class"
                                          >
                                            <ForwardControl
                                              seconds={10}
                                              order={3.2}
                                            />
                                          </ControlBar>
                                        </Player>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                                <div className="uploadede_content cursorPointer" >
                                    {data && <LoungeItemContent data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})} getAllFeeds={getAllFeeds} />}
                                  </div>
                                {data && <LoungeCommentTwo data={data} itemModalClick={(e)=>navigate('/loungeitemDetail', {state:{data:data}})}  />}
  
                            </div>
                          </>
                        );
                      }
                    })}
              </div>
            </Grid>
          </Grid>
        </div>
  
  
        {/* Uploader Modal */}
         <Dialog 
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose2}
          aria-labelledby="responsive-dialog-title">
          {/* Modal First View */}
          <div className={showMediaModal}>
             <div className="dialog_header">
               Create Your Post
             </div>
            <DialogContent>
            <div className="upload_input_area" onClick={(e) => {(emojiShow === 1) && setEmojiShow(0) }}>
                <TextareaAutosize
                aria-label="minimum height"
                minRows={7}
                placeholder="Text  what do you want"
                className="Upload_textarea"
                onChange={(e) => setContent(e.target.value)}
                value={content}/>
                  {location && <p><FontAwesomeIcon icon={faLocationDot} /> {location}</p>}
             </div>
          </DialogContent>
              <div className="dialog_footer">
              <div className="emoji_picker">
              {emojiShow === 1 && (
                    <Picker
                      style={{ height: '300px' }}
                      data={data}
                      previewPosition={"none"}
                      onEmojiSelect={(e) => {
                        setContent(content + " " + e.native);
                        setSelectedEmoji(e.native);
                      }}
                  />
              )}  
              </div>
              <div className="upload_attached">
                      <ul>
                        <li onClick={() =>{toggleBgShow() ; setShowMediaModal('dialogContent-1 d-none')}}>
                            <PhotoIcon/> 
                          {totalMedia > 0 ? (
                            <span className="small-text">
                            Photo /  video ({totalMedia} )
                            </span>
                          ) : (
                            <span className="small-text"> Photo / Video</span>
                          )}
  
                        </li>
                        <li onClick={getLocation}>
                            <LocationOnIcon/>
                          <span className="small-text">Location</span>
                        </li>
                        {/* <li onClick={() => {toggleBgShow2() ; setShowMediaModal('dialogContent-1 d-none')}}>
                           <LocalOfferIcon/> 
                          {tagValue.length > 0 ? (
                            <span className="small-text">
                              Taged ({tagValue.length} persons)
                            </span>
                          ) : (
                            <span className="small-text"> Tag</span>
                          )}
                        </li> */}
                        <li onClick={(e) => {
                              emojiShow === 0 ? setEmojiShow(1) : setEmojiShow(0);
                            }}>
                          <span>
                            🙂
                          </span>
                        </li>
                      </ul> 
                      {visible ===true &&  <UploadLoader />}
              </div>
              
              <div className="uploader_btn_area">
                     {content.length > 0 || fileList.length > 0 ? (
                        <Button  variant="contained" onClick={createPost} className={postBtnVisible}>
                          Post now
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={createPost}
                          className={`${postBtnVisible} disabled`}
                        >
                          Post now
                 </Button>
                )}
                 </div>
             
              </div>
          </div>
  
         {/* Media Uploader Part  */}
          {bgShow===1 && 
          <div className='dialogContent-2'>
             <div className="dialog_header">
              <div className="mediaBack_btn" onClick={() =>{toggleBgShow(); setShowMediaModal('dialogContent-1')}}>
                <ArrowBackIcon/> 
              </div>
                Add Media 
             </div>
             <div className="mediaAdd_Body">
              <div className="mediaAdder">
                <Dragger
                  action="https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png"
                  name="file" 
                  multiple={true}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 90 ? null : uploadButton}
                </Dragger>
              </div>
            </div>
          </div>
            }
  
         {/* Tag Uploader Part */}
         {bgShow2===1 && 
          <div className='dialogContent-2'>
             {/* <div className="dialog_header">
              <div className="mediaBack_btn"  onClick={() =>{toggleBgShow2(); setShowMediaModal('dialogContent-1')}}>
                <ArrowBackIcon/> 
              </div>
                Tag your friend
             </div> */}
          <DialogContent>
          <div className="TagBody">
          <Stack spacing={3}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={members}
                getOptionLabel={(option) => option.user.name}
                defaultValue={tagValue}
                onChange={(event, newValue) => {
                  if (newValue) {
                    settagValue(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Add friends"
                    placeholder="Add..."
                  />
                )}
              />
            </Stack>
            </div>
          </DialogContent>
          </div>
            }
         </Dialog>
        {/* Uploader Modal End */}
        <ToastContainer />
      </Fragment>
    );
  };
  
  export default UserPost;
  