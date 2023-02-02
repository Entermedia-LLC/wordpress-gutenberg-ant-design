/**
 * Import @wordpress dependencies
 */
import { Button, ButtonGroup } from "@wordpress/components";

/**
 * Import component styles
 */
import "./style.scss";

/**
 * Component export
 */
export const BlockOptionButtonGroup = ({ label, buttons }) => {
	return (
		<div className="gutenberg-ant-design-block-option-button-group">
			<div className="gutenberg-ant-design-block-option-button-group__label">
				{label}
			</div>
			<div className="gutenberg-ant-design-block-option-button-group__buttons">
				<ButtonGroup>
					{buttons?.map((button, index) => {
						return <Button {...button} key={index} />;
					})}
				</ButtonGroup>
			</div>
		</div>
	);
};
