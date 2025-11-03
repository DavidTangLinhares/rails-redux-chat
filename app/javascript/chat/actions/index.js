const BASE_URL = '/api/v1/channels';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';

export function fetchMessages(channel) {
  const url = `${BASE_URL}/${channel}/messages`;
  const promise = fetch(url, { credentials: 'same-origin' })
    .then(r => r.json());

  return {
    type: FETCH_MESSAGES,
    payload: promise,
  };
}

export function createMessage(channel, content) {
  const url = `${BASE_URL}/${channel}/messages`;
  const body = { message: { content } };

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
  .then(r => {
    if (!r.ok) return r.text().then(t => { throw new Error(t) });
    return r.json();
  });

  return {
    type: MESSAGE_POSTED,
    payload: promise,
  };
}
