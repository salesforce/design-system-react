jest.mock('nanoid', () => {
	return { nanoid: () => '1234' };
});
