/**
 * Import andt components, dependencies & configuration
 */
import AntDProvider from "../../antd-provider";
import PostDate from "./postDate";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	return (
		<>
			<AntDProvider>
				<PostDate
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
					context={context}
				/>
			</AntDProvider>
		</>
	);
}
