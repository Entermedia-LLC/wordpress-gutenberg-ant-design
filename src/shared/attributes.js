import { createDefaultAttributes } from "../shared";

// default attributes for title component
export const titleAttributes = createDefaultAttributes({
	api: {
		code: false,
		copyable: false,
		delete: false,
		disabled: false,
		mark: false,
		level: 1,
		italic: false,
		type: "",
		underline: false,
	},
});

export const textAttributes = createDefaultAttributes({
	api: {
		code: false,
		copyable: false,
		delete: false,
		disabled: false,
		keyboard: false,
		mark: false,
		italic: false,
		strong: false,
		type: "",
		underline: false,
	},
});
