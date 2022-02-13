function UxCBInitPhotoSwipeFromDOM(t) {
    for (var e = function(t) {
            (t = t || window.event).preventDefault ? t.preventDefault() : t.returnValue = !1;
            var e = function t(e, a) {
                return e && (a(e) ? e : t(e.parentNode, a))
            }(t.target || t.srcElement, function(t) {
                if (t.tagName) return t.hasAttribute("data-lightbox") && "true" === t.getAttribute("data-lightbox")
            });
            if (e) {
                for (var o, i = jQuery(e).parents(".lightbox-photoswipe"), n = i.find('[data-lightbox="true"]'), r = n.length, l = 0, s = 0; s < r; s++)
                    if (1 === n[s].nodeType) {
                        if (n[s] === e) {
                            o = l;
                            break
                        }
                        l++
                    }
                return o >= 0 && a(o, i[0]), !1
            }
            if ("A" == t.target.nodeName) {
                if ("_blank" != t.target.target) return window.location.href = t.target.href;
                window.open(t.target.href, "_blank")
            }
        }, a = function(t, e, a, o) {
            var i, n, r, l = document.querySelectorAll(".pswp")[0],
                s = [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: !0
                }];
            if (r = function(t) {
                    for (var e, a, o, i, n = jQuery(t).find('[data-lightbox="true"]'), r = n.length, l = [], s = 0; s < r; s++) 1 === (e = n[s]).nodeType && (o = (a = jQuery(e).find(".lightbox-item")).attr("data-size").split("x"), i = "video" == a.attr("data-type") ? {
                        html: a.find("> div").html()
                    } : {
                        src: a.attr("href"),
                        w: parseInt(o[0], 10),
                        h: parseInt(o[1], 10)
                    }, e.children.length > 0 && (i.title = a.attr("data-title") ? a.attr("data-title") : a.attr("title")), a.find("img").length > 0 && (i.msrc = a.find("img").attr("src")), i.el = e, l.push(i));
                    return l
                }(e), "undefined" != typeof photoSwipeLocalize && (s = photoSwipeLocalize), n = {
                    index: t,
                    galleryUID: e.getAttribute("data-pswp-uid"),
                    showHideOpacity: !0,
                    getThumbBoundsFn: function(t) {
                        var e = r[t].el.getElementsByTagName("img")[0],
                            a = window.pageYOffset || document.documentElement.scrollTop,
                            o = e.getBoundingClientRect();
                        return {
                            x: o.left,
                            y: o.top + a,
                            w: o.width
                        }
                    },
                    addCaptionHTMLFn: function(t, e, a) {
                        return t.title ? (e.children[0].innerHTML = t.title, !0) : (e.children[0].innerText = "", !1)
                    },
                    getImageURLForShare: function(e) {
                        return r[t].src || ""
                    },
                    shareButtons: s,
                    getPageURLForShare: function(e) {
                        return r[t].src || ""
                    },
                    getTextForShare: function(e) {
                        return r[t].title || ""
                    },
                    parseShareButtonOut: function(t, e) {
                        return e
                    }
                }, o)
                if (n.galleryPIDs) {
                    for (var d = 0; d < r.length; d++)
                        if (r[d].pid == t) {
                            n.index = d;
                            break
                        }
                } else n.index = parseInt(t, 10) - 1;
            else n.index = parseInt(t, 10);
            if (!isNaN(n.index)) {
                for (var u = document.getElementsByName("gallery-style"), f = 0, c = u.length; f < c; f++)
                    if (u[f].checked) {
                        "radio-all-controls" == u[f].id || "radio-minimal-black" == u[f].id && (n.mainClass = "pswp--minimal--dark", n.barsSize = {
                            top: 0,
                            bottom: 0
                        }, n.captionEl = !1, n.fullscreenEl = !1, n.shareEl = !1, n.bgOpacity = .85, n.tapToClose = !0, n.tapToToggleControls = !1);
                        break
                    }
                a && (n.showAnimationDuration = 0), (i = new PhotoSwipe(l, PhotoSwipeUI_Default, r, n)).init(), i.listen("beforeChange", function() {
                    var t = jQuery(i.currItem.container);
                    jQuery(".videoWrapper iframe").removeClass("active");
                    t.find(".videoWrapper iframe").addClass("active");
                    jQuery(".videoWrapper iframe").each(function() {
                        jQuery(this).hasClass("active") || jQuery(this).attr("src", jQuery(this).attr("src"))
                    })
                }), i.listen("close", function() {
                    isFilterClick = !0, jQuery(".videoWrapper iframe").each(function() {
                        jQuery(this).attr("src", jQuery(this).attr("src"))
                    })
                })
            }
        }, o = document.querySelectorAll(t), i = 0, n = o.length; i < n; i++) o[i].setAttribute("data-pswp-uid", i + 1), o[i].onclick = e;
    var r = function() {
        var t = window.location.hash.substring(1),
            e = {};
        if (t.length < 5) return e;
        for (var a = t.split("&"), o = 0; o < a.length; o++)
            if (a[o]) {
                var i = a[o].split("=");
                i.length < 2 || (e[i[0]] = i[1])
            }
        return e.gid && (e.gid = parseInt(e.gid, 10)), e.hasOwnProperty("pid") ? (e.pid = parseInt(e.pid, 10), e) : e
    }();
    r.pid > 0 && r.gid > 0 && a(r.pid - 1, o[r.gid - 1], !0, !0)
}
UxCBModModuleIsotope = [],
    function(t) {
        "use strict";
        var e = [];
        e.win = t(window), e.doc = t(document), e.body = t("body"), e.itemQueue = [], e.itemDelay = 150, e.queueTimer, e.isMobile = function() {
            return !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || e.win.width() < 769)
        }, e.fnParseQuery = function(t) {
            for (var e = /([^=&\s]+)[=\s]*([^=&\s]*)/g, a = {}; e.exec(t);) a[RegExp.$1] = RegExp.$2;
            return a
        }, e.fnListItemQueue = function() {
            e.queueTimer || (e.queueTimer = window.setInterval(function() {
                if (e.itemQueue.length) {
                    var a = t(e.itemQueue).parents(".moudle_has_animation");
                    if (a.length) {
                        var o = a.find(".animation-scroll-ux");
                        e.fnModuleAnimationScroll(o, a)
                    } else t(e.itemQueue.shift()).addClass("grid-show");
                    e.fnListItemQueue()
                } else window.clearInterval(e.queueTimer), e.queueTimer = null
            }, e.itemDelay))
        }, e.fnModuleAnimationScroll = function(e, a) {
            e.length && e.each(function(e) {
                var a = [];
                a.item = t(this), a.classB = a.item.data("animationend"), a.item.waypoint(function(t) {
                    "down" === t && (a.item.css("transform", null), setInterval(function() {
                        a.item.hasClass(a.classB) || a.item.addClass(a.classB), setTimeout(function() {
                            a.item.removeClass("animation-default-ux").removeClass("animation-scroll-ux")
                        }, 1500)
                    }, 150 * e))
                }, {
                    offset: "80%"
                })
            })
        }, e.fnModuleParentRow = function() {
            var a = t(".bm-builder").find(".bm-row"),
                o = t("body");
            a.length && a.each(function(a, i) {
                var n = t(this),
                    r = n.data("backcolor"),
                    l = n.data("frontcolor"),
                    s = n.data("logocolor"),
                    d = n.data("goto-top"),
                    u = Number(n.data("goto-top-spacing"));
                n.offset().top;
                n.find(".background-video video").length && n.find(".background-video video").each(function(t, e) {
                    e.load()
                }), setTimeout(function() {
                    n.waypoint({
                        handler: function(a) {
                            "down" == a ? (o.get(0).style.setProperty("--univer-bgcolor", r), e.body.get(0).style.setProperty("--fontcolor-univer", l), e.body.hasClass("bm-enable-univer") || e.body.addClass("bm-enable-univer"), "null" == l || "" == l || e.body.hasClass("bm-enable-univer-textcolor") || e.body.addClass("bm-enable-univer-textcolor"), "default-logo-univer" == s && (e.body.hasClass("default-logo-univer") || (e.body.addClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer"))), "alt-logo-univer" == s && (e.body.hasClass("alt-logo-univer") || (e.body.addClass("alt-logo-univer"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"))), n.is("[data-module]") || (o.get(0).style.setProperty("--univer-bgcolor", "transparent"), t(".bm-univer-color").remove(), e.body.hasClass("bm-enable-univer") && e.body.removeClass("bm-enable-univer"), e.body.hasClass("bm-enable-univer-textcolor") && e.body.removeClass("bm-enable-univer-textcolor"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer")), n.prev().removeAttr("style")) : "up" == a && (n.prev().is("[data-module]") || n.prev() || (o.get(0).style.setProperty("--univer-bgcolor", "transparent"), e.body.hasClass("bm-enable-univer") && e.body.removeClass("bm-enable-univer"), e.body.hasClass("bm-enable-univer-textcolor") && e.body.removeClass("bm-enable-univer-textcolor"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer")))
                        },
                        offset: function() {
                            return .5 * Waypoint.viewportHeight()
                        }
                    }), n.waypoint({
                        handler: function(t) {
                            "down" == t ? n.next().is("[data-module]") || n.next() || (o.get(0).style.setProperty("--univer-bgcolor", "transparent"), e.body.hasClass("bm-enable-univer") && e.body.removeClass("bm-enable-univer"), e.body.hasClass("bm-enable-univer-textcolor") && e.body.removeClass("bm-enable-univer-textcolor"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer")) : "up" == t && (o.get(0).style.setProperty("--univer-bgcolor", r), e.body.get(0).style.setProperty("--fontcolor-univer", l), e.body.hasClass("bm-enable-univer") || e.body.addClass("bm-enable-univer"), "null" == l || "" == l || (e.body.hasClass("bm-enable-univer-textcolor") ? e.body.removeClass("bm-enable-univer-textcolor") : e.body.addClass("bm-enable-univer-textcolor")), "default-logo-univer" == s && (e.body.hasClass("default-logo-univer") || (e.body.addClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer"))), "alt-logo-univer" == s && (e.body.hasClass("alt-logo-univer") || (e.body.addClass("alt-logo-univer"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"))), n.is("[data-module]") || (o.get(0).style.setProperty("--univer-bgcolor", "transparent"), e.body.hasClass("bm-enable-univer") && e.body.removeClass("bm-enable-univer"), e.body.hasClass("bm-enable-univer-textcolor") && e.body.removeClass("bm-enable-univer-textcolor"), e.body.hasClass("default-logo-univer") && e.body.removeClass("default-logo-univer"), e.body.hasClass("alt-logo-univer") && e.body.removeClass("alt-logo-univer")))
                        },
                        offset: function() {
                            return Waypoint.viewportHeight() - (n.height() + .4 * Waypoint.viewportHeight())
                        }
                    }), n.waypoint({
                        handler: function(e) {
                            "down" == e && "on" == d && t("html,body").animate({
                                scrollTop: n.offset().top - u
                            }, 600)
                        },
                        offset: "90%"
                    })
                }, 100)
            })
        }, e.fnModuleFilters = function(a) {
            var o = a.find(".filters [data-filter]"),
                i = a.find(".container-masonry"),
                n = i.find(".masonry-list"),
                r = n.data("unique");
            o.length && o.each(function() {
                t(this).on("click", function() {
                    var o = t(this).attr("data-filter"),
                        l = t(this).attr("data-postid"),
                        s = Number(t(this).find(".filter-num").text()),
                        d = 0,
                        u = 0,
                        f = [],
                        c = 0;
                    i.hasClass("container-masonry") && (d = Number(i.attr("data-found")), u = Number(i.attr("data-number"))), n.hasClass("infiniti-scroll") && n.addClass("infiniti-scrolling");
                    var m = UxCBModModuleIsotope[r];
                    if (m) {
                        m.isotope({
                            filter: o
                        }), a.find(".filters").find("li").removeClass("active"), t(this).parent().addClass("active"), "*" != o && (c = t(this).attr("data-catid"), d = s), n.find("section").each(function() {
                            var a = t(this).attr("data-postid");
                            "*" == o ? f.push(a) : t(this).is(o) && (f.push(a), e.itemQueue.push(t(this).find(".grid-item-inside")))
                        });
                        var h = i.find(".page_twitter");
                        if (f.length >= d ? h.hide() : h.show(), f.length < u && "*" != o) {
                            var g = u - f.length;
                            t.post(ajaxurl, {
                                action: "ux_cb_module_grid_container",
                                catID: c,
                                postID: l,
                                post__not_in: f,
                                postNumber: g,
                                moduleUnique: r
                            }).done(function(a) {
                                var r = t(a);
                                (m.isotope("insert", r), n.hasClass("masonry-grid") && (e.fnIsotopeListResize(i), m.isotope("layout")), n.hasClass("infiniti-scroll")) ? n.removeClass("infiniti-scrolling"): n.find("section" + o).length >= d ? h.hide() : h.show();
                                setTimeout(function() {
                                    new LazyLoad, r.find(".grid-item-inside").length && r.find(".grid-item-inside").each(function() {
                                        e.itemQueue.push(t(this).find(".grid-item-inside"))
                                    }), r.find(".grid-item-mask-link").length && r.find(".grid-item-mask-link").removeAttr("title")
                                }, 10)
                            })
                        } else n.removeClass("infiniti-scrolling")
                    }
                    return !1
                })
            })
        }, e.fnModuleLoadmore = function(a) {
            var o = a.find(".page_twitter"),
                i = o.find("> a"),
                n = a.find(".container-masonry"),
                r = n.find(".masonry-list"),
                l = o.data("unique"),
                s = o.attr("data-moduleid");
            i.on("click", function() {
                var d = t(this),
                    u = t(this).attr("data-postid"),
                    f = (Number(t(this).attr("data-max")), Number(t(this).attr("data-paged"))),
                    c = o.attr("data-pagetext"),
                    m = o.attr("data-loadingtext"),
                    h = 0,
                    g = 0,
                    p = [],
                    b = a.find(".filters"),
                    v = UxCBModModuleIsotope[l],
                    y = "ux_cb_module_grid_container";
                return n.hasClass("container-masonry") && (h = Number(n.attr("data-found"))), "masonry-grid" == s && (y = "ux_cb_module_masonry_grid_container", h = Number(d.attr("data-found"))), r.find("section").each(function() {
                    var e = t(this).attr("data-postid");
                    if (b.length) {
                        var a = b.find("li.active"),
                            o = a.find("> a").attr("data-filter");
                        Number(a.find(".filter-num").text());
                        "*" == o ? p.push(e) : (g = a.find("> a").attr("data-catid"), t(this).is(o) && p.push(e))
                    } else p.push(e)
                }), i.text(m), r.hasClass("loading-more") || (r.addClass("loading-more"), t.post(ajaxurl, {
                    action: y,
                    catID: g,
                    postID: u,
                    post__not_in: p,
                    moduleUnique: l,
                    "paged-s": f
                }).done(function(l) {
                    var u = t(l),
                        m = r.find("section[data-postid]").length;
                    if ("masonry-grid" == s ? (o.prev().append(u), UxCBModGlobal["masonry-grid"] && UxCBModGlobal["masonry-grid"].fnGridStackResize(o.prev()), m = a.find(".grid-stack-item[data-postid]").length) : (v.isotope("insert", u), r.hasClass("masonry-grid") && (e.fnIsotopeListResize(n), v.isotope("layout")), m = r.find("section[data-postid]").length), i.text(c), r.removeClass("loading-more"), d.attr("data-paged", f + 1), b.length) {
                        var g = b.find("li.active"),
                            p = g.find("> a").attr("data-filter"),
                            y = Number(g.find(".filter-num").text());
                        "*" != p ? (m = v.find("section" + p + "[data-postid]").length, h = y) : h = y
                    }
                    m >= h ? o.hide() : o.show(), setTimeout(function() {
                        new LazyLoad, u.find(".grid-item-inside").length && u.find(".grid-item-inside").each(function() {
                            e.itemQueue.push(t(this))
                        }), u.find(".grid-item-mask-link").length && u.find(".grid-item-mask-link").removeAttr("title")
                    }, 10)
                })), !1
            })
        }, e.fnModuleInfinitiScroll = function(a) {
            var o = a.find(".container-masonry"),
                i = o.find(".masonry-list"),
                n = i.data("unique");
            i.find("section:last").waypoint({
                handler: function(r) {
                    var l = i.attr("data-postid"),
                        s = 0,
                        d = 0,
                        u = [],
                        f = a.find(".filters"),
                        c = UxCBModModuleIsotope[n];
                    o.hasClass("container-masonry") && (s = Number(o.attr("data-found"))), i.find("section").each(function() {
                        var e = t(this).attr("data-postid");
                        if (f.length) {
                            var a = f.find("li.active"),
                                o = a.find("> a").attr("data-filter");
                            Number(a.find(".filter-num").text());
                            "*" == o ? u.push(e) : (d = a.find("> a").attr("data-catid"), t(this).is(o) && u.push(e))
                        } else u.push(e)
                    }), i.hasClass("infiniti-scrolling") || (i.addClass("infiniti-scrolling"), t.post(ajaxurl, {
                        action: "ux_cb_module_grid_container",
                        catID: d,
                        postID: l,
                        post__not_in: u,
                        moduleUnique: n
                    }).done(function(n) {
                        var r = t(n);
                        c.isotope("insert", r), i.hasClass("masonry-grid") && (e.fnIsotopeListResize(o), c.isotope("layout"));
                        var l = i.find("section[data-postid]").length;
                        if (f.length) {
                            var d = f.find("li.active"),
                                u = d.find("> a").attr("data-filter"),
                                m = Number(d.find(".filter-num").text());
                            "*" != u && (l = c.find("section" + u + "[data-postid]").length, s = m)
                        }
                        l < s && i.removeClass("infiniti-scrolling"), e.fnModuleInfinitiScroll(a), setTimeout(function() {
                            new LazyLoad, r.find(".grid-item-mask-link").length && r.find(".grid-item-mask-link").removeAttr("title")
                        }, 100)
                    }))
                },
                offset: "bottom-in-view"
            })
        }, e.fnIsotopeListResize = function(e) {
            var a = window.innerWidth,
                o = e.find(".masonry-list").width(),
                i = e.data("spacer"),
                n = e.data("col"),
                r = Math.floor(o / n),
                l = e.data("ratio"),
                s = e.data("text");
            a >= 768 ? e.find(".masonry-list").find(".grid-item").each(function() {
                t(".grid-item").css({
                    width: 1 * r - i + "px",
                    height: r * l - i + s + "px",
                    margin: .5 * i + "px"
                }), t(".grid-item .ux-lazyload-wrap").css("padding-top", (r * l - i) / (1 * r - i) * 100 + "%")
            }) : (r = Math.floor(o / 1), e.find(".masonry-list").find(".grid-item.grid-item-small").each(function() {
                t(".grid-item").css({
                    width: 1 * r - i + "px",
                    height: r * l - i + s + "px",
                    margin: .5 * i + "px"
                }), t(".grid-item .ux-lazyload-wrap").css("padding-top", (r * l - i) / (1 * r - i) * 100 + "%")
            }))
        }, e.fnInit = function() {
            if (new LazyLoad({
                    elements_selector: ".lazy"
                }), e.module = t(".bm-builder > .module"), e.photoSwipe = t(".lightbox-photoswipe"), e.moduleHasAnimation = t(".module.moudle_has_animation"), e.photoSwipe.length && UxCBInitPhotoSwipeFromDOM(".lightbox-photoswipe"), e.moduleHasAnimation.length && e.moduleHasAnimation.imagesLoaded(function() {
                    e.moduleHasAnimation.each(function() {
                        var a = t(this).find(".animation-scroll-ux");
                        e.fnModuleAnimationScroll(a, t(this))
                    })
                }), e.module.length) {
                var a = 0;
                e.module.each(function(o) {
                    var i = t(this),
                        n = i.parent(".bm-builder"),
                        r = i.width(),
                        l = Number(i.attr("data-module-col")),
                        s = 0,
                        d = i.attr("class").match(/col-offset-[1-9][0-9]?/);
                    if (d) switch (d[0]) {
                        case "col-offset-1":
                            s = 1;
                            break;
                        case "col-offset-2":
                            s = 2;
                            break;
                        case "col-offset-3":
                            s = 3;
                            break;
                        case "col-offset-4":
                            s = 4;
                            break;
                        case "col-offset-5":
                            s = 5;
                            break;
                        case "col-offset-6":
                            s = 6;
                            break;
                        case "col-offset-7":
                            s = 7;
                            break;
                        case "col-offset-8":
                            s = 8;
                            break;
                        case "col-offset-9":
                            s = 9;
                            break;
                        case "col-offset-10":
                            s = 10;
                            break;
                        case "col-offset-11":
                            s = 11
                    }
                    if (i.attr("data-index", o), (a = a + l + s) > 12 || 0 == o || 0 == l) {
                        i.addClass("ux-first-mod-row");
                        var u = t('<div class="bm-row" data-index="' + o + '" data-frontcolor="" data-backcolor="" data-logocolor=""></div>');
                        n.append(u)
                    }
                    if (a > 12 && (a = 0 + l + s), 0 == l && (a = 12), i.hasClass("col-0")) {
                        e.body.outerWidth();
                        t(window).trigger("resize")
                    }(e.body.hasClass("page") || e.body.hasClass("single") || e.body.hasClass("blog")) && (i.find(".filters").length && e.fnModuleFilters(i), i.find(".page_twitter").length && e.fnModuleLoadmore(i), i.find(".infiniti-scroll").length && setTimeout(function() {
                        e.fnModuleInfinitiScroll(i)
                    }, 20))
                }), e.module.each(function(e) {
                    var a = t(this),
                        o = a.data("change-color"),
                        i = a.data("frontcolor"),
                        n = a.data("backcolor"),
                        r = a.data("logocolor"),
                        l = a.data("goto-top"),
                        s = Number(a.data("goto-top-spacing")),
                        d = a.parent(".bm-builder").find(".bm-row"),
                        u = a.data("groupsameheight");
                    i || (i = ""), n || (n = "transparent"), d.each(function() {
                        var d = t(this),
                            f = Number(d.data("index")),
                            c = Number(d.next().data("index"));
                        c ? e >= f && e < c && (d.append(a), "on" == o && "" == d.attr("data-frontcolor") && (d.attr("data-frontcolor", i), d.attr("data-backcolor", n), d.attr("data-logocolor", r), d.attr("data-module", e)), "on" == l && (d.attr("data-goto-top", l), d.attr("data-goto-top-spacing", s)), "on" == u && d.attr("data-groupsameheight", u)) : e >= f && (d.append(a), "on" == o && "" == d.attr("data-frontcolor") && (d.attr("data-frontcolor", i), d.attr("data-backcolor", n), d.attr("data-logocolor", r), d.attr("data-module", e)), "on" == l && (d.attr("data-goto-top", l), d.attr("data-goto-top-spacing", s)), "on" == u && d.attr("data-groupsameheight", u))
                    }), d.removeAttr("data-index")
                }), e.module.find(".grid-item-inside").length && (e.module.find(".grid-item-inside").waypoint(function(t) {
                    e.itemQueue.push(this.element)
                }, {
                    offset: "100%"
                }), e.module.find(".grid-item-inside").each(function(a, o) {
                    t(this).parent().offset().top < e.winScrollTop + e.winHeight && e.itemQueue.push(t(this).find(".grid-item-inside"))
                })), e.fnModuleParentRow()
            }
        }, e.doc.ready(function() {
            UxCBModGlobal && (UxCBModGlobal.global = e)
        }), e.win.on("load", function() {
            e.fnInit()
        })
    }(jQuery);
