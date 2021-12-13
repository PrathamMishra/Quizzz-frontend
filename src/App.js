import React, { useEffect } from "react";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import CreateRoom from "./components/CreateRoom/CreateRoom";
import Room from "./components/Room/Room";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import InvigilatorPage from "./components/Room/CreatorWaitingRoom/InvigilatorPage/InvigilatorPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/auth/authAction";

function App() {

  const auth = useSelector((state) => state.auth)
  console.log(auth)

  // useEffect(()=>{
  //   store.dispatch(loadUser());
  //   console.log("log hit");    
  // },[])

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
