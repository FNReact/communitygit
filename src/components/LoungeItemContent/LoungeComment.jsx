import React, { useEffect } from "react";
import { Fragment,useState } from "react";
import Button from '@mui/material/Button';
import { Box, IconButton, TextareaAutosize } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import CloseIcon from '@mui/icons-material/Close';
import {PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { commentsUrl } from "../../api/Api";
import { CommentsLoadEffect } from "../PageLoadEffects";
import SingleComment from "./SingleComment";
import { notifyError } from "../../utils/Toast";


const LoungeComment = ({data, getAllFeeds,getSingleFeedDetails})=>{
    const token = sessionStorage.getItem('token');
    const [content, setContent] = useState("");
    const [emojiShow, setEmojiShow] = useState(0);
    const [commentImage,setCommentImage] = useState(null);
    
    //load from api
    const [comments, setComments] = useState(null);
       //get all comments by post id
       const getAllComments = () =>{
        let config = {
          method: 'get',
          url : `${commentsUrl}?post_id=${data.id}`,
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }
        axios.request(config)
        .then((res)=>{
          setComments(res.data.data)
        })
       }
       useEffect(()=>{
          if(data){
            getAllComments()
          }
       },[])

       //craete new comment 
       const handleCreateComment = (postId) =>{
        setEmojiShow(0)
        let data = new FormData();
        data.append('post_id', postId);
        data.append('parent_id', 0);
        data.append('comment', content);
        data.append('comment_image', commentImage);
        data.append('status', '1');

        let config = {
          method: 'post',
          url: commentsUrl,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };

        axios.request(config)
        .then((response) => {
   
          setComments(null)
          setContent('');
          getSingleFeedDetails();
          getAllFeeds();
          getAllComments();
          setCommentImage(null);
        })
        .catch((error) => {
    
          setCommentImage(null);
          setContent('');
          notifyError('Something went wrong !')
        });
       }


      


    return(
        <Fragment>
             <div className="comment_input_main" >
               <div className="comment_input_container">
                <div className="comment_input_area" onClick={(e) => {(emojiShow === 1) && setEmojiShow(0) }}>
                   <TextareaAutosize
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      aria-label="minimum height"   
                      minRows={1}
                      placeholder="Your comment"
                      className="comment_textarea"/>
                </div>
                 <div className="comment_attachment">
                      <ul>
                        <li><IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={(e)=> setCommentImage(e.target.files[0])}  />
                            <PhotoCamera />
                          </IconButton></li>
                        <li><span onClick={(e) => {
                            emojiShow === 0 ? setEmojiShow(1) : setEmojiShow(0);
                          }}>🙂</span> 
                           <div className="comment_emoji_picker">
                           {emojiShow === 1 && (
                                  <Picker
                                      style={{ height: '300px' }}
                                      data={emojiData}
                                      previewPosition={"none"}
                                      onEmojiSelect={(e) => {
                                        setContent(content + " " + e.native);
                                      }}
                                  />
                              )}  
                            </div>
                          
                           </li>
                 
                      </ul>
                      <div className="send_btn"><Button endIcon={<SendIcon />} onClick={(e)=>handleCreateComment(data.id)}></Button></div>
                  </div>
                  {commentImage !=null &&  <div className="comment_media_visiable">
                         <img src={URL.createObjectURL(commentImage)} alt=""  />
                         <div className="comment_media_overly">
                         <CloseIcon onClick={(e)=> setCommentImage(null)} />
                      </div>
                  </div> }
                 
                </div>
             </div>
             {comments !==null && comments.length<1 && <Box sx={{display:'flex', justifyContent:'center', justifyItems:'center'}}><Button disabled>No Comments Yet</Button></Box>}
             {comments ===null  && CommentsLoadEffect()}

             {comments !==null && comments.length>0 && 
              <div className="comment_container">
                <ul className="comment_ul">
                  {comments.map((mainComment,mainKey)=>{
                    return(
                      <li key={mainComment.uuid}>   
                          <SingleComment data={mainComment} getAllComments={getAllComments} replayShow='1' key={mainComment.uuid} findLast={false} createBy={data.user_id} />
                              {mainComment.children.length>0 &&
                               <ul>
                                  {mainComment.children.map((firstChild, firstKey)=>{
                                      return(
                                        <li key={firstChild.uuid}>
                                            <SingleComment data = {firstChild} getAllComments={getAllComments} replayShow='1' key={firstChild.uuid} findLast={false} createBy={data.user_id} />
                                            {firstChild.children.length>0 && 
                                               <ul>
                                                {firstChild.children.map((secondChild, secondKey)=>{
                                                  return(
                                                      <li key={secondChild.uuid}><SingleComment data={secondChild} getAllComments={getAllComments} replayShow='1' key={secondChild.uuid} findLast={true} createBy={data.user_id}  />
                                                    {/* {secondChild.children.length>0 && secondChild.children.map((otherChield, otherKey)=>{
                                                                    return(
                                                                      <li><SingleComment data={otherChield} getAllComments={getAllComments} replayShow='1' key={secondKey} /></li>
                                                                    )
                                                                  })
                                                            } */}
                                                      </li>
                                                  )                                 
                                                })}
                                              </ul>
                                            }
                                        </li>
                                      )
                                    })}
                                </ul>
                              }
                             
                      </li>
                    )
                  })}
                 
              </ul>
              </div>
             }
            {/* <ToastContainer /> */}
        </Fragment>
    )
}

export default LoungeComment