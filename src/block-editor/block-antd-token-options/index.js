/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, ButtonGroup } from "@wordpress/components";

/**
 * Import andt components, dependencies & configuration
 */
import { theme } from "antd";

/**
 * Import component styles
 */
import "./style.scss";

/**
 * Component export
 */
export const BlockAntdTokenOptions = ({ onClick, group, selectedValue }) => {
	/**
	 * Get antd tokens
	 */
	const { useToken } = theme;
	const { token } = useToken();

	console.log(token);

	const groups = {
		size: ["size", "sizeXXS", "sizeSM", "sizeMD", "sizeLG", "sizeXL", "sizeXXL", ]
	};

	return (
		<div className="gutenberg-ant-design-block-antd-token-options">
			<div className="gutenberg-ant-design-block-antd-token-options__buttons">
				<div className="gutenberg-ant-design-block-antd-token-options__label">
					{__("or select a pre-defined Ant Design token:")}
				</div>
				<ButtonGroup>
					{groups[group]?.map((key, index) => {
						return <Button variant={selectedValue == token[key] ? "primary" : "secondary"} key={index} showTooltip={true} label={token[key]} isSmall={true} onClick={() => {
							onClick(key, token[key]);
						}}>{key}</Button>;
					})}
				</ButtonGroup>
			</div>
		</div>
	);
};
