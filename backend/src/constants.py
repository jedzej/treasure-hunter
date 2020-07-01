from enum import Enum

TREASURES_COUNT = 3
FIELDS_PER_MOVE = 3


class InternalFieldState(Enum):
    EMPTY_UNREVEALED = 1
    TREASURE_UNREVEALED = 2
    EMPTY_REVEALED = 3
    TREASURE_REVEALED = 4


class ExternalFieldState(Enum):
    UNREVEALED = 1
    EMPTY_REVEALED = 2
    TREASURE_REVEALED = 3
