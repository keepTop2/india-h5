//提供方法 copy
export const copy = (text: string) => {
	if (window.navigator.clipboard) {
		return window.navigator.clipboard.writeText(text);
	}
	return Promise.reject();
};
