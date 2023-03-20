/**
 * Import andt components, dependencies & configuration
 */
import AntDProvider from "../../antd-provider";
import PostFeaturedImage from "./postFeaturedImage";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	return (
		<>
			<AntDProvider>
				<PostFeaturedImage
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
					context={context}
				/>
			</AntDProvider>
		</>
	);
}
