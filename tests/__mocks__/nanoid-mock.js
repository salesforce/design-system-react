function getUniqueMockNanoId() {
	const randomString = Array.from({ length: 10 }, () => {
		const isUppercase = Math.random() < 0.5;
		const charCode = isUppercase
			? 65 + Math.floor(Math.random() * 26)
			: 97 + Math.floor(Math.random() * 26);
		return String.fromCharCode(charCode);
	}).join('');
	return `mockId_${randomString}`;
}

module.exports = function generateId() {
	return getUniqueMockNanoId();
};
