import React from 'react';

export interface CellContextValue {
	rowIndex: number;
	columnIndex: number;
	/** Set on the table's corner cells so their backgrounds follow its radius */
	cornerStyle?: React.CSSProperties;
}

const CellContext = React.createContext<CellContextValue>({
	rowIndex: 0,
	columnIndex: 0,
});

export default CellContext;
