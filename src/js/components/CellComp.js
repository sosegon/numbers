const React = require('react');
const PropTypes = require('prop-types');
const { GAME_STATUSES } = require('../model/constants.js');

const { Component } = React;

class CellComp extends Component {
    shouldComponentUpdate() {
        return this.props.gameStatus !== GAME_STATUSES.MOVING_TOKEN;
    }
    render() {
        const props = this.props;

        return (
            <span className={props.style} onClick={props.onClick}>{props.value}</span>
        );
    }
}

CellComp.propTypes = {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    style: PropTypes.string,
    isSelectable: PropTypes.bool,
    gameStatus: PropTypes.number,
    value: PropTypes.number,
    onClick: PropTypes.func
};

module.exports = {
    CellComp
};