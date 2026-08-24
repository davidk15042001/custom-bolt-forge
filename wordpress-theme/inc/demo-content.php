<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_demo_data() {
    static $data;

    if (isset($data)) {
        return $data;
    }

    $file = LULU_BASE_DIR . '/demo-content/content.json';
    if (!file_exists($file)) {
        return [];
    }

    $decoded = json_decode((string) file_get_contents($file), true);
    $data = is_array($decoded) ? $decoded : [];
    return $data;
}

function lulu_base_source_content_version() {
    $data = lulu_base_demo_data();
    $version = $data['source']['content_version'] ?? LULU_BASE_SOURCE_CONTENT_VERSION;
    return sanitize_text_field((string) $version);
}

function lulu_base_source_content_html($content) {
    $allowed = wp_kses_allowed_html('post');
    $allowed['svg'] = [
        'viewbox'       => true,
        'aria-hidden'   => true,
        'fill'          => true,
        'stroke'        => true,
        'stroke-width'  => true,
        'stroke-linecap' => true,
        'stroke-linejoin' => true,
    ];
    $allowed['path'] = [
        'd' => true,
    ];
    return wp_kses((string) $content, $allowed);
}

function lulu_base_demo_should_sync() {
    return (bool) get_option('lulu_base_demo_imported')
        && get_option('lulu_base_source_migrated_version') !== lulu_base_source_content_version();
}

function lulu_base_demo_admin_menu() {
    add_theme_page(
        __('Demo content', 'lulu-base'),
        __('Demo content', 'lulu-base'),
        'manage_options',
        'lulu-base-demo-content',
        'lulu_base_render_demo_page'
    );
}
add_action('admin_menu', 'lulu_base_demo_admin_menu');

function lulu_base_demo_activation_notice() {
    update_option('lulu_base_demo_needs_import', 1, false);
}
add_action('after_switch_theme', 'lulu_base_demo_activation_notice');

function lulu_base_demo_admin_notice() {
    $needs_import = (bool) get_option('lulu_base_demo_needs_import');
    $needs_sync = lulu_base_demo_should_sync();
    if (
        !current_user_can('manage_options') ||
        (!$needs_import && !$needs_sync) ||
        !function_exists('get_current_screen')
    ) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || $screen->base !== 'themes') {
        return;
    }
    ?>
    <div class="notice notice-info is-dismissible">
        <p>
            <?php if ($needs_sync) : ?>
                <?php esc_html_e('A newer source migration is included in Lulu Base. Run the versioned migration to synchronize source pages, products, translations and assets.', 'lulu-base'); ?>
            <?php else : ?>
                <?php esc_html_e('Lulu Base includes a complete export of the main site. Import it from the theme settings page to migrate the pages, catalog, industries, RFQ content and images.', 'lulu-base'); ?>
            <?php endif; ?>
            <a href="<?php echo esc_url(admin_url('themes.php?page=lulu-base-demo-content')); ?>"><?php esc_html_e('Open content migration', 'lulu-base'); ?></a>
        </p>
    </div>
    <?php
}
add_action('admin_notices', 'lulu_base_demo_admin_notice');

function lulu_base_demo_store_page_meta($post_id, $page) {
    update_post_meta($post_id, '_lulu_base_demo_record', '1');
    update_post_meta($post_id, '_lulu_base_source_route', sanitize_text_field($page['route'] ?? ''));
    update_post_meta($post_id, '_lulu_base_source_title_zh', sanitize_text_field($page['title_zh'] ?? ''));
    update_post_meta($post_id, '_lulu_base_source_content_zh', lulu_base_source_content_html($page['content_zh'] ?? ''));
    if (!empty($page['industry'])) {
        update_post_meta($post_id, '_lulu_base_source_industry', sanitize_key($page['industry']));
    }
    if (!empty($page['legal'])) {
        update_post_meta($post_id, '_lulu_base_source_legal', sanitize_key($page['legal']));
    }
    if (!empty($page['description'])) {
        update_post_meta($post_id, '_lulu_base_source_description', sanitize_textarea_field($page['description']));
    }
}

