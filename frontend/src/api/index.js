import { callApi } from "./utils";

export const getScoreboard = () => callApi("/scoreboard/");

export const getCurrentGame = () => callApi("/current_game/");

export const postStartGame = ({ player_name }) =>
  callApi("/start_game/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ player_name }),
  });

export const postReveal = ({ fields }) =>
  callApi("/reveal/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ fields }),
  });
