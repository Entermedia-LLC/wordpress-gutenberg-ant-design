/**
 * Import component dependencies & configuration
 */
import AntDProvider from "../../../antd-provider";
import Paragraph from "./paragraph";

/**
 * Gutenberg Edit component
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	return (
		<>
			<AntDProvider>
				<Paragraph
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			</AntDProvider>
		</>
	);
}
