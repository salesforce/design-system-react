declare const checkProps: (
	componentName: string,
	props: Record<string, unknown>,
	jsonDoc?: Record<string, unknown>
) => void;

export declare const checkRemovedProps: (
	componentName: string,
	props: Record<string, unknown>,
	jsonDoc?: Record<string, unknown>
) => void;

export default checkProps;
