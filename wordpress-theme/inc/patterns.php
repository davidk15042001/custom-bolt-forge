<?php
if (!defined('ABSPATH')) {
    exit;
}

function lulu_base_register_pattern_category() {
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category('lulu-base-sections', [
            'label' => __('Lulu Base sections', 'lulu-base'),
        ]);
    }
}
add_action('init', 'lulu_base_register_pattern_category');
