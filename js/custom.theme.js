! function(e) {
    "use strict";
    var a = [];
    a.win = e(window), a.winHeight = window.innerHeight, a.winScrollTop = a.win.scrollTop(), a.winHash = window.location.hash.replace("#", ""), a.doc = e(document), a.backTop = e("#back-top"), a.headerWrap = e("#header"), a.footerWrap = e("#footer"), a.MenuPanel = e("#menu-panel"), a.MenuOverTrigger = e("#navi-trigger"), a.MenuPanel2 = e("#menu-panel2"), a.MenuOverTrigger2 = a.MenuPanel2.find(".navi-trigger"), a.jplayer = e("#jquery_jplayer"), a.headerNavi = e("#navi-header"), a.scrollWidthGet = e("#get-scroll-width"), a.searchOpen = e(".search-top-btn-class"), a.commentform = e("#commentform"), a.wrapOuter = e("#wrap-outer"), a.body = e("body"), a.uxResponsive = e("body.responsive-ux"), a.wrapAll = e(".wrap-all"), a.pageLoading = e(".page-loading"), a.menupanelMenu = e(".menu-panel .menu"), a.naviWrap = e(".navi-wrap"), a.pagenumsDefault = e(".pagenums-default"), a.headerIcon = e(".portfolio-icon"), a.fullscreenWrap = e(".fullscreen-wrap"), a.cookieconsentSet = e('.sea-cookieconsent-btn[data-type="cookie-bar"]');
    a.isResponsive = function() {
        return !!a.uxResponsive.length
    };
    var n, s, o, i, t, r, l = (s = navigator.userAgent, o = s.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(o[1]) ? {
            name: "IE",
            version: (n = /\brv[ :]+(\d+)/g.exec(s) || [])[1] || ""
        } : "Chrome" === o[1] && null != (n = s.match(/\bOPR\/(\d+)/)) ? {
            name: "Opera",
            version: n[1]
        } : (o = o[2] ? [o[1], o[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (n = s.match(/version\/(\d+)/i)) && o.splice(1, 1, n[1]), {
            name: o[0],
            version: o[1]
        })),
        d = (i = window.navigator.userAgent, t = window.navigator.platform, r = null, -1 !== ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(t) ? r = window.navigator.maxTouchPoints > 1 ? "iOS" : "MacOS" : -1 !== ["iPhone", "iPad", "iPod"].indexOf(t) ? r = "iOS" : -1 !== ["Win32", "Win64", "Windows", "WinCE"].indexOf(t) ? r = "Windows" : /Android/.test(i) ? r = "Android" : !r && /Linux/.test(t) && (r = "Linux"), r);
    a.body.addClass(l.name + l.version + " " + d), a.fnSerchShow = function() {
        var n = e(".menu-panel"),
            s = a.searchOpen.find(".fa-search"),
            o = (s.siblings("form"), e(".menu-panel-bottom-right"), e(".wpml-translation"));
        s.on("click", function() {
            return n.hasClass("search_top_form_shown") ? (n.removeClass("search_top_form_shown"), n.find(".search_top_form_text").blur(), o.css("display", "block")) : (n.addClass("search_top_form_shown"), n.find(".search_top_form_text").focus(), o.css("display", "none")), !1
        })
    }, a.fnResponsiveMenu = function() {
        a.fnUxmobileClass(), e("#woocomerce-cart-side").length && e("#woocomerce-cart-side .ux-woocomerce-cart-a").animate({
            opacity: 1
        }, 400).css("display", "inline-block"), a.win.on("resize", _.debounce(function(e) {
            a.fnUxmobileClass()
        }, 120)), a.MenuOverTrigger.on("click", function() {
            var n = e(".owl-carousel"),
                s = n.data("auto");
            return a.body.is(".show_mobile_menu") ? setTimeout(function() {
                a.body.removeClass("show_mobile_menu"), a.body.hasClass("hide_mobile_menu") || a.body.addClass("hide_mobile_menu"), a.fnSubmenuResetMenupanel(), a.win.scrollTop(a.winScrollTop), n.length && s && n.trigger("play.owl.autoplay")
            }, 10) : (setTimeout(function() {
                a.body.hasClass("show_popup") && (a.body.removeClass("show_popup"), a.body.hasClass("hide_popup") || a.body.addClass("hide_popup")), a.body.addClass("show_mobile_menu"), a.body.hasClass("navi-side-menu") && a.backTop.hasClass("backtop-shown") && a.backTop.removeClass("backtop-shown"), a.wrapAll.scrollTop(0), n.length && s && n.trigger("stop.owl.autoplay")
            }, 10), setTimeout(function() {
                a.body.hasClass("hide_mobile_menu") && a.body.removeClass("hide_mobile_menu")
            }, 100)), !1
        }), (a.body.hasClass("navi-top-menu") || a.body.hasClass("navi-side-menu")) && (a.MenuOverTrigger2.on("click", function() {
            return a.fnCloseMenupanel2(), !1
        }), e("#hide-menupanel-mask").on("click", function() {
            return a.fnCloseMenupanel2(), !1
        })), a.menupanelMenu.length && a.fnSubMenu(e(".menu-panel .menu"))
    }, a.fnCloseMenupanel2 = function() {
        setTimeout(function() {
            a.body.hasClass("show_mobile_menu") && a.body.removeClass("show_mobile_menu"), a.body.hasClass("hide_menu") || a.body.addClass("hide_menu"), a.fnSubmenuResetMenupanel(), a.MenuPanel2.hasClass("search_top_form_shown") && a.MenuPanel2.removeClass("search_top_form_shown")
        }, 10), a.body.hasClass("navi-side-menu") && setTimeout(function() {
            window.dispatchEvent(new Event("resize"))
        }, 10), setTimeout(function() {
            a.body.hasClass("hide_menu") && a.body.removeClass("hide_menu")
        }, 900)
    }, a.fnSubmenuResetMenupanel = function() {
        a.naviWrap.find("ul").hasClass("show-submenu") && a.naviWrap.find("ul").removeClass("show-submenu"), a.naviWrap.find("li").hasClass("show-submenu-active") && a.naviWrap.find("li").removeClass("show-submenu-active")
    }, a.fnUxmobileClass = function() {
        a.win.width() > 767 ? (a.body.removeClass("ux-mobile"), a.body.hasClass("menu-icon-horizon-menu") && (a.body.hasClass("navi-show-icon") || a.body.addClass("navi-show-icon"))) : (a.body.addClass("ux-mobile"), a.body.hasClass("menu-icon-horizon-menu") && a.body.hasClass("navi-show-icon") && a.body.removeClass("navi-show-icon"))
    }, a.fnJplayerCall = function() {
        a.jplayer.length && (a.jplayer.jPlayer({
            ready: function() {
                e(this).jPlayer("setMedia", {
                    mp3: ""
                })
            },
            swfPath: JS_PATH,
            supplied: "mp3",
            wmode: "window"
        }), e(".audiobutton").each(function() {
            a.fnAudioPlay(e(this))
        }))
    }, a.fnAudioPlay = function(n) {
        n.on("click", function() {
            var n = e(this).attr("id");
            e(this).hasClass("pause") ? (e(".audiobutton").removeClass("play").addClass("pause"), e(this).removeClass("pause").addClass("play"), a.jplayer.jPlayer("setMedia", {
                mp3: e(this).attr("rel")
            }), a.jplayer.jPlayer("play"), a.jplayer.bind(e.jPlayer.event.ended, function(a) {
                e("#" + n).removeClass("play").addClass("pause")
            })) : e(this).hasClass("play") && (e(this).removeClass("play").addClass("pause"), a.jplayer.jPlayer("stop"))
        })
    }, a.fnSetMenuLevel = function(n, s) {
        s && s.each(function(s) {
            e(this).addClass("level-" + n), e(this).hasClass("menu-item-has-children") && a.fnSetMenuLevel(n + 1, e(this).find("> .sub-menu > li"))
        })
    }, a.fnSubMenu = function(n) {
        a.NaviWrapMobile = n, a.fnSetMenuLevel(1, a.NaviWrapMobile.find("> li")), a.NaviWrapMobile.find("li").each(function(n) {
            var s = e(this),
                o = s.find("> a");
            s.hasClass("menu-item-has-children") ? (s.find("> .sub-menu").prepend('<li class="menu-item-back"><a href="#" class="menu-item-back-a menu-arrow"><span class="menu-arrow-in"></span></a></li>'), o.append('<span class="submenu-icon"></span>'), o.on("click", function() {
                var e = o.parent(".menu-item");
                return e.parent("ul").hasClass("show-submenu") ? e.parent("ul").removeClass("show-submenu") : e.parent("ul").addClass("show-submenu"), e.hasClass("show-submenu-active") ? e.removeClass("show-submenu-active") : e.addClass("show-submenu-active"), !1
            }), s.find("> .sub-menu > .menu-item-back > a").on("click", function() {
                var a = e(this).parent().parent().parent();
                a.find("> a");
                return a.parent("ul").hasClass("show-submenu") && a.parent("ul").removeClass("show-submenu"), a.hasClass("show-submenu-active") && a.removeClass("show-submenu-active"), !1
            })) : o.on("click", function() {
                if (Modernizr.touchevents) {
                    if ("#" == e(this).attr("href"));
                    else if ("_blank" != e(this).attr("target") && !e(this).parent().hasClass("current-menu-anchor") && !e(this).parent().hasClass("menu-item-has-children")) return a.fnPageLoadingEvent(e(this)), !1
                } else if ("#" == e(this).attr("href"));
                else if ("_blank" != e(this).attr("target") && !e(this).parent().hasClass("current-menu-anchor") && !e(this).parent().hasClass("menu-item-has-children")) return a.fnPageLoadingEvent(e(this)), !1
            })
        })
    }, a.fnHeaderSubMenuOffScreen = function() {
        a.headerNavi.find("li").on("mouseenter mouseleave", function(n) {
            var s = e(this);
            if (e("ul", this).length) {
                var o = e("ul:first", this);
                o.offset().left + o.width() <= a.win.width() ? s.removeClass("sub-menu-edge") : s.addClass("sub-menu-edge")
            }
        })
    }, a.fnMainAnima = function() {
        a.backTop.length && a.win.bind("scroll", _.throttle(function() {
            (a.win.scrollTop() >= a.doc.height() - a.win.height() - 100 || a.win.scrollTop() > a.win.height()) && setTimeout(function() {
                a.backTop.hasClass("backtop-shown") || a.backTop.addClass("backtop-shown")
            }, 10), a.win.scrollTop() < a.win.height() && a.backTop.hasClass("backtop-shown") && a.backTop.removeClass("backtop-shown")
        }, 300))
    }, a.fnHeaderIconClick = function() {
        a.headerIcon.on("click", function() {
            e(this);
            return a.body.hasClass("show_popup") ? setTimeout(function() {
                a.body.removeClass("show_popup"), a.body.hasClass("show_popup") || a.body.addClass("hide_popup"), a.win.scrollTop(a.winScrollTop)
            }, 10) : (a.body.addClass("show_popup"), a.body.hasClass("show_popup") && a.body.removeClass("hide_popup"), a.body.hasClass("show_mobile_menu") && a.body.removeClass("show_mobile_menu"), a.wrapAll.scrollTop(0)), !1
        })
    }, a.fnPageLoadingEvent = function(e) {
        var n = e.attr("href");
        n && (a.pageLoading.length && setTimeout(function() {
            a.pageLoading.addClass("visible")
        }, 100), a.body.addClass("ux-start-hide"), a.wrapOuter.css("height", "auto"), setTimeout(function() {
            window.location.href = n
        }, 400))
    }, a.header_sticky = function() {
        var n = 0;
        a.win.bind("scroll", _.throttle(function() {
            var s = e(this).scrollTop(),
                o = a.headerWrap.data("scroll") ? a.headerWrap.data("scroll") : 50;
            a.body.hasClass("header-sticky") ? s > o ? a.body.hasClass("header-scrolled") || a.body.addClass("header-scrolled") : a.body.hasClass("header-scrolled") && a.body.removeClass("header-scrolled") : a.body.hasClass("header-sticky-back") ? (s > n ? (setTimeout(function() {
                a.body.hasClass("header-scrolled") && a.body.removeClass("header-scrolled")
            }, 100), !a.body.hasClass("header-scrolling") && s > 100 && a.body.addClass("header-scrolling")) : (s > 10 ? a.body.hasClass("header-scrolled") || a.body.addClass("header-scrolled") : a.body.hasClass("header-scrolled") && a.body.removeClass("header-scrolled"), a.body.hasClass("header-scrolling") && a.body.removeClass("header-scrolling")), n = s) : a.body.hasClass("header-sticky-none") && a.headerWrap.hasClass("ux-header-hide") && (s > o ? setTimeout(function() {
                a.body.hasClass("header-scrolled") || a.body.addClass("header-scrolled")
            }, 10) : setTimeout(function() {
                a.body.hasClass("header-scrolled") && a.body.removeClass("header-scrolled")
            }, 10))
        }, 300))
    }, a.headerJustifed = function() {
        var n = e(".navi-logo"),
            s = e("#navi-header .menu"),
            o = s.children("li:first-child"),
            i = e("#woocomerce-cart-side"),
            t = e(".navi-trigger-out"),
            r = e(".header-portfolio-icon");
        a.win.width() > 767 ? (n.length && o.length && n.insertBefore(o), r.length ? s.append(r) : i.length && s.append(i)) : (n.insertBefore(e(".head-meta")), r.length && t.length && t.before(r)), setTimeout(function() {
            a.headerWrap.hasClass("ux-justified-menu-shown") || a.headerWrap.addClass("ux-justified-menu-shown")
        }, 100)
    }, a.get_scrollbar_width = function() {
        var e = a.scrollWidthGet.width();
        a.body.get(0).style.setProperty("--get-scroll-width", +e + "px")
    }, a.get_header_footer_size = function() {
        if (a.headerWrap.length) {
            var e = a.headerWrap.height();
            a.body.get(0).style.setProperty("--header-height", +e + "px")
        }
        if (a.footerWrap.length) {
            var n = a.footerWrap.height();
            a.body.get(0).style.setProperty("--footer-height", +n + "px")
        }
    }, a.get_win_height = function() {
        a.body.get(0).style.setProperty("--get-win-height", +a.winHeight + "px")
    }, a.passwordProtectPlacehoder = function() {
        e("form.post-password-form :input[type=password]").each(function(a, n) {
            var s = e(n).attr("id"),
                o = null;
            s && 1 == (o = e(n).parents("form").find("label[for=" + s + "]")).length && e(n).attr("placeholder", e(o).text())
        })
    }, a.doc.ready(function() {
        e(".post-password-form").length && a.passwordProtectPlacehoder(), a.body.removeClass("preload"), a.body.removeClass("ux-start-hide"), a.scrollWidthGet.length && a.get_scrollbar_width(), (a.headerWrap.length || a.footerWrap.length) && a.get_header_footer_size(), a.get_win_height(), a.win.on("resize", _.debounce(function(e) {
            a.scrollWidthGet.length && a.get_scrollbar_width(), (a.headerWrap.length || a.footerWrap.length) && a.get_header_footer_size(), a.get_win_height()
        }, 120)), e(".navi-justified").length && (a.headerJustifed(), e(window).bind("resize", a.headerJustifed)), a.win.find("img").imagesLoaded(function() {
            a.fnResponsiveMenu()
        }), a.pagenumsDefault.length && a.pagenumsDefault.each(function() {
            var a = e(this);
            a.find(".prev").length && a.find(".next").length && a.find(".next").after(a.find(".prev"))
        }), e(".audiobutton").length && a.fnJplayerCall(), a.headerIcon.length && a.fnHeaderIconClick(), a.pageLoading.length && (e(".logo-a,.carousel-des-wrap-tit-a").on("click", function() {
            return a.fnPageLoadingEvent(e(this)), !1
        }), e(".menu-item:not(.menu-item-has-children) > a, .wpml-language-flags a").on("click", function() {
            if (-1 != this.href.indexOf("#"));
            else if ("_blank" != e(this).attr("target")) return a.body.hasClass("show_mobile_menu") && a.body.removeClass("show_mobile_menu"), a.fnPageLoadingEvent(e(this)), !1
        }), e(".grid-item-mask-link:not(.lightbox-item), a.ux-hover-wrap-a, .grid-item-tit-a, .title-wrap a, .page-numbers,.archive-item a,.arrow-item,.article-meta-unit a,.blog-unit-more-a,.article-cate-a,.archive-more-a").on("click", function() {
            if (-1 != this.href.indexOf("#"));
            else if ("_blank" != e(this).attr("target")) return a.fnPageLoadingEvent(e(this)), !1
        }), e(".widget_archive a, .widget_recent_entries a, .widget_search a, .widget_pages a, .widget_nav_menu a, .widget_tag_cloud a, .widget_calendar a, .widget_text a, .widget_meta a, .widget_categories a, .widget_recent_comments a, .widget_tag_cloud a").on("click", function() {
            if ("_blank" != e(this).attr("target")) return a.fnPageLoadingEvent(e(this)), !1
        }))
    }), a.win.on("load", function() {
        if (a.winHash && -1 == a.winHash.search("&") && (a.winHashTarget = e("#" + a.winHash), a.winHashTarget.length && a.winHash && a.win.find("img").imagesLoaded(function() {
                e("html, body").animate({
                    scrollTop: a.winHashTarget.offset().top
                }, 300)
            })), a.cookieconsentSet.length && a.cookieconsentSet.on("click", function() {
                var a = e(this).parents(".sea-cookie-consent"),
                    n = e(this).attr("data-cookie");
                return e.post(ajaxurl, {
                    action: "arttheme_interface_ajax_cookie_consent_bar",
                    cookieConsentBar: n
                }).done(function(e) {
                    "ok" == e && a.addClass("cookieconsent-hide")
                }), !1
            }), a.commentform.length) {
            var n = a.commentform.find('input[name="idi_privacy_policy"]'),
                s = a.commentform.find('input[type="submit"]');
            a.commentform.find(".privacy-policy").length && s.attr("disabled", "disabled"), n.change(function() {
                e(this).is(":checked") ? s.removeAttr("disabled") : s.attr("disabled", "disabled")
            })
        }
        new LazyLoad({
            elements_selector: ".lazy"
        }), setTimeout(function() {
            a.pageLoading.removeClass("visible")
        }, 10), a.backTop.length && a.backTop.on({
            "touchstart click": function() {
                e("html, body").animate({
                    scrollTop: 0
                }, 1200)
            }
        }), a.searchOpen.length && a.fnSerchShow(), a.fnMainAnima(), a.headerWrap.length && (a.header_sticky(), a.win.on("resize", _.debounce(function(e) {
            a.win.width() < 601 && a.header_sticky()
        }, 120))), a.headerNavi.length && a.fnHeaderSubMenuOffScreen(), a.win.bind("scroll", _.throttle(function() {
            a.body.hasClass("show_mobile_menu") || a.body.hasClass("show_popup") || (a.winScrollTop = a.win.scrollTop())
        }, 300))
    }), window.onpageshow = function(n) {
        n.persisted && (a.body.hasClass("ux-start-hide") && a.body.removeClass("ux-start-hide"), a.pageLoading.length && a.pageLoading.hasClass("visible") && a.pageLoading.removeClass("visible"), e("#wrap").css("opacity", "1"))
    }
}(jQuery);