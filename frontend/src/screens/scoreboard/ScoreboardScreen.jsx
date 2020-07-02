import React, { useEffect, useState } from "react";
import GameBoard from "../../shared/GameBoard";
import { useGame } from "../../shared/hooks";
import { useHistory } from "react-router";
import { getScoreboard } from "../../api";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
} from "@material-ui/core";

const HighscoresTable = ({ scoreboard }) => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          <TableCell align="left">Name</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scoreboard.map(({ player_name, score }, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox" component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="left">{player_name}</TableCell>
            <TableCell align="right">{score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default () => {
  const history = useHistory();
  const { playerName, resetGame, isOver, turn } = useGame();
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
    <Grid container justify="space-between" spacing={2}>
      {playerName && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">CONGRATULATIONS!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="h5">Your score: {turn}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box pb={2}>
              <GameBoard readonly />
            </Box>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Typography variant="h4">SCOREBOARDS</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <HighscoresTable scoreboard={scoreboard} />
      </Grid>
      <Grid item xs={12}>
        <Box pt={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
            onClick={async () => {
              await resetGame();
              history.push("/welcome");
            }}
          >
            NEW GAME
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
