<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Central defaults keep the theme useful immediately after activation while
 * allowing every brand-facing value to be changed from the Customizer.
 */
function lulu_base_default_options() {
    static $defaults;

    if (isset($defaults)) {
        return $defaults;
    }

    $defaults = [
        'brand_mark'             => 'X',
        'company_tagline'        => __('Industrial Fasteners', 'lulu-base'),
        'announcement'           => __('Wholesale supply · OEM · Custom manufacturing · Drawing-based parts', 'lulu-base'),
        'announcement_enabled'   => true,
        'topbar_enabled'         => true,
        'header_style'            => 'standard',
        'sticky_header'           => true,
        'header_cta_label'        => __('Request a quote', 'lulu-base'),
        'header_cta_url'          => '',
        'contact_url'             => '',
        'hero_image'              => '',
        'hero_eyebrow'            => __('Industrial supply, engineered for your application', 'lulu-base'),
        'hero_title'              => __('From standard fasteners to large custom bolts', 'lulu-base'),
        'hero_intro'              => __('Source dependable industrial fasteners, high-strength products and drawing-based components from one B2B supply partner.', 'lulu-base'),
        'hero_primary_label'      => __('Submit an RFQ', 'lulu-base'),
        'hero_secondary_label'    => __('Explore products', 'lulu-base'),
        'hero_secondary_url'      => '',
        'footer_blurb'            => __('A dependable sourcing partner for standard, high-strength and custom fasteners.', 'lulu-base'),
        'footer_cta_label'        => __('Start an enquiry', 'lulu-base'),
        'footer_cta_url'          => '',
        'phone'                   => '',
        'email'                   => '',
        'address'                 => '',
        'linkedin_url'            => '',
        'facebook_url'            => '',
        'x_url'                   => '',
        'primary_color'           => '#1a3a68',
        'accent_color'            => '#f26904',
        'graphite_color'          => '#181f27',
        'ink_color'               => '#121921',
        'muted_color'             => '#5e646c',
        'line_color'              => '#dbdee2',
        'soft_color'              => '#eef0f3',
        'body_font'               => 'barlow',
        'display_font'            => 'barlow-condensed',
        'container_width'          => 1280,
        'corner_radius'            => 3,
        'show_breadcrumbs'         => true,
        'footer_menu_enabled'      => true,
        'rfq_recipient'            => '',
        'rfq_subject'              => __('New RFQ from {company}', 'lulu-base'),
        'rfq_success_message'      => __('Thanks — your request has been sent. Our team will reply shortly.', 'lulu-base'),
        'rfq_failure_message'      => __('We could not send your request. Please try again or contact us directly.', 'lulu-base'),
        'rfq_privacy_text'         => __('Your details are used only to review this enquiry and prepare a response.', 'lulu-base'),
        'rfq_max_upload_mb'        => 10,
        'product_cta_label'        => __('Request a quote', 'lulu-base'),
        'show_product_meta'        => true,
        'products_per_page'        => 12,
    ];

    return $defaults;
}

function lulu_base_option($key, $fallback = null) {
    $defaults = lulu_base_default_options();
    $default = array_key_exists($key, $defaults) ? $defaults[$key] : $fallback;
    $value = get_theme_mod($key, $default);

    if ($key === 'rfq_recipient' && !$value) {
        $value = get_option('admin_email');
    }

    return apply_filters('lulu_base_option', $value, $key, $default);
}

function lulu_base_current_language() {
    $requested = isset($_GET['lang']) && is_scalar($_GET['lang']) ? sanitize_key(wp_unslash($_GET['lang'])) : '';
    if (in_array($requested, ['en', 'zh'], true)) {
        return $requested;
    }

    $cookie = isset($_COOKIE['lulu_base_lang']) && is_scalar($_COOKIE['lulu_base_lang'])
        ? sanitize_key(wp_unslash($_COOKIE['lulu_base_lang']))
        : '';
    return in_array($cookie, ['en', 'zh'], true) ? $cookie : 'en';
}

function lulu_base_is_chinese() {
    return lulu_base_current_language() === 'zh';
}

