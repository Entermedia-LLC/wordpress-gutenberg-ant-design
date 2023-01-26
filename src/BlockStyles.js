/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

import {
	PanelBody,
	ColorPalette,
	BaseControl,
	Button,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { screenSizes } from "./_config";
import { theme } from "antd";

// Block styles component
export const BlockStyles = ({
	styles,
	onChange,
	enabledScreenSizes = [Object.keys(screenSizes)],
	allowedProperties = ["padding", "backgroundColor", "backgroundImage", "text"],
}) => {
	const { useToken } = theme;
	const { token } = useToken();

	const colorPalette = [
		{ name: "Primary", color: token.colorPrimary },
		{ name: "Error", color: token.colorError },
		{ name: "Info", color: token.colorInfo },
		{ name: "Success", color: token.colorSuccess },
		{ name: "Warning", color: token.colorWarning },
		{ name: "Text", color: token.colorTextBase },
		{ name: "Background", color: token.colorBgBase },
	];

	return (
		<PanelBody title={__("Styles")} initialOpen={false}>
			{Object.keys(screenSizes).map((screenSize) => {
				if (enabledScreenSizes.includes(screenSize)) {
					return (
						<PanelBody
							title={screenSizes[screenSize].title}
							key={`${screenSize}`}
							initialOpen={false}
						>
							{allowedProperties.includes("text") && (
								<BaseControl
									label={wp.i18n.__("Font Color", "gutenberg-ant-design")}
								>
									<ColorPalette
										colors={colorPalette}
										value={styles[screenSize]["color"]}
										onChange={(color) => onChange(screenSize, "color", color)}
									/>
								</BaseControl>
							)}

							{allowedProperties.includes("padding") && (
								<BaseControl label={__("Padding")}>
									<div className={`wp-inspector-option-grid`}>
										{["Left", "Top", "Right", "Bottom"].map((side, index) => {
											return (
												<TextControl
													placeholder="1rem"
													key={index}
													label={side}
													value={styles[screenSize][`padding${side}`]}
													onChange={(value) =>
														onChange(screenSize, `padding${side}`, value)
													}
												/>
											);
										})}
									</div>
								</BaseControl>
							)}
							{allowedProperties.includes("backgroundColor") && (
								<BaseControl
									label={wp.i18n.__("Background Color", "gutenberg-ant-design")}
								>
									<ColorPalette
										colors={colorPalette}
										value={styles[screenSize]["backgroundColor"]}
										onChange={(color) =>
											onChange(screenSize, "backgroundColor", color)
										}
									/>
								</BaseControl>
							)}
							{allowedProperties.includes("backgroundImage") && (
								<>
									<BaseControl
										label={wp.i18n.__(
											"Background Image",
											"gutenberg-ant-design"
										)}
									>
										{styles[screenSize]?.backgroundImage?.originalImageURL && (
											<img
												src={
													styles[screenSize].backgroundImage.originalImageURL
												}
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
																{styles[screenSize]?.backgroundImage
																	?.originalImageURL
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
									{styles[screenSize]?.backgroundImage?.originalImageURL && (
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
													label={__("Background Position")}
													value={styles[screenSize]["backgroundPosition"]}
													onChange={(value) =>
														onChange(screenSize, "backgroundPosition", value)
													}
												/>
												<TextControl
													placeholder="e.g. cover"
													label={__("Background Size")}
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
					);
				}
			})}
		</PanelBody>
	);
};

// Hidden toggle component
export const HiddenToggle = ({
	attributes,
	screenSize,
	setAttributes,
	label,
}) => {
	return (
		<ToggleControl
			label={label || __("Hidden")}
			checked={attributes.visibility.includes(screenSize)}
			onChange={(val) => {
				let newVisibility = [...attributes.visibility];
				if (!val) {
					newVisibility = newVisibility.filter(
						(screen) => screen !== screenSize
					);
				} else if (val && !newVisibility.includes(screenSize)) {
					newVisibility.push(screenSize);
				}

				setAttributes({
					visibility: newVisibility,
				});
			}}
		/>
	);
};

// Visibility controls component
export const BlockVisibility = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__("Visibility")} initialOpen={false}>
			<p>{__("Toggle visibility per screen size below:")}</p>
			{Object.keys(screenSizes).map((screenSize, index) => {
				return (
					<HiddenToggle
						key={index}
						label={screenSizes[screenSize].title}
						attributes={attributes}
						screenSize={screenSize}
						setAttributes={setAttributes}
					/>
				);
			})}
		</PanelBody>
	);
};
