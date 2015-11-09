'use strict';

import React from 'react';
import OneRef from 'oneref';
import TictactoeAppState from './tictactoeAppState';
import TictactoeApp from './components/TictactoeApp.react';

const tictactoeAppState = new TictactoeAppState();
const stateRef = new OneRef.Ref(tictactoeAppState);

React.render(
  <OneRef.AppContainer appClass={TictactoeApp} stateRef={stateRef} />,
  document.getElementById('tictactoeapp')
);
