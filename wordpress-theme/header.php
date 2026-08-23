<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php $site_description = get_bloginfo('description'); ?>
<?php if ($site_description) : ?>
    <div class="topbar"><div class="container"><span><?php echo esc_html($site_description); ?></span><a href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_contact_label()); ?> →</a></div></div>
<?php endif; ?>
<header class="site-header">
    <div class="container">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
            <?php if (has_custom_logo()) : echo wp_get_attachment_image((int) get_theme_mod('custom_logo'), 'full', false, ['class' => 'custom-logo']); else : ?>
                <span class="brand-mark" aria-hidden="true"><?php echo esc_html(strtoupper(substr(get_bloginfo('name'), 0, 1))); ?></span>
            <?php endif; ?>
            <span><?php bloginfo('name'); ?><?php if ($site_description) : ?><small><?php echo esc_html($site_description); ?></small><?php endif; ?></span>
        </a>
        <button class="menu-toggle" type="button" aria-label="<?php esc_attr_e('Open menu', 'lulu-base'); ?>" aria-expanded="false">☰</button>
        <nav class="primary-menu" aria-label="<?php esc_attr_e('Primary navigation', 'lulu-base'); ?>">
            <?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'fallback_cb' => 'lulu_base_menu_fallback', 'items_wrap' => '%3$s']); ?>
        </nav>
        <a class="button header-cta" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_contact_label()); ?></a>
    </div>
</header>
