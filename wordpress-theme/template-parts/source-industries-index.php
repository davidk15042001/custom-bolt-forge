<?php
$industries = lulu_base_source_data('industries', []);
$text = static function ($english, $chinese = '') {
    return lulu_base_is_chinese() ? ($chinese ?: lulu_base_source_translate($english)) : $english;
};
?>
<section class="source-page-hero blueprint-grid">
    <div class="container">
        <p class="eyebrow"><?php echo esc_html($text('Applications', '应用领域')); ?></p>
        <h1><?php echo esc_html($text('Industries We Serve', '服务行业')); ?></h1>
        <p><?php echo esc_html($text('Product selection, specification and supply arrangements organised around the way industrial buyers purchase.', '产品选型、规格及供应安排均围绕工业采购方的实际采购方式组织。')); ?></p>
    </div>
</section>
<section class="source-section source-industries-index">
    <div class="container">
        <div class="source-industry-grid">
            <?php foreach ($industries as $industry) : ?>
                <?php
                $title = lulu_base_is_chinese() ? ($industry['headline_zh'] ?? $industry['headline']) : $industry['headline'];
                $description = lulu_base_is_chinese() ? ($industry['description_zh'] ?? $industry['description']) : $industry['description'];
                $products = lulu_base_is_chinese() ? ($industry['products_zh'] ?? $industry['products']) : $industry['products'];
                ?>
                <a class="source-industry-card" href="<?php echo esc_url(home_url('/industries/' . sanitize_title($industry['slug']))); ?>">
                    <h2><?php echo esc_html($title); ?></h2>
                    <p><?php echo esc_html($description); ?></p>
                    <span><?php echo esc_html(implode(' · ', $products)); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
