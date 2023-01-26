/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from "@wordpress/block-editor";

import {
	PanelBody,
	BaseControl,
	TextControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { Row, ConfigProvider } from "antd";
import { screenSizes } from "../../_config";
import { generateStyles } from "../../shared";
import { BlockStyles, BlockVisibility } from "../../BlockStyles";
import { createDefaultAttributes, updateAttributes } from "../../shared";
import antdTheme from "../../../../../themes/headless/antd-theme.json";

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	api: {
		align: {},
		gutter: [{}, {}],
		wrap: true,
		justify: {},
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
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["gutenberg-ant-design/col"],
		orientation: "horizontal",
	});

	// Create default attributes for each screen size.
	for (const [key] of Object.entries(screenSizes)) {
		defaultAttributes.api.gutter[0][key] =
			key === "xs" || key === "sm" ? 0 : "";
		defaultAttributes.api.gutter[1][key] =
			key === "xs" || key === "sm" ? 0 : "";
		defaultAttributes.api.align[key] =
			key === "xs" || key === "sm" ? "top" : "";
		defaultAttributes.api.justify[key] =
			key === "xs" || key === "sm" ? "start" : "";
	}

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing
	const { align, gutter, wrap, justify } = savedAttributes.api;

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
		align,
		gutter,
		wrap,
		justify,
	};

	// Clean-up the component properties (e.g. "Inherit" or blank values)
	for (const [screenSize, value] of Object.entries(
		antdComponentProps.justify
	)) {
		if (!value) {
			delete antdComponentProps.justify[screenSize];
		}
	}

	for (const [screenSize, value] of Object.entries(antdComponentProps.align)) {
		if (!value) {
			delete antdComponentProps.align[screenSize];
		}
	}

	for (const [screenSize, value] of Object.entries(
		antdComponentProps.gutter[0]
	)) {
		if (!value) {
			delete antdComponentProps.gutter[0][screenSize];
		}
	}

	for (const [screenSize, value] of Object.entries(
		antdComponentProps.gutter[1]
	)) {
		if (!value) {
			delete antdComponentProps.gutter[1][screenSize];
		}
	}

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Row {...innerBlocksProps} {...antdComponentProps} />
				<style>{generateStyles(savedAttributes, clientId)}</style>

				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>

					<PanelBody title={__("Settings")} initialOpen={false}>
						<ToggleControl
							label={__("Auto wrap line")}
							checked={savedAttributes.api.wrap}
							onChange={(newVal) =>
								updateAttributes(
									"api",
									"wrap",
									newVal,
									savedAttributes,
									setAttributes
								)
							}
						/>
						{Object.keys(screenSizes).map((screenSize, index) => {
							const justifyOptions = [
								{ label: __("Start"), value: "start" },
								{ label: __("End"), value: "end" },
								{ label: __("Center"), value: "center" },
								{ label: __("Space Around"), value: "space-around" },
								{ label: __("Space Between"), value: "space-between" },
								{ label: __("Space Evenly"), value: "space-evenly" },
							];

							const alignOptions = [
								{ label: __("Top"), value: "top" },
								{ label: __("Middle"), value: "middle" },
								{ label: __("Bottom"), value: "bottom" },
								{ label: __("Stretch"), value: "stretch" },
							];

							if ("xs" !== screenSize && "sm" !== screenSize) {
								justifyOptions.unshift({ label: __("Inherit"), value: "" });
								alignOptions.unshift({ label: __("Inherit"), value: "" });
							}

							if (savedAttributes.visibility.includes(screenSize)) {
								return (
									<PanelBody
										title={screenSizes[screenSize].title}
										key={index}
										initialOpen={false}
									>
										{savedAttributes.visibility.includes(screenSize) && (
											<>
												<BaseControl label={__("Gutter")}>
													<div className="wp-inspector-option-grid">
														<TextControl
															label={__("Horizontal")}
															onChange={(val) => {
																if (isNaN(val)) {
																	return;
																}
																updateAttributes(
																	"api",
																	"gutter",
																	[
																		{
																			...savedAttributes.api.gutter[0],
																			...{
																				[screenSize]: val ? parseInt(val) : "",
																			},
																		},
																		savedAttributes.api.gutter[1],
																	],
																	savedAttributes,
																	setAttributes
																);
															}}
															value={
																savedAttributes.api.gutter[0] &&
																savedAttributes.api.gutter[0][screenSize]
															}
															placeholder={
																screenSize === "sm" || screenSize === "xs"
																	? 0
																	: "inherited"
															}
														/>

														<TextControl
															label={__("Vertical")}
															onChange={(val) => {
																if (isNaN(val)) {
																	return;
																}
																updateAttributes(
																	"api",
																	"gutter",
																	[
																		savedAttributes.api.gutter[0],
																		{
																			...savedAttributes.api.gutter[1],
																			...{
																				[screenSize]: val ? parseInt(val) : "",
																			},
																		},
																	],
																	savedAttributes,
																	setAttributes
																);
															}}
															value={
																savedAttributes.api.gutter[1] &&
																savedAttributes.api.gutter[1][screenSize]
															}
															placeholder={
																screenSize === "sm" || screenSize === "xs"
																	? 0
																	: "inherited"
															}
														/>
													</div>
												</BaseControl>
												<div className="wp-inspector-option-grid">
													<SelectControl
														label={__("Align")}
														value={savedAttributes.api.align[screenSize]}
														options={alignOptions}
														onChange={(val) => {
															updateAttributes(
																"api",
																"align",
																{
																	...savedAttributes.api.align,
																	...{ [screenSize]: val },
																},
																savedAttributes,
																setAttributes
															);
														}}
													/>

													<SelectControl
														label={__("Justify")}
														value={savedAttributes.api.justify[screenSize]}
														options={justifyOptions}
														onChange={(val) => {
															updateAttributes(
																"api",
																"justify",
																{
																	...savedAttributes.api.justify,
																	...{ [screenSize]: val },
																},
																savedAttributes,
																setAttributes
															);
														}}
													/>
												</div>
											</>
										)}
									</PanelBody>
								);
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
					/>
				</InspectorControls>
			</ConfigProvider>
		</>
	);
}
