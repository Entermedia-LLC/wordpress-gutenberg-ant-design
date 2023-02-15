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
