import React from 'react';

export interface CellContextValue {
	rowIndex: number;
	columnIndex: number;
}

const CellContext = React.createContext<CellContextValue>({
	rowIndex: 0,
	columnIndex: 0,
});

export default CellContext;
