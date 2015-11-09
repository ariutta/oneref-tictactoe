var React = require('react');
var ReactPropTypes = React.PropTypes;
var TictactoeActions = require('../tictactoeActions');
var classNames = require('classnames');
import GoogleSignIn from './GoogleSignIn.react';

var StatusController = React.createClass({

  propTypes: {
   game: ReactPropTypes.object.isRequired,
   user: ReactPropTypes.object.isRequired,
   stateRefUpdater: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var that = this;
    const user = this.props.user;
    const userId = user.get('id');
    const email = user.get('email');
    const name = user.get('name');
    const picture = user.get('picture');
    const wins = user.get('wins');
    const draws = user.get('draws');
    const losses = user.get('losses');

    const game = this.props.game;
    const userWasInvited = game.get('userWasInvited');
    const status = game.get('status');
    const opponent = game.get('opponent');
    const opponentId = opponent.get('id');
    const opponentPicture = opponent.get('picture');
    const opponentWins = opponent.get('wins');
    const opponentDraws = opponent.get('draws');
    const opponentLosses = opponent.get('losses');
    const opponentName = opponent.get('name') || 'Waiting for an opponent...';

    var gameStatusComponent = [];

    if (email) {
      gameStatusComponent.push(<section
                                   key={'user-profile'}
                                   id="game-status"
                                   className={'badge'}>
                                 <img src={picture} className={'badge-picture'}></img>
                                 <div className={'badge-text'}>
                                   <h3>{name}</h3>
                                   <p>({wins} - {draws} - {losses})</p>
                                 </div>
                               </section>);
      gameStatusComponent.push(<section
                                   key={'versus'}
                                   className={'versus'}>
                                 <h2>versus</h2>
                               </section>);
      if (opponentId) {
          gameStatusComponent.push(<section
                                       key={'opponent-profile'}
                                       className={'badge'}>
                                     <img src={opponentPicture} className={'badge-picture'}></img>
                                     <div className={'badge-text'}>
                                       <h3>{opponentName}</h3>
                                       <p>({opponentWins} - {opponentDraws} - {opponentLosses})</p>
                                     </div>
                                   </section>);
      } else if (game.get('status') === 'awaitingInviteResponse' && !userWasInvited) {
          gameStatusComponent.push(<section
                                     key={'opponent-profile-placeholder'}
                                     className={'badge'}>
                                    <img src="https://developers.google.com/_static/566c228654/images/silhouette36.png?sz=64" className={'badge-picture'}></img>
                                    <div className={'badge-text'}>
                                      <h3>Waiting for opponent</h3>
                                      <p>(0 - 0 - 0)</p>
                                    </div>
                                   </section>);
      }

    } else {
      gameStatusComponent.push(<section
                                   key={'sign-in'}
                                   id="game-status">
                                 <h3>Sign In</h3>
                                 <GoogleSignIn
                                     user={user}
                                     stateRefUpdater={that.props.stateRefUpdater}/>
                               </section>);
      if (opponentId) {
        gameStatusComponent.push(<section
                                     key={'challenge-lead'}
                                     className={'versus'}>
                                   <h2>Challenge from</h2>
                                 </section>);
        gameStatusComponent.push(<section
                                     key={'opponent-challenge'}
                                     className={'badge'}>
                                   <img src={opponentPicture} className={'badge-picture'}></img>
                                   <div className={'badge-text'}>
                                     <h3>{opponentName}</h3>
                                     <p>({opponentWins} - {opponentDraws} - {opponentLosses})</p>
                                   </div>
                                 </section>);
      }
    }

    function addStartGameButton(text, gameStatus, userIsLoggedIn) {
      var startGameButtonText = (!userIsLoggedIn) ? 'Sign in to ' : '';
      startGameButtonText += text;
      startGameButtonText = startGameButtonText.replace(/\w/, letter => letter.toUpperCase());
      gameStatusComponent.push(<section className={'versus'}
                                   key={'start-game-' + text + gameStatus + userIsLoggedIn}>
                                 <button
                                     disabled={!userIsLoggedIn}
                                     id="start-game"
                                     onClick={this._startGame}>
                                   {startGameButtonText}
                                 </button>
                               </section>);
    }

    const userIsLoggedIn = !!email;
    if ((status === 'awaitingInviteResponse') && userWasInvited) {
      addStartGameButton.call(this, 'accept invitation', status, userIsLoggedIn);
    } else if (status === 'none') {
      addStartGameButton.call(this, 'invite an opponent', status, userIsLoggedIn);
    }

    return (
      <section>
        {gameStatusComponent}
      </section>
    );
  },

  _startGame: function() {
    var that = this;
    TictactoeActions.startGame(this.props.game, that.props.stateRefUpdater);
  }

});

module.exports = StatusController;
