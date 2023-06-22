import React from 'react';
import './App.css';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth  } from './components';

const apiKey ="egp5drfwjm2x";
const client = StreamChat.getInstance(apiKey);
const authToken = false;

function App() {
  if(!authToken) return <Auth/>
  
  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
