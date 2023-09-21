import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Backdrop, Button, IconButton, TextareaAutosize } from '@mui/material';
import { PhotoCamera } from '@material-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl, reportUrl } from '../../api/Api';
import { UserContext } from '../../utils/UserContext';
import { useLocation } from 'react-router-dom';
import parser from 'html-react-parser'
import { Image } from 'antd';
import CommentIcon from '@mui/icons-material/Comment';
import { notifyError } from '../../utils/Toast';
import MainLoader from '../PageLoadEffects/MainLoader';
const AdminReportDetails = () => {
    const [reportData, setReportData] = useState([])
    const {msDetails,userDetails} = useContext(UserContext);
    const [message, setMessage] = useState('')
    const [fileList, setFileList] = useState([])
    const [loadershow, setLoaderShow] = useState(false)
    const location = useLocation();
    const token = sessionStorage.getItem('token');


    const getsingleReport =(uuid)=>{
        setLoaderShow(true)
        let config = {
            method: 'get',
            url: `${reportUrl}/${uuid}`,
          };
          axios.request(config)
          .then((response) => {
            setReportData(response?.data)
            setLoaderShow(false)
          })
          .catch((err)=>{
            setLoaderShow(false)
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          }
          );
          
    }

    //hooks call
   useEffect(()=>{
        if(location?.state !==null){
            getsingleReport(location?.state?.row?.uuid)
        }
   },[])

//replay status
  // handle replay 
  const handleReplay = (row, status) =>{
    setLoaderShow(true)
    let data = new FormData();
    data.append('user_id', userDetails.id);
    data.append('microsite_id', msDetails.id);
    data.append('status', status);
    data.append('report_to', 'admin');
     var config = {
        method: 'post',
        url: `${reportUrl}/${row.uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    axios.request(config)
    .then((response) => {
        setLoaderShow(false)
    })
    .catch((error) => {
        setLoaderShow(false)
    //   notifyError('Something went wrong.')
    });
  }



// handleReplayMessage
const handleReplayMessage =()=>{
    setLoaderShow(true)
    let data = new FormData();
        data.append('user_id', userDetails.id);
        data.append('name', userDetails?.profile?.name);
        data.append('email', userDetails?.email);
        data.append('message', message);
        // data.append('phone', '01627297942');
        data.append('microsite_id', msDetails.id);

        if(fileList.length>0){
            fileList.forEach(element => {
                 data.append('files[]', element);
            });
        }
     
        data.append('subject', 'replay 23');
        data.append('parent_id', location?.state?.row?.id);
        data.append('status', '1');

        let config = {
        method: 'post',
        url: reportUrl,
        data : data
        };

        axios.request(config)
        .then((response) => {
            setMessage('')
            setFileList([])
            handleReplay(location?.state?.row,1)
            getsingleReport(location?.state?.row?.uuid)
            setLoaderShow(false)
        })
        .catch((err)=>{
            setLoaderShow(false)
            if (err?.response) {
              notifyError(err?.response?.data?.message)
            }else{
              notifyError('Something went wrong!.')
            }
          }
        );
    }



    // upload multiple images

    function handleChange(e) {
        setFileList([...e.target.files]);
      }

     // hendle remove image from list
     const handleremoveImage = (image,i)=>{
        if (i > -1) { // only splice array when item is found
           var filteredArray = fileList.filter(e => e !== image)
            setFileList(filteredArray)
          }
     }





    return (
        <>
        <Backdrop open={loadershow} className="backdrop_contorller">
            <MainLoader />
        </Backdrop>
            <div className="report_detail">
                <div className="report_text">
                    <div className="title">  {reportData?.subject} </div>
                    {reportData?.message && parser(reportData?.message)}
                </div>
                <div className="report_reply_content">
                    <div className="reply_component">
                      <div className="image_s">
                      {reportData?.files && reportData?.files?.length>0 && reportData?.files.map((data,i)=>{
                            return(
                             <div className="selected_img">
                                    <Image src={data?.url}></Image>
                                    {/* <img src={L2} alt="" /> */}
                                    {/* <div className="img_overly">
                                        <i><CloseIcon /></i>
                                    </div> */}
                                </div>
                            )
                        })}
                      </div>
                       <div className='d-flex'>
                       {fileList && fileList.length>0 && fileList.map((image, i)=>{
                            return(
                                <div className="selected_img mr-12" onClick={(e)=> handleremoveImage(image,i)}>
                                    <Image src={URL.createObjectURL(image)}></Image>
                                    <div className="img_overly"><i><CloseIcon /></i></div>
                                </div>
                            )
                        })}
                       </div>
                        
                      
                       
                        <div className="reply_sec">
                            <div className="user_avtar">
                                <img src={`${baseUrl}/${userDetails?.profile?.avatar}`} alt={userDetails?.profile?.name} />
                            </div>
                            <div className="comment_input_area">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={1}
                                    placeholder="Type your reply here .."
                                    value={message}
                                    onChange={(e)=> setMessage(e.target.value)}
                                    className="comment_textarea" />
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" multiple onChange={handleChange} />
                                    <PhotoCamera />
                                </IconButton>
                            </div>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={(e)=> handleReplayMessage()}>
                                Send
                            </Button>
                        </div>
                    </div>


                    {reportData?.replaies && reportData?.replaies?.length>0 && reportData?.replaies.slice(0).reverse().map((data,i)=>{
                        return(
                            <div className="reply_content">
                            <div className="reply_part">
                                <div className="main_reply">
                                    <div className="reply_left">
                                        <div className="user_avtar">
                                            <CommentIcon />
                                            {/* <img src={L1} alt="" /> */}
                                        </div>
                                    </div>
                                    <div className="reply_right">
                                        <div className="user_N">
                                            {data?.name}
                                        </div>
                                        <div className="reply_text">
                                            {data?.message}
                                            <div className="attached_img_container">
                                                {data?.media && data?.media.length>0 && data?.media.map((item,i)=>{
                                                    return(
                                                      <div className="img_attache" key={i}>
                                                        <Image src={`${baseUrl}/storage/media/${item?.id}/${item?.file_name}`} alt={item?.file_name} />
                                                      </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                      
                                        {/* <div className="reply_component">
                                            <div className="selected_img">
                                                <img src={L2} alt="" />
                                                <div className="img_overly">
                                                    <i><CloseIcon /></i>
                                                </div>
                                            </div>
                                            <div className="reply_sec">
                                                <div className="user_avtar">
                                                    <img src={L1} alt="" />
                                                </div>
                                                <div className="comment_input_area">
                                                    <TextareaAutosize
                                                        aria-label="minimum height"
                                                        minRows={1}
                                                        placeholder="Type your reply here .."
                                                        className="comment_textarea" />
                                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                                        <input hidden accept="image/*" type="file" />
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </div>
                                                <Button variant="contained" endIcon={<SendIcon />}>
                                                    Send
                                                </Button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <ul>
                                    {/* <li>
                                        <div className="sub_reply">
                                            <div className="reply_left">
                                                <div className="user_avtar">
                                                    <img src={L1} alt="" />
                                                </div>
                                            </div>
                                            <div className="reply_right">
                                                <div className="user_N">
                                                    Fahim Ahmed
                                                </div>
                                                <div className="reply_text">
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, nobis!
                                                    <div className="img_attache">
                                                        <img src={L2} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li>
                                        <div className="reply_component">
                                            <div className="selected_img">
                                                <img src={L2} alt="" />
                                                <div className="img_overly">
                                                    <i><CloseIcon /></i>
                                                </div>
                                            </div>
                                            <div className="reply_sec">
                                                <div className="user_avtar">
                                                    <img src={L1} alt="" />
                                                </div>
                                                <div className="comment_input_area">
                                                    <TextareaAutosize
                                                        aria-label="minimum height"
                                                        minRows={1}
                                                        placeholder="Type your reply here .."
                                                        className="comment_textarea" />
                                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                                        <input hidden accept="image/*" type="file" />
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </div>
                                                <Button variant="contained" endIcon={<SendIcon />}>
                                                    Send
                                                </Button>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
    
                        </div>
                        )
                    })}
                   
                  

                </div>
            </div>
        </>
    )
}

export default AdminReportDetails