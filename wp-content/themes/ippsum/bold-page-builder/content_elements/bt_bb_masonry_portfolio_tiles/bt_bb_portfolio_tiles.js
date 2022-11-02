(function($) {

    var bt_bb_portfolio_tiles_load_images = function(root) {
        root.each(function() {
            var page_bottom = $(window).scrollTop() + $(window).height();
            $(this).find('.bt_bb_grid_item').each(function() {
                var this_top = $(this).offset().top;
                if (this_top < page_bottom + $(window).height()) {
                    var img_src = $(this).data('src');
                    if (img_src !== '' && $(this).find('.bt_bb_grid_item_post_thumbnail a').html() == '') {
                        $(this).find('.bt_bb_grid_item_post_thumbnail a').html('<img src="' + img_src + '">');
                    }
                }
            });
        });
    }

    var bt_bb_portfolio_tiles_load_posts = function(root) {

        root.addClass('bt_bb_grid_hide');
        root.find('.bt_bb_grid_item').remove();
        if (root.hasClass('masonry')) {
            root.masonry('destroy');
        }

        root.parent().find('.bt_bb_post_grid_loader').show();
        if (root.data('post-type') == 'portfolio') {
            var action = 'bt_bb_get_tiles_portfolio';
        } else {
            var action = 'bt_bb_get_tiles_portfolio';
        }

        var data = {
            'action': action,
            'number': root.data('number-portfolio'),
            'format': root.data('format-portfolio'),
            'category': root.data('category-portfolio'),
            'show': root.data('show-portfolio'),
            'bt-nonce': root.data('bt-nonce')
        };

        $.ajax({
            type: 'POST',
            url: ajax_object.ajax_url,
            data: data,
            async: true,
            success: function(response) {
                root.append(response);
                bt_bb_portfolio_tiles_resize(root);
                bt_bb_portfolio_tiles_load_images(root);
                root.masonry({
                    columnWidth: '.bt_bb_grid_sizer',
                    itemSelector: '.bt_bb_grid_item',
                    gutter: 0,
                    percentPosition: true
                });
                root.parent().find('.bt_bb_post_grid_loader').hide();
                root.removeClass('bt_bb_grid_hide');
                $('.bt_bb_grid_container').css('height', 'auto');
            },
            error: function(response) {
                root.parent().find('.bt_bb_post_grid_loader').hide();
                root.removeClass('bt_bb_grid_hide');
            }
        });
    }

    $(document).ready(function() {

        $(window).on('scroll', function() {
            bt_bb_portfolio_tiles_load_images($('.bt_bb_masonry_post_grid_content'));
        });

        $('.bt_bb_masonry_portfolio_tiles_content').each(function() {
            var grid_content = $(this);
            bt_bb_portfolio_tiles_load_posts(grid_content);
        });

        $('.bt_bb_masonry_portfolio_tiles_filter_item').on('click', function() {
            var root = $(this).closest('.bt_bb_grid_container');
            root.height(root.height());
            $(this).parent().find('.bt_bb_masonry_portfolio_tiles_filter_item').removeClass('active');
            $(this).addClass('active');
            var grid_content = $(this).closest('.bt_bb_masonry_portfolio_tiles').find('.bt_bb_masonry_portfolio_tiles_content');
            grid_content.data('category-portfolio', $(this).data('category-portfolio'));
            grid_content.data('format-portfolio', $(this).data('format-portfolio'));
            grid_content.data('post-type', $(this).data('post-type'));
            bt_bb_portfolio_tiles_load_posts(grid_content);
        });

    });


    $(window).ready(function() {
        window.bt_bb_portfolio_tiles_resize = function() {
            $('.bt_bb_masonry_post_grid_content .bt_bb_grid_item .bt_bb_grid_item_inner').each(function() {
                $(this).css('height', '');
                var h = Math.ceil($(this).width() * $(this).data('hw'));
                $(this).css('height', h);
            });
            $('.bt_bb_masonry_post_grid_content .bt_bb_grid_item .bt_bb_grid_item_inner  .bt_bb_grid_item_inner_image').each(function() {
                $(this).css('height', '');
                var h = Math.ceil($(this).width() * $(this).data('hw'));
                $(this).css('height', h);
            });
            $('.bt_bb_masonry_post_grid_content').each(function() {
                $(this).width('initial');
                var child_left_margin = parseInt($(this).find('.bt_bb_masonry_post_image_content').css('margin-left'));
                var base_item_width = ($(this).width() - child_left_margin) / ($(this).data('columns'));
                if (Math.ceil(base_item_width) != base_item_width) {
                    $(this).width($(this).data('columns') * Math.ceil(base_item_width) + child_left_margin);
                }
            });

        }
    });


    $(window).load(function() {

        bt_bb_portfolio_tiles_resize();

        $('.bt_bb_masonry_post_image_content').masonry({
            columnWidth: '.bt_bb_grid_sizer',
            itemSelector: '.bt_bb_grid_item',
            gutter: 0,
            percentPosition: true
        });

        $(window).on('resize', function() {
            bt_bb_portfolio_tiles_resize();
        });

        setTimeout(function() {
            $('.bt_bb_masonry_post_image_content').masonry('layout');
        }, 10);

    });

})(jQuery);