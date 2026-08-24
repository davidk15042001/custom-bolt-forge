<?php get_header(); ?>
<main id="main-content" class="content">
    <div class="container">
        <?php lulu_base_breadcrumbs([['label' => get_the_archive_title()]]); ?>
        <header class="archive-heading">
            <p class="eyebrow"><?php esc_html_e('Journal', 'lulu-base'); ?></p>
            <h1><?php the_archive_title(); ?></h1>
            <?php the_archive_description('<div class="intro">', '</div>'); ?>
        </header>
        <?php if (have_posts()) : ?>
            <div class="post-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('post-card'); ?>>
                        <p class="eyebrow"><?php echo esc_html(get_the_date()); ?></p>
                        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 28)); ?></p>
                        <a class="text-link" href="<?php the_permalink(); ?>"><?php esc_html_e('Read more', 'lulu-base'); ?> <span aria-hidden="true">→</span></a>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="pagination"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-catalog"><h2><?php esc_html_e('Nothing published yet', 'lulu-base'); ?></h2></div>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
