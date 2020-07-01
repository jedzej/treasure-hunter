export const TYPES = {
  RESET_GAME_STATE: "RESET_GAME",
  SYNC_GAME_STATE: "SYNC_GAME_STATE",
  REVEAL_FIELDS: "REVEAL_FIELDS",
};

export const syncGameStateAction = ({ state }) => ({
  type: TYPES.SYNC_GAME_STATE,
  payload: {
    state,
  },
});

export const resetGameStateAction = () => ({
  type: TYPES.RESET_GAME_STATE,
});

export const revealFieldsAction = ({ fields }) => ({
  type: TYPES.REVEAL_FIELDS,
  payload: { fields },
});
