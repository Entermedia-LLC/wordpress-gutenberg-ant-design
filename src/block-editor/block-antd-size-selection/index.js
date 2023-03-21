/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { sizes } from "../../_config";

/**
 * Component export
 */
export const BlockAntdSizeSelection = ({
	onChange,
	label = __("Ant Design Size Tokens"),
	value,
}) => {
	return (
		<div className="gutenberg-ant-design-block-antd-size-selection">
			<SelectControl
				label={label}
				value={value}
				options={sizes.map((size) => {
					return {
						label: size.token,
						value: size.size,
					};
				})}
				onChange={(size) => onChange(size)}
			/>
		</div>
	);
};
