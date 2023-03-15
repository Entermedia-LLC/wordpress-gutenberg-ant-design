/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

export const availableInnerBlocks = [
	"gutenberg-ant-design/button",
	"gutenberg-ant-design/image",
	"gutenberg-ant-design/title",
	"gutenberg-ant-design/text",
	"gutenberg-ant-design/paragraph",
	"gutenberg-ant-design/row",
	"gutenberg-ant-design/group",
	"gutenberg-ant-design/post-featured-image",
	"gutenberg-ant-design/list",
];

export const screenSizes = {
	xs: {
		title: __("XS Screens"),
		name: __("xs screens"),
		antdToken: "screenXS",
	},
	sm: {
		title: __("Small Screens"),
		name: __("small screens"),
		antdToken: "screenSM",
	},
	md: {
		title: __("Medium Screens"),
		name: __("medium screens"),
		antdToken: "screenMD",
	},
	lg: {
		title: __("Large Screens"),
		name: __("large screens"),
		antdToken: "screenLG",
	},
	xl: {
		title: __("XL Screens"),
		name: __("x-large screens"),
		antdToken: "screenXL",
	},
	xxl: {
		title: __("2X Large Screens"),
		name: __("2x large screens"),
		antdToken: "screenXXL",
	},
};
