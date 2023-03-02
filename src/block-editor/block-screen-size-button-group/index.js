/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { screenSizes } from "../../_config";

/**
 * Component export
 */
export const BlockScreenSizeButtonGroup = ({ onChange, selected }) => {
	return (
		<ToggleGroupControl
			label={__("Screen Size")}
			value={selected}
			isBlock
			onChange={(value) => {
				onChange(value);
			}}
		>
			{Object.keys(screenSizes).map((screenSize) => {
				return (
					<ToggleGroupControlOption
						value={screenSize}
						label={screenSize}
						key={screenSize}
					/>
				);
			})}
		</ToggleGroupControl>
	);
};
