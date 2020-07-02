import React from "react";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import { FIELD_STATE } from "../constants";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Flip from "react-reveal/Flip";

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
    <>
      <div style={{ position: "relative", width: "100%", height: "60px" }}>
        <Card
          style={{
            position: "absolute",
            top: 0,
            backgroundColor:
              isSelected || isRevealed
                ? "green"
                : isDisabled
                ? "lightgrey"
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
              {isSelected || isRevealed ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </Typography>
          </CardActionArea>
        </Card>
        <Flip top when={isRevealed}>
          <Card
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: isTreasure
                ? "gold"
                : colorScale[field.distance || 0],
              width: "100%",
              height: "60px",
              display: isRevealed ? "block" : "none",
              zIndex: isSelected ? 1000 : 0,
            }}
          >
            <CardActionArea
              style={{ width: "100%", height: "100%" }}
              disabled={isDisabled}
            >
              <Typography variant="h5" align="center">
                {content}
              </Typography>
            </CardActionArea>
          </Card>
        </Flip>
      </div>
    </>
  );
};

export default GameBoardField;
