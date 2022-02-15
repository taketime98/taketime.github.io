(function($) {
    "use stict";

    placeholderToggle();
    setMenu();
    setPrettyPhoto();


    $('.contact-form [type="submit"]').on('click', function() {
        SendMail();
    });

    $(window).on('load', function() {
        isotopeSetUp();
        imageSliderSettings();
        animateElement();

        $('#toggle').on("click", multiClickFunctionStop);
        $('.site-content, #toggle').addClass('all-loaded');
        $('.doc-loader').fadeOut();
        $('body').removeClass('wait-preloader');
    });

    $(window).on('resize', function() {
        animateElement();
    });

    $(window).on('scroll', function() {
        animateElement();
    });




    //------------------------------------------------------------------------
    //Helper Methods -->
    //------------------------------------------------------------------------

    function placeholderToggle() {
        $('input, textarea').on('focus', function() {
            $(this).data('placeholder', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        });
        $('input, textarea').on('blur', function() {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    }

    function animateElement(e) {
        $(".animate").each(function(i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).addClass('show-it');
            }
        });
    }

    function multiClickFunctionStop(e) {
        e.preventDefault();
        $('#toggle').off("click");
        $('#toggle').toggleClass("on");

        $('html, body, .sidebar, .menu-holder-back, .menu-holder-front, .site-content').toggleClass("open").delay(500).queue(function(next) {
            $(this).toggleClass("done");
            next();
        });
        $('#toggle').on("click", multiClickFunctionStop);
    }

    function setMenu() {
        $('.main-menu').smartmenus({
            subMenusSubOffsetX: 1,
            subMenusSubOffsetY: -8,
            markCurrentItem: true
        });
    }

    function isotopeSetUp() {
        $('.grid').isotope({
            itemSelector: '.grid-item',
            transitionDuration: 0,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    }

    function setPrettyPhoto() {
        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false,
            /* false OR interval time in ms */
            overlay_gallery: false,
            /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });
    }

    function imageSliderSettings() {
        $(".simple-image-slider-wrapper").each(function() {
            var id = $(this).attr('id');
            var speed_value = $(this).data('speed');
            var auto_value = $(this).data('auto');

            if (auto_value === true) {
                var mySwiper = new Swiper('#' + id, {
                    speed: 700,
                    autoplay: {
                        delay: speed_value
                    },
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination-' + id,
                        clickable: true
                    }
                });
                $('#' + id).hover(function() {
                    mySwiper.autoplay.stop();
                }, function() {
                    mySwiper.autoplay.start();
                });
            } else {
                var mySwiper = new Swiper('#' + id, {
                    speed: 700,
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination-' + id,
                        clickable: true
                    }
                });
            }
        });
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    function SendMail() {

        var emailVal = $('#contact-email').val();

        if (isValidEmailAddress(emailVal)) {
            var params = {
                'action': 'SendMessage',
                'name': $('#name').val(),
                'email': $('#contact-email').val(),
                'subject': $('#subject').val(),
                'message': $('#message').val()
            };
            $.ajax({
                type: "POST",
                url: "php/sendMail.php",
                data: params,
                success: function(response) {
                    if (response) {
                        var responseObj = $.parseJSON(response);
                        if (responseObj.ResponseData) {
                            alert(responseObj.ResponseData);
                        }
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    //xhr.status : 404, 303, 501...
                    var error = null;
                    switch (xhr.status) {
                        case "301":
                            error = "Redirection Error!";
                            break;
                        case "307":
                            error = "Error, temporary server redirection!";
                            break;
                        case "400":
                            error = "Bad request!";
                            break;
                        case "404":
                            error = "Page not found!";
                            break;
                        case "500":
                            error = "Server is currently unavailable!";
                            break;
                        default:
                            error = "Unespected error, please try again later.";
                    }
                    if (error) {
                        alert(error);
                    }
                }
            });
        } else {
            alert('Your email is not in valid format');
        }
    }

})(jQuery);