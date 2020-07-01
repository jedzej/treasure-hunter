import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncGameState, resetGameState } from "../store/actions";
import {
  selectPlayerName,
  selectBoard,
  selectRound,
  selectIsOver,
} from "../store/selectors";
import { FIELD_STATE } from "../constants";
import { postReveal } from "../api";

export const useGame = () => {
  const dispatch = useDispatch();
  const playerName = useSelector(selectPlayerName);
  const board = useSelector(selectBoard);
  const turn = useSelector(selectRound);
  const isOver = useSelector(selectIsOver);

  const [selectedFields, setSelectedFields] = useState([]);
  const [updatePending, setUpdatePending] = useState(false);

  const treasuresCount = board
    .flat()
    .reduce(
      (accum, field) =>
        accum + (field.state === FIELD_STATE.TREASURE_REVEALED ? 1 : 0),
      0
    );

  const revealFields = async () => {
    setUpdatePending(true);
    const { success } = await postReveal({ fields: selectedFields });
    dispatch(syncGameState({ state: success?.data }));
    setSelectedFields([]);
    setUpdatePending(false);
  };

  const resetGame = () => {
    dispatch(resetGameState());
  };

  const fieldMatches = ({ x, y }) => (field) => field.x === x && field.y === y;

  const fieldIsSelected = ({ x, y }) =>
    !!selectedFields.find(fieldMatches({ x, y }));

  const toggleFieldSelection = ({ x, y }) =>
    setSelectedFields((selectedFields) => {
      return fieldIsSelected({ x, y })
        ? selectedFields.filter((field) => !fieldMatches({ x, y })(field))
        : [...selectedFields, { x, y }];
    });

  return {
    playerName,
    board,
    turn,
    isOver,
    selectedFields,
    treasuresCount,
    updatePending,
    resetGame,
    toggleFieldSelection,
    fieldIsSelected,
    revealFields,
  };
};
