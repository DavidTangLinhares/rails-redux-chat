// app/javascript/chat/containers/message_list.jsx
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions';
import Message from '../components/message';
import MessageForm from './message_form';

const MessageList = ({ messages, selectedChannel, fetchMessages }) => {
  const listRef = useRef(null);
  const lastFetchedChannel = useRef(null);

  useEffect(() => {
    if (selectedChannel && selectedChannel !== lastFetchedChannel.current) {
      fetchMessages(selectedChannel);
      lastFetchedChannel.current = selectedChannel;
    }
  }, [selectedChannel, fetchMessages]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="channel-container">
      <div className="channel-title">
        <span>Channel # {selectedChannel}</span>
      </div>
      <div className="channel-content" ref={listRef}>
        {messages.map((m) => (
          <Message key={m.id || Math.random()} message={m} />
        ))}
      </div>
      <MessageForm selectedChannel={selectedChannel} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, { fetchMessages })(MessageList);
