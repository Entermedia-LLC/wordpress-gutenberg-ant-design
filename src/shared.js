import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { screenSizes } from "./_config";
import { theme } from "antd";

import {
	PanelBody,
	ColorPalette,
	BaseControl,
	Button,
	TextControl,
	ButtonGroup,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";

export const Save = () => {
	return (
		<div {...useBlockProps.save()}>
			(
			{__(
				"Gutenberg Ant Design Block: These blocks are only meant to be consumed from the WP GraphQL Gutenberg plugin."
			)}
			)
		</div>
	);
};

export const SaveWithInnerBlocks = () => {
	return (
		<div {...useBlockProps.save()}>
			<InnerBlocks.Content />
		</div>
	);
};

export const setScreenSizeStyles = (
	setAttributes,
	existingStyles,
	screenSize,
	attribute,
	value
) => {
	const newVal = { ...existingStyles };
	newVal[screenSize][attribute] = value;

	setAttributes({
		styles: newVal,
	});
};

export const BlockStyles = ({
	styles,
	onChange,
	enabledScreenSizes = ["xs", "sm", "md", "lg", "xl", "xxl"],
}) => {
	const defaultStyleOptions = {
		backgroundColor: null,
		backgroundImage: null,
		backgroundRepeat: true,
		backgroundPosition: null,
		backgroundSize: null,
		paddingLeft: null,
		paddingTop: null,
		paddingRight: null,
		paddingBottom: null,
	};
	const defaultStyles = {};
	for (const [key] of Object.entries(screenSizes)) {
		defaultStyles[key] = { ...defaultStyleOptions };
	}

	const mergedStyles = { ...defaultStyles, ...styles };

	const { useToken } = theme;
	const { token } = useToken();

	const colors = [
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
							<BaseControl
								label={wp.i18n.__("Padding", "gutenberg-ant-design")}
							>
								<div className={`wp-inspector-option-grid`}>
									<TextControl
										placeholder="1rem"
										label="Left"
										value={mergedStyles[screenSize]["paddingLeft"]}
										onChange={(value) =>
											onChange(screenSize, "paddingLeft", value)
										}
									/>
									<TextControl
										placeholder="1rem"
										label="Top"
										value={mergedStyles[screenSize]["paddingTop"]}
										onChange={(value) =>
											onChange(screenSize, "paddingTop", value)
										}
									/>
									<TextControl
										placeholder="1rem"
										label="Right"
										value={mergedStyles[screenSize]["paddingRight"]}
										onChange={(value) =>
											onChange(screenSize, "paddingRight", value)
										}
									/>
									<TextControl
										placeholder="1rem"
										label="Bottom"
										value={mergedStyles[screenSize]["paddingBottom"]}
										onChange={(value) =>
											onChange(screenSize, "paddingBottom", value)
										}
									/>
								</div>
							</BaseControl>
							<BaseControl
								label={wp.i18n.__("Background Color", "gutenberg-ant-design")}
							>
								<ColorPalette
									colors={colors}
									value={mergedStyles[screenSize]["backgroundColor"]}
									onChange={(color) =>
										onChange(screenSize, "backgroundColor", color)
									}
								/>
							</BaseControl>
							<BaseControl
								label={wp.i18n.__("Background Image", "gutenberg-ant-design")}
							>
								{mergedStyles[screenSize]?.backgroundImage
									?.originalImageURL && (
									<img
										src={
											mergedStyles[screenSize].backgroundImage.originalImageURL
										}
										alt={mergedStyles[screenSize]?.backgroundImage?.title}
										width={mergedStyles[screenSize]?.backgroundImage?.width}
										height={mergedStyles[screenSize]?.backgroundImage?.height}
									/>
								)}
								<MediaUploadCheck>
									<MediaUpload
										value={mergedStyles[screenSize]?.backgroundImage?.id}
										onSelect={(media) =>
											onChange(screenSize, "backgroundImage", media)
										}
										allowedTypes={["image"]}
										render={({ open }) => (
											<div className="wp-inspector-option-grid">
												<div>
													<Button onClick={open} variant="secondary">
														{mergedStyles[screenSize]?.backgroundImage
															?.originalImageURL
															? "Replace"
															: "Choose"}
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
														Remove Image
													</Button>
												</div>
											</div>
										)}
									/>
								</MediaUploadCheck>
							</BaseControl>

							{mergedStyles[screenSize]?.backgroundImage?.originalImageURL && (
								<>
									<ToggleControl
										label="Repeat Background"
										checked={mergedStyles[screenSize]?.backgroundRepeat}
										onChange={(value) => {
											onChange(screenSize, "backgroundRepeat", value);
										}}
									/>

									<div className="wp-inspector-option-grid">
										<TextControl
											placeholder="e.g. center"
											label="Background Position"
											value={mergedStyles[screenSize]["backgroundPosition"]}
											onChange={(value) =>
												onChange(screenSize, "backgroundPosition", value)
											}
										/>
										<TextControl
											placeholder="e.g. cover"
											label="Background Size"
											value={mergedStyles[screenSize]["backgroundSize"]}
											onChange={(value) =>
												onChange(screenSize, "backgroundSize", value)
											}
										/>
									</div>
								</>
							)}
						</PanelBody>
					);
				}
			})}
		</PanelBody>
	);
};

// @TODO: Can be cleaned up to be more DRY
export const generateStyles = (styles, selector) => {
	if (typeof styles === "undefined") {
		return;
	}

	const { useToken } = theme;
	const { token } = useToken();

	const availableStyles = {
		backgroundColor: "background-color",
		backgroundImage: "background-image",
		backgroundRepeat: "background-repeat",
		backgroundSize: "background-size",
		backgroundPosition: "background-position",
		paddingLeft: "padding-left",
		paddingTop: "padding-top",
		paddingRight: "padding-right",
		paddingBottom: "padding-bottom",
	};

	const definitionOutput = (property, value) => {
		if (property === "background-image") {
			return `background-image: url('${value.originalImageURL}');\n`;
		} else if (property === "background-repeat") {
			return `background-repeat: ${value ? "repeat" : "no-repeat"};\n`;
		} else {
			return `${property}: ${value};\n`;
		}
	};

	let inlineStyles = "";
	for (const [screenSize] of Object.entries(screenSizes)) {
		if (typeof styles[screenSize] !== "undefined") {
			if ("xs" === screenSize) {
				inlineStyles += `${selector} {\n`;
				for (const [style] of Object.entries(availableStyles)) {
					if (typeof styles[screenSize][style] !== "undefined") {
						inlineStyles += definitionOutput(
							availableStyles[style],
							styles[screenSize][style]
						);
					}
				}
				inlineStyles += `}\n\n`;
			} else {
				inlineStyles += `@media (min-width: ${token.screenSM}px) {\n`;
				inlineStyles += `${selector} {\n`;
				for (const [style] of Object.entries(availableStyles)) {
					if (styles[screenSize][style]) {
						if (typeof styles[screenSize][style] !== "undefined") {
							inlineStyles += definitionOutput(
								availableStyles[style],
								styles[screenSize][style]
							);
						}
					}
				}
				inlineStyles += `}\n\n`;
				inlineStyles += `}\n\n`;
			}
		}
	}

	return inlineStyles;
};
