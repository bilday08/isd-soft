(function($) {
    "use strict";
    $('.bt_bb_accordion_item_title').click(function() {
        if (!$(this).closest('.bt_bb_accordion_item').hasClass('on')) {
            $(this).closest('.bt_bb_accordion').find('.bt_bb_accordion_item.on').removeClass('on');
            $(this).closest('.bt_bb_accordion_item').addClass('on');
            if (!window.initialaccordion) {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 150
                }, 100);
            } else {
                window.initialaccordion = false;
            }

        } else {
            $(this).closest('.bt_bb_accordion_item').removeClass('on');
        }
    });
    $('.bt_bb_accordion').each(function() {
        if ($(this).data('closed') != 'closed') {
            window.initialaccordion = true;
            $(this).find('.bt_bb_accordion_item_title').first().click();
        }
    });
})(jQuery);