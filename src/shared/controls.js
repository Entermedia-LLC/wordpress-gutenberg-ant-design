/**
 * Import @wordpress dependencies
 */
import { __ } from "@wordpress/i18n";

import {
	PanelBody,
	ToggleControl,
	SelectControl,
	ButtonGroup,
	Button,
	BaseControl,
	TextareaControl,
	ExternalLink,
} from "@wordpress/components";

// Shared controls for components
export const TitleControls = ({
	updateAttributes,
	savedAttributes,
	setAttributes,
}) => {
	return (
		<PanelBody title={__("Settings")} initialOpen={false}>
			<BaseControl label={__("Level")}>
				<br />
				<ButtonGroup>
					<Button
						variant={savedAttributes.api.level === 1 ? "primary" : "secondary"}
						onClick={() => {
							updateAttributes(
								"api",
								"level",
								1,
								savedAttributes,
								setAttributes
							);
						}}
					>
						H1
					</Button>
					<Button
						variant={savedAttributes.api.level === 2 ? "primary" : "secondary"}
						onClick={() => {
							updateAttributes(
								"api",
								"level",
								2,
								savedAttributes,
								setAttributes
							);
						}}
					>
						H2
					</Button>
					<Button
						variant={savedAttributes.api.level === 3 ? "primary" : "secondary"}
						onClick={() => {
							updateAttributes(
								"api",
								"level",
								3,
								savedAttributes,
								setAttributes
							);
						}}
					>
						H3
					</Button>
					<Button
						variant={savedAttributes.api.level === 4 ? "primary" : "secondary"}
						onClick={() => {
							updateAttributes(
								"api",
								"level",
								4,
								savedAttributes,
								setAttributes
							);
						}}
					>
						H4
					</Button>
					<Button
						variant={savedAttributes.api.level === 5 ? "primary" : "secondary"}
						onClick={() => {
							updateAttributes(
								"api",
								"level",
								5,
								savedAttributes,
								setAttributes
							);
						}}
					>
						H5
					</Button>
				</ButtonGroup>
			</BaseControl>

			<div className="wp-inspector-option-grid">
				<SelectControl
					label="Type"
					value={savedAttributes.api.type}
					options={[
						{ label: "Secondary", value: "secondary" },
						{ label: "Success", value: "success" },
						{ label: "Warning", value: "warning" },
						{ label: "Danger", value: "danger" },
					]}
					onChange={(value) =>
						updateAttributes(
							"api",
							"type",
							value,
							savedAttributes,
							setAttributes
						)
					}
					__nextHasNoMarginBottom
				/>
			</div>
			<div className="wp-inspector-option-grid">
				<ToggleControl
					label={__("Code")}
					checked={savedAttributes.api.code}
					onChange={(value) => {
						updateAttributes(
							"api",
							"code",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>

				<ToggleControl
					label={__("Copyable")}
					checked={savedAttributes.api.copyable}
					onChange={(value) => {
						updateAttributes(
							"api",
							"copyable",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>
			</div>

			<div className="wp-inspector-option-grid">
				<ToggleControl
					label={__("Delete")}
					checked={savedAttributes.api.delete}
					onChange={(value) => {
						updateAttributes(
							"api",
							"delete",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>

				<ToggleControl
					label={__("Disabled")}
					checked={savedAttributes.api.disabled}
					onChange={(value) => {
						updateAttributes(
							"api",
							"disabled",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>
			</div>

			<div className="wp-inspector-option-grid">
				<ToggleControl
					label={__("Mark")}
					checked={savedAttributes.api.mark}
					onChange={(value) => {
						updateAttributes(
							"api",
							"mark",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>

				<ToggleControl
					label={__("Italic")}
					checked={savedAttributes.api.italic}
					onChange={(value) => {
						updateAttributes(
							"api",
							"italic",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>
			</div>

			<div className="wp-inspector-option-grid">
				<ToggleControl
					label={__("Underline")}
					checked={savedAttributes.api.underline}
					onChange={(value) => {
						updateAttributes(
							"api",
							"underline",
							value,
							savedAttributes,
							setAttributes
						);
					}}
				/>
			</div>
		</PanelBody>
	);
};

export const TextControls = ({
	updateAttributes,
	savedAttributes,
	setAttributes,
}) => {
	return (
		<>
			<PanelBody title={__("Settings")} initialOpen={false}>
				<div className="wp-inspector-option-grid">
					<SelectControl
						label="Type"
						value={savedAttributes.api.type}
						options={[
							{ label: "Secondary", value: "secondary" },
							{ label: "Success", value: "success" },
							{ label: "Warning", value: "warning" },
							{ label: "Danger", value: "danger" },
						]}
						onChange={(value) =>
							updateAttributes(
								"api",
								"type",
								value,
								savedAttributes,
								setAttributes
							)
						}
						__nextHasNoMarginBottom
					/>
				</div>
				<div className="wp-inspector-option-grid">
					<ToggleControl
						label={__("Code")}
						checked={savedAttributes.api.code}
						onChange={(value) => {
							updateAttributes(
								"api",
								"code",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>

					<ToggleControl
						label={__("Copyable")}
						checked={savedAttributes.api.copyable}
						onChange={(value) => {
							updateAttributes(
								"api",
								"copyable",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>
				</div>

				<div className="wp-inspector-option-grid">
					<ToggleControl
						label={__("Delete")}
						checked={savedAttributes.api.delete}
						onChange={(value) => {
							updateAttributes(
								"api",
								"delete",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>

					<ToggleControl
						label={__("Disabled")}
						checked={savedAttributes.api.disabled}
						onChange={(value) => {
							updateAttributes(
								"api",
								"disabled",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>
				</div>

				<div className="wp-inspector-option-grid">
					<ToggleControl
						label={__("Mark")}
						checked={savedAttributes.api.mark}
						onChange={(value) => {
							updateAttributes(
								"api",
								"mark",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>

					<ToggleControl
						label={__("Italic")}
						checked={savedAttributes.api.italic}
						onChange={(value) => {
							updateAttributes(
								"api",
								"italic",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>
				</div>

				<div className="wp-inspector-option-grid">
					<ToggleControl
						label={__("Underline")}
						checked={savedAttributes.api.underline}
						onChange={(value) => {
							updateAttributes(
								"api",
								"underline",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>

					<ToggleControl
						label={__("Keyboard")}
						checked={savedAttributes.api.keyboard}
						onChange={(value) => {
							updateAttributes(
								"api",
								"keyboard",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>
				</div>

				<div className="wp-inspector-option-grid">
					<ToggleControl
						label={__("Strong")}
						checked={savedAttributes.api.strong}
						onChange={(value) => {
							updateAttributes(
								"api",
								"strong",
								value,
								savedAttributes,
								setAttributes
							);
						}}
					/>
				</div>
			</PanelBody>
		</>
	);
};

export const ImageControls = ({
	updateAttributes,
	savedAttributes,
	setAttributes,
}) => {
	return (
		<PanelBody title={__("Settings")}>
			<ToggleControl
				label={__("Lightbox")}
				help={__("Displays the image in a lightbox when clicked.")}
				checked={savedAttributes.api.preview}
				onChange={(value) => {
					updateAttributes(
						"api",
						"preview",
						value,
						savedAttributes,
						setAttributes
					);
				}}
			/>

			<TextareaControl
				label={__("Alt Text (Alternative Text)")}
				help={
					<>
						<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
							{__("Describe the purpose of the image")}
						</ExternalLink>
						{__("Leave empty if the image is purely decorative.")}
					</>
				}
				value={savedAttributes.api.alt}
				onChange={(value) =>
					updateAttributes("api", "alt", value, savedAttributes, setAttributes)
				}
			/>
		</PanelBody>
	);
};
