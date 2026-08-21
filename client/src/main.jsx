import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.DEV 
  ? "http://localhost:5000" 
  : "https://prose-blogapp-mern.onrender.com";


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="128982969761-sendhiarphg7cmagdleil3qtivgu36d6.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
