<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_has_seo_plugin() {
    return defined('WPSEO_VERSION')
        || defined('RANK_MATH_VERSION')
        || defined('AIOSEO_VERSION');
}

function lulu_base_meta_description() {
    if (is_singular()) {
        $post_id = get_queried_object_id();
        $source_description = get_post_meta($post_id, '_lulu_base_source_description', true);
        if ($source_description !== '') {
            return wp_strip_all_tags($source_description);
        }
        $excerpt = get_the_excerpt($post_id);
        if ($excerpt !== '') {
            return wp_strip_all_tags($excerpt);
        }
    }

    $company = lulu_base_source_data('company', []);
    return wp_strip_all_tags($company['positioning'] ?? get_bloginfo('description'));
}

function lulu_base_social_image_url() {
    if (is_singular() && has_post_thumbnail(get_queried_object_id())) {
        $image = wp_get_attachment_image_url(get_post_thumbnail_id(get_queried_object_id()), 'full');
        if ($image) {
            return $image;
        }
    }

    $hero = lulu_base_option('hero_image');
    return $hero && wp_http_validate_url($hero) ? $hero : '';
}

function lulu_base_output_social_meta() {
    if (lulu_base_has_seo_plugin()) {
        return;
    }

    $title = wp_get_document_title();
    $description = lulu_base_meta_description();
    $request_uri = isset($_SERVER['REQUEST_URI']) && is_scalar($_SERVER['REQUEST_URI'])
        ? wp_unslash($_SERVER['REQUEST_URI'])
        : '/';
    $url = is_singular() ? get_permalink() : home_url($request_uri);
    $image = lulu_base_social_image_url();
    ?>
    <meta name="description" content="<?php echo esc_attr($description); ?>">
    <meta property="og:type" content="<?php echo esc_attr(is_singular('product') ? 'product' : 'website'); ?>">
    <meta property="og:title" content="<?php echo esc_attr($title); ?>">
    <meta property="og:description" content="<?php echo esc_attr($description); ?>">
    <meta property="og:url" content="<?php echo esc_url($url); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr(get_bloginfo('name')); ?>">
    <meta name="twitter:card" content="<?php echo esc_attr($image ? 'summary_large_image' : 'summary'); ?>">
    <?php if ($image) : ?>
        <meta property="og:image" content="<?php echo esc_url($image); ?>">
        <meta name="twitter:image" content="<?php echo esc_url($image); ?>">
    <?php endif; ?>
    <?php
}
add_action('wp_head', 'lulu_base_output_social_meta', 3);

function lulu_base_output_schema() {
    if (lulu_base_has_seo_plugin()) {
        return;
    }

    $company = lulu_base_source_data('company', []);
    $organization = [
        '@type'       => 'Organization',
        '@id'         => home_url('/#organization'),
        'name'        => $company['name'] ?? get_bloginfo('name'),
        'url'         => home_url('/'),
        'description' => $company['positioning'] ?? get_bloginfo('description'),
        'email'       => lulu_base_option('email'),
        'telephone'   => lulu_base_option('phone'),
        'address'     => [
            '@type'         => 'PostalAddress',
            'streetAddress' => $company['address'] ?? lulu_base_option('address'),
            'addressCountry'=> 'CN',
        ],
    ];

    $logo_id = (int) get_theme_mod('custom_logo');
    if ($logo_id) {
        $logo = wp_get_attachment_image_url($logo_id, 'full');
        if ($logo) {
            $organization['logo'] = $logo;
        }
    }

    $graphs = [$organization];
    if (is_singular('product')) {
        $post_id = get_queried_object_id();
        $product = [
            '@type'       => 'Product',
            '@id'         => get_permalink($post_id) . '#product',
            'name'        => lulu_base_product_title($post_id),
            'description' => wp_strip_all_tags(get_the_excerpt($post_id) ?: get_post_field('post_content', $post_id)),
            'url'         => get_permalink($post_id),
            'brand'       => ['@id' => home_url('/#organization')],
        ];
        $sku = lulu_base_product_meta($post_id, 'sku');
        if ($sku !== '') {
            $product['sku'] = $sku;
        }
        if (has_post_thumbnail($post_id)) {
            $product['image'] = wp_get_attachment_image_url(get_post_thumbnail_id($post_id), 'full');
        }
        $graphs[] = $product;
    }

    echo '<script type="application/ld+json">' . wp_json_encode([
        '@context' => 'https://schema.org',
        '@graph'   => $graphs,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) . '</script>' . "\n";
}
add_action('wp_head', 'lulu_base_output_schema', 4);
