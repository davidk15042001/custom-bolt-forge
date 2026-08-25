<?php
/**
 * Xiangjinxin Industrial theme bootstrap.
 *
 * The theme deliberately keeps a classic-template surface for compatibility
 * with structured WordPress pages while exposing modern customization and
 * block-pattern primitives.
 */
if (!defined('ABSPATH')) {
    exit;
}

define('LULU_BASE_VERSION', '4.0.1');
define('LULU_BASE_SOURCE_CONTENT_VERSION', '2026-08-25.1');
define('LULU_BASE_DIR', get_template_directory());
define('LULU_BASE_URI', get_template_directory_uri());

require_once LULU_BASE_DIR . '/inc/template-functions.php';
require_once LULU_BASE_DIR . '/inc/customizer.php';
require_once LULU_BASE_DIR . '/inc/content.php';
require_once LULU_BASE_DIR . '/inc/rfq.php';
require_once LULU_BASE_DIR . '/inc/patterns.php';
require_once LULU_BASE_DIR . '/inc/demo-content.php';
require_once LULU_BASE_DIR . '/inc/seo.php';

function lulu_base_setup() {
    load_theme_textdomain('lulu-base', LULU_BASE_DIR . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height'      => 72,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support('custom-background', ['default-color' => 'ffffff']);
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);

    add_editor_style('style.css');

    register_nav_menus([
        'primary' => __('Primary Menu', 'lulu-base'),
        'footer'  => __('Footer Menu', 'lulu-base'),
    ]);
}
add_action('after_setup_theme', 'lulu_base_setup');

function lulu_base_assets() {
    wp_enqueue_style('lulu-base-style', get_stylesheet_uri(), [], LULU_BASE_VERSION);
    wp_add_inline_style('lulu-base-style', lulu_base_design_tokens_css());

    wp_enqueue_script(
        'lulu-base-navigation',
        LULU_BASE_URI . '/assets/theme.js',
        [],
        LULU_BASE_VERSION,
        true
    );
    wp_localize_script('lulu-base-navigation', 'luluBaseSettings', [
        'closeMenu'           => __('Close menu', 'lulu-base'),
        'themeVersion'        => LULU_BASE_VERSION,
        'sourceContentVersion' => function_exists('lulu_base_source_content_version')
            ? lulu_base_source_content_version()
            : LULU_BASE_SOURCE_CONTENT_VERSION,
    ]);
}
add_action('wp_enqueue_scripts', 'lulu_base_assets');

function lulu_base_source_version_meta() {
    $version = function_exists('lulu_base_source_content_version')
        ? lulu_base_source_content_version()
        : LULU_BASE_SOURCE_CONTENT_VERSION;
    printf(
        "<meta name=\"lulu-source-content-version\" content=\"%s\">\n",
        esc_attr($version)
    );
}
add_action('wp_head', 'lulu_base_source_version_meta', 1);

function lulu_base_editor_assets() {
    wp_enqueue_style('lulu-base-editor', get_stylesheet_uri(), [], LULU_BASE_VERSION);
    wp_add_inline_style('lulu-base-editor', lulu_base_design_tokens_css());
}
add_action('enqueue_block_editor_assets', 'lulu_base_editor_assets');

function lulu_base_activate_theme() {
    if (function_exists('lulu_base_product_type')) {
        lulu_base_product_type();
    }
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'lulu_base_activate_theme');

function lulu_base_html_classes($classes) {
    $classes[] = 'lulu-base-theme';
    $classes[] = 'header-' . sanitize_html_class(lulu_base_option('header_style'));

    if (lulu_base_option('sticky_header')) {
        $classes[] = 'has-sticky-header';
    }

    return $classes;
}
add_filter('body_class', 'lulu_base_html_classes');
