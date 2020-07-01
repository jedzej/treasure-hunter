from .app import app, db
from .models import Game, Score, generate_board
from .constants import InternalFieldState, ExternalFieldState, TREASURES_COUNT, FIELDS_PER_MOVE
from flask import abort, jsonify, request, session
from flask_restful import Api, Resource, reqparse
import random
from functools import reduce


@app.route('/api/test/')
def get_test():
    return "ok"


@app.route('/api/start_game/', methods=['POST'])
def post_start_game():
    if 'game_id' in session:
        return "Game already in progress", 400

    if not request.json:
        return "Missing body", 400

    player_name = request.json["player_name"]

    if not player_name:
        return "Missing player_name", 400

    board = generate_board()

    game = Game(player_name=player_name, board=board)

    db.session.add(game)
    db.session.commit()

    session["game_id"] = game.id

    return jsonify(game.serialize())


@app.route('/api/current_game/', methods=['GET'])
def get_current_game():
    if 'game_id' not in session:
        return "No game in progress", 400

    game = Game.query.get(session["game_id"])

    if not game:
        session.clear()
        return "No game in progress", 400

    return jsonify(game.serialize())


@app.route('/api/current_game/', methods=['DELETE'])
def delete_current_game():
    if 'game_id' not in session:
        return "ok", 200

    game = Game.query.get(session["game_id"])
    if game:
        db.session.delete(game)
        db.session.commit()

    session.clear()

    return "ok", 200


@app.route('/api/reveal/', methods=['POST'])
def post_reveal():
    if not request.json:
        return "Missing body", 400

    fields = request.json["fields"]

    if len(fields) > FIELDS_PER_MOVE:
        return "Incorrect fields length", 400

    game = Game.query.get(session["game_id"])
    if not game:
        return "No game in progress", 400

    for field in fields:
        if game.is_field_revealed(field["x"], field["y"]):
            return "Field already revealed", 400

    for field in fields:
        game.reveal_field(field["x"], field["y"])

    if game.is_over():
        score = Score(player_name=game.player_name,
                      score=game.calculate_round())
        db.session.delete(game)
        db.session.add(score)
    db.session.commit()

    return jsonify(game.serialize_fields(fields))


@app.route('/api/scoreboard/', methods=['GET'])
def get_scoreboard():
    scores = Score.query.order_by(Score.score.asc()).limit(10).all()

    return jsonify([score.serialize() for score in scores])