//text
! function(e) {
    "use strict";
    var a = [];
    a.win = e(window), a.doc = e(document), a.fnModuleTextMaskMod = function() {
        a.textMaskMod.each(function() {
            var a = e(this).parent().parent(),
                t = e(this).find(".background-blend"),
                n = e(this).data("effect"),
                d = a.find(".background-video");
            switch (n) {
                case "standard-to-mask":
                    a.waypoint({
                        handler: function(e) {
                            "down" == e ? (t.addClass("enable-mask").removeClass("disable-mask"), d.length || t.addClass("enable-mask")) : "up" == e && t.removeClass("enable-mask").addClass("disable-mask")
                        },
                        offset: "-10px"
                    });
                    break;
                case "mask-to-standard":
                    a.waypoint({
                        handler: function(e) {
                            "down" == e ? t.removeClass("enable-mask").addClass("disable-mask") : "up" == e && (t.removeClass("disable-mask"), d.length || t.addClass("enable-mask"))
                        },
                        offset: "-10px"
                    })
            }
        })
    }, a.fnTextBgimgClip = function(a) {
        a.each(function() {
            for (var a = e(this).children(), t = a; t.length;) a = t, t = t.children();
            t.is("br") || a.hasClass("text-clip-style") || a.addClass("text-clip-style")
        })
    }, a.fnInit = function() {
        a.module = e(".bm-builder > .module"), a.module.length || e(".bm-builder > .bm-row").length && (a.module = e(".bm-builder > .bm-row > .module")), a.textMaskMod = a.module.find("[data-effect]"), a.textBgimgClip = a.module.find(".bm-text-bgimg-mask"), a.textMaskMod.length && a.fnModuleTextMaskMod(), a.textBgimgClip.length && a.fnTextBgimgClip(a.textBgimgClip)
    }, a.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal.text = a)
    }), a.win.on("load", function() {
        a.fnInit()
    })
}(jQuery);
//single image
! function(l) {
    "use strict";
    var s = [];
    s.win = l(window), s.doc = l(document), s.module = l(".bm-builder > .module"), s.singleImageEmbed = s.module.find(".single-image-embed"), s.singleImageScroll = s.module.find("[data-scrolling]"), s.fnModuleSingleImageEmbed = function(s) {
        s.each(function() {
            var s = l(this),
                e = s.attr("datasrc"),
                i = s.attr("data-color"),
                o = s.attr("data-color-mouseover"),
                n = s.attr("data-color-fill"),
                c = s.attr("data-color-mouseover-fill"),
                t = s.attr("data-width");
            l.get(e, "html").done(function(e) {
                var d = l(e).find("svg");
                d.find("path").css("stroke", i).css("fill", n), d.find("rect").css("stroke", i).css("fill", n), d.find("circle").css("stroke", i).css("fill", n), d.find("ellipse").css("stroke", i).css("fill", n), d.find("line").css("stroke", i).css("fill", n), d.find("polyline").css("stroke", i).css("fill", n), d.find("polygon").css("stroke", i).css("fill", n), d.hover(function() {
                    d.find("path").css("stroke", o).css("fill", c), d.find("rect").css("stroke", o).css("fill", c), d.find("circle").css("stroke", o).css("fill", c), d.find("ellipse").css("stroke", o).css("fill", c), d.find("line").css("stroke", o).css("fill", c), d.find("polyline").css("stroke", o).css("fill", c), d.find("polygon").css("stroke", o).css("fill", c)
                }, function() {
                    d.find("path").css("stroke", i).css("fill", n), d.find("rect").css("stroke", i).css("fill", n), d.find("circle").css("stroke", i).css("fill", n), d.find("ellipse").css("stroke", i).css("fill", n), d.find("line").css("stroke", i).css("fill", n), d.find("polyline").css("stroke", i).css("fill", n), d.find("polygon").css("stroke", i).css("fill", n)
                }), Number(t) && d.width(t).height("auto"), s.after(d), s.remove()
            })
        })
    }, s.fnModuleSingleImageScroll = function(e) {
        e.on("click", function() {
            var e = l(this).data("scrolling"),
                i = 0,
                o = s.win.scrollTop(),
                n = s.win.height(),
                c = s.doc.height();
            switch (e) {
                case "scroll-top":
                    o >= n && (i = o - n);
                    break;
                case "scroll-down":
                    i = o + n;
                    break;
                case "bottom-of-page":
                    c >= n && (i = c - n)
            }
            return l("html,body").animate({
                scrollTop: i
            }, 600), !1
        })
    }, s.fnInit = function() {
        s.module = l(".bm-builder > .module"), s.module.length || l(".bm-builder > .bm-row").length && (s.module = l(".bm-builder > .bm-row > .module")), s.singleImageScroll = s.module.find("[data-scrolling]"), s.singleImageEmbed = s.module.find(".single-image-embed"), s.singleImageScroll.length && s.singleImageScroll.each(function() {
            s.fnModuleSingleImageScroll(l(this))
        }), s.singleImageEmbed.length && s.fnModuleSingleImageEmbed(s.singleImageEmbed)
    }, s.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal["single-image"] = s)
    }), s.win.on("load", function() {
        s.fnInit()
    })
}(jQuery);
//slider
! function(e) {
    "use strict";
    var a = [];
    a.win = e(window), a.doc = e(document), a.body = e("body"), a.fnBMTabSlider = function(t) {
        t.each(function() {
            var t = e(this),
                o = t.parents(".module-inside"),
                l = "default-logo",
                i = "default-menu",
                s = t.find(".bm-tab-slider-trigger-item:first-child").find(".bm-tab-slider-trigger-tilte").data("logocolor"),
                r = t.find(".bm-tab-slider-trigger-item:first-child").find(".bm-tab-slider-trigger-tilte").data("menucolor"),
                d = "",
                n = t.offset().top;
            a.body.hasClass("alt-logo") && (l = "alt-logo"), e(".non_bg_header").length && e(".page_from_top").length && (l != s && n < 80 && (l = s, a.body.removeClass(l).addClass(s)), i != r && n < 80 && (i = r, a.body.removeClass(i).addClass(r))), Modernizr.touchevents ? t.find(".bm-tab-slider-trigger-tilte").on("touchstart", function(t) {
                var o = e(this),
                    s = o.data("id"),
                    r = o.data("logocolor"),
                    d = o.data("menucolor");
                if (e(".non_bg_header").length && e(".page_from_top").length && (l != r && n < 80 && (a.body.removeClass(l).addClass(r), l = r), i != d && n < 80 && (a.body.removeClass(i).addClass(d), i = d), a.body.hasClass("default-logo-menu-mobile") && a.body.removeClass("default-logo-menu-mobile"), a.body.hasClass("alt-logo-menu-mobile") && a.body.removeClass("alt-logo-menu-mobile")), o.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).hasClass("bm-active") || (o.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).addClass("bm-active"), o.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).siblings(".bm-tab-slider-img-item").removeClass("bm-active")), !o.hasClass("bm-active")) return o.addClass("bm-active"), o.parent(".bm-tab-slider-trigger-item").siblings().find(".bm-tab-slider-trigger-tilte").removeClass("bm-active"), t.preventDefault(), !1
            }) : t.find(".bm-tab-slider-trigger-tilte").hover(function() {
                var t = e(this),
                    s = t.data("id"),
                    r = t.data("logocolor"),
                    m = t.data("menucolor");
                e(".non_bg_header").length && e(".page_from_top").length && l != r && n < 80 && (a.body.removeClass(l).addClass(r), l = r), e(".non_bg_header").length && e(".page_from_top").length && i != m && n < 80 && (a.body.removeClass(i).addClass(m), i = m), t.hasClass("bm-active") || (t.addClass("bm-active"), t.parent(".bm-tab-slider-trigger-item").siblings().find(".bm-tab-slider-trigger-tilte").removeClass("bm-active")), t.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).hasClass("bm-active") || (t.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).addClass("bm-active"), t.parents(".bm-tab-slider-trigger").siblings(".bm-tab-slider-img").find("#" + s).siblings(".bm-tab-slider-img-item").removeClass("bm-active")), o.removeClass(d), d = s, o.addClass(s)
            }, function() {
                return !1
            })
        })
    }, a.fnCarousel = function(t) {
        t.each(function() {
            var t = e(this),
                o = t.parent(".slider-mod-wrap"),
                l = t.data("margin"),
                i = t.data("marginmobile"),
                s = t.data("center"),
                r = t.data("item"),
                d = t.data("mobileitem"),
                n = t.data("autowidth"),
                m = t.data("slideby"),
                b = t.data("auto"),
                g = t.data("autoplaytimeout"),
                u = t.data("showdot"),
                c = t.data("nav"),
                f = t.data("animatein"),
                h = t.data("animateout"),
                v = t.data("loop"),
                C = t.data("lazy"),
                p = t.data("transition"),
                y = t.data("mousedrag"),
                w = "";
            setTimeout(function() {
                t.owlCarousel({
                    margin: l,
                    loop: v,
                    autoWidth: n,
                    center: s,
                    animateIn: f,
                    animateOut: h,
                    slideSpeed: p,
                    mouseDrag: y,
                    paginationSpeed: 400,
                    items: r,
                    autoplay: b,
                    responsiveClass: !0,
                    navText: ["", ""],
                    slideBy: m,
                    dots: u,
                    nav: c,
                    autoplayTimeout: g,
                    smartSpeed: p,
                    lazyLoad: C,
                    responsive: {
                        0: {
                            items: d,
                            margin: i
                        },
                        481: {
                            items: r,
                            margin: i
                        },
                        769: {
                            items: r,
                            margin: l
                        }
                    }
                }), o.find("#slider-arrow-left").length && o.find("#slider-arrow-left").on("touchstart click", function() {
                    return t.trigger("prev.owl.carousel", [p]), !1
                }), o.find("#slider-arrow-right").length && o.find("#slider-arrow-right").on("touchstart click", function() {
                    return t.trigger("next.owl.carousel", [p]), !1
                });
                var _ = "default-logo";
                a.body.hasClass("alt-logo") && (_ = "alt-logo");
                var S = "default-menu";
                a.body.hasClass("alt-menu") && (S = "alt-menu");
                var T = _;
                t.on("changed.owl.carousel", function(e) {
                    b && (t.trigger("stop.owl.autoplay"), t.trigger("play.owl.autoplay"))
                }), e(document).on("keydown", function(e) {
                    37 == e.keyCode && (t.trigger("prev.owl"), t.trigger("stop.owl.autoplay")), 39 == e.keyCode && (t.trigger("next.owl"), t.trigger("stop.owl.autoplay"))
                }), t.on("changed.owl.carousel", function(l) {
                    var i = l.item.index + 1,
                        s = t.find(".owl-item:nth-child(" + i + ")").find("section"),
                        r = t.find(".owl-item:nth-child(" + i + ")").find("section").data("id"),
                        d = t.parents(".module-inside"),
                        n = s.attr("data-logocolor"),
                        m = s.attr("data-menucolor");
                    (d.removeClass(w), w = r, d.addClass(r), e(".non_bg_header").length && e(".page_from_top").length && t.parents(".slider-style1").length) && (o.offset().top < 80 && (a.body.hasClass("header-scrolled") ? T != _ && a.body.removeClass(_).addClass(T) : (_ != n && (a.body.removeClass(_).addClass(n), _ = n), S != m && (a.body.removeClass(S).addClass(m), S = m), a.body.hasClass("default-logo-menu-mobile") && a.body.removeClass("default-logo-menu-mobile"), a.body.hasClass("alt-logo-menu-mobile") && a.body.removeClass("alt-logo-menu-mobile"))))
                })
            }, 10)
        })
    }, a.fnInit = function() {
        a.module = e(".bm-builder > .module"), a.module.length || e(".bm-builder > .bm-row").length && (a.module = e(".bm-builder > .bm-row > .module")), a.bmTabSlider = a.module.find(".bm-tab-slider"), a.carousel = a.module.find(".owl-carousel"), a.carousel.length && a.fnCarousel(a.carousel), a.bmTabSlider.length && a.fnBMTabSlider(a.bmTabSlider), e(".module .arrow-is-svg").length && e(".module .arrow-is-svg").each(function() {
            var a = e(this),
                t = a.attr("src");
            e.get(t, "html").done(function(t) {
                var o = e(t).find("svg");
                a.after(o), a.remove()
            })
        })
    }, a.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal.slider = a)
    }), a.win.on("load", function() {
        a.fnInit()
    })
}(jQuery);
//Grid
! function(i) {
    "use strict";
    var e = [];
    e.win = i(window), e.doc = i(document), e.body = i("body"), e.module = i(".bm-builder > .module"), e.isotope = e.module.find(".container-masonry"), e.gridMaskLink = e.module.find(".grid-item-mask-link"), e.gridactiveTitLink = e.module.find(".grid-active-titlelink"), e.pageLoading = i(".page-loading"), e.moduleIsotope = [], e.fnIsotope = function(e) {
        e.each(function() {
            var e = i(this).find(".masonry-list"),
                o = e.data("unique");
            e.hasClass("masonry-auto") ? UxCBModModuleIsotope[o] = e.isotope({
                itemSelector: ".grid-item",
                layoutMode: "packery",
                stagger: 40,
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                }
            }) : UxCBModModuleIsotope[o] = e.isotope({
                itemSelector: ".grid-item",
                layoutMode: "fitRows",
                percentPosition: !0,
                stagger: 40,
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                }
            })
        })
    }, e.fnGridClickTitleOpenItem = function(e) {
        e.each(function() {
            var e = i(this).find(".grid-item-tit-a"),
                o = e.attr("href");
            e.on("click", function() {
                return "_blank" === e.attr("target") ? window.open(o, "_blank") : setTimeout(function() {
                    window.location.href = o
                }, 40), !1
            })
        })
    }, e.fnGridHoverOnTouch = function(o) {
        o.each(function() {
            var o = i(this),
                t = o.find(".grid-item-mask-link"),
                n = o.find(".sea-grid-item-con"),
                a = t.attr("href");
            t.hasClass("lightbox-item") || o.find(".grid-item-inside").hasClass("bm-touch-tab") && (o.on("touchstart", _.debounce(function(i) {
                n.hasClass("bm-hover") || (n.addClass("bm-hover"), o.siblings().find(".sea-grid-item-con").removeClass("bm-hover")), i.stopPropagation()
            }, 60)), n.hasClass("ux-ajax-page-transition-link") || o.on("click", function(i) {
                return n.hasClass("bm-hover") && (n.removeClass("bm-hover"), "_blank" === t.attr("target") ? setTimeout(function() {
                    window.open(a, "_blank")
                }, 320) : (e.pageLoading.length && setTimeout(function() {
                    e.pageLoading.addClass("visible")
                }, 100), e.body.addClass("ux-start-hide"), e.body.find("#wrap").animate({
                    opacity: 0
                }, 300), e.body.find("#wrap-outer").css("height", "auto"), setTimeout(function() {
                    window.location.href = a
                }, 320))), !1
            }))
        })
    }, e.doc.ready(function() {}), e.fnInit = function() {
        e.module = i(".bm-builder > .module"), e.module.length || i(".bm-builder > .bm-row").length && (e.module = i(".bm-builder > .bm-row > .module")), e.isotope = e.module.find(".container-masonry"), e.gridMaskLink = e.module.find(".grid-item-mask-link"), e.gridHovertap = e.module.find(".bm-touch-tab"), e.gridactiveTitLink = e.module.find(".grid-active-titlelink"), e.isotope.length && e.fnIsotope(e.isotope), e.gridMaskLink.length && e.gridMaskLink.removeAttr("title"), e.seaGridItem = e.module.find(".sea-grid-item"), Modernizr.touchevents && e.seaGridItem.hasClass("grid-item") && e.fnGridHoverOnTouch(e.seaGridItem), e.gridactiveTitLink.length
    }, e.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal.grid = e)
    }), e.win.on("load", function(i, o, t) {
        e.fnInit()
    })
}(jQuery);
//masonry grid
! function(t) {
    "use strict";
    var i = [];
    i.win = t(window), i.doc = t(document), i.body = t("body"), i.pageLoading = t(".page-loading"), i.fnGridStackInitSize = function(a) {
        a.find(".grid-stack-item").each(function() {
            var i = Number(t(this).attr("data-gs-x")),
                a = Number(t(this).attr("data-gs-y")),
                e = Number(t(this).attr("data-gs-width")),
                n = Number(t(this).attr("data-gs-height"));
            t(this).attr({
                "data-o-x": i,
                "data-o-y": a,
                "data-o-width": e,
                "data-o-height": n
            })
        }), i.fnGridStackOrder(a)
    }, i.fnArrayUnique = function(t) {
        for (var i = [], a = 0; a < t.length; a++) - 1 == i.indexOf(t[a]) && i.push(t[a]);
        return i
    }, i.fnArraySortNumber = function(t, i) {
        return t - i
    }, i.fnGridStackOrder = function(a) {
        var e = [];
        a.find(".grid-stack-item").each(function() {
            var i = Number(t(this).attr("data-gs-y"));
            e.push(i)
        }), (e = i.fnArrayUnique(e)).sort(i.fnArraySortNumber);
        var n = 0;
        t.each(e, function(e, r) {
            var s = [];
            r = Number(r), a.find(".grid-stack-item").each(function() {
                var i = Number(t(this).attr("data-gs-x")),
                    a = Number(t(this).attr("data-gs-y"));
                Number(r) == a && s.push(i)
            }), (s = i.fnArrayUnique(s)).sort(i.fnArraySortNumber), t.each(s, function(t, i) {
                i = Number(i);
                var e = a.find('.grid-stack-item[data-gs-x="' + i + '"][data-gs-y="' + r + '"]');
                e.length && (e.attr("data-gs-order", n), a.append(e), n++)
            })
        })
    }, i.fnGridStackResize = function(a) {
        var e = a.width(),
            n = a.data("spacing");
        if (i.win.width() < 768 && a.hasClass("grid-stack-origin-layout-mobile")) n = a.data("spacing-mobile");
        var r = (e + n) / 24,
            s = (a.offset().top, []);
        a.find(".grid-stack-item").each(function() {
            var e = Number(t(this).attr("data-gs-x")),
                d = Number(t(this).attr("data-gs-y")),
                o = Number(t(this).attr("data-gs-width")),
                c = Number(t(this).attr("data-gs-height")),
                h = r * c,
                u = r * d,
                f = t(this).find(".grid-stack-item-content"),
                m = t(this).find(".brick-content");
            if (t(this).css({
                    position: "absolute",
                    width: r * o + "px",
                    height: h + "px",
                    left: r * e + "px",
                    top: u + "px"
                }), a.hasClass("masonry-grid-show-text")) {
                var g = m.find(".grid-item-con-text-show").height(),
                    l = Number(h - g);
                m.css("max-height", +l + "px")
            }
            n > 0 ? f.css({
                left: .5 * n + "px",
                right: .5 * n + "px",
                top: .5 * n + "px",
                bottom: .5 * n + "px"
            }) : f.css({
                left: "0px",
                right: "0px",
                top: "0px",
                bottom: "-1px"
            }), f.height() > 0 && f.width() > 0 && (i.win.width() >= 768 ? setTimeout(function() {
                m.css("padding-top", f.height() / f.width() * 100 + "%")
            }, 20) : setTimeout(function() {
                m.css("padding-top", c / o * 100 + "%")
            }, 20)), s.push(u + t(this).height())
        });
        var d = Math.max.apply(Math, s);
        a.height(d), a.hasClass("grid-stack-origin-layout-mobile") || (i.win.width() <= 767 ? a.hasClass("grid-stack-one-column-mode") || a.addClass("grid-stack-one-column-mode") : a.hasClass("grid-stack-one-column-mode") && a.removeClass("grid-stack-one-column-mode"))
    }, i.fnMasonryGridClickTitleOpenItem = function(i) {
        i.each(function() {
            var i = t(this).find(".grid-item-tit-a"),
                a = i.attr("href");
            i.on("click", function() {
                return "_blank" === i.attr("target") ? window.open(a, "_blank") : setTimeout(function() {
                    window.location.href = a
                }, 40), !1
            })
        })
    }, i.fnMGridHoverOnTouch = function(a) {
        a.each(function() {
            var a = t(this),
                e = a.find(".grid-item-mask-link"),
                n = a.find(".sea-grid-item-con"),
                r = e.attr("href");
            e.hasClass("lightbox-item") || a.find(".grid-item-inside").hasClass("bm-touch-tab") && (a.on("touchstart", _.debounce(function(t) {
                n.hasClass("bm-hover") || (n.addClass("bm-hover"), a.siblings().find(".sea-grid-item-con").removeClass("bm-hover")), t.stopPropagation()
            }, 60)), n.hasClass("ux-ajax-page-transition-link") || a.on("click", function(t) {
                return n.hasClass("bm-hover") && (n.removeClass("bm-hover"), "_blank" === e.attr("target") ? setTimeout(function() {
                    window.open(r, "_blank")
                }, 320) : (i.pageLoading.length && setTimeout(function() {
                    i.pageLoading.addClass("visible")
                }, 100), i.body.addClass("ux-start-hide"), i.body.find("#wrap").animate({
                    opacity: 0
                }, 300), i.body.find("#wrap-outer").css("height", "auto"), setTimeout(function() {
                    window.location.href = r
                }, 320))), !1
            }))
        })
    }, i.fnInit = function() {
        i.module = t(".bm-builder > .module"), i.module.length || t(".bm-builder > .bm-row").length && (i.module = t(".bm-builder > .bm-row > .module")), i.gridStack = i.module.find(".grid-stack"), i.gridactiveTitLink = i.module.find(".grid-active-titlelink"), i.gridStack.length && i.gridStack.each(function() {
            var a = t(this),
                e = a.data("spacing"),
                n = a.parents(".module");
            a.css("margin", .5 * -e + "px"), i.fnGridStackInitSize(a);
            var r = a.isotope({
                itemSelector: ".grid-stack-item",
                layoutMode: "packery",
                stagger: 40,
                resize: !1,
                getSortData: {
                    number: "[data-gs-order]"
                },
                sortBy: "number"
            });
            a.removeClass("hidden"), i.fnGridStackResize(a), i.win.on("resize", _.debounce(function() {
                var t = n.find(".filters").find("li.active").find("> a").attr("data-filter");
                t && "*" != t ? r.isotope("layout") : i.fnGridStackResize(a)
            }, 300));
            a.data("gridstack");
            var s = !1;
            n.find(".filters").length && n.find(".filters [data-filter]").on("click", function() {
                var e = t(this).attr("data-filter");
                t(this).attr("data-catid"), Number(t(this).find(".filter-num").text());
                return t(this).parent().parent().find("li").removeClass("active"), t(this).parent().addClass("active"), "*" == e ? (0, s = a.find(".grid-stack-item:hidden"), i.fnGridStackResize(a), s.show()) : (s && s.hide(), r.isotope({
                    filter: e
                })), !1
            })
        }), i.gridactiveTitLink.length, i.seaGridItem = i.module.find(".sea-grid-item"), Modernizr.touchevents && i.seaGridItem.hasClass("grid-stack-item") && i.fnMGridHoverOnTouch(i.seaGridItem)
    }, i.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal["masonry-grid"] = i)
    }), i.win.on("load", function() {
        i.fnInit()
    })
}(jQuery);
//embed
! function(e) {
    "use strict";
    var a = [];
    a.win = e(window), a.doc = e(document), a.fnModuleVideoCover = function(a) {
        a.each(function() {
            var a = [];
            a.item = e(this), a.playBtn = a.item.find(".video-play-btn"), a.videoIframe = a.item.find("iframe"), a.playBtn.on("click", function() {
                a.item.find(".embed-video-cover").css("display", "none");
                var e = a.videoIframe.attr("data-src").replace("autoplay=0", "autoplay=1&muted=1");
                return a.videoIframe.attr("src", e), !1
            })
        })
    }, a.fnAudioPlay = function(n) {
        n.on("click", function() {
            var n = e(this).attr("id");
            e(this).hasClass("pause") ? (e(".audiobutton").removeClass("play").addClass("pause"), e(this).removeClass("pause").addClass("play"), a.jplayer.jPlayer("setMedia", {
                mp3: e(this).attr("rel")
            }), a.jplayer.jPlayer("play"), a.jplayer.bind(e.jPlayer.event.ended, function(a) {
                e("#" + n).removeClass("play").addClass("pause")
            })) : e(this).hasClass("play") && (e(this).removeClass("play").addClass("pause"), a.jplayer.jPlayer("stop"))
        })
    }, a.fnJplayerCall = function(n) {
        a.jplayer.length && (a.jplayer.jPlayer({
            ready: function() {
                e(this).jPlayer("setMedia", {
                    mp3: ""
                })
            },
            swfPath: JS_PATH,
            supplied: "mp3",
            wmode: "window"
        }), n.each(function() {
            a.fnAudioPlay(e(this))
        }))
    }, a.fnParseQuery = function(e) {
        for (var a = /([^=&\s]+)[=\s]*([^=&\s]*)/g, n = {}; a.exec(e);) n[RegExp.$1] = RegExp.$2;
        return n
    }, a.fnInit = function() {
        a.module = e(".bm-builder > .module"), a.module.length || e(".bm-builder > .bm-row").length && (a.module = e(".bm-builder > .bm-row > .module")), a.jplayer = e("#jquery_jplayer"), a.videoFace = a.module.find(".embed-wrap-has-cover"), a.videoFace.length && a.fnModuleVideoCover(a.videoFace)
    }, a.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal.embed = a), a.fnInit()
    }).ajaxSuccess(function(n, o, i) {
        var t = a.fnParseQuery(decodeURIComponent(i.data));
        if ("ux_cb_module_grid_container" == t.action) {
            var d = o.responseText,
                l = t.moduleUnique;
            e.each(e(d), function(n, o) {
                var i = (o = e(o)).attr("data-postid"),
                    t = e(".module-id-" + l + ' section.grid-item[data-postid="' + i + '"]');
                if (t.length) {
                    var d = t.find(".embed-wrap-has-cover");
                    d.length && a.fnModuleVideoCover(d);
                    var r = t.find(".audiobutton");
                    r.length && a.fnJplayerCall(r)
                }
            })
        }
    })
}(jQuery);
//contact
! function(i) {
    "use strict";
    var t = [];
    t.win = i(window), t.doc = i(document), t.fnContactForm = function() {
        t.contactform.each(function() {
            var t = i(this),
                e = t.find('input[type="hidden"].info-tip').data("message"),
                n = t.find('input[type="hidden"].info-tip').data("sending"),
                a = t.find('input[name="idi_privacy_policy"]'),
                d = t.find('input[type="submit"]');
            a.length && a.change(function() {
                i(this).is(":checked") ? d.removeAttr("disabled") : d.attr("disabled", "disabled")
            }), t.submit(function() {
                var a = !1;
                if (t.find(".requiredField").each(function() {
                        if ("" == i.trim(i(this).val()) || "Name*" == i.trim(i(this).val()) || "Email*" == i.trim(i(this).val()) || "Required" == i.trim(i(this).val()) || "Invalid email" == i.trim(i(this).val())) i(this).attr("value", "Required"), a = !0;
                        else if (i(this).hasClass("email")) {
                            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(i.trim(i(this).val())) || (i(this).attr("value", "Invalid email"), a = !0)
                        }
                    }), !a) {
                    t.hasClass("single-feild") ? t.find(".idi_send").val(n).attr("disabled", "disabled") : t.find(".idi_send").fadeOut("normal", function() {
                        t.append('<p class="sending">' + n + "</p>")
                    });
                    var d = t.serialize();
                    i.post(t.attr("action"), d, function() {
                        t.slideUp("fast", function() {
                            t.hasClass("single-feild") ? t.before('<p class="success" style=" text-align:center">' + e + "</p>") : (t.before('<p class="success">' + e + "</p>"), t.find(".sending").fadeOut())
                        })
                    })
                }
                return !1
            })
        })
    }, t.fnInit = function() {
        t.module = i(".bm-builder > .module"), t.module.length || i(".bm-builder > .bm-row").length && (t.module = i(".bm-builder > .bm-row > .module")), t.contactform = t.module.find(".contact_form"), t.contactform.length && t.fnContactForm()
    }, t.doc.ready(function() {
        UxCBModGlobal && (UxCBModGlobal["contact-form"] = t), t.fnInit()
    })
}(jQuery);