function lulu_base_language_attributes($output) {
    if (lulu_base_is_chinese()) {
        return preg_replace('/lang="[^"]+"/', 'lang="zh-CN"', $output);
    }
    return $output;
}
add_filter('language_attributes', 'lulu_base_language_attributes');

function lulu_base_language_cookie() {
    $requested = isset($_GET['lang']) && is_scalar($_GET['lang']) ? sanitize_key(wp_unslash($_GET['lang'])) : '';
    if (!in_array($requested, ['en', 'zh'], true) || headers_sent()) {
        return;
    }
    setcookie('lulu_base_lang', $requested, time() + YEAR_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true);
}
add_action('init', 'lulu_base_language_cookie');

function lulu_base_language_url($language) {
    $language = in_array($language, ['en', 'zh'], true) ? $language : 'en';
    $request_uri = isset($_SERVER['REQUEST_URI']) && is_scalar($_SERVER['REQUEST_URI'])
        ? wp_unslash($_SERVER['REQUEST_URI'])
        : '/';
    $path = wp_parse_url($request_uri, PHP_URL_PATH) ?: '/';
    return add_query_arg('lang', $language, home_url($path));
}

function lulu_base_source_translate($english) {
    if (!lulu_base_is_chinese()) {
        return $english;
    }
    $translations = get_option('lulu_base_source_translations', []);
    return is_array($translations) && !empty($translations[$english]) ? $translations[$english] : $english;
}

function lulu_base_localized_page_title($post_id, $fallback = '') {
    if (lulu_base_is_chinese()) {
        $title = get_post_meta($post_id, '_lulu_base_source_title_zh', true);
        if ($title !== '') {
            return $title;
        }
    }
    return $fallback !== '' ? $fallback : get_the_title($post_id);
}

function lulu_base_localized_page_content($post_id) {
    if (!lulu_base_is_chinese()) {
        return '';
    }
    $content = get_post_meta($post_id, '_lulu_base_source_content_zh', true);
    return $content !== '' ? apply_filters('the_content', $content) : '';
}

function lulu_base_clean_color($value, $fallback) {
    $color = sanitize_hex_color((string) $value);
    return $color ? $color : $fallback;
}

