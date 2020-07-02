from sqlalchemy import Column, Integer, String
from sqlalchemy.types import ARRAY
import random
from functools import reduce
import copy

from .app import db
from .constants import InternalFieldState, ExternalFieldState, TREASURES_COUNT, FIELDS_PER_MOVE

FIELD_STATE = 0

FIELD_PROXIMITY = 1

CLOSEST_OFFSET = ((0, -1), (0, 1), (-1, 0), (1, 0))

BOARD_ROWS = 5
BOARD_COLUMNS = 5


def get_field(board, x, y):
    if x < 0 or y < 0:
        return None
    try:
        return board[y][x]
    except IndexError:
        return None


def spread_proximity(board, center_x, center_y, proximity):
    def get_proximity(x, y):
        return board[y][x][FIELD_PROXIMITY]

    def set_proximity(x, y, value):
        board[y][x][FIELD_PROXIMITY] = value

    def get_state(x, y):
        return board[y][x][FIELD_STATE]

    def is_treasure(x, y):
        return get_state(x, y) in [
            InternalFieldState.TREASURE_REVEALED.value,
            InternalFieldState.TREASURE_UNREVEALED.value
        ]

    if not is_treasure(center_x, center_y):
        if proximity > get_proximity(center_x, center_y):
            set_proximity(center_x, center_y, proximity)
        else:
            return
    for delta_x, delta_y in CLOSEST_OFFSET:
        x = center_x + delta_x
        y = center_y + delta_y
        if x in range(BOARD_COLUMNS) and y in range(BOARD_ROWS) and not is_treasure(x, y):
            spread_proximity(board, x, y, proximity - 1)


def mark_proximity(board, treasures):
    for x, y in treasures:
        spread_proximity(board, x, y, 4)


def generate_board():
    board = []
    for _ in range(BOARD_ROWS):
        row = []
        for _ in range(BOARD_COLUMNS):
            row.append([
                InternalFieldState.EMPTY_UNREVEALED.value,
                0
            ])
        board.append(row)
    treasures = []
    while len(treasures) < TREASURES_COUNT:
        x = random.randint(0, 4)
        y = random.randint(0, 4)
        if (x, y) not in treasures:
            treasures.append((x, y))
            board[y][x][FIELD_STATE] = InternalFieldState.TREASURE_UNREVEALED.value

    mark_proximity(board, treasures)
    return board


def flatten(l):
    return [item for sublist in l for item in sublist]


def map_field(x, y, board):
    internal_field_state = board[y][x][FIELD_STATE]
    state = ExternalFieldState.UNREVEALED
    distance = None
    if internal_field_state == InternalFieldState.TREASURE_REVEALED.value:
        state = ExternalFieldState.TREASURE_REVEALED
    if internal_field_state == InternalFieldState.EMPTY_REVEALED.value:
        state = ExternalFieldState.EMPTY_REVEALED
        distance = board[y][x][FIELD_PROXIMITY]
    return {
        "state": state.value,
        "distance": distance
    }


def internal_to_external_board(internal_board):
    external_board = []
    for y in range(BOARD_ROWS):
        row = []
        for x in range(BOARD_COLUMNS):
            row.append(map_field(x, y, internal_board))
        external_board.append(row)
    return external_board


class Game(db.Model):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    player_name = Column(String)
    round = Column(Integer, default=1)
    board = Column(ARRAY(Integer, dimensions=3))

    def is_over(self):
        revealed = filter(
            lambda field: field[FIELD_STATE] == InternalFieldState.TREASURE_REVEALED.value,
            flatten(self.board))
        return len(list(revealed)) == TREASURES_COUNT

    def get_field_state(self, x, y):
        return self.board[y][x][FIELD_STATE]

    def is_field_revealed(self, x, y):
        return self.get_field_state(x, y) in [InternalFieldState.TREASURE_REVEALED.value, InternalFieldState.EMPTY_REVEALED.value]

    def reveal_field(self, x, y):
        board = copy.deepcopy(self.board)
        if board[y][x][FIELD_STATE] == InternalFieldState.TREASURE_UNREVEALED.value:
            board[y][x][FIELD_STATE] = InternalFieldState.TREASURE_REVEALED.value
        if board[y][x][FIELD_STATE] == InternalFieldState.EMPTY_UNREVEALED.value:
            board[y][x][FIELD_STATE] = InternalFieldState.EMPTY_REVEALED.value
        self.board = board

    def serialize_fields(self, fields):
        return [map_field(field["x"], field["y"], self.board) for field in fields]

    def serialize(self):
        return {
            "player_name": self.player_name,
            "board": internal_to_external_board(self.board),
            "round": self.round,
            "is_over": self.is_over()
        }


class Score(db.Model):
    __tablename__ = 'scores'

    id = Column(Integer, primary_key=True)
    player_name = Column(String)
    score = Column(Integer)

    def serialize(self):
        return {
            "player_name": self.player_name,
            "score": self.score,
        }
