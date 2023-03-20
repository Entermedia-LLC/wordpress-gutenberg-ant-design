/**
 * Import react dependencies
 */
import { useState } from "react";

/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	BlockIcon,
	MediaReplaceFlow,
	MenuItem,
	BlockControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl, TextControl } from "@wordpress/components";
import { image as icon } from "@wordpress/icons";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEntityProp, store as coreStore } from "@wordpress/core-data";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Import andt components, dependencies & configuration
 */
import { Image, theme } from "antd";
import {
	updateAttributes,
	createDefaultAttributes,
	generateStyles,
} from "../../shared";
import { BlockVisibility } from "../../block-editor/block-visibility";
import { BlockStyles } from "../../block-editor/block-styles";
import { BlockScreenSizeButtonGroup } from "../../block-editor/block-screen-size-button-group";

/**
 * Import editor styles
 */
import "./editor.scss";
import { ImageControls } from "../../shared/controls";

// Define the component's default attributes
const defaultAttributes = createDefaultAttributes({
	api: {
		alt: undefined,
		height: undefined,
		placeholder: undefined,
		preview: false,
		src: undefined,
		width: undefined,
	},
	settings: {
		image: undefined,
	},
	options: {
		isLink: false,
		rel: undefined,
		linkTarget: "_blank",
	},
});

const ALLOWED_MEDIA_TYPES = ["image"];

/**
 * Gutenberg Edit component
 */
export default function PostFeaturedImage({
	attributes,
	setAttributes,
	clientId,
	context: { postId, postType: postTypeSlug, queryId },
}) {

	const { useToken } = theme;
	const { token } = useToken();

	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	const isDescendentOfQueryLoop = Number.isFinite(queryId);
	// Entity Prop for featured Image
	const [featuredImage, setFeaturedImage] = useEntityProp(
		"postType",
		postTypeSlug,
		"featured_media",
		postId
	);

	const { media, postType } = useSelect(
		(select) => {
			const { getMedia, getPostType } = select(coreStore);
			return {
				media:
					featuredImage &&
					getMedia(featuredImage, {
						context: "view",
					}),
				postType: postTypeSlug && getPostType(postTypeSlug),
			};
		},
		[featuredImage, postTypeSlug]
	);

	// Media source url
	const mediaUrl = media?.source_url;

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...defaultAttributes, ...attributes };

	// Component states
	const [activeScreenSize, setActiveScreenSize] = useState("xs");

	// Component processing
	const { placeholder } = savedAttributes.api;
	const width = savedAttributes.api.width
		? savedAttributes.api.width
		: savedAttributes.settings.image?.width;
	const height = savedAttributes.api.height
		? savedAttributes.api.height
		: savedAttributes.settings.image?.height;
	const alt = savedAttributes.api.alt
		? savedAttributes.api.alt
		: savedAttributes.settings.image?.alt;
	const src = savedAttributes.settings.image?.url
		? savedAttributes.settings.image?.url
		: mediaUrl;

	// Component helpers
	const onSelectImage = (media) => {
		updateAttributes(
			"settings",
			"image",
			media,
			savedAttributes,
			setAttributes
		);

		if (media?.id) {
			setFeaturedImage(media.id);
		}
	};

	const onMenuSelect = (value) => {
		if (value?.id) {
			setFeaturedImage(value.id);
		}
	};

	const { createErrorNotice } = useDispatch(noticesStore);
	const onUploadError = (message) => {
		createErrorNotice(message, { type: "snackbar" });
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
		placeholder,
		// Prevent preview in editor to allow for editing on click
		preview: false,
		src,
	};

	return (
		<>
			<div {...blockProps}>
				{src && <Image {...antdComponentProps} />}
				<style>
					{generateStyles(savedAttributes, clientId, token, undefined, ".ant-image")}
				</style>
				{/** @TODO: Add an option of reset. Rendering anything inside MediaReplace breaks the block. Needs debugging */}
				{!!src && !isDescendentOfQueryLoop && (
					<BlockControls group="other">
						<MediaReplaceFlow
							mediaId={featuredImage}
							mediaURL={mediaUrl}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							accept="image/*"
							onSelect={onMenuSelect}
							onError={onUploadError}
						></MediaReplaceFlow>
					</BlockControls>
				)}

				{!src && !isDescendentOfQueryLoop && (
					<>
						<MediaPlaceholder
							allowedTypes={["image"]}
							accept="image/*"
							icon={<BlockIcon icon={icon} />}
							onSelect={onSelectImage}
							value={savedAttributes.settings.image}
						/>
					</>
				)}

				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>

					<PanelBody title={__("Options")} initialOpen={false}>
						<BlockScreenSizeButtonGroup
							onChange={(value) => {
								setActiveScreenSize(value);
							}}
							selected={activeScreenSize}
						/>
						<ToggleControl
							label={
								postType?.labels.singular_name
									? sprintf(
											// translators: %s: Name of the post type e.g: "post".
											__("Link to %s"),
											postType.labels.singular_name.toLowerCase()
									  )
									: __("Link to post")
							}
							onChange={(value) => {
								updateAttributes(
									"options",
									"isLink",
									value,
									savedAttributes,
									setAttributes
								);
							}}
							checked={savedAttributes.options.isLink}
						/>
						{savedAttributes.options.isLink && (
							<>
								<ToggleControl
									label={__("Open in new tab")}
									onChange={(value) => {
										updateAttributes(
											"options",
											"linkTarget",
											value ? "_blank" : "_self",
											savedAttributes,
											setAttributes
										);
									}}
									checked={savedAttributes.options.linkTarget === "_blank"}
								/>
								<TextControl
									__nextHasNoMarginBottom
									label={__("Link rel")}
									value={savedAttributes.options.rel}
									onChange={(value) => {
										updateAttributes(
											"options",
											"rel",
											value,
											savedAttributes,
											setAttributes
										);
									}}
								/>
							</>
						)}
					</PanelBody>

					<ImageControls
						updateAttributes={updateAttributes}
						savedAttributes={savedAttributes}
						setAttributes={setAttributes}
					/>
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
			</div>
		</>
	);
}
