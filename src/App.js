import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import "./asset/css/style.css";
import "./asset/css/responsive.css";
import { micrositeDetailsUrl } from "./api/Api";
// import axios from "axios";
// import "antd/dist/reset.css";
function App() {


  return (
    <div>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
