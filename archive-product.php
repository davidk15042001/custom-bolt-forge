<?php
get_header();

$archive_url = get_post_type_archive_link('product');
$query_text = isset($_GET['q']) && is_scalar($_GET['q']) ? sanitize_text_field(wp_unslash($_GET['q'])) : '';
$selected_category = isset($_GET['category']) && is_scalar($_GET['category']) ? sanitize_key(wp_unslash($_GET['category'])) : 'all';
$selected_type = isset($_GET['type']) && is_scalar($_GET['type']) ? sanitize_key(wp_unslash($_GET['type'])) : 'all';
$selected_filter = isset($_GET['filter']) && is_scalar($_GET['filter']) ? sanitize_text_field(wp_unslash($_GET['filter'])) : '';
$diameters = ['M4', 'M6', 'M8', 'M10', 'M12', 'M16', 'M20', 'M24', 'M30', 'M120'];
$grades = ['4.8', '8.8', '10.9', '12.9'];
$terms = get_terms([
    'taxonomy'   => 'product_category',
    'hide_empty' => false,
    'orderby'    => 'term_id',
    'order'      => 'ASC',
]);
$products = get_posts([
    'post_type'      => 'product',
    'post_status'    => 'publish',
    'posts_per_page' => -1,
    'orderby'        => 'menu_order title',
    'order'          => 'ASC',
]);
$groups = [];

foreach ($products as $product_post) {
    $product_terms = get_the_terms($product_post->ID, 'product_category');
    if (!$product_terms || is_wp_error($product_terms)) {
        continue;
    }
    $term = $product_terms[0];
    if ($selected_category !== 'all' && $term->slug !== $selected_category) {
        continue;
    }

    $specs = lulu_base_product_specs($product_post->ID);
    $applications = lulu_base_product_list($product_post->ID, 'applications');
    $haystack = strtolower(
        lulu_base_product_title($product_post->ID) . ' ' .
        $product_post->post_excerpt . ' ' .
        $term->name . ' ' .
        implode(' ', array_keys($specs)) . ' ' .
        implode(' ', $specs) . ' ' .
        implode(' ', $applications)
    );
    if ($query_text && strpos($haystack, strtolower($query_text)) === false) {
        continue;
    }
    $is_custom = lulu_base_product_is_custom($product_post->ID);
    if ($selected_type === 'custom' && !$is_custom) {
        continue;
    }
    if ($selected_type === 'standard' && $is_custom) {
        continue;
    }
    if ($selected_filter && strpos($haystack, strtolower($selected_filter)) === false) {
        continue;
    }

    if (!isset($groups[$term->slug])) {
        $groups[$term->slug] = [
            'term'     => $term,
            'products' => [],
        ];
    }
    $groups[$term->slug]['products'][] = $product_post;
}

$ordered_groups = [];
foreach ((array) $terms as $term) {
    if (isset($groups[$term->slug])) {
        $ordered_groups[] = $groups[$term->slug];
    }
}
$total = array_sum(array_map(static function ($group) {
    return count($group['products']);
}, $ordered_groups));
$filter_link = static function ($key, $value) use ($archive_url, $query_text, $selected_category, $selected_type, $selected_filter) {
    $args = [
        'q'        => $query_text,
        'category' => $selected_category,
        'type'     => $selected_type,
        'filter'   => $selected_filter,
    ];
    $args[$key] = $value;
    return add_query_arg(array_filter($args, static function ($item) {
        return $item !== '' && $item !== 'all';
    }), $archive_url);
};
?>

