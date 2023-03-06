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
import { availableInnerBlocks, screenSizes } from "../../../_config";
import {
	generateStyles,
	createDefaultAttributes,
	updateAttributes,
} from "../../../shared";
import { Col } from "antd";
import AntDProvider from "../../../antd-provider";
import { BlockVisibility } from "../../../block-editor/block-visibility";
import {
	BlockStyles,
	availableProperties,
} from "../../../block-editor/block-styles";

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

	// Create default attributes for each screen size.
	for (const [key] of Object.entries(screenSizes)) {
		defaultAttributes.api[key] = {
			flex: "",
			offset: "",
			order: "",
			pull: "",
			push: "",
			span: "",
		};
	}

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing
	const { xs, sm, md, lg, xl, xxl } = savedAttributes.api;

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
		xs,
		sm,
		md,
		lg,
		xl,
		xxl,
	};

	return (
		<>
			<AntDProvider>
				<Col {...innerBlocksProps} {...antdComponentProps} />
				<style>{generateStyles(savedAttributes, clientId)}</style>
				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>

					<PanelBody title={__("Settings")} initialOpen={false}>
						{Object.keys(screenSizes).map((screenSize, index) => {
							if (savedAttributes.visibility.includes(screenSize)) {
								return (
									<PanelBody
										title={screenSizes[screenSize].title}
										key={index}
										initialOpen={false}
									>
										{savedAttributes.visibility.includes(screenSize) && (
											<>
												<div className="wp-inspector-option-grid">
													<TextControl
														label={__("Flex")}
														onChange={(val) => {
															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ flex: val },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["flex"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
													<TextControl
														label={__("Offset")}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ offset: val ? parseInt(val) : "" },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["offset"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
												</div>
												<div className="wp-inspector-option-grid">
													<TextControl
														label={__("Order")}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ order: val ? parseInt(val) : "" },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["order"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
													<TextControl
														label={__("Pull")}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ pull: val ? parseInt(val) : "" },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["pull"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
												</div>
												<div className="wp-inspector-option-grid">
													<TextControl
														label={__("Push")}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ push: val ? parseInt(val) : "" },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["push"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
													<TextControl
														label={__("Span")}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															updateAttributes(
																"api",
																screenSize,
																{
																	...savedAttributes.api[screenSize],
																	...{ span: val ? parseInt(val) : "" },
																},
																savedAttributes,
																setAttributes
															);
														}}
														value={savedAttributes.api[screenSize]["span"]}
														placeholder={screenSize === "xs" ? 0 : "inherited"}
													/>
												</div>
											</>
										)}
									</PanelBody>
								);
							} else {
								return <div key={index}></div>;
							}
						})}
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
						allowedProperties={availableProperties.filter(
							(prop) => prop !== "width"
						)}
					/>
				</InspectorControls>
			</AntDProvider>
		</>
	);
}
