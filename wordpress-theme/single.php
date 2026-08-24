<?php get_header(); ?>
<main id="main-content" class="content">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            <?php lulu_base_breadcrumbs([['label' => get_the_title()]]); ?>
            <article <?php post_class('standard-page single-post'); ?>>
                <p class="eyebrow"><?php echo esc_html(get_the_date()); ?></p>
                <h1><?php the_title(); ?></h1>
                <?php if (has_post_thumbnail()) : ?><?php the_post_thumbnail('large', ['class' => 'feature-image']); ?><?php endif; ?>
                <div class="entry-content"><?php the_content(); ?></div>
            </article>
        <?php endwhile; ?>
    </div>
</main>
<?php get_footer(); ?>
