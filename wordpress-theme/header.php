<?php
$source_company = lulu_base_source_data('company', []);
$source_categories = lulu_base_source_data('categories', []);
$source_industries = array_slice(lulu_base_source_data('industries', []), 0, 7);
$source_short_name = $source_company['shortName'] ?? get_bloginfo('name');
$custom_links = [
    ['en' => 'Custom Bolts', 'zh' => '非标螺栓', 'path' => '/custom-manufacturing'],
    ['en' => 'Large-Diameter Fasteners', 'zh' => '大规格紧固件', 'path' => '/products/custom-fasteners'],
    ['en' => 'Drawing-Based Parts', 'zh' => '图纸定制件', 'path' => '/custom-manufacturing'],
];
$flat_links = [
    ['en' => 'Wholesale', 'zh' => '批发供应', 'path' => '/wholesale'],
    ['en' => 'Manufacturing', 'zh' => '生产制造', 'path' => '/manufacturing'],
    ['en' => 'Quality', 'zh' => '质量管理', 'path' => '/quality'],
    ['en' => 'Resources', 'zh' => '资料下载', 'path' => '/resources'],
    ['en' => 'Distributors', 'zh' => '经销商', 'path' => '/distributors'],
    ['en' => 'Contact', 'zh' => '联系我们', 'path' => '/contact'],
];
$label = static function ($english, $chinese = '') {
    return lulu_base_is_chinese() ? ($chinese ?: lulu_base_source_translate($english)) : $english;
};
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e('Skip to content', 'lulu-base'); ?></a>

<div class="source-topbar">
    <div class="container source-topbar-inner">
        <p class="source-spec-value"><?php echo esc_html($label('Wholesale · Project Supply · OEM · Custom Fasteners · Drawing-Based Manufacturing', '批发供应 · 工程配套 · OEM · 非标紧固件 · 图纸定制生产')); ?></p>
        <div class="source-topbar-actions">
            <a href="<?php echo esc_url(lulu_base_contact_url()); ?>" class="source-spec-value"><?php echo esc_html($label('Request Quote', '获取报价')); ?> →</a>
            <div class="source-language-switcher" role="group" aria-label="<?php esc_attr_e('Language selection', 'lulu-base'); ?>">
                <a href="<?php echo esc_url(lulu_base_language_url('en')); ?>" <?php if (!lulu_base_is_chinese()) : ?>aria-current="true"<?php endif; ?>>EN</a>
                <a href="<?php echo esc_url(lulu_base_language_url('zh')); ?>" <?php if (lulu_base_is_chinese()) : ?>aria-current="true"<?php endif; ?>>中文</a>
            </div>
        </div>
    </div>
</div>
<header class="source-site-header">
    <div class="container source-header-inner">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="source-brand">
            <span class="source-brand-mark" aria-hidden="true"><?php echo esc_html(strtoupper(substr((string) ($source_company['shortName'] ?? 'X'), 0, 1))); ?></span>
            <span class="source-brand-copy">
                <span class="source-brand-name"><?php echo esc_html($source_short_name); ?></span>
                <span class="source-eyebrow"><?php echo esc_html($label('Industrial Fasteners', '工业紧固件')); ?></span>
            </span>
        </a>

        <nav class="source-desktop-nav" aria-label="<?php esc_attr_e('Primary navigation', 'lulu-base'); ?>">
            <div class="source-nav-dropdown">
                <button type="button"><?php echo esc_html($label('Products', '产品中心')); ?><span aria-hidden="true">⌄</span></button>
                <div class="source-nav-popover">
                    <a href="<?php echo esc_url(home_url('/products')); ?>"><?php echo esc_html($label('All Products', '全部产品')); ?></a>
                    <?php foreach ($source_categories as $category) : ?>
                        <a href="<?php echo esc_url(home_url('/products/' . sanitize_title($category['slug'] ?? ''))); ?>"><?php echo esc_html($label($category['short'] ?? $category['name'] ?? '', $category['short_zh'] ?? '')); ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="source-nav-dropdown">
                <button type="button"><?php echo esc_html($label('Industries', '应用行业')); ?><span aria-hidden="true">⌄</span></button>
                <div class="source-nav-popover">
                    <a href="<?php echo esc_url(home_url('/industries')); ?>"><?php echo esc_html($label('All Industries', '全部行业')); ?></a>
                    <?php foreach ($source_industries as $industry) : ?>
                        <a href="<?php echo esc_url(home_url('/industries/' . sanitize_title($industry['slug'] ?? ''))); ?>"><?php echo esc_html($label($industry['name'] ?? '', $industry['name_zh'] ?? '')); ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="source-nav-dropdown">
                <button type="button"><?php echo esc_html($label('Custom Manufacturing', '非标定制')); ?><span aria-hidden="true">⌄</span></button>
                <div class="source-nav-popover">
                    <?php foreach ($custom_links as $link) : ?>
                        <a href="<?php echo esc_url(home_url($link['path'])); ?>"><?php echo esc_html($label($link['en'], $link['zh'])); ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php foreach (array_slice($flat_links, 0, 4) as $link) : ?>
                <a href="<?php echo esc_url(home_url($link['path'])); ?>"><?php echo esc_html($label($link['en'], $link['zh'])); ?></a>
            <?php endforeach; ?>
        </nav>

        <div class="source-header-actions">
            <a href="<?php echo esc_url(home_url('/rfq')); ?>" class="source-rfq-list">
                <svg class="source-rfq-list-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8v3H8z"/><path d="M6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1"/><path d="M7 11h10M7 15h7"/></svg>
                <span><?php echo esc_html($label('RFQ List', '询价单')); ?> (<span data-rfq-count>0</span>)</span>
            </a>
            <a href="<?php echo esc_url(lulu_base_contact_url()); ?>" class="button source-header-cta"><?php echo esc_html($label('Request Quote', '获取报价')); ?></a>
            <button type="button" class="source-menu-toggle" aria-controls="source-mobile-navigation" aria-expanded="false">
                <span class="screen-reader-text"><?php esc_html_e('Open menu', 'lulu-base'); ?></span>
                <span aria-hidden="true">☰</span>
            </button>
        </div>
    </div>
