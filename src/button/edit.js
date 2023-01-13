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
} from "@wordpress/components";

/**
 * The Ant Design component dependencies.
 */
import { Button } from "antd";

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

	const { placeholder, text, block, danger, disabled, ghost } = attributes;

	const blockProps = useBlockProps();

	function setButtonText(newText) {
		// Remove anchor tags from button text content.
		setAttributes({ text: newText.replace(/<\/?a[^>]*>/g, "") });
	}

	const richTextRef = useRef();

	const buttonProps = {
		block: block || false,
		danger: danger || false,
		disabled: disabled || false,
		ghost: ghost || false,
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
				/>
			</Button>
			<InspectorControls>
				<PanelBody title={__("API settings")}>
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
				</PanelBody>
			</InspectorControls>
		</>
	);
}
