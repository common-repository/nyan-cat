<?php
/*
Plugin Name: Nyan Cat!
Description: Get in the zone... the NYAN ZONE!
Author: mitcho (Michael 芳貴 Erlewine)
Version: 0.2
Author URI: http://mitcho.com/
Donate link: http://tinyurl.com/donatetomitcho
*/

function nyan_cat_enqueue( $hook_suffix ) {
	if ( 'post.php' != $hook_suffix && 'post-new.php' != $hook_suffix )
		return;

	wp_enqueue_script( 'nyan-cat-soundmanager', plugins_url( 'soundmanager2/soundmanager2-nodebug-jsmin.js', __FILE__ ), 'jquery', 0.1, true );

	wp_enqueue_script( 'nyan-cat', plugins_url( 'nyan.js', __FILE__ ), array('jquery', 'nyan-cat-soundmanager', 'wp-fullscreen'), 0.21, true );
	wp_localize_script( 'nyan-cat', 'nyan_strings', array(
		'soundmanager' => plugins_url( 'soundmanager2', __FILE__ ),
		'nyan_url' => plugins_url( 'nyan-looped.mp3', __FILE__ ) ) );

	wp_enqueue_style( 'nyan-cat', plugins_url( 'nyan.css', __FILE__ ), array(), 0.6, 'all' );
}
add_action( 'admin_enqueue_scripts', 'nyan_cat_enqueue' );

function nyan_cat_footer_text( $footer_text ) {
	$footer_text .= ' &bull; <a href="http://nyan.cat/">NYAN!</a>';
	return $footer_text;
}
add_action( 'admin_footer_text', 'nyan_cat_footer_text' );

// transparency fix by @JohnPBloch:
function nyan_mce_css( $css ){
	if( ',' != substr( $css, -1 ) )
		$css .= ',';
	return $css . plugins_url( 'nyan-editor.css', __FILE__ );
}
add_filter( 'mce_css', 'nyan_mce_css' );
