import React from "react";
import { useGame } from "./hooks";
import GameBoardField from "./GameBoardField";

export default ({ readonly = false }) => {
  const { board, fieldIsSelected, toggleFieldSelection } = useGame();

  return (
    <>
      {board.map((row, y) => (
        <div key={y}>
          {row.map((field, x) => (
            <GameBoardField
              key={x}
              field={field}
              isSelected={fieldIsSelected({ x, y })}
              readonly={readonly}
              onClick={() => {
                toggleFieldSelection({ x, y });
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
};
