'use strict';

import * as Immutable from 'immutable';
import Game from './game.js';
import User from './user';
import Opponent from './opponent';

/**
 * A purely functional (immutable) data structure for tic-tac-toe application state
 */
export default class TodoAppState extends Immutable.Record({
  user: new User(),
  game: new Game(new Opponent())
}) {
  constructor() {
    super({
      user: new User(),
      game: new Game(new Opponent())
    });
  }

  markCell(game, markedCellKey, userMadeMostRecentMove) {
    const userWasInvited = game.get('userWasInvited');
    // The invited player always uses symbol 'o'.
    const playerSymbol = (userWasInvited === userMadeMostRecentMove) ? 'o' : 'x';

    const board = game.get('board');
    const cellList = board.get('cellList');
    const updatedCellList = cellList.set(markedCellKey, playerSymbol);
    const updatedBoard = board.set('cellList', updatedCellList);
    const updatedGame = game.set('board', updatedBoard).set('isUserTurn', !userMadeMostRecentMove);
    // TODO single game issue
    const updatedState = this.set('game', updatedGame).isGameOver(updatedGame, playerSymbol);
    const gameIsCompleted = updatedState.get('game').get('status') === 'completed';
    if (gameIsCompleted) {
      const user = this.get('user');
      var updatedUser;
      const cats = updatedState.get('game').get('cats');
      if (cats) {
        const drawCount = this.get('user').get('draws');
        updatedUser = this.get('user').set('draws', drawCount + 1);
      } else if (userMadeMostRecentMove) {
        const winCount = this.get('user').get('wins');
        updatedUser = this.get('user').set('wins', winCount + 1);
      } else {
        const lossCount = this.get('user').get('losses');
        updatedUser = this.get('user').set('losses', lossCount + 1);
      }
      return updatedState.set('user', updatedUser);
    }

    return updatedState;
  }

  getUser() {
    return this.user.toMap();
  }

  receiveInviteAcceptance(game, opponent) {
    const immutableOpponent = new Opponent(
      opponent.id,
      opponent.name,
      opponent.username,
      opponent.picture,
      opponent.wins,
      opponent.draws,
      opponent.losses);
    const updatedGame = game.set('opponent', immutableOpponent)
      .set('isUserTurn', true)
      .set('userWasInvited', false)
      .set('status', 'inProgress');
    // TODO single game issue
    return this.set('game', updatedGame);
  }

  receiveInvite(game, opponent) {
    const immutableOpponent = new Opponent(
        opponent.id,
        opponent.name,
        opponent.username,
        opponent.picture,
        opponent.wins,
        opponent.draws,
        opponent.losses);
    const updatedGame = game.set('opponent', immutableOpponent)
      .set('isUserTurn', false)
      .set('userWasInvited', true)
      .set('status', 'awaitingInviteResponse');
    // TODO single game issue
    return this.set('game', updatedGame);
  }

  /* returns true iff all items are complete */
  isGameOver(game, playerSymbol) {
    const n = 3;
    const count = n * n;
    const board = game.get('board');
    const cellList = board.get('cellList');
    const diagonalIndices = Immutable.Range(0, count, n + 1);
    const antiDiagonalIndices = Immutable.Range(count - n, n - 2, n - 1);

    function getWinPath(symbol) {
      const playerCellIndices = Immutable.List(cellList.map(z => z === symbol ? symbol : null).entries()).filter(z => z[1]).map(z => z[0]);
      if (playerCellIndices.count() < n) {
        return false;
      } else if (playerCellIndices.isSuperset(diagonalIndices)) { // diagonal win from upper left to lower right
        return diagonalIndices;
      } else if (playerCellIndices.isSuperset(antiDiagonalIndices)) { // diagonal win from lower left to upper right
        return antiDiagonalIndices;
      } else {
        const columnWinModuloResult = playerCellIndices.countBy(z => z % n).findEntry(z => z === n);
        if (columnWinModuloResult) { // column win
          const columnWinModulo = columnWinModuloResult[0];
          return playerCellIndices.filter(z => z % n === columnWinModulo);
        } else {
          const rowWinRoundedResults = playerCellIndices.map(z => Immutable.Map({index: z, roundedResult: Math.round((z + n - 1) / n) * n}));
          const rowWinBestRoundedResult = rowWinRoundedResults.countBy(z => z.get('roundedResult')).findEntry(z => z === n);
          if (rowWinBestRoundedResult) { // row win
            const rowWinBestRoundedValue = rowWinBestRoundedResult[0];
            return rowWinRoundedResults.filter(z => z.get('roundedResult') === rowWinBestRoundedValue).map(z => z.get('index'));
          } else {
            return false;
          }
        }
      }
    }

    var complete;
    var updatedBoard;

    const winPath = getWinPath(playerSymbol);
    complete = !!winPath;
    if (complete) {
      updatedBoard = winPath ? board.set('winPath', winPath) : board;
    } else {
      const playedCellIndices = Immutable.List(cellList.entries()).filter(z => z[1]).map(z => z[0]);
      if (playedCellIndices.count() === count) {
        complete = true;
        updatedBoard = board.set('cats', true);
      }
    }

    if (!complete) {
      return this;
    } else {
      const updatedGame = game.set('board', updatedBoard).set('status', 'completed');
      // TODO single game issue
      return this.set('game', updatedGame);
    }
  }

}
