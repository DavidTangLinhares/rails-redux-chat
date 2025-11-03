// app/javascript/chat/containers/channel_list.jsx

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ChannelList = ({ channels, selectedChannel }) => {
  return (
    <div className="channels-container">
      <span>Redux Chat</span>
      <ul>
        {channels.map(channel => (
          <li
            key={channel}
            className={channel === selectedChannel ? 'active' : null}
          >
            <Link to={`/channels/${channel}`}># {channel}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels,
});

export default connect(mapStateToProps)(ChannelList);
