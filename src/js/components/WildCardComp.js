const React = require('react');
const PropTypes = require('prop-types');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the {@link Token} in a {@link Game}.
 *
 * @param {object} props
 * @param {string} props.style CSS style.
 */
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