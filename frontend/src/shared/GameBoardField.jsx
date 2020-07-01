import React from "react";
import { FIELD_STATE } from "../constants";

const GameBoardField = ({ onClick, field, isSelected, readonly }) => {
  let content = "";

  switch (field.state) {
    case FIELD_STATE.TREASURE_REVEALED:
      content = "treasure!";
      break;
    case FIELD_STATE.EMPTY_REVEALED:
      content = field.distance;
      break;
    case FIELD_STATE.UNREVEALED:
    default:
      content = "unknown";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={readonly || field.state !== FIELD_STATE.UNREVEALED}
      style={{
        width: "100px",
        height: "50px",
        backgroundColor: isSelected ? "green" : "white",
      }}
    >
      {content}
    </button>
  );
};

export default GameBoardField;
