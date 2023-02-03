// Import external dependencies
import { merge } from "lodash";

/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * Import andt components, dependencies & configuration
 */
import { screenSizes } from "./_config";
import { theme } from "antd";

// Shared constants
export const availableStyleProperties = {
	backgroundColor: "background-color",
	backgroundImage: "background-image",
	backgroundRepeat: "background-repeat",
	backgroundSize: "background-size",
	backgroundGradient: "background",
	backgroundPosition: "background-position",
	borderLeft: "border-left",
	borderTop: "border-top",
	borderRight: "border-right",
	borderBottom: "border-bottom",
	paddingLeft: "padding-left",
	paddingTop: "padding-top",
	paddingRight: "padding-right",
	paddingBottom: "padding-bottom",
	color: "color",
	fontFamily: "font-family",
	fontSize: "font-size",
	contentWidth: "max-width",
};

/**
 * Creates the standarized default attributes for components
 *
 * @param {Object} defaultAttributes
 */
export const createDefaultAttributes = (defaultAttributes) => {
	const globalDefaults = {
		api: {},
		settings: {},
		visibility: [],
		styles: {},
	};

	for (const [screenSize] of Object.entries(screenSizes)) {
		globalDefaults.styles[screenSize] = Object.keys(
			availableStyleProperties
		).reduce((previous, key) => ((previous[key] = ""), previous), {});
		globalDefaults.visibility.push(screenSize);
	}

	return merge(globalDefaults, defaultAttributes);
};

/**
 * Updates a component attributes using the standarized pre-defined attributes
 * api, settings, styles & visibility.
 *
 * @param {('api'|'settings'|'styles'|'visibility')} attribute The standarized component attribute
 * @param {String} property The attribute property to update
 * @param {(String|Object|Array)} value The value to update the attribute property to
 * @param {Object} savedAttributes The saved attributes
 * @param {Function} save Function to save the attribute (e.g. setAttributes)
 */
export const updateAttributes = (
	attribute,
	property,
	value,
	savedAttributes,
	save
) => {
	const newValue = { ...savedAttributes[attribute] };
	newValue[property] = value;

	save({
		[attribute]: newValue,
	});
};

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

// @TODO: Can be cleaned up to be more DRY
export const generateStyles = (
	attribute,
	clientId,
	specificitySelector = undefined
) => {
	const { styles, visibility } = attribute;
	let selector = `.gutenberg-ant-design--${clientId}`;

	if (specificitySelector) {
		selector = `${specificitySelector}${selector}`;
	}

	if (typeof styles === "undefined") {
		return;
	}

	const { useToken } = theme;
	const { token } = useToken();

	const definitionOutput = (property, value) => {
		if (property === "background-image") {
			return `background-image: url('${value.url}');\n`;
		} else if (property === "background-repeat") {
			return `background-repeat: ${value ? "repeat" : "no-repeat"};\n`;
		} else if (property === "max-width" && value !== "full-width") {
			return `margin-left: auto;\nmargin-right: auto;\nmax-width: ${value}px;\n`;
		} else {
			return `${property}: ${value};\n`;
		}
	};

	let inlineStyles = "";
	for (const [screenSize] of Object.entries(screenSizes)) {
		if (typeof styles[screenSize] !== "undefined") {
			// Handle background types
			const backgroundType = styles[screenSize].backgroundType;
			console.log(backgroundType);
			const filteredStyles = [];
			switch (backgroundType) {
				case "gradient":
					filteredStyles.push("backgroundImage");
					filteredStyles.push("backgroundRepeat");
					filteredStyles.push("backgroundSize");
					filteredStyles.push("backgroundPosition");
					filteredStyles.push("backgroundColor");
					break;
				case "classic":
					filteredStyles.push("backgroundGradient");
					break;
			}

			const filteredAvailableStyles = { ...availableStyleProperties };
			for (const [key] of Object.entries(filteredAvailableStyles)) {
				if (filteredStyles.includes(key)) {
					delete filteredAvailableStyles[key];
				}
			}

			if ("xs" === screenSize) {
				inlineStyles += `${selector} {\n`;
				for (const [style] of Object.entries(filteredAvailableStyles)) {
					if (
						typeof styles[screenSize][style] !== "undefined" &&
						styles[screenSize][style]
					) {
						inlineStyles += definitionOutput(
							filteredAvailableStyles[style],
							styles[screenSize][style]
						);
					}
				}
				if (!visibility.includes(screenSize)) {
					inlineStyles += `opacity: 0.5;\n`;
				}
				inlineStyles += `}\n\n`;
			} else {
				inlineStyles += `@media (min-width: ${
					token[screenSizes[screenSize].antdToken]
				}px) {\n`;
				inlineStyles += `${selector} {\n`;
				for (const [style] of Object.entries(filteredAvailableStyles)) {
					if (styles[screenSize][style]) {
						if (
							typeof styles[screenSize][style] !== "undefined" &&
							styles[screenSize][style]
						) {
							inlineStyles += definitionOutput(
								filteredAvailableStyles[style],
								styles[screenSize][style]
							);
						}
					}
				}

				if (!visibility.includes(screenSize)) {
					inlineStyles += `opacity: 0.5;\n`;
				} else {
					inlineStyles += `opacity: 1;\n`;
				}
				inlineStyles += `}\n\n`;
				inlineStyles += `}\n\n`;
			}

			// Handle custom CSS
			if (styles[screenSize].custom) {
				if ("xs" === screenSize) {
					inlineStyles += `${styles[screenSize].custom.replace(
						"selector",
						selector
					)}`;
				} else {
					inlineStyles += `@media (min-width: ${
						token[screenSizes[screenSize].antdToken]
					}px) {\n`;
					inlineStyles += `${styles[screenSize].custom.replace(
						"selector",
						selector
					)}`;
					inlineStyles += `}\n`;
				}
			}
		}
	}

	return inlineStyles;
};
