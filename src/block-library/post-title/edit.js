/**
 * Import component dependencies & configuration
 */
import AntDProvider from "../../antd-provider";
import PostTitle from "./postTitle";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	return (
		<AntDProvider>
			<PostTitle
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				context={context}
			/>
		</AntDProvider>
	);
}
