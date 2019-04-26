import React from 'react';

export default React.createContext({
	activeCell: { rowIndex: 0, columnIndex: 0 },
	activeElement: null,
	mode: null,
	tableHasFocus: false,
	changeActiveCell: () => {},
	changeActiveElement: () => {},
	handleKeyDown: () => {},
	registerInteractiveElement: () => {},
	allowKeyboardNavigation: true,
	setAllowKeyboardNavigation: () => {},
});
