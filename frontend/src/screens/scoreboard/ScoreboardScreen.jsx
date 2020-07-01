import React, { useEffect } from "react";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const { playerName, resetGame } = useGame();

  useEffect(() => {
    if (!playerName) {
      history.push("/welcome");
    }
  }, [playerName, history]);

  return (
    <>
      <h1>SCOREBOARDS</h1>
      <h1>TREASURE HUNTER - {playerName}</h1>
      <GameBoard readonly />
      <button onClick={() => resetGame()}>RESET</button>
    </>
  );
};
