<?php
$industry_slug = get_post_meta(get_the_ID(), '_lulu_base_source_industry', true) ?: get_post_field('post_name', get_the_ID());
$industries = lulu_base_source_data('industries', []);
$industry = null;
foreach ($industries as $candidate) {
    if (($candidate['slug'] ?? '') === $industry_slug) {
        $industry = $candidate;
        break;
    }
}
if (!$industry) {
    return;
}
$is_zh = lulu_base_is_chinese();
$title = $is_zh ? ($industry['headline_zh'] ?? $industry['headline']) : $industry['headline'];
$description = $is_zh ? ($industry['description_zh'] ?? $industry['description']) : $industry['description'];
$products = $is_zh ? ($industry['products_zh'] ?? $industry['products']) : $industry['products'];
$cta = $is_zh ? ($industry['cta_zh'] ?? $industry['cta']) : $industry['cta'];
?>
<section class="source-page-hero blueprint-grid">
    <div class="container">
        <p class="eyebrow"><?php echo esc_html($is_zh ? '行业' : 'Industry'); ?></p>
        <h1><?php echo esc_html($title); ?></h1>
        <p><?php echo esc_html($description); ?></p>
        <div class="source-page-hero-actions">
            <a class="button" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html($cta); ?></a>
            <a class="button button-outline" href="<?php echo esc_url(home_url('/products')); ?>"><?php echo esc_html($is_zh ? '浏览产品' : 'Browse Products'); ?></a>
        </div>
    </div>
</section>
<section class="source-section">
    <div class="container">
        <div class="source-section-heading">
            <p class="eyebrow"><?php echo esc_html($is_zh ? '相关产品' : 'Relevant Products'); ?></p>
            <h2><?php echo esc_html($is_zh ? '典型紧固部件' : 'Typical fastening components'); ?></h2>
        </div>
        <div class="source-relevant-grid">
            <?php foreach ($products as $product) : ?>
                <div class="source-rule-card"><?php echo esc_html($product); ?></div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<section class="source-section source-section-muted">
    <div class="container">
        <div class="source-section-heading">
            <p class="eyebrow"><?php echo esc_html($is_zh ? '询价' : 'RFQ'); ?></p>
            <h2><?php echo esc_html($cta); ?></h2>
        </div>
        <div class="source-form-shell">
            <?php echo lulu_base_rfq_shortcode([
                'variant'      => 'project',
                'title'        => $cta,
                'submit_label' => $cta,
                'bare'         => '1',
            ]); ?>
        </div>
    </div>
</section>
<section class="source-section source-other-industries">
    <div class="container">
        <p class="eyebrow"><?php echo esc_html($is_zh ? '其他行业' : 'Other industries'); ?></p>
        <div class="source-industry-pills">
            <?php foreach ($industries as $other) : ?>
                <?php if (($other['slug'] ?? '') === $industry_slug) continue; ?>
                <a href="<?php echo esc_url(home_url('/industries/' . sanitize_title($other['slug']))); ?>"><?php echo esc_html($is_zh ? ($other['name_zh'] ?? $other['name']) : $other['name']); ?></a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