function lulu_base_demo_find_page($slug, $parent_id = 0) {
    $pages = get_posts([
        'post_type'      => 'page',
        'post_status'    => 'any',
        'name'           => sanitize_title($slug),
        'post_parent'    => absint($parent_id),
        'posts_per_page' => 1,
    ]);
    return $pages ? $pages[0] : null;
}

function lulu_base_demo_record_is_managed($post_id) {
    if (
        get_post_meta((int) $post_id, '_lulu_base_demo_record', true) === '1'
        || get_post_meta((int) $post_id, '_lulu_base_source_route', true) !== ''
    ) {
        return true;
    }

    return strpos((string) get_post_field('post_content', (int) $post_id), 'data-lulu-template=') !== false;
}

function lulu_base_demo_insert_page($page, $parent_id = 0, $sync = false) {
    $slug = sanitize_title($page['slug'] ?? '');
    $existing = lulu_base_demo_find_page($slug, $parent_id);
    if ($existing) {
        $managed = lulu_base_demo_record_is_managed($existing->ID);
        if ($sync && $managed) {
            wp_update_post([
                'ID'           => (int) $existing->ID,
                'post_title'   => sanitize_text_field($page['title'] ?? ''),
                'post_content' => lulu_base_source_content_html($page['content'] ?? ''),
                'post_parent'  => absint($parent_id),
            ]);
            lulu_base_demo_store_page_meta((int) $existing->ID, $page);
        } elseif ($managed) {
            lulu_base_demo_store_page_meta((int) $existing->ID, $page);
        }
        return ['id' => (int) $existing->ID, 'created' => false, 'updated' => $sync && $managed];
    }

    $post_id = wp_insert_post([
        'post_type'    => 'page',
        'post_status'  => 'publish',
        'post_title'   => sanitize_text_field($page['title'] ?? ''),
        'post_name'    => $slug,
        'post_parent'  => absint($parent_id),
        'post_content' => lulu_base_source_content_html($page['content'] ?? ''),
    ], true);

    if (is_wp_error($post_id)) {
        return ['id' => 0, 'created' => false, 'error' => $post_id->get_error_message()];
    }

    lulu_base_demo_store_page_meta((int) $post_id, $page);
    return ['id' => (int) $post_id, 'created' => true, 'updated' => false];
}

function lulu_base_demo_category_id($category, $sync = false) {
    $slug = sanitize_title($category['slug'] ?? '');
    $existing = get_term_by('slug', $slug, 'product_category');
    if ($existing && !is_wp_error($existing)) {
        $term_id = (int) $existing->term_id;
        $managed = get_term_meta($term_id, '_lulu_base_demo_record', true) === '1'
            || get_term_meta($term_id, '_lulu_base_source_name_zh', true) !== '';
        if ($sync && $managed) {
            wp_update_term($term_id, 'product_category', [
                'name'        => sanitize_text_field($category['name'] ?? ''),
                'description' => sanitize_textarea_field($category['intro'] ?? $category['description'] ?? ''),
            ]);
        }
        update_term_meta($term_id, '_lulu_base_source_name_zh', sanitize_text_field($category['name_zh'] ?? ''));
        update_term_meta($term_id, '_lulu_base_source_intro_zh', sanitize_textarea_field($category['intro_zh'] ?? ''));
        return $term_id;
    }

    $term = wp_insert_term(
        sanitize_text_field($category['name'] ?? ''),
        'product_category',
        [
            'slug'        => $slug,
            'description' => sanitize_textarea_field($category['intro'] ?? $category['description'] ?? ''),
        ]
    );

    if (is_wp_error($term)) {
        return 0;
    }

    $term_id = (int) $term['term_id'];
    update_term_meta($term_id, '_lulu_base_demo_record', '1');
    update_term_meta($term_id, '_lulu_base_source_name_zh', sanitize_text_field($category['name_zh'] ?? ''));
    update_term_meta($term_id, '_lulu_base_source_intro_zh', sanitize_textarea_field($category['intro_zh'] ?? ''));
    return $term_id;
}

