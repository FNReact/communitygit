import React, { Fragment, useContext, useEffect, useState } from "react";
import avatar from "../../asset/image/20.png";
import avatar2 from "../../asset/image/avatar.png";
import { Avatar, AvatarGroup, Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import parser from "html-react-parser";
import { baseUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";

import noImage from "../../asset/image/noImage.jpg";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ResourceItem2 = ({ resource, handleDeleteResource }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const { userDetails, msDetails, loggedInUser } = useContext(UserContext);

  const [rating, setRating] = useState(0);
  const [userRecommended, setUserRecommended] = useState(false);

  useEffect(() => {
    if (resource?.recommendations && resource.recommendations.length > 0) {
      var count = 0;
      resource.recommendations.forEach((element) => {
        count = parseInt(element.rating) + count;

        if (element?.user.id === userDetails.id) {
          setUserRecommended(true);
        }
      });

      const storeRating = count / resource.recommendations.length;
      setRating(storeRating);
    }
  }, []);

  return (
    <Fragment>
      <div className="resource_item_2 cursorPointer">
        <div className="Item_image">
          <img
            onClick={(e) =>
              navigate("/resource-details", {
                state: {
                  uuid: resource.uuid,
                  userRecommended: userRecommended,
                },
              })
            }
            src={
              resource?.media[0]?.id
                ? `${baseUrl}/storage/media/${resource?.media[0]?.id}/${resource?.media[0]?.file_name}`
                : noImage
            }
            alt={resource?.title}
          />
        </div>

        {resource?.title && (
          <h4
            onClick={(e) =>
              navigate("/resource-details", {
                state: {
                  uuid: resource.uuid,
                  userRecommended: userRecommended,
                },
              })
            }
          >
            {resource?.title}
          </h4>
        )}
        {resource?.subtitle && (
          <h5
            onClick={(e) =>
              navigate("/resource-details", {
                state: {
                  uuid: resource.uuid,
                  userRecommended: userRecommended,
                },
              })
            }
          >
            {resource?.subtitle}
          </h5>
        )}
        {/* {resource && resource?.details && (
          <div
            className=""
            onClick={(e) =>
              navigate("/resource-details", { state: { uuid: resource.uuid } })
            }
          >
            {parser(resource.details.slice(0, 60))}
          </div>
        )} */}

{/* community-profile */}

        {(resource?.user  && resource?.user.id === userDetails.id)?
          <div className="create_owner" onClick={(e)=>navigate('/community-profile',{state:{uuid:resource?.user?.uuid,userId:resource?.user.id,userData:resource?.user}})}>
            Create by <span> {resource?.user?.name} </span>
          </div>
        :
            <div className="create_owner" onClick={(e)=>navigate('/community-profile/other',{state:{uuid:resource?.user?.uuid,userId:resource?.user.id,userData:resource?.user}})}>
              Create by <span> {resource?.user?.name} </span>
            </div>
        }

        <div className="item_Bottom">
          {resource?.created_at && (
            <div className="create_date">
              Since{" "}
              <span>
                {new Date(resource?.created_at).toLocaleDateString()}{" "}
              </span>
            </div>
          )}
          <div className="action_list">
            {(userDetails.id === msDetails.user_id ||
              loggedInUser.user_type === "admin" ||
              userDetails.id === resource?.user?.id) && (
              <i
                className="cursorPointer"
                onClick={(e) =>
                  navigate("/resource-create", {
                    state: { uuid: resource.uuid },
                  })
                }
              >
                <EditIcon />
              </i>
            )}
            {(userDetails.id === msDetails.user_id ||
              loggedInUser.user_type === "admin" ||
              userDetails.id === resource?.user?.id) && (
              <i
                className="cursorPointer"
                onClick={(e) => handleDeleteResource(resource.uuid)}
              >
                <DeleteIcon />
              </i>
            )}
          </div>
        </div>
        {resource?.recommendations && resource.recommendations.length > 0 && (
          <div className="recomment_overview">
            <AvatarGroup max={3}>
              {resource.recommendations.map((data, key) => {
                return (
                  <>
                    <Avatar
                      key={data.uuid}
                      alt={data?.user?.name}
                      src={`${baseUrl}/${data?.user?.avatar}`}
                    />
                  </>
                );
              })}
            </AvatarGroup>
            <div className="star_mark">
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating name="hover-feedback" value={rating} readOnly />
                </Box>
              </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ResourceItem2;
