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
 * The Ant Design component dependencies.
 */
import { Row, ConfigProvider } from "antd";
import { screenSizes } from "../../_config";
import { BlockStyles, setScreenSizeStyles, generateStyles } from "../../shared";
// @TODO: Let's try to use an alias so it's easier to reference.
import antdTheme from "../../../../../themes/headless/antd-theme.json";
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

	// Set defaults
	const defaultAttributes = {
		align: {},
		gutter: [],
		visibility: {},
		wrap: true,
		justify: "start",
		styles: {},
	};

	// Create default attributes for each screen size.
	for (const [key] of Object.entries(screenSizes)) {
		defaultAttributes.gutter.push({ [key]: "" });
		defaultAttributes.gutter.push({ [key]: "" });
		defaultAttributes.visibility[key] = "visible";
		defaultAttributes.align[key] = key === "xs" ? "top" : "";
		defaultAttributes.styles[key] = {};
	}

	const mergedAttributes = { ...defaultAttributes, ...attributes };

	// Component helpers
	const setGutter = (val, screenSize, isHorizontal) => {
		const newVal = [...gutter];
		newVal[isHorizontal ? 0 : 1][screenSize] =
			val.length > 0 ? parseInt(val) : "";

		setAttributes({
			gutter: newVal,
		});
	};

	const setScreenSizeAttribute = (screenSize, attribute, value) => {
		const newVal = { ...mergedAttributes[attribute] };

		newVal[screenSize] = value;

		setAttributes({
			[attribute]: newVal,
		});
	};

	// Block props
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["gutenberg-ant-design/col"],
		orientation: "horizontal",
	});

	// Component props
	const rowProps = {
		align: mergedAttributes.align,
		gutter: mergedAttributes.gutter,
		wrap: mergedAttributes.wrap,
		justify: mergedAttributes.justify,
	};

	// Control enabled screen size style adjustments
	let enabledScreenSizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
	for (const [screenSize] of Object.entries(mergedAttributes.visibility)) {
		if (mergedAttributes.visibility[screenSize] === "hidden") {
			enabledScreenSizes = enabledScreenSizes.filter(
				(size) => size !== screenSize
			);
		}
	}

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Row {...innerBlocksProps} {...rowProps} />
				<style>{generateStyles(mergedAttributes.styles, ".ant-row")}</style>

				<InspectorControls>
					<PanelBody title={__("Settings")}>
						<p>
							See the{" "}
							<a href="https://ant.design/components/grid#row" target="_blank">
								Row API docs
							</a>{" "}
							for more information & examples.
						</p>

						<ToggleControl
							label={wp.i18n.__("Auto wrap line", "gutenberg-ant-design")}
							checked={mergedAttributes.wrap}
							onChange={(newVal) => {
								setAttributes({
									wrap: newVal,
								});
							}}
						/>

						{Object.keys(screenSizes).map((screenSize) => {
							const justifyOptions = [
								{ label: "Start", value: "start" },
								{ label: "End", value: "end" },
								{ label: "Center", value: "center" },
								{ label: "Space Around", value: "space-around" },
								{ label: "Space Between", value: "space-between" },
								{ label: "Space Evenly", value: "space-evenly" },
							];

							if (screenSize !== "xs" && screenSize !== "sm") {
								justifyOptions.unshift({ label: "Inherit", value: "" });
							}

							return (
								<PanelBody
									title={screenSizes[screenSize].title}
									key={`gutter-${screenSize}`}
									initialOpen={false}
								>
									<ToggleControl
										label={`Hidden`}
										checked={
											mergedAttributes.visibility[screenSize] === "hidden"
												? true
												: false
										}
										help={`Controls visibility on ${screenSizes[screenSize].name}.`}
										onChange={(val) => {
											setScreenSizeAttribute(
												screenSize,
												"visibility",
												val ? "hidden" : "visible"
											);
										}}
									/>

									{mergedAttributes.visibility[screenSize] === "visible" && (
										<>
											<BaseControl
												label={wp.i18n.__("Gutter", "gutenberg-ant-design")}
											>
												<div className="wp-inspector-option-grid">
													<TextControl
														label={wp.i18n.__(
															"Horizontal",
															"gutenberg-ant-design"
														)}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															setGutter(val, screenSize, true);
														}}
														value={
															mergedAttributes.gutter[0] &&
															mergedAttributes.gutter[0][screenSize]
														}
														placeholder={
															screenSize === "sm" || screenSize === "xs"
																? 0
																: wp.i18n.__(
																		"inherited",
																		"gutenberg-ant-design"
																  )
														}
													/>

													<TextControl
														label={wp.i18n.__(
															"Vertical",
															"gutenberg-ant-design"
														)}
														onChange={(val) => {
															if (isNaN(val)) {
																return;
															}

															setGutter(val, screenSize, false);
														}}
														value={
															mergedAttributes.gutter[1] &&
															mergedAttributes.gutter[1][screenSize]
														}
														placeholder={
															screenSize === "sm" || screenSize === "xs"
																? 0
																: wp.i18n.__(
																		"inherited",
																		"gutenberg-ant-design"
																  )
														}
													/>
												</div>
											</BaseControl>

											<div className="wp-inspector-option-grid">
												<SelectControl
													label={wp.i18n.__("Align", "gutenberg-ant-design")}
													value={mergedAttributes.align[screenSize]}
													options={[
														{ label: "Top", value: "top" },
														{ label: "Middle", value: "middle" },
														{ label: "Bottom", value: "bottom" },
														{ label: "Stretch", value: "stretch" },
													]}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "align", val);
													}}
												/>

												<SelectControl
													label={wp.i18n.__("Justify", "gutenberg-ant-design")}
													value={mergedAttributes.justify[screenSize]}
													options={justifyOptions}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "justify", val);
													}}
												/>
											</div>
										</>
									)}
								</PanelBody>
							);
						})}
					</PanelBody>
					<BlockStyles
						styles={mergedAttributes.styles}
						onChange={(screenSize, attribute, value) => {
							setScreenSizeStyles(
								setAttributes,
								mergedAttributes.styles,
								screenSize,
								attribute,
								value
							);
						}}
						enabledScreenSizes={enabledScreenSizes}
					/>
				</InspectorControls>
			</ConfigProvider>
		</>
	);
}
