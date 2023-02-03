/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	BlockIcon,
	__experimentalImageSizeControl as ImageSizeControl,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ExternalLink,
	TextareaControl,
	ToggleControl,
} from "@wordpress/components";
import { image as icon } from "@wordpress/icons";

/**
 * Import andt components, dependencies & configuration
 */
import { Image, ConfigProvider } from "antd";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import {
	updateAttributes,
	createDefaultAttributes,
	generateStyles,
} from "../../shared";
import { BlockVisibility } from "../../block-editor/block-visibility";
import { BlockStyles } from "../../block-editor/block-styles";

/**
 * Import editor styles
 */
import "./editor.scss";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	api: {
		src: {
			url: undefined,
			id: undefined,
			width: undefined,
			height: undefined,
		},
		alt: undefined,
		preview: false,
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

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states

	// Component processing
	const { url, id } = savedAttributes.api.src;
	const width = savedAttributes.settings?.size?.width
		? savedAttributes.settings.size.width
		: savedAttributes.api.src.width;
	const height = savedAttributes.settings?.size?.height
		? savedAttributes.settings.size.height
		: savedAttributes.api.src.height;
	const { alt } = savedAttributes.api;

	// Component helpers
	const onSelectImage = (media) => {
		if (!media || !media.url) {
			updateAttributes(
				"api",
				"src",
				defaultAttributes.api.src,
				savedAttributes,
				setAttributes
			);
			return;
		}
		updateAttributes("api", "src", media, savedAttributes, setAttributes);
	};

	/**
	 * Ant Design component props
	 *
	 * These should match the available API properties and their default for the
	 * corresponding Ant Design component. Note: Some props like that accept
	 * functions or more dynamic values like functions of ReactNodes may need to
	 * be omitted or parsed.
	 */
	const antdComponentProps = {
		alt,
		fallback: savedAttributes.api?.fallback,
		height,
		placeholder: savedAttributes.api?.placeholder,
		// Prevent preview in editor to allow for editing on click
		preview: false,
		src: url,
		width,
	};
	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<div {...blockProps}>
					{url && <Image {...antdComponentProps} />}
					<style>{generateStyles(savedAttributes, clientId)}</style>
					<MediaPlaceholder
						allowedTypes={["image"]}
						accept="image/*"
						icon={<BlockIcon icon={icon} />}
						onSelect={onSelectImage}
						value={{ id }}
						disableMediaButtons={url}
					/>

					<InspectorControls>
						<BlockVisibility
							attributes={savedAttributes}
							setAttributes={setAttributes}
						/>

						<PanelBody title={__("Settings")}>
							<ToggleControl
								label={__("Lightbox")}
								help={__("Displays the image in a lightbox when clicked.")}
								checked={savedAttributes.api.preview}
								onChange={(value) => {
									updateAttributes(
										"api",
										"preview",
										value,
										savedAttributes,
										setAttributes
									);
								}}
							/>

							<TextareaControl
								label={__("Alt Text (Alternative Text)")}
								help={
									<>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{__("Describe the purpose of the image")}
										</ExternalLink>
										{__("Leave empty if the image is purely decorative.")}
									</>
								}
								value={savedAttributes.api.alt}
								onChange={(value) =>
									updateAttributes(
										"api",
										"alt",
										value,
										savedAttributes,
										setAttributes
									)
								}
							/>

							<ImageSizeControl
								width={width}
								height={height}
								imageWidth={savedAttributes.api.src.width}
								imageHeight={savedAttributes.api.src.height}
								onChange={(value) =>
									updateAttributes(
										"settings",
										"size",
										{ width: value.width, height: value.height },
										savedAttributes,
										setAttributes
									)
								}
							/>
						</PanelBody>
						<BlockStyles
							styles={savedAttributes.styles}
							allowedProperties={[]}
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
				</div>
			</ConfigProvider>
		</>
	);
}
