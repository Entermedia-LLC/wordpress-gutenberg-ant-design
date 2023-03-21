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

export const sizes = applyFilters("gutenbergAntDesign.sizes", [
	{
		token: "size",
		size: "var(--antd-size)",
	},
	{
		token: "sizeXXS",
		size: "var(--antd-sizexxs)",
	},
	{
		token: "sizeXS",
		size: "var(--antd-sizexs)",
	},
	{
		token: "sizeSM",
		size: "var(--antd-sizesm)",
	},
	{
		token: "sizeMD",
		size: "var(--antd-sizemd)",
	},
	{
		token: "sizeMS",
		size: "var(--antd-sizems)",
	},
	{
		token: "sizeLG",
		size: "var(--antd-sizelg)",
	},
	{
		token: "sizeXL",
		size: "var(--antd-sizexl)",
	},
	{
		token: "sizeXXL",
		size: "var(--antd-sizexxl)",
	},
]);

export const fontSizes = applyFilters("gutenbergAntDesign.fontSizes", [
	{
		name: __("fontSize"),
		slug: "fontSize",
		size: "var(--antd-fontsize)",
		shortName: __("Normal"),
	},
	{
		name: __("fontSizeSM"),
		slug: "fontSizeSM",
		size: "var(--antd-fontsizesm)",
		shortName: __("SM Font"),
	},
	{
		name: __("fontSizeLG"),
		slug: "fontSizeLG",
		size: "var(--antd-fontsizelg)",
		shortName: __("LG Font"),
	},
	{
		name: __("fontSizeXL"),
		slug: "fontSizeXL",
		size: "var(--antd-fontsizexl)",
		shortName: __("XL Font"),
	},
	{
		name: __("fontSizeHeading1"),
		slug: "fontSizeHeading1",
		size: "var(--antd-fontsizeheading1)",
		shortName: __("H1"),
	},
	{
		name: __("fontSizeHeading2"),
		slug: "fontSizeHeading2",
		size: "var(--antd-fontsizeheading2)",
		shortName: __("H2"),
	},
	{
		name: __("fontSizeHeading3"),
		slug: "fontSizeHeading3",
		size: "var(--antd-fontsizeheading3)",
		shortName: __("H3"),
	},
	{
		name: __("fontSizeHeading4"),
		slug: "fontSizeHeading4",
		size: "var(--antd-fontsizeheading4)",
		shortName: __("H4"),
	},
	{
		name: __("fontSizeHeading5"),
		slug: "fontSizeHeading5",
		size: "var(--antd-fontsizeheading5)",
		shortName: __("H5"),
	},
	{
		name: __("size"),
		slug: "size",
		size: "var(--antd-size)",
		shortName: __("Size"),
	},
	{
		name: __("sizeXXS"),
		slug: "sizeXXS",
		size: "var(--antd-sizexxs)",
		shortName: __("XXS"),
	},
	{
		name: __("sizeXS"),
		slug: "sizeXS",
		size: "var(--antd-sizexs)",
		shortName: __("XS"),
	},
	{
		name: __("sizeSM"),
		slug: "sizeSM",
		size: "var(--antd-sizesm)",
		shortName: __("SM"),
	},
	{
		name: __("sizeMD"),
		slug: "sizeMD",
		size: "var(--antd-sizemd)",
		shortName: __("MD"),
	},
	{
		name: __("sizeLG"),
		slug: "sizeLG",
		size: "var(--antd-sizelg)",
		shortName: __("LG"),
	},
	{
		name: __("sizeXL"),
		slug: "sizeXL",
		size: "var(--antd-sizexl)",
		shortName: __("XL"),
	},
	{
		name: __("sizeXXL"),
		slug: "sizeXXL",
		size: "var(--antd-sizexxl)",
		shortName: __("XXL"),
	},
]);

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
