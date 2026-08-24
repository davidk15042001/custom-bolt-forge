<?php get_header(); ?>
<main id="main-content" class="content product-single">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            <?php
            $product_id = get_the_ID();
            $product_title = lulu_base_product_title($product_id);
            $terms = get_the_terms($product_id, 'product_category');
            $breadcrumb = [['label' => $product_title]];
            if ($terms && !is_wp_error($terms)) {
                $term_url = get_term_link($terms[0]);
                $term_name = lulu_base_is_chinese()
                    ? get_term_meta($terms[0]->term_id, '_lulu_base_source_name_zh', true)
                    : '';
                $breadcrumb = [
                    [
                        'label' => $term_name ?: $terms[0]->name,
                        'url'   => is_wp_error($term_url) ? '' : $term_url,
                    ],
                    ['label' => $product_title],
                ];
            }
            ?>
            <?php lulu_base_breadcrumbs($breadcrumb); ?>
            <article <?php post_class('product-article'); ?>>
                <div class="product-hero">
                    <div class="product-hero-copy">
                        <?php if ($terms && !is_wp_error($terms)) : ?><p class="eyebrow"><?php echo esc_html(lulu_base_is_chinese() ? (get_term_meta($terms[0]->term_id, '_lulu_base_source_name_zh', true) ?: $terms[0]->name) : $terms[0]->name); ?></p><?php endif; ?>
                        <h1><?php echo esc_html($product_title); ?></h1>
                        <?php if (lulu_base_product_meta($product_id, 'subtitle')) : ?><p class="product-lead"><?php echo esc_html(lulu_base_product_meta($product_id, 'subtitle')); ?></p><?php endif; ?>
                        <div class="product-hero-actions">
                            <a class="button button-accent" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_option('product_cta_label')); ?><span aria-hidden="true">→</span></a>
                            <?php if (lulu_base_product_is_custom($product_id)) : ?><span class="product-badge product-badge-static"><?php esc_html_e('Custom capable', 'lulu-base'); ?></span><?php endif; ?>
                        </div>
                    </div>
                    <div class="product-hero-media">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('large', ['loading' => 'eager']); ?>
                        <?php else : ?>
                            <span class="product-card-placeholder" aria-hidden="true"><span><?php echo esc_html(lulu_base_brand_initial()); ?></span></span>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="product-detail-grid">
                    <div class="entry-content product-description">
                        <?php $localized_content = lulu_base_is_chinese() ? get_post_meta($product_id, '_lulu_base_source_content_zh', true) : ''; ?>
                        <?php echo $localized_content !== '' ? apply_filters('the_content', $localized_content) : apply_filters('the_content', get_the_content()); ?>
                    </div>
                    <?php if (lulu_base_option('show_product_meta') && lulu_base_product_specs($product_id)) : ?>
                        <div class="specification-panel">
                            <p class="eyebrow"><?php esc_html_e('Technical specification', 'lulu-base'); ?></p>
                            <dl class="spec-table">
                                <?php foreach (lulu_base_product_specs($product_id) as $label => $value) : ?>
                                    <div><dt><?php echo esc_html($label); ?></dt><dd><?php echo esc_html($value); ?></dd></div>
                                <?php endforeach; ?>
                            </dl>
                        </div>
                    <?php endif; ?>
                </div>

                <?php $applications = lulu_base_product_list($product_id, 'applications'); ?>
                <?php if ($applications) : ?>
                    <div class="application-panel">
                        <p class="eyebrow"><?php esc_html_e('Typical applications', 'lulu-base'); ?></p>
                        <ul class="check-list">
                            <?php foreach ($applications as $application) : ?><li><?php echo esc_html($application); ?></li><?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php
$related_products = lulu_base_related_products($product_id, 3);
if ($related_products->have_posts()) :
?>
    <section class="section-block section-muted related-products" aria-labelledby="related-products-title">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e('Continue exploring', 'lulu-base'); ?></p>
            <h2 id="related-products-title"><?php esc_html_e('Related products', 'lulu-base'); ?></h2>
            <div class="product-grid">
                <?php while ($related_products->have_posts()) : $related_products->the_post(); ?>
                    <?php get_template_part('template-parts/product-card'); ?>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
<?php endif; ?>
<?php wp_reset_postdata(); ?>
<?php get_footer(); ?>
