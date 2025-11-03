// app/javascript/chat/containers/message_form.jsx

import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

/**
 * MessageForm component
 * Props:
 * - selectedChannel: string, current channel from URL (passed from App.jsx)
 * - currentUser: string, Redux state
 * - createMessage: function, Redux action
 */
const MessageForm = ({ selectedChannel, currentUser, createMessage }) => {
  const [value, setValue] = useState('');       // Local state for input
  const messageBoxRef = useRef(null);           // Ref to input for focusing

  // Focus input on mount
  useEffect(() => {
    if (messageBoxRef.current) messageBoxRef.current.focus();
  }, []);

  // Handle input changes
  const handleChange = (e) => setValue(e.target.value);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return; // prevent empty messages
    createMessage(selectedChannel, currentUser, value);
    setValue('');              // reset input
  };

  return (
    <form onSubmit={handleSubmit} className="channel-editor">
      <input
        ref={messageBoxRef}
        type="text"
        className="form-control"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder={`Message #${selectedChannel}`}
      />
      <button type="submit">Send</button>
    </form>
  );
};

// Redux state mapping: only currentUser is needed from Redux
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

// Connect Redux action and state
export default connect(mapStateToProps, { createMessage })(MessageForm);
