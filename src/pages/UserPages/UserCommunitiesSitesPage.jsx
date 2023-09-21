import React, { Fragment, useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material'
import axios from 'axios';
import { baseUrl, micrositeDetailsUrl, userMicrositesUrl } from '../../api/Api';
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GeneralTopNavigation from '../AuthenticationPages/GeneralTopNavigation';
import MainLoader from '../../components/PageLoadEffects/MainLoader';
import { UserContext } from '../../utils/UserContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserCommunitiesSitesPage = () => {
  const token = sessionStorage.getItem('token')
  const [userMicrosites, setUserMicrosites] = useState(null)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const {msDetails} = useContext(UserContext)
  const navigate = useNavigate();
  //get all user's microsite by given token
  const getAllUserMicrosites = () => {
    setLoaderVisible(true)
    let config = {
      method: 'get',
      url: `${userMicrositesUrl}?type_id=9`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.request(config)
      .then((response) => {
        setUserMicrosites(response.data.data)
        var ids = [];
        if(response?.data?.data.length>0){
          response?.data?.data.forEach(element => {
            if(element.status ===1){
              ids.push(element.microsites.id)
            }
          });
        }
        sessionStorage.setItem('user-ms-ids', JSON.stringify(ids))
        setLoaderVisible(false)
      }).catch((e)=>{
        setLoaderVisible(false)
      }
      )
  }

  useEffect(() => {
    getAllUserMicrosites()
  }, [])

  // handle visit microsite
  const handleVisitNow = (uuid) => {
    let config = {
      method: 'get',
      url: `${micrositeDetailsUrl}/${uuid}`,
    };

    axios.request(config)
      .then((response) => {
        sessionStorage.setItem('msDetails', JSON.stringify(response.data))
        window.location.href = '/'

      })
  }





  return (
    <Fragment>
      <div className="entry_header">
        <GeneralTopNavigation back={true} />
      </div>
      <div className="community_list_item">
        {userMicrosites !== null && userMicrosites.length > 0 &&
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {userMicrosites.map((data, key) => {
              if (data?.microsites?.subtype_id === 9 && data?.status ===1) {
                return (
                  <Grid item lg={3} md={6} sm={12} xs={12}>
                    <div className="commuinity_item">
                      <div className="commuinty_img">
                        <img src={`${baseUrl}/${data.microsites.entity_logo}`} alt="" />
                      </div>
                      <div className="commuinity_name">
                        {data.microsites.name}
                      </div>
                      {data.microsites.location !== null && <div className="commuinity_location"> <span>Location : </span> {data.microsites.location.slice(0, 100)}...</div>}
                      <div className="card_footer">
                        <div className="viewBtn" onClick={(e) => handleVisitNow(data.microsites.uuid)}>
                          View Community
                        </div>
                      </div>
                    </div>

                  </Grid>
                )
              }
            })}
          </Grid>}
      </div>

    {loaderVisible ===true && <MainLoader />}

    </Fragment>
  )
}

export default UserCommunitiesSitesPage