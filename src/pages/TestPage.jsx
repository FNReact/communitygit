// import { Grid } from '@mui/material';
// import React from 'react';
// import { StreamChat } from 'stream-chat';
// import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/v2/index.css';

// const chatClient = new StreamChat('dz5f4d5kzrue');
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZnJhZ3JhbnQtc2lsZW5jZS0yIiwiZXhwIjoxNjg5MTUzNzcwfQ.0IncwHhNHN2AqUAsBymXDt8oV1vQP7tm_bUIJsLO_c0';

// chatClient.connectUser(
//   {
//     id: 'fragrant-silence-2',
//     name: 'fragrant',
//     image: 'https://getstream.io/random_png/?id=fragrant-silence-2&name=fragrant',
//   },
//   userToken,
// );

// const channel = chatClient.channel('messaging', 'custom_channel_id', {
//   // add as many custom fields as you'd like
//   image: 'https://www.drupal.org/files/project-images/react.png',
//   name: 'Talk about React',
//   members: ['fragrant-silence-2'],
// });

// const TestPage = () => (
//   <Grid container spacing={2}>
//   <Grid item xs={3}></Grid>
//   <Grid item xs={9}>
//     <div className="content_body chat_contentBody">
//     <Chat client={chatClient} theme='str-chat__theme-light'>
//     <Channel channel={channel}>
//       <Window>
//         <ChannelHeader />
//         <MessageList />
//         <MessageInput />
//       </Window>
//       <Thread />
//     </Channel>
//   </Chat>
//     </div>
//   </Grid>
//   </Grid>
// );

// export default TestPage;