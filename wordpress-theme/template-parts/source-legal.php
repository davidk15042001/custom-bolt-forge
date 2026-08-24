<?php
$is_zh = lulu_base_is_chinese();
$slug = get_post_meta(get_the_ID(), '_lulu_base_source_legal', true) ?: get_post_field('post_name', get_the_ID());
$docs = [
    'privacy' => [
        'title' => 'Privacy', 'title_zh' => '隐私政策',
        'body' => [
            ['We process the contact and requirement details you submit through our request forms solely to review your enquiry, prepare a quotation and communicate with you about it.', '我们仅将您通过请求表单提交的联系方式及需求信息用于审核您的咨询、准备报价并与您沟通相关事宜。'],
            ['Uploaded files such as BOMs, drawings and specifications are treated as confidential business information and shared internally only with the technical and commercial team handling your request.', '上传的BOM清单、图纸及规格等文件将作为保密商业信息处理，仅在内部与负责处理您请求的技术及商务团队共享。'],
            ['You can ask us to correct or delete your data at any time by contacting sales@xiangjinxin-fasteners.com.', '您可以随时通过联系 sales@xiangjinxin-fasteners.com 要求更正或删除您的数据。'],
        ],
    ],
    'terms' => [
        'title' => 'Terms', 'title_zh' => '条款',
        'body' => [
            ['Information published on this website describes the product portfolio and capability scope. It does not constitute a binding offer.', '本网站发布的信息用于介绍产品系列及能力范围，不构成具有约束力的要约。'],
            ['Specifications, quantities, packaging, delivery and commercial terms become binding only in a written quotation or order confirmation issued by Hebei Xiangjinxin Metal Products Co., Ltd.', '规格、数量、包装、交货及商务条款仅在由 Hebei Xiangjinxin Metal Products Co., Ltd. 出具的书面报价或订单确认中方具有约束力。'],
            ['Technical values are confirmed per item before quotation. Where a value is not published, it has not yet been confirmed for that product.', '技术参数将在报价前逐项确认。如某项数值未公开，则表示该产品尚未确认该参数。'],
        ],
    ],
    'cookies' => [
        'title' => 'Cookies', 'title_zh' => 'Cookie政策',
        'body' => [
            ['This website stores your RFQ list in your browser\'s local storage so your selection is preserved between visits. It is not transmitted until you submit a request.', '本网站将您的询价清单存储在浏览器本地存储中，以便在多次访问间保留您的选择。在您提交请求之前，该数据不会被传输。'],
            ['No advertising or third-party tracking cookies are set by default.', '默认情况下不会设置任何广告或第三方跟踪Cookie。'],
        ],
    ],
];
$document = $docs[$slug] ?? $docs['privacy'];
?>
<section class="source-page-hero blueprint-grid"><div class="container"><p class="eyebrow"><?php echo esc_html($is_zh ? '法律信息' : 'Legal'); ?></p><h1><?php echo esc_html($is_zh ? $document['title_zh'] : $document['title']); ?></h1><p><?php echo esc_html(get_option('blogname')); ?></p></div></section>
<section class="source-section"><div class="container source-legal-copy"><?php foreach ($document['body'] as $paragraph) : ?><p><?php echo esc_html($is_zh ? $paragraph[1] : $paragraph[0]); ?></p><?php endforeach; ?></div></section>
