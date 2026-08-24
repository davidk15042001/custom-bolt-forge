<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_customize_checkbox($value) {
    return in_array($value, [true, 1, '1', 'on'], true);
}

function lulu_base_customize_url($value) {
    return esc_url_raw($value);
}

function lulu_base_customize_email($value) {
    return sanitize_email($value);
}

function lulu_base_customize_header_style($value) {
    return in_array($value, ['standard', 'compact'], true) ? $value : 'standard';
}

function lulu_base_customize_number($value) {
    return absint($value);
}

function lulu_base_customize_setting($wp_customize, $key, $sanitize = 'sanitize_text_field') {
    $defaults = lulu_base_default_options();
    $wp_customize->add_setting('lulu_base_' . $key, [
        'default'           => array_key_exists($key, $defaults) ? $defaults[$key] : '',
        'sanitize_callback' => $sanitize,
        'transport'         => 'refresh',
    ]);
}

function lulu_base_customize_text($wp_customize, $key, $label, $section, $description = '', $sanitize = 'sanitize_text_field', $type = 'text') {
    lulu_base_customize_setting($wp_customize, $key, $sanitize);
    $wp_customize->add_control('lulu_base_' . $key, [
        'label'       => $label,
        'description' => $description,
        'section'     => $section,
        'type'        => $type,
    ]);
}

