/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import { PanelBody, ToggleControl, TextControl } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";

/**
 * Import andt components, dependencies & configuration
 */
import { Typography, ConfigProvider } from "antd";
import {
	updateAttributes,
	generateStyles,
} from "../../shared";
import { titleAttributes } from "../../shared/attributes";
import { Controls } from "../../shared/controls";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../block-editor/block-visibility";
import { BlockStyles } from "../../block-editor/block-styles";
const { Title, Link } = Typography;

/**
 * Import editor styles
 */
import "./editor.scss";

/**
 * Gutenberg Edit component
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	context: { postType, postId, queryId },
}) {
	// Dyncamic data for Post title
	const [rawTitle = "", setTitle, fullTitle] = useEntityProp(
		"postType",
		postType,
		"title",
		postId
	);

	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...titleAttributes, ...attributes };

	// Component processing
	const { code, copyable, disabled, mark, level, italic, type, underline } =
		savedAttributes.api;

	/**
	 * Ant Design component props
	 *
	 * These should match the available API properties and their default for the
	 * corresponding Ant Design component. Note: Some props like that accept
	 * functions or more dynamic values like functions of ReactNodes may need to
	 * be omitted or parsed.
	 */
	const antdComponentProps = {
		code,
		copyable,
		delete: savedAttributes.api.delete,
		disabled,
		mark,
		level,
		italic,
		type,
		underline,
	};

	// Default state for title component
	let titleElement = (
		<Title {...blockProps} {...antdComponentProps}>
			{__("Post Title")}
		</Title>
	);

	if (postType && postId) {
		titleElement = (
			<Title {...blockProps} {...antdComponentProps}>
				{fullTitle?.rendered}
			</Title>
		);
	}

	// Render component as Link.
	const [link] = useEntityProp("postType", postType, "link", postId);

	if (savedAttributes?.api?.isLink && postType && postId) {
		titleElement = (
			<Title {...blockProps} {...antdComponentProps}>
				<Link
					href={link}
					target={savedAttributes.api.linkTarget}
					rel={savedAttributes.api.rel}
					style={{ fontSize: "inherit" }}
				>
					{fullTitle?.rendered}
				</Link>
			</Title>
		);
	}

	return (
		<ConfigProvider theme={antdTheme}>
			{titleElement}
			<style>
				{generateStyles(
					savedAttributes,
					clientId,
					`h${savedAttributes.api.level}.ant-typography`
				)}
			</style>

			<InspectorControls>
				<BlockVisibility
					attributes={savedAttributes}
					setAttributes={setAttributes}
				/>
				<PanelBody title={__("Options")} initialOpen={false}>
					<ToggleControl
						label={__("Make title a link")}
						onChange={(value) => {
							updateAttributes(
								"api",
								"isLink",
								value,
								savedAttributes,
								setAttributes
							);
						}}
						checked={savedAttributes.api.isLink}
					/>
					{savedAttributes.api.isLink && (
						<>
							<ToggleControl
								label={__("Open in new tab")}
								onChange={(value) => {
									updateAttributes(
										"api",
										"linkTarget",
										value ? "_blank" : "_self",
										savedAttributes,
										setAttributes
									);
								}}
								checked={savedAttributes.api.linkTarget === "_blank"}
							/>
							<TextControl
								__nextHasNoMarginBottom
								label={__("Link rel")}
								value={savedAttributes.api.rel}
								onChange={(value) => {
									updateAttributes(
										"api",
										"rel",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</>
					)}
				</PanelBody>
				<Controls
					updateAttributes={updateAttributes}
					savedAttributes={savedAttributes}
					setAttributes={setAttributes}
				/>

				<BlockStyles
					styles={savedAttributes.styles}
					onChange={(screenSize, attribute, value) => {
						updateAttributes(
							"styles",
							screenSize,
							{
								...savedAttributes.styles[screenSize],
								[attribute]: value,
							},
							savedAttributes,
							setAttributes
						);
					}}
					enabledScreenSizes={savedAttributes.visibility}
				/>
			</InspectorControls>
		</ConfigProvider>
	);
}