</header>

<div id="source-mobile-navigation" class="source-mobile-navigation" aria-hidden="true">
    <div class="source-mobile-navigation-inner">
        <button type="button" class="source-mobile-close"><span aria-hidden="true">×</span><span><?php esc_html_e('Close', 'lulu-base'); ?></span></button>
        <div class="source-mobile-section">
            <p class="source-eyebrow"><?php echo esc_html($label('Products', '产品中心')); ?></p>
            <a href="<?php echo esc_url(home_url('/products')); ?>"><?php echo esc_html($label('All Products', '全部产品')); ?></a>
            <?php foreach ($source_categories as $category) : ?>
                <a href="<?php echo esc_url(home_url('/products/' . sanitize_title($category['slug'] ?? ''))); ?>"><?php echo esc_html($label($category['short'] ?? $category['name'] ?? '', $category['short_zh'] ?? '')); ?></a>
            <?php endforeach; ?>
        </div>
        <div class="source-mobile-section">
            <p class="source-eyebrow"><?php echo esc_html($label('Industries', '应用行业')); ?></p>
            <a href="<?php echo esc_url(home_url('/industries')); ?>"><?php echo esc_html($label('All Industries', '全部行业')); ?></a>
            <?php foreach ($source_industries as $industry) : ?>
                <a href="<?php echo esc_url(home_url('/industries/' . sanitize_title($industry['slug'] ?? ''))); ?>"><?php echo esc_html($label($industry['name'] ?? '', $industry['name_zh'] ?? '')); ?></a>
            <?php endforeach; ?>
        </div>
        <div class="source-mobile-section">
            <p class="source-eyebrow"><?php echo esc_html($label('Company', '公司')); ?></p>
            <a href="<?php echo esc_url(home_url('/custom-manufacturing')); ?>"><?php echo esc_html($label('Custom Manufacturing', '非标定制')); ?></a>
            <?php foreach ($flat_links as $link) : ?>
                <a href="<?php echo esc_url(home_url($link['path'])); ?>"><?php echo esc_html($label($link['en'], $link['zh'])); ?></a>
            <?php endforeach; ?>
        </div>
    </div>
</div>
<div class="source-mobile-actions" aria-label="<?php esc_attr_e('Quick actions', 'lulu-base'); ?>">
    <a href="<?php echo esc_url(home_url('/rfq')); ?>">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8v3H8z"/><path d="M6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1"/><path d="M7 11h10M7 15h7"/></svg>
        <?php echo esc_html($label('RFQ', '询价')); ?> (<span data-rfq-count>0</span>)
    </a>
    <a class="source-mobile-actions-primary" href="<?php echo esc_url(lulu_base_contact_url()); ?>">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></svg>
        <?php echo esc_html($label('Request Quote', '获取报价')); ?>
    </a>
</div>
