import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import WelcomeScreen from "./screens/welcome/WelcomeScreen";
import GameScreen from "./screens/game/GameScreen";
import ScoreboardScreen from "./screens/scoreboard/ScoreboardScreen";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/welcome">
            <WelcomeScreen />
          </Route>
          <Route path="/game">
            <GameScreen />
          </Route>
          <Route path="/scoreboard">
            <ScoreboardScreen />
          </Route>
          <Route path="/">
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
