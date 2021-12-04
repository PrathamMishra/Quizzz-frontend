import React from "react";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import Room from "./components/Room/Room";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import InvigilatorPage from "./components/Room/CreatorWaitingRoom/InvigilatorPage/InvigilatorPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/createRoom" exact component={CreateRoom} />
        <Route path="/Room" exact component={Room} />
        <Route path="/join" exact component={JoinRoom} />
        <Route path="/invigilator" exact component={InvigilatorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
