/**
 * Import andt components, dependencies & configuration
 */
import { ConfigProvider } from "antd";
import antdTheme from "../../../themes/wordpress-headless/antd-theme.json";
import { convertJsonToCssVariables } from "./shared";

// convert json style object to css variables.
const cssVars = convertJsonToCssVariables(antdTheme);

/**
 * Gutenberg component provider
 */
export default function AntDProvider({ children }) {
	return (
		<ConfigProvider theme={{ token: { ...antdTheme } }}>
			<style jsx global>{`
				${cssVars}
			`}</style>
			{children}
		</ConfigProvider>
	);
}
