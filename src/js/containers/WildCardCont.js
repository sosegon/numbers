const { connect } = require('react-redux');
const PropTypes = require('prop-types');
const { WildCardComp } = require('@components/WildCardComp');

const mapStateToProps = (state, ownProps) => {
    return {
        rowIndex: state.token.rowIndex,
        colIndex: state.token.colIndex,
        'data-testid': ownProps['data-testid'],
    };
};

/**
 * Container to connect a {@link WildCardComp}.
 * @param {object} props
 * @param {number} props.rowIndex Row index of the {@link Token}.
 * @param {number} props.colIndex Column index of the {@link Token}.
 */
const WildCardCont = connect(mapStateToProps)(WildCardComp);

WildCardCont.propTypes = {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    'data-testid': PropTypes.string,
};

module.exports = {
    WildCardCont,
};
