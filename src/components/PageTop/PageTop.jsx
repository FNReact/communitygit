import { Container } from '@mui/material'
import React, { Fragment } from 'react'

const PageTop = (props) => {
    return (
        <Fragment >
        <Container fluid={true} className='topFixedBannerPageTop p-0'>
            <div className='topBannerOverlayPageTop'>
                <Container className='topContentPageTop'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1 className='topTitlePageTop'>{props.pageTitle}</h1>
                        </Grid>
                    </Grid>
                </Container>

            </div>
        </Container>
     </Fragment>
    )
}

export default PageTop