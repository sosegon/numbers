const { connect } = require('react-redux');
const { WildCardComp } = require('../components/WildCardComp.js');

const generateStyle = (token) => {
    let classArray = ['wild-card'];
    classArray.push('position_' + token.rowIndex + '_' + token.colIndex);
    classArray.push('row_from_' + token.oldRowIndex + '_to_' + token.rowIndex);
    classArray.push('column_from_' + token.oldColIndex + '_to_' + token.colIndex);

    return classArray.join(' ');
};

const mapStateToProps = (state) => {
    return {
        style: generateStyle(state.token)
    };
};

const WildCardCont = connect(mapStateToProps)(WildCardComp);

module.exports = {
    WildCardCont
};