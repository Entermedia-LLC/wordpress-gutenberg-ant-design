<?php
/**
 * Plugin Name:       Headless Gutenberg - Ant Design
 * Description:       Adds support for <a href="https://ant.design/components/overview/" target="_blank">Ant Design</a> components in Gutenberg to consume in a headless website.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Activated Studio
 * Author URI:        https://www.activated.studio
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-ant-design
 *
 * @package           create-block
 */

// Security Note: Blocks direct access to the plugin PHP files.
defined( 'ABSPATH' ) || die();

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
	register_block_type( __DIR__ . '/build/block-library/post-breadcrumb' );
	register_block_type( __DIR__ . '/build/block-library/post-title' );
	register_block_type( __DIR__ . '/build/block-library/post-date' );
	register_block_type( __DIR__ . '/build/block-library/post-excerpt' );
	register_block_type( __DIR__ . '/build/block-library/group' );
	register_block_type( __DIR__ . '/build/block-library/post-featured-image' );
	register_block_type( __DIR__ . '/build/block-library/list/item' );
	register_block_type( __DIR__ . '/build/block-library/list/list' );
	register_block_type( __DIR__ . '/build/block-library/cagle-team-members' );
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

/**
 * Gutenberg editor styles
 */
add_action(
	'admin_enqueue_scripts',
	function() {
		wp_enqueue_style(
				'admin-styles',
				plugin_dir_url( __FILE__ ) . 'assets/css/editor.css'
		);
	}
);
