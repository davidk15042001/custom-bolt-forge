<?php $is_zh = lulu_base_is_chinese(); ?>
<section class="source-page-hero blueprint-grid"><div class="container"><p class="eyebrow"><?php echo esc_html($is_zh ? '请求中心' : 'Request Center'); ?></p><h1><?php echo esc_html($is_zh ? '将您的需求发送给我们的销售工程团队' : 'Send your requirement to our sales engineering team'); ?></h1><p><?php echo esc_html($is_zh ? '请选择与您需求相符的请求类型。每项请求都会在内部转交给相应的负责团队。' : 'Choose the request type that matches your need. Each request is routed to the responsible team internally.'); ?></p><div class="source-page-hero-actions"><a class="button button-outline" href="<?php echo esc_url(home_url('/rfq')); ?>"><?php echo esc_html($is_zh ? '询价清单 (0)' : 'RFQ List (0)'); ?></a></div></div></section>
<section class="source-section"><div class="container">
    <div class="source-contact-tabs" data-source-tabs>
        <div class="source-tab-list" role="tablist">
            <?php
            $tabs = [
                ['product', 'Product RFQ', '产品询价'],
                ['bom', 'BOM RFQ', 'BOM清单询价'],
                ['custom', 'Custom Drawing', '定制图纸'],
                ['project', 'Project Inquiry', '项目询盘'],
                ['distributor', 'Distributor Application', '经销商申请'],
                ['general', 'General Inquiry', '一般咨询'],
            ];
            foreach ($tabs as $index => $tab) :
            ?>
                <button type="button" role="tab" aria-selected="<?php echo esc_attr($index === 0 ? 'true' : 'false'); ?>" data-source-tab="<?php echo esc_attr($tab[0]); ?>"><?php echo esc_html($is_zh ? $tab[2] : $tab[1]); ?></button>
            <?php endforeach; ?>
        </div>
        <div class="source-contact-layout">
            <div class="source-contact-panels">
                <?php foreach ($tabs as $index => $tab) : ?>
                    <div class="source-contact-panel<?php echo $index === 0 ? ' is-active' : ''; ?>" role="tabpanel" data-source-panel="<?php echo esc_attr($tab[0]); ?>">
                        <?php if ($tab[0] === 'bom') : ?><p class="source-muted-copy"><?php echo esc_html($is_zh ? '有多种紧固件规格？可直接上传您的BOM或采购清单（XLS、XLSX、CSV、PDF），无需逐项手动填写。' : 'Have multiple fastener specifications? Upload your BOM or purchasing list (XLS, XLSX, CSV, PDF) instead of entering each product manually.'); ?></p><?php endif; ?>
                        <div class="source-form-card"><?php echo lulu_base_rfq_shortcode(['variant' => $tab[0], 'submit_label' => $is_zh ? ($tab[2]) : $tab[1], 'bare' => '1']); ?></div>
                    </div>
                <?php endforeach; ?>
            </div>
            <aside class="source-contact-aside">
                <div class="source-info-card"><p class="eyebrow"><?php echo esc_html($is_zh ? '公司信息' : 'Company'); ?></p><p><strong>Hebei Xiangjinxin Metal Products Co., Ltd.</strong></p><p><?php echo esc_html(lulu_base_option('address')); ?></p><p><?php echo esc_html(lulu_base_option('email')); ?></p></div>
                <div class="source-info-card"><p class="eyebrow"><?php echo esc_html($is_zh ? '有助于快速报价的信息' : 'Helpful for a fast quotation'); ?></p><ul><li><?php echo esc_html($is_zh ? '产品类型及数量' : 'Product type and quantity'); ?></li><li><?php echo esc_html($is_zh ? '直径、长度及螺纹规格' : 'Diameter, length and thread'); ?></li><li><?php echo esc_html($is_zh ? '等级、材质及表面处理' : 'Grade, material and surface'); ?></li><li><?php echo esc_html($is_zh ? '执行标准或图纸编号' : 'Standard or drawing reference'); ?></li><li><?php echo esc_html($is_zh ? '应用场景及目标市场' : 'Application and target market'); ?></li></ul></div>
            </aside>
        </div>
    </div>
</div></section>
