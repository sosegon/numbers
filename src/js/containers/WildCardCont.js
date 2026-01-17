const { connect } = require('react-redux');
const PropTypes = require('prop-types');
const { WildCardComp } = require('@components/WildCardComp');

const mapStateToProps = (state, ownProps) => {
    return {
        rowIndex: state.game.token.rowIndex,
        colIndex: state.game.token.colIndex,
        'data-testid': ownProps['data-testid'],
    };
};

/**
 * Container to connect a {@link WildCardComp}.
 * @param {object} props
 */
const WildCardCont = connect(mapStateToProps)(WildCardComp);

WildCardCont.propTypes = {
    'data-testid': PropTypes.string,
};

module.exports = {
    WildCardCont,
};
