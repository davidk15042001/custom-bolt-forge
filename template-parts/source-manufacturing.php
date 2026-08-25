<?php $is_zh = lulu_base_is_chinese(); $stages = ['Raw Material', 'Cold Forming', 'Hot Forging', 'Machining', 'Thread Rolling', 'Heat Treatment', 'Surface Treatment', 'Inspection', 'Packaging']; ?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '生产能力' : 'Capability'); ?></p>
    <h1><?php echo esc_html($is_zh ? '生产制造能力' : 'Manufacturing Capability'); ?></h1>
    <p><?php echo esc_html($is_zh ? '在提供标准目录产品的同时，也可根据图纸生产特殊及大直径零件。' : 'Supply covers standard catalogue products alongside drawing-based production for special and large-diameter components.'); ?></p>
    <div class="source-page-hero-actions"><a class="button" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html($is_zh ? '洽谈您的需求' : 'Discuss Your Requirement'); ?></a></div>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '工艺流程' : 'Process Stages'); ?></p><h2><?php echo esc_html($is_zh ? '生产流程' : 'Production sequence'); ?></h2></div>
    <div class="source-stage-grid"><?php foreach ($stages as $index => $stage) : ?><div class="source-stage-card"><p class="source-spec-value"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></p><p><?php echo esc_html($is_zh ? lulu_base_source_translate($stage) : $stage); ?></p><small><?php echo esc_html($is_zh ? '根据已确认的产品规格执行——具体工艺详情请联系我们。' : 'Applied according to the confirmed product specification — contact us for details of a specific process.'); ?></small></div><?php endforeach; ?></div>
    <p class="source-muted-copy"><?php echo esc_html($is_zh ? '产品需求明确后，可按需提供设备清单、产能及工艺认证。我们不会发布未经确认的数据。' : 'Equipment lists, capacities and process certifications are shared on request once the product requirement is defined. We do not publish figures that have not been confirmed.'); ?></p>
</div></section>
<section class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '重型及大直径' : 'Heavy & Large-Diameter'); ?></p><h2><?php echo esc_html($is_zh ? '大型紧固件制造' : 'Large fastener manufacturing'); ?></h2></div>
    <p class="source-muted-copy"><?php echo esc_html($is_zh ? '针对重工业应用，定制螺栓涵盖M30至M120范围。生产数量、尺寸及表面处理将根据图纸逐案确认。' : 'Custom bolts are handled in an M30 to M120 category for heavy industrial applications. Production quantity, dimensions and finishing are agreed case by case against your drawing.'); ?></p>
    <a class="button" href="<?php echo esc_url(home_url('/custom-manufacturing')); ?>"><?php echo esc_html($is_zh ? '非标定制加工' : 'Custom Manufacturing'); ?></a>
</div></section>
