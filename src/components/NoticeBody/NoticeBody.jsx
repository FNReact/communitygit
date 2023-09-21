import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext } from "react";
import NoticeItem from "../NoticeBody/NoticeItem";
import Notice from "../../asset/image/Not.jpg";
import { UserContext } from "../../utils/UserContext";
import { Grid } from "@mui/material";

const NoticeBody = () => { 
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <Grid container spacing={2}>
         <Grid item xs={8}>
           <div className="noticeHome">
              <div className="notice_heading">
                <div className="notice_header">Notice Board</div>
                <div className="noticeAdder">
                  <i>
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                </div>
              </div>
            </div>
          <NoticeItem />
         </Grid>
         <Grid item xs={4}>
            <div className="notice_Image_board">
              <div className="notice_Image_Top">
                <div className="NoticeImg">
                  <img src={Notice} alt="" />
                </div>
              </div>
              <div className="notice_Image_Bottom">
                <div className="notice_announce">
                  Check <span>Your</span> <br /> Daily Notice
                </div>
                <p>
                  Lorem ipsum dolor sit amet adipisicing elit. Doloremque autem
                  placeat soluta cumque officia ad, ducimus ut tenetur unde?
                </p>
              </div>
            </div>
         </Grid>
      </Grid>
    </Fragment>
  );
};

export default NoticeBody;
