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

import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
} from "@wordpress/components";

/**
 * The Ant Design component dependencies.
 */
import { Button, ConfigProvider } from "antd";
import * as Icons from "@ant-design/icons";
import { screenSizes } from "../_config";
import antdTheme from "../../../../themes/headless/antd-theme.json";

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

	// Set defaults
	const defaultAttributes = {
		text: "",
		block: false,
		danger: false,
		disabled: false,
		ghost: false,
		visibility: {},
		href: "",
		htmlType: "button",
		icon: "",
		shape: "default",
		size: "middle",
		target: "",
		type: "default",
		visibility: {},
	};

	// Create default attributes for each screen size.
	for (const [key] of Object.entries(screenSizes)) {
		defaultAttributes.visibility[key] = "visible";
	}

	const mergedAttributes = { ...defaultAttributes, ...attributes };

	// Component helpers
	function setButtonText(newText) {
		// Remove anchor tags from button text content.
		setAttributes({ text: newText.replace(/<\/?a[^>]*>/g, "") });
	}

	const setScreenSizeAttribute = (screenSize, attribute, value) => {
		const newVal = { ...mergedAttributes[attribute] };

		newVal[screenSize] = value;

		setAttributes({
			[attribute]: newVal,
		});
	};

	// Get icon options
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

	const Icon =
		mergedAttributes.icon in Icons ? Icons[mergedAttributes.icon] : false;

	// Block props
	const blockProps = useBlockProps();

	// Component props
	const buttonProps = {
		block: mergedAttributes.block,
		danger: mergedAttributes.danger,
		disabled: mergedAttributes.disabled,
		ghost: mergedAttributes.ghost,
		href: mergedAttributes.href,
		htmlType: mergedAttributes.htmlType,
		icon: Icon ? <Icon /> : undefined,
		shape: mergedAttributes.shape,
		size: mergedAttributes.size,
		type: mergedAttributes.type,
		target: mergedAttributes.target,
		onClick: (e) => {
			e.preventDefault();
		},
	};

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Button {...blockProps} {...buttonProps}>
					<RichText
						aria-label={__("Button text")}
						placeholder={__("Add text…")}
						value={mergedAttributes.text}
						onChange={(value) => setButtonText(value)}
						withoutInteractiveFormatting
						tagName="span"
					/>
				</Button>

				<InspectorControls>
					<PanelBody title={__("Settings")}>
						<ToggleControl
							label={wp.i18n.__("Block", "gutenberg-ant-design")}
							checked={mergedAttributes.block}
							help={wp.i18n.__(
								"Option to fit button width to its parent width.",
								"gutenberg-ant-design"
							)}
							onChange={(val) => {
								setAttributes({ block: val });
							}}
						/>

						<ToggleControl
							label={wp.i18n.__("Danger", "gutenberg-ant-design")}
							help={wp.i18n.__(
								"Set the danger status of button.",
								"gutenberg-ant-design"
							)}
							checked={mergedAttributes.danger}
							onChange={(val) => {
								setAttributes({ danger: val });
							}}
						/>

						<ToggleControl
							label={wp.i18n.__("Disabled", "gutenberg-ant-design")}
							help={wp.i18n.__(
								"Disabled state of button.",
								"gutenberg-ant-design"
							)}
							checked={mergedAttributes.disabled}
							onChange={(val) => {
								setAttributes({ disabled: val });
							}}
						/>

						<ToggleControl
							label={wp.i18n.__("Ghost", "gutenberg-ant-design")}
							help={wp.i18n.__(
								"Make background transparent and invert text and border colors.",
								"gutenberg-ant-design"
							)}
							checked={mergedAttributes.ghost}
							onChange={(val) => {
								setAttributes({ ghost: val });
							}}
						/>

						<div className="wp-inspector-option-grid">
							<TextControl
								label={wp.i18n.__("Href", "gutenberg-ant-design")}
								placeholder="Optional URL"
								onChange={(val) => {
									setAttributes({ href: val });
								}}
								value={mergedAttributes.href}
							/>
							{mergedAttributes?.href?.length > 0 && (
								<TextControl
									label={wp.i18n.__("Target", "gutenberg-ant-design")}
									placeholder="_self"
									onChange={(val) => {
										setAttributes({ target: val });
									}}
									value={mergedAttributes.target}
								/>
							)}
						</div>

						<TextControl
							label={wp.i18n.__("HTML Type", "gutenberg-ant-design")}
							help={wp.i18n.__(
								"Set the original html type.",
								"gutenberg-ant-design"
							)}
							onChange={(val) => {
								setAttributes({ htmlType: val });
							}}
							value={mergedAttributes.htmlType}
						/>

						<div className="wp-inspector-option-grid">
							<SelectControl
								label={wp.i18n.__("Icon", "gutenberg-ant-design")}
								value={mergedAttributes.icon}
								options={iconOptions}
								onChange={(val) => {
									setAttributes({ icon: val });
								}}
							/>

							<SelectControl
								label={wp.i18n.__("Shape", "gutenberg-ant-design")}
								value={mergedAttributes.shape}
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
						</div>

						<div className="wp-inspector-option-grid">
							<SelectControl
								label={wp.i18n.__("Size", "gutenberg-ant-design")}
								value={mergedAttributes.size}
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

							<SelectControl
								label={wp.i18n.__("Type", "gutenberg-ant-design")}
								value={mergedAttributes.type}
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
						</div>
						{Object.keys(screenSizes).map((screenSize) => {
							return (
								<PanelBody
									title={screenSizes[screenSize].title}
									key={`${screenSize}`}
									initialOpen={false}
								>
									<ToggleControl
										label={`Hidden`}
										checked={
											mergedAttributes.visibility[screenSize] === "hidden"
												? true
												: false
										}
										help={`Controls visibility on ${screenSizes[screenSize].name}.`}
										onChange={(val) => {
											setScreenSizeAttribute(
												screenSize,
												"visibility",
												val ? "hidden" : "visible"
											);
										}}
									/>
								</PanelBody>
							);
						})}
					</PanelBody>
				</InspectorControls>
			</ConfigProvider>
		</>
	);
}
