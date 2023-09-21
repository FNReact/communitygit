import React, { Fragment } from "react";
import { useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { baseUrl, commentsUrl, reactionsUrl } from "../../api/Api";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
import { notifyError } from "../../utils/Toast";
import Swal from "sweetalert2";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";



const LoungeItemContent = ({ data ,itemModalClick,getAllFeeds,getSingleFeedDetails }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [myReaction,setMyReaction] = useState(null);
  const [meaning, setmeaning] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(false)

  const url = window.location.href;
  const segName = url.split("/").pop();




  const user = useContext(UserContext);
  const token = sessionStorage.getItem("token");




  useEffect(() => {
    if (data && data.content && data.content !==null && data.content !=='' && data !== undefined) {
      setParagraph(data.content);
    }
    
    if(data.my_reactions.length>0){
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
    "👍": "like",
    "❤️": "love",
    "😊": "happy",
    "🤗": "adore",
    "😆": "laugh",
    "👿": "angry",
    "😥": "sad",
};
const [emojiClass, setEmojiClass] = useState(`emojiTab ${data.id} d-none`)
var feedsEmoji = Object.keys(reactionEmoji);


// emoji click handler
const emojiClickHandler =(emoji,postId,uuid)=> {
    setLoaderVisible(true)
    setEmojiClass(`emojiTab ${postId} d-none`)
    var meaning = reactionEmoji[emoji];
    setmeaning(meaning); 
    setMyReaction(emoji);

    let data = new FormData();
    data.append('post_id', postId);
    data.append('reaction_type', meaning);

    var config;
    if(uuid !==null){
        config = {
          method: 'post',
          url: `${reactionsUrl}/${uuid}`,
          headers: { 
            'Authorization': `Bearer ${token}`, 
          },
          data : data
        };
    }else{
      config = {
        method: 'post',
        url: `${reactionsUrl}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
    }
    axios.request(config)
    .then((response) => {
      getAllFeeds()
      if(getSingleFeedDetails !==undefined){
        getSingleFeedDetails();
      }
      setTimeout(()=>{
        setLoaderVisible(false)
      },2000)
    })
    .catch((error) => {
      setLoaderVisible(false)
    //  notifyError('Something went wrong')
    });

}

// handle remove reaction
const handleRemoveReaction=(uuid)=>{
  if(uuid !==null){
    let config = {
      method: 'delete',
      url: `${reactionsUrl}/${uuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      if(getSingleFeedDetails !==undefined){
        getSingleFeedDetails();
      }
      setMyReaction(null)
      getAllFeeds();
    })
    .catch((error) => {
      // notifyError('Something went wrong !')
    });
  }
}

// handle emoji class
const handleEmoji =(id,emojiClass)=>{
  if(emojiClass ===`emojiTab ${id} d-none`){
    setEmojiClass(`emojiTab ${id}`)
  }else{
    setEmojiClass(`emojiTab ${id} d-none`)
  }

}



  return (
    <Fragment>
      <div className="LoungeItemContent">
        <div className="loungeContent"  onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}>
          {segName !=='loungeitemDetail' && data && data.content && data.content !=null && data.content !=='' && data !== undefined &&  <ReactReadMoreReadLess
            charLimit={220}
            readMoreText={"Read more"}
            readLessText={"Read less"}
            onClick={(e)=> navigate('/loungeitemDetail', {state:{data:data}})}
          >
            {paragraph}
          </ReactReadMoreReadLess>}

          {segName ==='loungeitemDetail' && <><div className="content">{paragraph}</div></>}
         
        </div>
        <div className="loungeItem_footer">
          <div className="loung_item_status_update">
             <div className="status_update_left">

              {loaderVisible ===false ?  <div className="statusUpdate_item" >
                  <ThumbUpIcon/>{' '} {data.total_reactions}
               </div>
               :
                 <div className="statusUpdate_item" >
                 <ThreeDots  height="30"  width="30"  radius="9" color="#4fa94d"  ariaLabel="three-dots-loading" visible={true} />
              </div>
               }
              
             
               <div className="statusUpdate_item" onClick={(e)=> itemModalClick()}>
                    Comments  {data.total_comments}
               </div>
             </div>
             <div className="status_update_right">
             </div>
          </div>
         <div className="emojis_container">
            <div className={`${emojiClass} ${data.id}`}>
              {feedsEmoji.map(function (emoji) {
                    return (
                        <span
                            className="singleEmoji"
                            onClick={() => emojiClickHandler(emoji,data.id,(data.my_reactions.length>0)?data.my_reactions[0].uuid:null)}
                            key={emoji}>
                            {emoji}
                        </span>
                    );
              })}
        </div>
          </div>
        
        <div className="loungeItem_footer_status">
       
            <div className="footer_status_one" >

              {(myReaction !==null)?<span className="emoji_icon" onClick={(e)=> handleRemoveReaction((data.my_reactions.length>0)?data.my_reactions[0].uuid:null)}>{myReaction}
              </span>
              :<div onClick={(e)=>handleEmoji(data.id,emojiClass)}><ThumbUpIcon/><span>Like</span></div>}
            </div>
            <div className="footer_status_one" 
            onClick={(e)=> itemModalClick()}
            >
              <ChatBubbleIcon/>
              <span>Comment</span>
            </div>
           
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoungeItemContent;