// app/javascript/chat/containers/message_form.jsx
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

const MessageForm = ({ selectedChannel, createMessage }) => {
  const [value, setValue] = useState('');
  const messageBoxRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) messageBoxRef.current.focus();
  }, []);

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    createMessage(selectedChannel, value); // removed currentUser
    setValue('');
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

export default connect(null, { createMessage })(MessageForm);
