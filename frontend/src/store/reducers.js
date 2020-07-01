import range from "lodash/range";
import produce from "immer";
import { TYPES } from "./actions";
import { FIELD_STATE } from "../constants";

const DEFAULT_STATE = {
  initialized: false,
  round: undefined,
  player_name: undefined,
  is_over: false,
  board: range(5).map(() =>
    range(5).map(() => ({ distance: null, state: FIELD_STATE.UNREVEALED }))
  ),
};

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
