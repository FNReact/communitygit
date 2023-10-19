import React, { Fragment } from "react";
import avatar from '../../asset/image/20.png';
import avatar2 from '../../asset/image/avatar.png';
import { Avatar, AvatarGroup, Box, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
 
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


const LocalBusinessItem2 = () => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    return (
        <Fragment>

            <div className="business_item_2">
                <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 100, height: 100 }} />
                <h4>Business Name</h4>
                <h5>This is sub title</h5>
                <div className="create_owner">
                    Create by <span> Fahim </span>
                </div>
                <div className="create_date">
                    Since <span> 12 Oct 2023  </span>
                </div>
                <div className="recomment_overview">
                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src={avatar2} />
                        <Avatar alt="Travis Howard" src={avatar2} />
                        <Avatar alt="Cindy Baker" src={avatar2} />
                        <Avatar alt="Agnes Walker" src={avatar2} />
                        <Avatar alt="Trevor Henderson" src={avatar2} />
                    </AvatarGroup>
                </div>
                <div className="star_mark">
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={1}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </div>
            </div>
        </Fragment >
    )
}

export default LocalBusinessItem2