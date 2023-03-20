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
import { Typography, theme } from "antd";
import { updateAttributes, generateStyles } from "../../../shared";
import { TitleControls } from "../../../shared/controls";
import { titleAttributes } from "../../../shared/attributes";
import { BlockVisibility } from "../../../block-editor/block-visibility";
import { BlockStyles } from "../../../block-editor/block-styles";

/**
 * Import editor styles
 */
import "./editor.scss";

/**
 * Gutenberg Edit component
 */
export default function Title({ attributes, setAttributes, clientId }) {
	const { useToken } = theme;
	const { token } = useToken();

	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...titleAttributes, ...attributes };

	// Component states

	// Component processing
	const { code, copyable, disabled, mark, level, italic, type, underline } =
		savedAttributes.api;

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
		delete: savedAttributes.api.delete,
		disabled,
		mark,
		level,
		italic,
		type,
		underline,
	};

	return (
		<>
			<Typography.Title {...blockProps} {...antdComponentProps}>
				<RichText
					aria-label={__("Heading text")}
					placeholder={__("Heading")}
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
				/>
			</Typography.Title>
			<style>
				{generateStyles(
					savedAttributes,
					clientId,
					token,
					`h${savedAttributes.api.level}.ant-typography`
				)}
			</style>

			<InspectorControls>
				<BlockVisibility
					attributes={savedAttributes}
					setAttributes={setAttributes}
				/>
				<TitleControls
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
		</>
	);
}
