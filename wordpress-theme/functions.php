<?php
if (!defined('ABSPATH')) exit;
function xjx_setup(){add_theme_support('title-tag');add_theme_support('post-thumbnails');add_theme_support('custom-logo');register_nav_menus(['primary'=>__('Primary Menu','xiangjinxin-fasteners'),'footer'=>__('Footer Menu','xiangjinxin-fasteners')]);}
add_action('after_setup_theme','xjx_setup');
function xjx_menu(){echo '<a href="'.esc_url(home_url('/')).'">Home</a><a href="'.esc_url(get_post_type_archive_link('product')).'">Products</a><a href="'.esc_url(home_url('/#rfq')).'">Request Quote</a>';}
function xjx_assets(){wp_enqueue_style('xjx-style',get_stylesheet_uri(),[], '1.0.0');wp_enqueue_script('xjx-js',get_template_directory_uri().'/assets/theme.js',[], '1.0.0',true);}
add_action('wp_enqueue_scripts','xjx_assets');
function xjx_product_type(){register_post_type('product',['labels'=>['name'=>'Products','singular_name'=>'Product'],'public'=>true,'has_archive'=>true,'menu_icon'=>'dashicons-hammer','supports'=>['title','editor','excerpt','thumbnail'],'rewrite'=>['slug'=>'products'],'show_in_rest'=>true]);register_taxonomy('product_category','product',['label'=>'Product Categories','hierarchical'=>true,'rewrite'=>['slug'=>'product-category'],'show_in_rest'=>true]);}
add_action('init','xjx_product_type');
function xjx_form(){if(empty($_POST['xjx_nonce'])||!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['xjx_nonce'])),'xjx_rfq'))return; $name=sanitize_text_field(wp_unslash($_POST['name']??''));$email=sanitize_email(wp_unslash($_POST['email']??''));$message=sanitize_textarea_field(wp_unslash($_POST['message']??''));$to=get_option('admin_email');wp_mail($to,'New website RFQ from '.$name,"Name: $name\nEmail: $email\n\n$message",['Reply-To: '.$email]);wp_safe_redirect(add_query_arg('rfq','sent',wp_get_referer()?:home_url('/')));exit;}
add_action('admin_post_nopriv_xjx_rfq','xjx_form');add_action('admin_post_xjx_rfq','xjx_form');