<main id="main-content">
    <section class="source-page-hero blueprint-grid">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e('Product Portfolio', 'lulu-base'); ?></p>
            <h1><?php esc_html_e('Industrial Fastener Products', 'lulu-base'); ?></h1>
            <p><?php esc_html_e('Browse the full portfolio by category, diameter, grade or application. Add any product to your RFQ list and submit one combined request.', 'lulu-base'); ?></p>
            <div class="source-page-hero-actions">
                <a class="button" href="<?php echo esc_url(home_url('/rfq')); ?>"><?php esc_html_e('Open RFQ List', 'lulu-base'); ?></a>
                <a class="button button-outline" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php esc_html_e('Submit RFQ', 'lulu-base'); ?></a>
            </div>
        </div>
    </section>

    <section class="product-index-section">
        <div class="container product-index-layout">
            <aside class="product-filter-sidebar" aria-label="<?php esc_attr_e('Product filters', 'lulu-base'); ?>">
                <form class="product-search-form" method="get" action="<?php echo esc_url($archive_url); ?>">
                    <label class="screen-reader-text" for="product-search"><?php esc_html_e('Search products', 'lulu-base'); ?></label>
                    <input id="product-search" type="search" name="q" value="<?php echo esc_attr($query_text); ?>" maxlength="80" placeholder="<?php esc_attr_e('Search bolts, nuts, sizes or specifications...', 'lulu-base'); ?>">
                    <?php if ($selected_category !== 'all') : ?><input type="hidden" name="category" value="<?php echo esc_attr($selected_category); ?>"><?php endif; ?>
                    <?php if ($selected_type !== 'all') : ?><input type="hidden" name="type" value="<?php echo esc_attr($selected_type); ?>"><?php endif; ?>
                    <?php if ($selected_filter) : ?><input type="hidden" name="filter" value="<?php echo esc_attr($selected_filter); ?>"><?php endif; ?>
                </form>

                <div class="product-filter-group">
                    <p class="eyebrow"><?php esc_html_e('Category', 'lulu-base'); ?></p>
                    <div class="product-filter-links">
                        <a class="<?php echo esc_attr($selected_category === 'all' ? 'is-active' : ''); ?>" href="<?php echo esc_url($filter_link('category', 'all')); ?>"><?php esc_html_e('All categories', 'lulu-base'); ?></a>
                        <?php foreach ((array) $terms as $term) : ?>
                            <?php
                            $filter_label = lulu_base_is_chinese()
                                ? (get_term_meta($term->term_id, '_lulu_base_source_name_zh', true) ?: $term->name)
                                : $term->name;
                            foreach (lulu_base_source_data('categories', []) as $source_category) {
                                if (($source_category['slug'] ?? '') !== $term->slug) continue;
                                $filter_label = lulu_base_is_chinese()
                                    ? ($source_category['short_zh'] ?? $source_category['short'] ?? $filter_label)
                                    : ($source_category['short'] ?? $filter_label);
                                break;
                            }
                            ?>
                            <a class="<?php echo esc_attr($selected_category === $term->slug ? 'is-active' : ''); ?>" href="<?php echo esc_url($filter_link('category', $term->slug)); ?>"><?php echo esc_html($filter_label); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="product-filter-group">
                    <p class="eyebrow"><?php esc_html_e('Standard / Custom', 'lulu-base'); ?></p>
                    <div class="product-filter-chips">
                        <?php foreach (['all' => __('all', 'lulu-base'), 'standard' => __('standard', 'lulu-base'), 'custom' => __('custom', 'lulu-base')] as $value => $label) : ?>
                            <a class="<?php echo esc_attr($selected_type === $value ? 'is-active' : ''); ?>" href="<?php echo esc_url($filter_link('type', $value)); ?>"><?php echo esc_html($label); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="product-filter-group">
                    <p class="eyebrow"><?php esc_html_e('Diameter', 'lulu-base'); ?></p>
                    <div class="product-filter-chips">
                        <?php foreach ($diameters as $diameter) : ?>
                            <a class="<?php echo esc_attr($selected_filter === $diameter ? 'is-active' : ''); ?>" href="<?php echo esc_url($filter_link('filter', $selected_filter === $diameter ? '' : $diameter)); ?>"><?php echo esc_html($diameter); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="product-filter-group">
                    <p class="eyebrow"><?php esc_html_e('Grade', 'lulu-base'); ?></p>
                    <div class="product-filter-chips">
                        <?php foreach ($grades as $grade) : ?>
                            <a class="<?php echo esc_attr($selected_filter === $grade ? 'is-active' : ''); ?>" href="<?php echo esc_url($filter_link('filter', $selected_filter === $grade ? '' : $grade)); ?>"><?php echo esc_html($grade); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <a class="product-filter-reset" href="<?php echo esc_url($archive_url); ?>"><?php esc_html_e('Reset filters', 'lulu-base'); ?></a>
            </aside>

            <div class="product-index-results">
                <p class="spec-value product-result-count"><?php echo esc_html($total); ?> <?php esc_html_e('product families', 'lulu-base'); ?></p>
                <?php if ($total > 0) : ?>
                    <div class="product-result-groups">
                        <?php foreach ($ordered_groups as $group) : ?>
                            <section class="product-result-group">
                                <?php
                                $term = $group['term'];
                                $term_name = lulu_base_is_chinese() ? (get_term_meta($term->term_id, '_lulu_base_source_name_zh', true) ?: $term->name) : $term->name;
                                ?>
                                <div class="product-result-heading">
                                    <h2><?php echo esc_html($term_name); ?></h2>
                                    <a href="<?php echo esc_url(get_term_link($term)); ?>"><?php esc_html_e('Category page', 'lulu-base'); ?></a>
                                </div>
                                <div class="source-product-grid">
                                    <?php foreach ($group['products'] as $product_post) : ?>
                                        <?php $GLOBALS['post'] = $product_post; ?>
                                        <?php setup_postdata($product_post); ?>
                                        <?php get_template_part('template-parts/product-card'); ?>
                                    <?php endforeach; ?>
                                    <?php wp_reset_postdata(); ?>
                                </div>
                            </section>
                        <?php endforeach; ?>
                    </div>
                <?php else : ?>
                    <p class="product-no-results"><?php esc_html_e('No products match these filters. Reset the filters or send your requirement through the', 'lulu-base'); ?> <a href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php esc_html_e('Request Center', 'lulu-base'); ?></a><?php esc_html_e('.', 'lulu-base'); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>
