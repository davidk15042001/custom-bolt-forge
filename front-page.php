<?php get_header(); ?>

<?php
$has_editorial_home = false;
if (have_posts()) {
    while (have_posts()) {
        the_post();
        $has_editorial_home = trim((string) get_the_content()) !== '';
    }
    rewind_posts();
}
?>

<?php if ($has_editorial_home) : ?>
    <main id="main-content" class="lulu-editorial-home">
        <?php while (have_posts()) : the_post(); ?>
            <?php $localized_content = lulu_base_localized_page_content(get_the_ID()); ?>
            <?php echo $localized_content !== '' ? $localized_content : apply_filters('the_content', get_the_content()); ?>
        <?php endwhile; ?>
    </main>
<?php else : ?>
    <main id="main-content" class="default-home">
        <?php get_template_part('template-parts/hero'); ?>

        <section class="trust-strip" aria-label="<?php esc_attr_e('Supply capabilities', 'lulu-base'); ?>">
            <div class="container trust-grid">
                <div><strong><?php esc_html_e('Specification-led', 'lulu-base'); ?></strong><span><?php esc_html_e('Grades, standards and dimensions aligned to your requirement.', 'lulu-base'); ?></span></div>
                <div><strong><?php esc_html_e('Built for volume', 'lulu-base'); ?></strong><span><?php esc_html_e('Wholesale, project, OEM and distributor supply.', 'lulu-base'); ?></span></div>
                <div><strong><?php esc_html_e('Technical response', 'lulu-base'); ?></strong><span><?php esc_html_e('A clear route for drawings, BOMs and non-standard parts.', 'lulu-base'); ?></span></div>
            </div>
        </section>

        <section class="section-block" aria-labelledby="featured-products-title">
            <div class="container">
                <div class="section-heading-row">
                    <div>
                        <p class="eyebrow"><?php esc_html_e('Featured portfolio', 'lulu-base'); ?></p>
                        <h2 id="featured-products-title"><?php esc_html_e('Fasteners for demanding applications', 'lulu-base'); ?></h2>
                    </div>
                    <?php $product_archive = get_post_type_archive_link('product'); ?>
                    <?php if ($product_archive) : ?><a class="text-link" href="<?php echo esc_url($product_archive); ?>"><?php esc_html_e('View all products', 'lulu-base'); ?> <span aria-hidden="true">→</span></a><?php endif; ?>
                </div>
                <?php
                $featured_products = new WP_Query([
                    'post_type'      => 'product',
                    'posts_per_page' => 6,
                    'no_found_rows'  => true,
                ]);
                ?>
                <?php if ($featured_products->have_posts()) : ?>
                    <div class="product-grid">
                        <?php while ($featured_products->have_posts()) : $featured_products->the_post(); ?>
                            <?php get_template_part('template-parts/product-card'); ?>
                        <?php endwhile; ?>
                    </div>
                <?php else : ?>
                    <div class="empty-catalog">
                        <p class="eyebrow"><?php esc_html_e('Your catalog starts here', 'lulu-base'); ?></p>
                        <h3><?php esc_html_e('Add products to turn this homepage into a live sourcing destination.', 'lulu-base'); ?></h3>
                        <p><?php esc_html_e('Create products from the WordPress dashboard and enrich each one with specifications, applications and a featured image.', 'lulu-base'); ?></p>
                    </div>
                <?php endif; ?>
                <?php wp_reset_postdata(); ?>
            </div>
        </section>

        <section class="section-block section-muted" aria-labelledby="capabilities-title">
            <div class="container">
                <p class="eyebrow"><?php esc_html_e('Why buyers use us', 'lulu-base'); ?></p>
                <h2 id="capabilities-title"><?php esc_html_e('A sourcing partner, not just a parts list', 'lulu-base'); ?></h2>
                <div class="card-grid capabilities-grid">
                    <article class="feature-card"><span class="feature-index">01</span><h3><?php esc_html_e('Standard supply', 'lulu-base'); ?></h3><p><?php esc_html_e('Make repeat buying easier with clear product families, technical metadata and category navigation.', 'lulu-base'); ?></p></article>
                    <article class="feature-card"><span class="feature-index">02</span><h3><?php esc_html_e('Custom manufacturing', 'lulu-base'); ?></h3><p><?php esc_html_e('Give engineering and procurement teams a confident route from drawing to quotation.', 'lulu-base'); ?></p></article>
                    <article class="feature-card feature-card-dark"><span class="feature-index">03</span><h3><?php esc_html_e('Project coordination', 'lulu-base'); ?></h3><p><?php esc_html_e('Bring mixed requirements, volumes, delivery windows and documentation into one conversation.', 'lulu-base'); ?></p></article>
                </div>
            </div>
        </section>

        <section class="section-block" aria-labelledby="home-rfq-title">
            <div class="container">
                <?php echo lulu_base_rfq_shortcode([
                    'variant'      => 'general',
                    'title'        => __('Start a supply conversation', 'lulu-base'),
                    'submit_label' => __('Send enquiry', 'lulu-base'),
                ]); ?>
            </div>
        </section>
    </main>
<?php endif; ?>

<?php get_footer(); ?>
