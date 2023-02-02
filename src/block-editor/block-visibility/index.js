/**
 * Import andt components, dependencies & configuration
 */
import { screenSizes } from "../../_config";

/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
  ToggleControl
} from "@wordpress/components";

export const BlockVisibility = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__("Visibility")} initialOpen={false}>
			<p>{__("Toggle visibility per screen size below:")}</p>
			{Object.keys(screenSizes).map((screenSize, index) => {
				return (
					<HiddenToggle
						key={index}
						label={screenSizes[screenSize].title}
						attributes={attributes}
						screenSize={screenSize}
						setAttributes={setAttributes}
					/>
				);
			})}
		</PanelBody>
	);
};

export const HiddenToggle = ({
	attributes,
	screenSize,
	setAttributes,
	label,
}) => {
	return (
		<ToggleControl
			label={label || __("Hidden")}
			checked={attributes.visibility.includes(screenSize)}
			onChange={(val) => {
				let newVisibility = [...attributes.visibility];
				if (!val) {
					newVisibility = newVisibility.filter(
						(screen) => screen !== screenSize
					);
				} else if (val && !newVisibility.includes(screenSize)) {
					newVisibility.push(screenSize);
				}

				setAttributes({
					visibility: newVisibility,
				});
			}}
		/>
	);
};
