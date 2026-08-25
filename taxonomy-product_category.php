<?php
$term = get_queried_object();
$category = null;
foreach (lulu_base_source_data('categories', []) as $candidate) {
    if (($candidate['slug'] ?? '') === ($term->slug ?? '')) {
        $category = $candidate;
        break;
    }
}
$is_zh = lulu_base_is_chinese();
$category_name = $is_zh
    ? ($category['name_zh'] ?? $term->name)
    : ($category['name'] ?? $term->name);
$category_intro = $is_zh
    ? ($category['intro_zh'] ?? term_description())
    : ($category['intro'] ?? term_description());
$category_short = $is_zh
    ? ($category['short_zh'] ?? $category['short'] ?? $category_name)
    : ($category['short'] ?? $category_name);
?>
<?php get_header(); ?>
<?php $has_products = have_posts(); ?>
<main id="main-content">
    <section class="source-page-hero blueprint-grid">
        <div class="container">
            <p class="eyebrow"><?php echo esc_html($is_zh ? '产品' : 'Products'); ?></p>
            <h1><?php echo esc_html($category_name); ?></h1>
            <p><?php echo esc_html($category_intro); ?></p>
            <div class="source-page-hero-actions">
                <a class="button" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html($is_zh ? '获取报价' : 'Request Quote'); ?></a>
                <a class="button button-outline" href="<?php echo esc_url(home_url('/custom-manufacturing')); ?>"><?php echo esc_html($is_zh ? '上传图纸' : 'Upload Drawing'); ?></a>
            </div>
        </div>
    </section>

    <section class="source-section source-category-products">
        <div class="container">
            <?php if ($has_products) : ?>
                <div class="source-product-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <?php get_template_part('template-parts/product-card'); ?>
                    <?php endwhile; ?>
                </div>
            <?php else : ?>
                <div class="empty-catalog"><h2><?php echo esc_html($is_zh ? '此分类暂无产品' : 'No products in this category yet'); ?></h2></div>
            <?php endif; ?>
        </div>
    </section>

    <?php if ($has_products) : rewind_posts(); ?>
        <section class="source-section source-section-muted source-category-matrix">
            <div class="container">
                <div class="source-section-heading">
                    <p class="eyebrow"><?php echo esc_html($is_zh ? '规格对照表' : 'Specification Matrix'); ?></p>
                    <h2><?php echo esc_html($is_zh ? '产品系列概览' : 'Product Family Overview'); ?></h2>
                </div>
                <div class="table-scroll">
                    <table class="specification-matrix">
                        <thead>
                            <tr>
                                <th><?php echo esc_html($is_zh ? '产品' : 'Product'); ?></th>
                                <th><?php echo esc_html($is_zh ? '关键规格' : 'Key specification'); ?></th>
                                <th><?php echo esc_html($is_zh ? '类型' : 'Type'); ?></th>
                                <th><?php echo esc_html($is_zh ? '应用场景' : 'Applications'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while (have_posts()) : the_post(); ?>
                                <?php $specs = lulu_base_product_specs(get_the_ID()); ?>
                                <tr>
                                    <td><?php echo esc_html(lulu_base_product_title(get_the_ID())); ?></td>
                                    <td><?php echo esc_html(implode(' · ', array_map(static function ($label, $value) { return $label . ': ' . $value; }, array_keys($specs), $specs))); ?></td>
                                    <td><?php echo esc_html(lulu_base_product_is_custom(get_the_ID()) ? ($is_zh ? '非标定制' : 'Custom') : ($is_zh ? '标准件' : 'Standard')); ?></td>
                                    <td><?php echo esc_html(implode(', ', lulu_base_product_list(get_the_ID(), 'applications'))); ?></td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
                <p class="table-note"><?php echo esc_html($is_zh ? '以上数值为已确认的产品系列范围。材料、表面处理（如镀锌）、执行标准及公差将根据具体需求确认——详情请联系我们。' : 'Values shown are confirmed portfolio ranges. Materials, surface treatments, standards and tolerances are confirmed per requirement — contact us for details.'); ?></p>
            </div>
        </section>

        <section class="source-section source-category-rfq">
            <div class="container">
                <div class="source-section-heading">
                    <p class="eyebrow"><?php echo esc_html($is_zh ? '询价' : 'RFQ'); ?></p>
                    <h2><?php echo esc_html(($is_zh ? '获取以下产品的报价 ' : 'Request a quotation for ') . $category_short); ?></h2>
                </div>
                <div class="source-category-rfq-layout">
                    <div class="source-form-card">
                        <?php echo lulu_base_rfq_shortcode([
                            'variant'      => 'product',
                            'submit_label' => lulu_base_option('product_cta_label'),
                            'bare'         => '1',
                        ]); ?>
                    </div>
                    <aside class="source-category-aside">
                        <div class="source-info-card">
                            <p class="eyebrow"><?php echo esc_html($is_zh ? '其他类别' : 'Other categories'); ?></p>
                            <ul>
                                <?php foreach (lulu_base_source_data('categories', []) as $other) : ?>
                                    <?php if (($other['slug'] ?? '') === ($term->slug ?? '')) continue; ?>
                                    <li><a href="<?php echo esc_url(home_url('/products/' . sanitize_title($other['slug'] ?? ''))); ?>"><?php echo esc_html($is_zh ? ($other['short_zh'] ?? $other['short'] ?? '') : ($other['short'] ?? $other['name'] ?? '')); ?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <div class="source-info-card">
                            <p><strong><?php echo esc_html($is_zh ? '多种规格需求？' : 'Multiple specifications?'); ?></strong></p>
                            <p><?php echo esc_html($is_zh ? '上传您的物料清单（BOM）或采购清单，无需逐项填写。' : 'Upload your BOM or purchasing list instead of entering each item.'); ?></p>
                            <a class="button button-outline button-small" href="<?php echo esc_url(home_url('/contact?tab=bom')); ?>"><?php echo esc_html($is_zh ? '上传BOM' : 'Upload BOM'); ?></a>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    <?php endif; ?>
</main>
<?php get_footer(); ?>
