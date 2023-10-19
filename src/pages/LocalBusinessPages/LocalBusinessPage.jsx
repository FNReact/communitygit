import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { localBusinessUrl } from "../../api/Api";
import { UserContext } from "../../utils/UserContext";
import LocalBusinessItem from "../../components/localBusiness/LocalBusinessItem";
import { BoxLoadEffectTwo } from "../../components/PageLoadEffects";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalBusinessItem2 from "../../components/localBusiness/LocalBusinessItem2";


const LocalBusinessPage = () => {
  const navigate = useNavigate();
  const [business, setResouce] = useState(null)
  const { msDetails, userDetails } = useContext(UserContext)
  const token = sessionStorage.getItem('token');
  const getAllResouces = () => {
    let config = {
      method: 'get',
      url: `${localBusinessUrl}?microsite_id=${msDetails.id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    axios.request(config)
      .then((response) => {
        setResouce(response.data.data);
      })
  }

  useEffect(() => {
    getAllResouces();
  }, [])

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <div className="content_body">
            <div className="section_headear">
              <h4>Community Business</h4>
              <div className="btns_row">
                <Link to='/myLocalBusiness'>
                  <div className="Btn_one">
                    My Community Business
                  </div>
                </Link>
                <Link to='/localBusiness-create'>
                  <div className="Btn_two">
                    Add Business
                  </div>
                </Link>
              </div>
            </div>
            <Tooltip title="Back">
              <div className="backArrow" onClick={(e) => { navigate(-1) }}>
                <ArrowBackIcon />
              </div>
            </Tooltip>
            <Grid container spacing={2}>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <div className="business_wrapper">
                  <Grid container spacing={2}>
                    {(business !== null && business.length > 0) && business.map((data, key) => {
                      return (
                        <Grid item xs={12}>
                          <LocalBusinessItem data={data} key={key} getAllResouces={getAllResouces} admin={false} />
                        </Grid>
                      )
                    })}

                  </Grid>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <LocalBusinessItem2 />
              </Grid>
            </Grid>

            {(business !== null && business.length === 0) && <div className="placeholder_text">
              No Community Business Found
            </div>}
            {business === null && <>
              <Grid container spacing={2}>
                <Grid item lg={8} md={12} sm={12} xs={12}>{BoxLoadEffectTwo()}</Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>{BoxLoadEffectTwo()}</Grid>
              </Grid>
            </>}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LocalBusinessPage;
