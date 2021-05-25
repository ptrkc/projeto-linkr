import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../../contexts/UserContexts";

import "../../css/reset.css";
import "../../css/styles.css";
import GlobalStyle from "../Styles/GlobalStyle"

import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Timeline from "../Timeline/Timeline";

export default function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/sign-up" exact>
              <SignUp />
            </Route>
            <Route path="/timeline" exact>
              <Timeline />
            </Route>
          </Switch>
        </BrowserRouter>
    </UserContext.Provider>
  );
}
