import React, { useEffect, useState } from "react";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { useHistory } from "react-router";
import { getScoreboard } from "../../api";

export default () => {
  const history = useHistory();
  const { playerName, resetGame } = useGame();
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
        onClick={() => {
          resetGame();
          history.push("/welcome");
        }}
      >
        RESET
      </button>
    </>
  );
};
