const React = require('react');
const PropTypes = require('prop-types');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders a social buttons.
 *
 * @param {function} props.open Function that opens a popup to a social network.
 */
const SocialsComp = ({
    open
}) => {
    return (
         <div className="socials-box">
            <img src="./images/socials-tumblr.png" onClick={open('tumblr')}/>
            <img src="./images/socials-twitter.png" onClick={open('twitter')}/>
            <img src="./images/socials-facebook.png" onClick={open('facebook')}/>
        </div>
    );
};

SocialsComp.propTypes = {
    open: PropTypes.func.isRequired,
};

module.exports = {
    SocialsComp
};