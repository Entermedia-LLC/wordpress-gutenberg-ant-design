/**
 * Import component dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import Item from "./item";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	return (
		<>
			<AntDProvider>
				<Item
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</AntDProvider>
		</>
	);
}
