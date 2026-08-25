<?php get_header(); ?>
<main id="main-content" class="content">
    <div class="container">
        <header class="archive-heading">
            <p class="eyebrow"><?php esc_html_e('Search', 'lulu-base'); ?></p>
            <h1><?php printf(esc_html__('Results for “%s”', 'lulu-base'), get_search_query()); ?></h1>
        </header>
        <?php if (have_posts()) : ?>
            <div class="post-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('post-card'); ?>>
                        <p class="eyebrow"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name); ?></p>
                        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24)); ?></p>
                    </article>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <div class="empty-catalog"><h2><?php esc_html_e('No matching results', 'lulu-base'); ?></h2></div>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
