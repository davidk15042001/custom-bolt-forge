<?php
$is_zh = lulu_base_is_chinese();
$scope = ['Single product', 'Multiple products', 'Mixed specifications', 'Bulk quantities', 'Annual purchasing', 'Project requirements'];
?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '批发供应' : 'Wholesale'); ?></p>
    <h1><?php echo esc_html($is_zh ? '经销商、进口商及工业采购方紧固件供应' : 'Fastener Supply for Distributors, Importers and Industrial Buyers'); ?></h1>
    <p><?php echo esc_html($is_zh ? '可针对全系列产品询价——从单一规格到完整的混合采购清单。' : 'Request quotations across the full portfolio — from a single specification to a complete mixed purchasing list.'); ?></p>
    <div class="source-page-hero-actions"><a class="button" href="#form"><?php echo esc_html($is_zh ? '获取批发报价' : 'Request Wholesale Quote'); ?></a><a class="button button-outline" href="<?php echo esc_url(home_url('/products')); ?>"><?php echo esc_html($is_zh ? '浏览产品' : 'Browse Products'); ?></a></div>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '范围' : 'Scope'); ?></p><h2><?php echo esc_html($is_zh ? '可申请报价的内容' : 'What you can request a quotation for'); ?></h2></div>
    <div class="source-scope-grid"><?php foreach ($scope as $item) : ?><div class="source-rule-card"><?php echo esc_html($is_zh ? lulu_base_source_translate($item) : $item); ?></div><?php endforeach; ?></div>
    <p class="source-muted-copy"><?php echo esc_html($is_zh ? '包装、文件、商务条款及交付安排根据需求确认。请提供您已有的规格信息，其余内容由我们的团队协助确认。' : 'Packaging, documentation, commercial terms and delivery arrangements are confirmed per requirement. Provide the specifications you have and our team will clarify the rest.'); ?></p>
</div></section>
<section id="form" class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '批发询价' : 'Wholesale RFQ'); ?></p><h2><?php echo esc_html($is_zh ? '获取批发价格' : 'Request Wholesale Pricing'); ?></h2></div>
    <div class="source-form-card"><?php echo lulu_base_rfq_shortcode(['variant' => 'product', 'submit_label' => $is_zh ? '提交询价' : 'Submit RFQ', 'bare' => '1']); ?></div>
</div></section>
