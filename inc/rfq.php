<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_rfq_variants() {
    return [
        'general' => [
            'label'       => __('General enquiry', 'lulu-base'),
            'description' => __('Tell us what you are sourcing and how our team can help.', 'lulu-base'),
        ],
        'product' => [
            'label'       => __('Product RFQ', 'lulu-base'),
            'description' => __('Request pricing and availability for a standard product.', 'lulu-base'),
        ],
        'bom' => [
            'label'       => __('BOM RFQ', 'lulu-base'),
            'description' => __('Upload a purchasing list instead of entering every line manually.', 'lulu-base'),
        ],
        'custom' => [
            'label'       => __('Custom / drawing-based RFQ', 'lulu-base'),
            'description' => __('Send dimensions, material requirements or a technical drawing for review.', 'lulu-base'),
        ],
        'project' => [
            'label'       => __('Project or BOM RFQ', 'lulu-base'),
            'description' => __('Share a project list, BOM or delivery requirement with our sales team.', 'lulu-base'),
        ],
        'distributor' => [
            'label'       => __('Distributor application', 'lulu-base'),
            'description' => __('Tell us about your markets, customers and product interests.', 'lulu-base'),
        ],
    ];
}

function lulu_base_rfq_allowed_mimes() {
    return [
        'pdf'  => 'application/pdf',
        'xls'  => 'application/vnd.ms-excel',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'csv'  => 'text/csv',
        'doc'  => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png'  => 'image/png',
        'dwg'  => 'application/acad',
        'dxf'  => 'application/dxf',
        'step' => 'application/step',
        'stp'  => 'application/step',
    ];
}

function lulu_base_rfq_notice() {
    $status_value = isset($_GET['lulu_rfq']) && is_scalar($_GET['lulu_rfq']) ? wp_unslash($_GET['lulu_rfq']) : '';
    $status = sanitize_key($status_value);
    if (!in_array($status, ['success', 'error', 'invalid', 'spam', 'rate'], true)) {
        return;
    }

    $success = $status === 'success';
    $message = $success
        ? lulu_base_option('rfq_success_message')
        : ($status === 'invalid'
            ? __('Please complete the required fields and provide a valid business email.', 'lulu-base')
            : ($status === 'rate'
                ? __('Please wait a moment before sending another request.', 'lulu-base')
                : lulu_base_option('rfq_failure_message')));
    ?>
    <div class="rfq-notice <?php echo esc_attr($success ? 'rfq-notice-success' : 'rfq-notice-error'); ?>" role="<?php echo esc_attr($success ? 'status' : 'alert'); ?>">
        <?php echo esc_html($message); ?>
    </div>
    <?php
}

function lulu_base_rfq_field($label, $name, $type = 'text', $required = false, $placeholder = '', $attributes = '') {
    $prefix = isset($GLOBALS['lulu_base_rfq_form_id']) ? sanitize_html_class($GLOBALS['lulu_base_rfq_form_id']) . '-' : '';
    $id = 'lulu-rfq-' . $prefix . sanitize_html_class($name);
    $maxlength = preg_match('/maxlength="([0-9]+)"/', (string) $attributes, $matches)
        ? min(10000, absint($matches[1]))
        : 0;
    ?>
    <div class="form-field">
        <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?><?php if ($required) : ?> <span aria-hidden="true">*</span><?php endif; ?></label>
        <?php if ($type === 'textarea') : ?>
            <textarea id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr($name); ?>" rows="5" <?php if ($required) : ?>required<?php endif; ?> placeholder="<?php echo esc_attr($placeholder); ?>" <?php if ($maxlength) : ?>maxlength="<?php echo esc_attr($maxlength); ?>"<?php endif; ?>></textarea>
        <?php else : ?>
            <input id="<?php echo esc_attr($id); ?>" type="<?php echo esc_attr($type); ?>" name="<?php echo esc_attr($name); ?>" <?php if ($required) : ?>required<?php endif; ?> placeholder="<?php echo esc_attr($placeholder); ?>" <?php if ($maxlength) : ?>maxlength="<?php echo esc_attr($maxlength); ?>"<?php endif; ?>>
        <?php endif; ?>
    </div>
    <?php
}

