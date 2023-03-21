/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

export const availableInnerBlocks = applyFilters(
	"gutenbergAntDesign.availableInnerBlocks",
	[
		"gutenberg-ant-design/button",
		"gutenberg-ant-design/image",
		"gutenberg-ant-design/title",
		"gutenberg-ant-design/text",
		"gutenberg-ant-design/paragraph",
		"gutenberg-ant-design/row",
		"gutenberg-ant-design/group",
		"gutenberg-ant-design/post-featured-image",
		"gutenberg-ant-design/list",
	]
);

export const fontSizes = [
	{
		name: __("XX-Small"),
		slug: "sizeXXS",
		size: "var(--antd-sizexxs)",
		shortName: __("XXS"),
	},
	{
		name: __("X-Small"),
		slug: "sizeXS",
		size: "var(--antd-sizexs)",
		shortName: __("XS"),
	},
	{
		name: __("Small"),
		slug: "sizeSM",
		size: "var(--antd-sizesm)",
		shortName: __("SM"),
	},
	{
		name: __("Medium"),
		slug: "sizeMD",
		size: "var(--antd-sizemd)",
		shortName: __("MD"),
	},
	{
		name: __("Large"),
		slug: "sizeLG",
		size: "var(--antd-sizelg)",
		shortName: __("LG"),
	},
	{
		name: __("X-Large"),
		slug: "sizeXL",
		size: "var(--antd-sizexl)",
		shortName: __("XL"),
	},
	{
		name: __("XX-Large"),
		slug: "sizeXXL",
		size: "var(--antd-sizexxl)",
		shortName: __("XXL"),
	},
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
