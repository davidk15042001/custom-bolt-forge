<?php get_header(); ?>
<main id="main-content" class="content">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="post-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('post-card'); ?>>
                        <p class="eyebrow"><?php echo esc_html(get_the_date()); ?></p>
                        <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                        <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p>
                        <a class="text-link" href="<?php the_permalink(); ?>"><?php esc_html_e('Read more', 'lulu-base'); ?> <span aria-hidden="true">→</span></a>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="pagination"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-catalog"><h1><?php esc_html_e('Nothing found', 'lulu-base'); ?></h1><p><?php esc_html_e('Try another search or return to the homepage.', 'lulu-base'); ?></p></div>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
