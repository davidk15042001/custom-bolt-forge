<?php
$is_zh = lulu_base_is_chinese();
$docs = [
    ['Product Catalog', '产品目录', 'Overview of the fastener portfolio by category.', '按类别划分的紧固件产品概览。'],
    ['Technical Datasheets', '技术数据表', 'Specification sheets for confirmed product families.', '已确认产品系列的规格数据表。'],
    ['Drawings', '图纸', 'Dimensional drawings for standard and custom items.', '标准件及定制件的尺寸图纸。'],
    ['Standards', '执行标准', 'Applicable standard references per quoted item.', '每个报价项目对应的适用标准参考。'],
    ['Certificates', '认证证书', 'Certification documents relevant to your product scope.', '与您的产品范围相关的认证文件。'],
    ['Installation Information', '安装信息', 'Handling and installation notes where available.', '如有提供，将附带搬运及安装说明。'],
    ['RFQ Templates', '询价模板', 'Structured templates for product and BOM requests.', '用于产品及BOM请求的标准化模板。'],
];
?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '资料中心' : 'Resources'); ?></p><h1><?php echo esc_html($is_zh ? '技术资料' : 'Technical Resources'); ?></h1>
    <p><?php echo esc_html($is_zh ? '文件将根据您的产品范围提供。请告知我们您的需求，我们会发送相关文件。' : 'Documents are released against your product scope. Tell us what you need and we will send the relevant files.'); ?></p>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '可提供文件' : 'Available Documents'); ?></p><h2><?php echo esc_html($is_zh ? '可申请的内容' : 'What you can request'); ?></h2></div>
    <div class="source-info-grid"><?php foreach ($docs as $doc) : ?><article class="source-info-card"><h3><?php echo esc_html($is_zh ? $doc[1] : $doc[0]); ?></h3><p><?php echo esc_html($is_zh ? $doc[3] : $doc[2]); ?></p></article><?php endforeach; ?></div>
</div></section>
<section class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '文件申请' : 'Document Request'); ?></p><h2><?php echo esc_html($is_zh ? '申请技术文件' : 'Request Technical Document'); ?></h2></div>
    <div class="source-form-card"><?php echo lulu_base_rfq_shortcode(['variant' => 'general', 'submit_label' => $is_zh ? '申请文件' : 'Request Document', 'bare' => '1']); ?></div>
</div></section>
