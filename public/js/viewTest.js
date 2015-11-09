'use strict';

import React from 'react';
import TictactoeAppState from './tictactoeAppState';
import TictactoeApp from './components/TictactoeApp.react';

const state0 = new TictactoeAppState();
const game0 = state0.get('game');
const tictactoeAppState = state0.markCell(game0, '0', true);

React.render(
  <TictactoeApp appState={tictactoeAppState} />,
  document.getElementById('tictactoeapp')
);
