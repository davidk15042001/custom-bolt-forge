<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_product_type() {
    register_post_type('product', [
        'labels' => [
            'name'          => __('Products', 'lulu-base'),
            'singular_name' => __('Product', 'lulu-base'),
            'add_new_item'  => __('Add new product', 'lulu-base'),
            'edit_item'     => __('Edit product', 'lulu-base'),
        ],
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-products',
        'supports'           => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'rewrite'            => ['slug' => 'products'],
        'show_in_rest'       => true,
        'map_meta_cap'       => true,
        'menu_position'      => 20,
    ]);

    register_taxonomy('product_category', 'product', [
        'labels' => [
            'name'          => __('Product Categories', 'lulu-base'),
            'singular_name' => __('Product Category', 'lulu-base'),
        ],
        'hierarchical'      => true,
        'rewrite'           => ['slug' => 'product-category'],
        'show_in_rest'      => true,
        'show_admin_column' => true,
    ]);
}
add_action('init', 'lulu_base_product_type');

function lulu_base_product_category_routes() {
    $terms = get_terms([
        'taxonomy'   => 'product_category',
        'hide_empty' => false,
    ]);
    if (is_wp_error($terms)) {
        return;
    }

    foreach ($terms as $term) {
        add_rewrite_rule(
            '^products/' . preg_quote($term->slug, '/') . '/?$',
            'index.php?product_category=' . $term->slug,
            'top'
        );
    }
}
add_action('init', 'lulu_base_product_category_routes', 20);

function lulu_base_product_category_link($url, $term, $taxonomy) {
    if ($taxonomy === 'product_category' && $term instanceof WP_Term) {
        return home_url('/products/' . $term->slug . '/');
    }
    return $url;
}
add_filter('term_link', 'lulu_base_product_category_link', 10, 3);

