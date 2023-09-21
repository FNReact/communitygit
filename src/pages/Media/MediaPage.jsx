import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import Uploader from "../../components/media/Uploader";
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FolderItem from "../../components/media/FolderItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileItem from "../../components/media/FileItem";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import axios from "axios";
import { addMediaUrl, allMediaUrl, allMembersUrl, editMediaFolderUrl, editMediaUrl } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { Image } from "antd";
import { ToastContainer } from "react-toastify";
import MainLoader from "../../components/PageLoadEffects/MainLoader";
const MediaPage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const {msDetails, userDetails,loggedInUser} = useContext(UserContext);
    const [media, setMedia] = useState([]);
    const [collectionName, setCollectionName] = useState([]);
    const [highLength, setHighLength] = useState();
    const [searchValue, setSearchValue] = useState("");

    const [loaderVisible, setLoaderVisible] = useState(false)

    const [adminId, setAdminId] = useState(null);

    const getAllMedia = async()=>{
      setLoaderVisible(true)
      let config = {
        method: 'get',
        url: `${allMediaUrl}/${msDetails.uuid}`,
        headers: { 
          'Authorization':  `Bearer ${token}`,
        }
      };
     await axios.request(config)
      .then((response) => {
        if(response.data.files.length>0){
          setMedia(response.data.files)
        }
        setLoaderVisible(false)
      })
      .catch((error) => {
        setLoaderVisible(false)
      });
    }

    // call allMedia 
    useEffect(()=>{
      getAllMedia();
    },[])


    useEffect(()=>{
     if(searchValue ===''){
      getAllMedia();
     }
    },[searchValue])


    let folders = [];
    useEffect(() => {
      let ObjMap = [];
      let collection_name = [];
      if (media.length > 0) {
        media.forEach((element) => {
          var makeKey = element.collection_name;
          collection_name.push(makeKey);
          if (!ObjMap[makeKey]) {
            ObjMap[makeKey] = [];
          }
  
          ObjMap[makeKey].push({
            name: element.name,
            file_name: element.file_name,
            size: element.size,
            created_at: element.created_at,
            custom_properties: element.custom_properties,
          });
        });
      }
      collection_name = Array.from(new Set(collection_name));
      let heighest_depth = 0;
      setCollectionName(collection_name);
      collection_name.forEach((element) => {
        folders = element.split("/");
        if (folders.length > heighest_depth) heighest_depth = folders.length;
      });
      setHighLength(heighest_depth);
    }, [media]);
  

  
    const handleFolderData = (cName, position, folderName) => {
      navigate(`/files/${folderName}`, {
        state: {
          collectionName: cName,
          position: position,
          folderName: folderName,
        },
      });
    };
  
    // let toSearch = 'new'; //Will check if title have text 'search'
    // let result = media.filter(o => o.collection_name.includes(toSearch) || o.name.includes(toSearch));
  
    const handleSearch = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        let toSearch = e.target.value; //Will check if title have text 'search'
        let result = media.filter(
          (o) => o.collection_name.includes(toSearch) || o.name.includes(toSearch)
        );
        if (result) {
          setMedia(result);
        }
      }
    };
   

    let total_size = 0;
    media.forEach((element) => {
      total_size = total_size + element.size;
    });

  //handle delete a resouce
  const handleDeleteItem=(uuid)=>{
    setLoaderVisible(true)
    Swal.fire({
        heightAuto: false,
        backdrop: false,
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          let config = {
            method: "delete",
            url: `${addMediaUrl}/${uuid}/${msDetails.uuid}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios 
            .request(config)
            .then((response) => {
              notifySuccess();
              getAllMedia();
              setLoaderVisible(false)
            })
            .catch((error) => {
                notifyError('Something went wrong')
                setLoaderVisible(false)
            });
        }
      });  
}


// handle update file
const handleFileUpdateDetails = async (folderName, fileName,uuid) =>{
  const { value: inputValue } = await Swal.fire({
    input: 'text',
    inputValue:fileName,
    inputLabel: 'New File Name',
    inputPlaceholder: 'New File Name',
    showCancelButton: true,
  })
  
  if (inputValue) {
    setLoaderVisible(true)
    const FormData = require('form-data');
    let data = new FormData();
    data.append('folder_name', folderName);
    data.append('file_name', inputValue);

    let config = {
      method: 'post',
      url: `${editMediaUrl}/${uuid}/${msDetails.uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      data : data
    };

     axios.request(config)
    .then((response) => {
      notifySuccess();
      getAllMedia();
      setLoaderVisible(false)
    })
    .catch((error) => {
      notifyError('Something went wrong',5000)
      setLoaderVisible(false)
    });
  }

}

// handle update folder name
const handleUpdateFolder = async(folderName)=>{
  const { value: inputValue } = await Swal.fire({
    input: 'text',
    inputValue:folderName,
    inputLabel: 'New Folder Name',
    inputPlaceholder: 'New Folder Name',
    showCancelButton: true,
  })
  
  if (inputValue) {
    setLoaderVisible(true)
    const FormData = require('form-data');
    let data = new FormData();
      let previous_name = folderName.split(" ").join("-");
      let new_name = inputValue.split(" ").join("-");
      data.append('previous_name', previous_name);
      data.append('new_name', new_name);

    let config = {
      method: 'post',
      url: `${editMediaFolderUrl}/${msDetails.uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      data : data
    };

    await axios.request(config)
    .then((response) => {
      getAllMedia();
      notifySuccess();
      setLoaderVisible(false)
    })
    .catch((error) => {
      notifyError('Something went wrong',5000)
      setLoaderVisible(false)
    });
  }else{
    setLoaderVisible(false)
  }
}

// get all members and find adimin of a microsite
 const membersUrl = `${allMembersUrl}/${msDetails.id}`;
 const getAllMembers = ()=>{
   let config = {
     method: "get",
     url: membersUrl,
   };

   axios
     .request(config)
     .then((response) => {
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

//  console.log('collectionName', collectionName)




  return (
    <Fragment>
      <Grid container spacing={2}>
        
         <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
         <Grid item lg={9} md={8} sm={12} xs={12} sx={{mt:1}}>
            <div className="media_content_body">
            <Tooltip title="Back" >
                 <div className="backArrow" onClick={(e)=>{navigate(-1)}}>
                    <ArrowBackIcon/>
                 </div> 
               </Tooltip>
              <div className="my_files_navigate">
                <div className="navigate_part_one" onClick={(e)=> navigate('/media')}>
                     <div className="navigate_bar_icon">
                        <DashboardIcon/>
                     </div>
                     <div className="navigate_title">
                        Media
                     </div>
                     <div className="navigate_bar_icon">
                      <KeyboardArrowRightIcon/>
                     </div>
                  </div>
                  <div className="navigate_part_two">
                      <div className="navigate_serachbar">
                        <input
                          onChange={(e) => setSearchValue(e.target.value)}
                          onKeyPress={handleSearch}
                          type="text"
                          className="form_control"
                          placeholder=" Search"
                        />
                      </div>
                  </div>
              </div>
             
            <div className="Media_area">
                <Grid container spacing={1.5} columns={20}>
                    {collectionName.length > 0 &&
                    collectionName
                      .slice(0)
                      .reverse()
                      .map((data, key) => {
                        var URL = data;
                        var arr = URL.split("/");

                        var secondFolder = "";
                        secondFolder = arr[1];
                        let recycleBin = arr[0];
                        if (
                          secondFolder !== undefined &&
                          folders.indexOf(secondFolder) === -1 &&
                          recycleBin !== "recycle_bin"
                        ) {
                          folders.push(secondFolder);
                          return (
                            <Grid item lg={4} md={5} sm={5} xs={10}>
                              <FolderItem
                                name="Lemmesay Images"
                                icon="folder"
                                adminId={adminId}
                                data={data}
                                date={data.created_at}
                                getAllMedia={getAllMedia}
                                handleUpdateFolder={handleUpdateFolder}
                                onClick={(e) => {
                                  handleFolderData(data, 2, secondFolder);
                                }}
                              />
                            </Grid>
                          );
                        }
                      })}
                </Grid>
               </div>
               <div className="Media_area">
                <Grid container spacing={1.5} columns={20}>
                <Image.PreviewGroup>
                  {media &&
                    media
                      .slice(0)
                      .reverse()
                      .map((data, key) => {
                        if (data.collection_name === `microsite-${msDetails.id}`) {
                          return (
                            <Image.PreviewGroup>
                              <Grid item lg={4} md={6} sm={10} xs={10}>
                                <FileItem name="iCircles Images" getData={data} handleDeleteItem={handleDeleteItem} handleFileUpdateDetails={handleFileUpdateDetails} adminId={adminId} />
                              </Grid>
                            </Image.PreviewGroup>
                          );
                        }
                      })}
                      </Image.PreviewGroup>
                </Grid>
               </div>
              </div>
         </Grid>
      </Grid>
       {loaderVisible ===true &&  <MainLoader />}
       {media && media.length===0 && loaderVisible ===false &&<><Box display='flex' justifyContent='center' justifyItems='center' ><Button disabled sx={{ml:25}}>No media found...</Button></Box></>}
      {(userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") && <Uploader totalSize={total_size} getAllMedia={getAllMedia} />}
      
        <ToastContainer />
    </Fragment>
   
  );
};

export default MediaPage;
