import React from 'react';

export default React.createContext({
	rowIndex: null,
	columnIndex: null,
	activeElement: null, // TODO REMOVE
	mode: null, // TODO REMOVE
	changeActiveElement: () => { }, // TODO REMOVE
	registerInteractiveElement: () => { } // TODO REMOVE
});
