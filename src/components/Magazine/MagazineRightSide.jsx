import React, { useContext } from "react";
import ban1 from "../../asset/image/test4.jpg";
import { UserContext } from "../../utils/UserContext";
import { baseUrl } from "../../api/Api";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const MagazineRightSide = () => {
  const { magazine, msDetails } = useContext(UserContext);
  const navigate = useNavigate();
  // handle details
  const handleDetails =(data)=>{
    navigate('/magazine-details', {state:{data:data}})
  }

  

  return (
    <>
      {/* popular posts */}
      <div className="magzine_subItem_wrapper">
        <h5>Popular Posts</h5>
        {magazine &&
          magazine?.popular &&
          magazine?.popular.length > 0 &&
          magazine?.popular.slice(0,5).map((data, key) => {
            return (
              <div className="magzine_subItem" onClick={(e)=> handleDetails(data)}>
                <div className="magzine_subItem_img">
                  <img
                    src={`${baseUrl}/${data?.featured_image}`}
                    alt={data?.title}
                  />
                </div>
                <div className="magzine_subItem_text">
                  <h4>{data?.title}</h4>
                </div>
              </div>
            );
          })}
          {magazine?.popular.length ===0 &&  <Box display="flex" justifyContent="center" justifyItems="center">
          <Button disabled>No popular post</Button>
        </Box>}
       
      </div>
      {/* latest posts */}
      <div className="magzine_subItem_wrapper">
        <h5>Latest Posts</h5>
        {magazine &&
          magazine?.latest &&
          magazine?.latest.length > 0 &&
          magazine?.latest.slice(0,5).map((data, key) => {
            return (
              <div className="magzine_subItem" onClick={(e)=> handleDetails(data)}>
                <div className="magzine_subItem_img">
                  <img
                    src={`${baseUrl}/${data?.featured_image}`}
                    alt={data?.title}
                  />
                </div>
                <div className="magzine_subItem_text">
                  <h4>{data?.title}</h4>
                </div>
              </div>
            );
          })}
        {magazine?.latest.length ===0 &&  <Box display="flex" justifyContent="center" justifyItems="center">
          <Button disabled>No popular post</Button>
        </Box>}
      </div>
    </>
  );
};
