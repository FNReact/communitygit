import React, { useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../api/Api'

import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserContext } from '../../utils/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const EventCommentReplay = ({
     comment, 
    reviewDetails, 
    setReviewDetails, 
    handleReviewCreated, 
    userDetails,
    handleCommentEdit,
    handleDeleteEventComment
}) => {
    const [replayClass, setReplayClass] = useState(`review_add_field ${comment.id} d-none`)
    const [replayDetails, setReplayDetails] = useState('')

    const {msDetails} = useContext(UserContext)

//Handle replay class
    const handleReplayClass = (id,Class) =>{
        if(Class ===`review_add_field ${id} d-none`){
            setReplayClass(`review_add_field ${id}`)
        }else{
            setReplayClass(`review_add_field ${id} d-none`)
        }
    }



    return (
        <>
            <li >
                <div class="comment-main-level">
                    <div class="comment-avatar"><img src={`${baseUrl}/${comment.user.avatar}`} alt="" /></div>
                    <div class="comment-box">
                        <div class="comment-head">
                            <div>
                            
                                <h6 class={(comment?.user_id && comment.user_id === msDetails.create_by)?'comment-name by-author':'comment-name'}><a href="">{comment?.user?.name}</a></h6>
                                <span>{new Date(comment?.created_at).toLocaleDateString()}</span>
                            </div>

                                <Box>
                                    {(comment?.user_id && comment.user_id === userDetails.id) 
                                    && <>
                                        <BorderColorIcon className='cursorPointer' sx={{mr:1}} onClick={(e)=> handleCommentEdit(comment)} />
                                        <DeleteIcon className='cursorPointer' onClick={(e)=> handleDeleteEventComment(comment.uuid)} />
                                    </>
                                    }
                                </Box>
                                <div className="reply_icon cursorPointer">
                                    
                                    <ReplyIcon onClick={(e)=>handleReplayClass(comment.id,replayClass)} />

                               


                                 {/* <div className="memberCard_footer_right">
                                    {(comment?.user_id && comment.user_id === userDetails.id)  && 
                                        <div className="memeber_dropDown"><MoreVertIcon/></div>}
                                            <div className="member_dropdown_Plate">
                                                <ul>
                                                <li onClick={(e)=> handleCommentEdit(comment)} >Edit</li>
                                                <li onClick={(e)=> handleDeleteEventComment(comment.uuid)}>Delete</li>
                                                </ul>
                                            </div>
                                        </div> */}
                                 </div>

                                
                            
                        </div>
                        <div class="comment-content">
                            {comment?.details}
                        </div>
                        <div className={`${replayClass} ${comment.id}`}>
                            <TextField
                                value={replayDetails}
                                id="filled-multiline-static"
                                label="Type Here..."
                                multiline
                                fullWidth
                                rows={2}
                                variant="filled"
                                focused
                                onChange={(e) => setReplayDetails(e.target.value)}
                            />
                            <Box sx={{ mt: 1 }} className="submit_riview">
                                {(replayDetails !== null && replayDetails !== '') && <Button variant="contained" onClick={(e) =>{handleReviewCreated(null, replayDetails, comment.id) ;handleReplayClass(comment.id,replayClass);setReplayDetails('')}} endIcon={<SendIcon />} ></Button>}
                                {(replayDetails === null || replayDetails === '') && <Button variant="outlined" disabled endIcon={<SendIcon />}></Button>}
                            </Box>
                        </div>
                    </div>
                </div>

                {comment && comment?.children.length > 0 && comment?.children.map((comment, i) => {
                    return (
                        <ul class="comments-list reply-list">
                            <li>
                                <div class="comment-avatar"><img src={`${baseUrl}/${comment.user.avatar}`} alt="" /></div>
                                <div class="comment-box">
                                    <div class="comment-head">
                                        <div>
                                            <h6 class="comment-name"><a href="">{comment?.user?.name}</a></h6>
                                            <span>{new Date(comment?.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <Box>
                                            {(comment?.user_id && comment.user_id === userDetails.id) 
                                            && <>
                                                <BorderColorIcon className='cursorPointer' sx={{mr:1}} onClick={(e)=> handleCommentEdit(comment)} />
                                                <DeleteIcon className='cursorPointer' onClick={(e)=> handleDeleteEventComment(comment.uuid)} />
                                            </>
                                            }
                                        </Box>
                                       
                                    </div>
                                    <div class="comment-content">
                                        {comment?.details}
                                    </div>
                                </div>

                            </li>
                        </ul>
                    )
                })

                }

            </li>
        </>
    )
}

export default EventCommentReplay