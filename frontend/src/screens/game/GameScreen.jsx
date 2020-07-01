import React, { useEffect } from "react";
import { useHistory } from "react-router";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { TREASURES_TO_REVEAL } from "../../constants";

export default () => {
  const history = useHistory();
  const { turn, playerName, isOver, treasuresCount } = useGame();

  useEffect(() => {
    if (!playerName) {
      history.push("/welcome");
    }
  }, [playerName, history]);

  useEffect(() => {
    if (isOver) {
      history.push("/scoreboard");
    }
  }, [isOver, history]);

  return (
    <>
      <h1>TREASURE HUNTER - {playerName}</h1>
      <h3>ROUND {turn}</h3>
      <h4>
        Treasures found: {treasuresCount}/{TREASURES_TO_REVEAL}
      </h4>
      <GameBoard />
    </>
  );
};
