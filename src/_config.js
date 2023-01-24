/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

export const availableInnerBlocks = ["gutenberg-ant-design/button"];

export const screenSizes = {
	xs: {
		title: __("XS Screens"),
		name: __("xs screens"),
	},
	sm: {
		title: __("Small Screens"),
		name: __("small screens"),
	},
	md: {
		title: __("Medium Screens"),
		name: __("medium screens"),
	},
	lg: {
		title: __("Large Screens"),
		name: __("large screens"),
	},
	xl: {
		title: __("XL Screens"),
		name: __("x-large screens"),
	},
	xxl: {
		title: __("2X Large Screens"),
		name: __("2x large screens"),
	},
};