function lulu_base_rfq_select($label, $name, $options, $required = false, $placeholder = 'Select') {
    $prefix = isset($GLOBALS['lulu_base_rfq_form_id']) ? sanitize_html_class($GLOBALS['lulu_base_rfq_form_id']) . '-' : '';
    $id = 'lulu-rfq-' . $prefix . sanitize_html_class($name);
    ?>
    <div class="form-field">
        <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?><?php if ($required) : ?> <span aria-hidden="true">*</span><?php endif; ?></label>
        <select id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr($name); ?>" <?php if ($required) : ?>required<?php endif; ?>>
            <option value="" <?php selected($required, false); ?>><?php echo esc_html($placeholder); ?></option>
            <?php foreach ((array) $options as $value => $option_label) : ?>
                <?php if (is_int($value)) $value = $option_label; ?>
                <option value="<?php echo esc_attr($value); ?>"><?php echo esc_html($option_label); ?></option>
            <?php endforeach; ?>
        </select>
    </div>
    <?php
}

function lulu_base_rfq_shortcode($atts = []) {
    $atts = shortcode_atts([
        'variant'      => 'general',
        'title'        => '',
        'submit_label' => '',
        'bare'         => '0',
    ], $atts, 'lulu_rfq_form');
    $variant = sanitize_key($atts['variant']);
    $variants = lulu_base_rfq_variants();
    if (!isset($variants[$variant])) {
        $variant = 'general';
    }

    $form_id = wp_unique_id('lulu-rfq-form-');
    $GLOBALS['lulu_base_rfq_form_id'] = $form_id;
    $show_buyer_profile = $variant !== 'general';
    $show_product_fields = in_array($variant, ['product', 'custom', 'project'], true);
    $show_distributor_profile = $variant === 'distributor';
    $is_zh = lulu_base_is_chinese();
    $bare = in_array(strtolower((string) $atts['bare']), ['1', 'true', 'yes'], true);
    $accepts = [
        'product'     => '.pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png',
        'bom'         => '.xls,.xlsx,.csv,.pdf',
        'custom'      => '.pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png,.xlsx',
        'project'     => '.pdf,.xls,.xlsx,.csv,.doc,.docx',
        'distributor' => '.pdf,.xlsx,.csv',
        'general'     => '.pdf,.jpg,.jpeg,.png,.xlsx',
    ];
    $accept = $accepts[$variant] ?? implode(',', array_map(static function ($ext) {
        return '.' . $ext;
    }, array_keys(lulu_base_rfq_allowed_mimes())));
    ob_start();
    ?>
    <?php if (!$bare) : ?>
        <section class="rfq-panel" aria-labelledby="<?php echo esc_attr($form_id); ?>-title">
            <?php lulu_base_rfq_notice(); ?>
            <div class="rfq-panel-heading">
                <div>
                    <p class="eyebrow"><?php echo esc_html($variants[$variant]['label']); ?></p>
                    <h2 id="<?php echo esc_attr($form_id); ?>-title"><?php echo esc_html($atts['title'] ?: __('Tell us what you need', 'lulu-base')); ?></h2>
                </div>
                <p><?php echo esc_html($variants[$variant]['description']); ?></p>
            </div>
    <?php else : ?>
        <div class="rfq-form-bare">
            <?php lulu_base_rfq_notice(); ?>
    <?php endif; ?>
        <form class="rfq-form" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post" enctype="multipart/form-data" data-rfq-form>
            <input type="hidden" name="action" value="lulu_submit_rfq">
            <input type="hidden" name="rfq_variant" value="<?php echo esc_attr($variant); ?>">
            <input type="hidden" name="rfq_cart" value="" data-rfq-cart-field>
            <?php wp_nonce_field('lulu_base_submit_rfq', 'lulu_rfq_nonce'); ?>
            <div class="rfq-form-section">
                <p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? '联系方式' : 'Contact'); ?></p>
                <div class="rfq-form-grid rfq-contact-grid">
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '姓名' : 'Full name', 'name', 'text', true, '', 'maxlength="100"'); ?>
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '公司名称' : 'Company', 'company', 'text', true, '', 'maxlength="120"'); ?>
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '企业邮箱' : 'Business email', 'email', 'email', true, '', 'maxlength="160"'); ?>
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '电话 / WhatsApp / 微信' : 'Phone / WhatsApp / WeChat', 'phone', 'text', false, '', 'maxlength="60"'); ?>
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '国家' : 'Country', 'country', 'text', true, '', 'maxlength="80"'); ?>
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '网站' : 'Website', 'website', 'text', false, lulu_base_is_chinese() ? '选填' : 'Optional', 'maxlength="160"'); ?>
                </div>
            </div>
            <?php if ($show_buyer_profile) : ?>
                <div class="rfq-form-section">
                    <p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? '采购方信息' : 'Buyer profile'); ?></p>
                    <div class="rfq-form-grid rfq-buyer-grid">
                        <?php
                        $buyer_types = lulu_base_source_data('buyer_types', ['Distributor', 'Wholesaler', 'Importer', 'Manufacturer', 'Construction Company', 'Steel Structure Company', 'Solar Company', 'EPC', 'Engineering Company', 'Project Buyer', 'Other']);
                        $buyer_options = [];
                        foreach ($buyer_types as $buyer_type) {
                            $buyer_options[$buyer_type] = lulu_base_is_chinese() ? lulu_base_source_translate($buyer_type) : $buyer_type;
                        }
                        ?>
                        <?php lulu_base_rfq_select(lulu_base_is_chinese() ? '采购类型' : 'Buyer type', 'buyerType', $buyer_options, false, lulu_base_is_chinese() ? '请选择' : 'Select'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '目标市场' : 'Target market', 'market', 'text', false, lulu_base_is_chinese() ? '选填' : 'Optional', 'maxlength="120"'); ?>
                    </div>
                </div>
            <?php endif; ?>
            <?php if ($show_product_fields) : ?>
                <div class="rfq-form-section">
                    <p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? '需求参数' : 'Requirement'); ?></p>
                    <div class="rfq-form-grid rfq-requirement-grid">
                        <?php
                        $category_options = [];
                        foreach (lulu_base_source_data('categories', []) as $category) {
                            $category_options[$category['short'] ?? $category['name']] = lulu_base_is_chinese() ? ($category['short_zh'] ?? $category['short'] ?? $category['name']) : ($category['short'] ?? $category['name']);
                        }
                        ?>
                        <?php lulu_base_rfq_select(lulu_base_is_chinese() ? '产品类别' : 'Product category', 'category', $category_options, false, lulu_base_is_chinese() ? '请选择' : 'Select'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '直径' : 'Diameter', 'diameter', 'text', false, 'e.g. M20', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '长度' : 'Length', 'length', 'text', false, '', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '螺纹' : 'Thread', 'thread', 'text', false, '', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '强度等级' : 'Grade', 'grade', 'text', false, 'e.g. 10.9', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '材质' : 'Material', 'material', 'text', false, '', 'maxlength="60"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '表面处理' : 'Surface treatment', 'surface', 'text', false, '', 'maxlength="60"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '标准 / 图纸' : 'Standard / drawing', 'standard', 'text', false, lulu_base_is_chinese() ? 'DIN / ISO / GB / 图纸' : 'DIN / ISO / GB / drawing', 'maxlength="60"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '数量' : 'Quantity', 'quantity', 'text', false, '', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '年度用量' : 'Annual volume', 'annual', 'text', false, lulu_base_is_chinese() ? '选填' : 'Optional', 'maxlength="40"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '交期要求' : 'Target delivery', 'delivery', 'text', false, lulu_base_is_chinese() ? '选填' : 'Optional', 'maxlength="60"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '应用 / 行业' : 'Application / industry', 'application', 'text', false, lulu_base_is_chinese() ? '选填' : 'Optional', 'maxlength="120"'); ?>
                    </div>
                </div>
            <?php endif; ?>
            <?php if ($show_distributor_profile) : ?>
                <div class="rfq-form-section">
                    <p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? '经销信息' : 'Distribution profile'); ?></p>
                    <div class="rfq-form-grid rfq-distributor-grid">
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '覆盖市场' : 'Markets covered', 'markets', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '经营年限' : 'Years in business', 'years', 'text', false, '', 'maxlength="20"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '现有紧固件业务' : 'Existing fastener business', 'existing', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '客户类型' : 'Customer types', 'customers', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '销售产品' : 'Products sold', 'productsSold', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '仓库' : 'Warehouses', 'warehouses', 'text', false, '', 'maxlength="120"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '销售渠道' : 'Sales channels', 'channels', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '预计年采购额' : 'Estimated annual purchase', 'annualPurchase', 'text', false, '', 'maxlength="80"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '感兴趣的产品' : 'Product interests', 'interests', 'text', false, '', 'maxlength="160"'); ?>
                        <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '计划合作时间' : 'Target cooperation date', 'coopDate', 'text', false, '', 'maxlength="60"'); ?>
                    </div>
                </div>
            <?php endif; ?>
            <div class="rfq-form-section">
                <p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? '详细说明与附件' : 'Details & files'); ?></p>
                <div class="rfq-form-detail-stack">
                    <?php lulu_base_rfq_field(lulu_base_is_chinese() ? '需求描述' : 'Requirement description', 'message', 'textarea', false, lulu_base_is_chinese() ? '产品清单、规格、应用场景、项目背景……' : 'Product list, specifications, application, project background...', 'maxlength="2000"'); ?>
                    <?php
                    $attachment_label = $variant === 'bom'
                        ? ($is_zh ? '上传 BOM 清单 (XLS, XLSX, CSV, PDF)' : 'Upload BOM (XLS, XLSX, CSV, PDF)')
                        : ($variant === 'custom'
                            ? ($is_zh ? '上传图纸 (PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX)' : 'Upload drawing (PDF, DWG, DXF, STEP, STP, JPG, PNG, XLSX)')
                            : ($is_zh ? '附件（询价单、BOM、图纸、图片）' : 'Attachments (RFQ, BOM, drawing, image)'));
                    ?>
                    <div class="form-field">
                        <label for="<?php echo esc_attr($form_id); ?>-attachment"><?php echo esc_html($attachment_label); ?></label>
                        <input id="<?php echo esc_attr($form_id); ?>-attachment" type="file" name="files[]" multiple accept="<?php echo esc_attr($accept); ?>" data-rfq-files>
                        <p class="form-field-hint"><?php echo esc_html(sprintf($is_zh ? '最多 10 个文件，每个文件最大 %d MB。' : 'Up to 10 files, maximum %d MB per file.', min(50, max(1, absint(lulu_base_option('rfq_max_upload_mb')))))); ?></p>
                        <ul class="rfq-file-list" data-rfq-file-list hidden></ul>
                    </div>
                </div>
            </div>
            <div class="rfq-consent">
                <input id="<?php echo esc_attr($form_id); ?>-consent" type="checkbox" name="consent" value="1" required>
                <label for="<?php echo esc_attr($form_id); ?>-consent">
                    <?php echo esc_html(lulu_base_option('rfq_privacy_text')); ?>
                    <a href="<?php echo esc_url(lulu_base_privacy_url()); ?>" target="_blank" rel="privacy-policy noopener"><?php echo esc_html($is_zh ? '隐私政策' : 'Privacy policy'); ?></a>
                    <span aria-hidden="true">*</span>
                </label>
            </div>
            <div class="rfq-honeypot" aria-hidden="true">
                <label for="<?php echo esc_attr($form_id); ?>-website">Website</label>
                <input id="<?php echo esc_attr($form_id); ?>-website" type="text" name="lulu_website" tabindex="-1" autocomplete="off">
            </div>
            <button class="button source-rfq-submit" type="submit"><?php echo esc_html($atts['submit_label'] ?: ($is_zh ? '提交询价' : 'Submit RFQ')); ?></button>
            <p class="rfq-form-note"><?php echo esc_html($is_zh ? '技术参数为选填项——请提供您已知的信息，其余内容我们的工程团队会在评审时与您确认。' : 'Technical fields are optional — provide what you have and our engineering team will clarify the rest during review.'); ?></p>
        </form>
    <?php if (!$bare) : ?></section><?php else : ?></div><?php endif; ?>
    <?php
    $output = (string) ob_get_clean();
    unset($GLOBALS['lulu_base_rfq_form_id']);
    return $output;
}
add_shortcode('lulu_rfq_form', 'lulu_base_rfq_shortcode');

