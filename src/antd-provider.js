/**
 * Import andt components, dependencies & configuration
 */
import { ConfigProvider } from "antd";
import antdTheme from "../../../themes/headless/antd-theme.json";

/**
 * Gutenberg component provider
 */
export default function AntDProvider({ children }) {
	return (
		<ConfigProvider theme={{ token: antdTheme }}>{children}</ConfigProvider>
	);
}
