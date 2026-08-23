<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <div class="brand"><span class="brand-mark" aria-hidden="true"><?php echo esc_html(strtoupper(substr(get_bloginfo('name'), 0, 1))); ?></span><span><?php bloginfo('name'); ?></span></div>
                <?php if (get_bloginfo('description')) : ?><p><?php echo esc_html(get_bloginfo('description')); ?></p><?php endif; ?>
            </div>
            <div>
                <nav class="footer-menu" aria-label="<?php esc_attr_e('Footer navigation', 'lulu-base'); ?>"><?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'fallback_cb' => 'lulu_base_menu_fallback', 'items_wrap' => '%3$s']); ?></nav>
            </div>
            <div>
                <a class="button" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_contact_label()); ?></a>
            </div>
        </div>
        <div class="copyright">© <?php echo esc_html(wp_date('Y')); ?> <?php bloginfo('name'); ?></div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
