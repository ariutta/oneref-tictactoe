/**
 * Component for rendering the tic-tac-toe board
 * 
 */
var Cell = require('./Cell.react');
var React = require('react');
var ReactPropTypes = React.PropTypes;
var createFragment = require('react-addons-create-fragment');

var Board = React.createClass({

  propTypes: {
   game: ReactPropTypes.object.isRequired,
   userId: ReactPropTypes.string.isRequired,
   stateRefUpdater: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    const userId = this.props.userId;

    const game = this.props.game;
    const isUserTurn = game.get('isUserTurn');
    const opponentId = game.get('opponent').get('id');
    const status = game.get('status');
    const board = game.get('board');
    const cats = board.get('cats');
    const winPath = board.get('winPath');
    const cellList = board.get('cellList').toArray();
    const cellListElementsStyle = {
      pointerEvents: (!!userId && !!opponentId && (status === 'inProgress') && isUserTurn) ? 'auto' : 'none'
    };

    const cellListElements = [];
    for (var key in cellList) {
      cellListElements.push(<Cell
                                key={key}
                                cellKey={key}
                                cellValue={cellList[key]}
                                game={game}
                                cats={cats}
                                inWinPath={winPath.includes(parseFloat(key))}
                                userId={this.props.userId}
                                stateRefUpdater={this.props.stateRefUpdater} />);
    }

    return (
      <ul
        style={cellListElementsStyle}>
        {cellListElements}
      </ul>
    );
  }

});

module.exports = Board;
