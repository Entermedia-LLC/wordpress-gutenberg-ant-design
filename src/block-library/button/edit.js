/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
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
 * Import andt components, dependencies & configuration
 */
import { Button, ConfigProvider } from "antd";
import * as Icons from "@ant-design/icons";
import {
	updateAttributes,
	createDefaultAttributes,
	generateStyles,
} from "../../shared";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../BlockStyles";

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	api: {
		text: "",
		block: false,
		danger: false,
		disabled: false,
		ghost: false,
		href: "",
		htmlType: "button",
		icon: "",
		shape: "default",
		size: "middle",
		target: "",
		type: "default",
	},
});

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing
	const {
		block,
		danger,
		disabled,
		ghost,
		href,
		htmlType,
		shape,
		size,
		type,
		target,
	} = savedAttributes.api;

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
		savedAttributes.api.icon in Icons ? Icons[savedAttributes.api.icon] : false;

	// Component helpers
	function setButtonText(newText) {
		// Remove anchor tags from button text content.
		updateAttributes(
			"api",
			"text",
			newText.replace(/<\/?a[^>]*>/g, ""),
			savedAttributes,
			setAttributes
		);
	}

	/**
	 * Ant Design component props
	 *
	 * These should match the available API properties and their default for the
	 * corresponding Ant Design component. Note: Some props like that accept
	 * functions or more dynamic values like functions of ReactNodes may need to
	 * be omitted or parsed.
	 */
	const antdComponentProps = {
		block,
		danger,
		disabled,
		ghost,
		href,
		htmlType,
		icon: Icon ? <Icon /> : undefined,
		shape,
		size,
		type,
		target,
		onClick: (e) => {
			e.preventDefault();
		},
	};

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Button {...blockProps} {...antdComponentProps}>
					<RichText
						aria-label={__("Button text")}
						placeholder={__("Add text…")}
						value={savedAttributes.api.text}
						onChange={(value) => setButtonText(value)}
						withoutInteractiveFormatting
						tagName="span"
					/>
				</Button>
				<style>{generateStyles(savedAttributes, clientId)}</style>

				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>

					<PanelBody title={__("Settings")} initialOpen={false}>
						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Block")}
								checked={savedAttributes.api.block}
								onChange={(value) => {
									updateAttributes(
										"api",
										"block",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<ToggleControl
								label={__("Danger")}
								checked={savedAttributes.api.danger}
								onChange={(value) => {
									updateAttributes(
										"api",
										"danger",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Ghost")}
								checked={savedAttributes.api.ghost}
								onChange={(value) => {
									updateAttributes(
										"api",
										"ghost",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<TextControl
								label={__("Href")}
								placeholder={__("Optional URL")}
								onChange={(value) => {
									updateAttributes(
										"api",
										"href",
										value,
										savedAttributes,
										setAttributes
									);
								}}
								value={savedAttributes.api.href}
							/>
							{savedAttributes.api.href?.length > 0 && (
								<TextControl
									label={__("Target")}
									placeholder="_self"
									onChange={(value) => {
										updateAttributes(
											"api",
											"target",
											value,
											savedAttributes,
											setAttributes
										);
									}}
									value={savedAttributes.api.target}
								/>
							)}
						</div>

						<TextControl
							label={__("HTML Type")}
							help={__("Set the original html type.")}
							onChange={(value) => {
								updateAttributes(
									"api",
									"htmlType",
									value,
									savedAttributes,
									setAttributes
								);
							}}
							value={savedAttributes.api.htmlType}
						/>

						<div className="wp-inspector-option-grid">
							<SelectControl
								label={__("Icon")}
								value={savedAttributes.api.icon}
								options={iconOptions}
								onChange={(value) => {
									updateAttributes(
										"api",
										"icon",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<SelectControl
								label={__("Shape")}
								value={savedAttributes.shape}
								options={[
									{
										label: "default",
										value: "default",
									},
									{ label: "circle", value: "circle" },
									{ label: "round", value: "round" },
								]}
								onChange={(value) => {
									updateAttributes(
										"api",
										"shape",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<SelectControl
								label={__("Size")}
								value={savedAttributes.api.size}
								options={[
									{
										label: "large",
										value: "large",
									},
									{ label: "middle", value: "middle" },
									{ label: "small", value: "small" },
								]}
								onChange={(value) => {
									updateAttributes(
										"api",
										"size",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<SelectControl
								label={__("Type")}
								value={savedAttributes.type}
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
								onChange={(value) => {
									updateAttributes(
										"api",
										"type",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>
					</PanelBody>
				</InspectorControls>
			</ConfigProvider>
		</>
	);
}
