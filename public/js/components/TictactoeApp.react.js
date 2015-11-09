/**
 * Top-level component for rendering the tic-tac-toe application; takes AppState
 * as a property.
 * 
 */
import React from 'react';
import createFragment from 'react-addons-create-fragment';
import Board from './Board.react';
import StatusController from './StatusController.react';
var TictactoeActions = require('../tictactoeActions');

export default class TictactoeApp extends React.Component {

  componentDidMount() {
    var that = this;
    TictactoeActions.listen(that.props.stateRefUpdater);
  }

  render() {
    const appState = this.props.appState;
    // TODO this can only handle a single game at a time. Do we need to handle multiple concurrent games?
    const game = appState.get('game');
    const user = appState.getUser();
    const userId = user.get('id');

    const opponent = game.get('opponent');
    const opponentId = opponent.get('id');

    return (
      <section>
        <div id="main">
          <article>
            <Board
              game={game}
              userId={userId}
              stateRefUpdater={this.props.stateRefUpdater}/>
          </article>
          <nav>
            <StatusController
              game={game}
              user={user}
              stateRefUpdater={this.props.stateRefUpdater}/>
          </nav>
        </div>
      </section>
    );
  }

}
