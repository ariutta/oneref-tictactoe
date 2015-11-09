/**
 * Representation of tic-tac-toe board using Immutable.js
 */
'use strict';

import * as Immutable from 'immutable';

/* auxiliary function to generate a fresh list of cells */
function createFreshList(n) {
  const count = n * n;
  return Immutable.List(Immutable.Repeat(null, count));
}

export default class Board extends Immutable.Record({
  cats: false,
  cellList: Immutable.List(),
  n: '',
  winPath: Immutable.List([])
}) {
  constructor(n = 3, winPath = Immutable.List([])) {
    super({
      cats: false,
      cellList: createFreshList(n),
      n: n,
      winPath
    });
  }
}
