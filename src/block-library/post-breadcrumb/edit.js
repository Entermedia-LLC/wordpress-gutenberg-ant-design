/**
 * Import component, dependencies & configuration
 */
import AntDProvider from "../../antd-provider";
import Breadcrumb from "./breadcrumb";

export default function Edit({ attributes, setAttributes, clientId, context }) {
	return (
		<>
			<AntDProvider>
				<Breadcrumb
					attributes={attributes}
					setAttributes={setAttributes}
					clientId={clientId}
					context={context}
				/>
			</AntDProvider>
		</>
	);
}
