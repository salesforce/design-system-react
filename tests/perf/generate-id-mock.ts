// Deterministic ids for perf fixtures (see stories.ts). The counter resets
// before each story so ids, and so DOM sizes, don't depend on test order.
let idCounter = 0;

export const resetIds = () => {
	idCounter = 0;
};

export default {
	default: () => `slds-perf-id-${(idCounter += 1)}`,
};