function lulu_base_demo_store_product_meta($post_id, $product) {
    update_post_meta($post_id, '_lulu_base_demo_record', '1');
    update_post_meta($post_id, '_lulu_base_source_title_zh', sanitize_text_field($product['title_zh'] ?? ''));
    update_post_meta($post_id, '_lulu_base_source_content_zh', lulu_base_source_content_html($product['content_zh'] ?? ''));
    update_post_meta($post_id, '_lulu_base_source_excerpt_zh', sanitize_textarea_field($product['excerpt_zh'] ?? ''));
}

function lulu_base_demo_insert_product($product, $category_ids, $asset_ids = [], $sync = false) {
    $slug = sanitize_title($product['slug'] ?? '');
    $existing = get_page_by_path($slug, OBJECT, 'product');
    if ($existing) {
        $post_id = (int) $existing->ID;
        if ($sync && lulu_base_demo_record_is_managed($post_id)) {
            wp_update_post([
                'ID'           => $post_id,
                'post_title'   => sanitize_text_field($product['title'] ?? ''),
                'post_excerpt' => sanitize_textarea_field($product['excerpt'] ?? ''),
                'post_content' => lulu_base_source_content_html($product['content'] ?? ''),
            ]);
            $category_slug = sanitize_title($product['category'] ?? '');
            if (!empty($category_ids[$category_slug])) {
                wp_set_object_terms($post_id, [(int) $category_ids[$category_slug]], 'product_category', false);
            }
            foreach ((array) ($product['meta'] ?? []) as $key => $value) {
                update_post_meta(
                    $post_id,
                    '_lulu_product_' . sanitize_key($key),
                    sanitize_textarea_field((string) $value)
                );
            }
            if (!empty($product['asset']) && !empty($asset_ids[$product['asset']])) {
                set_post_thumbnail($post_id, (int) $asset_ids[$product['asset']]);
            }
            lulu_base_demo_store_product_meta($post_id, $product);
        } elseif (lulu_base_demo_record_is_managed($post_id)) {
            lulu_base_demo_store_product_meta($post_id, $product);
        }
        return ['id' => $post_id, 'created' => false, 'updated' => $sync && lulu_base_demo_record_is_managed($post_id)];
    }

    $post_id = wp_insert_post([
        'post_type'    => 'product',
        'post_status'  => 'publish',
        'post_title'   => sanitize_text_field($product['title'] ?? ''),
        'post_name'    => $slug,
        'post_excerpt' => sanitize_textarea_field($product['excerpt'] ?? ''),
        'post_content' => lulu_base_source_content_html($product['content'] ?? ''),
    ], true);

    if (is_wp_error($post_id)) {
        return ['id' => 0, 'created' => false, 'error' => $post_id->get_error_message()];
    }

    $post_id = (int) $post_id;
    $category_slug = sanitize_title($product['category'] ?? '');
    if (!empty($category_ids[$category_slug])) {
        wp_set_object_terms($post_id, [(int) $category_ids[$category_slug]], 'product_category', false);
    }

    foreach ((array) ($product['meta'] ?? []) as $key => $value) {
        update_post_meta(
            $post_id,
            '_lulu_product_' . sanitize_key($key),
            sanitize_textarea_field((string) $value)
        );
    }
    lulu_base_demo_store_product_meta($post_id, $product);

    if (!empty($product['asset']) && !empty($asset_ids[$product['asset']])) {
        set_post_thumbnail($post_id, (int) $asset_ids[$product['asset']]);
    }

    return ['id' => $post_id, 'created' => true, 'updated' => false];
}

