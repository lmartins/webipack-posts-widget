<?php
/**
 * Webipack Posts Widget: Default widget template
 */

// Block direct requests
if ( !defined('ABSPATH') )
    die('-1');

echo $before_widget;

if ( !empty($title) )
    echo $before_title . $title . $after_title;

if( $flexible_posts->have_posts() ):
?>
    <div
        class="loop loop--list"
        data-eq-pts="xsmall: 0, small: 320, medium: 470, large: 900"
        <?php if ( $display_mode == 'slider') echo "data-slider" ; ?>
        >
    <?php while( $flexible_posts->have_posts() ) : $flexible_posts->the_post(); global $post; ?>
        <div class="item">
            <div id="post-<?php the_ID(); ?>" <?php post_class( 'Media' ); ?> >
                <?php if( $thumbnail == true ) { ?>
                    <div class="Media-figure">

                        <?php
                            // If the post has a feature image, show it
                            if( has_post_thumbnail() ) {
                                the_post_thumbnail( $thumbsize );
                            // Else if the post has a mime type that starts with "image/" then show the image directly.
                            } elseif( 'image/' == substr( $post->post_mime_type, 0, 6 ) ) {
                                echo wp_get_attachment_image( $post->ID, $thumbsize );
                            } else { ?>
                                <span class="thumb-placeholder"><i class="icon-camera"></i></span>
                            <?php } ?>
                    </div>
                <?php } ?>
                <div class="Media-content">
                    <h4 class="title">
                        <a href="<?php echo the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
    </div><!-- .dpe-flexible-posts -->
<?php else: // We have no posts ?>
    <div class="dpe-flexible-posts no-posts">
        <p><?php _e( 'No post found', 'flexible-posts-widget' ); ?></p>
    </div>
<?php
endif; // End have_posts()

echo $after_widget;
