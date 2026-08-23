<?php get_header(); ?>
<main class="content"><div class="container">
    <?php while (have_posts()) : the_post(); ?>
        <article>
            <p class="eyebrow"><?php bloginfo('name'); ?></p>
            <h1><?php the_title(); ?></h1>
            <div class="product-meta"><?php echo wp_kses_post(get_the_term_list(get_the_ID(), 'product_category', '', ' · ')); ?></div>
            <?php if (has_post_thumbnail()) the_post_thumbnail('large', ['class' => 'feature-image']); ?>
            <div class="intro"><?php the_content(); ?></div>
            <div class="actions"><a class="button" href="<?php echo esc_url(lulu_base_contact_url()); ?>"><?php echo esc_html(lulu_base_contact_label()); ?></a></div>
        </article>
    <?php endwhile; ?>
</div></main>
<?php get_footer(); ?>
