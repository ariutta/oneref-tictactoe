/**
 * Responses to user interaction
 *
 * Each action takes action-specific parameters and an updater callback to invoke with
 * a (TictactoeAppState) => TictactoeAppState update function
 */

'use strict';
import Cell from './cell';

var socket = window.io.connect('//:8080');

export function listen(updater) {
  socket.on('move', function(markedCellKey) {
    updater((state) => {
      // TODO single game issue
      const game = state.get('game');
      return state.markCell(game, markedCellKey, false);
    });
  });
  socket.on('invite', function(opponent) {
    // TODO single game issue
    updater((state) => state.receiveInvite(state.get('game'), opponent));
  });
  socket.on('accept', function(opponent) {
    updater((state) => {
      // TODO single game issue
      return state.receiveInviteAcceptance(state.get('game'), opponent);
    });
  });
}

export function markCell(game, markedCellKey, playerId, updater) {
  updater((state) => {
    socket.emit('move', markedCellKey);
    return state.markCell(game, markedCellKey, true);
  });
}

export function startGame(game, updater) {
  updater((state) => {
    const user = state.get('user');
    const provider = user.get('provider');
    const id_token = user.get('id_token');
    const name = user.get('name');
    const picture = user.get('picture');
    const wins = user.get('wins');
    const draws = user.get('draws');
    const losses = user.get('losses');

    var playerPayload = {
      provider: provider,
      id_token: id_token,
      picture: picture,
      name: name,
      wins: wins,
      draws: draws,
      losses: losses
    };

    const status = game.get('status');
    const updatedStatus = (status === 'awaitingInviteResponse') ? 'inProgress' : 'awaitingInviteResponse';
    const updatedGame = game.set('status', updatedStatus).set('isUserTurn', !game.get('userWasInvited'));

    const actionType = (updatedStatus === 'inProgress') ? 'accept' : 'invite';
    socket.emit(actionType, playerPayload);

    return state.set('game', updatedGame);
  });
}

export function onSignIn(googleUser, updater) {
  updater((state) => {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    const id_token = googleUser.getAuthResponse().id_token;
    const user = state.get('user');
    const name = profile.getName();
    const email = profile.getEmail();
    const picture = profile.getImageUrl();
    const provider = 'google';
    const updatedUser = user.set('email', email)
      .set('picture', picture)
      .set('name', name)
      .set('username', email)
      .set('provider', provider)
      .set('id_token', id_token);

    return state.set('user', updatedUser);
  });
}
