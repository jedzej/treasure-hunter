import React from "react";
import { useGame } from "./hooks";
import GameBoardField from "./GameBoardField";
import { MOVES_PER_TURN } from "../constants";

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
        <div key={y}>
          {row.map((field, x) => {
            const isSelected = fieldIsSelected({ x, y });
            return (
              <GameBoardField
                key={x}
                field={field}
                isSelected={isSelected}
                readonly={readonly || (maxReveals && !isSelected)}
                onClick={() => {
                  toggleFieldSelection({ x, y });
                }}
              />
            );
          })}
        </div>
      ))}
      {readonly ? null : (
        <button onClick={() => revealFields()}>CONFIRM</button>
      )}
    </>
  );
};
