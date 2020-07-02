import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncGameStateAction } from "../../store/actions";
import { selectPlayerName } from "../../store/selectors";
import { useHistory } from "react-router";
import { postStartGame } from "../../api";
import {
  TextField,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";

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
    <form
      onSubmit={async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const { success } = await postStartGame({
          player_name: draftPlayerName,
        });

        dispatch(syncGameStateAction({ state: success?.data }));
      }}
    >
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">TREASURE HUNTER</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your name"
            variant="outlined"
            value={draftPlayerName}
            onChange={(event) => setDraftPlayerName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "100%" }}
          >
            START GAME
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