function lulu_base_font_stack($font) {
    $stacks = [
        'system'    => '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        'humanist'  => '"Barlow", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        'barlow'    => '"Barlow", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        'serif'     => 'Georgia, "Times New Roman", serif',
        'condensed' => '"Barlow Condensed", "Barlow", sans-serif',
        'barlow-condensed' => '"Barlow Condensed", "Barlow", sans-serif',
        'mono'      => '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    ];

    return isset($stacks[$font]) ? $stacks[$font] : $stacks['system'];
}

function lulu_base_design_tokens_css() {
    $defaults = lulu_base_default_options();
    $primary = lulu_base_clean_color(lulu_base_option('primary_color'), $defaults['primary_color']);
    $accent = lulu_base_clean_color(lulu_base_option('accent_color'), $defaults['accent_color']);
    $graphite = lulu_base_clean_color(lulu_base_option('graphite_color'), $defaults['graphite_color']);
    $ink = lulu_base_clean_color(lulu_base_option('ink_color'), $defaults['ink_color']);
    $muted = lulu_base_clean_color(lulu_base_option('muted_color'), $defaults['muted_color']);
    $line = lulu_base_clean_color(lulu_base_option('line_color'), $defaults['line_color']);
    $soft = lulu_base_clean_color(lulu_base_option('soft_color'), $defaults['soft_color']);
    $width = min(1600, max(960, absint(lulu_base_option('container_width'))));
    $radius = min(24, max(0, absint(lulu_base_option('corner_radius'))));
    $body_font = lulu_base_font_stack(sanitize_key(lulu_base_option('body_font')));
    $display_font = lulu_base_font_stack(sanitize_key(lulu_base_option('display_font')));

    return sprintf(
        ':root{--lulu-primary:%1$s;--lulu-accent:%2$s;--lulu-graphite:%3$s;--lulu-ink:%4$s;--lulu-muted:%5$s;--lulu-line:%6$s;--lulu-soft:%7$s;--lulu-container:%8$spx;--lulu-radius:%9$spx;--lulu-body-font:%10$s;--lulu-display-font:%11$s}',
        $primary,
        $accent,
        $graphite,
        $ink,
        $muted,
        $line,
        $soft,
        $width,
        $radius,
        $body_font,
        $display_font
    );
}

function lulu_base_contact_page() {
    return get_page_by_path('contact');
}

function lulu_base_contact_url() {
    $custom_url = lulu_base_option('contact_url');
    if ($custom_url && wp_http_validate_url($custom_url)) {
        return $custom_url;
    }

    $contact = lulu_base_contact_page();
    return $contact ? get_permalink($contact) : home_url('/#contact');
}

function lulu_base_contact_label() {
    $label = trim((string) lulu_base_option('header_cta_label'));
    if ($label) {
        return $label;
    }

    $contact = lulu_base_contact_page();
    return $contact ? get_the_title($contact) : __('Contact', 'lulu-base');
}

function lulu_base_brand_initial() {
    $mark = trim((string) lulu_base_option('brand_mark'));
    if (!$mark) {
        $mark = get_bloginfo('name');
    }

    return function_exists('mb_substr') ? mb_substr($mark, 0, 1) : substr($mark, 0, 1);
}

function lulu_base_brand_markup($context = 'header') {
    $classes = 'brand brand-' . sanitize_html_class($context);
    ob_start();
    ?>
    <span class="<?php echo esc_attr($classes); ?>">
        <?php if (has_custom_logo()) : ?>
            <?php echo wp_get_attachment_image((int) get_theme_mod('custom_logo'), 'full', false, ['class' => 'custom-logo', 'alt' => get_bloginfo('name')]); ?>
        <?php else : ?>
            <span class="brand-mark" aria-hidden="true"><?php echo esc_html(strtoupper(lulu_base_brand_initial())); ?></span>
        <?php endif; ?>
        <span class="brand-copy">
            <span class="brand-name"><?php echo esc_html(get_bloginfo('name')); ?></span>
            <?php $tagline = trim((string) lulu_base_option('company_tagline')); ?>
            <?php if ($tagline) : ?><small><?php echo esc_html($tagline); ?></small><?php endif; ?>
        </span>
    </span>
    <?php
    return (string) ob_get_clean();
}

function lulu_base_menu_fallback($args = []) {
    $items = get_pages([
        'sort_column' => 'menu_order,post_title',
        'post_status' => 'publish',
    ]);

    echo '<ul class="menu">';
    if (!$items) {
        printf(
            '<li><a href="%1$s">%2$s</a></li>',
            esc_url(home_url('/')),
            esc_html(get_bloginfo('name'))
        );
    } else {
        foreach ($items as $item) {
            printf(
                '<li><a href="%1$s">%2$s</a></li>',
                esc_url(get_permalink($item)),
                esc_html($item->post_title)
            );
        }
    }
    echo '</ul>';
}

function lulu_base_breadcrumbs($items = []) {
    if (!lulu_base_option('show_breadcrumbs') || !$items) {
        return;
    }
    ?>
    <nav class="breadcrumbs" aria-label="<?php esc_attr_e('Breadcrumbs', 'lulu-base'); ?>">
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'lulu-base'); ?></a>
        <?php foreach ($items as $item) : ?>
            <span aria-hidden="true">/</span>
            <?php if (!empty($item['url']) && !is_wp_error($item['url'])) : ?>
                <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['label']); ?></a>
            <?php else : ?>
                <span aria-current="page"><?php echo esc_html($item['label']); ?></span>
            <?php endif; ?>
        <?php endforeach; ?>
    </nav>
    <?php
}

function lulu_base_product_meta($post_id, $key, $fallback = '') {
    if (lulu_base_is_chinese()) {
        $localized = get_post_meta($post_id, '_lulu_product_' . sanitize_key($key) . '_zh', true);
        if ($localized !== '') {
            return $localized;
        }
    }
    $value = get_post_meta($post_id, '_lulu_product_' . sanitize_key($key), true);
    return $value !== '' ? $value : $fallback;
}

