const { connect } = require('react-redux');
const { WildCardComp } = require('@components/WildCardComp');

const mapStateToProps = (state) => {
    return {
        rowIndex: state.token.rowIndex,
        colIndex: state.token.colIndex,
    };
};

/**
 * Container to connect a {@link WildCardComp}.
 */
const WildCardCont = connect(mapStateToProps)(WildCardComp);

module.exports = {
    WildCardCont,
};
