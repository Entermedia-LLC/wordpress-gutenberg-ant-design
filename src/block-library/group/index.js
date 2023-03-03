/**
 * Import @wordpress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { group as icon } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";
import "../../shared.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import { SaveWithInnerBlocks } from "../../shared";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	icon: icon,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: SaveWithInnerBlocks,
});
