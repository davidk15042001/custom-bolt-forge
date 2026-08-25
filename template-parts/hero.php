<?php
if (!defined('ABSPATH')) {
    exit;
}

$hero_image = lulu_base_option('hero_image');
$primary_url = lulu_base_option('header_cta_url') ?: lulu_base_contact_url();
$secondary_url = lulu_base_option('hero_secondary_url') ?: get_post_type_archive_link('product');
?>
<section class="hero-section">
    <div class="container hero-grid">
        <div class="hero-copy">
            <p class="eyebrow"><?php echo esc_html(lulu_base_option('hero_eyebrow')); ?></p>
            <h1><?php echo esc_html(lulu_base_option('hero_title')); ?></h1>
            <p class="hero-intro"><?php echo esc_html(lulu_base_option('hero_intro')); ?></p>
            <div class="actions">
                <a class="button button-accent" href="<?php echo esc_url($primary_url); ?>"><?php echo esc_html(lulu_base_option('hero_primary_label')); ?><span aria-hidden="true">→</span></a>
                <a class="button button-ghost" href="<?php echo esc_url($secondary_url); ?>"><?php echo esc_html(lulu_base_option('hero_secondary_label')); ?></a>
            </div>
            <div class="hero-proof" aria-label="<?php esc_attr_e('Business capabilities', 'lulu-base'); ?>">
                <span><strong><?php esc_html_e('B2B', 'lulu-base'); ?></strong><?php esc_html_e('Wholesale supply', 'lulu-base'); ?></span>
                <span><strong><?php esc_html_e('OEM', 'lulu-base'); ?></strong><?php esc_html_e('Project support', 'lulu-base'); ?></span>
                <span><strong><?php esc_html_e('CAD', 'lulu-base'); ?></strong><?php esc_html_e('Drawing-based parts', 'lulu-base'); ?></span>
            </div>
        </div>
        <div class="hero-visual<?php echo $hero_image ? ' has-image' : ''; ?>" <?php if ($hero_image) : ?>style="<?php echo esc_attr('--hero-image:url(' . esc_url($hero_image) . ')'); ?>"<?php endif; ?>>
            <div class="hero-visual-grid" aria-hidden="true"></div>
            <div class="hero-visual-card">
                <span class="hero-visual-kicker"><?php esc_html_e('Built for specification', 'lulu-base'); ?></span>
                <strong><?php esc_html_e('Standard, heavy-duty & custom', 'lulu-base'); ?></strong>
                <span><?php esc_html_e('One sourcing partner for demanding applications.', 'lulu-base'); ?></span>
            </div>
            <span class="hero-visual-mark" aria-hidden="true"><?php echo esc_html(strtoupper(lulu_base_brand_initial())); ?></span>
        </div>
    </div>
</section>
