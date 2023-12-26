import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { LandingPage } from "./components/LandingPage";
import { MeetingPage } from "./components/MeetingPage";
import "./App.css";
import { CreateMeeting } from "./components/CreateMeeting";
import { Header } from "./components/Header";
import { ReactNotifications } from "react-notifications-component";

//add 404 page
//add tailwind css here and make it responsive for all devices

function App() {
  return (
    <>
      <ReactNotifications />
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <Router>
          <Header />
          <Routes>
            <Route path="/meeting/meet/:roomId" element={<MeetingPage />} />
            <Route path="/meeting/join" element={<CreateMeeting />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
