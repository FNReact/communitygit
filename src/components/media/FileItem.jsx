import React, { useContext, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Image } from 'antd';
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { UserContext } from "../../utils/UserContext";

import docImage from '../../asset/image/docx.png'
import xlsxImage from '../../asset/image/xlsx.png'
import audioImage from '../../asset/image/audio.jpeg'
import pdfImage from '../../asset/image/pdf.png'
import pptxImage from '../../asset/image/pptx.png'
import zipImage from '../../asset/image/zip.jpeg'

const FileItem = ({getData, handleDeleteItem, handleFileUpdateDetails, adminId}) =>{
  const {msDetails, userDetails,loggedInUser} = useContext(UserContext);
     const [anchorEl, setAnchorEl] = useState(null);
     const fileDropdown = Boolean(anchorEl);
     const fileDropdownClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const fileDropdownClose = () => {
       setAnchorEl(null);
     };

     // convert data size
     const  formatBytes = (bytes, decimals = 2)=> {
      if (!+bytes) return "0 Bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  
      const i = Math.floor(Math.log(bytes) / Math.log(k));
  
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    // handle fileDetails
    const handleFileDetails = (getData)=>{
      Swal.fire({
        html: `<p>Name : ${getData.name}</p>`+
       `<p>Type : ${getData.mime}</p>`+
       `<p>Size : ${formatBytes(getData.size)}</p>`+
       `<p>Created Date : ${ new Date(getData.created_at).toLocaleDateString()}</p>`
       ,
       imageUrl: `${getData.url}`,
       imageWidth: 400,
       imageHeight: 200,
       imageAlt: `${getData.name}`,
     })
    }    

    return(
       <>
         <div className="my_file_item">
          <div className="item_icon">

            {(getData?.mime ==='image/png' 
            || getData?.mime ==='image/jpg' 
            || getData?.mime ==='image/jpeg'
            || getData?.mime ==='image/gif'
            || getData?.mime ==='image/webp') &&
            <Image
            width={200}
            src={getData.url}
          />
          }
          {(getData?.mime ==='video/mp4' 
            || getData?.mime ==='video/mov' 
            || getData?.mime ==='image/mkv') &&
            <video src={getData.url}  width={'100%'}  controls></video>
          }
         
         {(getData?.mime ==='application/pdf') &&
             <a href={getData.url} target="_blank"><img src={pdfImage}  width={'100%'} alt="" ></img></a>
          }
         {(getData?.mime ==='application/msword') &&
             <a href={getData.url} target="_blank"><img src={docImage}  width={'100%'} alt="" ></img></a>
          }
           {(getData?.mime ==='application/zip') &&
            <a href={getData.url} target="_blank"><img src={zipImage}  width={'100%'} alt="" ></img></a>
          }
         {(getData?.mime ==='application/vnd.ms-excel') &&
            <a href={getData.url} target="_blank"><img src={xlsxImage}  width={'100%'} alt="" ></img></a>
          }
         {(getData?.mime ==='audio/mpeg') &&
            <a href={getData.url} target="_blank"><img src={audioImage}  width={'100%'} alt="" ></img></a> 
          }
          {(getData?.mime ==='application/vnd.openxmlformats-officedocument.presentationml.presentation') &&
            <a href={getData.url} target="_blank"><img src={pptxImage}  width={'100%'} alt="" ></img></a>
          }
          </div>
          {getData?.name && <div className="item_name">{getData.name.split("-").join(" ")}</div>}
          <div className="my_item_bootom">
            <div className="uploaded_date">{new Date(getData.created_at).toDateString()}</div>
            <div className="File_list_activity">
            <i 
              id="demo-positioned-button"
              aria-controls={fileDropdown ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={fileDropdown ? 'true' : undefined}
              onClick={fileDropdownClick}
             ><MoreVertIcon/></i>
            </div>
            </div>
          </div>

           <Menu
             id="demo-positioned-menu"
             aria-labelledby="demo-positioned-button"
             anchorEl={anchorEl}
             open={fileDropdown}
             onClose={fileDropdownClose}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'left',
             }}
             transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
             }}
           >
             {(userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") && <MenuItem onClick={(e)=>{handleFileUpdateDetails(getData.collection_name, getData.name, getData.uuid);fileDropdownClose()}}> Rename File </MenuItem>}
             {(userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin")  && <MenuItem onClick={(e)=>{fileDropdownClose();handleFileDetails(getData)}}> File Details </MenuItem>}
             {(userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin")  && <MenuItem onClick={(e)=> {fileDropdownClose();handleDeleteItem(getData.uuid)}}> Delete File </MenuItem>}
             <MenuItem><Button href={getData.url} target="_blank">Download</Button></MenuItem>
          </Menu>
       
      
       </>
    )
}

export default FileItem