function lulu_base_demo_import_asset($asset) {
    $file_name = sanitize_file_name($asset['file'] ?? '');
    if (!$file_name) {
        return 0;
    }

    $existing = get_posts([
        'post_type'      => 'attachment',
        'post_status'    => 'inherit',
        'meta_key'       => '_lulu_base_demo_asset',
        'meta_value'     => $file_name,
        'fields'         => 'ids',
        'posts_per_page' => 1,
    ]);
    if ($existing) {
        return (int) $existing[0];
    }

    $source = LULU_BASE_DIR . '/demo-content/assets/' . $file_name;
    if (!file_exists($source)) {
        return 0;
    }

    $contents = file_get_contents($source);
    if ($contents === false) {
        return 0;
    }

    $upload = wp_upload_bits($file_name, null, $contents);
    if (!empty($upload['error'])) {
        return 0;
    }

    $file_type = wp_check_filetype($file_name, null);
    $attachment_id = wp_insert_attachment([
        'post_mime_type' => $file_type['type'] ?: 'application/octet-stream',
        'post_title'     => sanitize_text_field(pathinfo($file_name, PATHINFO_FILENAME)),
        'post_content'   => '',
        'post_status'    => 'inherit',
    ], $upload['file']);
    if (is_wp_error($attachment_id)) {
        return 0;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    $metadata = wp_generate_attachment_metadata($attachment_id, $upload['file']);
    if ($metadata) {
        wp_update_attachment_metadata($attachment_id, $metadata);
    }
    update_post_meta($attachment_id, '_lulu_base_demo_asset', $file_name);
    update_post_meta($attachment_id, '_lulu_base_demo_asset_alt', sanitize_text_field($asset['alt'] ?? ''));
    return (int) $attachment_id;
}

function lulu_base_demo_image_shortcode($atts = []) {
    $atts = shortcode_atts([
        'asset' => '',
        'alt'   => '',
        'class' => 'demo-content-image',
    ], $atts, 'lulu_demo_image');
    $asset = sanitize_file_name($atts['asset']);
    if (!$asset) {
        return '';
    }

    $ids = get_posts([
        'post_type'      => 'attachment',
        'post_status'    => 'inherit',
        'meta_key'       => '_lulu_base_demo_asset',
        'meta_value'     => $asset,
        'fields'         => 'ids',
        'posts_per_page' => 1,
    ]);
    if (!$ids) {
        return '';
    }

    $alt = $atts['alt'] ?: get_post_meta((int) $ids[0], '_lulu_base_demo_asset_alt', true);
    return wp_get_attachment_image((int) $ids[0], 'large', false, [
        'class' => sanitize_html_class($atts['class']),
        'alt'   => $alt,
    ]);
}
add_shortcode('lulu_demo_image', 'lulu_base_demo_image_shortcode');

function lulu_base_demo_menu($location, $items, $sync = false) {
    $name = sprintf(__('Lulu Base Demo %s', 'lulu-base'), ucfirst($location));
    $menu = wp_get_nav_menu_object($name);
    if ($menu) {
        $menu_id = (int) $menu->term_id;
    } else {
        $created_menu = wp_create_nav_menu($name);
        $menu_id = is_wp_error($created_menu) ? 0 : (int) $created_menu;
    }
    if (!$menu_id) {
        return false;
    }

    $existing_items = wp_get_nav_menu_items($menu_id);
    $item_ids = [];
    foreach ((array) $existing_items as $existing_item) {
        $item_ids[$existing_item->title] = (int) $existing_item->db_id;
        $item_ids[sanitize_key($existing_item->title)] = (int) $existing_item->db_id;
    }
    $ordered_items = (array) $items;
    usort($ordered_items, static function ($left, $right) {
        return (int) !empty($left['parent']) <=> (int) !empty($right['parent']);
    });
    foreach ($ordered_items as $item) {
        $title = sanitize_text_field($item['title'] ?? '');
        $item_key = sanitize_key($item['key'] ?? $title);
        $path = '/' . ltrim(sanitize_text_field($item['path'] ?? '/'), '/');
        $url = home_url($path);
        $parent_title = sanitize_text_field($item['parent'] ?? '');
        $parent_key = sanitize_key($parent_title);
        $parent_id = $parent_title && !empty($item_ids[$parent_title])
            ? $item_ids[$parent_title]
            : ($parent_key && !empty($item_ids[$parent_key]) ? $item_ids[$parent_key] : 0);
        $already_exists = false;

        foreach ((array) $existing_items as $existing_item) {
            if ($existing_item->title === $title || $existing_item->url === $url) {
                $already_exists = true;
                $item_ids[$title] = (int) $existing_item->db_id;
                $item_ids[$item_key] = (int) $existing_item->db_id;
                if ($sync) {
                    wp_update_nav_menu_item($menu_id, (int) $existing_item->db_id, [
                        'menu-item-title'     => $title,
                        'menu-item-url'       => esc_url_raw($url),
                        'menu-item-status'    => 'publish',
                        'menu-item-parent-id' => $parent_id,
                    ]);
                }
                break;
            }
        }

        if ($already_exists) {
            continue;
        }

        $item_id = wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title'  => $title,
            'menu-item-url'    => esc_url_raw($url),
            'menu-item-status' => 'publish',
            'menu-item-type'   => 'custom',
            'menu-item-parent-id' => $parent_id,
        ]);
        if (!is_wp_error($item_id)) {
            $item_ids[$title] = (int) $item_id;
            $item_ids[$item_key] = (int) $item_id;
            $existing_items = wp_get_nav_menu_items($menu_id);
        }
    }

    $locations = get_theme_mod('nav_menu_locations', []);
    if (!is_array($locations)) {
        $locations = [];
    }
    if (empty($locations[$location])) {
        $locations[$location] = $menu_id;
        set_theme_mod('nav_menu_locations', $locations);
    }

    return $menu_id;
}

