import { useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes, clientId }) {
	// Used by the Gutenberg editor to save & output blocks properly
	const blockProps = useBlockProps({
		className: `gutenberg-ant-design--${clientId}`,
	});

	return (
		<div {...blockProps}>
			This block is a placeholder used to fetch data on front-end and cannot be
			displayed on cagle side
		</div>
	);
}
