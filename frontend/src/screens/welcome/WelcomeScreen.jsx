import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncGameStateAction } from "../../store/actions";
import { selectPlayerName } from "../../store/selectors";
import { useHistory } from "react-router";
import { postStartGame } from "../../api";

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
        onClick={async () => {
          const { success } = await postStartGame({
            player_name: draftPlayerName,
          });

          dispatch(syncGameStateAction({ state: success?.data }));
        }}
      >
        START GAME
      </button>
    </>
  );
};
