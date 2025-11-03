// app/javascript/chat/components/app.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';

const App = () => {
  const { channel } = useParams(); // get from URL

  return (
    <div className="messaging-wrapper">
      <ChannelList selectedChannel={channel} />
      <MessageList selectedChannel={channel} />
    </div>
  );
};

export default App;
