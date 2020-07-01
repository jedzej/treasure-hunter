import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncGameState, resetGameState } from "../store/actions";
import { selectPlayerName, selectBoard, selectTurn } from "../store/selectors";
import produce from "immer";
import { FIELD_STATE, MOVES_PER_TURN, TREASURES_TO_REVEAL } from "../constants";

export const useGame = () => {
  const dispatch = useDispatch();
  const playerName = useSelector(selectPlayerName);
  const board = useSelector(selectBoard);
  const turn = useSelector(selectTurn);

  const [selectedFields, setSelectedFields] = useState([]);
  const [updatePending, setUpdatePending] = useState(false);

  useEffect(() => {
    if (selectedFields.length === MOVES_PER_TURN && !updatePending) {
      setUpdatePending(true);
      console.log("dispatching moves");
      setTimeout(() => {
        dispatch(
          syncGameState({
            state: produce({ turn, playerName, board }, (draft) => {
              selectedFields.forEach(({ x, y }) => {
                draft.board[y][x].distance = 1;
                draft.board[y][x].state =
                  Math.random() > 0.5
                    ? FIELD_STATE.EMPTY
                    : FIELD_STATE.TREASURE;
              });
            }),
          })
        );
        setSelectedFields([]);
        setUpdatePending(false);
      }, 1000);
    }
  }, [selectedFields, turn, playerName, board, dispatch, updatePending]);

  const treasures = board
    .flat()
    .reduce(
      (accum, field) => accum + (field.state === FIELD_STATE.TREASURE ? 1 : 0),
      0
    );

  useEffect(() => {
    if (selectedFields.length === TREASURES_TO_REVEAL) {
      setTimeout(() => {
        dispatch(
          syncGameState({
            state: produce({ turn, playerName, board }, (draft) => {
              selectedFields.forEach(({ x, y }) => {
                draft.board[y][x].distance = 1;
                draft.board[y][x].state = FIELD_STATE.TREASURE;
              });
            }),
          })
        );
        setSelectedFields([]);
      }, 1000);
    }
  }, [selectedFields, setSelectedFields, dispatch, board, playerName, turn]);

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
    selectedFields,
    treasures,
    gameOver: treasures >= TREASURES_TO_REVEAL,
    resetGame,
    toggleFieldSelection,
    fieldIsSelected,
  };
};
