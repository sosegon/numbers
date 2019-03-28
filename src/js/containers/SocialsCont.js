const { connect } = require('react-redux');
const { SocialsComp } = require('../components/SocialsComp.js');

const mapStateToProps = (state) => {
	return {
		open: (social) => {
			let url = '';
			if(social === 'twitter') {
				url = 'https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&'+
				'text=Check%20out%20%23Numberness%2C%20a%20time%20killer%20game%20https%3A%2F%2Fsosegon.github.io%2Fnumberness%2F';
			} else if (social === 'facebook') {
				url = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsosegon.github.io%2Fnumberness&'+
				'quote=Check%20out%20%23Numberness%2C%20a%20time%20killer%20game%20https%3A%2F%2Fsosegon.github.io%2Fnumberness%2F';
			} else if (social === 'tumblr') {
				url = 'http://www.tumblr.com/share/link?url=https://sosegon.github.io/numbersness';
			}

			return () => {
				window.open(url, 'Share numberness', 'width=600, height=600');
			};
		}
	};
};

/**
 * Container to connect a {@link SocialsComp}.
 */
const SocialsCont = connect(mapStateToProps)(SocialsComp);

module.exports = {
	SocialsCont
};