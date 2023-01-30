<?php
/**
 * Plugin Name:       Gutenberg - Ant Design
 * Description:       Adds Gutenberg blocks for <a href="https://ant.design/components/overview/" target="_blank">Ant Design</a> components.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Entermedia LLC
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-ant-design
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenberg_ant_design_register_blocks() {
	register_block_type( __DIR__ . '/build/block-library/button' );
	register_block_type( __DIR__ . '/build/block-library/image' );
	register_block_type( __DIR__ . '/build/block-library/grid/row' );
	register_block_type( __DIR__ . '/build/block-library/grid/col' );
	register_block_type( __DIR__ . '/build/block-library/typography/title' );
	register_block_type( __DIR__ . '/build/block-library/typography/text' );
	register_block_type( __DIR__ . '/build/block-library/typography/paragraph' );
}
add_action( 'init', 'gutenberg_ant_design_register_blocks' );

add_filter(
	'block_categories_all',
	function( $categories ) {
		$categories[] = array(
			'slug'  => 'ant-design',
			'title' => __('Ant Design', 'gutenberg-ant-design')
		);

		return $categories;
	}
);

/*add_filter(
	'allowed_block_types_all',
	function( $allowed_blocks, $editor_context ) {
		return array(
			'gutenberg-ant-design/button',
			'gutenberg-ant-design/col',
			'gutenberg-ant-design/row',
			'gutenberg-ant-design/image'
		);
	},
	25,
	2
);*/
