<?php get_header(); ?>
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <?php if (trim((string) get_the_content()) !== '') : ?>
            <?php the_content(); ?>
        <?php else : ?>
            <main class="content"><div class="container"><h1><?php bloginfo('name'); ?></h1><?php if (get_bloginfo('description')) : ?><p class="intro"><?php echo esc_html(get_bloginfo('description')); ?></p><?php endif; ?></div></main>
        <?php endif; ?>
    <?php endwhile; ?>
<?php else : ?>
    <main class="content"><div class="container"><h1><?php bloginfo('name'); ?></h1><?php if (get_bloginfo('description')) : ?><p class="intro"><?php echo esc_html(get_bloginfo('description')); ?></p><?php endif; ?></div></main>
<?php endif; ?>
<?php get_footer(); ?>
