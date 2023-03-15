/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";

/**
 * Import andt components, dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import { Typography } from "antd";
import { updateAttributes, generateStyles } from "../../../shared";
import { textAttributes } from "../../../shared/attributes";
import { BlockVisibility } from "../../../block-editor/block-visibility";
import { BlockStyles } from "../../../block-editor/block-styles";
import { TextControls } from "../../../shared/controls";

const { Text } = Typography;

/**
 * Import editor styles
 */
import "./editor.scss";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...textAttributes, ...attributes };

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
			<AntDProvider>
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
					<TextControls
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
			</AntDProvider>
		</>
	);
}
