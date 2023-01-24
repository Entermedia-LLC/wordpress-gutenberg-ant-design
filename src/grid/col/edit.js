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
} from "@wordpress/components";

/**
 * The Ant Design component dependencies.
 */
import { availableInnerBlocks, screenSizes } from "../../_config";
import { BlockStyles, setScreenSizeStyles, generateStyles } from "../../shared";
import { Col, ConfigProvider } from "antd";
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
		flex: "",
		offset: "",
		order: "",
		pull: "",
		push: "",
		span: "",
		visibility: "visible",
		styles: {},
	};

	const defaultSceenSizeAttributes = {};

	// Create default attributes for each screen size.
	for (const [screenSize] of Object.entries(screenSizes)) {
		defaultSceenSizeAttributes[screenSize] = defaultAttributes;
		defaultAttributes.styles[screenSize] = {};
	}

	const mergedAttributes = {
		...defaultSceenSizeAttributes,
		...defaultAttributes,
		...attributes,
	};

	// Component helpers
	const setScreenSizeAttribute = (screenSize, attribute, value) => {
		if (attribute === "span" && isNaN(value)) {
			return;
		}

		const newVal = { ...mergedAttributes[screenSize] };

		newVal[attribute] = value;

		setAttributes({
			[screenSize]: newVal,
		});
	};

	// Block props
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: availableInnerBlocks,
		orientation: "horizontal",
	});

	// Component props
	const colProps = {
		xs: mergedAttributes.xs,
		sm: mergedAttributes.sm,
		md: mergedAttributes.md,
		lg: mergedAttributes.lg,
		xl: mergedAttributes.xl,
		xxl: mergedAttributes.xxl,
	};

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Col {...innerBlocksProps} {...colProps} />
				<style>{generateStyles(mergedAttributes.styles, ".ant-col")}</style>
				<InspectorControls>
					<PanelBody title={__("Settings")}>
						<p>
							See the{" "}
							<a href="https://ant.design/components/grid#col" target="_blank">
								Col API docs
							</a>{" "}
							for more information & examples.
						</p>

						<BaseControl
							label={wp.i18n.__("Column Settings", "gutenberg-ant-design")}
						>
							{Object.keys(screenSizes).map((screenSize) => (
								<PanelBody
									title={screenSizes[screenSize].title}
									key={`row-${screenSize}`}
									initialOpen={screenSize === "xs" ? true : false}
								>
									<ToggleControl
										label={`Hidden`}
										checked={
											mergedAttributes[screenSize]["visibility"] === "hidden"
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

									{mergedAttributes[screenSize]["visibility"] === "visible" && (
										<>
											<div className="wp-inspector-option-grid">
												<TextControl
													label={wp.i18n.__("Flex", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "flex", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["flex"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
												<TextControl
													label={wp.i18n.__("Offset", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "offset", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["offset"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
											</div>
											<div className="wp-inspector-option-grid">
												<TextControl
													label={wp.i18n.__("Order", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "order", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["order"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
												<TextControl
													label={wp.i18n.__("Pull", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "pull", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["pull"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
											</div>
											<div className="wp-inspector-option-grid">
												<TextControl
													label={wp.i18n.__("Push", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "push", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["push"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
												<TextControl
													label={wp.i18n.__("Span", "gutenberg-ant-design")}
													onChange={(val) => {
														setScreenSizeAttribute(screenSize, "span", val);
													}}
													value={
														mergedAttributes[screenSize] &&
														mergedAttributes[screenSize]["span"]
													}
													placeholder={
														screenSize === "xs"
															? 0
															: wp.i18n.__("inherited", "gutenberg-ant-design")
													}
												/>
											</div>
										</>
									)}
								</PanelBody>
							))}
						</BaseControl>
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
					/>
				</InspectorControls>
			</ConfigProvider>
		</>
	);
}
