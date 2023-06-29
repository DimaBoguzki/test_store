import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import UserProvider from "./context/auth";
import './styles/general.scss'

axios.defaults.baseURL = "http://localhost:5000"; 


// "scripts": {
//   "start": "concurrently \"npm run start:client\" \"npm run start:server\"",
//   "start:client": "cd client && npm start",
//   "start:server": "nodemon index.js"
// },

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// TODO IF STATUS === 407 token invalid then logout from app
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

async function init() {
  const root = ReactDOM.createRoot(
    document.getElementById("root")
  );
  root.render(
    // <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    // </React.StrictMode>
  );
}
init();