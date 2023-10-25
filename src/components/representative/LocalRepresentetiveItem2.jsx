import React, { Fragment, useContext, useEffect, useState } from "react";
import avatar from '../../asset/image/20.png';
import avatar2 from '../../asset/image/avatar.png';
import { Avatar, AvatarGroup, Box, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import parser  from 'html-react-parser'
import { baseUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
 
const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const LocalRepresentetiveItem2 = ({representative,handleDeleteRepresentetive}) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const { userDetails, msDetails, loggedInUser } = useContext(UserContext);


    const [rating, setRating] = useState(0);
  const [userRecommended, setUserRecommended] = useState(false);

  useEffect(() => {
    if (representative?.recommendations && representative.recommendations.length > 0) {
      var count = 0;
      representative.recommendations.forEach((element) => {
        count = parseInt(element.rating) + count;

        if (element?.user.id === userDetails.id) {
          setUserRecommended(true);
        }
      });

      const storeRating = count / representative.recommendations.length;
      setRating(storeRating);
    }
  }, []);

    console.log('representative', representative)

    return (
        <Fragment>

            <div className="resource_item_2 representative_item_2 cursorPointer" >
                <Avatar
                    onClick={(e)=>navigate('/representative-details', {state:{uuid:representative.uuid,  userRecommended: userRecommended,}})}
                    alt={representative?.user?.name}
                    src={`${baseUrl}/${representative?.user?.avatar}`}
                    sx={{ width: 100, height: 100 }} />

                {representative?.title && <h4 onClick={(e)=>navigate('/representative-details', {state:{uuid:representative.uuid,  userRecommended: userRecommended,}})}>{representative?.title}</h4>}    
                {representative?.subtitle && <h5 onClick={(e)=>navigate('/representative-details', {state:{uuid:representative.uuid,  userRecommended: userRecommended}})}>{representative?.subtitle}</h5>} 
                {representative && representative?.details && <div className="" onClick={(e)=>navigate('/representative-details', {state:{uuid:representative.uuid, userRecommended: userRecommended}})}>{parser(representative.details.slice(0,50))}</div>}

                {(representative?.user  && representative?.user.id === userDetails.id)?
                <div className="create_owner" onClick={(e)=>navigate('/community-profile',{state:{uuid:representative?.user?.uuid,userId:representative?.user.id,userData:representative?.user}})}>
                    Create by <span> {representative?.user?.name} </span>
                </div>
                :
                    <div className="create_owner" onClick={(e)=>navigate('/community-profile/other',{state:{uuid:representative?.user?.uuid,userId:representative?.user.id,userData:representative?.user}})}>
                    Create by <span> {representative?.user?.name} </span>
                    </div>
                }
               <div className="item_Bottom">
               {representative?.created_at && <div className="create_date">
                    Since <span>{new Date(representative?.created_at).toLocaleDateString()} </span>
                </div>}
                <div className="action_list">
                        {(userDetails.id === msDetails.user_id ||
                        loggedInUser.user_type === "admin" ||
                        userDetails.id === representative?.user?.id) && (
                        <i
                            className="cursorPointer"
                            onClick={(e) =>
                            navigate("/representative-create", {
                                state: { uuid: representative.uuid },
                            })
                            }
                        >
                            <EditIcon />
                        </i>
                        )}
                        {(userDetails.id === msDetails.user_id ||
                        loggedInUser.user_type === "admin" ||
                        userDetails.id === representative?.user?.id) && (
                        <i
                            className="cursorPointer"
                            onClick={(e) => handleDeleteRepresentetive(representative.uuid)}
                        >
                            <DeleteIcon />
                        </i>
                        )}
                    </div>
               </div>
               

               {representative?.recommendations && representative.recommendations.length > 0 && (
                <div className="recomment_overview">
                    <AvatarGroup max={3}>
                    {representative.recommendations.map((data, key) => {
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
        </Fragment >
    )
}

export default LocalRepresentetiveItem2