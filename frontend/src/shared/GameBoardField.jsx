import React from "react";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import { FIELD_STATE } from "../constants";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const colorScale = ["#eeeeee", "#bbb", "#888", "#555"];

const GameBoardField = ({ onClick, field, isSelected, readonly }) => {
  let content = "";

  switch (field.state) {
    case FIELD_STATE.TREASURE_REVEALED:
      content = "treasure!";
      content = <AttachMoneyIcon />;
      break;
    case FIELD_STATE.EMPTY_REVEALED:
      content = field.distance;
      break;
    case FIELD_STATE.UNREVEALED:
    default:
      content = isSelected ? <VisibilityIcon /> : <VisibilityOffIcon />;
      break;
  }

  const isEmpty = field.state === FIELD_STATE.EMPTY_REVEALED;
  const isTreasure = field.state === FIELD_STATE.TREASURE_REVEALED;
  const isRevealed = isEmpty || isTreasure;
  const isDisabled = readonly || isRevealed;

  return (
    <Card
      style={{
        backgroundColor: isSelected
          ? "green"
          : isTreasure
          ? "gold"
          : isEmpty
          ? colorScale[field.distance || 0]
          : "lightblue",
        width: "100%",
        height: "60px",
      }}
    >
      <CardActionArea
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
        disabled={isDisabled}
      >
        <Typography variant="h5" align="center">
          {content}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default GameBoardField;
