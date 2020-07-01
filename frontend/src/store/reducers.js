import range from "lodash/range";
import produce from "immer";
import { TYPES } from "./actions";
import { FIELD_STATE } from "../constants";

const DEFAULT_STATE = {
  turn: undefined,
  playerName: undefined,
  board: range(5).map(() =>
    range(5).map(() => ({ distance: null, state: FIELD_STATE.UNKNOWN }))
  ),
};

export const gameReducer = (state = DEFAULT_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.RESET_GAME_STATE:
        return DEFAULT_STATE;
      case TYPES.START_GAME:
        draft.playerName = action.payload.playerName;
        break;
      case TYPES.MAKE_MOVES:
        draft.playerName = action.payload.playerName;
        break;
      case TYPES.SYNC_GAME_STATE:
        return action.payload.state;
      default:
        break;
    }
  });