function lulu_base_product_title($post_id) {
    if (lulu_base_is_chinese()) {
        $title = get_post_meta($post_id, '_lulu_base_source_title_zh', true);
        if ($title !== '') {
            return $title;
        }
    }
    return get_the_title($post_id);
}

function lulu_base_product_specs($post_id) {
    $labels = [
        'sku'        => __('Part number', 'lulu-base'),
        'diameter'   => __('Diameter', 'lulu-base'),
        'length'     => __('Length', 'lulu-base'),
        'grade'      => __('Grade', 'lulu-base'),
        'material'   => __('Material', 'lulu-base'),
        'standard'   => __('Standard', 'lulu-base'),
        'surface'    => __('Surface treatment', 'lulu-base'),
        'thread'     => __('Thread', 'lulu-base'),
    ];
    if (lulu_base_is_chinese()) {
        foreach ($labels as $key => $label) {
            $labels[$key] = lulu_base_source_translate($label);
        }
    }
    $specs = [];

    foreach ($labels as $key => $label) {
        if (lulu_base_is_chinese() && get_post_meta($post_id, '_lulu_product_' . $key . '_zh', true) === '') {
            continue;
        }
        $value = lulu_base_product_meta($post_id, $key);
        if ($value !== '') {
            $specs[$label] = $value;
        }
    }

    $lines = preg_split('/\r\n|\r|\n/', (string) lulu_base_product_meta($post_id, 'specifications'));
    foreach ($lines as $line) {
        if (strpos($line, ':') === false) {
            continue;
        }
        [$label, $value] = array_map('trim', explode(':', $line, 2));
        if ($label !== '' && $value !== '') {
            $specs[$label] = $value;
        }
    }

    return $specs;
}

function lulu_base_product_list($post_id, $key) {
    $value = (string) lulu_base_product_meta($post_id, $key);
    if (!$value) {
        return [];
    }

    $items = preg_split('/\r\n|\r|\n|,/', $value);
    return array_values(array_filter(array_map('trim', $items)));
}

function lulu_base_product_is_custom($post_id) {
    return (bool) lulu_base_product_meta($post_id, 'custom_manufacturing');
}

function lulu_base_related_products($post_id, $limit = 3) {
    $terms = wp_get_post_terms($post_id, 'product_category', ['fields' => 'ids']);
    if (is_wp_error($terms) || !$terms) {
        return new WP_Query([
            'post_type'      => 'product',
            'posts_per_page' => $limit,
            'post__not_in'   => [$post_id],
        ]);
    }

    return new WP_Query([
        'post_type'      => 'product',
        'posts_per_page' => absint($limit),
        'post__not_in'   => [$post_id],
        'tax_query'      => [[
            'taxonomy' => 'product_category',
            'field'    => 'term_id',
            'terms'    => $terms,
        ]],
    ]);
}

function lulu_base_social_links() {
    $links = [
        'LinkedIn' => lulu_base_option('linkedin_url'),
        'Facebook' => lulu_base_option('facebook_url'),
        'X'        => lulu_base_option('x_url'),
    ];

    return array_filter($links, static function ($url) {
        return $url && wp_http_validate_url($url);
    });
}

function lulu_base_source_page($slug) {
    $pages = get_option('lulu_base_source_pages', []);
    foreach ((array) $pages as $page) {
        if (($page['slug'] ?? '') === $slug || ($page['route'] ?? '') === $slug) {
            return is_array($page) ? $page : [];
        }
    }

    return [];
}

function lulu_base_source_data($key, $fallback = []) {
    $option_key = 'lulu_base_source_' . sanitize_key($key);
    $stored = get_option($option_key, null);
    if ($stored !== null) {
        return is_array($stored) ? $stored : $fallback;
    }

    if (function_exists('lulu_base_demo_data')) {
        $data = lulu_base_demo_data();
        return isset($data[$key]) && is_array($data[$key]) ? $data[$key] : $fallback;
    }

    return $fallback;
}
