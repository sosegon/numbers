const React = require('react');
const PropTypes = require('prop-types');

const GameEndComp = ({
    style,
    message
}) => {
    return (
        <div className={style}>
            <p className='message'>{message}</p>
        </div>
    );
};

GameEndComp.propTypes = {
    style: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

module.exports = {
    GameEndComp
};