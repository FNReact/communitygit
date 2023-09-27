import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserContext } from "../../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const MagazineTopNavigation = () => {
  const { magazine } = useContext(UserContext);

  const navigate = useNavigate();
  const handleNavigate = (catId, msId) => {
    navigate(`/page-two/${catId}/${msId}`);
    window.location.reload();
  };

  var dynamicMenues = "";
  if (magazine?.main_nav) {
    dynamicMenues = magazine?.main_nav.map((data, key) => {
      if (data.name) {
        var menu = "";
        if (data.children.length < 1) {
          return (
            <li>
              <Link> {data?.name} </Link>
            </li>
          );
        } else {
          return (
            <>
              <li class="droppper">
                <Link>
                  {data?.name}
                  <i>
                    <ArrowDropDownIcon />
                  </i>
                </Link>
                <ul class="sub_down">
                {data.children.map((data, key) => {
                    return (
                      <li>
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
      <div className="magazine_nav">
        <ul class="nav_list">
          <li>
            <Link to={"/magazine"}>Home</Link>
          </li>
            {dynamicMenues}
        </ul>
        <div className="mag_search">
          <input type="text" placeholder="Search" className="form_control" />
          <i>
            <SearchIcon />
          </i>
        </div>
      </div>
    </>
  );
};

export default MagazineTopNavigation;
