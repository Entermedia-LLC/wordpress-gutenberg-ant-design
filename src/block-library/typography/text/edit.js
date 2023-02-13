/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";

import { PanelBody, ToggleControl, SelectControl } from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { Typography, ConfigProvider } from "antd";
import {
	updateAttributes,
	createDefaultAttributes,
	generateStyles,
} from "../../../shared";
import antdTheme from "../../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../../block-editor/block-visibility";
import { BlockStyles } from "../../../block-editor/block-styles";

const { Text } = Typography;

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
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
		code,
		copyable,
		disabled,
		keyboard,
		mark,
		italic,
		strong,
		type,
		underline,
	} = savedAttributes.api;

	// Component helpers

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
		disabled,
		keyboard,
		mark,
		italic,
		strong,
		type,
		underline,
		delete: savedAttributes.api.delete,
	};

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Text {...blockProps} {...antdComponentProps}>
					<RichText
						aria-label={__("Text")}
						placeholder={__("Add text…")}
						value={savedAttributes.api.text}
						onChange={(value) =>
							updateAttributes(
								"api",
								"text",
								value,
								savedAttributes,
								setAttributes
							)
						}
						withoutInteractiveFormatting
						tagName="span"
						allowedFormats={["core/bold", "core/italic"]}
					/>
				</Text>
				<style>{generateStyles(savedAttributes, clientId)}</style>

				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>

					<PanelBody title={__("Settings")} initialOpen={false}>
						<div className="wp-inspector-option-grid">
							<SelectControl
								label="Type"
								value={savedAttributes.api.type}
								options={[
									{ label: "Secondary", value: "secondary" },
									{ label: "Success", value: "success" },
									{ label: "Warning", value: "warning" },
									{ label: "Danger", value: "danger" },
								]}
								onChange={(value) =>
									updateAttributes(
										"api",
										"type",
										value,
										savedAttributes,
										setAttributes
									)
								}
								__nextHasNoMarginBottom
							/>
						</div>
						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Code")}
								checked={savedAttributes.api.code}
								onChange={(value) => {
									updateAttributes(
										"api",
										"code",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<ToggleControl
								label={__("Copyable")}
								checked={savedAttributes.api.copyable}
								onChange={(value) => {
									updateAttributes(
										"api",
										"copyable",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Delete")}
								checked={savedAttributes.api.delete}
								onChange={(value) => {
									updateAttributes(
										"api",
										"delete",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<ToggleControl
								label={__("Disabled")}
								checked={savedAttributes.api.disabled}
								onChange={(value) => {
									updateAttributes(
										"api",
										"disabled",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Mark")}
								checked={savedAttributes.api.mark}
								onChange={(value) => {
									updateAttributes(
										"api",
										"mark",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<ToggleControl
								label={__("Italic")}
								checked={savedAttributes.api.italic}
								onChange={(value) => {
									updateAttributes(
										"api",
										"italic",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Underline")}
								checked={savedAttributes.api.underline}
								onChange={(value) => {
									updateAttributes(
										"api",
										"underline",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<ToggleControl
								label={__("Keyboard")}
								checked={savedAttributes.api.keyboard}
								onChange={(value) => {
									updateAttributes(
										"api",
										"keyboard",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>

						<div className="wp-inspector-option-grid">
							<ToggleControl
								label={__("Strong")}
								checked={savedAttributes.api.strong}
								onChange={(value) => {
									updateAttributes(
										"api",
										"strong",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>
						</div>
					</PanelBody>
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
		</>
	);
}
