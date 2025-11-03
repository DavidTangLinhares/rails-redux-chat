import React from 'react';
import { emojify } from 'react-emojione';

function strToRGB(str = "Anonymous") {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return `#${"00000".substring(0, 6 - c.length)}${c}`;
}

const Message = ({ message }) => {
  if (!message) return null;

  const created_at = message.created_at || "";
  const user = typeof message.user === "string"
    ? message.user
    : message.user?.email?.split('@')[0] || "Anonymous";
  const content = message.content || "";
  const time = created_at ? new Date(created_at).toLocaleTimeString() : "";

  return (
    <div className="message-container">
      <i className="author">
        <span style={{ color: strToRGB(user) }}>{user}</span>
        <small>{time}</small>
      </i>
      <p>{emojify(content)}</p>
    </div>
  );
};

export default Message;
