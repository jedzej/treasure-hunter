import React from "react";
import { FIELD_STATE } from "../constants";

const GameBoardField = ({ onClick, field, isSelected, readonly }) => {
  let content = "";

  switch (field.state) {
    case FIELD_STATE.TREASURE:
      content = "treasure!";
      break;
    case FIELD_STATE.EMPTY:
      content = field.distance;
      break;
    case FIELD_STATE.UNKNOWN:
    default:
      content = "unknown";
      break;
  }
  
  return (
    <button
      onClick={onClick}
      disabled={
        readonly ||
        ![FIELD_STATE.UNKNOWN, FIELD_STATE.TO_BE_REVEALED].includes(field.state)
      }
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
