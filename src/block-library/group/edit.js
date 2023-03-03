/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from "@wordpress/block-editor";

import { PanelBody, TextControl } from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { availableInnerBlocks, screenSizes } from "../../_config";
import {
	generateStyles,
	createDefaultAttributes,
	updateAttributes,
} from "../../shared";
import { Col, ConfigProvider } from "antd";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../block-editor/block-visibility";
import {
	BlockStyles,
	availableProperties,
} from "../../block-editor/block-styles";

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	api: {},
});

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: availableInnerBlocks,
		orientation: "horizontal",
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing

	// Component helpers

	return (
		<>
			<div {...innerBlocksProps} />
			<style>{generateStyles(savedAttributes, clientId)}</style>
			<InspectorControls>
				<BlockVisibility
					attributes={savedAttributes}
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
