import React, { Fragment, useContext } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { baseUrl, commentReactionUrl, commentsUrl } from '../../api/Api';
import { IconButton, TextareaAutosize } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../utils/Toast';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../utils/UserContext';
import { Image } from 'antd';
const  SingleComment =({data, getAllComments, replayShow,findLast,avatar,createBy})=> {
  const token = sessionStorage.getItem('token');
  const {userDetails} = useContext(UserContext);
  const [content, setContent] = useState("");
  const [emojiShow, setEmojiShow] = useState(0);
  const [emojiShow2, setEmojiShow2] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [commentReplayImage,setCommentReplayImage] = useState(null);
  const [replayClass, setReplayClass] = useState(`reply_input_plate ${data.id} d-none`)
  //load from api
    const [comments, setComments] = useState(null);
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('')
    const [userAvater, setUserAvater] = useState(null);
    const [userName, setUserName]  = useState(null);
    const [time, setTime] = useState(null);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const [date, setDate] = useState(
      data !== undefined
        ? new Date(data.created_at).toLocaleDateString("en-US", options)
        : ""
    );

    const handleToggle = () => {setOpen((prevOpen) => !prevOpen);};
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
        setOpen(false);
       };

       function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }

  // return focus to the button when we transitioned from !open -> open
      const prevOpen = useRef(open);
      useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
        prevOpen.current = open;
      }, [open]);


      useEffect(() => {
        if (data && data !== undefined && data.comment && data.comment !==null && data.comment !=='') {
            setComment(data.comment);
        }
        if (data && data !== undefined && data.user) {
            setUserName(data.user.name);
            setUserAvater(data.user.avatar);
        }
       
        //comment time difference
        if(data && data !==undefined){
          let diffTime = Math.abs(new Date().valueOf() - new Date(data.created_at).valueOf());
          let days = diffTime / (24*60*60*1000);
          let hours = (days % 1) * 24;
          let minutes = (hours % 1) * 60;
          let secs = (minutes % 1) * 60;
          [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
          var fullTime;
       
          if(secs !== 0 ){
            fullTime = secs+'s';
          }
          if(minutes !== 0 &&  secs !== 0 ){
            fullTime = minutes+'m'+" "+ secs+'s';
          }
          if(hours !==0 && minutes !== 0 &&  secs !== 0 ){
            fullTime = hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
          }
          if(days !==0 && hours !==0 && minutes !== 0 &&  secs !== 0 ){
            fullTime = days+'d'+ " "+hours+'h'+ " "+ minutes+'m'+ " "+ secs+'s';
          }
          
          setTime(fullTime);
        }
      
      }, []);


// Handle reply comment 

const handleReplyComment = (postId,parentId) =>{
  setEmojiShow(0)
  let replayData = new FormData();
  replayData.append('post_id', postId);
  replayData.append('parent_id', parentId);
  replayData.append('comment', content);
  replayData.append('comment_image', commentReplayImage);
  replayData.append('status', '1');

  let config = {
    method: 'post',
    url: commentsUrl,
    headers: { 
      'Authorization': `Bearer ${token}`, 
    },
    data : replayData
  };

  axios.request(config)
  .then((response) => {
    setComments(null)
    setContent('');
    getAllComments();
    setCommentReplayImage(null);
    setReplayClass(`reply_input_plate ${parentId} d-none`)
  })
  .catch((error) => {
    setCommentReplayImage(null);
    setContent('');
    setCommentReplayImage(null);
    notifyError('Something went wrong !')
    setReplayClass(`reply_input_plate ${parentId} d-none`)
  });
}

//Handle replay class
const handleReplayClass = (id,Class) =>{
  if(Class ===`reply_input_plate ${id} d-none`){
    setReplayClass(`reply_input_plate ${id}`)
  }else{
    setReplayClass(`reply_input_plate ${id} d-none`)
  }
}

 // Delete  single feed
 const handleDeleteComment = (uuid) => {
  Swal.fire({
    heightAuto: false,
    backdrop: false,
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let config = {
        method: "delete",
        url: `${commentsUrl}/${uuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          notifySuccess();
          getAllComments();
        })
        .catch((err)=>{
          if (err?.response) {
            notifyError(err?.response?.data?.message)
          }else{
            notifyError('Something went wrong!.')
          }
        })
    }
  });
};


// for like emoji handle
const [myReaction,setMyReaction] = useState(null);
const [meaning, setmeaning] = useState("");


useEffect(() => {
  if(data && data !== undefined && data.my_reactions && data.my_reactions.length>0){
    if(data.my_reactions[0].reaction_type ==='like'){
      setMyReaction('👍')
    }
    if(data.my_reactions[0].reaction_type ==='love'){
      setMyReaction('❤️')
    }
    if(data.my_reactions[0].reaction_type ==='happy'){
      setMyReaction('😊')
    }
    if(data.my_reactions[0].reaction_type ==='adore'){
      setMyReaction('🤗')
    }
    if(data.my_reactions[0].reaction_type ==='laugh'){
      setMyReaction('😆')
    }
    if(data.my_reactions[0].reaction_type ==='angry'){
      setMyReaction('👿')
    }
    if(data.my_reactions[0].reaction_type ==='sad'){
      setMyReaction('😥')
    }
  }
}, []);


//emoji
const reactionEmoji = {
  "❤️": "love",
  "😆": "laugh",
  "👿": "angry",
  "😥": "sad",
};
const [emojiClass, setEmojiClass] = useState(`comment_emoji_plate ${data.id} d-none`)
var feedsEmoji = Object.keys(reactionEmoji);


// emoji click handler
const emojiClickHandler =(emoji,commentId,uuid)=> {
  var meaning = reactionEmoji[emoji];
  setmeaning(meaning); 
  setMyReaction(emoji);

  let data = new FormData();
  data.append('comment_id', commentId);
  data.append('reaction_type', meaning);

  var config;
  if(uuid !==null){
      config = {
        method: 'post',
        url: `${commentReactionUrl}/${uuid}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
  }else{
    config = {
      method: 'post',
      url: `${commentReactionUrl}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
  }
  axios.request(config)
  .then((response) => {
    setEmojiClass(`comment_emoji_plate ${commentId} d-none`)
    getAllComments();
  })
  .catch((error) => {
   notifyError('Something went wrong')
  });

}

// handle emoji class
const handleEmoji =(id,emojiClass)=>{
if(emojiClass ===`comment_emoji_plate ${id} d-none`){
  setEmojiClass(`comment_emoji_plate ${id}`)
}else{
  setEmojiClass(`comment_emoji_plate ${id} d-none`)
}

}

// handle remove reaction
const handleRemoveReaction=(uuid)=>{
  if(uuid !==null){
    let config = {
      method: 'delete',
      url: `${commentReactionUrl}/${uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      getAllComments();
      setMyReaction(null)
    })
    .catch((error) => {
      // notifyError('Something went wrong !')
    });
  }
}


//handle edit comment

const handleEditComment = async(getData)=>{
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputValue: comment,
    inputLabel: 'Update Comment',
    inputPlaceholder: 'Type comment  here...',
    inputAttributes: {
      'aria-label': 'Type comment here'
    },
    showCancelButton: true
  })
  
  if (text) {
    let formData = new FormData();
    formData.append('post_id', getData.post_id);
    formData.append('comment', text);
    formData.append('parent_id', getData.parent_id);
    
    let config = {
      method: 'post',
      url: `${commentsUrl}/${getData.uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : formData
    };
    
    axios.request(config)
    .then((response) => {
      // getAllComments();
      window.location.reload();
    })
    .catch((error) => {
    });
  }
}
  return (
    <Fragment>
         <div className="comment_wrapper">
              <div className="comment_wrap_top">
                    <div className="comment_wrap_top_left">
                        {userAvater !==null && userName !==null  && <div className="user_pic"><img src={`${baseUrl}/${userAvater}`} alt={userName} /></div>}
                        <div className="left_info">
                          {userName !==null && <div className="userName">{userName}</div>}
                          {/* {time !==null && <div className="createDate">{time} ago</div>} */}
                          {date && <div className="createDate">{date}</div>}
                        </div>
                    </div>
                    {(userDetails.id === data.user.id || createBy===userDetails.id) &&
                    <div className="comment_wrap_top_right">
                      <MoreHorizIcon  ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}/>


                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <div className="paper_container" 
                                      autoFocusItem={open}
                                      id="composition-menu"
                                      aria-labelledby="composition-button"
                                      onKeyDown={handleListKeyDown}
                                >
                                
                                 {userDetails.id === data.user.id && <div className="paper_list" onClick={(e)=> handleEditComment(data)}> <EditIcon/> Edit Comment</div>}
                                 {(userDetails.id === data.user.id || createBy===userDetails.id) && <div className="paper_list" onClick={(e)=> handleDeleteComment(data.uuid)}> <DeleteIcon/> Delete Comment</div>} 
                                
                                </div>
                              </ClickAwayListener>

                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>}
                    
                </div>
                {data && data.comment_image !==null && <div className="comment_media"><Image src={`${baseUrl}/${data.comment_image}`} width={'200px'} alt={data.user.name} /></div>}
                <div className="comment_box">
                <ReactReadMoreReadLess
                    charLimit={120}
                    readMoreText={"Read more"}
                    readLessText={"Read less"}
                >
                    {comment}
                </ReactReadMoreReadLess>
                </div>
                <div className="comment_react_container">
                <div className={`${emojiClass} ${data.id}`}>
                      {feedsEmoji.map(function (emoji) {
                            return (
                                <span
                                    className="comment_emoji_icon"
                                    onClick={() => emojiClickHandler(emoji,data.id,(data && data !== undefined && data.my_reactions && data.my_reactions.length>0)?data.my_reactions[0].uuid:null)}
                                    key={emoji}>
                                    {emoji}
                                </span>
                            );
                      })}
                </div>
                </div>
                <div className="comment_footer">
                  <div className="comment_footer_left">
                       { replayShow === "1" && <>
                          {/* <div className="footer_react_item"> Like</div> */}
                          {/* <div className="footer_react_item" onClick={(e)=>handleEmoji(data.id,emojiClass)}>
                            {(myReaction !==null)?<span>{myReaction}</span>:<><span>Like</span></>}
                          </div> */}
                           {(myReaction !==null)?<span onClick={(e)=> handleRemoveReaction((data.my_reactions.length>0)?data.my_reactions[0].uuid:null)}>{myReaction}</span>
                          :<div className="footer_react_item" onClick={(e)=>handleEmoji(data.id,emojiClass)}><span>Like </span></div>}
                       </> }
                       { replayShow === "1" && <div className="footer_react_item" onClick={(e)=>handleReplayClass(data.id,replayClass)}> Reply</div>}
                       {/* { firstChild === true && firstChildLength>0 && <div className="footer_react_item" onClick={(e)=>handleFirstChildShow()}> View Replies{firstChildShow===0?<ArrowDropDownIcon />:<KeyboardArrowUpIcon/>}  </div>} */}
                       {/* { secondChild === true && secondChildLength>0 && <div className="footer_react_item" onClick={(e)=>handleSecondChildShow()}> View Replies ({secondChildLength})</div>} */}

                  </div>
                </div>
                <div  className={`${replayClass} ${data.id}`}>
                    <div className="reply_input_area" onClick={(e) => {(emojiShow2 === 1) && setEmojiShow2(0) }}>
                        <TextareaAutosize
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          aria-label="minimum height"
                          minRows={1}
                          placeholder="Your comment"
                          className="comment_textarea"/>
                        </div>
                          <div className="reply_attachment">
                            <div className="reply_attachment_left">
                              <div className="reply_attachment_item">
                                  <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={(e)=> setCommentReplayImage(e.target.files[0])}  />
                                    <PhotoCamera />
                                  </IconButton>
                                </div>
                                  <div className="reply_attachment_item" >
                                         <span onClick={(e) => {
                                          emojiShow2=== 0 ? setEmojiShow2(1) : setEmojiShow2(0);
                                        }}>🙂</span> 
                                        <div className="reply_emoji_picker">
                                          {emojiShow2 === 1 && (
                                                  <Picker
                                                    style={{ height: '300px' }}
                                                    data={emojiData}
                                                    previewPosition={"none"}
                                                    onEmojiSelect={(e) => {
                                                        setContent(content + " " + e.native);
                                                        setSelectedEmoji(e.native);
                                                    }}
                                              />
                                          )}  
                                    </div>
                              </div>
                            </div>
                            {findLast===false && <div className="send_btn" onClick={(e)=> handleReplyComment(data.post_id, data.id)}><a><SendIcon/></a></div>}
                            {findLast===true && <div className="send_btn" onClick={(e)=> handleReplyComment(data.post_id, data.parent_id)}><a><SendIcon/></a></div>}
                    </div>
                    
                      {commentReplayImage !==null &&  <div className="reply_media_visiable">
                          <img src={URL.createObjectURL(commentReplayImage)} alt=''  />
                          
                          <div className="reply_media_overly">
                          <a ><CloseIcon onClick={(e)=> setCommentReplayImage(null)} /></a>
                        </div>
                    </div> }
                  </div>
            </div> 
    </Fragment>
  )
}

export default SingleComment