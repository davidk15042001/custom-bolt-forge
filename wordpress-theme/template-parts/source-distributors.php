<?php
$is_zh = lulu_base_is_chinese();
$items = [
    ['Broad product portfolio across nine fastener categories', '覆盖九大紧固件品类的丰富产品线'],
    ['Bulk sourcing and repeat purchasing', '批量采购与长期复购'],
    ['Standard catalogue products', '标准目录产品'],
    ['Special and drawing-based products', '特殊及来图定制产品'],
    ['Mixed RFQs across multiple categories', '跨品类混合询价'],
    ['Regional sales agent discussions for construction, machinery, steel, fastener, solar and industrial procurement networks', '面向建筑、机械、钢结构、紧固件、光伏及工业采购网络的区域销售代理合作洽谈'],
];
?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '合作伙伴' : 'Partnership'); ?></p><h1><?php echo esc_html($is_zh ? '成为紧固件经销商' : 'Become a Fastener Distributor'); ?></h1>
    <p><?php echo esc_html($is_zh ? '面向经销商、进口商、建筑供应商及光伏五金分销商的全系列产品合作。' : 'Cooperation for distributors, importers, construction suppliers and solar hardware resellers across the full portfolio.'); ?></p>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '合作范围' : 'Cooperation Scope'); ?></p><h2><?php echo esc_html($is_zh ? '合作可涵盖的内容' : 'What cooperation can cover'); ?></h2></div>
    <div class="source-scope-grid"><?php foreach ($items as $item) : ?><div class="source-rule-card"><?php echo esc_html($is_zh ? $item[1] : $item[0]); ?></div><?php endforeach; ?></div>
    <p class="source-muted-copy"><?php echo esc_html($is_zh ? '商务条款、区域安排及代理条件将逐一商议。在签署书面协议之前，不隐含任何排他性安排。' : 'Commercial terms, territory arrangements and agent conditions are discussed individually. No exclusivity is implied before a written agreement.'); ?></p>
</div></section>
<section class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '申请' : 'Application'); ?></p><h2><?php echo esc_html($is_zh ? '提交经销商申请' : 'Submit Distributor Application'); ?></h2></div>
    <div class="source-form-card"><?php echo lulu_base_rfq_shortcode(['variant' => 'distributor', 'submit_label' => $is_zh ? '提交经销商申请' : 'Submit Distributor Application', 'bare' => '1']); ?></div>
</div></section>
