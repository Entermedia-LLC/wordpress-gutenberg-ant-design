/**
 * Import component dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import Title from "./title";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	return (
		<>
			<AntDProvider>
				<Title
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</AntDProvider>
		</>
	);
}