function lulu_base_product_fields() {
    return [
        'subtitle' => [
            'label'    => __('Short product subtitle', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
            'help'     => __('Used in product cards and archive summaries.', 'lulu-base'),
        ],
        'sku' => [
            'label'    => __('Part number / SKU', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'diameter' => [
            'label'    => __('Diameter', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'length' => [
            'label'    => __('Length', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'thread' => [
            'label'    => __('Thread', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'grade' => [
            'label'    => __('Grade', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'material' => [
            'label'    => __('Material', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'standard' => [
            'label'    => __('Standard / drawing reference', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'surface' => [
            'label'    => __('Surface treatment', 'lulu-base'),
            'type'     => 'text',
            'sanitize' => 'sanitize_text_field',
        ],
        'specifications' => [
            'label'    => __('Additional specifications', 'lulu-base'),
            'type'     => 'textarea',
            'sanitize' => 'sanitize_textarea_field',
            'help'     => __('One specification per line in “Label: Value” format.', 'lulu-base'),
        ],
        'applications' => [
            'label'    => __('Applications', 'lulu-base'),
            'type'     => 'textarea',
            'sanitize' => 'sanitize_textarea_field',
            'help'     => __('Enter one application per line.', 'lulu-base'),
        ],
        'custom_manufacturing' => [
            'label'    => __('Available to drawing / custom manufacture', 'lulu-base'),
            'type'     => 'checkbox',
            'sanitize' => 'rest_sanitize_boolean',
        ],
    ];
}

function lulu_base_register_product_meta() {
    foreach (lulu_base_product_fields() as $key => $field) {
        register_post_meta('product', '_lulu_product_' . $key, [
            'type'              => $field['type'] === 'checkbox' ? 'boolean' : 'string',
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => $field['sanitize'],
            'auth_callback'     => static function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
}
add_action('init', 'lulu_base_register_product_meta', 20);

function lulu_base_product_meta_box() {
    add_meta_box(
        'lulu_base_product_details',
        __('Product details', 'lulu-base'),
        'lulu_base_render_product_meta_box',
        'product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes_product', 'lulu_base_product_meta_box');

function lulu_base_render_product_meta_box($post) {
    wp_nonce_field('lulu_base_save_product', 'lulu_base_product_nonce');
    $fields = lulu_base_product_fields();
    ?>
    <div class="lulu-admin-grid">
        <?php foreach ($fields as $key => $field) : ?>
            <?php $value = get_post_meta($post->ID, '_lulu_product_' . $key, true); ?>
            <p class="<?php echo esc_attr($field['type'] === 'textarea' ? 'lulu-admin-field lulu-admin-wide' : 'lulu-admin-field'); ?>">
                <?php if ($field['type'] === 'checkbox') : ?>
                    <label>
                        <input type="checkbox" name="lulu_product[<?php echo esc_attr($key); ?>]" value="1" <?php checked($value, '1'); ?>>
                        <?php echo esc_html($field['label']); ?>
                    </label>
                <?php else : ?>
                    <label for="lulu-product-<?php echo esc_attr($key); ?>"><strong><?php echo esc_html($field['label']); ?></strong></label>
                    <?php if ($field['type'] === 'textarea') : ?>
                        <textarea id="lulu-product-<?php echo esc_attr($key); ?>" name="lulu_product[<?php echo esc_attr($key); ?>]" rows="4" class="widefat"><?php echo esc_textarea($value); ?></textarea>
                    <?php else : ?>
                        <input id="lulu-product-<?php echo esc_attr($key); ?>" type="text" name="lulu_product[<?php echo esc_attr($key); ?>]" value="<?php echo esc_attr($value); ?>" class="widefat">
                    <?php endif; ?>
                <?php endif; ?>
                <?php if (!empty($field['help'])) : ?><small><?php echo esc_html($field['help']); ?></small><?php endif; ?>
            </p>
        <?php endforeach; ?>
    </div>
    <?php
}

function lulu_base_save_product_meta($post_id) {
    if (
        !isset($_POST['lulu_base_product_nonce']) ||
        !is_scalar($_POST['lulu_base_product_nonce']) ||
        !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['lulu_base_product_nonce'])), 'lulu_base_save_product')
    ) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (wp_is_post_revision($post_id) || !current_user_can('edit_post', $post_id)) {
        return;
    }

    $submitted = isset($_POST['lulu_product']) && is_array($_POST['lulu_product'])
        ? wp_unslash($_POST['lulu_product'])
        : [];

    foreach (lulu_base_product_fields() as $key => $field) {
        $meta_key = '_lulu_product_' . $key;
        if ($field['type'] === 'checkbox') {
            if (!empty($submitted[$key])) {
                update_post_meta($post_id, $meta_key, '1');
            } else {
                delete_post_meta($post_id, $meta_key);
            }
            continue;
        }

        $value = isset($submitted[$key]) ? $submitted[$key] : '';
        $value = call_user_func($field['sanitize'], $value);
        if ($value === '') {
            delete_post_meta($post_id, $meta_key);
        } else {
            update_post_meta($post_id, $meta_key, $value);
        }
    }
}
add_action('save_post_product', 'lulu_base_save_product_meta');

function lulu_base_products_per_page($query) {
    if (!is_admin() && $query->is_main_query() && $query->is_post_type_archive('product')) {
        $query->set('posts_per_page', min(48, max(1, absint(lulu_base_option('products_per_page')))));
    }
}
add_action('pre_get_posts', 'lulu_base_products_per_page');

function lulu_base_product_admin_styles($hook) {
    $screen = get_current_screen();
    if (!in_array($hook, ['post.php', 'post-new.php'], true) || !$screen || $screen->post_type !== 'product') {
        return;
    }
    wp_register_style('lulu-base-admin', false, [], LULU_BASE_VERSION);
    wp_enqueue_style('lulu-base-admin');
    wp_add_inline_style('lulu-base-admin', '.lulu-admin-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.lulu-admin-field{margin:0}.lulu-admin-field label{display:block;margin-bottom:6px}.lulu-admin-field small{display:block;margin-top:5px;color:#646970}.lulu-admin-wide{grid-column:1/-1}@media(max-width:782px){.lulu-admin-grid{grid-template-columns:1fr}}');
}
add_action('admin_enqueue_scripts', 'lulu_base_product_admin_styles');
