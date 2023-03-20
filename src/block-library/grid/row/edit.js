/**
 * Import Component, dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import Row from "./row";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	return (
		<>
			<AntDProvider>
				<Row
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</AntDProvider>
		</>
	);
}
