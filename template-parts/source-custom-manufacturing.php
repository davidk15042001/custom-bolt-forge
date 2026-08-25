<?php
$is_zh = lulu_base_is_chinese();
$capabilities = [
    ['Special Bolt Shapes', '特殊形状螺栓', 'T-slot, eye, articulated, square-head and other non-standard geometries.', 'T型槽螺栓、吊环螺栓、活节螺栓、方头螺栓及其他非标外形。'],
    ['Oversized Components', '超大规格部件', 'Custom bolts handled in the M30 to M120 category.', '可定制生产M30至M120规格的大型螺栓。'],
    ['Extended Fasteners', '加长紧固件', 'Extra-long components beyond standard catalogue lengths.', '超出标准目录长度范围的加长部件。'],
    ['Reverse Thread', '反向螺纹', 'Left-hand thread screws for specific mechanical requirements.', '用于特定机械需求的左旋螺纹螺钉。'],
    ['Trapezoidal Threads', '梯形螺纹', 'Trapezoidal threaded rods for motion and load transfer.', '用于传动与承载的梯形螺纹杆。'],
    ['Drawing-Based Products', '来图定制产品', 'Components manufactured to your PDF, DWG, DXF or STEP file.', '根据您提供的PDF、DWG、DXF或STEP文件加工的部件。'],
    ['Application-Specific Components', '特定应用部件', 'Parts defined by application, sample or existing part.', '根据应用场景、样品或现有零件确定规格的部件。'],
];
$workflow = lulu_base_source_data('workflow', []);
?>
<section class="source-page-hero blueprint-grid"><div class="container">
    <p class="eyebrow"><?php echo esc_html($is_zh ? '定制加工' : 'Custom Manufacturing'); ?></p><h1><?php echo esc_html($is_zh ? '发送图纸给我们，我们将为您评估需求。' : 'Send Us Your Drawing. We\'ll Review the Requirement.'); ?></h1>
    <p><?php echo esc_html($is_zh ? '特殊外形、超大规格部件、反向螺纹及来图定制产品，均由我们的技术与商务团队进行评估。' : 'Special geometries, oversized parts, reverse threads and drawing-based components reviewed by our technical and commercial team.'); ?></p>
    <div class="source-page-hero-actions"><a class="button" href="#drawing"><?php echo esc_html($is_zh ? '上传技术图纸' : 'Upload Technical Drawing'); ?></a><a class="button button-outline" href="<?php echo esc_url(home_url('/products/custom-fasteners')); ?>"><?php echo esc_html($is_zh ? '定制产品系列' : 'Custom Portfolio'); ?></a></div>
</div></section>
<section class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '加工能力' : 'Capabilities'); ?></p><h2><?php echo esc_html($is_zh ? '可定制内容' : 'What can be customised'); ?></h2></div>
    <div class="source-capability-grid"><?php foreach ($capabilities as $item) : ?><article class="source-info-card"><h3><?php echo esc_html($is_zh ? $item[1] : $item[0]); ?></h3><p><?php echo esc_html($is_zh ? $item[3] : $item[2]); ?></p></article><?php endforeach; ?></div>
</div></section>
<section class="source-section source-section-dark"><div class="container source-two-column">
    <div><?php echo do_shortcode('[lulu_demo_image asset="large-bolts.jpg" alt="Large diameter custom bolt on a machining table"]'); ?></div>
    <div><p class="eyebrow"><?php echo esc_html($is_zh ? '大型及超大规格紧固件' : 'Large & Oversized Fasteners'); ?></p><h2><?php echo esc_html($is_zh ? '定制螺栓，规格覆盖M30至M120' : 'Custom bolts from M30 up to M120'); ?></h2><p><?php echo esc_html($is_zh ? '适用于重型机械、钢结构、基础设施、能源、矿山设备、重型运输及工业厂房。长度、等级、材质与表面处理将根据您的技术文件确认——详情请联系我们。' : 'For heavy machinery, steel construction, infrastructure, energy, mining equipment, heavy transport and industrial plants. Length, grade, material and finish are agreed against your documentation — contact us for details.'); ?></p><a class="button button-accent" href="#drawing"><?php echo esc_html($is_zh ? '获取大型螺栓报价' : 'Request Large Bolt Quote'); ?></a></div>
</div></section>
<section class="source-section source-section-muted"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '工艺流程' : 'Process'); ?></p><h2><?php echo esc_html($is_zh ? '定制流程' : 'Customisation Workflow'); ?></h2></div>
    <ol class="source-workflow-grid"><?php foreach ($workflow as $item) : ?><li class="source-info-card"><p class="source-spec-value"><?php echo esc_html($item['step']); ?></p><p><strong><?php echo esc_html($is_zh ? ($item['title_zh'] ?? $item['title']) : $item['title']); ?></strong></p><small><?php echo esc_html($is_zh ? ($item['text_zh'] ?? $item['text']) : $item['text']); ?></small></li><?php endforeach; ?></ol>
</div></section>
<section id="drawing" class="source-section"><div class="container">
    <div class="source-section-heading"><p class="eyebrow"><?php echo esc_html($is_zh ? '定制紧固件询价' : 'Custom Fastener RFQ'); ?></p><h2><?php echo esc_html($is_zh ? '提交技术需求' : 'Submit Technical Requirement'); ?></h2></div>
    <div class="source-two-column"><div class="source-form-card"><?php echo lulu_base_rfq_shortcode(['variant' => 'custom', 'submit_label' => $is_zh ? '提交技术需求' : 'Submit Technical Requirement', 'bare' => '1']); ?></div><aside><?php echo do_shortcode('[lulu_demo_image asset="custom-drawing.jpg" alt="Engineering drawing with dimension lines and machined fastener"]'); ?><p class="source-info-card"><?php echo esc_html($is_zh ? '支持的文件格式：PDF、DWG、DXF、STEP、STP、JPG、PNG、XLSX。如果您只有样品或应用场景说明，也可以直接提供——具体规格将在技术评审阶段确定。' : 'Accepted files: PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX. If you only have a sample or an application description, send that instead — the specification is defined during technical review.'); ?></p></aside></div>
</div></section>
