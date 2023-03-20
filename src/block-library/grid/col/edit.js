/**
 * Import component dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import Col from "./col";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	return (
		<>
			<AntDProvider>
				<Col
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</AntDProvider>
		</>
	);
}
