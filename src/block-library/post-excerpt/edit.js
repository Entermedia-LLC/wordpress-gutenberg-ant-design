/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import { useMemo } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Import andt components, dependencies & configuration
 */
import { Typography, ConfigProvider } from "antd";
import { updateAttributes, generateStyles } from "../../shared";
import { textAttributes } from "../../shared/attributes";
import antdTheme from "../../../../../themes/headless/antd-theme.json";
import { BlockVisibility } from "../../block-editor/block-visibility";
import { BlockStyles } from "../../block-editor/block-styles";
import { TextControls } from "../../shared/controls";
import { useCanEditEntity } from "../utils/hooks";



const { Text } = Typography;

/**
 * Import editor styles
 */
import "./editor.scss";

/**
 * Gutenberg Edit component
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	context: { postId, postType, queryId },
}) {
	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	// Merge the default attributes with the saved ones
	const savedAttributes = { ...textAttributes, ...attributes };

	// Component states
	const isDescendentOfQueryLoop = Number.isFinite(queryId);
	const userCanEdit = useCanEditEntity("postType", postType, postId);
	const isEditable = userCanEdit && !isDescendentOfQueryLoop;
	const [
		rawExcerpt,
		setExcerpt,
		{ rendered: renderedExcerpt, protected: isProtected } = {},
	] = useEntityProp("postType", postType, "excerpt", postId);

	// Component processing
	const {
		code,
		copyable,
		disabled,
		keyboard,
		mark,
		italic,
		strong,
		type,
		underline,
	} = savedAttributes.api;

	/**
	 * Ant Design component props
	 *
	 * These should match the available API properties and their default for the
	 * corresponding Ant Design component. Note: Some props like that accept
	 * functions or more dynamic values like functions of ReactNodes may need to
	 * be omitted or parsed.
	 */
	const antdComponentProps = {
		code,
		copyable,
		disabled,
		keyboard,
		mark,
		italic,
		strong,
		type,
		underline,
		delete: savedAttributes.api.delete,
	};

  /**
	 * When excerpt is editable, strip the html tags from
	 * rendered excerpt. This will be used if the entity's
	 * excerpt has been produced from the content.
	 */
	const strippedRenderedExcerpt = useMemo(() => {
		if (!renderedExcerpt) return "";
		const document = new window.DOMParser().parseFromString(
			renderedExcerpt,
			"text/html"
		);
		return document.body.textContent || document.body.innerText || "";
	}, [renderedExcerpt]);
	if (!postType || !postId) {
		return (
			<div {...blockProps}>
				<p>
					{__(
						"This is the Post Excerpt block, it will display the excerpt from single posts."
					)}
				</p>
				<p>
					{__(
						"If there are any Custom Post Types with support for excerpts, the Post Excerpt block can display the excerpts of those entries as well."
					)}
				</p>
			</div>
		);
	}

	const excerptContent = isEditable ? (
    <Text {...blockProps} {...antdComponentProps}>
		<RichText
			aria-label={__("Post excerpt text")}
			value={
				rawExcerpt ||
				strippedRenderedExcerpt
			}
			onChange={setExcerpt}
		/>
    </Text>
	) : (
		<>
			{strippedRenderedExcerpt || __("No post excerpt found")}
		</>
	);


	if (isProtected && ! userCanEdit) {
		return (
			<div {...blockProps}>
				<Warning>
					{__("There is no excerpt because this is a protected post.")}
				</Warning>
			</div>
		);
	}

	return (
		<>
			<ConfigProvider theme={antdTheme}>
				<Text {...blockProps} {...antdComponentProps}>
				  { excerptContent }
				</Text>
				<style>{generateStyles(savedAttributes, clientId)}</style>

				<InspectorControls>
					<BlockVisibility
						attributes={savedAttributes}
						setAttributes={setAttributes}
					/>
					<TextControls
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
			</ConfigProvider>
		</>
	);
}
