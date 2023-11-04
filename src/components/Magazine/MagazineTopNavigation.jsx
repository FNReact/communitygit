import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserContext } from "../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { baseUrl, categoryUrl } from "../../api/Api";
import MainLoader from "../PageLoadEffects/MainLoader";
import { Button, Grid, Tooltip } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
const MagazineTopNavigation = () => {
  const { magazine, msDetails, userDetails, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loaderVisible, setLoaderVisible] = useState(false)

  const handleNavigate = (data) => {
    setLoaderVisible(true)
    let config = {
      method: 'get',
      url: `${categoryUrl}/${data.uuid}`,
    };

    axios.request(config)
      .then((response) => {
        if (response?.data?.type === 'menu') {
          navigate('/magazine-category-posts', { state: { id: data.id, data: data } })
        } else {
          navigate('/magazine-category-details', { state: { data: data } })
        }
        setLoaderVisible(false)
      })
      .catch((error) => {
        setLoaderVisible(false)
        setLoaderVisible(false)
        // console.log(error);
      });
  };


  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search
  const handleSearch = () => {
    navigate('/magazine-category-posts', { state: { search: searchQuery } })
  };

  // Function to handle the Enter key press in the search input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };



  var dynamicMenues = "";
  if (magazine?.main_nav) {
    dynamicMenues = magazine?.main_nav.map((data, key) => {
      if (data.name) {
        var menu = "";
        if (data.children.length < 1) {
          return (
            <li onClick={(e) => handleNavigate(data)}>
              <Link> {data?.name} </Link>
            </li>
          );
        } else {
          return (
            <>
              <li class="droppper" >
                {/* <Link onClick={(e)=> handleNavigate(data)}> */}
                <a onClick={(e) => handleNavigate(data)}>
                  {data?.name}
                  <i>
                    <ArrowDropDownIcon />
                  </i>
                </a>
                <ul class="sub_down">
                  {data.children.map((data, key) => {
                    return (
                      // <li onClick={(e)=> handleNavigate(data)}>
                      <li onClick={(e) => handleNavigate(data)}>
                        <Link> {data.name} </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          );
        }
      }
    });
  }

  return (
    <>
      {loaderVisible === true && <MainLoader />}

      <div className="magazine_top" style={{
        backgroundImage: msDetails?.meta?.community_settings?.magazine_banner_enable ==='1'?`url("${baseUrl}/${msDetails?.meta?.community_settings?.magazine_banner}")`:'' 
      }}>
        <Grid container spacing={2}>
           <Grid item lg={4} md={4} sm={4} xs={4}>
           <div className="magzin_logo">
            {msDetails?.meta?.community_settings?.magazine_logo_enable === '1'
              && msDetails?.meta?.community_settings?.magazine_logo
              && <img src={`${baseUrl}/${msDetails?.meta?.community_settings?.magazine_logo}`} alt="" />
            }
          </div>
           </Grid>
           <Grid item lg={4} md={8} sm={8} xs={8}>
           {msDetails?.meta?.community_settings?.magazine_name_enable === '1'
            && msDetails?.meta?.community_settings?.magazine_name
            && <div className="magazine_t">
              <span>
                {msDetails?.meta?.community_settings?.magazine_name}
              </span>
            </div>
          }
           </Grid>
           <Grid item lg={4} md={12} sm={12} xs={12}>
           {(loggedInUser?.user_type === 'admin' || userDetails.id === msDetails?.user_id) &&
          <div className="top_left">
            {/* <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={(e) => navigate("/my-magazine-content")}
                  >
                    My Compositions
                  </Button> */}
            <Tooltip title="Preview Demo Magazine">
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={(e) => navigate("/magazine-demo")}
              >
                <i><PreviewIcon /></i>
              </Button>
            </Tooltip>
            <Tooltip title='Add Menu'>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={(e) => navigate("/magazine-menu")}
              >
                <i><PostAddIcon /></i>
              </Button>
            </Tooltip>

            <Tooltip title='Add Content'>
              <Button
                variant="contained"
                onClick={(e) => navigate("/magazine-content")}
              >
                <i><PlaylistAddIcon /></i>
              </Button>
            </Tooltip>
          </div>}
           </Grid>
        </Grid>
      </div>
      <div className="magazine_nav">
        <ul class="nav_list">
          <li>
            <Link to={"/magazine"}>Home</Link>
          </li>
          {dynamicMenues}
        </ul>
        <div className="mag_search">
          <input
            type="text"
            placeholder="Search"
            className="form_control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} />
          <i onClick={handleSearch}>
            <SearchIcon />
          </i>
        </div>
      </div>
    </>
  );
};

export default MagazineTopNavigation;
