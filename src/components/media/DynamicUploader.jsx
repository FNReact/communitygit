import React, { Fragment,useState } from 'react'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';

import FileUpload from "react-mui-fileuploader";
import {ReactSession} from 'react-client-session'
import axios from 'axios';
import { addMediaUrl } from '../../api/Api';
import UploadProgress from './UploadProgress';
import { useContext } from 'react';
import { UserContext } from '../../utils/UserContext';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const actions = [
    { icon: <FolderIcon />, name: 'Folder' },
    { icon: <InsertDriveFileIcon/>, name: 'File' },
  ];



const DynamicUploader = ({path,totalSize, getAllMedia, collectionName,position}) => {
  const location = useLocation();
  ReactSession.setStoreType("sessionStorage");
  const {msDetails} = useContext(UserContext);

  var indexToRemove = 0; 
  const storeCollectionName= location.state.collectionName
  const splitedPathName = storeCollectionName.split('/');
  var arr = splitedPathName;
  var result = arr.filter((data, idx) => idx !== indexToRemove );

  var getUpdatedPosition = result.slice(0, position-1);

  // var uploadPathName=result.join("/").toString()
  var uploadPathName=getUpdatedPosition.join("/").toString()

  const token = sessionStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const [displayInput,setDisplayInput] = useState('none')
  const [folderName,setFolderName] = useState('')
  const [loaderShow,setLoaderShow] = useState('none')
  const [progressValue,setProgressValue] = useState(0)
  const [progressTotalLenght,setProgressTotalLength] = useState(0)
  const [progressCurrentLenght,setProgressCurrentLength] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sx'));

  const mediaUrl = `${addMediaUrl}/${msDetails.uuid}`

  const handleClickOpen = (type) => {
    setOpenModal(true);
    setDisplayInput(type)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  

  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleFilesChange = (files) => {
    // Update chosen files
    setFilesToUpload([...files]);
  };

  const uploadFiles = () => {
    setLoaderShow('block')
    var countRes = 0
     for (let i = 0; i <filesToUpload.length; i++) {
      var data = new FormData();
      if(folderName){
        data.append('folder_name', `${uploadPathName}/${folderName}`);
      }else{
        data.append('folder_name', uploadPathName);
      }
      data.append('file', filesToUpload[i]);
      var config = {
        method: 'post',
        url: mediaUrl,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data,
        onUploadProgress: progressEvent => {
          let percentComplete = progressEvent.loaded / progressEvent.total
          percentComplete = parseInt(percentComplete * 100);
          setProgressValue(percentComplete)
          setProgressTotalLength(filesToUpload.length)
        }
      };


      axios(config)
      .then(function (response) {
        
        countRes = countRes+1
        setProgressCurrentLength(countRes)
        if(countRes === filesToUpload.length){
          setProgressValue(0);
          getAllMedia();
          handleCloseModal();
          setProgressTotalLength(0)
          setProgressCurrentLength(0)
        }
      })
      .catch(function (error) {
        
      });

    }

   
  };

  



  return (
    <Fragment>
     <div className="uploader">
     {(totalSize<5368709120) ?<>
        <Box disableElevation>
      <Backdrop open={open} className=" backdrop_contorller"/>
      <SpeedDial 
        className='uploader_dial'
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
          <SpeedDialAction
            key={actions[0].name}
            icon={actions[0].icon}
            tooltipTitle={actions[0].name}
            tooltipOpen
            onClick={() => {handleClickOpen('block')}}
          />
          <SpeedDialAction
            key={actions[1].name}
            icon={actions[1].icon}
            tooltipTitle={actions[1].name}
            tooltipOpen
            onClick={() => {handleClickOpen('none')}}
          />
        
      </SpeedDial>
     
    
    </Box>
      </>:<>
    <Box disableElevation>
      <Backdrop open={open} className=" backdrop_contorller"/>
      <SpeedDial 
        className='uploader_dial'
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
          <SpeedDialAction
            key={actions[0].name}
            icon={actions[0].icon}
            tooltipTitle='Storage full'
            tooltipOpen
          />
          <SpeedDialAction
            key={actions[1].name}
            icon={actions[1].icon}
            tooltipTitle='Storage full'
            tooltipOpen
          />
        
      </SpeedDial>
    
    </Box>
      </>}
     </div>
     
     <div>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
        className='Media_dilouge'
      >  
        <DialogTitle id="responsive-dialog-title">
          <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent  className='mob_media_dialouge'>
          <div className="uploader_contianer">
          <TextField sx={{mb:3, display: `${displayInput}`}} label="Folder Name" variant="outlined" onChange={((e)=>setFolderName(e.target.value))} />
          <div className="file_selecter">
           <FileUpload
             multiFile={true}
             onFilesChange={handleFilesChange}
             onContextReady={(context) => {}} />
          </div>
             {(filesToUpload.length>0) ? <><Button className='Upload_btn' onClick={uploadFiles} variant="contained" id="uploadButton">  Upload</Button></>
             :
             <><Button className='Upload_btn' onClick={uploadFiles} variant="contained" id="uploadButton" disabled>  Upload</Button></>
             }
          </div>
        
           
         </DialogContent>
      </Dialog>
    </div>
    {(progressValue>0) && <UploadProgress value = {progressValue} progressCurrentLenght={progressCurrentLenght} progressTotalLenght={progressTotalLenght} />}
    </Fragment>
  )
}

export default DynamicUploader