from sqlalchemy import Column, Integer, String
from sqlalchemy.types import ARRAY
import random
from functools import reduce
import copy

from .app import db
from .constants import InternalFieldState, ExternalFieldState, TREASURES_COUNT, FIELDS_PER_MOVE


def generate_board():
    board = []
    for _ in range(5):
        row = []
        for _ in range(5):
            row.append(InternalFieldState.EMPTY_UNREVEALED.value)
        board.append(row)
    planted_treasures = 0
    while planted_treasures < TREASURES_COUNT:
        x = random.randint(0, 4)
        y = random.randint(0, 4)
        if board[y][x] == InternalFieldState.EMPTY_UNREVEALED.value:
            board[y][x] = InternalFieldState.TREASURE_UNREVEALED.value
            planted_treasures += 1
    return board


def flatten(l): return [item for sublist in l for item in sublist]


def calculate_distace(x, y, board):
    # TODO distance
    return 1


def map_field(x, y, board):
    internal_field_state = board[y][x]
    if internal_field_state == InternalFieldState.TREASURE_UNREVEALED.value:
        return (ExternalFieldState.UNREVEALED.value, None)
    if internal_field_state == InternalFieldState.EMPTY_UNREVEALED.value:
        return (ExternalFieldState.UNREVEALED.value, None)
    if internal_field_state == InternalFieldState.TREASURE_REVEALED.value:
        return (ExternalFieldState.TREASURE_REVEALED.value, None)
    if internal_field_state == InternalFieldState.EMPTY_REVEALED.value:
        distance = calculate_distace(x, y, board)
        return (ExternalFieldState.EMPTY_REVEALED.value, distance)


def internal_to_external_board(internal_board):
    external_board = []
    for y in range(5):
        row = []
        for x in range(5):
            (state, distance) = map_field(x, y, internal_board)
            row.append({
                "state": state,
                "distance": distance
            })
        external_board.append(row)
    return external_board


class Game(db.Model):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    player_name = Column(String)
    board = Column(ARRAY(Integer, dimensions=2))

    def is_over(self):
        revealed = filter(
            lambda field: field == InternalFieldState.TREASURE_REVEALED.value,
            flatten(self.board))
        return len(list(revealed)) == TREASURES_COUNT

    def is_field_revealed(self, x, y):
        return self.board[y][x] in [InternalFieldState.TREASURE_REVEALED.value, InternalFieldState.EMPTY_REVEALED.value]

    def reveal_field(self, x, y):
        board = copy.deepcopy(self.board)
        if board[y][x] == InternalFieldState.TREASURE_UNREVEALED.value:
            board[y][x] = InternalFieldState.TREASURE_REVEALED.value
        if board[y][x] == InternalFieldState.EMPTY_UNREVEALED.value:
            board[y][x] = InternalFieldState.EMPTY_REVEALED.value
        self.board = board

    def calculate_round(self):
        revealed = filter(lambda field: field in [
            InternalFieldState.TREASURE_REVEALED.value,
            InternalFieldState.EMPTY_REVEALED.value],
            flatten(self.board))
        return int(len(list(revealed)) / FIELDS_PER_MOVE) + 1

    def serialize(self):
        return {
            "player_name": self.player_name,
            "board": internal_to_external_board(self.board),
            "round": self.calculate_round(),
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
