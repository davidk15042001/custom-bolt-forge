<?php get_header(); ?>
<main id="main-content" class="content">
    <div class="container empty-state">
        <p class="eyebrow">404</p>
        <h1><?php esc_html_e('This page is not in the catalog.', 'lulu-base'); ?></h1>
        <p class="intro"><?php esc_html_e('The link may be outdated or the page may have moved. Return home or contact the team for help.', 'lulu-base'); ?></p>
        <div class="actions">
            <a class="button button-accent" href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Back to homepage', 'lulu-base'); ?> <span aria-hidden="true">→</span></a>
            <a class="button button-ghost" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_contact_label()); ?></a>
        </div>
    </div>
</main>
<?php get_footer(); ?>
