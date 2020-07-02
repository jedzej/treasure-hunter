import React, { useEffect } from "react";
import { useHistory } from "react-router";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { TREASURES_TO_REVEAL } from "../../constants";
import { Grid, Typography, Divider } from "@material-ui/core";
import { range } from "lodash";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

const TrasuresIndicator = ({ count, limit }) => {
  const found = range(count).map((i) => (
    <AttachMoneyIcon style={{ color: "#000" }} key={`not-found-${i}`} />
  ));
  const notFound = range(limit - count).map((i) => (
    <MoneyOffIcon style={{ color: "#bbb" }} key={`found-${i}`} />
  ));
  return (
    <>
      {notFound}
      {found}
    </>
  );
};

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
    <Grid container justify="space-between" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">TREASURE HUNTER - {playerName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item>
        <Typography variant="h5">ROUND {turn}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          <TrasuresIndicator
            count={treasuresCount}
            limit={TREASURES_TO_REVEAL}
          />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GameBoard />
      </Grid>
    </Grid>
  );
};