function lulu_base_rfq_post_value($key, $textarea = false) {
    if (!isset($_POST[$key]) || is_array($_POST[$key])) {
        return '';
    }
    $value = wp_unslash($_POST[$key]);
    return $textarea ? sanitize_textarea_field($value) : sanitize_text_field($value);
}

function lulu_base_rfq_redirect($status) {
    $referer = wp_get_referer();
    $target = $referer && strpos($referer, wp_login_url()) !== 0 ? $referer : home_url('/');
    $target = add_query_arg('lulu_rfq', sanitize_key($status), $target);
    wp_safe_redirect($target);
    exit;
}

function lulu_base_rfq_rate_limited() {
    $ip = isset($_SERVER['REMOTE_ADDR']) && is_scalar($_SERVER['REMOTE_ADDR'])
        ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR']))
        : 'unknown';
    $key = 'lulu_rfq_' . substr(hash('sha256', $ip . wp_salt('auth')), 0, 24);
    if (get_transient($key)) {
        return true;
    }
    set_transient($key, 1, MINUTE_IN_SECONDS);
    return false;
}

function lulu_base_handle_rfq() {
    $request_method = isset($_SERVER['REQUEST_METHOD']) && is_scalar($_SERVER['REQUEST_METHOD'])
        ? strtoupper(sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD'])))
        : '';
    if ($request_method !== 'POST') {
        lulu_base_rfq_redirect('error');
    }
    if (
        !isset($_POST['lulu_rfq_nonce']) ||
        !is_scalar($_POST['lulu_rfq_nonce']) ||
        !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['lulu_rfq_nonce'])), 'lulu_base_submit_rfq')
    ) {
        lulu_base_rfq_redirect('error');
    }
    if (lulu_base_rfq_rate_limited()) {
        lulu_base_rfq_redirect('rate');
    }
    if (lulu_base_rfq_post_value('lulu_website') !== '') {
        lulu_base_rfq_redirect('spam');
    }

    $variant = sanitize_key(lulu_base_rfq_post_value('rfq_variant'));
    $variants = lulu_base_rfq_variants();
    if (!isset($variants[$variant])) {
        $variant = 'general';
    }
    $full_name = lulu_base_rfq_post_value('name') ?: lulu_base_rfq_post_value('full_name');
    $company = lulu_base_rfq_post_value('company');
    $email = sanitize_email(lulu_base_rfq_post_value('email'));
    $country = lulu_base_rfq_post_value('country');
    $message = lulu_base_rfq_post_value('message', true);
    $consent = lulu_base_rfq_post_value('consent');

    if (!$full_name || !$company || !is_email($email) || !$country || $consent !== '1') {
        lulu_base_rfq_redirect('invalid');
    }

    $max_mb = min(50, max(1, absint(lulu_base_option('rfq_max_upload_mb'))));
    $attachment_paths = [];
    $attachment_names = [];
    $total_upload_size = 0;
    $uploaded_files = $_FILES['files'] ?? ($_FILES['attachment'] ?? null);
    if (is_array($uploaded_files) && isset($uploaded_files['name'])) {
        $file_count = is_array($uploaded_files['name']) ? count($uploaded_files['name']) : 1;
        if ($file_count > 10) {
            lulu_base_rfq_redirect('invalid');
        }
        require_once ABSPATH . 'wp-admin/includes/file.php';
        for ($index = 0; $index < $file_count; $index++) {
            $file = [
                'name'     => is_array($uploaded_files['name']) ? ($uploaded_files['name'][$index] ?? '') : $uploaded_files['name'],
                'type'     => is_array($uploaded_files['type']) ? ($uploaded_files['type'][$index] ?? '') : ($uploaded_files['type'] ?? ''),
                'tmp_name' => is_array($uploaded_files['tmp_name']) ? ($uploaded_files['tmp_name'][$index] ?? '') : ($uploaded_files['tmp_name'] ?? ''),
                'error'    => is_array($uploaded_files['error']) ? ($uploaded_files['error'][$index] ?? UPLOAD_ERR_NO_FILE) : ($uploaded_files['error'] ?? UPLOAD_ERR_NO_FILE),
                'size'     => is_array($uploaded_files['size']) ? ($uploaded_files['size'][$index] ?? 0) : ($uploaded_files['size'] ?? 0),
            ];
            if ($file['error'] === UPLOAD_ERR_NO_FILE && $file['name'] === '') {
                continue;
            }
            if (
                $file['error'] !== UPLOAD_ERR_OK ||
                empty($file['tmp_name']) ||
                (int) $file['size'] > $max_mb * MB_IN_BYTES ||
                $total_upload_size + (int) $file['size'] > $max_mb * MB_IN_BYTES * 10
            ) {
                foreach ($attachment_paths as $path) {
                    if (file_exists($path)) wp_delete_file($path);
                }
                lulu_base_rfq_redirect('invalid');
            }
            $total_upload_size += (int) $file['size'];

            $upload = wp_handle_upload($file, [
                'test_form' => false,
                'mimes'     => lulu_base_rfq_allowed_mimes(),
            ]);
            if (!empty($upload['error']) || empty($upload['file'])) {
                foreach ($attachment_paths as $path) {
                    if (file_exists($path)) wp_delete_file($path);
                }
                lulu_base_rfq_redirect('invalid');
            }
            $attachment_paths[] = $upload['file'];
            $attachment_names[] = sanitize_file_name($file['name']);
        }
    }

    $cart_json = lulu_base_rfq_post_value('rfq_cart', true);
    $cart_lines = [];
    if ($cart_json !== '') {
        $cart_items = json_decode($cart_json, true);
        if (is_array($cart_items)) {
            foreach (array_slice($cart_items, 0, 50) as $index => $item) {
                if (!is_array($item)) {
                    continue;
                }
                $parts = [];
                foreach (['name', 'category', 'spec', 'quantity', 'note'] as $cart_key) {
                    if (isset($item[$cart_key]) && is_scalar($item[$cart_key])) {
                        $clean_value = sanitize_text_field((string) $item[$cart_key]);
                        if ($clean_value !== '') {
                            $parts[] = ucfirst($cart_key) . ': ' . $clean_value;
                        }
                    }
                }
                if ($parts) {
                    $cart_lines[] = ($index + 1) . '. ' . implode(' | ', $parts);
                }
            }
        }
    }

    $fields = [
        __('Request type', 'lulu-base')        => $variants[$variant]['label'],
        __('Full name', 'lulu-base')           => $full_name,
        __('Company', 'lulu-base')             => $company,
        __('Business email', 'lulu-base')      => $email,
        __('Phone / WhatsApp', 'lulu-base')    => lulu_base_rfq_post_value('phone'),
        __('Country / market', 'lulu-base')    => $country,
        __('Buyer type', 'lulu-base')          => lulu_base_rfq_post_value('buyerType'),
        __('Target market', 'lulu-base')       => lulu_base_rfq_post_value('market'),
        __('Website', 'lulu-base')             => lulu_base_rfq_post_value('website') ?: lulu_base_rfq_post_value('company_website'),
        __('Product category', 'lulu-base')    => lulu_base_rfq_post_value('category'),
        __('Diameter', 'lulu-base')            => lulu_base_rfq_post_value('diameter'),
        __('Length', 'lulu-base')              => lulu_base_rfq_post_value('length'),
        __('Thread', 'lulu-base')              => lulu_base_rfq_post_value('thread'),
        __('Grade', 'lulu-base')               => lulu_base_rfq_post_value('grade'),
        __('Material', 'lulu-base')            => lulu_base_rfq_post_value('material'),
        __('Surface treatment', 'lulu-base')   => lulu_base_rfq_post_value('surface'),
        __('Standard / drawing', 'lulu-base')  => lulu_base_rfq_post_value('standard'),
        __('Quantity / volume', 'lulu-base')   => lulu_base_rfq_post_value('quantity'),
        __('Annual volume', 'lulu-base')       => lulu_base_rfq_post_value('annual'),
        __('Delivery', 'lulu-base')            => lulu_base_rfq_post_value('delivery'),
        __('Application / industry', 'lulu-base') => lulu_base_rfq_post_value('application'),
        __('Markets covered', 'lulu-base')     => lulu_base_rfq_post_value('markets'),
        __('Years in business', 'lulu-base')   => lulu_base_rfq_post_value('years'),
        __('Existing fastener business', 'lulu-base') => lulu_base_rfq_post_value('existing'),
        __('Customer types', 'lulu-base')      => lulu_base_rfq_post_value('customers'),
        __('Products sold', 'lulu-base')       => lulu_base_rfq_post_value('productsSold'),
        __('Warehouses', 'lulu-base')          => lulu_base_rfq_post_value('warehouses'),
        __('Sales channels', 'lulu-base')      => lulu_base_rfq_post_value('channels'),
        __('Estimated annual purchase', 'lulu-base') => lulu_base_rfq_post_value('annualPurchase'),
        __('Product interests', 'lulu-base')   => lulu_base_rfq_post_value('interests'),
        __('Target cooperation date', 'lulu-base') => lulu_base_rfq_post_value('coopDate'),
        __('Attachments', 'lulu-base')         => implode(', ', $attachment_names),
        __('RFQ list', 'lulu-base')            => implode("\n", $cart_lines),
        __('Requirement details', 'lulu-base') => $message,
        __('Source page', 'lulu-base')         => esc_url_raw(wp_get_referer()),
    ];
    $body = '';
    foreach ($fields as $label => $value) {
        if ($value !== '') {
            $body .= $label . ': ' . $value . "\n";
        }
    }

    $recipient = sanitize_email(lulu_base_option('rfq_recipient'));
    if (!is_email($recipient)) {
        $recipient = get_option('admin_email');
    }
    $subject = str_replace('{company}', $company, (string) lulu_base_option('rfq_subject'));
    $subject = sanitize_text_field($subject);
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    ];
    $sent = wp_mail($recipient, $subject, $body, $headers, $attachment_paths);

    foreach ($attachment_paths as $path) {
        if (file_exists($path)) {
            wp_delete_file($path);
        }
    }
    lulu_base_rfq_redirect($sent ? 'success' : 'error');
}
add_action('admin_post_nopriv_lulu_submit_rfq', 'lulu_base_handle_rfq');
add_action('admin_post_lulu_submit_rfq', 'lulu_base_handle_rfq');
