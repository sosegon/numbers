const React = require('react');
const PropTypes = require('prop-types');
const { GAME_STATUSES } = require('../model/flags.js');

const { Component } = React;

class CellComp extends Component {
    // TODO: Check how to use this. However, it is working well now
    // shouldComponentUpdate() {
    //     return this.props.gameStatus !== GAME_STATUSES.RESTING;
    // }
    render() {
        const props = this.props;

        return (
            <span className={props.style} onClick={props.onClick}>{props.value}</span>
        );
    }
}

CellComp.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    isSelectable: PropTypes.bool.isRequired,
    gameStatus: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

module.exports = {
    CellComp
};