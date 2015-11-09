var React = require('react');
var ReactPropTypes = React.PropTypes;
var TictactoeActions = require('../tictactoeActions');
var classNames = require('classnames');

var cellValueToIconMapping = new Map();
cellValueToIconMapping.set('o', 'circle-o');
cellValueToIconMapping.set('x', 'times');

var Cell = React.createClass({

  propTypes: {
   game: ReactPropTypes.object.isRequired,
   cats: ReactPropTypes.bool.isRequired,
   cellKey: ReactPropTypes.string.isRequired,
   cellValue: ReactPropTypes.string,
   inWinPath: ReactPropTypes.bool.isRequired,
   userId: ReactPropTypes.string.isRequired,
   stateRefUpdater: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    const game = this.props.game;
    const cats = this.props.cats;
    const inWinPath = this.props.inWinPath;
    const cellKey = this.props.cellKey;
    const cellValue = this.props.cellValue;
    const iconName = cellValue !== null ? cellValueToIconMapping.get(cellValue) : '';
    const className = 'fa fa-' + iconName + ' fa-6 box-content';
    const playable = (cellValue === null);

    return (
        <li
          onClick={this._onClick}
          className={classNames({
            'cell': true,
            'playable': playable,
            'win-path': inWinPath,
            'cats': cats
          })}>
          <i className={className}></i>
        </li>
    );
  },

  _onClick: function() {
    TictactoeActions.markCell(this.props.game, this.props.cellKey, this.props.userId, this.props.stateRefUpdater);
  },

});

module.exports = Cell;
