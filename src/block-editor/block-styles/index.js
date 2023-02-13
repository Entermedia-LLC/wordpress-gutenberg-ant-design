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
	FontSizePicker,
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
	RangeControl,
} from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { theme } from "antd";
import { screenSizes } from "../../_config";

/**
 * Import theme-specific dependencies
 */
import wpTheme from "../../../../../themes/headless/theme.json";

// Import internal block editor component dependencies
import { BlockOptionButtonGroup } from "../block-option-button-group";

// Block styles component
export const BlockStyles = ({
	styles,
	onChange,
	enabledScreenSizes = [Object.keys(screenSizes)],
	allowedProperties = ["padding", "background", "text", "margin"],
}) => {
	const { useToken } = theme;
	const { token } = useToken();

	// Component states
	const [activeScreenSize, setActiveScreenSize] = useState("xs");
	const [activeDimension, setActiveDimension] = useState();
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
			<ToggleGroupControl
				label={__("Screen Size")}
				value={activeScreenSize}
				isBlock
				onChange={(value) => {
					setActiveScreenSize(value);
				}}
			>
				{Object.keys(screenSizes).map((screenSize) => {
					return (
						<ToggleGroupControlOption
							value={screenSize}
							label={screenSize}
							key={screenSize}
						/>
					);
				})}
			</ToggleGroupControl>

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

									<FontSizePicker
										value={styles[screenSize]["fontSize"]}
										fallbackFontSize={16}
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
								</PanelBody>
							)}

							<PanelBody title={__("Container")} initialOpen={false}>
								<ToggleGroupControl
									label={__("Dimensions")}
									value={activeDimension}
									isBlock
									onChange={(value) => {
										setActiveDimension(value);
									}}
								>
									<ToggleGroupControlOption value="width" label={__("Width")} />
									<ToggleGroupControlOption
										value="height"
										label={__("Height")}
									/>
								</ToggleGroupControl>

								{activeDimension === "width" && (
									<>
										<SelectControl
											label={__("Width")}
											options={[
												{
													value: "boxed",
													label: __("Boxed"),
												},
												{
													value: "full-width",
													label: __("Full Width"),
												},
											]}
											value={
												styles[screenSize].containerWidth !== "full-width"
													? "boxed"
													: "full-width"
											}
											onChange={(value) =>
												onChange(
													screenSize,
													"containerWidth",
													// @TODO: Make the default dynamic
													value === "boxed" ? 1600 : "full-width"
												)
											}
											labelPosition="left"
										/>
										{styles[screenSize].containerWidth !== "full-width" && (
											<TextControl
												label={__("Width")}
												value={styles[screenSize].containerWidth}
												onChange={(value) =>
													onChange(screenSize, "containerWidth", value)
												}
											/>
										)}
									</>
								)}

								{activeDimension === "height" && (
									<>
										<SelectControl
											label={__("Height")}
											options={[
												{
													value: "fixed",
													label: __("Fixed"),
												},
												{
													value: "auto",
													label: __("Auto"),
												},
											]}
											value={
												styles[screenSize].containerHeight !== "auto"
													? "fixed"
													: "auto"
											}
											onChange={(value) =>
												onChange(
													screenSize,
													"containerHeight",
													value === "fixed" ? undefined : "auto"
												)
											}
											labelPosition="left"
										/>
										{styles[screenSize].containerHeight !== "auto" && (
											<TextControl
												label={__("Height")}
												value={styles[screenSize].containerHeight}
												onChange={(value) =>
													onChange(screenSize, "containerHeight", value)
												}
											/>
										)}
									</>
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
													<ToggleGroupControl
														label={activePadding}
														value={() =>
															styles[screenSize][`padding${activePadding}`]
														}
														isBlock
														onChange={(value) => {
															if (value && token[value]) {
																onChange(
																	screenSize,
																	`padding${activePadding}`,
																	value
																);
															}
														}}
													>
														<ToggleGroupControlOption
															value="sizeXS"
															label="xs"
														/>
														<ToggleGroupControlOption
															value="sizeSM"
															label="xm"
														/>
														<ToggleGroupControlOption
															value="sizeMD"
															label="md"
														/>
														<ToggleGroupControlOption
															value="sizeLG"
															label="lg"
														/>
														<ToggleGroupControlOption
															value="sizeXL"
															label="xl"
														/>
														<ToggleGroupControlOption
															value="sizeXXL"
															label="xxl"
														/>
													</ToggleGroupControl>

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

											{activeMargin && (
												<>
													<ToggleGroupControl
														label={activeMargin}
														value={() =>
															styles[screenSize][`margin${activeMargin}`]
														}
														isBlock
														onChange={(value) => {
															if (value && token[value]) {
																onChange(
																	screenSize,
																	`margin${activeMargin}`,
																	value
																);
															}
														}}
													>
														<ToggleGroupControlOption
															value="sizeXS"
															label="xs"
														/>
														<ToggleGroupControlOption
															value="sizeSM"
															label="xm"
														/>
														<ToggleGroupControlOption
															value="sizeMD"
															label="md"
														/>
														<ToggleGroupControlOption
															value="sizeLG"
															label="lg"
														/>
														<ToggleGroupControlOption
															value="sizeXL"
															label="xl"
														/>
														<ToggleGroupControlOption
															value="sizeXXL"
															label="xxl"
														/>
													</ToggleGroupControl>

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
