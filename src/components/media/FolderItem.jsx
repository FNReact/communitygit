import React, { Fragment, useState } from "react";
import folder from "../../asset/image/folder.png";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {  Menu, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Swal from "sweetalert2";
import axios from "axios";
import { deleteFolderUrl } from "../../api/Api";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";
const FolderItem = ({ data, onClick, formatBytes,handleUpdateFolder, adminId, getAllMedia }) => {
  const {msDetails, userDetails,loggedInUser} = useContext(UserContext);
  ReactSession.setStoreType("sessionStorage");
  const token = sessionStorage.getItem('token')
  const [loaderShow, setLoaderShow] = useState("none");

  const location = useLocation();
  var URL = data;
  var arr = URL.split("/");
  var folderName = "";
  let folderposition = 1;
  if (location.state) {
    folderposition = location.state.position;
  }
  folderName = arr[folderposition];

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(data.created_at);
  var date = today.toLocaleDateString("en-US", options);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }


    //handle delete a folder
    const handleDeleteFolder = async (name) => {
      // var valueName = inputValue.split('.').slice(0, -1).join('.')
      // var folderName = name.split("-").join(" ")
      var data = new FormData();
      data.append("collection_name", name);
      var config = {
        method: "post",
        url: `${deleteFolderUrl}/${msDetails.uuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
  
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        
        if (result.isConfirmed) {
          axios(config)
            .then(function (response) {
              getAllMedia();
              notifySuccess("Folder successfully Deleted", 2000);
              // setTimeout((e) => {
              //   window.location.reload();
              // }, 2000);
            })
            .catch(function (error) {
              setLoaderShow("none");
              notifyError("Something went wrong!. Please try again", 5000);
            });
        } else {
          setLoaderShow("none");
        }
      });
    };

  
  

  if (data) {
    return (
      <Fragment>
        <div className="my_item">
          <div className="item_icon" onClick={onClick}>
            <img src={folder} alt="" />
          </div>
          {folderName && (
            <div className="item_name"> {folderName.split("-").join(" ")}</div>
          )}
          <div className="Folder_list_activity">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div className="icoon">
                    {(userDetails.id === msDetails.user_id || loggedInUser.user_type==="admin") && <MoreVertIcon {...bindTrigger(popupState)} />}
                  </div>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      className="droper_menu_item"
                      onClick={(e) => {
                        popupState.close();
                        handleUpdateFolder(folderName.split("-").join(" "));
                      }}
                    >
                      Rename Folder
                    </MenuItem>
                    <MenuItem
                      className="droper_menu_item"
                      onClick={(e) => {
                        handleDeleteFolder(data);
                        popupState.close();
                      }}
                    >
                      Delete Folder
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
         
        </div>
      </Fragment>
    );
  }
};

export default FolderItem;
