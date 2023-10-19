import { faBookmark, faComment, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Fragment } from "react";
import L1  from '../../asset/image/profile.jpg'
import ReactReadMoreReadLess from "react-read-more-read-less";
  const NoticeItem = ()=>{
  const [isShown, setIsShown] = useState(false);
  const paragraph = 'Hello Everyone Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, commodi. Quae, esse tempore maxime quos eligendi voluptate dolores numquam provident. Voluptates repellendus magnam sunt sintassumenda atque, sequi rerum veritatis quaerat id neque vitae placeat accusamus in nihil similique earum, praesentium harum expedita laudantium aliquid aspernatur molestias et laboriosam? Accusantium.  Lorem ipsum dolor, sitamet consectetur adipisicing elit. Eos, commodi. Quae, esse tempore maxime quos eligendi voluptate dolores numquam provident. Voluptates repellendus magnam sunt sint assumenda atque, sequi rerum veritatis quaerat id nequevitae placeat accusamus in nihil similique earum, praesentium harum expedita laudantium aliquid aspernatur molestias et laboriosam? Accusantium.'
  const handleClick = event => {
          setIsShown(current => !current);
     };
    return(
        <Fragment>
             <div className="notice_item">
                <div className="notice_Title">
                     Lorem Laduru Lana dio denara sekum.
                </div>
                    <div className="profile_bio2">
                        <div className="profile_img">
                                      <img src={L1}  alt='' />
                                   </div>
                                    <div className="profile_info">
                                <ul>
                                     <li><a href="/" className="profile_user_name "> Fahim Ahmed </a></li>
                                     <li className="profile_title"> <i><FontAwesomeIcon icon={faUserAlt} /></i> Authore</li>
                               </ul>
                        <div className="post_time">6 hr ago</div>
                    </div>
                 </div>
                 <div className="noticeContent">
                 <ReactReadMoreReadLess
                    charLimit={380}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                    >
                {paragraph}
            </ReactReadMoreReadLess>
                 </div>
                 <div className="noticeItem_footer">
                    <div className="noticeItem_footer_left">
                       <div className="footerLeft_one">
                         <i><FontAwesomeIcon icon={faBookmark} /></i>
                       </div>
                       <div className="footerLeft_one" onClick={handleClick}>
                         <i><FontAwesomeIcon icon={faComment} /></i>
                         <span>Response</span></div>
                    </div>
                    <div className="noticeItem_footer_right"></div>
                 </div>
                 {isShown && (
                             <div className="noticeResponse">
                                <div className="commnetorProfile">
                                    <img src={L1}  alt='' />
                                </div>
                                <div className="commentor_placehold">
                                    <input type="text" placeholder="Post your text, video or photo" className="form_control" />
                                </div>
                             </div>
                            )}
                 {isShown}
             </div>
        </Fragment>
    )

 
}

export default NoticeItem