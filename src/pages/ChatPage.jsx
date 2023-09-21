import React, { Fragment, useEffect } from 'react';
import ChatBody from '../components/Chat/ChatBody';
import { Grid } from '@mui/material';

const ChatPage = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <Fragment>
        <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <div className="content_body chat_contentBody">
            <ChatBody />
          </div>
        </Grid>
        </Grid>
    </Fragment>
  )

}

export default ChatPage;

