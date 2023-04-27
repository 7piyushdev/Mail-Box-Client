import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./views/public/LoginScreen";
import store from "./store";
import ComposeMail from "./views/private/ComposeMail";
import MailBox from "./views/private/MailBox";
import MailDetails from "./components/MailBox/MailDetails";
import SentMail from "./views/private/SentMail";
import SentMailDetails from "./components/SentBox/SentMailDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/home' element={<App />}>
            <Route path='/home/inbox' element={<MailBox />} />
            <Route path='/home/inbox/:id' element={<MailDetails />} />
            <Route path='/home/compose' element={<ComposeMail />} />
            <Route path='/home/compose/:mailId' element={<ComposeMail />} />
            <Route path='/home/sent' element={<SentMail />} />
            <Route path='/home/sent/:id' element={<SentMailDetails />} />
            <Route path='/home/draft' element={<ComposeMail />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
