import React, { Fragment, useEffect, useState } from 'react';
import ChatBody from '../components/Chat/ChatBody';
import { Grid } from '@mui/material';
import axios from 'axios';
import { chatRoomUrl } from '../api/Api';
import io from 'socket.io-client';
import Pusher from 'pusher-js';


const socket = io('https://signal.icircles.app:9001');
// const socket = io('https://icircles.app');
// const socket = io('wss://signal.icircles.app:9001/socket.io');

const ChatPage = () => {
  const[chatRooms, setChatRooms] = useState([])
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  // get all chat rooms
  const getAllChatRooms = ()=>{
    let config = {
      method: 'get',
      url: chatRoomUrl,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setChatRooms(response.data)
    })
    .catch((error) => {
    });
  }

  useEffect(()=>{
    getAllChatRooms()
  },[])


  // socket
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for online/offline status updates
    socket.on((data) => {
      setOnlineUsers(data.onlineUsers);
      console.log('socket data', data)
    });

    // client-side
  socket.on("connect", (data) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    console.log('user-status', data)
  });

    // Listen for incoming notifications
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      console.log('notification', data)
    });

    // Clean up the socket connection on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // console.log('onlineUsers', onlineUsers)
  // console.log('notifications', notifications)

  console.log('socket info', socket)


  useEffect(() => {
    var pusher = new Pusher("69ef518953032858d64d", {
      cluster: "ap1",
      encrypted: true,
    });   
    var channel = pusher.subscribe("notifyChannel");
     channel.bind("notifyChannel", async function (response) {
         alert('some notification');
     })
});



  return (
    <Fragment>
        <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <div className="content_body chat_contentBody">
            <ChatBody chatRooms={chatRooms} setChatRooms={setChatRooms} getAllChatRooms={getAllChatRooms} />
          </div>
        </Grid>
        </Grid>
    </Fragment>
  )

}

export default ChatPage;

