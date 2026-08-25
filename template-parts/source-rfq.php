<?php $is_zh = lulu_base_is_chinese(); ?>
<section class="source-page-hero blueprint-grid">
    <div class="container">
        <p class="eyebrow"><?php echo esc_html($is_zh ? '询价请求' : 'Request for Quotation'); ?></p>
        <h1><?php echo esc_html($is_zh ? '询价清单' : 'RFQ List'); ?> (<span data-rfq-count>0</span>)</h1>
        <p><?php echo esc_html($is_zh ? '为每一行添加尺寸、数量及技术备注，然后一并提交请求。' : 'Add sizes, quantities and technical notes to each line, then submit one combined request.'); ?></p>
    </div>
</section>
<section class="source-section">
    <div class="container">
        <div class="source-rfq-page" data-rfq-page>
            <div class="source-empty-state" data-rfq-empty>
                <p><?php echo esc_html($is_zh ? '您的询价清单为空' : 'Your RFQ list is empty'); ?></p>
                <span><?php echo esc_html($is_zh ? '请从产品目录中添加产品，或直接提交BOM清单或图纸。' : 'Add products from the catalogue, or submit a BOM or drawing directly.'); ?></span>
                <div class="source-page-hero-actions">
                    <a class="button" href="<?php echo esc_url(home_url('/products')); ?>"><?php echo esc_html($is_zh ? '浏览产品' : 'Browse Products'); ?></a>
                    <a class="button button-outline" href="<?php echo esc_url(home_url('/contact?tab=bom')); ?>"><?php echo esc_html($is_zh ? '上传BOM清单' : 'Upload BOM'); ?></a>
                </div>
            </div>
            <div class="source-rfq-items" data-rfq-items></div>
            <div class="source-rfq-actions" data-rfq-actions>
                <a class="button" href="<?php echo esc_url(add_query_arg(['tab' => 'product', 'from' => 'rfq'], lulu_base_contact_url())); ?>"><?php echo esc_html($is_zh ? '申请报价' : 'Request Quotation'); ?></a>
                <a class="button button-outline" href="<?php echo esc_url(home_url('/contact?tab=bom')); ?>"><?php echo esc_html($is_zh ? '改为上传BOM清单' : 'Upload BOM Instead'); ?></a>
                <button class="button button-ghost" type="button" data-rfq-clear><?php echo esc_html($is_zh ? '清空清单' : 'Clear list'); ?></button>
            </div>
        </div>
    </div>
</section>
