const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { CellSpan } = require('@components/CellComp');
const TokenIcon = require('@icons/TokenIcon');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the {@link Token} in a {@link Game}.
 *
 * @param {object} props
 * @param {string} props.style CSS style.
 */
const WildCardComp = ({ rowIndex, colIndex }) => {
    const theme = styled.useTheme();
    let style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        transition: 'left 0.5s, top 0.5s',
        backgroundColor: theme.colors.accent,
        borderColor: theme.colors.accentLight,
        color: theme.colors.black,
        boxShadow:
            'rgb(255, 255, 0) 0px 0px 10px, rgb(255, 255, 0) 0px 0px 20px, rgba(255, 255, 0, 0.5) 0px 0px 10px inset',
        top:
            rowIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding,
        left:
            colIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding,
    };
    return (
        <CellSpan style={style}>
            <TokenIcon
                width="80%"
                style={{
                    svg: {
                        fill: 'red',
                    },
                }}
            />
        </CellSpan>
    );
};

WildCardComp.propTypes = {
    style: PropTypes.string.isRequired,
};

module.exports = {
    WildCardComp,
};
