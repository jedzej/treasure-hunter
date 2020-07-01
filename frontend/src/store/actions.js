export const TYPES = {
  RESET_GAME_STATE: "RESET_GAME",
  START_GAME: "START_GAME",
  MAKE_MOVES: "MAKE_MOVES",
  SYNC_GAME_STATE: "SYNC_GAME_STATE",
};

export const syncGameState = ({ state }) => ({
  type: TYPES.SYNC_GAME_STATE,
  payload: {
    state,
  },
});

export const resetGameState = () => ({
  type: TYPES.RESET_GAME_STATE,
});

export const startGame = ({ playerName }) => ({
  type: TYPES.START_GAME,
  payload: { playerName },
});

export const makeMoves = ({ moves }) => ({
  type: TYPES.MAKE_MOVES,
  payload: { moves },
});
