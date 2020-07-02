import React from "react";
import { useGame } from "./hooks";
import GameBoardField from "./GameBoardField";
import { MOVES_PER_TURN } from "../constants";
import { Grid, Button, Box } from "@material-ui/core";

export default ({ readonly = false }) => {
  const {
    board,
    fieldIsSelected,
    toggleFieldSelection,
    revealFields,
    selectedFields,
  } = useGame();

  const maxReveals = selectedFields.length === MOVES_PER_TURN;

  return (
    <>
      {board.map((row, y) => (
        <Grid container item key={y} justify="flex-start" spacing={1}>
          {row.map((field, x) => {
            const isSelected = fieldIsSelected({ x, y });

            return (
              <Grid item xs style={{ width: "100px" }}>
                <GameBoardField
                  key={x}
                  field={field}
                  isSelected={isSelected}
                  readonly={readonly || (maxReveals && !isSelected)}
                  onClick={() => {
                    toggleFieldSelection({ x, y });
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ))}
      {readonly ? null : (
        <Box pt={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
            disabled={selectedFields.length === 0}
            onClick={() => revealFields()}
          >
            REVEAL
          </Button>
        </Box>
      )}
    </>
  );
};
