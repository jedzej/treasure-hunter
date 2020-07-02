import React, { useEffect, useState } from "react";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { useHistory } from "react-router";
import { getScoreboard } from "../../api";

export default () => {
  const history = useHistory();
  const { playerName, resetGame, isOver } = useGame();
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    const loadScoreboard = async () => {
      const { success } = await getScoreboard();
      if (success) {
        setScoreboard(success.data);
      }
    };
    loadScoreboard();
  }, [setScoreboard]);

  useEffect(() => {
    if (isOver === false) {
      history.push("/game");
    }
  }, [isOver, history]);

  return (
    <>
      <h1>SCOREBOARDS</h1>
      <h1>TREASURE HUNTER - {playerName}</h1>
      {scoreboard.map(({ player_name, score }, index) => (
        <div key={index}>
          {player_name}: {score}
        </div>
      ))}
      {playerName && <GameBoard readonly />}
      <button
        onClick={async () => {
          await resetGame();
          history.push("/welcome");
        }}
      >
        NEW GAME
      </button>
    </>
  );
};
