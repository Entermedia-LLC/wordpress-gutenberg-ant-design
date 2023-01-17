/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";

import { useRef } from "@wordpress/element";
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	TextControl,
	SelectControl,
	NumberControl,
} from "@wordpress/components";

/**
 * The Ant Design component dependencies.
 */
import { Button } from "antd";
import * as Icons from "@ant-design/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;

	const {
		placeholder,
		text,
		block,
		danger,
		disabled,
		ghost,
		href,
		htmlType = "button",
		icon,
		shape = "default",
		size = "middle",
		target,
		type = "default",
		loading = 0,
	} = attributes;

	const blockProps = useBlockProps();

	function setButtonText(newText) {
		// Remove anchor tags from button text content.
		setAttributes({ text: newText.replace(/<\/?a[^>]*>/g, "") });
	}

	const iconOptions = [{ label: __("No Icon"), value: undefined }];
	for (const [key] of Object.entries(Icons)) {
		// Skip imports that aren't actually icon components
		// @TODO: Is there a better, more dynamic way to do this, maybe by checking the type?
		if (
			[
				"default",
				"getTwoToneColor",
				"createFromIconfontCN",
				"setTwoToneColor",
			].includes(key)
		) {
			continue;
		}

		iconOptions.push({
			label: key,
			value: key,
		});
	}

	const richTextRef = useRef();

	const Icon = icon in Icons ? Icons[icon] : false;

	const buttonProps = {
		block: block || false,
		danger: danger || false,
		disabled: disabled || false,
		ghost: ghost || false,
		href: href || undefined,
		htmlType: htmlType || "button",
		icon: Icon ? <Icon /> : undefined,
		shape: shape || "default",
		size: size || "middle",
		type: type || "default",
		target: target || undefined,
		loading: loading ? { delay: loading } : false,
	};

	return (
		<>
			<Button {...blockProps} {...buttonProps}>
				<RichText
					ref={richTextRef}
					aria-label={__("Button text")}
					placeholder={placeholder || __("Add text…")}
					value={text}
					onChange={(value) => setButtonText(value)}
					withoutInteractiveFormatting
					tagName="span"
				/>
			</Button>
			<InspectorControls>
				<PanelBody title={__("API Settings")}>
					<p>
						See the{" "}
						<a href="https://ant.design/components/button#api" target="_blank">
							Button API docs
						</a>{" "}
						for more information & examples.
					</p>

					<BaseControl label={wp.i18n.__("Block", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Option to fit button width to its parent width.",
								"gutenberg-ant-design"
							)}
						</p>
						<ToggleControl
							checked={block}
							onChange={(val) => {
								setAttributes({ block: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Danger", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Set the danger status of button.",
								"gutenberg-ant-design"
							)}
						</p>
						<ToggleControl
							checked={danger}
							onChange={(val) => {
								setAttributes({ danger: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Disabled", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__("Disabled state of button.", "gutenberg-ant-design")}
						</p>
						<ToggleControl
							checked={disabled}
							onChange={(val) => {
								setAttributes({ disabled: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Ghost", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Make background transparent and invert text and border colors.",
								"gutenberg-ant-design"
							)}
						</p>
						<ToggleControl
							checked={disabled}
							onChange={(val) => {
								setAttributes({ ghost: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Href", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Redirect url of link button.",
								"gutenberg-ant-design"
							)}
						</p>
						<TextControl
							onChange={(val) => {
								setAttributes({ href: val });
							}}
						/>
					</BaseControl>

					{href?.length > 0 && (
						<BaseControl label={wp.i18n.__("Target", "gutenberg-ant-design")}>
							<p>
								{wp.i18n.__(
									"Same as target attribute of a.",
									"gutenberg-ant-design"
								)}
							</p>
							<TextControl
								onChange={(val) => {
									setAttributes({ target: val });
								}}
							/>
						</BaseControl>
					)}

					<BaseControl label={wp.i18n.__("HTML Type", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Set the original html type.",
								"gutenberg-ant-design"
							)}
						</p>
						<TextControl
							onChange={(val) => {
								setAttributes({ htmlType: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Icon", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Set the icon component of button.",
								"gutenberg-ant-design"
							)}
						</p>
						<SelectControl
							value={icon}
							options={iconOptions}
							onChange={(val) => {
								setAttributes({ icon: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Loading", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__(
								"Set the loading status of button.",
								"gutenberg-ant-design"
							)}
						</p>
						<TextControl
							onChange={(val) => {
								setAttributes({ loading: val });
							}}
							value={loading}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Shape", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__("Can be set button shape.", "gutenberg-ant-design")}
						</p>
						<SelectControl
							value={shape}
							options={[
								{
									label: "default",
									value: "default",
								},
								{ label: "circle", value: "circle" },
								{ label: "round", value: "round" },
							]}
							onChange={(val) => {
								setAttributes({ shape: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Size", "gutenberg-ant-design")}>
						<p>
							{wp.i18n.__("Set the size of button.", "gutenberg-ant-design")}
						</p>
						<SelectControl
							value={size}
							options={[
								{
									label: "large",
									value: "large",
								},
								{ label: "middle", value: "middle" },
								{ label: "small", value: "small" },
							]}
							onChange={(val) => {
								setAttributes({ size: val });
							}}
						/>
					</BaseControl>

					<BaseControl label={wp.i18n.__("Type", "gutenberg-ant-design")}>
						<p>{wp.i18n.__("Button type.", "gutenberg-ant-design")}</p>
						<SelectControl
							value={type}
							options={[
								{
									label: "primary",
									value: "primary",
								},
								{ label: "ghost", value: "ghost" },
								{ label: "dashed", value: "dashed" },
								{ label: "link", value: "link" },
								{ label: "text", value: "text" },
								{ label: "default", value: "default" },
							]}
							onChange={(val) => {
								setAttributes({ type: val });
							}}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
