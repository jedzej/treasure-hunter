import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../store/actions";
import { selectPlayerName } from "../../store/selectors";
import { useHistory } from "react-router";

export default () => {
  const [draftPlayerName, setDraftPlayerName] = React.useState("");
  const playerName = useSelector(selectPlayerName);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (playerName) {
      history.push("/game");
    }
  }, [playerName, history]);

  return (
    <>
      <h1>WELCOME</h1>
      <input
        value={draftPlayerName}
        onChange={(event) => setDraftPlayerName(event.target.value)}
      />
      <br />
      <button
        onClick={() => dispatch(startGame({ playerName: draftPlayerName }))}
      >
        START GAME
      </button>
    </>
  );
};
