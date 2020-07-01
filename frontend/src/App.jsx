import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import WelcomeScreen from "./screens/welcome/WelcomeScreen";
import GameScreen from "./screens/game/GameScreen";
import ScoreboardScreen from "./screens/scoreboard/ScoreboardScreen";
import store from "./store/store";
import { syncGameStateAction } from "./store/actions";
import { getCurrentGame } from "./api";
import { selectInitialized } from "./store/selectors";

const AppInitWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialized);

  useEffect(() => {
    const initialize = async () => {
      const { success } = await getCurrentGame();
      if (success) {
        dispatch(syncGameStateAction({ state: success?.data }));
      } else {
        dispatch(syncGameStateAction({}));
      }
    };
    if (!initialized) {
      initialize();
    }
  }, [initialized, dispatch]);

  return initialized ? children : "wait";
};

function App() {
  return (
    <Provider store={store}>
      <AppInitWrapper>
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
      </AppInitWrapper>
    </Provider>
  );
}

export default App;
