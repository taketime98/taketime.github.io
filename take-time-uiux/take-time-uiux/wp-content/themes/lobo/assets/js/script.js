(function($) {
    jQuery(document).ready(function() {

        setTimeout(function() {
            jQuery('body').addClass('loaded');
        }, 8000);

    });
    $(document).ready(function() {
        $('a.read-more').on('click', function() {
            $(this).parents('.outer-mid-content').addClass('collpsed').children('.expend-content').slideDown();
        });
        $('a.read-less').on('click', function() {
            $(this).parents('.outer-mid-content').removeClass('collpsed').children('.expend-content').slideUp();
        });
        $('a.read-more').on('click', function() {
            $(this).parents('.full-mid-content').addClass('collpsed').next('.expend-content').slideDown();
        });
        $('a.read-less').on('click', function() {
            $(this).parents('.full-mid-content').removeClass('collpsed').next('.expend-content').slideUp();
        });

        $('.list-navigation li a').hover(function() {
            $('body').toggleClass('menu-hover');
        })
    })
    // Mobile Menu
    $(document).ready(function() {
        $('.toggle-menu').on('click', function() {
            $('body').toggleClass('open-menu');
            if ($('body').hasClass('open-menu')) {
                $('.toggle-menu label').html('<label>close</label>');
            } else {
                $('.toggle-menu label').html('<label>menu</label>');
            }
        })
    });

    var title = "";
    $(document).mousemove(function(e) {

        $(".list-navigation li").each(function(i, v) {

            var container = v;
            var img = $(this).children()[0];

            if ((e.pageY < $(img).offset().top ||
                    e.pageY > $(img).offset().top + $(img).height() ||
                    e.pageX < $(img).offset().left ||
                    e.pageX > $(img).offset().left + $(img).width())) {

                if ($(container).children().length == 2) {
                    $(container).children()[0].title = $($(container).children()[1]).html();
                    container.removeChild($(container).children()[1]);
                }

            } else {
                if ($(container).children().length == 1) {
                    title = $("<div class='img_title'>" + $(container).children()[0].title + "</div>");
                    $(container).children()[0].title = "";
                    $(container).append(title);
                }
                title.offset({
                    top: (e.pageY ? e.pageY : e.clientX),
                    left: (e.pageX ? e.pageX : e.clientY)
                });
            }
        });

    });

    //$('.parallax-window').parallax({imageSrc: 'http://3.21.200.27/lobo-wp/wp-content/themes/lobo/assets/images/see-project-bg.png'});
    //$('.cta-content').parallax({imageSrc: 'http://3.21.200.27/lobo-wp/wp-content/themes/lobo/assets/images/see-project-bg.png'});
    // $('.home-call-to-action').parallax({imageSrc: 'http://3.21.200.27/lobo-wp/wp-content/themes/lobo/assets/images/ctn-bg.jpg'});
    //$('.bolg-call-to-action-img').parallax({imageSrc: 'http://3.21.200.27/lobo-wp/wp-content/themes/lobo/assets/images/veera.jpg'});
    //$('.digital-call-to-action').parallax({imageSrc: 'http://3.21.200.27/lobo-wp/wp-content/themes/lobo/assets/images/get-touch-bg.jpg'});

    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) {
            $('.home-banner-section').addClass('change-bg');
        } else {
            $('.home-banner-section').removeClass('change-bg');
        }
    });


    // Home banner Blurb

    $(document).ready(function() {
        var cursor = $(".cursor");

        $('.home-banner-content p label, .creating-happy h1 span').mousemove(function(e) {
            cursor.css({
                top: e.clientY - cursor.height() / 2,
                left: e.clientX - cursor.width() / 2
            });
        });

        $('.home-banner-content p label')
            .mouseleave(function() {
                cursor.css({
                    opacity: "0"
                });
                $(this).parents('.home-banner-content p').removeClass('active');
            })
            .mouseenter(function() {
                cursor.css({
                    opacity: "1"
                });
                $(this).parents('.home-banner-content p').addClass('active');

            });
        $('.creating-happy h1 span')
            .mouseleave(function() {
                cursor.css({
                    opacity: "0"
                });
            })
            .mouseenter(function() {
                cursor.css({
                    opacity: "1"
                });
            });
    });
    $('.work-magic-section h1 span').click(function() {
        $(this).addClass('explode');
        setTimeout(function() {
            $('.work-magic-section h1 span').removeClass('explode');
        }, 2000)
    })


    $('.img-parallax').each(function() {
        var img = $(this);
        var imgParent = $(this).parent();

        function parallaxImg() {
            var speed = img.data('speed');
            var imgY = imgParent.offset().top;
            var winY = $(this).scrollTop();
            var winH = $(this).height();
            var parentH = imgParent.innerHeight();


            // The next pixel to show on screen
            var winBottom = winY + winH;

            // If block is shown on screen
            if (winBottom > imgY && winY < imgY + parentH) {
                // Number of pixels shown after block appear
                var imgBottom = ((winBottom - imgY) * speed);
                // Max number of pixels until block disappear
                var imgTop = winH + parentH;
                // Porcentage between start showing until disappearing
                var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
            }
            img.css({
                top: imgPercent + '%',
                transform: 'translate(-50%, -' + imgPercent + '%)'
            });
        }
        $(document).on({
            scroll: function() {
                parallaxImg();
            },
            ready: function() {
                parallaxImg();
            }
        });
    });
    new WOW().init();
    $('.inner-detail-career a').on('click', function() {
        $(this).addClass('active');
    })
})(jQuery);
(function($) {
    $.fn.addClassAndRemove = function(classAdd, timeAdd, timeRemove) {
        let element = this;
        let addIt = function() {
            element.addClass(classAdd);
        };
        let removeIt = function() {
            element.removeClass(classAdd);
        };
        setTimeout(function() {
            addIt();
            setTimeout(removeIt, timeRemove);
        }, timeAdd);
        return this;
    };
}(jQuery));

// Just to call the function and see how it works
$('.toggle-menu').off().click(function(e) {
    $('.navigation-page ul li').addClassAndRemove('animated', 0, 2500);
    $('.navigation-page .nav-social').addClassAndRemove('animated', 0, 2500);
});