const WildCardComp = ({cell}) => {
	var classArray = ['wild-card'];
	classArray.push('position_' + cell.rowIndex + '_' + cell.colIndex);
	classArray.push('row_from_' + cell.oldRowIndex + '_to_' + cell.rowIndex);
	classArray.push('column_from_' + cell.oldColIndex + '_to_' + cell.colIndex);
	var classes = classArray.join(' ');
	return (
		<span className={classes}>★</span>
	);
};

module.exports = {
	WildCardComp
};