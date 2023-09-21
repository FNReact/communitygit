import React, { useEffect } from "react";
import { Fragment,useState } from "react";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import axios from "axios";
import { commentsUrl } from "../../api/Api";
import { CommentsLoadEffect } from "../PageLoadEffects";
import SingleComment from "./SingleComment";

const LoungeCommentTwo = ({data,itemModalClick,getAllFeeds})=>{
    const token = sessionStorage.getItem('token');
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





    return(
        <Fragment>
             <div className="comment_input_main">
             </div>
             {comments !==null && comments.length<1 && <Box sx={{display:'flex', justifyContent:'center', justifyItems:'center'}}><Button disabled>No Comments Yet</Button></Box>}
             
             {comments ===null  && CommentsLoadEffect()}

             {comments !==null && comments.length>0 && 
              <div className="comment_container">
                <ul className="comment_ul">
                  {comments.slice(0,2).map((mainComment,mainKey)=>{
                    return(
                      <li key={mainComment.uuid}>   
                          <SingleComment 
                          data={mainComment} 
                          getAllComments={getAllComments} 
                          replayShow='1' 
                          key={mainComment.uuid} 
                          findLast={false}
                          createBy={data.user_id}
                          // firstChildShow={firstChildShow}
                          // handleFirstChildShow={handleFirstChildShow}
                          // firstChild={true}
                          // firstChildLength={mainComment.children.length}
                           />
                              {mainComment.children.length>0 &&
                               <ul>
                                  {mainComment.children.map((firstChild, firstKey)=>{
                                      return(
                                        <li  key={firstChild.uuid}>
                                            <SingleComment 
                                            data = {firstChild} 
                                            getAllComments={getAllComments} 
                                            replayShow='1' 
                                            key={firstChild.uuid}
                                            findLast={false} 
                                            createBy={data.user_id} 
                                            // firstChild={false}
                                            // handleSecondChildShow={handleSecondChildShow}
                                            // secondChild={true}
                                            // secondChildLength={mainComment.children.length}
                                             />
                                            {firstChild.children.length>0 && 
                                               <ul>
                                                {firstChild.children.map((secondChild, secondKey)=>{
                                                  return(
                                                      <li key={secondChild.uuid}><SingleComment data={secondChild} getAllComments={getAllComments} replayShow='1' key={secondChild.uuid} findLast={true}  firstChild={false} createBy={data.user_id}  /></li>
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
              {comments !==null && comments.length>2 && <Box sx={{display:'flex', justifyContent:'center', justifyItems:'center'}}><Button onClick={(e)=>itemModalClick()} >View More</Button></Box>}
              </div>
             }
            {/* <ToastContainer /> */}
        </Fragment>
    )
}

export default LoungeCommentTwo