import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserContext } from "../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { categoryUrl } from "../../api/Api";
import MainLoader from "../PageLoadEffects/MainLoader";
const MagazineTopNavigation = () => {
  const { magazine } = useContext(UserContext);
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
      if(response?.data?.type ==='menu'){
        navigate('/magazine-category-posts', {state:{id:data.id}})
      }else{
        navigate('/magazine-category-details', {state:{data:data}})
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
      navigate('/magazine-category-posts', {state:{search:searchQuery}})
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
            <li onClick={(e)=> handleNavigate(data)}>
              <Link> {data?.name} </Link>
            </li>
          );
        } else {
          return (
            <>
              <li class="droppper" >
                {/* <Link onClick={(e)=> handleNavigate(data)}> */}
                <Link onClick={(e)=> navigate('/magazine-category-posts', {state:{id:data.id}})}>
                  {data?.name}
                  <i>
                    <ArrowDropDownIcon />
                  </i>
                </Link>
                <ul class="sub_down">
                {data.children.map((data, key) => {
                    return (
                      // <li onClick={(e)=> handleNavigate(data)}>
                      <li onClick={(e)=>navigate('/magazine-category-posts', {state:{id:data.id}})}>
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
    {loaderVisible ===true && <MainLoader />} 
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
            onKeyPress={handleKeyPress}/>
          <i onClick={handleSearch}>
            <SearchIcon />
          </i>
        </div>
      </div>
    </>
  );
};

export default MagazineTopNavigation;
