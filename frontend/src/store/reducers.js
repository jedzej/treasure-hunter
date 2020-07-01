import range from "lodash/range";
import produce from "immer";
import { TYPES } from "./actions";
import { FIELD_STATE, TREASURES_TO_REVEAL } from "../constants";

const DEFAULT_STATE = {
  initialized: false,
  round: undefined,
  player_name: undefined,
  is_over: false,
  board: range(5).map(() =>
    range(5).map(() => ({ distance: null, state: FIELD_STATE.UNREVEALED }))
  ),
};

const countFields = (board, predicate) =>
  board.flat().reduce((accum, field) => accum + (predicate(field) ? 1 : 0), 0);

const calculateIsOver = (board) =>
  countFields(board, ({ state }) => state === FIELD_STATE.TREASURE_REVEALED) ===
  TREASURES_TO_REVEAL;

export const gameReducer = (state = DEFAULT_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.RESET_GAME_STATE:
        Object.assign(draft, DEFAULT_STATE);
        break;
      case TYPES.START_GAME:
        draft.playerName = action.payload.playerName;
        break;
      case TYPES.MAKE_MOVES:
        draft.playerName = action.payload.playerName;
        break;
      case TYPES.REVEAL_FIELDS:
        action.payload.fields.forEach(({ field, selection: { x, y } }) => {
          draft.board[y][x] = field;
        });
        if (calculateIsOver(draft.board)) {
          draft.is_over = true;
        }
        break;
      case TYPES.SYNC_GAME_STATE:
        if (action.payload.state) {
          Object.assign(draft, action.payload.state);
        }
        draft.initialized = true;
        break;
      default:
        break;
    }
  });
