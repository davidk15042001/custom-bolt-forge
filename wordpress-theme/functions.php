<?php
if (!defined('ABSPATH')) exit;

function lulu_base_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', ['height' => 72, 'width' => 240, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    register_nav_menus([
        'primary' => __('Primary Menu', 'lulu-base'),
        'footer' => __('Footer Menu', 'lulu-base'),
    ]);
}
add_action('after_setup_theme', 'lulu_base_setup');

function lulu_base_assets() {
    wp_enqueue_style('lulu-base-style', get_stylesheet_uri(), [], '2.0.0');
    wp_enqueue_script('lulu-base-navigation', get_template_directory_uri() . '/assets/theme.js', [], '2.0.0', true);
}
add_action('wp_enqueue_scripts', 'lulu_base_assets');

function lulu_base_contact_page() {
    return get_page_by_path('contact');
}

function lulu_base_contact_url() {
    $contact = lulu_base_contact_page();
    return $contact ? get_permalink($contact) : home_url('/#contact');
}

function lulu_base_contact_label() {
    $contact = lulu_base_contact_page();
    return $contact ? get_the_title($contact) : __('Contact', 'lulu-base');
}

function lulu_base_menu_fallback() {
    $items = get_pages(['sort_column' => 'menu_order,post_title', 'post_status' => 'publish']);
    if (!$items) {
        echo '<a href="' . esc_url(home_url('/')) . '">' . esc_html(get_bloginfo('name')) . '</a>';
        return;
    }
    foreach ($items as $item) echo '<a href="' . esc_url(get_permalink($item)) . '">' . esc_html($item->post_title) . '</a>';
}

function lulu_base_product_type() {
    register_post_type('product', [
        'labels' => ['name' => __('Products', 'lulu-base'), 'singular_name' => __('Product', 'lulu-base')],
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-products',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'rewrite' => ['slug' => 'products'],
        'show_in_rest' => true,
    ]);
    register_taxonomy('product_category', 'product', [
        'label' => __('Product Categories', 'lulu-base'),
        'hierarchical' => true,
        'rewrite' => ['slug' => 'product-category'],
        'show_in_rest' => true,
    ]);
}
add_action('init', 'lulu_base_product_type');
