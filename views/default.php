<?php
/**
 * Flexible Posts Widget: Default widget template
 *
 * @since 3.4.0
 *
 * This template was added to overcome some often-requested changes
 * to the old default template (widget.php).
 */

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');

echo $before_widget;

if ( !empty($title) )
	echo $before_title . $title . $after_title;

$content_types = $flexible_posts->query['post_type'];

if( $flexible_posts->have_posts() ):
?>
	<div class="dpe-flexible-posts <?php foreach ($content_types as $class ) { echo "featured-" . $class . "s "; } ?>  " <?php if ( $display_mode == 'slider') echo "data-slider" ; ?> >
	<?php while( $flexible_posts->have_posts() ) : $flexible_posts->the_post(); global $post; ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<a href="<?php echo the_permalink(); ?>">
				<?php
					if( $thumbnail == true ) {
						// If the post has a feature image, show it
						if( has_post_thumbnail() ) {
							the_post_thumbnail( $thumbsize );
						// Else if the post has a mime type that starts with "image/" then show the image directly.
						} elseif( 'image/' == substr( $post->post_mime_type, 0, 6 ) ) {
							echo wp_get_attachment_image( $post->ID, $thumbsize );
						}
					}
				?>
				<div class="title"><?php the_title(); ?></div>
			</a>
		</div>
	<?php endwhile; ?>
	</div><!-- .dpe-flexible-posts -->
<?php
endif; // End have_posts()

echo $after_widget;
