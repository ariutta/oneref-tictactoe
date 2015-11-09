/**
 * Representation of opponent, using Immutable.js
 */
'use strict';

import * as Immutable from 'immutable';

export default class Opponent extends Immutable.Record({
  id: undefined,
  name: undefined,
  username: undefined,
  picture: undefined,
  wins: 0,
  draws: 0,
  losses: 0
}) {
  constructor(id = undefined, name = undefined, username = undefined, picture = undefined, wins = 0, draws = 0, losses = 0) {
    super({
      id,
      name,
      username,
      picture,
      wins,
      draws,
      losses
    });
  }
}