function lulu_base_demo_update_site_identity($company) {
    $name = sanitize_text_field($company['shortName'] ?? $company['name'] ?? '');
    $description = sanitize_text_field($company['positioning'] ?? '');
    $current_name = get_option('blogname');
    if (!$current_name || in_array($current_name, ['My WordPress', 'WordPress'], true)) {
        update_option('blogname', $name);
    }
    if (!get_option('blogdescription') && $description) {
        update_option('blogdescription', $description);
    }
}

function lulu_base_install_demo_content() {
    if (!current_user_can('manage_options')) {
        wp_die(esc_html__('You do not have permission to import demo content.', 'lulu-base'));
    }
    check_admin_referer('lulu_base_import_demo', 'lulu_base_demo_nonce');

    $data = lulu_base_demo_data();
    $sync = lulu_base_demo_should_sync();
    $stats = [
        'pages'      => 0,
        'updated'    => 0,
        'categories' => 0,
        'products'   => 0,
        'menus'      => 0,
        'assets'     => 0,
    ];

    $asset_ids = [];
    foreach ((array) ($data['assets'] ?? []) as $asset) {
        $asset_id = lulu_base_demo_import_asset($asset);
        if ($asset_id) {
            $asset_ids[sanitize_file_name($asset['file'] ?? '')] = $asset_id;
            $stats['assets']++;
        }
    }

    $pages = (array) ($data['pages'] ?? []);
    usort($pages, static function ($left, $right) {
        return (int) !empty($left['parent']) <=> (int) !empty($right['parent']);
    });
    $page_ids = [];
    $archive_pages = [];
    foreach ($pages as $page) {
        if (!empty($page['archive'])) {
            $archive_pages[$page['slug']] = $page;
            continue;
        }
        $parent_slug = sanitize_title($page['parent'] ?? '');
        $parent_id = $parent_slug && !empty($page_ids[$parent_slug]) ? $page_ids[$parent_slug] : 0;
        $result = lulu_base_demo_insert_page($page, $parent_id, $sync);
        if (!empty($result['id'])) {
            $page_ids[sanitize_title($page['slug'] ?? '')] = (int) $result['id'];
        }
        if (!empty($result['created'])) {
            $stats['pages']++;
        } elseif (!empty($result['updated'])) {
            $stats['updated']++;
        }
        if (($page['slug'] ?? '') === 'home' && !empty($result['id'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', (int) $result['id']);
        }
    }

    $category_ids = [];
    foreach ((array) ($data['categories'] ?? []) as $category) {
        $category_slug = sanitize_title($category['slug'] ?? '');
        $existing_category = get_term_by('slug', $category_slug, 'product_category');
        $category_id = lulu_base_demo_category_id($category, $sync);
        if ($category_id) {
            $category_ids[$category_slug] = $category_id;
            if (!$existing_category || is_wp_error($existing_category)) {
                $stats['categories']++;
            }
        }
    }

    foreach ((array) ($data['products'] ?? []) as $product) {
        $result = lulu_base_demo_insert_product($product, $category_ids, $asset_ids, $sync);
        if (!empty($result['created'])) {
            $stats['products']++;
        } elseif (!empty($result['updated'])) {
            $stats['updated']++;
        }
    }

    $repair_menus = $sync || get_option('lulu_base_demo_menu_version') !== LULU_BASE_VERSION;
    foreach ((array) ($data['menus'] ?? []) as $location => $items) {
        if (lulu_base_demo_menu(sanitize_key($location), $items, $repair_menus)) {
            $stats['menus']++;
        }
    }
    update_option('lulu_base_demo_menu_version', LULU_BASE_VERSION, false);

    foreach ((array) ($data['theme_mods'] ?? []) as $key => $value) {
        if ($key === 'hero_image' && !empty($asset_ids[$value])) {
            $value = wp_get_attachment_url((int) $asset_ids[$value]);
        }
        if (get_theme_mod($key, null) === null) {
            set_theme_mod(sanitize_key($key), $value);
        }
    }
    if (!get_theme_mod('email', null) && !empty($data['company']['email'])) {
        set_theme_mod('email', sanitize_email($data['company']['email']));
    }
    if (!get_theme_mod('address', null) && !empty($data['company']['address'])) {
        set_theme_mod('address', sanitize_textarea_field($data['company']['address']));
    }
    if (!get_theme_mod('rfq_recipient', null) && !empty($data['company']['email'])) {
        set_theme_mod('rfq_recipient', sanitize_email($data['company']['email']));
    }

    lulu_base_demo_update_site_identity((array) ($data['company'] ?? []));
    update_option('lulu_base_source_pages', $pages, false);
    update_option('lulu_base_source_archive_pages', $archive_pages, false);
    update_option('lulu_base_source_translations', (array) ($data['translations'] ?? []), false);
    update_option('lulu_base_source_company', (array) ($data['company'] ?? []), false);
    update_option('lulu_base_source_categories', (array) ($data['categories'] ?? []), false);
    update_option('lulu_base_source_industries', (array) ($data['industries'] ?? []), false);
    update_option('lulu_base_source_workflow', (array) ($data['workflow'] ?? []), false);
    update_option('lulu_base_source_faqs', (array) ($data['faqs'] ?? []), false);
    update_option('lulu_base_source_buyer_types', (array) ($data['buyer_types'] ?? []), false);
    update_option('lulu_base_source_migrated', current_time('mysql'), false);
    update_option('lulu_base_source_migrated_version', lulu_base_source_content_version(), false);
    update_option('lulu_base_demo_imported', current_time('mysql'), false);
    delete_option('lulu_base_demo_needs_import');
    flush_rewrite_rules(false);

    wp_safe_redirect(add_query_arg([
        'page'          => 'lulu-base-demo-content',
        'lulu_demo'     => 'installed',
        'demo_pages'    => $stats['pages'],
        'demo_updated'  => $stats['updated'],
        'demo_cats'     => $stats['categories'],
        'demo_products' => $stats['products'],
        'demo_menus'    => $stats['menus'],
        'demo_assets'   => $stats['assets'],
    ], admin_url('themes.php')));
    exit;
}
add_action('admin_post_lulu_base_install_demo', 'lulu_base_install_demo_content');

function lulu_base_render_demo_page() {
    $data = lulu_base_demo_data();
    $installed = get_option('lulu_base_source_migrated');
    $installed_version = get_option('lulu_base_source_migrated_version', '');
    $source_version = lulu_base_source_content_version();
    $needs_sync = lulu_base_demo_should_sync();
    $status = isset($_GET['lulu_demo']) && is_scalar($_GET['lulu_demo']) ? sanitize_key(wp_unslash($_GET['lulu_demo'])) : '';
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Main site content migration', 'lulu-base'); ?></h1>
        <p><?php esc_html_e('This package includes the content export from the React main site. Import it to create the replica pages, complete catalog, industries, RFQ routes, legal content and source images.', 'lulu-base'); ?></p>
        <?php if ($status === 'installed') : ?>
            <div class="notice notice-success inline">
                <p>
                    <?php
                    printf(
                        esc_html__('Migration complete: %1$s pages created, %2$s records updated, %3$s categories, %4$s products, %5$s menus and %6$s images processed.', 'lulu-base'),
                        absint($_GET['demo_pages'] ?? 0),
                        absint($_GET['demo_updated'] ?? 0),
                        absint($_GET['demo_cats'] ?? 0),
                        absint($_GET['demo_products'] ?? 0),
                        absint($_GET['demo_menus'] ?? 0),
                        absint($_GET['demo_assets'] ?? 0)
                    );
                    ?>
                </p>
            </div>
        <?php endif; ?>
        <?php if ($installed) : ?>
            <p><strong><?php esc_html_e('Main site content has been migrated.', 'lulu-base'); ?></strong> <?php esc_html_e('The importer is versioned: managed source records synchronize when the bundled source version changes, while unrelated WordPress content remains untouched.', 'lulu-base'); ?></p>
            <p><?php printf(esc_html__('Installed source version: %1$s · Bundled source version: %2$s', 'lulu-base'), esc_html($installed_version ?: __('unknown', 'lulu-base')), esc_html($source_version)); ?></p>
            <?php if ($needs_sync) : ?><div class="notice notice-warning inline"><p><?php esc_html_e('A newer source export is ready. Run the migration to synchronize the managed source records and purge page/cache layers afterward.', 'lulu-base'); ?></p></div><?php endif; ?>
        <?php endif; ?>
        <div class="card" style="max-width:760px;padding:24px;">
            <h2><?php esc_html_e('Included source content', 'lulu-base'); ?></h2>
            <ul>
                <li><?php printf(esc_html__('%s source routes/pages, including industry and legal child pages.', 'lulu-base'), count((array) ($data['pages'] ?? []))); ?></li>
                <li><?php printf(esc_html__('%s product categories and %s products with source specifications and applications.', 'lulu-base'), count((array) ($data['categories'] ?? [])), count((array) ($data['products'] ?? []))); ?></li>
                <li><?php printf(esc_html__('%s industries, %s workflow stages, %s FAQs, %s buyer types and %s Chinese translations.', 'lulu-base'), count((array) ($data['industries'] ?? [])), count((array) ($data['workflow'] ?? [])), count((array) ($data['faqs'] ?? [])), count((array) ($data['buyer_types'] ?? [])), count((array) ($data['translations'] ?? []))); ?></li>
                <li><?php printf(esc_html__('%s source images imported into the WordPress media library.', 'lulu-base'), count((array) ($data['assets'] ?? []))); ?></li>
            </ul>
            <p><strong><?php esc_html_e('Existing content is protected.', 'lulu-base'); ?></strong> <?php esc_html_e('New installs receive the complete migration. A previous Lulu demo import is recognized and its matching records are synchronized once; later runs do not overwrite content.', 'lulu-base'); ?></p>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="lulu_base_install_demo">
                <?php wp_nonce_field('lulu_base_import_demo', 'lulu_base_demo_nonce'); ?>
                <?php submit_button($installed ? __('Run additive source import again', 'lulu-base') : __('Migrate main site content', 'lulu-base'), 'primary', 'submit', false); ?>
            </form>
        </div>
    </div>
    <?php
}
