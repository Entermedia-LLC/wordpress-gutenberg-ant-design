/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { Typography, theme } from "antd";
import {
	generateStyles,
	createDefaultAttributes,
	updateAttributes,
} from "../../../shared";
import { BlockVisibility } from "../../../block-editor/block-visibility";
import { BlockStyles } from "../../../block-editor/block-styles";
import { BlockOptionButtonGroup } from "../../../block-editor/block-option-button-group";

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	settings: {
		type: "ul",
	},
});

/**
 * Gutenberg Edit component
 */
export default function List({ attributes, setAttributes, clientId }) {
	const { useToken } = theme;
	const { token } = useToken();

	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["gutenberg-ant-design/list-item"],
		template: [
			["gutenberg-ant-design/list-item"],
			["gutenberg-ant-design/list-item"],
			["gutenberg-ant-design/list-item"],
		],
		orientation: "vertical",
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing
	const Tag = savedAttributes.settings.type;

	// Component helpers

	return (
		<>
			<Typography>
				<Tag {...innerBlocksProps} />
			</Typography>
			<style>{generateStyles(savedAttributes, clientId, token)}</style>
			<InspectorControls>
				<BlockVisibility
					attributes={savedAttributes}
					setAttributes={setAttributes}
				/>

				<PanelBody title={__("Settings")} initialOpen={false}>
					<BlockOptionButtonGroup
						label={__("Type")}
						buttons={[
							{
								text: __("Unordered"),
								variant:
									savedAttributes.settings.type === "ul"
										? "primary"
										: "secondary",
								onClick: () => {
									updateAttributes(
										"settings",
										"type",
										"ul",
										savedAttributes,
										setAttributes
									);
								},
							},
							{
								text: __("Ordered"),
								variant:
									savedAttributes.settings.type === "ol"
										? "primary"
										: "secondary",
								onClick: () => {
									updateAttributes(
										"settings",
										"type",
										"ol",
										savedAttributes,
										setAttributes
									);
								},
							},
						]}
					/>
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
		</>
	);
}
