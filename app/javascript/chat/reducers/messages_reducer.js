import { FETCH_MESSAGES, MESSAGE_POSTED, CHANNEL_SELECTED } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return Array.isArray(action.payload) ? action.payload : [];
    case MESSAGE_POSTED:
      return [...state, action.payload];
    case CHANNEL_SELECTED:
      return [];
    default:
      return state;
  }
}
