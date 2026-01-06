const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { TURNS } = require('@model/flags');

const CellSpan = styled.default.span`
    border-radius: ${({ theme }) => theme.sizes.cellSize / 6}px;
    display: inline-block;
    font-size: ${({ theme }) => theme.sizes.cellFontSize}px;
    font-weight: bold;
    height: ${({ theme }) => theme.sizes.cellSize}px;
    line-height: ${({ theme }) => theme.sizes.cellSize * 0.9}px;
    margin: ${({ theme }) => theme.sizes.cellMargin}px;
    text-align: center;
    vertical-align: middle;
    width: ${({ theme }) => theme.sizes.cellSize}px;
    background-color: ${({ theme }) => theme.colors.tertiaryColor};
    border-width: ${({ theme }) => theme.sizes.cellBorder}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.tertiaryLight};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

/**
 * {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the value of a {@link Cell}.
 *
 * @param {object} props
 * @param {string} props.style CSS style.
 * @param {function} props.onClick Function to be triggered when component is clicked.
 * @param {number} props.value Value of {@link Cell}.
 */
const CellComp = ({ onClick, value, isSelectable, turn, taken }) => {
    const theme = styled.useTheme();
    let style = {};
    if (isSelectable && turn === TURNS.PLAYER1) {
        style = {
            borderColor: theme.colors.primaryLight,
            color: theme.colors.primary,
            boxShadow: 'rgb(0, 255, 255) 0px 0px 10px, rgba(0, 255, 255, 0.2) 0px 0px 10px inset',
            cursor: 'pointer',
        };
    } else if (isSelectable && turn === TURNS.PLAYER2) {
        style = {
            borderColor: theme.colors.secondaryLight,
            color: theme.colors.secondary,
            boxShadow: 'rgb(255, 0, 255) 0px 0px 10px, rgba(255, 0, 255, 0.2) 0px 0px 10px inset',
        };
    }
    if (taken) {
        style = {
            ...style,
            background: `linear-gradient(to top right, ${theme.colors.tertiaryDark} calc(50% - 0.5px), ${theme.colors.tertiaryLight} calc(50% - 0.5px), ${theme.colors.tertiaryLight} calc(50% + 0.5px), ${theme.colors.tertiaryDark} calc(50% + 0.5px))`,
            boxShadow: 'none',
        };
    }
    return (
        <CellSpan style={style} onClick={onClick}>
            {value}
        </CellSpan>
    );
};

CellComp.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    isSelectable: PropTypes.bool.isRequired,
    turn: PropTypes.number.isRequired,
    taken: PropTypes.bool.isRequired,
};

module.exports = {
    CellComp,
    CellSpan,
};
