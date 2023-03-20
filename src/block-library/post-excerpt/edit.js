/**
 * Import andt components, dependencies & configuration
 */
import AntDProvider from "../../antd-provider";
import PostExcerpt from "./postExcerpt";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	return (
		<>
			<AntDProvider>
				<PostExcerpt
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
					context={context}
				/>
			</AntDProvider>
		</>
	);
}
