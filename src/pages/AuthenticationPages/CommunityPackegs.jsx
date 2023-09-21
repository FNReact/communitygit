import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../asset/image/lms.png";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { baseUrl } from '../../api/Api';
import GeneralTopNavigation from './GeneralTopNavigation';

const CommunityPackegs = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePackege = (type) => {
        navigate('/create/newCommuinity', { state: { type: type } })
    }

    useEffect(() => {
        const getInfo = sessionStorage.getItem('data')
        const info = JSON.parse(getInfo)
        setUserInfo(info)
    }, [])


    return (
        <>

            <GeneralTopNavigation back={true} />
            <div className='Card_container'>
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={6} md={4}>
                       <div className='card_wrap' onClick={(e) => handlePackege('personal')}>
                             <span>Personal</span>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div className='card_wrap' onClick={(e) => handlePackege('apartment')}>
                             <span>Appartment / House</span>
                       </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div className='card_wrap' onClick={(e) => handlePackege('business')}>
                           <span>Business / Commercial</span>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>

    )
}

export default CommunityPackegs