const React = require('react');
const PropTypes = require('prop-types');

const WildCardComp = ({ style }) => {
    return (
        <span className={style}>★</span>
    );
};

WildCardComp.propTypes = {
    style: PropTypes.string.isRequired
};

module.exports = {
    WildCardComp
};