// app/javascript/chat/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import ReduxPromise from "redux-promise";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./components/app";
import messagesReducer from "./reducers/messages_reducer";

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

// Mount React on every page load if chat_app exists
document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat_app");
  if (!chatContainer) return;

  const root = createRoot(chatContainer);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/channels/general" replace />} />
          <Route path="*" element={<Navigate to="/channels/general" replace />} />
          <Route path="/channels/:channel" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
});
