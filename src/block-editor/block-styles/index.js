// @TODO: SO... sooo much clean-up can be done here

/**
 * Import React.js dependencies
 */
import { useState } from "react";

/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	MediaUpload,
	MediaUploadCheck,
	BlockIcon,
} from "@wordpress/block-editor";
import {
	Icon,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	PanelBody,
	ColorPalette,
	BaseControl,
	Button,
	TextControl,
	ToggleControl,
	GradientPicker,
	SelectControl,
	TextareaControl,
	FontSizePicker,
} from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { theme } from "antd";
import { screenSizes } from "../../_config";

/**
 * Import theme-specific dependencies
 */
import wpTheme from "../../../../../themes/wordpress-headless/theme.json";

// Import internal block editor component dependencies
import { BlockOptionButtonGroup } from "../block-option-button-group";
import { BlockScreenSizeButtonGroup } from "../block-screen-size-button-group";
import { fontSizes } from "../../_config";
import { BlockAntdSizeSelection } from "../block-antd-size-selection";

// Available properties
export const availableProperties = [
	"padding",
	"background",
	"text",
	"margin",
	"margin-bottom",
	"margin-top",
	"margin-left",
	"margin-right",
	"width",
	"height",
	"max-width",
	"max-height",
	"border-radius",
	"border",
	"font-weight",
];

