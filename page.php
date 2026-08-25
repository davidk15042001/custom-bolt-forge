<?php
$queried_page_id = get_queried_object_id();
$queried_page_slug = get_post_field('post_name', $queried_page_id);
$queried_parent_slug = get_post_field('post_name', (int) get_post_field('post_parent', $queried_page_id));
$source_page_slugs = ['industries', 'custom-manufacturing', 'wholesale', 'manufacturing', 'quality', 'distributors', 'resources', 'contact', 'rfq'];
$source_legal_slugs = ['privacy', 'terms', 'cookies'];
$is_source_page = in_array($queried_page_slug, $source_page_slugs, true)
    || get_post_meta($queried_page_id, '_lulu_base_source_industry', true)
    || get_post_meta($queried_page_id, '_lulu_base_source_legal', true)
    || ($queried_parent_slug === 'legal' && in_array($queried_page_slug, $source_legal_slugs, true));
?>
<?php get_header(); ?>
<main id="main-content" class="<?php echo esc_attr($is_source_page ? 'source-page-shell' : 'content'); ?>">
    <?php while (have_posts()) : the_post(); ?>
            <?php $content = (string) get_the_content(); ?>
            <?php $page_slug = get_post_field('post_name', get_the_ID()); ?>
            <?php if (strpos($content, 'data-lulu-template=') !== false) : ?>
                <article class="lulu-generated-page"><?php the_content(); ?></article>
            <?php elseif ($page_slug === 'industries') : ?>
                <?php get_template_part('template-parts/source-industries-index'); ?>
            <?php elseif (get_post_meta(get_the_ID(), '_lulu_base_source_industry', true) || $page_slug !== 'industries' && get_post_field('post_parent', get_the_ID()) && get_post_field('post_name', (int) get_post_field('post_parent', get_the_ID())) === 'industries') : ?>
                <?php get_template_part('template-parts/source-industry'); ?>
            <?php elseif ($page_slug === 'custom-manufacturing') : ?>
                <?php get_template_part('template-parts/source-custom-manufacturing'); ?>
            <?php elseif ($page_slug === 'wholesale') : ?>
                <?php get_template_part('template-parts/source-wholesale'); ?>
            <?php elseif ($page_slug === 'manufacturing') : ?>
                <?php get_template_part('template-parts/source-manufacturing'); ?>
            <?php elseif ($page_slug === 'quality') : ?>
                <?php get_template_part('template-parts/source-quality'); ?>
            <?php elseif ($page_slug === 'distributors') : ?>
                <?php get_template_part('template-parts/source-distributors'); ?>
            <?php elseif ($page_slug === 'resources') : ?>
                <?php get_template_part('template-parts/source-resources'); ?>
            <?php elseif ($page_slug === 'contact') : ?>
                <?php get_template_part('template-parts/source-contact'); ?>
            <?php elseif ($page_slug === 'rfq') : ?>
                <?php get_template_part('template-parts/source-rfq'); ?>
            <?php elseif (get_post_meta(get_the_ID(), '_lulu_base_source_legal', true) || (get_post_field('post_name', (int) get_post_field('post_parent', get_the_ID())) === 'legal' && in_array($page_slug, $source_legal_slugs, true))) : ?>
                <?php get_template_part('template-parts/source-legal'); ?>
            <?php else : ?>
                <div class="container">
                <?php lulu_base_breadcrumbs([['label' => lulu_base_localized_page_title(get_the_ID())]]); ?>
                <article <?php post_class('standard-page'); ?>>
                    <p class="eyebrow"><?php echo esc_html(get_bloginfo('name')); ?></p>
                    <h1><?php echo esc_html(lulu_base_localized_page_title(get_the_ID())); ?></h1>
                    <div class="entry-content">
                        <?php if (get_post_field('post_name', get_the_ID()) === 'contact' && trim($content) === '') : ?>
                            <p class="intro"><?php esc_html_e('Tell us what you are sourcing and our team will review the requirement.', 'lulu-base'); ?></p>
                            <?php echo do_shortcode('[lulu_rfq_form variant="general"]'); ?>
                        <?php else : ?>
                            <?php $localized_content = lulu_base_localized_page_content(get_the_ID()); ?>
                            <?php echo $localized_content !== '' ? $localized_content : apply_filters('the_content', get_the_content()); ?>
                        <?php endif; ?>
                    </div>
                </article>
                </div>
            <?php endif; ?>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
