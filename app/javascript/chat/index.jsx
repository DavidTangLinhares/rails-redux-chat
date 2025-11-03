// app/javascript/chat/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import ReduxPromise from "redux-promise";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // changed

import App from "./components/app";
import messagesReducer from "./reducers/messages_reducer";

// Grab the Rails div
const chatContainer = document.getElementById("chat_app");

// Initial Redux state
const initialState = {
  messages: [],
  channels: ["general", "haven", "berlin"],
};

// Combine reducers
const reducers = combineReducers({
  messages: messagesReducer,
  channels: (state = null, action) => state,
});

// Apply middlewares and create store
const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

// Create React 18 root
const root = createRoot(chatContainer);

// Render React app
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Default redirect to #/channels/general */}
        <Route path="/" element={<Navigate to="/channels/general" replace />} />
        {/* Optional: fallback route */}
        <Route path="*" element={<Navigate to="/channels/general" replace />} />

        {/* Route with dynamic :channel param */}
        <Route path="/channels/:channel" element={<App />} />

      </Routes>
    </BrowserRouter>
  </Provider>
);
