<?php get_header(); ?>
<?php while (have_posts()) : the_post(); ?>
    <?php $content = (string) get_the_content(); ?>
    <?php if (strpos($content, 'data-lulu-template=') !== false) : ?>
        <?php the_content(); ?>
    <?php else : ?>
        <main class="content"><div class="container"><article><p class="eyebrow"><?php bloginfo('name'); ?></p><h1><?php the_title(); ?></h1><?php the_content(); ?></article></div></main>
    <?php endif; ?>
<?php endwhile; ?>
<?php get_footer(); ?>
