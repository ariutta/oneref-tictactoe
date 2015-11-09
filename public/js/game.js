/**
 * Representation of tic-tac-toe game using Immutable.js
 */
'use strict';

import * as Immutable from 'immutable';
import Board from './board.js';

/* auxiliary function to generate a fresh id */
function genID() { 
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36); 
}

    // status can be one of these: none, awaitingInviteResponse, inProgress, completed

export default class Game extends Immutable.Record({
  id: undefined,
  opponent: undefined,
  userWasInvited: undefined,
  isUserTurn: undefined,
  status: 'none',
  board: undefined
}) {
  constructor(opponent, userWasInvited = false, isUserTurn = false, status = 'none', board = new Board()) {
    super({
      id: genID(),
      opponent: opponent,
      userWasInvited: userWasInvited,
      isUserTurn: isUserTurn,
      status: status,
      board
    });
  }
}