function lulu_base_customize_register($wp_customize) {
    $wp_customize->get_section('title_tagline')->title = __('Brand & Identity', 'lulu-base');
    $wp_customize->get_control('blogname')->label = __('Company name', 'lulu-base');
    $wp_customize->get_control('blogdescription')->label = __('Site description', 'lulu-base');

    $wp_customize->add_panel('lulu_base_panel', [
        'title'    => __('Lulu Base Theme Settings', 'lulu-base'),
        'priority' => 30,
    ]);

    $wp_customize->add_section('lulu_base_identity', [
        'title'    => __('Brand details', 'lulu-base'),
        'panel'    => 'lulu_base_panel',
        'priority' => 10,
    ]);
    lulu_base_customize_text($wp_customize, 'brand_mark', __('Brand mark letter', 'lulu-base'), 'lulu_base_identity', __('Shown when no custom logo is set.', 'lulu-base'));
    lulu_base_customize_text($wp_customize, 'company_tagline', __('Header tagline', 'lulu-base'), 'lulu_base_identity');
    lulu_base_customize_text($wp_customize, 'contact_url', __('Primary contact URL', 'lulu-base'), 'lulu_base_identity', __('Leave blank to use the page with the “contact” slug.', 'lulu-base'), 'lulu_base_customize_url', 'url');
    lulu_base_customize_text($wp_customize, 'phone', __('Phone / WhatsApp', 'lulu-base'), 'lulu_base_identity');
    lulu_base_customize_text($wp_customize, 'email', __('Public email', 'lulu-base'), 'lulu_base_identity', '', 'lulu_base_customize_email', 'email');
    lulu_base_customize_text($wp_customize, 'address', __('Business address', 'lulu-base'), 'lulu_base_identity', '', 'sanitize_textarea_field', 'textarea');

    $wp_customize->add_section('lulu_base_homepage', [
        'title' => __('Homepage content', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_setting($wp_customize, 'hero_image', 'lulu_base_customize_url');
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'lulu_base_hero_image', [
        'label'   => __('Hero image', 'lulu-base'),
        'section' => 'lulu_base_homepage',
    ]));
    lulu_base_customize_text($wp_customize, 'hero_eyebrow', __('Hero eyebrow', 'lulu-base'), 'lulu_base_homepage');
    lulu_base_customize_text($wp_customize, 'hero_title', __('Hero headline', 'lulu-base'), 'lulu_base_homepage', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'hero_intro', __('Hero introduction', 'lulu-base'), 'lulu_base_homepage', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'hero_primary_label', __('Primary hero CTA', 'lulu-base'), 'lulu_base_homepage');
    lulu_base_customize_text($wp_customize, 'hero_secondary_label', __('Secondary hero CTA', 'lulu-base'), 'lulu_base_homepage');
    lulu_base_customize_text($wp_customize, 'hero_secondary_url', __('Secondary hero URL', 'lulu-base'), 'lulu_base_homepage', '', 'lulu_base_customize_url', 'url');

    $wp_customize->add_section('lulu_base_announcement', [
        'title' => __('Announcement bar', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_text($wp_customize, 'announcement', __('Announcement text', 'lulu-base'), 'lulu_base_announcement');
    lulu_base_customize_text($wp_customize, 'topbar_enabled', __('Show announcement bar', 'lulu-base'), 'lulu_base_announcement', '', 'lulu_base_customize_checkbox', 'checkbox');

    $wp_customize->add_section('lulu_base_header', [
        'title' => __('Header & navigation', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_text($wp_customize, 'header_style', __('Header density', 'lulu-base'), 'lulu_base_header', '', 'lulu_base_customize_header_style');
    $wp_customize->get_control('lulu_base_header_style')->type = 'select';
    $wp_customize->get_control('lulu_base_header_style')->choices = [
        'standard' => __('Standard', 'lulu-base'),
        'compact'  => __('Compact', 'lulu-base'),
    ];
    lulu_base_customize_text($wp_customize, 'sticky_header', __('Keep header visible while scrolling', 'lulu-base'), 'lulu_base_header', '', 'lulu_base_customize_checkbox', 'checkbox');
    lulu_base_customize_text($wp_customize, 'header_cta_label', __('Header CTA label', 'lulu-base'), 'lulu_base_header');
    lulu_base_customize_text($wp_customize, 'header_cta_url', __('Header CTA URL', 'lulu-base'), 'lulu_base_header', '', 'lulu_base_customize_url', 'url');

    $wp_customize->add_section('lulu_base_design', [
        'title' => __('Design system', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    foreach ([
        'primary_color'  => __('Primary brand color', 'lulu-base'),
        'accent_color'   => __('Accent / action color', 'lulu-base'),
        'graphite_color' => __('Graphite color', 'lulu-base'),
        'ink_color'      => __('Text color', 'lulu-base'),
        'muted_color'    => __('Muted text color', 'lulu-base'),
        'line_color'     => __('Border color', 'lulu-base'),
        'soft_color'     => __('Soft surface color', 'lulu-base'),
    ] as $key => $label) {
        lulu_base_customize_setting($wp_customize, $key, 'sanitize_hex_color');
        $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'lulu_base_' . $key, [
            'label'   => $label,
            'section' => 'lulu_base_design',
        ]));
    }
    lulu_base_customize_text($wp_customize, 'body_font', __('Body font', 'lulu-base'), 'lulu_base_design');
    $wp_customize->get_control('lulu_base_body_font')->type = 'select';
    $wp_customize->get_control('lulu_base_body_font')->choices = [
        'barlow'   => __('Barlow (site default)', 'lulu-base'),
        'system'   => __('System sans-serif', 'lulu-base'),
        'humanist' => __('Humanist sans-serif', 'lulu-base'),
        'serif'    => __('Serif', 'lulu-base'),
    ];
    lulu_base_customize_text($wp_customize, 'display_font', __('Display font', 'lulu-base'), 'lulu_base_design');
    $wp_customize->get_control('lulu_base_display_font')->type = 'select';
    $wp_customize->get_control('lulu_base_display_font')->choices = [
        'barlow-condensed' => __('Barlow Condensed (site default)', 'lulu-base'),
        'system'    => __('System sans-serif', 'lulu-base'),
        'condensed' => __('Condensed industrial', 'lulu-base'),
        'humanist'  => __('Humanist sans-serif', 'lulu-base'),
        'serif'     => __('Serif', 'lulu-base'),
    ];
    lulu_base_customize_text($wp_customize, 'container_width', __('Content width (px)', 'lulu-base'), 'lulu_base_design', __('Recommended range: 960–1600.', 'lulu-base'), 'lulu_base_customize_number', 'number');
    lulu_base_customize_text($wp_customize, 'corner_radius', __('Corner radius (px)', 'lulu-base'), 'lulu_base_design', __('Use 0 for a sharp technical style or a larger value for a softer style.', 'lulu-base'), 'lulu_base_customize_number', 'number');

    $wp_customize->add_section('lulu_base_footer', [
        'title' => __('Footer & contact details', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_text($wp_customize, 'footer_blurb', __('Footer description', 'lulu-base'), 'lulu_base_footer', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'footer_cta_label', __('Footer CTA label', 'lulu-base'), 'lulu_base_footer');
    lulu_base_customize_text($wp_customize, 'footer_cta_url', __('Footer CTA URL', 'lulu-base'), 'lulu_base_footer', '', 'lulu_base_customize_url', 'url');
    lulu_base_customize_text($wp_customize, 'footer_menu_enabled', __('Show footer menu', 'lulu-base'), 'lulu_base_footer', '', 'lulu_base_customize_checkbox', 'checkbox');
    lulu_base_customize_text($wp_customize, 'linkedin_url', __('LinkedIn URL', 'lulu-base'), 'lulu_base_footer', '', 'lulu_base_customize_url', 'url');
    lulu_base_customize_text($wp_customize, 'facebook_url', __('Facebook URL', 'lulu-base'), 'lulu_base_footer', '', 'lulu_base_customize_url', 'url');
    lulu_base_customize_text($wp_customize, 'x_url', __('X URL', 'lulu-base'), 'lulu_base_footer', '', 'lulu_base_customize_url', 'url');

    $wp_customize->add_section('lulu_base_rfq', [
        'title' => __('RFQ & contact forms', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_text($wp_customize, 'rfq_recipient', __('RFQ recipient email', 'lulu-base'), 'lulu_base_rfq', __('Defaults to the WordPress administration email.', 'lulu-base'), 'lulu_base_customize_email', 'email');
    lulu_base_customize_text($wp_customize, 'rfq_subject', __('RFQ email subject', 'lulu-base'), 'lulu_base_rfq', __('Use {company} as a placeholder for the sender’s company.', 'lulu-base'));
    lulu_base_customize_text($wp_customize, 'rfq_success_message', __('Success message', 'lulu-base'), 'lulu_base_rfq', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'rfq_failure_message', __('Failure message', 'lulu-base'), 'lulu_base_rfq', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'rfq_privacy_text', __('Privacy notice', 'lulu-base'), 'lulu_base_rfq', '', 'sanitize_textarea_field', 'textarea');
    lulu_base_customize_text($wp_customize, 'rfq_max_upload_mb', __('Maximum upload size (MB)', 'lulu-base'), 'lulu_base_rfq', __('The server’s lower upload limit still applies.', 'lulu-base'), 'lulu_base_customize_number', 'number');

    $wp_customize->add_section('lulu_base_products', [
        'title' => __('Product catalog', 'lulu-base'),
        'panel' => 'lulu_base_panel',
    ]);
    lulu_base_customize_text($wp_customize, 'product_cta_label', __('Product CTA label', 'lulu-base'), 'lulu_base_products');
    lulu_base_customize_text($wp_customize, 'show_product_meta', __('Show product specification metadata', 'lulu-base'), 'lulu_base_products', '', 'lulu_base_customize_checkbox', 'checkbox');
    lulu_base_customize_text($wp_customize, 'products_per_page', __('Products per archive page', 'lulu-base'), 'lulu_base_products', '', 'lulu_base_customize_number', 'number');
    lulu_base_customize_text($wp_customize, 'show_breadcrumbs', __('Show breadcrumbs', 'lulu-base'), 'lulu_base_products', '', 'lulu_base_customize_checkbox', 'checkbox');
}
add_action('customize_register', 'lulu_base_customize_register');
