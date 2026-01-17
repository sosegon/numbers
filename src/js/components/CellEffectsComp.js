const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { CellSpan } = require('@components/CellComp');
const TokenIcon = require('@icons/TokenIcon');
const { TURNS } = require('@model/flags');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the {@link Token} in a {@link Game}.
 *
 * @param {object} props
 * @param {number} props.rowIndex Row index of the {@link Token}.
 * @param {number} props.colIndex Column index of the {@link Token}.
 */
const CellEffectsComp = ({
    rowIndex,
    colIndex,
    turn,
    'data-testid': dataTestId = 'cell-effects-comp',
}) => {
    const theme = styled.useTheme();
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: theme.colors.black,
        top:
            rowIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding,
        left:
            colIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding,
    };

    const styleParticle = {
        backgroundColor: turn === TURNS.PLAYER1 ? theme.colors.primary : theme.colors.secondary,
    };

    return (
        <CellSpan style={style} data-testid={dataTestId}>
            <div className="firework" key={`${rowIndex}-${colIndex}`}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="particle"
                        style={styleParticle}
                        data-testid={`${dataTestId}-particle-${index}`}
                    ></div>
                ))}
            </div>
        </CellSpan>
    );
};

CellEffectsComp.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
    turn: PropTypes.oneOf(Object.values(TURNS)).isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    CellEffectsComp,
};
