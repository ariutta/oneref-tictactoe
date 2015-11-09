/**
 * Representation of user, using Immutable.js
 */
'use strict';

import * as Immutable from 'immutable';

/* auxiliary function to generate a fresh id */
function genID() { 
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36); 
}

export default class User extends Immutable.Record({
  id: genID(),
  name: undefined,
  username: undefined,
  email: undefined,
  picture: undefined,
  provider: undefined,
  id_token: undefined,
  wins: 0,
  draws: 0,
  losses: 0
}) {
  constructor(name = undefined, username = undefined, email = undefined, picture = undefined, provider = 'google', id_token = undefined, wins = 0, draws = 0, losses = 0) {
    super({
      id: genID(),
      name,
      username,
      email,
      picture,
      provider,
      id_token,
      wins,
      draws,
      losses
    });
  }
}