// Block styles component
export const BlockStyles = ({
	styles,
	onChange,
	enabledScreenSizes = [Object.keys(screenSizes)],
	allowedProperties = availableProperties,
}) => {
	const { useToken } = theme;
	const { token } = useToken();

	// Component states
	const [activeScreenSize, setActiveScreenSize] = useState("xs");
	const [activePadding, setActivePadding] = useState();
	const [activeMargin, setActiveMargin] = useState();
	const [activeSpacing, setActiveSpacing] = useState();

	const colorPalette = [
		{ name: "Primary", color: token.colorPrimary },
		{ name: "Error", color: token.colorError },
		{ name: "Info", color: token.colorInfo },
		{ name: "Success", color: token.colorSuccess },
		{ name: "Warning", color: token.colorWarning },
		{ name: "Text", color: token.colorTextBase },
		{ name: "Background", color: token.colorBgBase },
	];

	const themeFonts = [...wpTheme.settings.typography.fontFamilies];
	const fontFamilyOptions = [
		{ value: "", label: __("Default") },
		...themeFonts.map(({ fontFamily, name }) => {
			return {
				value: fontFamily,
				label: name || fontFamily,
			};
		}),
	];

	return (
		<PanelBody title={__("Styles")} initialOpen={false}>
			<BlockScreenSizeButtonGroup
				onChange={(value) => {
					setActiveScreenSize(value);
				}}
				selected={activeScreenSize}
			/>

			{Object.keys(screenSizes).map((screenSize) => {
				if (
					enabledScreenSizes.includes(screenSize) &&
					activeScreenSize === screenSize
				) {
					return (
						<div key={screenSize}>
							{allowedProperties.includes("background") && (
								<PanelBody title={__("Background")} initialOpen={false}>
									<BlockOptionButtonGroup
										label={__("Background Type")}
										buttons={[
											{
												isSmall: true,
												label: __("Classic"),
												icon: "admin-customizer",
												variant:
													styles[screenSize][`backgroundType`] === "classic"
														? "primary"
														: "secondary",
												showTooltip: true,
												onClick: () => {
													onChange(screenSize, `backgroundType`, "classic");
												},
											},
											{
												isSmall: true,
												label: __("Gradient"),
												icon: <Icon icon="admin-appearance" />,
												variant:
													styles[screenSize][`backgroundType`] === "gradient"
														? "primary"
														: "secondary",
												showTooltip: true,
												onClick: () => {
													onChange(screenSize, `backgroundType`, "gradient");
												},
											},
										]}
									/>

									{styles[screenSize][`backgroundType`] === "gradient" && (
										<>
											<GradientPicker
												__nextHasNoMargin
												value={styles[screenSize]["backgroundGradient"]}
												onChange={(currentGradient) =>
													onChange(
														screenSize,
														"backgroundGradient",
														currentGradient
													)
												}
											/>
										</>
									)}

									{styles[screenSize][`backgroundType`] === "classic" && (
										<>
											<BaseControl
												label={wp.i18n.__("Color", "gutenberg-ant-design")}
											>
												<ColorPalette
													colors={colorPalette}
													value={styles[screenSize]["backgroundColor"]}
													onChange={(color) =>
														onChange(screenSize, "backgroundColor", color)
													}
												/>
											</BaseControl>
											<BaseControl
												label={wp.i18n.__("Image", "gutenberg-ant-design")}
											>
												{styles[screenSize]?.backgroundImage?.url && (
													<img
														src={styles[screenSize].backgroundImage.url}
														alt={styles[screenSize]?.backgroundImage?.title}
														width={styles[screenSize]?.backgroundImage?.width}
														height={styles[screenSize]?.backgroundImage?.height}
													/>
												)}
												<MediaUploadCheck>
													<MediaUpload
														value={styles[screenSize]?.backgroundImage?.id}
														onSelect={(media) =>
															onChange(screenSize, "backgroundImage", media)
														}
														allowedTypes={["image"]}
														render={({ open }) => (
															<div className="wp-inspector-option-grid">
																<div>
																	<Button onClick={open} variant="secondary">
																		{styles[screenSize]?.backgroundImage?.url
																			? __("Replace")
																			: __("Choose")}
																	</Button>
																</div>
																<div>
																	<Button
																		variant="tertiary"
																		onClick={() => {
																			onChange(
																				screenSize,
																				"backgroundImage",
																				undefined
																			);
																		}}
																	>
																		{__("Remove Image")}
																	</Button>
																</div>
															</div>
														)}
													/>
												</MediaUploadCheck>
											</BaseControl>
											{styles[screenSize]?.backgroundImage?.url && (
												<>
													<ToggleControl
														label={__("Repeat Background")}
														checked={styles[screenSize]?.backgroundRepeat}
														onChange={(value) => {
															onChange(screenSize, "backgroundRepeat", value);
														}}
													/>

													<div className="wp-inspector-option-grid">
														<TextControl
															placeholder="e.g. center"
															label={__("Image Position")}
															value={styles[screenSize]["backgroundPosition"]}
															onChange={(value) =>
																onChange(
																	screenSize,
																	"backgroundPosition",
																	value
																)
															}
														/>
														<TextControl
															placeholder="e.g. cover"
															label={__("Image Size")}
															value={styles[screenSize]["backgroundSize"]}
															onChange={(value) =>
																onChange(screenSize, "backgroundSize", value)
															}
														/>
													</div>
												</>
											)}
										</>
									)}
								</PanelBody>
							)}
							{allowedProperties.includes("text") && (
								<PanelBody title={__("Typography")} initialOpen={false}>
									<SelectControl
										label={__("Font Family")}
										options={fontFamilyOptions}
										value={styles[screenSize]["fontFamily"]}
										onChange={(value) =>
											onChange(screenSize, "fontFamily", value)
										}
										labelPosition="top"
									/>

									{allowedProperties.includes("font-weight") && (
										<SelectControl
											label={__("Font Weight")}
											options={[
												{ label: "Default", value: "" },
												{ label: "Thin (100)", value: 100 },
												{ label: "Extra Light (200)", value: 200 },
												{ label: "Light (300)", value: 300 },
												{ label: "Normal (400)", value: 400 },
												{ label: "Medium (500)", value: 500 },
												{ label: "Semi Bold (600)", value: 600 },
												{ label: "Bold (700)", value: 700 },
												{ label: "Extra Bold (800)", value: 800 },
											]}
											value={styles[screenSize]["fontWeight"]}
											onChange={(value) =>
												onChange(screenSize, "fontWeight", value)
											}
											labelPosition="top"
										/>
									)}

									<FontSizePicker
										fontSizes={fontSizes}
										value={styles[screenSize]["fontSize"]}
										fallbackFontSize={token.size}
										onChange={(value) =>
											onChange(screenSize, "fontSize", value)
										}
									/>

									<BaseControl
										label={wp.i18n.__("Font Color", "gutenberg-ant-design")}
									>
										<ColorPalette
											colors={colorPalette}
											value={styles[screenSize].color}
											onChange={(color) => onChange(screenSize, "color", color)}
										/>
									</BaseControl>

									<ToggleGroupControl
										label={__("Text Alignment")}
										value={styles[screenSize].textAlignment}
										isBlock
										onChange={(value) => {
											onChange(screenSize, "textAlignment", value);
										}}
									>
										<ToggleGroupControlOption
											value="left"
											label={<BlockIcon icon="editor-alignleft" />}
										/>
										<ToggleGroupControlOption
											value="right"
											label={<BlockIcon icon="editor-alignright" />}
										/>
										<ToggleGroupControlOption
											value="center"
											label={<BlockIcon icon="editor-aligncenter" />}
										/>
									</ToggleGroupControl>
								</PanelBody>
							)}

							<PanelBody title={__("Container")} initialOpen={false}>
								<div className="wp-inspector-option-grid wp-inspector-option-grid--two-column">
									{allowedProperties.includes("width") && (
										<TextControl
											label={__("Width")}
											value={styles[screenSize].width}
											onChange={(value) => onChange(screenSize, "width", value)}
										/>
									)}

									{allowedProperties.includes("max-width") && (
										<TextControl
											label={__("Max Width")}
											value={styles[screenSize].maxWidth}
											onChange={(value) =>
												onChange(screenSize, "maxWidth", value)
											}
										/>
									)}

									{allowedProperties.includes("height") && (
										<TextControl
											label={__("Height")}
											value={styles[screenSize].height}
											onChange={(value) =>
												onChange(screenSize, "height", value)
											}
										/>
									)}

									{allowedProperties.includes("max-height") && (
										<TextControl
											label={__("Max Height")}
											value={styles[screenSize].maxHeight}
											onChange={(value) =>
												onChange(screenSize, "maxHeight", value)
											}
										/>
									)}
								</div>

								{allowedProperties.includes("border") && (
									<TextControl
										label={__("Border")}
										value={styles[screenSize].border}
										onChange={(value) => onChange(screenSize, "border", value)}
									/>
								)}

								{allowedProperties.includes("border-radius") && (
									<TextControl
										label={__("Border Radius")}
										value={styles[screenSize].borderRadius}
										onChange={(value) =>
											onChange(screenSize, "borderRadius", value)
										}
									/>
								)}

								<ToggleGroupControl
									value={activeSpacing}
									isBlock
									label={__("Spacing")}
									onChange={(value) => setActiveSpacing(value)}
								>
									{allowedProperties.includes("margin") && (
										<ToggleGroupControlOption value="margin" label="Margin" />
									)}
									{allowedProperties.includes("padding") && (
										<ToggleGroupControlOption value="padding" label="Padding" />
									)}
								</ToggleGroupControl>

								{allowedProperties.includes("padding") &&
									activeSpacing === "padding" && (
										<>
											<ToggleGroupControl
												label={__("Side")}
												value={activePadding}
												isBlock
												onChange={(value) => {
													setActivePadding(value);
												}}
												__nextHasNoMargin
											>
												<ToggleGroupControlOption
													value="Left"
													label={<BlockIcon icon="arrow-left-alt" />}
												/>
												<ToggleGroupControlOption
													value="Right"
													label={<BlockIcon icon="arrow-right-alt" />}
												/>
												<ToggleGroupControlOption
													value="Top"
													label={<BlockIcon icon="arrow-up-alt" />}
												/>
												<ToggleGroupControlOption
													value="Bottom"
													label={<BlockIcon icon="arrow-down-alt" />}
												/>
											</ToggleGroupControl>

											{activePadding && (
												<>
													<BlockAntdSizeSelection
														label={`Ant Design Token`}
														value={
															styles[screenSize][`padding${activePadding}`]
														}
														onChange={(value) => {
															if (value) {
																onChange(
																	screenSize,
																	`padding${activePadding}`,
																	value
																);
															}
														}}
													/>

													<TextControl
														label={__("Custom")}
														placeholder="1rem"
														value={
															styles[screenSize][`padding${activePadding}`]
														}
														onChange={(value) => {
															onChange(
																screenSize,
																`padding${activePadding}`,
																value
															);
														}}
														help={__(
															"Accepts a valid CSS length, percentage or Ant Design token (e.g. sizeXS, sizeMD, etc.)."
														)}
													/>
												</>
											)}
										</>
									)}

								{allowedProperties.includes("margin") &&
									activeSpacing === "margin" && (
										<>
											<ToggleGroupControl
												label={__("Side")}
												value={activeMargin}
												isBlock
												onChange={(value) => {
													setActiveMargin(value);
												}}
												__nextHasNoMargin
											>
												{allowedProperties.includes("margin-left") && (
													<ToggleGroupControlOption
														value="Left"
														label={<BlockIcon icon="arrow-left-alt" />}
													/>
												)}
												{allowedProperties.includes("margin-right") && (
													<ToggleGroupControlOption
														value="Right"
														label={<BlockIcon icon="arrow-right-alt" />}
													/>
												)}
												{allowedProperties.includes("margin-top") && (
													<ToggleGroupControlOption
														value="Top"
														label={<BlockIcon icon="arrow-up-alt" />}
													/>
												)}
												{allowedProperties.includes("margin-bottom") && (
													<ToggleGroupControlOption
														value="Bottom"
														label={<BlockIcon icon="arrow-down-alt" />}
													/>
												)}
											</ToggleGroupControl>

											{activeMargin && (
												<>
													<BlockAntdSizeSelection
														label={`Ant Design Token`}
														value={styles[screenSize][`margin${activeMargin}`]}
														onChange={(value) => {
															if (value) {
																onChange(
																	screenSize,
																	`margin${activeMargin}`,
																	value
																);
															}
														}}
													/>

													<TextControl
														label={__("Custom")}
														placeholder="1rem"
														value={styles[screenSize][`margin${activeMargin}`]}
														onChange={(value) => {
															onChange(
																screenSize,
																`margin${activeMargin}`,
																value
															);
														}}
														help={__(
															"Accepts a valid CSS length, percentage or Ant Design token (e.g. sizeXS, sizeMD, etc.)."
														)}
													/>
												</>
											)}
										</>
									)}
							</PanelBody>

							<PanelBody title={__("Custom CSS")} initialOpen={false}>
								<TextareaControl
									label={__("Add your own custom CSS here")}
									help={__(
										"Use 'selector' to target the wrapper element. Examples: selector { color: red; }"
									)}
									value={styles[screenSize].custom}
									onChange={(value) => onChange(screenSize, `custom`, value)}
								/>
							</PanelBody>
						</div>
					);
				}
			})}
		</PanelBody>
	);
};
