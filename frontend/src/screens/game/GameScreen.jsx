import React, { useEffect } from "react";
import { useHistory } from "react-router";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";

export default () => {
  const history = useHistory();
  const {
    turn,
    playerName,
    gameOver,
    resetGame,
  } = useGame();

  useEffect(() => {
    if (!playerName) {
      history.push("/welcome");
    }
  }, [playerName, history]);

  useEffect(() => {
    if (gameOver) {
      history.push("/scoreboard");
    }
  }, [gameOver, history]);

  return (
    <>
      <h1>TREASURE HUNTER - {playerName}</h1>
      <h3>ROUND {turn}</h3>
      <GameBoard />
      <button onClick={() => resetGame()}>RESET</button>
    </>
  );
};
