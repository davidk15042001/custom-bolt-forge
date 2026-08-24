<?php $is_zh = lulu_base_is_chinese(); $steps = ['Incoming Materials', 'Production Inspection', 'Dimension Inspection', 'Thread Inspection', 'Mechanical Testing', 'Surface Inspection', 'Final Inspection', 'Packaging']; ?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '质量' : 'Quality'); ?></p><h1><?php echo esc_html($is_zh ? '质量控制' : 'Quality Control'); ?></h1>
    <p><?php echo esc_html($is_zh ? '检验按照每个订单确认的规格执行。生产前确认检验范围及文件要求。' : 'Inspection is applied against the specification confirmed for each order. Scope and documentation are agreed before production.'); ?></p>
    <div class="source-page-hero-actions"><a class="button" href="<?php echo esc_url(home_url('/resources')); ?>"><?php echo esc_html($is_zh ? '申请文件' : 'Request Documentation'); ?></a></div>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '检验流程' : 'Inspection Flow'); ?></p><h2><?php echo esc_html($is_zh ? '控制流程' : 'Control stages'); ?></h2></div>
    <ol class="source-stage-grid"><?php foreach ($steps as $index => $step) : ?><li class="source-stage-card"><p class="source-spec-value"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></p><p><?php echo esc_html($is_zh ? lulu_base_source_translate($step) : $step); ?></p></li><?php endforeach; ?></ol>
</div></section>
<section class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '认证与标准' : 'Certifications & Standards'); ?></p><h2><?php echo esc_html($is_zh ? '按需提供文件' : 'Documentation on request'); ?></h2></div>
    <div class="source-two-card-grid"><article class="source-info-card"><h3><?php echo esc_html($is_zh ? '认证' : 'Certifications'); ?></h3><p><?php echo esc_html($is_zh ? '如适用于您的产品范围，可提供认证记录——名称、标准、颁发机构、编号、日期、产品范围及PDF。详情请联系我们。' : 'Certification records — name, standard, issuer, number, date, product scope and PDF — are provided when they apply to your product scope. Contact us for details.'); ?></p></article><article class="source-info-card"><h3><?php echo esc_html($is_zh ? '执行标准' : 'Standards'); ?></h3><p><?php echo esc_html($is_zh ? '产品可按DIN、ISO、GB、ANSI、ASTM、JIS、客户标准或图纸报价。适用标准将在报价前逐项确认。' : 'Products can be quoted against DIN, ISO, GB, ANSI, ASTM, JIS, a customer standard or a drawing. The applicable standard is confirmed per item before quotation.'); ?></p></article></div>
</div></section>
