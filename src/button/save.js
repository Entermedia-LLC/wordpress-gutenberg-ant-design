/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * The Ant Design component dependencies.
 */
import { Button } from "antd";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save({ attributes }) {
	const { block, danger, disabled, text } = attributes;

	if (!text) {
		return null;
	}

	const buttonProps = {
		block: block || false,
		danger: danger || false,
		disabled: disabled || false,
	};

	return (
		<div {...useBlockProps.save()}>
			<Button {...buttonProps}>
				<RichText.Content value={text} />
			</Button>
		</div>
	);
}
