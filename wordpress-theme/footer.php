<?php
$footer_columns = [
    [
        'title' => 'Products',
        'links' => [
            ['label' => 'Bolts', 'path' => '/products/bolts'],
            ['label' => 'Nuts', 'path' => '/products/nuts'],
            ['label' => 'Threaded Rods', 'path' => '/products/threaded-rods'],
            ['label' => 'Anchors', 'path' => '/products/anchor-bolts'],
            ['label' => 'Self-Drilling Screws', 'path' => '/products/self-drilling-screws'],
            ['label' => 'Solar Fasteners', 'path' => '/products/solar-fasteners'],
            ['label' => 'Custom Fasteners', 'path' => '/products/custom-fasteners'],
        ],
    ],
    [
        'title' => 'Industries',
        'links' => [
            ['label' => 'Construction', 'path' => '/industries/construction'],
            ['label' => 'Steel Structures', 'path' => '/industries/steel-structures'],
            ['label' => 'Machinery', 'path' => '/industries/machinery'],
            ['label' => 'Solar', 'path' => '/industries/solar'],
            ['label' => 'Infrastructure', 'path' => '/industries/infrastructure'],
            ['label' => 'Heavy Industry', 'path' => '/industries/heavy-duty'],
        ],
    ],
    [
        'title' => 'Custom Manufacturing',
        'links' => [
            ['label' => 'Large Bolts', 'path' => '/custom-manufacturing'],
            ['label' => 'Drawing-Based Fasteners', 'path' => '/custom-manufacturing'],
            ['label' => 'Special Fasteners', 'path' => '/products/custom-fasteners'],
            ['label' => 'Upload Drawing', 'path' => '/contact'],
        ],
    ],
    [
        'title' => 'B2B',
        'links' => [
            ['label' => 'Wholesale', 'path' => '/wholesale'],
            ['label' => 'Submit RFQ', 'path' => '/contact'],
            ['label' => 'Upload BOM', 'path' => '/contact?tab=bom'],
            ['label' => 'Distributor Cooperation', 'path' => '/distributors'],
            ['label' => 'RFQ List', 'path' => '/rfq'],
        ],
    ],
    [
        'title' => 'Resources & Company',
        'links' => [
            ['label' => 'Catalog & Datasheets', 'path' => '/resources'],
            ['label' => 'Manufacturing', 'path' => '/manufacturing'],
            ['label' => 'Quality', 'path' => '/quality'],
            ['label' => 'Contact', 'path' => '/contact'],
        ],
    ],
];
$source_company = get_option('lulu_base_source_company', []);
$company_name = $source_company['name'] ?? get_bloginfo('name');
$company_address = $source_company['address'] ?? lulu_base_option('address');
$credit_code = $source_company['creditCode'] ?? '';
$established = $source_company['established'] ?? '';
?>
<footer class="site-footer source-site-footer">
    <div class="container">
        <div class="footer-source-grid">
            <div class="footer-source-brand">
                <p class="footer-source-name"><?php echo esc_html($source_company['shortName'] ?? get_bloginfo('name')); ?></p>
                <p><?php echo esc_html($source_company['positioning'] ?? lulu_base_option('footer_blurb')); ?></p>
            </div>
            <?php foreach ($footer_columns as $column) : ?>
                <div class="footer-source-column">
                    <p class="eyebrow"><?php echo esc_html(lulu_base_source_translate($column['title'])); ?></p>
                    <ul>
                        <?php foreach ($column['links'] as $link) : ?>
                            <li><a href="<?php echo esc_url(home_url($link['path'])); ?>"><?php echo esc_html(lulu_base_source_translate($link['label'])); ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="footer-source-meta">
            <p class="footer-source-company"><?php echo esc_html(lulu_base_source_translate($company_name)); ?></p>
            <?php if ($company_address) : ?><p><?php echo esc_html(lulu_base_source_translate($company_address)); ?></p><?php endif; ?>
            <?php if ($credit_code || $established) : ?>
                <p><?php esc_html_e('Unified social credit code', 'lulu-base'); ?> <?php echo esc_html($credit_code); ?> · <?php esc_html_e('Established', 'lulu-base'); ?> <?php echo esc_html($established); ?></p>
            <?php endif; ?>
            <div class="footer-source-legal">
                <a href="<?php echo esc_url(home_url('/legal/privacy')); ?>"><?php esc_html_e('Privacy', 'lulu-base'); ?></a>
                <a href="<?php echo esc_url(home_url('/legal/terms')); ?>"><?php esc_html_e('Terms', 'lulu-base'); ?></a>
                <a href="<?php echo esc_url(home_url('/legal/cookies')); ?>"><?php esc_html_e('Cookies', 'lulu-base'); ?></a>
            </div>
        </div>
    </div>
</footer>
<div class="source-floating-actions">
    <a class="source-floating-whatsapp" href="https://wa.me/4917641474606?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20fasteners." target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('Chat on WhatsApp', 'lulu-base'); ?>">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.23 8.23z"/></svg>
    </a>
    <button class="source-floating-chat" type="button" data-source-chat-toggle aria-label="<?php esc_attr_e('Open sales assistant', 'lulu-base'); ?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.3 8.3 0 0 1-3.4-.7L4 20l1.4-3.5A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>
    </button>
</div>
<div class="source-chat-panel" data-source-chat-panel hidden role="dialog" aria-label="<?php esc_attr_e('Sales assistant', 'lulu-base'); ?>">
    <div class="source-chat-heading">
        <strong><?php esc_html_e('Fastener Sales Assistant', 'lulu-base'); ?></strong>
        <button type="button" data-source-chat-close aria-label="<?php esc_attr_e('Close chat', 'lulu-base'); ?>">×</button>
    </div>
    <p><?php esc_html_e('Ask about standards, grades, diameters up to M120 or custom drawings.', 'lulu-base'); ?></p>
    <div class="source-chat-suggestions">
        <a href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php esc_html_e('Request an RFQ', 'lulu-base'); ?></a>
        <a href="<?php echo esc_url(home_url('/products')); ?>"><?php esc_html_e('Browse products', 'lulu-base'); ?></a>
    </div>
</div>
<?php wp_footer(); ?>
</body>
</html>
