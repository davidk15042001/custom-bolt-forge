<?php
if (!defined('ABSPATH')) {
    exit;
}

$product_id = get_the_ID();
$product_title = lulu_base_product_title($product_id);
$subtitle = lulu_base_product_meta($product_id, 'subtitle');
$terms = get_the_terms($product_id, 'product_category');
$category_name = '';
$category_slug = '';
if ($terms && !is_wp_error($terms)) {
    $category_slug = $terms[0]->slug;
    $category_name = lulu_base_is_chinese()
        ? (get_term_meta($terms[0]->term_id, '_lulu_base_source_name_zh', true) ?: $terms[0]->name)
        : $terms[0]->name;
    foreach (lulu_base_source_data('categories', []) as $source_category) {
        if (($source_category['slug'] ?? '') !== $category_slug) {
            continue;
        }
        $category_name = lulu_base_is_chinese()
            ? ($source_category['short_zh'] ?? $source_category['short'] ?? $category_name)
            : ($source_category['short'] ?? $category_name);
        break;
    }
}
$is_custom = lulu_base_product_is_custom($product_id);
$specs = lulu_base_product_specs($product_id);
$applications = lulu_base_product_list($product_id, 'applications');
$rfq_id = $category_slug . '/' . get_post_field('post_name', $product_id);
$rfq_spec = implode(' · ', array_map(static function ($label, $value) {
    return $label . ': ' . $value;
}, array_keys($specs), $specs));
?>
<article <?php post_class('source-product-card'); ?> id="<?php echo esc_attr($product_id ? sanitize_html_class(get_post_field('post_name', $product_id)) : 'product'); ?>">
    <div class="source-product-card-heading">
        <p class="eyebrow"><?php echo esc_html($category_name); ?></p>
        <span class="source-badge <?php echo esc_attr($is_custom ? 'source-badge-primary' : 'source-badge-secondary'); ?>">
            <?php echo esc_html($is_custom ? lulu_base_source_translate('Custom') : lulu_base_source_translate('Standard')); ?>
        </span>
    </div>
    <h3><?php echo esc_html($product_title); ?></h3>
    <p class="source-product-summary"><?php echo esc_html($subtitle ?: wp_trim_words(get_the_excerpt(), 24)); ?></p>

    <?php if ($specs) : ?>
        <dl class="source-product-specs">
            <?php foreach ($specs as $label => $value) : ?>
                <div>
                    <dt><?php echo esc_html($label); ?></dt>
                    <dd><?php echo esc_html($value); ?></dd>
                </div>
            <?php endforeach; ?>
        </dl>
    <?php endif; ?>

    <?php if ($applications) : ?>
        <p class="source-product-applications"><?php echo esc_html(implode(' · ', $applications)); ?></p>
    <?php endif; ?>

    <div class="source-product-actions">
        <a class="button button-outline button-small" href="<?php echo esc_url($category_slug ? home_url('/products/' . $category_slug . '/#' . get_post_field('post_name', $product_id)) : get_permalink($product_id)); ?>">
            <?php esc_html_e('View Specifications', 'lulu-base'); ?>
        </a>
        <button class="button button-small source-rfq-add" type="button" data-rfq-id="<?php echo esc_attr($rfq_id); ?>" data-rfq-name="<?php echo esc_attr($product_title); ?>" data-rfq-category="<?php echo esc_attr($category_name); ?>" data-rfq-spec="<?php echo esc_attr($rfq_spec); ?>" data-rfq-add-label="<?php echo esc_attr(lulu_base_is_chinese() ? '加入询价单' : 'Add to RFQ'); ?>" data-rfq-in-label="<?php echo esc_attr(lulu_base_is_chinese() ? '已加入询价单' : 'In RFQ List'); ?>" aria-pressed="false">
            <span class="source-rfq-icon" aria-hidden="true">+</span>
            <span class="source-rfq-label"><?php echo esc_html(lulu_base_is_chinese() ? '加入询价单' : 'Add to RFQ'); ?></span>
        </button>
    </div>
</article>
