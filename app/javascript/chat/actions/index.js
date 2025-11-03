// app/javascript/chat/actions/index.js

// Base URL points to your Rails backend
const BASE_URL = '/api/v1/channels';

// Action types
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';

/**
 * Fetch messages for a given channel from Rails API
 * @param {string} channel - channel name from URL
 */
export function fetchMessages(channel) {
  const url = `${BASE_URL}/${channel}/messages`;
  const promise = fetch(url)
    .then((r) => r.json());

  return {
    type: FETCH_MESSAGES,
    payload: promise, // redux-promise resolves this
  };
}

/**
 * Create a new message in a channel via Rails API
 * @param {string} channel - channel name from URL
 * @param {string} author - current user email
 * @param {string} content - message content
 */
export function createMessage(channel, author, content) {
  const url = `${BASE_URL}/${channel}/messages`;
  const body = { author, content };

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise, // redux-promise resolves this
  };
}

// NOTE: selectChannel is no longer needed!
// Channel is derived from URL (useParams) and passed as prop
// export function selectChannel(channel) { ... } removed
