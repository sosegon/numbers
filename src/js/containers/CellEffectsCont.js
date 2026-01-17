const { connect } = require('react-redux');
const PropTypes = require('prop-types');
const { CellEffectsComp } = require('@components/CellEffectsComp');

const mapStateToProps = (state, ownProps) => {
    return {
        rowIndex: state.game.token.rowIndex,
        colIndex: state.game.token.colIndex,
        turn: state.game.snap.turn,
        soundEnabled: state.settings.soundEnabled,
        soundLocked: state.settings.soundLocked,
        'data-testid': ownProps['data-testid'],
    };
};

/**
 * Container to connect a {@link CellEffectsComp}.
 * @param {object} props
 */
const CellEffectsCont = connect(mapStateToProps)(CellEffectsComp);

CellEffectsCont.propTypes = {
    'data-testid': PropTypes.string,
};

module.exports = {
    CellEffectsCont,
};
