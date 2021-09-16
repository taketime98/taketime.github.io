! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Util = t(e.jQuery)
}(this, function(a) {
    "use strict";
    a = a && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
    var t = "transitionend";

    function e(e) {
        var t = this,
            i = !1;
        return a(this).one(l.TRANSITION_END, function() {
            i = !0
        }), setTimeout(function() {
            i || l.triggerTransitionEnd(t)
        }, e), this
    }
    var l = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(e) {
            for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
            return e
        },
        getSelectorFromElement: function(e) {
            var t, i = e.getAttribute("data-target");
            i && "#" !== i || (i = (t = e.getAttribute("href")) && "#" !== t ? t.trim() : "");
            try {
                return document.querySelector(i) ? i : null
            } catch (e) {
                return null
            }
        },
        getTransitionDurationFromElement: function(e) {
            if (!e) return 0;
            var t = a(e).css("transition-duration"),
                i = a(e).css("transition-delay"),
                n = parseFloat(t),
                r = parseFloat(i);
            return n || r ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(i))) : 0
        },
        reflow: function(e) {
            return e.offsetHeight
        },
        triggerTransitionEnd: function(e) {
            a(e).trigger(t)
        },
        supportsTransitionEnd: function() {
            return Boolean(t)
        },
        isElement: function(e) {
            return (e[0] || e).nodeType
        },
        typeCheckConfig: function(e, t, i) {
            for (var n in i)
                if (Object.prototype.hasOwnProperty.call(i, n)) {
                    var r = i[n],
                        a = t[n],
                        s = a && l.isElement(a) ? "element" : null == (o = a) ? "" + o : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(r).test(s)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + r + '".')
                }
            var o
        },
        findShadowRoot: function(e) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof e.getRootNode) return e instanceof ShadowRoot ? e : e.parentNode ? l.findShadowRoot(e.parentNode) : null;
            var t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null
        },
        jQueryDetection: function() {
            if (void 0 === a) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = a.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    return l.jQueryDetection(), a.fn.emulateTransitionEnd = e, a.event.special[l.TRANSITION_END] = {
        bindType: t,
        delegateType: t,
        handle: function(e) {
            if (a(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
        }
    }, l
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Modal = t(e.jQuery, e.Util)
}(this, function(o, l) {
    "use strict";

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }).apply(this, arguments)
    }

    function a(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    o = o && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o, l = l && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
    var c = "modal",
        u = "bs.modal",
        d = "." + u,
        e = o.fn[c],
        h = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        p = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        f = "hidden" + d,
        m = "show" + d,
        g = "focusin" + d,
        v = "resize" + d,
        y = "click.dismiss" + d,
        w = "keydown.dismiss" + d,
        b = "mousedown.dismiss" + d,
        T = "modal-open",
        _ = "fade",
        x = "show",
        E = "modal-static",
        S = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        C = ".sticky-top",
        k = function() {
            function r(e, t) {
                this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var e, t, i, n = r.prototype;
            return n.toggle = function(e) {
                return this._isShown ? this.hide() : this.show(e)
            }, n.show = function(e) {
                var t, i = this;
                this._isShown || this._isTransitioning || (o(this._element).hasClass(_) && (this._isTransitioning = !0), t = o.Event(m, {
                    relatedTarget: e
                }), o(this._element).trigger(t), this._isShown || t.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), o(this._element).on(y, '[data-dismiss="modal"]', function(e) {
                    return i.hide(e)
                }), o(this._dialog).on(b, function() {
                    o(i._element).one("mouseup.dismiss.bs.modal", function(e) {
                        o(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function() {
                    return i._showElement(e)
                })))
            }, n.hide = function(e) {
                var t, i, n, r = this;
                e && e.preventDefault(), this._isShown && !this._isTransitioning && (t = o.Event("hide.bs.modal"), o(this._element).trigger(t), this._isShown && !t.isDefaultPrevented() && (this._isShown = !1, (i = o(this._element).hasClass(_)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), o(document).off(g), o(this._element).removeClass(x), o(this._element).off(y), o(this._dialog).off(b), i ? (n = l.getTransitionDurationFromElement(this._element), o(this._element).one(l.TRANSITION_END, function(e) {
                    return r._hideModal(e)
                }).emulateTransitionEnd(n)) : this._hideModal()))
            }, n.dispose = function() {
                [window, this._element, this._dialog].forEach(function(e) {
                    return o(e).off(d)
                }), o(document).off(g), o.removeData(this._element, u), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function() {
                this._adjustDialog()
            }, n._getConfig = function(e) {
                return e = s({}, h, e), l.typeCheckConfig(c, e, p), e
            }, n._triggerBackdropTransition = function() {
                var e = this;
                if ("static" === this._config.backdrop) {
                    var t = o.Event("hidePrevented.bs.modal");
                    if (o(this._element).trigger(t), t.defaultPrevented) return;
                    var i = this._element.scrollHeight > document.documentElement.clientHeight;
                    i || (this._element.style.overflowY = "hidden"), this._element.classList.add(E);
                    var n = l.getTransitionDurationFromElement(this._dialog);
                    o(this._element).off(l.TRANSITION_END), o(this._element).one(l.TRANSITION_END, function() {
                        e._element.classList.remove(E), i || o(e._element).one(l.TRANSITION_END, function() {
                            e._element.style.overflowY = ""
                        }).emulateTransitionEnd(e._element, n)
                    }).emulateTransitionEnd(n), this._element.focus()
                } else this.hide()
            }, n._showElement = function(e) {
                var t = this,
                    i = o(this._element).hasClass(_),
                    n = this._dialog ? this._dialog.querySelector(".modal-body") : null;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), o(this._dialog).hasClass("modal-dialog-scrollable") && n ? n.scrollTop = 0 : this._element.scrollTop = 0, i && l.reflow(this._element), o(this._element).addClass(x), this._config.focus && this._enforceFocus();

                function r() {
                    t._config.focus && t._element.focus(), t._isTransitioning = !1, o(t._element).trigger(s)
                }
                var a, s = o.Event("shown.bs.modal", {
                    relatedTarget: e
                });
                i ? (a = l.getTransitionDurationFromElement(this._dialog), o(this._dialog).one(l.TRANSITION_END, r).emulateTransitionEnd(a)) : r()
            }, n._enforceFocus = function() {
                var t = this;
                o(document).off(g).on(g, function(e) {
                    document !== e.target && t._element !== e.target && 0 === o(t._element).has(e.target).length && t._element.focus()
                })
            }, n._setEscapeEvent = function() {
                var t = this;
                this._isShown ? o(this._element).on(w, function(e) {
                    t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition()
                }) : this._isShown || o(this._element).off(w)
            }, n._setResizeEvent = function() {
                var t = this;
                this._isShown ? o(window).on(v, function(e) {
                    return t.handleUpdate(e)
                }) : o(window).off(v)
            }, n._hideModal = function() {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function() {
                    o(document.body).removeClass(T), e._resetAdjustments(), e._resetScrollbar(), o(e._element).trigger(f)
                })
            }, n._removeBackdrop = function() {
                this._backdrop && (o(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function(e) {
                var t, i, n = this,
                    r = o(this._element).hasClass(_) ? _ : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", r && this._backdrop.classList.add(r), o(this._backdrop).appendTo(document.body), o(this._element).on(y, function(e) {
                            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && n._triggerBackdropTransition()
                        }), r && l.reflow(this._backdrop), o(this._backdrop).addClass(x), !e) return;
                    if (!r) return void e();
                    var a = l.getTransitionDurationFromElement(this._backdrop);
                    o(this._backdrop).one(l.TRANSITION_END, e).emulateTransitionEnd(a)
                } else {
                    !this._isShown && this._backdrop ? (o(this._backdrop).removeClass(x), t = function() {
                        n._removeBackdrop(), e && e()
                    }, o(this._element).hasClass(_) ? (i = l.getTransitionDurationFromElement(this._backdrop), o(this._backdrop).one(l.TRANSITION_END, t).emulateTransitionEnd(i)) : t()) : e && e()
                }
            }, n._adjustDialog = function() {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function() {
                var e = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function() {
                var e, t, i, n, r = this;
                this._isBodyOverflowing && (e = [].slice.call(document.querySelectorAll(S)), t = [].slice.call(document.querySelectorAll(C)), o(e).each(function(e, t) {
                    var i = t.style.paddingRight,
                        n = o(t).css("padding-right");
                    o(t).data("padding-right", i).css("padding-right", parseFloat(n) + r._scrollbarWidth + "px")
                }), o(t).each(function(e, t) {
                    var i = t.style.marginRight,
                        n = o(t).css("margin-right");
                    o(t).data("margin-right", i).css("margin-right", parseFloat(n) - r._scrollbarWidth + "px")
                }), i = document.body.style.paddingRight, n = o(document.body).css("padding-right"), o(document.body).data("padding-right", i).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")), o(document.body).addClass(T)
            }, n._resetScrollbar = function() {
                var e = [].slice.call(document.querySelectorAll(S));
                o(e).each(function(e, t) {
                    var i = o(t).data("padding-right");
                    o(t).removeData("padding-right"), t.style.paddingRight = i || ""
                });
                var t = [].slice.call(document.querySelectorAll(C));
                o(t).each(function(e, t) {
                    var i = o(t).data("margin-right");
                    void 0 !== i && o(t).css("margin-right", i).removeData("margin-right")
                });
                var i = o(document.body).data("padding-right");
                o(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function() {
                var e = document.createElement("div");
                e.className = "modal-scrollbar-measure", document.body.appendChild(e);
                var t = e.getBoundingClientRect().width - e.clientWidth;
                return document.body.removeChild(e), t
            }, r._jQueryInterface = function(i, n) {
                return this.each(function() {
                    var e = o(this).data(u),
                        t = s({}, h, o(this).data(), "object" == typeof i && i ? i : {});
                    if (e || (e = new r(this, t), o(this).data(u, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i](n)
                    } else t.show && e.show(n)
                })
            }, e = r, i = [{
                key: "VERSION",
                get: function() {
                    return "4.5.2"
                }
            }, {
                key: "Default",
                get: function() {
                    return h
                }
            }], (t = null) && a(e.prototype, t), i && a(e, i), r
        }();
    return o(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var t, i = this,
            n = l.getSelectorFromElement(this);
        n && (t = document.querySelector(n));
        var r = o(t).data(u) ? "toggle" : s({}, o(t).data(), o(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
        var a = o(t).one(m, function(e) {
            e.isDefaultPrevented() || a.one(f, function() {
                o(i).is(":visible") && i.focus()
            })
        });
        k._jQueryInterface.call(o(t), r, this)
    }), o.fn[c] = k._jQueryInterface, o.fn[c].Constructor = k, o.fn[c].noConflict = function() {
        return o.fn[c] = e, k._jQueryInterface
    }, k
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Vimeo = e.Vimeo || {}, e.Vimeo.Player = t())
}(this, function() {
    "use strict";

    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var e = "undefined" != typeof global && "[object global]" === {}.toString.call(global);

    function s(e, t) {
        return 0 === e.indexOf(t.toLowerCase()) ? e : "".concat(t.toLowerCase()).concat(e.substr(0, 1).toUpperCase()).concat(e.substr(1))
    }

    function c(e) {
        return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)
    }

    function u(e) {
        var t, i = 0 < arguments.length && void 0 !== e ? e : {},
            n = i.id,
            r = i.url,
            a = n || r;
        if (!a) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
        if (t = a, !isNaN(parseFloat(t)) && isFinite(t) && Math.floor(t) == t) return "https://vimeo.com/".concat(a);
        if (c(a)) return a.replace("http:", "https:");
        if (n) throw new TypeError("“".concat(n, "” is not a valid video id."));
        throw new TypeError("“".concat(a, "” is not a vimeo.com url."))
    }
    var t = void 0 !== Array.prototype.indexOf,
        i = "undefined" != typeof window && void 0 !== window.postMessage;
    if (!(e || t && i)) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
    var r, a, o, l = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function d() {
        if (void 0 === this) throw new TypeError("Constructor WeakMap requires 'new'");
        if (o(this, "_id", "_WeakMap_" + p() + "." + p()), 0 < arguments.length) throw new TypeError("WeakMap iterable is not supported")
    }

    function h(e, t) {
        if (!f(e) || !a.call(e, "_id")) throw new TypeError(t + " method called on incompatible receiver " + typeof e)
    }

    function p() {
        return Math.random().toString().substring(2)
    }

    function f(e) {
        return Object(e) === e
    }(r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : l).WeakMap || (a = Object.prototype.hasOwnProperty, o = function(e, t, i) {
        Object.defineProperty ? Object.defineProperty(e, t, {
            configurable: !0,
            writable: !0,
            value: i
        }) : e[t] = i
    }, r.WeakMap = (o(d.prototype, "delete", function(e) {
        if (h(this, "delete"), !f(e)) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e || (delete e[this._id], 0))
    }), o(d.prototype, "get", function(e) {
        if (h(this, "get"), f(e)) {
            var t = e[this._id];
            return t && t[0] === e ? t[1] : void 0
        }
    }), o(d.prototype, "has", function(e) {
        if (h(this, "has"), !f(e)) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e)
    }), o(d.prototype, "set", function(e, t) {
        if (h(this, "set"), !f(e)) throw new TypeError("Invalid value used as weak map key");
        var i = e[this._id];
        return i && i[0] === e ? i[1] = t : o(e, this._id, [e, t]), this
    }), o(d, "_polyfill", !0), d));
    var m, g = (function(e) {
            var t, i, n;
            n = function() {
                var t, i, n, r, a, s, e = Object.prototype.toString,
                    o = "undefined" != typeof setImmediate ? function(e) {
                        return setImmediate(e)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), t = function(e, t, i, n) {
                        return Object.defineProperty(e, t, {
                            value: i,
                            writable: !0,
                            configurable: !1 !== n
                        })
                    }
                } catch (e) {
                    t = function(e, t, i) {
                        return e[t] = i, e
                    }
                }

                function l(e, t) {
                    this.fn = e, this.self = t, this.next = void 0
                }

                function c(e, t) {
                    n.add(e, t), i = i || o(n.drain)
                }

                function u(e) {
                    var t, i = typeof e;
                    return null == e || "object" != i && "function" != i || (t = e.then), "function" == typeof t && t
                }

                function d() {
                    for (var e = 0; e < this.chain.length; e++) h(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                    this.chain.length = 0
                }

                function h(e, t, i) {
                    var n, r;
                    try {
                        !1 === t ? i.reject(e.msg) : (n = !0 === t ? e.msg : t.call(void 0, e.msg)) === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (r = u(n)) ? r.call(n, i.resolve, i.reject) : i.resolve(n)
                    } catch (e) {
                        i.reject(e)
                    }
                }

                function p(e) {
                    var i, n = this;
                    if (!n.triggered) {
                        n.triggered = !0, n.def && (n = n.def);
                        try {
                            (i = u(e)) ? c(function() {
                                var t = new g(n);
                                try {
                                    i.call(e, function() {
                                        p.apply(t, arguments)
                                    }, function() {
                                        f.apply(t, arguments)
                                    })
                                } catch (e) {
                                    f.call(t, e)
                                }
                            }): (n.msg = e, n.state = 1, 0 < n.chain.length && c(d, n))
                        } catch (e) {
                            f.call(new g(n), e)
                        }
                    }
                }

                function f(e) {
                    var t = this;
                    t.triggered || (t.triggered = !0, t.def && (t = t.def), t.msg = e, t.state = 2, 0 < t.chain.length && c(d, t))
                }

                function m(e, i, n, r) {
                    for (var t = 0; t < i.length; t++) ! function(t) {
                        e.resolve(i[t]).then(function(e) {
                            n(t, e)
                        }, r)
                    }(t)
                }

                function g(e) {
                    this.def = e, this.triggered = !1
                }

                function v(e) {
                    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function y(e) {
                    if ("function" != typeof e) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var n = new v(this);
                    this.then = function(e, t) {
                        var i = {
                            success: "function" != typeof e || e,
                            failure: "function" == typeof t && t
                        };
                        return i.promise = new this.constructor(function(e, t) {
                            if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                            i.resolve = e, i.reject = t
                        }), n.chain.push(i), 0 !== n.state && c(d, n), i.promise
                    }, this.catch = function(e) {
                        return this.then(void 0, e)
                    };
                    try {
                        e.call(void 0, function(e) {
                            p.call(n, e)
                        }, function(e) {
                            f.call(n, e)
                        })
                    } catch (e) {
                        f.call(n, e)
                    }
                }
                var w = t({}, "constructor", y, !(n = {
                    add: function(e, t) {
                        s = new l(e, t), a ? a.next = s : r = s, a = s, s = void 0
                    },
                    drain: function() {
                        var e = r;
                        for (r = a = i = void 0; e;) e.fn.call(e.self), e = e.next
                    }
                }));
                return t(y.prototype = w, "__NPO__", 0, !1), t(y, "resolve", function(i) {
                    return i && "object" == typeof i && 1 === i.__NPO__ ? i : new this(function(e, t) {
                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                        e(i)
                    })
                }), t(y, "reject", function(i) {
                    return new this(function(e, t) {
                        if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                        t(i)
                    })
                }), t(y, "all", function(t) {
                    var s = this;
                    return "[object Array]" != e.call(t) ? s.reject(TypeError("Not an array")) : 0 === t.length ? s.resolve([]) : new s(function(i, e) {
                        if ("function" != typeof i || "function" != typeof e) throw TypeError("Not a function");
                        var n = t.length,
                            r = Array(n),
                            a = 0;
                        m(s, t, function(e, t) {
                            r[e] = t, ++a === n && i(r)
                        }, e)
                    })
                }), t(y, "race", function(t) {
                    var n = this;
                    return "[object Array]" != e.call(t) ? n.reject(TypeError("Not an array")) : new n(function(i, e) {
                        if ("function" != typeof i || "function" != typeof e) throw TypeError("Not a function");
                        m(n, t, function(e, t) {
                            i(t)
                        }, e)
                    })
                }), y
            }, (i = l)[t = "Promise"] = i[t] || n(), e.exports && (e.exports = i[t])
        }(m = {
            exports: {}
        }), m.exports),
        v = new WeakMap;

    function y(e, t, i) {
        var n = v.get(e.element) || {};
        t in n || (n[t] = []), n[t].push(i), v.set(e.element, n)
    }

    function w(e, t) {
        return (v.get(e.element) || {})[t] || []
    }

    function b(e, t, i) {
        var n = v.get(e.element) || {};
        if (!n[t]) return !0;
        if (!i) return n[t] = [], v.set(e.element, n), !0;
        var r = n[t].indexOf(i);
        return -1 !== r && n[t].splice(r, 1), v.set(e.element, n), n[t] && 0 === n[t].length
    }
    var T = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];

    function _(n, e) {
        var t = 1 < arguments.length && void 0 !== e ? e : {};
        return T.reduce(function(e, t) {
            var i = n.getAttribute("data-vimeo-".concat(t));
            return !i && "" !== i || (e[t] = "" === i ? 1 : i), e
        }, t)
    }

    function x(e, t) {
        var i = e.html;
        if (!t) throw new TypeError("An element must be provided");
        if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
        var n = document.createElement("div");
        return n.innerHTML = i, t.appendChild(n.firstChild), t.setAttribute("data-vimeo-initialized", "true"), t.querySelector("iframe")
    }

    function E(a, e, t) {
        var s = 1 < arguments.length && void 0 !== e ? e : {},
            o = 2 < arguments.length ? t : void 0;
        return new Promise(function(t, i) {
            if (!c(a)) throw new TypeError("“".concat(a, "” is not a vimeo.com url."));
            var e = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(a));
            for (var n in s) s.hasOwnProperty(n) && (e += "&".concat(n, "=").concat(encodeURIComponent(s[n])));
            var r = new("XDomainRequest" in window ? XDomainRequest : XMLHttpRequest);
            r.open("GET", e, !0), r.onload = function() {
                if (404 !== r.status)
                    if (403 !== r.status) try {
                        var e = JSON.parse(r.responseText);
                        if (403 === e.domain_status_code) return x(e, o), void i(new Error("“".concat(a, "” is not embeddable.")));
                        t(e)
                    } catch (e) {
                        i(e)
                    } else i(new Error("“".concat(a, "” is not embeddable.")));
                    else i(new Error("“".concat(a, "” was not found.")))
            }, r.onerror = function() {
                var e = r.status ? " (".concat(r.status, ")") : "";
                i(new Error("There was an error fetching the embed code from Vimeo".concat(e, ".")))
            }, r.send()
        })
    }

    function S(e) {
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (e) {
            return console.warn(e), {}
        }
        return e
    }

    function C(e, t, i) {
        var n, r;
        e.element.contentWindow && e.element.contentWindow.postMessage && (n = {
            method: t
        }, void 0 !== i && (n.value = i), 8 <= (r = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"))) && r < 10 && (n = JSON.stringify(n)), e.element.contentWindow.postMessage(n, e.origin))
    }

    function k(i, n) {
        var t, e, r = [];
        (n = S(n)).event ? ("error" === n.event && w(i, n.data.method).forEach(function(e) {
            var t = new Error(n.data.message);
            t.name = n.data.name, e.reject(t), b(i, n.data.method, e)
        }), r = w(i, "event:".concat(n.event)), t = n.data) : !n.method || (e = function(e, t) {
            var i = w(e, t);
            if (i.length < 1) return !1;
            var n = i.shift();
            return b(e, t, n), n
        }(i, n.method)) && (r.push(e), t = n.value), r.forEach(function(e) {
            try {
                if ("function" == typeof e) return void e.call(i, t);
                e.resolve(t)
            } catch (e) {}
        })
    }
    var M, z, O, P = new WeakMap,
        L = new WeakMap,
        A = {},
        D = function() {
            function a(o) {
                var e, t, l = this,
                    i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                if (! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, a), window.jQuery && o instanceof jQuery && (1 < o.length && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), o = o[0]), "undefined" != typeof document && "string" == typeof o && (o = document.getElementById(o)), e = o, !Boolean(e && 1 === e.nodeType && "nodeName" in e && e.ownerDocument && e.ownerDocument.defaultView)) throw new TypeError("You must pass either a valid element or a valid id.");
                if ("IFRAME" === o.nodeName || (t = o.querySelector("iframe")) && (o = t), "IFRAME" === o.nodeName && !c(o.getAttribute("src") || "")) throw new Error("The player element passed isn’t a Vimeo embed.");
                if (P.has(o)) return P.get(o);
                this._window = o.ownerDocument.defaultView, this.element = o, this.origin = "*";
                var n, r = new g(function(a, s) {
                    var e;
                    l._onMessage = function(e) {
                        if (c(e.origin) && l.element.contentWindow === e.source) {
                            "*" === l.origin && (l.origin = e.origin);
                            var t = S(e.data);
                            if (t && "error" === t.event && t.data && "ready" === t.data.method) {
                                var i = new Error(t.data.message);
                                return i.name = t.data.name, void s(i)
                            }
                            var n = t && "ready" === t.event,
                                r = t && "ping" === t.method;
                            if (n || r) return l.element.setAttribute("data-ready", "true"), void a();
                            k(l, t)
                        }
                    }, l._window.addEventListener("message", l._onMessage), "IFRAME" !== l.element.nodeName && E(u(e = _(o, i)), e, o).then(function(e) {
                        var t, i, n, r = x(e, o);
                        return l.element = r, l._originalElement = o, t = o, i = r, n = v.get(t), v.set(i, n), v.delete(t), P.set(l.element, l), e
                    }).catch(s)
                });
                return L.set(this, r), P.set(this.element, this), "IFRAME" === this.element.nodeName && C(this, "ping"), A.isEnabled && (n = function() {
                    return A.exit()
                }, A.on("fullscreenchange", function() {
                    (A.isFullscreen ? y : b)(l, "event:exitFullscreen", n), l.ready().then(function() {
                        C(l, "fullscreenchange", A.isFullscreen)
                    })
                })), this
            }
            var e, t, i;
            return e = a, (t = [{
                key: "callMethod",
                value: function(i, e) {
                    var n = this,
                        r = 1 < arguments.length && void 0 !== e ? e : {};
                    return new g(function(e, t) {
                        return n.ready().then(function() {
                            y(n, i, {
                                resolve: e,
                                reject: t
                            }), C(n, i, r)
                        }).catch(t)
                    })
                }
            }, {
                key: "get",
                value: function(i) {
                    var n = this;
                    return new g(function(e, t) {
                        return i = s(i, "get"), n.ready().then(function() {
                            y(n, i, {
                                resolve: e,
                                reject: t
                            }), C(n, i)
                        }).catch(t)
                    })
                }
            }, {
                key: "set",
                value: function(i, n) {
                    var r = this;
                    return new g(function(e, t) {
                        if (i = s(i, "set"), null == n) throw new TypeError("There must be a value to set.");
                        return r.ready().then(function() {
                            y(r, i, {
                                resolve: e,
                                reject: t
                            }), C(r, i, n)
                        }).catch(t)
                    })
                }
            }, {
                key: "on",
                value: function(e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (!t) throw new TypeError("You must pass a callback function.");
                    if ("function" != typeof t) throw new TypeError("The callback must be a function.");
                    0 === w(this, "event:".concat(e)).length && this.callMethod("addEventListener", e).catch(function() {}), y(this, "event:".concat(e), t)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
                    b(this, "event:".concat(e), t) && this.callMethod("removeEventListener", e).catch(function(e) {})
                }
            }, {
                key: "loadVideo",
                value: function(e) {
                    return this.callMethod("loadVideo", e)
                }
            }, {
                key: "ready",
                value: function() {
                    var e = L.get(this) || new g(function(e, t) {
                        t(new Error("Unknown player. Probably unloaded."))
                    });
                    return g.resolve(e)
                }
            }, {
                key: "addCuePoint",
                value: function(e, t) {
                    var i = 1 < arguments.length && void 0 !== t ? t : {};
                    return this.callMethod("addCuePoint", {
                        time: e,
                        data: i
                    })
                }
            }, {
                key: "removeCuePoint",
                value: function(e) {
                    return this.callMethod("removeCuePoint", e)
                }
            }, {
                key: "enableTextTrack",
                value: function(e, t) {
                    if (!e) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {
                        language: e,
                        kind: t
                    })
                }
            }, {
                key: "disableTextTrack",
                value: function() {
                    return this.callMethod("disableTextTrack")
                }
            }, {
                key: "pause",
                value: function() {
                    return this.callMethod("pause")
                }
            }, {
                key: "play",
                value: function() {
                    return this.callMethod("play")
                }
            }, {
                key: "requestFullscreen",
                value: function() {
                    return A.isEnabled ? A.request(this.element) : this.callMethod("requestFullscreen")
                }
            }, {
                key: "exitFullscreen",
                value: function() {
                    return A.isEnabled ? A.exit() : this.callMethod("exitFullscreen")
                }
            }, {
                key: "getFullscreen",
                value: function() {
                    return A.isEnabled ? g.resolve(A.isFullscreen) : this.get("fullscreen")
                }
            }, {
                key: "unload",
                value: function() {
                    return this.callMethod("unload")
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = this;
                    return new g(function(e) {
                        L.delete(t), P.delete(t.element), t._originalElement && (P.delete(t._originalElement), t._originalElement.removeAttribute("data-vimeo-initialized")), t.element && "IFRAME" === t.element.nodeName && t.element.parentNode && t.element.parentNode.removeChild(t.element), t._window.removeEventListener("message", t._onMessage), e()
                    })
                }
            }, {
                key: "getAutopause",
                value: function() {
                    return this.get("autopause")
                }
            }, {
                key: "setAutopause",
                value: function(e) {
                    return this.set("autopause", e)
                }
            }, {
                key: "getBuffered",
                value: function() {
                    return this.get("buffered")
                }
            }, {
                key: "getChapters",
                value: function() {
                    return this.get("chapters")
                }
            }, {
                key: "getCurrentChapter",
                value: function() {
                    return this.get("currentChapter")
                }
            }, {
                key: "getColor",
                value: function() {
                    return this.get("color")
                }
            }, {
                key: "setColor",
                value: function(e) {
                    return this.set("color", e)
                }
            }, {
                key: "getCuePoints",
                value: function() {
                    return this.get("cuePoints")
                }
            }, {
                key: "getCurrentTime",
                value: function() {
                    return this.get("currentTime")
                }
            }, {
                key: "setCurrentTime",
                value: function(e) {
                    return this.set("currentTime", e)
                }
            }, {
                key: "getDuration",
                value: function() {
                    return this.get("duration")
                }
            }, {
                key: "getEnded",
                value: function() {
                    return this.get("ended")
                }
            }, {
                key: "getLoop",
                value: function() {
                    return this.get("loop")
                }
            }, {
                key: "setLoop",
                value: function(e) {
                    return this.set("loop", e)
                }
            }, {
                key: "setMuted",
                value: function(e) {
                    return this.set("muted", e)
                }
            }, {
                key: "getMuted",
                value: function() {
                    return this.get("muted")
                }
            }, {
                key: "getPaused",
                value: function() {
                    return this.get("paused")
                }
            }, {
                key: "getPlaybackRate",
                value: function() {
                    return this.get("playbackRate")
                }
            }, {
                key: "setPlaybackRate",
                value: function(e) {
                    return this.set("playbackRate", e)
                }
            }, {
                key: "getPlayed",
                value: function() {
                    return this.get("played")
                }
            }, {
                key: "getQualities",
                value: function() {
                    return this.get("qualities")
                }
            }, {
                key: "getQuality",
                value: function() {
                    return this.get("quality")
                }
            }, {
                key: "setQuality",
                value: function(e) {
                    return this.set("quality", e)
                }
            }, {
                key: "getSeekable",
                value: function() {
                    return this.get("seekable")
                }
            }, {
                key: "getSeeking",
                value: function() {
                    return this.get("seeking")
                }
            }, {
                key: "getTextTracks",
                value: function() {
                    return this.get("textTracks")
                }
            }, {
                key: "getVideoEmbedCode",
                value: function() {
                    return this.get("videoEmbedCode")
                }
            }, {
                key: "getVideoId",
                value: function() {
                    return this.get("videoId")
                }
            }, {
                key: "getVideoTitle",
                value: function() {
                    return this.get("videoTitle")
                }
            }, {
                key: "getVideoWidth",
                value: function() {
                    return this.get("videoWidth")
                }
            }, {
                key: "getVideoHeight",
                value: function() {
                    return this.get("videoHeight")
                }
            }, {
                key: "getVideoUrl",
                value: function() {
                    return this.get("videoUrl")
                }
            }, {
                key: "getVolume",
                value: function() {
                    return this.get("volume")
                }
            }, {
                key: "setVolume",
                value: function(e) {
                    return this.set("volume", e)
                }
            }]) && n(e.prototype, t), i && n(e, i), a
        }();
    return e || (M = function() {
        for (var e, t = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], i = 0, n = t.length, r = {}; i < n; i++)
            if ((e = t[i]) && e[1] in document) {
                for (i = 0; i < e.length; i++) r[t[0][i]] = e[i];
                return r
            }
        return !1
    }(), z = {
        fullscreenchange: M.fullscreenchange,
        fullscreenerror: M.fullscreenerror
    }, O = {
        request: function(r) {
            return new Promise(function(e, t) {
                function i() {
                    O.off("fullscreenchange", i), e()
                }
                O.on("fullscreenchange", i);
                var n = (r = r || document.documentElement)[M.requestFullscreen]();
                n instanceof Promise && n.then(i).catch(t)
            })
        },
        exit: function() {
            return new Promise(function(t, e) {
                var i, n;
                O.isFullscreen ? (i = function e() {
                    O.off("fullscreenchange", e), t()
                }, O.on("fullscreenchange", i), (n = document[M.exitFullscreen]()) instanceof Promise && n.then(i).catch(e)) : t()
            })
        },
        on: function(e, t) {
            var i = z[e];
            i && document.addEventListener(i, t)
        },
        off: function(e, t) {
            var i = z[e];
            i && document.removeEventListener(i, t)
        }
    }, Object.defineProperties(O, {
        isFullscreen: {
            get: function() {
                return Boolean(document[M.fullscreenElement])
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return document[M.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return Boolean(document[M.fullscreenEnabled])
            }
        }
    }), A = O, function(e) {
        function i(e) {
            "console" in window && console.error && console.error("There was an error creating an embed: ".concat(e))
        }
        var t = 0 < arguments.length && void 0 !== e ? e : document;
        [].slice.call(t.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function(t) {
            try {
                if (null !== t.getAttribute("data-vimeo-defer")) return;
                var e = _(t);
                E(u(e), e, t).then(function(e) {
                    return x(e, t)
                }).catch(i)
            } catch (e) {
                i(e)
            }
        })
    }(), function(e) {
        var n = 0 < arguments.length && void 0 !== e ? e : document;
        window.VimeoPlayerResizeEmbeds_ || (window.VimeoPlayerResizeEmbeds_ = !0, window.addEventListener("message", function(e) {
            if (c(e.origin) && e.data && "spacechange" === e.data.event)
                for (var t = n.querySelectorAll("iframe"), i = 0; i < t.length; i++)
                    if (t[i].contentWindow === e.source) {
                        t[i].parentElement.style.paddingBottom = "".concat(e.data.data[0].bottom, "px");
                        break
                    }
        }))
    }()), D
}),
function(t, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(e) {
        return i(t, e)
    }) : "object" == typeof module && module.exports ? module.exports = i(t, require("jquery")) : t.jQueryBridget = i(t, t.jQuery)
}(window, function(e, t) {
    "use strict";
    var d = Array.prototype.slice,
        i = e.console,
        h = void 0 === i ? function() {} : function(e) {
            i.error(e)
        };

    function n(c, r, u) {
        (u = u || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function(e) {
            u.isPlainObject(e) && (this.options = u.extend(!0, this.options, e))
        }), u.fn[c] = function(e) {
            if ("string" != typeof e) return n = e, this.each(function(e, t) {
                var i = u.data(t, c);
                i ? (i.option(n), i._init()) : (i = new r(t, n), u.data(t, c, i))
            }), this;
            var t, a, s, o, l, n, i = d.call(arguments, 1);
            return s = i, l = "$()." + c + '("' + (a = e) + '")', (t = this).each(function(e, t) {
                var i, n, r = u.data(t, c);
                r ? (i = r[a]) && "_" != a.charAt(0) ? (n = i.apply(r, s), o = void 0 === o ? n : o) : h(l + " is not a valid method") : h(c + " not initialized. Cannot call methods, i.e. " + l)
            }), void 0 !== o ? o : t
        }, a(u))
    }

    function a(e) {
        !e || e && e.bridget || (e.bridget = n)
    }
    return a(t || e.jQuery), n
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], r = 0; r < i.length; r++) {
                var a = i[r];
                n && n[a] && (this.off(e, a), delete n[a]), a.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
}(window, function() {
    "use strict";

    function b(e) {
        var t = parseFloat(e);
        return -1 == e.indexOf("%") && !isNaN(t) && t
    }
    var i = "undefined" == typeof console ? function() {} : function(e) {
            console.error(e)
        },
        T = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        _ = T.length;

    function x(e) {
        var t = getComputedStyle(e);
        return t || i("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), t
    }
    var E, S = !1;

    function C(e) {
        var t, i, n;
        if (S || (S = !0, (t = document.createElement("div")).style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box", (i = document.body || document.documentElement).appendChild(t), n = x(t), E = 200 == Math.round(b(n.width)), C.isBoxSizeOuter = E, i.removeChild(t)), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = x(e);
            if ("none" == r.display) return function() {
                for (var e = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, t = 0; t < _; t++) {
                    e[T[t]] = 0
                }
                return e
            }();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var s = a.isBorderBox = "border-box" == r.boxSizing, o = 0; o < _; o++) {
                var l = T[o],
                    c = r[l],
                    u = parseFloat(c);
                a[l] = isNaN(u) ? 0 : u
            }
            var d = a.paddingLeft + a.paddingRight,
                h = a.paddingTop + a.paddingBottom,
                p = a.marginLeft + a.marginRight,
                f = a.marginTop + a.marginBottom,
                m = a.borderLeftWidth + a.borderRightWidth,
                g = a.borderTopWidth + a.borderBottomWidth,
                v = s && E,
                y = b(r.width);
            !1 !== y && (a.width = y + (v ? 0 : d + m));
            var w = b(r.height);
            return !1 !== w && (a.height = w + (v ? 0 : h + g)), a.innerWidth = a.width - (d + m), a.innerHeight = a.height - (h + g), a.outerWidth = a.width + p, a.outerHeight = a.height + f, a
        }
    }
    return C
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
}(window, function() {
    "use strict";
    var i = function() {
        var e = window.Element.prototype;
        if (e.matches) return "matches";
        if (e.matchesSelector) return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var n = t[i] + "MatchesSelector";
            if (e[n]) return n
        }
    }();
    return function(e, t) {
        return e[i](t)
    }
}),
function(t, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(e) {
        return i(t, e)
    }) : "object" == typeof module && module.exports ? module.exports = i(t, require("desandro-matches-selector")) : t.fizzyUIUtils = i(t, t.matchesSelector)
}(window, function(c, a) {
    var u = {
            extend: function(e, t) {
                for (var i in t) e[i] = t[i];
                return e
            },
            modulo: function(e, t) {
                return (e % t + t) % t
            }
        },
        t = Array.prototype.slice;
    u.makeArray = function(e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == typeof e && "number" == typeof e.length ? t.call(e) : [e]
    }, u.removeFrom = function(e, t) {
        var i = e.indexOf(t); - 1 != i && e.splice(i, 1)
    }, u.getParent = function(e, t) {
        for (; e.parentNode && e != document.body;)
            if (e = e.parentNode, a(e, t)) return e
    }, u.getQueryElement = function(e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, u.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, u.filterFindElements = function(e, n) {
        e = u.makeArray(e);
        var r = [];
        return e.forEach(function(e) {
            if (e instanceof HTMLElement)
                if (n) {
                    a(e, n) && r.push(e);
                    for (var t = e.querySelectorAll(n), i = 0; i < t.length; i++) r.push(t[i])
                } else r.push(e)
        }), r
    }, u.debounceMethod = function(e, t, n) {
        n = n || 100;
        var r = e.prototype[t],
            a = t + "Timeout";
        e.prototype[t] = function() {
            var e = this[a];
            clearTimeout(e);
            var t = arguments,
                i = this;
            this[a] = setTimeout(function() {
                r.apply(i, t), delete i[a]
            }, n)
        }
    }, u.docReady = function(e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
    }, u.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, function(e, t, i) {
            return t + "-" + i
        }).toLowerCase()
    };
    var d = c.console;
    return u.htmlInit = function(o, l) {
        u.docReady(function() {
            var e = u.toDashed(l),
                r = "data-" + e,
                t = document.querySelectorAll("[" + r + "]"),
                i = document.querySelectorAll(".js-" + e),
                n = u.makeArray(t).concat(u.makeArray(i)),
                a = r + "-options",
                s = c.jQuery;
            n.forEach(function(t) {
                var e, i = t.getAttribute(r) || t.getAttribute(a);
                try {
                    e = i && JSON.parse(i)
                } catch (e) {
                    return void(d && d.error("Error parsing " + r + " on " + t.className + ": " + e))
                }
                var n = new o(t, e);
                s && s.data(t, l, n)
            })
        })
    }, u
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
}(window, function(e, t) {
    "use strict";
    var i = document.documentElement.style,
        n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
        r = "string" == typeof i.transform ? "transform" : "WebkitTransform",
        a = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[n],
        s = {
            transform: r,
            transition: n,
            transitionDuration: n + "Duration",
            transitionProperty: n + "Property",
            transitionDelay: n + "Delay"
        };

    function o(e, t) {
        e && (this.element = e, this.layout = t, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }
    var l = o.prototype = Object.create(e.prototype);
    l.constructor = o, l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, l.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, l.getSize = function() {
        this.size = t(this.element)
    }, l.css = function(e) {
        var t = this.element.style;
        for (var i in e) {
            t[s[i] || i] = e[i]
        }
    }, l.getPosition = function() {
        var e = getComputedStyle(this.element),
            t = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = e[t ? "left" : "right"],
            r = e[i ? "top" : "bottom"],
            a = parseFloat(n),
            s = parseFloat(r),
            o = this.layout.size; - 1 != n.indexOf("%") && (a = a / 100 * o.width), -1 != r.indexOf("%") && (s = s / 100 * o.height), a = isNaN(a) ? 0 : a, s = isNaN(s) ? 0 : s, a -= t ? o.paddingLeft : o.paddingRight, s -= i ? o.paddingTop : o.paddingBottom, this.position.x = a, this.position.y = s
    }, l.layoutPosition = function() {
        var e = this.layout.size,
            t = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            r = i ? "paddingLeft" : "paddingRight",
            a = i ? "left" : "right",
            s = i ? "right" : "left",
            o = this.position.x + e[r];
        t[a] = this.getXValue(o), t[s] = "";
        var l = n ? "paddingTop" : "paddingBottom",
            c = n ? "top" : "bottom",
            u = n ? "bottom" : "top",
            d = this.position.y + e[l];
        t[c] = this.getYValue(d), t[u] = "", this.css(t), this.emitEvent("layout", [this])
    }, l.getXValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
    }, l.getYValue = function(e) {
        var t = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
    }, l._transitionTo = function(e, t) {
        this.getPosition();
        var i, n, r, a = this.position.x,
            s = this.position.y,
            o = e == this.position.x && t == this.position.y;
        this.setPosition(e, t), !o || this.isTransitioning ? (i = e - a, n = t - s, (r = {}).transform = this.getTranslate(i, n), this.transition({
            to: r,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })) : this.layoutPosition()
    }, l.getTranslate = function(e, t) {
        return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
    }, l.goTo = function(e, t) {
        this.setPosition(e, t), this.layoutPosition()
    }, l.moveTo = l._transitionTo, l.setPosition = function(e, t) {
        this.position.x = parseFloat(e), this.position.y = parseFloat(t)
    }, l._nonTransition = function(e) {
        for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
    }, l.transition = function(e) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var t = this._transn;
            for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
            for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
            e.from && (this.css(e.from), this.element.offsetHeight, 0), this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        } else this._nonTransition(e)
    };
    var c = "opacity," + r.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase()
    });
    l.enableTransition = function() {
        var e;
        this.isTransitioning || (e = "number" == typeof(e = this.layout.options.transitionDuration) ? e + "ms" : e, this.css({
            transitionProperty: c,
            transitionDuration: e,
            transitionDelay: this.staggerDelay || 0
        }), this.element.addEventListener(a, this, !1))
    }, l.onwebkitTransitionEnd = function(e) {
        this.ontransitionend(e)
    }, l.onotransitionend = function(e) {
        this.ontransitionend(e)
    };
    var u = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(e) {
        var t, i;
        e.target === this.element && (t = this._transn, i = u[e.propertyName] || e.propertyName, delete t.ingProperties[i], function(e) {
            for (var t in e) return;
            return 1
        }(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd && (t.onEnd[i].call(this), delete t.onEnd[i]), this.emitEvent("transitionEnd", [this]))
    }, l.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
    }, l._removeStyles = function(e) {
        var t = {};
        for (var i in e) t[i] = "";
        this.css(t)
    };
    var d = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(d)
    }, l.stagger = function(e) {
        e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
    }, l.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, l.remove = function() {
        n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), this.hide()) : this.removeElem()
    }, l.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: e.hiddenStyle,
            to: e.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, l.getHideRevealTransitionEndProperty = function(e) {
        var t = this.layout.options[e];
        if (t.opacity) return "opacity";
        for (var i in t) return i
    }, l.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var e = this.layout.options,
            t = {};
        t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: e.visibleStyle,
            to: e.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: t
        })
    }, l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(r, a) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(e, t, i, n) {
        return a(r, e, t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = a(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : r.Outlayer = a(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, r.Outlayer.Item)
}(window, function(e, t, r, a, n) {
    "use strict";

    function i() {}
    var s = e.console,
        o = e.jQuery,
        l = 0,
        c = {};

    function u(e, t) {
        var i, n = a.getQueryElement(e);
        n ? (this.element = n, o && (this.$element = o(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(t), i = ++l, this.element.outlayerGUID = i, (c[i] = this)._create(), this._getOption("initLayout") && this.layout()) : s && s.error("Bad element for " + this.constructor.namespace + ": " + (n || e))
    }
    u.namespace = "outlayer", u.Item = n, u.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var d = u.prototype;

    function h(e) {
        function t() {
            e.apply(this, arguments)
        }
        return (t.prototype = Object.create(e.prototype)).constructor = t
    }
    a.extend(d, t.prototype), d.option = function(e) {
        a.extend(this.options, e)
    }, d._getOption = function(e) {
        var t = this.constructor.compatOptions[e];
        return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
    }, u.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, d._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), a.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, d.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, d._itemize = function(e) {
        for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], r = 0; r < t.length; r++) {
            var a = new i(t[r], this);
            n.push(a)
        }
        return n
    }, d._filterFindItemElements = function(e) {
        return a.filterFindElements(e, this.options.itemSelector)
    }, d.getItemElements = function() {
        return this.items.map(function(e) {
            return e.element
        })
    }, d.layout = function() {
        this._resetLayout(), this._manageStamps();
        var e = this._getOption("layoutInstant"),
            t = void 0 !== e ? e : !this._isLayoutInited;
        this.layoutItems(this.items, t), this._isLayoutInited = !0
    }, d._init = d.layout, d._resetLayout = function() {
        this.getSize()
    }, d.getSize = function() {
        this.size = r(this.element)
    }, d._getMeasurement = function(e, t) {
        var i, n = this.options[e];
        n ? ("string" == typeof n ? i = this.element.querySelector(n) : n instanceof HTMLElement && (i = n), this[e] = i ? r(i)[t] : n) : this[e] = 0
    }, d.layoutItems = function(e, t) {
        e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
    }, d._getItemsForLayout = function(e) {
        return e.filter(function(e) {
            return !e.isIgnored
        })
    }, d._layoutItems = function(e, i) {
        var n;
        this._emitCompleteOnItems("layout", e), e && e.length && (n = [], e.forEach(function(e) {
            var t = this._getItemLayoutPosition(e);
            t.item = e, t.isInstant = i || e.isLayoutInstant, n.push(t)
        }, this), this._processLayoutQueue(n))
    }, d._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, d._processLayoutQueue = function(e) {
        this.updateStagger(), e.forEach(function(e, t) {
            this._positionItem(e.item, e.x, e.y, e.isInstant, t)
        }, this)
    }, d.updateStagger = function() {
        var e = this.options.stagger;
        if (null != e) return this.stagger = function(e) {
            if ("number" == typeof e) return e;
            var t = e.match(/(^\d*\.?\d*)(\w*)/),
                i = t && t[1],
                n = t && t[2];
            if (!i.length) return 0;
            i = parseFloat(i);
            var r = p[n] || 1;
            return i * r
        }(e), this.stagger;
        this.stagger = 0
    }, d._positionItem = function(e, t, i, n, r) {
        n ? e.goTo(t, i) : (e.stagger(r * this.stagger), e.moveTo(t, i))
    }, d._postLayout = function() {
        this.resizeContainer()
    }, d.resizeContainer = function() {
        var e;
        !this._getOption("resizeContainer") || (e = this._getContainerSize()) && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
    }, d._getContainerSize = i, d._setContainerMeasure = function(e, t) {
        var i;
        void 0 !== e && ((i = this.size).isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px")
    }, d._emitCompleteOnItems = function(t, e) {
        var i = this;

        function n() {
            i.dispatchEvent(t + "Complete", null, [e])
        }
        var r, a = e.length;

        function s() {
            ++r == a && n()
        }
        e && a ? (r = 0, e.forEach(function(e) {
            e.once(t, s)
        })) : n()
    }, d.dispatchEvent = function(e, t, i) {
        var n, r = t ? [t].concat(i) : i;
        this.emitEvent(e, r), o && (this.$element = this.$element || o(this.element), t ? ((n = o.Event(t)).type = e, this.$element.trigger(n, i)) : this.$element.trigger(e, i))
    }, d.ignore = function(e) {
        var t = this.getItem(e);
        t && (t.isIgnored = !0)
    }, d.unignore = function(e) {
        var t = this.getItem(e);
        t && delete t.isIgnored
    }, d.stamp = function(e) {
        (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
    }, d.unstamp = function(e) {
        (e = this._find(e)) && e.forEach(function(e) {
            a.removeFrom(this.stamps, e), this.unignore(e)
        }, this)
    }, d._find = function(e) {
        if (e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), e = a.makeArray(e)
    }, d._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, d._getBoundingRect = function() {
        var e = this.element.getBoundingClientRect(),
            t = this.size;
        this._boundingRect = {
            left: e.left + t.paddingLeft + t.borderLeftWidth,
            top: e.top + t.paddingTop + t.borderTopWidth,
            right: e.right - (t.paddingRight + t.borderRightWidth),
            bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
        }
    }, d._manageStamp = i, d._getElementOffset = function(e) {
        var t = e.getBoundingClientRect(),
            i = this._boundingRect,
            n = r(e);
        return {
            left: t.left - i.left - n.marginLeft,
            top: t.top - i.top - n.marginTop,
            right: i.right - t.right - n.marginRight,
            bottom: i.bottom - t.bottom - n.marginBottom
        }
    }, d.handleEvent = a.handleEvent, d.bindResize = function() {
        e.addEventListener("resize", this), this.isResizeBound = !0
    }, d.unbindResize = function() {
        e.removeEventListener("resize", this), this.isResizeBound = !1
    }, d.onresize = function() {
        this.resize()
    }, a.debounceMethod(u, "onresize", 100), d.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, d.needsResizeLayout = function() {
        var e = r(this.element);
        return this.size && e && e.innerWidth !== this.size.innerWidth
    }, d.addItems = function(e) {
        var t = this._itemize(e);
        return t.length && (this.items = this.items.concat(t)), t
    }, d.appended = function(e) {
        var t = this.addItems(e);
        t.length && (this.layoutItems(t, !0), this.reveal(t))
    }, d.prepended = function(e) {
        var t, i = this._itemize(e);
        i.length && (t = this.items.slice(0), this.items = i.concat(t), this._resetLayout(), this._manageStamps(), this.layoutItems(i, !0), this.reveal(i), this.layoutItems(t))
    }, d.reveal = function(e) {
        var i;
        this._emitCompleteOnItems("reveal", e), e && e.length && (i = this.updateStagger(), e.forEach(function(e, t) {
            e.stagger(t * i), e.reveal()
        }))
    }, d.hide = function(e) {
        var i;
        this._emitCompleteOnItems("hide", e), e && e.length && (i = this.updateStagger(), e.forEach(function(e, t) {
            e.stagger(t * i), e.hide()
        }))
    }, d.revealItemElements = function(e) {
        var t = this.getItems(e);
        this.reveal(t)
    }, d.hideItemElements = function(e) {
        var t = this.getItems(e);
        this.hide(t)
    }, d.getItem = function(e) {
        for (var t = 0; t < this.items.length; t++) {
            var i = this.items[t];
            if (i.element == e) return i
        }
    }, d.getItems = function(e) {
        e = a.makeArray(e);
        var i = [];
        return e.forEach(function(e) {
            var t = this.getItem(e);
            t && i.push(t)
        }, this), i
    }, d.remove = function(e) {
        var t = this.getItems(e);
        this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function(e) {
            e.remove(), a.removeFrom(this.items, e)
        }, this)
    }, d.destroy = function() {
        var e = this.element.style;
        e.height = "", e.position = "", e.width = "", this.items.forEach(function(e) {
            e.destroy()
        }), this.unbindResize();
        var t = this.element.outlayerGUID;
        delete c[t], delete this.element.outlayerGUID, o && o.removeData(this.element, this.constructor.namespace)
    }, u.data = function(e) {
        var t = (e = a.getQueryElement(e)) && e.outlayerGUID;
        return t && c[t]
    }, u.create = function(e, t) {
        var i = h(u);
        return i.defaults = a.extend({}, u.defaults), a.extend(i.defaults, t), i.compatOptions = a.extend({}, u.compatOptions), i.namespace = e, i.data = u.data, i.Item = h(n), a.htmlInit(i, e), o && o.bridget && o.bridget(e, i), i
    };
    var p = {
        ms: 1,
        s: 1e3
    };
    return u.Item = n, u
}),
function(e, t) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window, function(e, c) {
    var t = e.create("masonry");
    t.compatOptions.fitWidth = "isFitWidth";
    var i = t.prototype;
    return i._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var e = 0; e < this.cols; e++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, i.measureColumns = function() {
        var e, t;
        this.getContainerWidth(), this.columnWidth || (t = (e = this.items[0]) && e.element, this.columnWidth = t && c(t).outerWidth || this.containerWidth);
        var i = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            r = n / i,
            a = i - n % i,
            r = Math[a && a < 1 ? "round" : "floor"](r);
        this.cols = Math.max(r, 1)
    }, i.getContainerWidth = function() {
        var e = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            t = c(e);
        this.containerWidth = t && t.innerWidth
    }, i._getItemLayoutPosition = function(e) {
        e.getSize();
        for (var t = e.size.outerWidth % this.columnWidth, i = Math[t && t < 1 ? "round" : "ceil"](e.size.outerWidth / this.columnWidth), i = Math.min(i, this.cols), n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, e), r = {
                x: this.columnWidth * n.col,
                y: n.y
            }, a = n.y + e.size.outerHeight, s = i + n.col, o = n.col; o < s; o++) this.colYs[o] = a;
        return r
    }, i._getTopColPosition = function(e) {
        var t = this._getTopColGroup(e),
            i = Math.min.apply(Math, t);
        return {
            col: t.indexOf(i),
            y: i
        }
    }, i._getTopColGroup = function(e) {
        if (e < 2) return this.colYs;
        for (var t = [], i = this.cols + 1 - e, n = 0; n < i; n++) t[n] = this._getColGroupY(n, e);
        return t
    }, i._getColGroupY = function(e, t) {
        if (t < 2) return this.colYs[e];
        var i = this.colYs.slice(e, e + t);
        return Math.max.apply(Math, i)
    }, i._getHorizontalColPosition = function(e, t) {
        var i = this.horizontalColIndex % this.cols,
            i = 1 < e && i + e > this.cols ? 0 : i,
            n = t.size.outerWidth && t.size.outerHeight;
        return this.horizontalColIndex = n ? i + e : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, e)
        }
    }, i._manageStamp = function(e) {
        var t = c(e),
            i = this._getElementOffset(e),
            n = this._getOption("originLeft") ? i.left : i.right,
            r = n + t.outerWidth,
            a = Math.floor(n / this.columnWidth),
            a = Math.max(0, a),
            s = Math.floor(r / this.columnWidth);
        s -= r % this.columnWidth ? 0 : 1, s = Math.min(this.cols - 1, s);
        for (var o = (this._getOption("originTop") ? i.top : i.bottom) + t.outerHeight, l = a; l <= s; l++) this.colYs[l] = Math.max(o, this.colYs[l])
    }, i._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var e = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
    }, i._getContainerFitWidth = function() {
        for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
        return (this.cols - e) * this.columnWidth - this.gutter
    }, i.needsResizeLayout = function() {
        var e = this.containerWidth;
        return this.getContainerWidth(), e != this.containerWidth
    }, t
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";

    function r(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function e() {
        return (e = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }).apply(this, arguments)
    }

    function n(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function a(t, i) {
        void 0 === t && (t = {}), void 0 === i && (i = {}), Object.keys(i).forEach(function(e) {
            void 0 === t[e] ? t[e] = i[e] : n(i[e]) && n(t[e]) && 0 < Object.keys(i[e]).length && a(t[e], i[e])
        })
    }
    var t = {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        createElementNS: function() {
            return {}
        },
        importNode: function() {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };

    function T() {
        var e = "undefined" != typeof document ? document : {};
        return a(e, t), e
    }
    var i = {
        document: t,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function() {},
            pushState: function() {},
            go: function() {},
            back: function() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {},
        matchMedia: function() {
            return {}
        },
        requestAnimationFrame: function(e) {
            return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
        },
        cancelAnimationFrame: function(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };

    function se() {
        var e = "undefined" != typeof window ? window : {};
        return a(e, i), e
    }

    function s(e) {
        return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function o(e, t) {
        return (o = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function l(e, t, i) {
        return (l = function() {
            if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
                if ("function" == typeof Proxy) return 1;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 1
                } catch (e) {
                    return
                }
            }
        }() ? Reflect.construct : function(e, t, i) {
            var n = [null];
            n.push.apply(n, t);
            var r = new(Function.bind.apply(e, n));
            return i && o(r, i.prototype), r
        }).apply(null, arguments)
    }

    function c(e) {
        var n = "function" == typeof Map ? new Map : void 0;
        return (c = function(e) {
            if (null === e || (t = e, -1 === Function.toString.call(t).indexOf("[native code]"))) return e;
            var t;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== n) {
                if (n.has(e)) return n.get(e);
                n.set(e, i)
            }

            function i() {
                return l(e, arguments, s(this).constructor)
            }
            return i.prototype = Object.create(e.prototype, {
                constructor: {
                    value: i,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), o(i, e)
        })(e)
    }
    var u = function(r) {
        var e, t;

        function i(e) {
            var t, i, n = r.call.apply(r, [this].concat(e)) || this;
            return t = function(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(n), i = t.__proto__, Object.defineProperty(t, "__proto__", {
                get: function() {
                    return i
                },
                set: function(e) {
                    i.__proto__ = e
                }
            }), n
        }
        return t = r, (e = i).prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t, i
    }(c(Array));

    function d(e) {
        void 0 === e && (e = []);
        var t = [];
        return e.forEach(function(e) {
            Array.isArray(e) ? t.push.apply(t, d(e)) : t.push(e)
        }), t
    }

    function h(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function L(e, t) {
        var i = se(),
            n = T(),
            r = [];
        if (!t && e instanceof u) return e;
        if (!e) return new u(r);
        if ("string" == typeof e) {
            var a = e.trim();
            if (0 <= a.indexOf("<") && 0 <= a.indexOf(">")) {
                var s = "div";
                0 === a.indexOf("<li") && (s = "ul"), 0 === a.indexOf("<tr") && (s = "tbody"), 0 !== a.indexOf("<td") && 0 !== a.indexOf("<th") || (s = "tr"), 0 === a.indexOf("<tbody") && (s = "table"), 0 === a.indexOf("<option") && (s = "select");
                var o = n.createElement(s);
                o.innerHTML = a;
                for (var l = 0; l < o.childNodes.length; l += 1) r.push(o.childNodes[l])
            } else r = function(e, t) {
                if ("string" != typeof e) return [e];
                for (var i = [], n = t.querySelectorAll(e), r = 0; r < n.length; r += 1) i.push(n[r]);
                return i
            }(e.trim(), t || n)
        } else if (e.nodeType || e === i || e === n) r.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof u) return e;
            r = e
        }
        return new u(function(e) {
            for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
            return t
        }(r))
    }
    L.fn = u.prototype;
    var p, g, f, m = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = d(t.map(function(e) {
                return e.split(" ")
            }));
            return this.forEach(function(e) {
                var t;
                (t = e.classList).add.apply(t, n)
            }), this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = d(t.map(function(e) {
                return e.split(" ")
            }));
            return this.forEach(function(e) {
                var t;
                (t = e.classList).remove.apply(t, n)
            }), this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = d(t.map(function(e) {
                return e.split(" ")
            }));
            return 0 < h(this, function(t) {
                return 0 < n.filter(function(e) {
                    return t.classList.contains(e)
                }).length
            }).length
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = d(t.map(function(e) {
                return e.split(" ")
            }));
            this.forEach(function(t) {
                n.forEach(function(e) {
                    t.classList.toggle(e)
                })
            })
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === arguments.length) this[i].setAttribute(e, t);
                else
                    for (var n in e) this[i][n] = e[n], this[i].setAttribute(n, e[n]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transition = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = t[0],
                a = t[1],
                s = t[2],
                r = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), L(t).is(a)) s.apply(t, i);
                    else
                        for (var n = L(t).parents(), r = 0; r < n.length; r += 1) L(n[r]).is(a) && s.apply(n[r], i)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t)
            }
            "function" == typeof t[1] && (n = t[0], s = t[1], r = t[2], a = void 0), r = r || !1;
            for (var c, u = n.split(" "), d = 0; d < this.length; d += 1) {
                var h = this[d];
                if (a)
                    for (c = 0; c < u.length; c += 1) {
                        var p = u[c];
                        h.dom7LiveListeners || (h.dom7LiveListeners = {}), h.dom7LiveListeners[p] || (h.dom7LiveListeners[p] = []), h.dom7LiveListeners[p].push({
                            listener: s,
                            proxyListener: o
                        }), h.addEventListener(p, o, r)
                    } else
                        for (c = 0; c < u.length; c += 1) {
                            var f = u[c];
                            h.dom7Listeners || (h.dom7Listeners = {}), h.dom7Listeners[f] || (h.dom7Listeners[f] = []), h.dom7Listeners[f].push({
                                listener: s,
                                proxyListener: l
                            }), h.addEventListener(f, l, r)
                        }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = t[0],
                r = t[1],
                a = t[2],
                s = t[3];
            "function" == typeof t[1] && (n = t[0], a = t[1], s = t[2], r = void 0), s = s || !1;
            for (var o = n.split(" "), l = 0; l < o.length; l += 1)
                for (var c = o[l], u = 0; u < this.length; u += 1) {
                    var d = this[u],
                        h = void 0;
                    if (!r && d.dom7Listeners ? h = d.dom7Listeners[c] : r && d.dom7LiveListeners && (h = d.dom7LiveListeners[c]), h && h.length)
                        for (var p = h.length - 1; 0 <= p; --p) {
                            var f = h[p];
                            (!a || f.listener !== a) && !(a && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === a) && a || (d.removeEventListener(c, f.proxyListener, s), h.splice(p, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = se(), t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
            for (var r = i[0].split(" "), a = i[1], s = 0; s < r.length; s += 1)
                for (var o = r[s], l = 0; l < this.length; l += 1) {
                    var c, u = this[l];
                    e.CustomEvent && (c = new e.CustomEvent(o, {
                        detail: a,
                        bubbles: !0,
                        cancelable: !0
                    }), u.dom7EventData = i.filter(function(e, t) {
                        return 0 < t
                    }), u.dispatchEvent(c), u.dom7EventData = [], delete u.dom7EventData)
                }
            return this
        },
        transitionEnd: function(i) {
            var n = this;
            return i && n.on("transitionend", function e(t) {
                t.target === this && (i.call(this, t), n.off("transitionend", e))
            }), this
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            var e = se();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (0 < this.length) {
                var e = se(),
                    t = T(),
                    i = this[0],
                    n = i.getBoundingClientRect(),
                    r = t.body,
                    a = i.clientTop || r.clientTop || 0,
                    s = i.clientLeft || r.clientLeft || 0,
                    o = i === e ? e.scrollY : i.scrollTop,
                    l = i === e ? e.scrollX : i.scrollLeft;
                return {
                    top: n.top + o - a,
                    left: n.left + l - s
                }
            }
            return null
        },
        css: function(e, t) {
            var i, n = se();
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (var r in e) this[i].style[r] = e[r];
                    return this
                }
                if (this[0]) return n.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 !== arguments.length || "string" != typeof e) return this;
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this
        },
        each: function(i) {
            return i && this.forEach(function(e, t) {
                i.apply(e, [e, t])
            }), this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, i, n = se(),
                r = T(),
                a = this[0];
            if (!a || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (a.matches) return a.matches(e);
                if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
                if (a.msMatchesSelector) return a.msMatchesSelector(e);
                for (t = L(e), i = 0; i < t.length; i += 1)
                    if (t[i] === a) return !0;
                return !1
            }
            if (e === r) return a === r;
            if (e === n) return a === n;
            if (e.nodeType || e instanceof u) {
                for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
                    if (t[i] === a) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t = this.length;
            if (t - 1 < e) return L([]);
            if (e < 0) {
                var i = t + e;
                return i < 0 ? L([]) : L([this[i]])
            }
            return L([this[e]])
        },
        append: function() {
            for (var e, t = T(), i = 0; i < arguments.length; i += 1) {
                e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof e) {
                        var r = t.createElement("div");
                        for (r.innerHTML = e; r.firstChild;) this[n].appendChild(r.firstChild)
                    } else if (e instanceof u)
                    for (var a = 0; a < e.length; a += 1) this[n].appendChild(e[a]);
                else this[n].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            for (var t, i = T(), n = 0; n < this.length; n += 1)
                if ("string" == typeof e) {
                    var r = i.createElement("div");
                    for (r.innerHTML = e, t = r.childNodes.length - 1; 0 <= t; --t) this[n].insertBefore(r.childNodes[t], this[n].childNodes[0])
                } else if (e instanceof u)
                for (t = 0; t < e.length; t += 1) this[n].insertBefore(e[t], this[n].childNodes[0]);
            else this[n].insertBefore(e, this[n].childNodes[0]);
            return this
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? L([this[0].nextElementSibling]) : L([]) : this[0].nextElementSibling ? L([this[0].nextElementSibling]) : L([]) : L([])
        },
        nextAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return L([]);
            for (; i.nextElementSibling;) {
                var n = i.nextElementSibling;
                (!e || L(n).is(e)) && t.push(n), i = n
            }
            return L(t)
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? L([t.previousElementSibling]) : L([]) : t.previousElementSibling ? L([t.previousElementSibling]) : L([])
            }
            return L([])
        },
        prevAll: function(e) {
            var t = [],
                i = this[0];
            if (!i) return L([]);
            for (; i.previousElementSibling;) {
                var n = i.previousElementSibling;
                (!e || L(n).is(e)) && t.push(n), i = n
            }
            return L(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null === this[i].parentNode || e && !L(this[i].parentNode).is(e) || t.push(this[i].parentNode);
            return L(t)
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var n = this[i].parentNode; n;) e && !L(n).is(e) || t.push(n), n = n.parentNode;
            return L(t)
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? L([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var n = this[i].querySelectorAll(e), r = 0; r < n.length; r += 1) t.push(n[r]);
            return L(t)
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var n = this[i].children, r = 0; r < n.length; r += 1) e && !L(n[r]).is(e) || t.push(n[r]);
            return L(t)
        },
        filter: function(e) {
            return L(h(this, e))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };

    function D(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }

    function I() {
        return Date.now()
    }

    function v(e, t) {
        void 0 === t && (t = "x");
        var i, n, r, a = se(),
            s = a.getComputedStyle(e, null);
        return a.WebKitCSSMatrix ? (6 < (n = s.transform || s.webkitTransform).split(",").length && (n = n.split(", ").map(function(e) {
            return e.replace(",", ".")
        }).join(", ")), r = new a.WebKitCSSMatrix("none" === n ? "" : n)) : i = (r = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (n = a.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = a.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
    }

    function y(e) {
        return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
    }

    function oe(e) {
        for (var t = Object(arguments.length <= 0 ? void 0 : e), i = 1; i < arguments.length; i += 1) {
            var n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (null != n)
                for (var r = Object.keys(Object(n)), a = 0, s = r.length; a < s; a += 1) {
                    var o = r[a],
                        l = Object.getOwnPropertyDescriptor(n, o);
                    void 0 !== l && l.enumerable && (y(t[o]) && y(n[o]) ? oe(t[o], n[o]) : !y(t[o]) && y(n[o]) ? (t[o] = {}, oe(t[o], n[o])) : t[o] = n[o])
                }
        }
        return t
    }

    function w(i, n) {
        Object.keys(n).forEach(function(t) {
            y(n[t]) && Object.keys(n[t]).forEach(function(e) {
                "function" == typeof n[t][e] && (n[t][e] = n[t][e].bind(i))
            }), i[t] = n[t]
        })
    }

    function b() {
        var i, e;
        return p || (i = se(), e = T(), p = {
            touch: !!("ontouchstart" in i || i.DocumentTouch && e instanceof i.DocumentTouch),
            pointerEvents: !!i.PointerEvent && "maxTouchPoints" in i.navigator && 0 <= i.navigator.maxTouchPoints,
            observer: "MutationObserver" in i || "WebkitMutationObserver" in i,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    i.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in i
        }), p
    }

    function _(e) {
        var t, i, n, r, a, s, o, l, c, u, d, h, p, f, m;
        return void 0 === e && (e = {}), g || (i = (void 0 === (t = e) ? {} : t).userAgent, n = b(), r = se(), a = r.navigator.platform, s = i || r.navigator.userAgent, o = {
            ios: !1,
            android: !1
        }, l = r.screen.width, c = r.screen.height, u = s.match(/(Android);?[\s\/]+([\d.]+)?/), d = s.match(/(iPad).*OS\s([\d_]+)/), h = s.match(/(iPod)(.*OS\s([\d_]+))?/), p = !d && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/), f = "Win32" === a, m = "MacIntel" === a, !d && m && n.touch && 0 <= ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768"].indexOf(l + "x" + c) && (d = (d = s.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"], m = !1), u && !f && (o.os = "android", o.android = !0), (d || p || h) && (o.os = "ios", o.ios = !0), g = o), g
    }

    function x() {
        var e, t;
        return f || (t = se(), f = {
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: 0 <= (e = t.navigator.userAgent.toLowerCase()).indexOf("safari") && e.indexOf("chrome") < 0 && e.indexOf("android") < 0,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        }), f
    }
    Object.keys(m).forEach(function(e) {
        L.fn[e] = m[e]
    });
    var E = {
            name: "resize",
            create: function() {
                var e = this;
                oe(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function(e) {
                    var t = se();
                    t.addEventListener("resize", e.resize.resizeHandler), t.addEventListener("orientationchange", e.resize.orientationChangeHandler)
                },
                destroy: function(e) {
                    var t = se();
                    t.removeEventListener("resize", e.resize.resizeHandler), t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
                }
            }
        },
        S = {
            attach: function(e, t) {
                void 0 === t && (t = {});
                var i = se(),
                    n = this,
                    r = new(i.MutationObserver || i.WebkitMutationObserver)(function(e) {
                        var t;
                        1 !== e.length ? (t = function() {
                            n.emit("observerUpdate", e[0])
                        }, i.requestAnimationFrame ? i.requestAnimationFrame(t) : i.setTimeout(t, 0)) : n.emit("observerUpdate", e[0])
                    });
                r.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), n.observer.observers.push(r)
            },
            init: function() {
                var e = this;
                if (e.support.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach(function(e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        },
        C = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                w(this, {
                    observer: e(e({}, S), {}, {
                        observers: []
                    })
                })
            },
            on: {
                init: function(e) {
                    e.observer.init()
                },
                destroy: function(e) {
                    e.observer.destroy()
                }
            }
        };

    function k() {
        var e, t, i, n = this,
            r = n.params,
            a = n.el;
        a && 0 === a.offsetWidth || (r.breakpoints && n.setBreakpoint(), e = n.allowSlideNext, t = n.allowSlidePrev, i = n.snapGrid, n.allowSlideNext = !0, n.allowSlidePrev = !0, n.updateSize(), n.updateSlides(), n.updateSlidesClasses(), ("auto" === r.slidesPerView || 1 < r.slidesPerView) && n.isEnd && !n.isBeginning && !n.params.centeredSlides ? n.slideTo(n.slides.length - 1, 0, !1, !0) : n.slideTo(n.activeIndex, 0, !1, !0), n.autoplay && n.autoplay.running && n.autoplay.paused && n.autoplay.run(), n.allowSlidePrev = t, n.allowSlideNext = e, n.params.watchOverflow && i !== n.snapGrid && n.checkOverflow())
    }
    var M = !1;

    function z() {}
    var O = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1
        },
        P = {
            modular: {
                useParams: function(i) {
                    var n = this;
                    n.modules && Object.keys(n.modules).forEach(function(e) {
                        var t = n.modules[e];
                        t.params && oe(i, t.params)
                    })
                },
                useModules: function(n) {
                    void 0 === n && (n = {});
                    var r = this;
                    r.modules && Object.keys(r.modules).forEach(function(e) {
                        var t = r.modules[e],
                            i = n[e] || {};
                        t.on && r.on && Object.keys(t.on).forEach(function(e) {
                            r.on(e, t.on[e])
                        }), t.create && t.create.bind(r)(i)
                    })
                }
            },
            eventsEmitter: {
                on: function(e, t, i) {
                    var n = this;
                    if ("function" != typeof t) return n;
                    var r = i ? "unshift" : "push";
                    return e.split(" ").forEach(function(e) {
                        n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][r](t)
                    }), n
                },
                once: function(n, r, e) {
                    var a = this;
                    if ("function" != typeof r) return a;

                    function s() {
                        a.off(n, s), s.__emitterProxy && delete s.__emitterProxy;
                        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                        r.apply(a, t)
                    }
                    return s.__emitterProxy = r, a.on(n, s, e)
                },
                onAny: function(e, t) {
                    if ("function" != typeof e) return this;
                    var i = t ? "unshift" : "push";
                    return this.eventsAnyListeners.indexOf(e) < 0 && this.eventsAnyListeners[i](e), this
                },
                offAny: function(e) {
                    var t = this;
                    if (!t.eventsAnyListeners) return t;
                    var i = t.eventsAnyListeners.indexOf(e);
                    return 0 <= i && t.eventsAnyListeners.splice(i, 1), t
                },
                off: function(e, n) {
                    var r = this;
                    return r.eventsListeners && e.split(" ").forEach(function(i) {
                        void 0 === n ? r.eventsListeners[i] = [] : r.eventsListeners[i] && r.eventsListeners[i].forEach(function(e, t) {
                            (e === n || e.__emitterProxy && e.__emitterProxy === n) && r.eventsListeners[i].splice(t, 1)
                        })
                    }), r
                },
                emit: function() {
                    var e, n, r, a = this;
                    if (!a.eventsListeners) return a;
                    for (var t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
                    return r = "string" == typeof i[0] || Array.isArray(i[0]) ? (e = i[0], n = i.slice(1, i.length), a) : (e = i[0].events, n = i[0].data, i[0].context || a), n.unshift(r), (Array.isArray(e) ? e : e.split(" ")).forEach(function(t) {
                        var i;
                        a.eventsAnyListeners && a.eventsAnyListeners.length && a.eventsAnyListeners.forEach(function(e) {
                            e.apply(r, [t].concat(n))
                        }), a.eventsListeners && a.eventsListeners[t] && (i = [], a.eventsListeners[t].forEach(function(e) {
                            i.push(e)
                        }), i.forEach(function(e) {
                            e.apply(r, n)
                        }))
                    }), a
                }
            },
            update: {
                updateSize: function() {
                    var e = this,
                        t = e.$el,
                        i = void 0 !== e.params.width && null !== e.params.width ? e.params.width : t[0].clientWidth,
                        n = void 0 !== e.params.height && null !== e.params.width ? e.params.height : t[0].clientHeight;
                    0 === i && e.isHorizontal() || 0 === n && e.isVertical() || (i = i - parseInt(t.css("padding-left") || 0, 10) - parseInt(t.css("padding-right") || 0, 10), n = n - parseInt(t.css("padding-top") || 0, 10) - parseInt(t.css("padding-bottom") || 0, 10), Number.isNaN(i) && (i = 0), Number.isNaN(n) && (n = 0), oe(e, {
                        width: i,
                        height: n,
                        size: e.isHorizontal() ? i : n
                    }))
                },
                updateSlides: function() {
                    var e = this,
                        t = se(),
                        i = e.params,
                        n = e.$wrapperEl,
                        r = e.size,
                        a = e.rtlTranslate,
                        s = e.wrongRTL,
                        o = e.virtual && i.virtual.enabled,
                        l = o ? e.virtual.slides.length : e.slides.length,
                        c = n.children("." + e.params.slideClass),
                        u = o ? e.virtual.slides.length : c.length,
                        d = [],
                        h = [],
                        p = [];

                    function f(e, t) {
                        return !i.cssMode || t !== c.length - 1
                    }
                    var m = i.slidesOffsetBefore;
                    "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                    var g = i.slidesOffsetAfter;
                    "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                    var v, y = e.snapGrid.length,
                        w = e.snapGrid.length,
                        b = i.spaceBetween,
                        T = -m,
                        _ = 0,
                        x = 0;
                    if (void 0 !== r) {
                        "string" == typeof b && 0 <= b.indexOf("%") && (b = parseFloat(b.replace("%", "")) / 100 * r), e.virtualSize = -b, a ? c.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : c.css({
                            marginRight: "",
                            marginBottom: ""
                        }), 1 < i.slidesPerColumn && (v = Math.floor(u / i.slidesPerColumn) === u / e.params.slidesPerColumn ? u : Math.ceil(u / i.slidesPerColumn) * i.slidesPerColumn, "auto" !== i.slidesPerView && "row" === i.slidesPerColumnFill && (v = Math.max(v, i.slidesPerView * i.slidesPerColumn)));
                        for (var E, S, C, k, M, z = i.slidesPerColumn, O = v / z, P = Math.floor(u / i.slidesPerColumn), L = 0; L < u; L += 1) {
                            G = 0;
                            var A, D, I, B, N, R, F, $, j, H, W, Y, q, V, X, G, U, Q, K, Z, J, ee, te = c.eq(L);
                            1 < i.slidesPerColumn && (B = N = R = void 0, "row" === i.slidesPerColumnFill && 1 < i.slidesPerGroup ? (A = Math.floor(L / (i.slidesPerGroup * i.slidesPerColumn)), D = L - i.slidesPerColumn * i.slidesPerGroup * A, I = 0 === A ? i.slidesPerGroup : Math.min(Math.ceil((u - A * z * i.slidesPerGroup) / z), i.slidesPerGroup), R = (N = D - (B = Math.floor(D / I)) * I + A * i.slidesPerGroup) + B * v / z, te.css({
                                "-webkit-box-ordinal-group": R,
                                "-moz-box-ordinal-group": R,
                                "-ms-flex-order": R,
                                "-webkit-order": R,
                                order: R
                            })) : "column" === i.slidesPerColumnFill ? (B = L - (N = Math.floor(L / z)) * z, (P < N || N === P && B === z - 1) && z <= (B += 1) && (B = 0, N += 1)) : N = L - (B = Math.floor(L / O)) * O, te.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== B && i.spaceBetween && i.spaceBetween + "px")), "none" !== te.css("display") && ("auto" === i.slidesPerView ? (F = t.getComputedStyle(te[0], null), $ = te[0].style.transform, j = te[0].style.webkitTransform, $ && (te[0].style.transform = "none"), j && (te[0].style.webkitTransform = "none"), G = i.roundLengths ? e.isHorizontal() ? te.outerWidth(!0) : te.outerHeight(!0) : e.isHorizontal() ? (H = parseFloat(F.getPropertyValue("width") || 0), W = parseFloat(F.getPropertyValue("padding-left") || 0), Y = parseFloat(F.getPropertyValue("padding-right") || 0), q = parseFloat(F.getPropertyValue("margin-left") || 0), V = parseFloat(F.getPropertyValue("margin-right") || 0), (X = F.getPropertyValue("box-sizing")) && "border-box" === X ? H + q + V : H + W + Y + q + V) : (U = parseFloat(F.getPropertyValue("height") || 0), Q = parseFloat(F.getPropertyValue("padding-top") || 0), K = parseFloat(F.getPropertyValue("padding-bottom") || 0), Z = parseFloat(F.getPropertyValue("margin-top") || 0), J = parseFloat(F.getPropertyValue("margin-bottom") || 0), (ee = F.getPropertyValue("box-sizing")) && "border-box" === ee ? U + Z + J : U + Q + K + Z + J), $ && (te[0].style.transform = $), j && (te[0].style.webkitTransform = j), i.roundLengths && (G = Math.floor(G))) : (G = (r - (i.slidesPerView - 1) * b) / i.slidesPerView, i.roundLengths && (G = Math.floor(G)), c[L] && (e.isHorizontal() ? c[L].style.width = G + "px" : c[L].style.height = G + "px")), c[L] && (c[L].swiperSlideSize = G), p.push(G), i.centeredSlides ? (T = T + G / 2 + _ / 2 + b, 0 === _ && 0 !== L && (T = T - r / 2 - b), 0 === L && (T = T - r / 2 - b), Math.abs(T) < .001 && (T = 0), i.roundLengths && (T = Math.floor(T)), x % i.slidesPerGroup == 0 && d.push(T), h.push(T)) : (i.roundLengths && (T = Math.floor(T)), (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && d.push(T), h.push(T), T = T + G + b), e.virtualSize += G + b, _ = G, x += 1)
                        }
                        if (e.virtualSize = Math.max(e.virtualSize, r) + g, a && s && ("slide" === i.effect || "coverflow" === i.effect) && n.css({
                                width: e.virtualSize + i.spaceBetween + "px"
                            }), i.setWrapperSize && (e.isHorizontal() ? n.css({
                                width: e.virtualSize + i.spaceBetween + "px"
                            }) : n.css({
                                height: e.virtualSize + i.spaceBetween + "px"
                            })), 1 < i.slidesPerColumn && (e.virtualSize = (G + i.spaceBetween) * v, e.virtualSize = Math.ceil(e.virtualSize / i.slidesPerColumn) - i.spaceBetween, e.isHorizontal() ? n.css({
                                width: e.virtualSize + i.spaceBetween + "px"
                            }) : n.css({
                                height: e.virtualSize + i.spaceBetween + "px"
                            }), i.centeredSlides)) {
                            E = [];
                            for (var ie = 0; ie < d.length; ie += 1) {
                                var ne = d[ie];
                                i.roundLengths && (ne = Math.floor(ne)), d[ie] < e.virtualSize + d[0] && E.push(ne)
                            }
                            d = E
                        }
                        if (!i.centeredSlides) {
                            E = [];
                            for (var re = 0; re < d.length; re += 1) {
                                var ae = d[re];
                                i.roundLengths && (ae = Math.floor(ae)), d[re] <= e.virtualSize - r && E.push(ae)
                            }
                            d = E, 1 < Math.floor(e.virtualSize - r) - Math.floor(d[d.length - 1]) && d.push(e.virtualSize - r)
                        }
                        0 === d.length && (d = [0]), 0 !== i.spaceBetween && (e.isHorizontal() ? a ? c.filter(f).css({
                            marginLeft: b + "px"
                        }) : c.filter(f).css({
                            marginRight: b + "px"
                        }) : c.filter(f).css({
                            marginBottom: b + "px"
                        })), i.centeredSlides && i.centeredSlidesBounds && (S = 0, p.forEach(function(e) {
                            S += e + (i.spaceBetween ? i.spaceBetween : 0)
                        }), C = (S -= i.spaceBetween) - r, d = d.map(function(e) {
                            return e < 0 ? -m : C < e ? C + g : e
                        })), i.centerInsufficientSlides && (k = 0, p.forEach(function(e) {
                            k += e + (i.spaceBetween ? i.spaceBetween : 0)
                        }), (k -= i.spaceBetween) < r && (M = (r - k) / 2, d.forEach(function(e, t) {
                            d[t] = e - M
                        }), h.forEach(function(e, t) {
                            h[t] = e + M
                        }))), oe(e, {
                            slides: c,
                            snapGrid: d,
                            slidesGrid: h,
                            slidesSizesGrid: p
                        }), u !== l && e.emit("slidesLengthChange"), d.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== w && e.emit("slidesGridLengthChange"), (i.watchSlidesProgress || i.watchSlidesVisibility) && e.updateSlidesOffset()
                    }
                },
                updateAutoHeight: function(e) {
                    var t, i, n = this,
                        r = [],
                        a = 0;
                    if ("number" == typeof e ? n.setTransition(e) : !0 === e && n.setTransition(n.params.speed), "auto" !== n.params.slidesPerView && 1 < n.params.slidesPerView)
                        if (n.params.centeredSlides) n.visibleSlides.each(function(e) {
                            r.push(e)
                        });
                        else
                            for (t = 0; t < Math.ceil(n.params.slidesPerView); t += 1) {
                                var s = n.activeIndex + t;
                                if (s > n.slides.length) break;
                                r.push(n.slides.eq(s)[0])
                            } else r.push(n.slides.eq(n.activeIndex)[0]);
                    for (t = 0; t < r.length; t += 1) {
                        void 0 !== r[t] && (a = a < (i = r[t].offsetHeight) ? i : a)
                    }
                    a && n.$wrapperEl.css("height", a + "px")
                },
                updateSlidesOffset: function() {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    var t = this,
                        i = t.params,
                        n = t.slides,
                        r = t.rtlTranslate;
                    if (0 !== n.length) {
                        void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
                        var a = r ? e : -e;
                        n.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                        for (var s = 0; s < n.length; s += 1) {
                            var o, l, c = n[s],
                                u = (a + (i.centeredSlides ? t.minTranslate() : 0) - c.swiperSlideOffset) / (c.swiperSlideSize + i.spaceBetween);
                            (i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && (l = (o = -(a - c.swiperSlideOffset)) + t.slidesSizesGrid[s], (0 <= o && o < t.size - 1 || 1 < l && l <= t.size || o <= 0 && l >= t.size) && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(s), n.eq(s).addClass(i.slideVisibleClass))), c.progress = r ? -u : u
                        }
                        t.visibleSlides = L(t.visibleSlides)
                    }
                },
                updateProgress: function(e) {
                    var t, i = this;
                    void 0 === e && (t = i.rtlTranslate ? -1 : 1, e = i && i.translate && i.translate * t || 0);
                    var n = i.params,
                        r = i.maxTranslate() - i.minTranslate(),
                        a = i.progress,
                        s = i.isBeginning,
                        o = s,
                        l = c = i.isEnd,
                        c = 0 == r ? s = !(a = 0) : (s = (a = (e - i.minTranslate()) / r) <= 0, 1 <= a);
                    oe(i, {
                        progress: a,
                        isBeginning: s,
                        isEnd: c
                    }), (n.watchSlidesProgress || n.watchSlidesVisibility || n.centeredSlides && n.autoHeight) && i.updateSlidesProgress(e), s && !o && i.emit("reachBeginning toEdge"), c && !l && i.emit("reachEnd toEdge"), (o && !s || l && !c) && i.emit("fromEdge"), i.emit("progress", a)
                },
                updateSlidesClasses: function() {
                    var e, t = this,
                        i = t.slides,
                        n = t.params,
                        r = t.$wrapperEl,
                        a = t.activeIndex,
                        s = t.realIndex,
                        o = t.virtual && n.virtual.enabled;
                    i.removeClass(n.slideActiveClass + " " + n.slideNextClass + " " + n.slidePrevClass + " " + n.slideDuplicateActiveClass + " " + n.slideDuplicateNextClass + " " + n.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + n.slideClass + '[data-swiper-slide-index="' + a + '"]') : i.eq(a)).addClass(n.slideActiveClass), n.loop && (e.hasClass(n.slideDuplicateClass) ? r.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass) : r.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass));
                    var l = e.nextAll("." + n.slideClass).eq(0).addClass(n.slideNextClass);
                    n.loop && 0 === l.length && (l = i.eq(0)).addClass(n.slideNextClass);
                    var c = e.prevAll("." + n.slideClass).eq(0).addClass(n.slidePrevClass);
                    n.loop && 0 === c.length && (c = i.eq(-1)).addClass(n.slidePrevClass), n.loop && (l.hasClass(n.slideDuplicateClass) ? r.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass) : r.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass), c.hasClass(n.slideDuplicateClass) ? r.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + c.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass) : r.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + c.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass)), t.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    var t, i, n, r = this,
                        a = r.rtlTranslate ? r.translate : -r.translate,
                        s = r.slidesGrid,
                        o = r.snapGrid,
                        l = r.params,
                        c = r.activeIndex,
                        u = r.realIndex,
                        d = r.snapIndex,
                        h = e;
                    if (void 0 === h) {
                        for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? a >= s[p] && a < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : a >= s[p] && a < s[p + 1] && (h = p + 1) : a >= s[p] && (h = p);
                        l.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
                    }(i = 0 <= o.indexOf(a) ? o.indexOf(a) : (t = Math.min(l.slidesPerGroupSkip, h)) + Math.floor((h - t) / l.slidesPerGroup)) >= o.length && (i = o.length - 1), h !== c ? (n = parseInt(r.slides.eq(h).attr("data-swiper-slide-index") || h, 10), oe(r, {
                        snapIndex: i,
                        realIndex: n,
                        previousIndex: c,
                        activeIndex: h
                    }), r.emit("activeIndexChange"), r.emit("snapIndexChange"), u !== n && r.emit("realIndexChange"), (r.initialized || r.params.runCallbacksOnInit) && r.emit("slideChange")) : i !== d && (r.snapIndex = i, r.emit("snapIndexChange"))
                },
                updateClickedSlide: function(e) {
                    var t = this,
                        i = t.params,
                        n = L(e.target).closest("." + i.slideClass)[0],
                        r = !1;
                    if (n)
                        for (var a = 0; a < t.slides.length; a += 1) t.slides[a] === n && (r = !0);
                    if (!n || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(n).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(n).index(), i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function(e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    var t = this.params,
                        i = this.rtlTranslate,
                        n = this.translate,
                        r = this.$wrapperEl;
                    if (t.virtualTranslate) return i ? -n : n;
                    if (t.cssMode) return n;
                    var a = v(r[0], e);
                    return i && (a = -a), a || 0
                },
                setTranslate: function(e, t) {
                    var i = this,
                        n = i.rtlTranslate,
                        r = i.params,
                        a = i.$wrapperEl,
                        s = i.wrapperEl,
                        o = i.progress,
                        l = 0,
                        c = 0;
                    i.isHorizontal() ? l = n ? -e : e : c = e, r.roundLengths && (l = Math.floor(l), c = Math.floor(c)), r.cssMode ? s[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -c : r.virtualTranslate || a.transform("translate3d(" + l + "px, " + c + "px, 0px)"), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : c;
                    var u = i.maxTranslate() - i.minTranslate();
                    (0 == u ? 0 : (e - i.minTranslate()) / u) !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e, t, i, n, r) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === n && (n = !0);
                    var a = this,
                        s = a.params,
                        o = a.wrapperEl;
                    if (a.animating && s.preventInteractionOnTransition) return !1;
                    var l = a.minTranslate(),
                        c = a.maxTranslate(),
                        u = n && l < e ? l : n && e < c ? c : e;
                    if (a.updateProgress(u), s.cssMode) {
                        var d, h = a.isHorizontal();
                        return 0 !== t && o.scrollTo ? o.scrollTo(((d = {})[h ? "left" : "top"] = -u, d.behavior = "smooth", d)) : o[h ? "scrollLeft" : "scrollTop"] = -u, !0
                    }
                    return 0 === t ? (a.setTransition(0), a.setTranslate(u), i && (a.emit("beforeTransitionStart", t, r), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(u), i && (a.emit("beforeTransitionStart", t, r), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(e) {
                        a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, i && a.emit("transitionEnd"))
                    }), a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function(e, t) {
                    this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this,
                        n = i.activeIndex,
                        r = i.params,
                        a = i.previousIndex;
                    if (!r.cssMode) {
                        r.autoHeight && i.updateAutoHeight();
                        var s = (s = t) || (a < n ? "next" : n < a ? "prev" : "reset");
                        if (i.emit("transitionStart"), e && n !== a) {
                            if ("reset" === s) return void i.emit("slideResetTransitionStart");
                            i.emit("slideChangeTransitionStart"), "next" === s ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
                        }
                    }
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    var i = this,
                        n = i.activeIndex,
                        r = i.previousIndex,
                        a = i.params;
                    if (i.animating = !1, !a.cssMode) {
                        i.setTransition(0);
                        var s = (s = t) || (r < n ? "next" : n < r ? "prev" : "reset");
                        if (i.emit("transitionEnd"), e && n !== r) {
                            if ("reset" === s) return void i.emit("slideResetTransitionEnd");
                            i.emit("slideChangeTransitionEnd"), "next" === s ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
                        }
                    }
                }
            },
            slide: {
                slideTo: function(e, t, i, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                    var r = this,
                        a = e;
                    a < 0 && (a = 0);
                    var s = r.params,
                        o = r.snapGrid,
                        l = r.slidesGrid,
                        c = r.previousIndex,
                        u = r.activeIndex,
                        d = r.rtlTranslate,
                        h = r.wrapperEl;
                    if (r.animating && s.preventInteractionOnTransition) return !1;
                    var p = Math.min(r.params.slidesPerGroupSkip, a),
                        f = p + Math.floor((a - p) / r.params.slidesPerGroup);
                    f >= o.length && (f = o.length - 1), (u || s.initialSlide || 0) === (c || 0) && i && r.emit("beforeSlideChangeStart");
                    var m, g = -o[f];
                    if (r.updateProgress(g), s.normalizeSlideIndex)
                        for (var v = 0; v < l.length; v += 1) - Math.floor(100 * g) >= Math.floor(100 * l[v]) && (a = v);
                    if (r.initialized && a !== u) {
                        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (u || 0) !== a) return !1
                    }
                    if (m = u < a ? "next" : a < u ? "prev" : "reset", d && -g === r.translate || !d && g === r.translate) return r.updateActiveIndex(a), s.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== s.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)), !1;
                    if (s.cssMode) {
                        var y, w = r.isHorizontal(),
                            b = -g;
                        return d && (b = h.scrollWidth - h.offsetWidth - b), 0 !== t && h.scrollTo ? h.scrollTo(((y = {})[w ? "left" : "top"] = b, y.behavior = "smooth", y)) : h[w ? "scrollLeft" : "scrollTop"] = b, !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, m), r.transitionEnd(i, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, n), r.transitionStart(i, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, m))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
                },
                slideToLoop: function(e, t, i, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
                    var r = e;
                    return this.params.loop && (r += this.loopedSlides), this.slideTo(r, t, i, n)
                },
                slideNext: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this,
                        r = n.params,
                        a = n.animating,
                        s = n.activeIndex < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup;
                    if (r.loop) {
                        if (a && r.loopPreventsSlide) return !1;
                        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
                    }
                    return n.slideTo(n.activeIndex + s, e, t, i)
                },
                slidePrev: function(e, t, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var n = this,
                        r = n.params,
                        a = n.animating,
                        s = n.snapGrid,
                        o = n.slidesGrid,
                        l = n.rtlTranslate;
                    if (r.loop) {
                        if (a && r.loopPreventsSlide) return !1;
                        n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
                    }

                    function c(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    var u, d = c(l ? n.translate : -n.translate),
                        h = s.map(c),
                        p = (s[h.indexOf(d)], s[h.indexOf(d) - 1]);
                    return void 0 === p && r.cssMode && s.forEach(function(e) {
                        !p && e <= d && (p = e)
                    }), void 0 !== p && (u = o.indexOf(p)) < 0 && (u = n.activeIndex - 1), n.slideTo(u, e, t, i)
                },
                slideReset: function(e, t, i) {
                    return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
                },
                slideToClosest: function(e, t, i, n) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === n && (n = .5);
                    var r, a, s = this,
                        o = s.activeIndex,
                        l = Math.min(s.params.slidesPerGroupSkip, o),
                        c = l + Math.floor((o - l) / s.params.slidesPerGroup),
                        u = s.rtlTranslate ? s.translate : -s.translate;
                    return u >= s.snapGrid[c] ? (r = s.snapGrid[c], (s.snapGrid[c + 1] - r) * n < u - r && (o += s.params.slidesPerGroup)) : u - (a = s.snapGrid[c - 1]) <= (s.snapGrid[c] - a) * n && (o -= s.params.slidesPerGroup), o = Math.max(o, 0), o = Math.min(o, s.slidesGrid.length - 1), s.slideTo(o, e, t, i)
                },
                slideToClickedSlide: function() {
                    var e, t = this,
                        i = t.params,
                        n = t.$wrapperEl,
                        r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                        a = t.clickedIndex;
                    if (i.loop) {
                        if (t.animating) return;
                        e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? a < t.loopedSlides - r / 2 || a > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), a = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), D(function() {
                            t.slideTo(a)
                        })) : t.slideTo(a) : a > t.slides.length - r ? (t.loopFix(), a = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), D(function() {
                            t.slideTo(a)
                        })) : t.slideTo(a)
                    } else t.slideTo(a)
                }
            },
            loop: {
                loopCreate: function() {
                    var n = this,
                        e = T(),
                        t = n.params,
                        i = n.$wrapperEl;
                    i.children("." + t.slideClass + "." + t.slideDuplicateClass).remove();
                    var r = i.children("." + t.slideClass);
                    if (t.loopFillGroupWithBlank) {
                        var a = t.slidesPerGroup - r.length % t.slidesPerGroup;
                        if (a !== t.slidesPerGroup) {
                            for (var s = 0; s < a; s += 1) {
                                var o = L(e.createElement("div")).addClass(t.slideClass + " " + t.slideBlankClass);
                                i.append(o)
                            }
                            r = i.children("." + t.slideClass)
                        }
                    }
                    "auto" !== t.slidesPerView || t.loopedSlides || (t.loopedSlides = r.length), n.loopedSlides = Math.ceil(parseFloat(t.loopedSlides || t.slidesPerView, 10)), n.loopedSlides += t.loopAdditionalSlides, n.loopedSlides > r.length && (n.loopedSlides = r.length);
                    var l = [],
                        c = [];
                    r.each(function(e, t) {
                        var i = L(e);
                        t < n.loopedSlides && c.push(e), t < r.length && t >= r.length - n.loopedSlides && l.push(e), i.attr("data-swiper-slide-index", t)
                    });
                    for (var u = 0; u < c.length; u += 1) i.append(L(c[u].cloneNode(!0)).addClass(t.slideDuplicateClass));
                    for (var d = l.length - 1; 0 <= d; --d) i.prepend(L(l[d].cloneNode(!0)).addClass(t.slideDuplicateClass))
                },
                loopFix: function() {
                    var e = this;
                    e.emit("beforeLoopFix");
                    var t = e.activeIndex,
                        i = e.slides,
                        n = e.loopedSlides,
                        r = e.allowSlidePrev,
                        a = e.allowSlideNext,
                        s = e.snapGrid,
                        o = e.rtlTranslate;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    var l, c = -s[t] - e.getTranslate();
                    t < n ? (l = i.length - 3 * n + t, l += n, e.slideTo(l, 0, !1, !0) && 0 != c && e.setTranslate((o ? -e.translate : e.translate) - c)) : t >= i.length - n && (l = -i.length + t + n, l += n, e.slideTo(l, 0, !1, !0) && 0 != c && e.setTranslate((o ? -e.translate : e.translate) - c)), e.allowSlidePrev = r, e.allowSlideNext = a, e.emit("loopFix")
                },
                loopDestroy: function() {
                    var e = this.$wrapperEl,
                        t = this.params,
                        i = this.slides;
                    e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function(e) {
                    var t, i = this;
                    i.support.touch || !i.params.simulateTouch || i.params.watchOverflow && i.isLocked || i.params.cssMode || ((t = i.el).style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab")
                },
                unsetGrabCursor: function() {
                    var e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
                }
            },
            manipulation: {
                appendSlide: function(e) {
                    var t = this,
                        i = t.$wrapperEl,
                        n = t.params;
                    if (n.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                        for (var r = 0; r < e.length; r += 1) e[r] && i.append(e[r]);
                    else i.append(e);
                    n.loop && t.loopCreate(), n.observer && t.support.observer || t.update()
                },
                prependSlide: function(e) {
                    var t = this,
                        i = t.params,
                        n = t.$wrapperEl,
                        r = t.activeIndex;
                    i.loop && t.loopDestroy();
                    var a = r + 1;
                    if ("object" == typeof e && "length" in e) {
                        for (var s = 0; s < e.length; s += 1) e[s] && n.prepend(e[s]);
                        a = r + e.length
                    } else n.prepend(e);
                    i.loop && t.loopCreate(), i.observer && t.support.observer || t.update(), t.slideTo(a, 0, !1)
                },
                addSlide: function(e, t) {
                    var i = this,
                        n = i.$wrapperEl,
                        r = i.params,
                        a = i.activeIndex;
                    r.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = n.children("." + r.slideClass));
                    var s = i.slides.length;
                    if (e <= 0) i.prependSlide(t);
                    else if (s <= e) i.appendSlide(t);
                    else {
                        for (var o = e < a ? a + 1 : a, l = [], c = s - 1; e <= c; --c) {
                            var u = i.slides.eq(c);
                            u.remove(), l.unshift(u)
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var d = 0; d < t.length; d += 1) t[d] && n.append(t[d]);
                            o = e < a ? a + t.length : a
                        } else n.append(t);
                        for (var h = 0; h < l.length; h += 1) n.append(l[h]);
                        r.loop && i.loopCreate(), r.observer && i.support.observer || i.update(), r.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1)
                    }
                },
                removeSlide: function(e) {
                    var t = this,
                        i = t.params,
                        n = t.$wrapperEl,
                        r = t.activeIndex;
                    i.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = n.children("." + i.slideClass));
                    var a, s = r;
                    if ("object" == typeof e && "length" in e) {
                        for (var o = 0; o < e.length; o += 1) a = e[o], t.slides[a] && t.slides.eq(a).remove(), a < s && --s;
                        s = Math.max(s, 0)
                    } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < s && --s, s = Math.max(s, 0);
                    i.loop && t.loopCreate(), i.observer && t.support.observer || t.update(), i.loop ? t.slideTo(s + t.loopedSlides, 0, !1) : t.slideTo(s, 0, !1)
                },
                removeAllSlides: function() {
                    for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                    this.removeSlide(e)
                }
            },
            events: {
                attachEvents: function() {
                    var e = this,
                        t = T(),
                        i = e.params,
                        n = e.touchEvents,
                        r = e.el,
                        a = e.wrapperEl,
                        s = e.device,
                        o = e.support;
                    e.onTouchStart = function(e) {
                        var t, i, n, r, a, s, o, l, c = this,
                            u = T(),
                            d = se(),
                            h = c.touchEventsData,
                            p = c.params,
                            f = c.touches;
                        c.animating && p.preventInteractionOnTransition || ((t = e).originalEvent && (t = t.originalEvent), i = L(t.target), "wrapper" === p.touchEventsTarget && !i.closest(c.wrapperEl).length || (h.isTouchEvent = "touchstart" === t.type, !h.isTouchEvent && "which" in t && 3 === t.which || !h.isTouchEvent && "button" in t && 0 < t.button || h.isTouched && h.isMoved || (p.noSwiping && i.closest(p.noSwipingSelector ? p.noSwipingSelector : "." + p.noSwipingClass)[0] ? c.allowClick = !0 : p.swipeHandler && !i.closest(p.swipeHandler)[0] || (f.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, f.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY, n = f.currentX, r = f.currentY, a = p.edgeSwipeDetection || p.iOSEdgeSwipeDetection, s = p.edgeSwipeThreshold || p.iOSEdgeSwipeThreshold, a && (n <= s || n >= d.screen.width - s) || (oe(h, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }), f.startX = n, f.startY = r, h.touchStartTime = I(), c.allowClick = !0, c.updateSize(), c.swipeDirection = void 0, 0 < p.threshold && (h.allowThresholdMove = !1), "touchstart" !== t.type && (o = !0, i.is(h.formElements) && (o = !1), u.activeElement && L(u.activeElement).is(h.formElements) && u.activeElement !== i[0] && u.activeElement.blur(), l = o && c.allowTouchMove && p.touchStartPreventDefault, (p.touchStartForcePreventDefault || l) && t.preventDefault()), c.emit("touchStart", t))))))
                    }.bind(e), e.onTouchMove = function(e) {
                        var t = T(),
                            i = this,
                            n = i.touchEventsData,
                            r = i.params,
                            a = i.touches,
                            s = i.rtlTranslate,
                            o = e;
                        if (o.originalEvent && (o = o.originalEvent), n.isTouched) {
                            if (!n.isTouchEvent || "touchmove" === o.type) {
                                var l = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
                                    c = "touchmove" === o.type ? l.pageX : o.pageX,
                                    u = "touchmove" === o.type ? l.pageY : o.pageY;
                                if (o.preventedByNestedSwiper) return a.startX = c, void(a.startY = u);
                                if (!i.allowTouchMove) return i.allowClick = !1, void(n.isTouched && (oe(a, {
                                    startX: c,
                                    startY: u,
                                    currentX: c,
                                    currentY: u
                                }), n.touchStartTime = I()));
                                if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
                                    if (i.isVertical()) {
                                        if (u < a.startY && i.translate <= i.maxTranslate() || u > a.startY && i.translate >= i.minTranslate()) return n.isTouched = !1, void(n.isMoved = !1)
                                    } else if (c < a.startX && i.translate <= i.maxTranslate() || c > a.startX && i.translate >= i.minTranslate()) return;
                                if (n.isTouchEvent && t.activeElement && o.target === t.activeElement && L(o.target).is(n.formElements)) return n.isMoved = !0, void(i.allowClick = !1);
                                if (n.allowTouchCallbacks && i.emit("touchMove", o), !(o.targetTouches && 1 < o.targetTouches.length)) {
                                    a.currentX = c, a.currentY = u;
                                    var d, h = a.currentX - a.startX,
                                        p = a.currentY - a.startY;
                                    if (!(i.params.threshold && Math.sqrt(Math.pow(h, 2) + Math.pow(p, 2)) < i.params.threshold))
                                        if (void 0 === n.isScrolling && (i.isHorizontal() && a.currentY === a.startY || i.isVertical() && a.currentX === a.startX ? n.isScrolling = !1 : 25 <= h * h + p * p && (d = 180 * Math.atan2(Math.abs(p), Math.abs(h)) / Math.PI, n.isScrolling = i.isHorizontal() ? d > r.touchAngle : 90 - d > r.touchAngle)), n.isScrolling && i.emit("touchMoveOpposite", o), void 0 === n.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (n.startMoving = !0)), n.isScrolling) n.isTouched = !1;
                                        else if (n.startMoving) {
                                        i.allowClick = !1, !r.cssMode && o.cancelable && o.preventDefault(), r.touchMoveStopPropagation && !r.nested && o.stopPropagation(), n.isMoved || (r.loop && i.loopFix(), n.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), n.allowMomentumBounce = !1, !r.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), i.emit("sliderFirstMove", o)), i.emit("sliderMove", o), n.isMoved = !0;
                                        var f = i.isHorizontal() ? h : p;
                                        a.diff = f, f *= r.touchRatio, s && (f = -f), i.swipeDirection = 0 < f ? "prev" : "next", n.currentTranslate = f + n.startTranslate;
                                        var m = !0,
                                            g = r.resistanceRatio;
                                        if (r.touchReleaseOnEdges && (g = 0), 0 < f && n.currentTranslate > i.minTranslate() ? (m = !1, r.resistance && (n.currentTranslate = i.minTranslate() - 1 + Math.pow(-i.minTranslate() + n.startTranslate + f, g))) : f < 0 && n.currentTranslate < i.maxTranslate() && (m = !1, r.resistance && (n.currentTranslate = i.maxTranslate() + 1 - Math.pow(i.maxTranslate() - n.startTranslate - f, g))), m && (o.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), 0 < r.threshold) {
                                            if (!(Math.abs(f) > r.threshold || n.allowThresholdMove)) return void(n.currentTranslate = n.startTranslate);
                                            if (!n.allowThresholdMove) return n.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, n.currentTranslate = n.startTranslate, void(a.diff = i.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                                        }
                                        r.followFinger && !r.cssMode && ((r.freeMode || r.watchSlidesProgress || r.watchSlidesVisibility) && (i.updateActiveIndex(), i.updateSlidesClasses()), r.freeMode && (0 === n.velocities.length && n.velocities.push({
                                            position: a[i.isHorizontal() ? "startX" : "startY"],
                                            time: n.touchStartTime
                                        }), n.velocities.push({
                                            position: a[i.isHorizontal() ? "currentX" : "currentY"],
                                            time: I()
                                        })), i.updateProgress(n.currentTranslate), i.setTranslate(n.currentTranslate))
                                    }
                                }
                            }
                        } else n.startMoving && n.isScrolling && i.emit("touchMoveOpposite", o)
                    }.bind(e), e.onTouchEnd = function(e) {
                        var t = this,
                            i = t.touchEventsData,
                            n = t.params,
                            r = t.touches,
                            a = t.rtlTranslate,
                            s = t.$wrapperEl,
                            o = t.slidesGrid,
                            l = t.snapGrid,
                            c = e;
                        if (c.originalEvent && (c = c.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", c), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                        n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var u, d, h, p, f, m = I(),
                            g = m - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(c), t.emit("tap click", c), g < 300 && m - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", c)), i.lastClickTime = I(), D(function() {
                                t.destroyed || (t.allowClick = !0)
                            }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === r.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, u = n.followFinger ? a ? t.translate : -t.translate : -i.currentTranslate, !n.cssMode)
                            if (n.freeMode) {
                                if (u < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                                if (u > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                                if (n.freeModeMomentum) {
                                    1 < i.velocities.length ? (d = i.velocities.pop(), h = i.velocities.pop(), p = d.position - h.position, f = d.time - h.time, t.velocity = p / f, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), (150 < f || 300 < I() - d.time) && (t.velocity = 0)) : t.velocity = 0, t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                    var v = 1e3 * n.freeModeMomentumRatio,
                                        y = t.velocity * v,
                                        w = t.translate + y;
                                    a && (w = -w);
                                    var b, T, _, x, E = !1,
                                        S = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                                    if (w < t.maxTranslate()) n.freeModeMomentumBounce ? (w + t.maxTranslate() < -S && (w = t.maxTranslate() - S), b = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), n.loop && n.centeredSlides && (T = !0);
                                    else if (w > t.minTranslate()) n.freeModeMomentumBounce ? (w - t.minTranslate() > S && (w = t.minTranslate() + S), b = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), n.loop && n.centeredSlides && (T = !0);
                                    else if (n.freeModeSticky) {
                                        for (var C, k = 0; k < l.length; k += 1)
                                            if (l[k] > -w) {
                                                C = k;
                                                break
                                            }
                                        w = -(w = Math.abs(l[C] - w) < Math.abs(l[C - 1] - w) || "next" === t.swipeDirection ? l[C] : l[C - 1])
                                    }
                                    if (T && t.once("transitionEnd", function() {
                                            t.loopFix()
                                        }), 0 !== t.velocity) v = a ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), n.freeModeSticky && (v = (_ = Math.abs((a ? -w : w) - t.translate)) < (x = t.slidesSizesGrid[t.activeIndex]) ? n.speed : _ < 2 * x ? 1.5 * n.speed : 2.5 * n.speed);
                                    else if (n.freeModeSticky) return void t.slideToClosest();
                                    n.freeModeMomentumBounce && E ? (t.updateProgress(b), t.setTransition(v), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, s.transitionEnd(function() {
                                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), setTimeout(function() {
                                            t.setTranslate(b), s.transitionEnd(function() {
                                                t && !t.destroyed && t.transitionEnd()
                                            })
                                        }, 0))
                                    })) : t.velocity ? (t.updateProgress(w), t.setTransition(v), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, s.transitionEnd(function() {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                                } else if (n.freeModeSticky) return void t.slideToClosest();
                                (!n.freeModeMomentum || g >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                            } else {
                                for (var M = 0, z = t.slidesSizesGrid[0], O = 0; O < o.length; O += O < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
                                    var P = O < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                    void 0 !== o[O + P] ? u >= o[O] && u < o[O + P] && (z = o[(M = O) + P] - o[O]) : u >= o[O] && (M = O, z = o[o.length - 1] - o[o.length - 2])
                                }
                                var L = (u - o[M]) / z,
                                    A = M < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
                                if (g > n.longSwipesMs) {
                                    if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                                    "next" === t.swipeDirection && (L >= n.longSwipesRatio ? t.slideTo(M + A) : t.slideTo(M)), "prev" === t.swipeDirection && (L > 1 - n.longSwipesRatio ? t.slideTo(M + A) : t.slideTo(M))
                                } else {
                                    if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                                    t.navigation && (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl) ? c.target === t.navigation.nextEl ? t.slideTo(M + A) : t.slideTo(M) : ("next" === t.swipeDirection && t.slideTo(M + A), "prev" === t.swipeDirection && t.slideTo(M))
                                }
                            }
                    }.bind(e), i.cssMode && (e.onScroll = function() {
                        var e = this,
                            t = e.wrapperEl,
                            i = e.rtlTranslate;
                        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = i ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
                        var n = e.maxTranslate() - e.minTranslate();
                        (0 == n ? 0 : (e.translate - e.minTranslate()) / n) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
                    }.bind(e)), e.onClick = function(e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }.bind(e);
                    var l, c = !!i.nested;
                    !o.touch && o.pointerEvents ? (r.addEventListener(n.start, e.onTouchStart, !1), t.addEventListener(n.move, e.onTouchMove, c), t.addEventListener(n.end, e.onTouchEnd, !1)) : (o.touch && (l = !("touchstart" !== n.start || !o.passiveListener || !i.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, r.addEventListener(n.start, e.onTouchStart, l), r.addEventListener(n.move, e.onTouchMove, o.passiveListener ? {
                        passive: !1,
                        capture: c
                    } : c), r.addEventListener(n.end, e.onTouchEnd, l), n.cancel && r.addEventListener(n.cancel, e.onTouchEnd, l), M || (t.addEventListener("touchstart", z), M = !0)), (i.simulateTouch && !s.ios && !s.android || i.simulateTouch && !o.touch && s.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), t.addEventListener("mousemove", e.onTouchMove, c), t.addEventListener("mouseup", e.onTouchEnd, !1))), (i.preventClicks || i.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), i.cssMode && a.addEventListener("scroll", e.onScroll), i.updateOnWindowResize ? e.on(s.ios || s.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", k, !0) : e.on("observerUpdate", k, !0)
                },
                detachEvents: function() {
                    var e, t = this,
                        i = T(),
                        n = t.params,
                        r = t.touchEvents,
                        a = t.el,
                        s = t.wrapperEl,
                        o = t.device,
                        l = t.support,
                        c = !!n.nested;
                    !l.touch && l.pointerEvents ? (a.removeEventListener(r.start, t.onTouchStart, !1), i.removeEventListener(r.move, t.onTouchMove, c), i.removeEventListener(r.end, t.onTouchEnd, !1)) : (l.touch && (e = !("onTouchStart" !== r.start || !l.passiveListener || !n.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }, a.removeEventListener(r.start, t.onTouchStart, e), a.removeEventListener(r.move, t.onTouchMove, c), a.removeEventListener(r.end, t.onTouchEnd, e), r.cancel && a.removeEventListener(r.cancel, t.onTouchEnd, e)), (n.simulateTouch && !o.ios && !o.android || n.simulateTouch && !l.touch && o.ios) && (a.removeEventListener("mousedown", t.onTouchStart, !1), i.removeEventListener("mousemove", t.onTouchMove, c), i.removeEventListener("mouseup", t.onTouchEnd, !1))), (n.preventClicks || n.preventClicksPropagation) && a.removeEventListener("click", t.onClick, !0), n.cssMode && s.removeEventListener("scroll", t.onScroll), t.off(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", k)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e, i, t, n, r, a, s, o = this,
                        l = o.activeIndex,
                        c = o.initialized,
                        u = o.loopedSlides,
                        d = void 0 === u ? 0 : u,
                        h = o.params,
                        p = o.$el,
                        f = h.breakpoints;
                    !f || f && 0 === Object.keys(f).length || (e = o.getBreakpoint(f)) && o.currentBreakpoint !== e && ((i = e in f ? f[e] : void 0) && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach(function(e) {
                        var t = i[e];
                        void 0 !== t && (i[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                    }), t = i || o.originalParams, n = 1 < h.slidesPerColumn, r = 1 < t.slidesPerColumn, n && !r ? (p.removeClass(h.containerModifierClass + "multirow " + h.containerModifierClass + "multirow-column"), o.emitContainerClasses()) : !n && r && (p.addClass(h.containerModifierClass + "multirow"), "column" === t.slidesPerColumnFill && p.addClass(h.containerModifierClass + "multirow-column"), o.emitContainerClasses()), a = t.direction && t.direction !== h.direction, s = h.loop && (t.slidesPerView !== h.slidesPerView || a), a && c && o.changeDirection(), oe(o.params, t), oe(o, {
                        allowTouchMove: o.params.allowTouchMove,
                        allowSlideNext: o.params.allowSlideNext,
                        allowSlidePrev: o.params.allowSlidePrev
                    }), o.currentBreakpoint = e, o.emit("_beforeBreakpoint", t), s && c && (o.loopDestroy(), o.loopCreate(), o.updateSlides(), o.slideTo(l - d + o.loopedSlides, 0, !1)), o.emit("breakpoint", t))
                },
                getBreakpoint: function(e) {
                    var i = se();
                    if (e) {
                        var t = !1,
                            n = Object.keys(e).map(function(e) {
                                if ("string" != typeof e || 0 !== e.indexOf("@")) return {
                                    value: e,
                                    point: e
                                };
                                var t = parseFloat(e.substr(1));
                                return {
                                    value: i.innerHeight * t,
                                    point: e
                                }
                            });
                        n.sort(function(e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        });
                        for (var r = 0; r < n.length; r += 1) {
                            var a = n[r],
                                s = a.point;
                            a.value <= i.innerWidth && (t = s)
                        }
                        return t || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this,
                        t = e.params,
                        i = e.isLocked,
                        n = 0 < e.slides.length && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                    t.slidesOffsetBefore && t.slidesOffsetAfter && n ? e.isLocked = n <= e.size : e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), i && i !== e.isLocked && (e.isEnd = !1, e.navigation && e.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e = this,
                        t = e.classNames,
                        i = e.params,
                        n = e.rtl,
                        r = e.$el,
                        a = e.device,
                        s = [];
                    s.push("initialized"), s.push(i.direction), i.freeMode && s.push("free-mode"), i.autoHeight && s.push("autoheight"), n && s.push("rtl"), 1 < i.slidesPerColumn && (s.push("multirow"), "column" === i.slidesPerColumnFill && s.push("multirow-column")), a.android && s.push("android"), a.ios && s.push("ios"), i.cssMode && s.push("css-mode"), s.forEach(function(e) {
                        t.push(i.containerModifierClass + e)
                    }), r.addClass(t.join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            },
            images: {
                loadImage: function(e, t, i, n, r, a) {
                    var s, o = se();

                    function l() {
                        a && a()
                    }!(L(e).parent("picture")[0] || e.complete && r) && t ? ((s = new o.Image).onload = l, s.onerror = l, n && (s.sizes = n), i && (s.srcset = i), t && (s.src = t)) : l()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var n = e.imagesToLoad[i];
                        e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        A = {},
        B = function() {
            function h() {
                for (var r, e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                r = oe({}, r = (r = 1 === t.length && t[0].constructor && t[0].constructor === Object ? t[0] : (s = t[0], t[1])) || {}), s && !r.el && (r.el = s);
                var a = this;
                a.support = b(), a.device = _({
                    userAgent: r.userAgent
                }), a.browser = x(), a.eventsListeners = {}, a.eventsAnyListeners = [], void 0 === a.modules && (a.modules = {}), Object.keys(a.modules).forEach(function(e) {
                    var t = a.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            n = t.params[i];
                        if ("object" != typeof n || null === n) return;
                        if (!(i in r && "enabled" in n)) return;
                        !0 === r[i] && (r[i] = {
                            enabled: !0
                        }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = {
                            enabled: !1
                        })
                    }
                });
                var n = oe({}, O);
                a.useParams(n), a.params = oe({}, n, A, r), a.originalParams = oe({}, a.params), a.passedParams = oe({}, r), a.params && a.params.on && Object.keys(a.params.on).forEach(function(e) {
                    a.on(e, a.params.on[e])
                }), a.params && a.params.onAny && a.onAny(a.params.onAny);
                var s, o, l, c, u = (a.$ = L)(a.params.el);
                if (s = u[0]) {
                    if (1 < u.length) {
                        var d = [];
                        return u.each(function(e) {
                            var t = oe({}, r, {
                                el: e
                            });
                            d.push(new h(t))
                        }), d
                    }
                    return s.swiper = a, s && s.shadowRoot && s.shadowRoot.querySelector ? (o = L(s.shadowRoot.querySelector("." + a.params.wrapperClass))).children = function(e) {
                        return u.children(e)
                    } : o = u.children("." + a.params.wrapperClass), oe(a, {
                        $el: u,
                        el: s,
                        $wrapperEl: o,
                        wrapperEl: o[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === a.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === a.params.direction
                        },
                        rtl: "rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction"),
                        rtlTranslate: "horizontal" === a.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === u.css("direction")),
                        wrongRTL: "-webkit-box" === o.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: a.params.allowSlideNext,
                        allowSlidePrev: a.params.allowSlidePrev,
                        touchEvents: (l = ["touchstart", "touchmove", "touchend", "touchcancel"], c = ["mousedown", "mousemove", "mouseup"], a.support.pointerEvents && (c = ["pointerdown", "pointermove", "pointerup"]), a.touchEventsTouch = {
                            start: l[0],
                            move: l[1],
                            end: l[2],
                            cancel: l[3]
                        }, a.touchEventsDesktop = {
                            start: c[0],
                            move: c[1],
                            end: c[2]
                        }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: I(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: a.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), a.useModules(), a.emit("_swiper"), a.params.init && a.init(), a
                }
            }
            var e, t, i, n = h.prototype;
            return n.emitContainerClasses = function() {
                var e, t = this;
                t.params._emitClasses && t.el && (e = t.el.className.split(" ").filter(function(e) {
                    return 0 === e.indexOf("swiper-container") || 0 === e.indexOf(t.params.containerModifierClass)
                }), t.emit("_containerClasses", e.join(" ")))
            }, n.emitSlidesClasses = function() {
                var i = this;
                i.params._emitClasses && i.el && i.slides.each(function(e) {
                    var t = e.className.split(" ").filter(function(e) {
                        return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(i.params.slideClass)
                    });
                    i.emit("_slideClass", e, t.join(" "))
                })
            }, n.slidesPerViewDynamic = function() {
                var e = this,
                    t = e.params,
                    i = e.slides,
                    n = e.slidesGrid,
                    r = e.size,
                    a = e.activeIndex,
                    s = 1;
                if (t.centeredSlides) {
                    for (var o, l = i[a].swiperSlideSize, c = a + 1; c < i.length; c += 1) i[c] && !o && (s += 1, r < (l += i[c].swiperSlideSize) && (o = !0));
                    for (var u = a - 1; 0 <= u; --u) i[u] && !o && (s += 1, r < (l += i[u].swiperSlideSize) && (o = !0))
                } else
                    for (var d = a + 1; d < i.length; d += 1) n[d] - n[a] < r && (s += 1);
                return s
            }, n.update = function() {
                var e, t, i = this;

                function n() {
                    var e = i.rtlTranslate ? -1 * i.translate : i.translate,
                        t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                    i.setTranslate(t), i.updateActiveIndex(), i.updateSlidesClasses()
                }
                i && !i.destroyed && (e = i.snapGrid, (t = i.params).breakpoints && i.setBreakpoint(), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.params.freeMode ? (n(), i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || n(), t.watchOverflow && e !== i.snapGrid && i.checkOverflow(), i.emit("update"))
            }, n.changeDirection = function(t, e) {
                void 0 === e && (e = !0);
                var i = this,
                    n = i.params.direction;
                return (t = t || ("horizontal" === n ? "vertical" : "horizontal")) === n || "horizontal" !== t && "vertical" !== t || (i.$el.removeClass("" + i.params.containerModifierClass + n).addClass("" + i.params.containerModifierClass + t), i.emitContainerClasses(), i.params.direction = t, i.slides.each(function(e) {
                    "vertical" === t ? e.style.width = "" : e.style.height = ""
                }), i.emit("changeDirection"), e && i.update()), i
            }, n.init = function() {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, n.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i, n = this,
                    r = n.params,
                    a = n.$el,
                    s = n.$wrapperEl,
                    o = n.slides;
                return void 0 === n.params || n.destroyed || (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), r.loop && n.loopDestroy(), t && (n.removeClasses(), a.removeAttr("style"), s.removeAttr("style"), o && o.length && o.removeClass([r.slideVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), n.emit("destroy"), Object.keys(n.eventsListeners).forEach(function(e) {
                    n.off(e)
                }), !1 !== e && (n.$el[0].swiper = null, i = n, Object.keys(i).forEach(function(e) {
                    try {
                        i[e] = null
                    } catch (e) {}
                    try {
                        delete i[e]
                    } catch (e) {}
                })), n.destroyed = !0), null
            }, h.extendDefaults = function(e) {
                oe(A, e)
            }, h.installModule = function(e) {
                h.prototype.modules || (h.prototype.modules = {});
                var t = e.name || Object.keys(h.prototype.modules).length + "_" + I();
                h.prototype.modules[t] = e
            }, h.use = function(e) {
                return Array.isArray(e) ? e.forEach(function(e) {
                    return h.installModule(e)
                }) : h.installModule(e), h
            }, e = h, i = [{
                key: "extendedDefaults",
                get: function() {
                    return A
                }
            }, {
                key: "defaults",
                get: function() {
                    return O
                }
            }], (t = null) && r(e.prototype, t), i && r(e, i), h
        }();
    Object.keys(P).forEach(function(t) {
        Object.keys(P[t]).forEach(function(e) {
            B.prototype[e] = P[t][e]
        })
    }), B.use([E, C]);
    var N = {
            update: function(e) {
                var t = this,
                    i = t.params,
                    n = i.slidesPerView,
                    r = i.slidesPerGroup,
                    a = i.centeredSlides,
                    s = t.params.virtual,
                    o = s.addSlidesBefore,
                    l = s.addSlidesAfter,
                    c = t.virtual,
                    u = c.from,
                    d = c.to,
                    h = c.slides,
                    p = c.slidesGrid,
                    f = c.renderSlide,
                    m = c.offset;
                t.updateActiveIndex();
                var g, v = t.activeIndex || 0,
                    y = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
                    w = a ? (g = Math.floor(n / 2) + r + l, Math.floor(n / 2) + r + o) : (g = n + (r - 1) + l, r + o),
                    b = Math.max((v || 0) - w, 0),
                    T = Math.min((v || 0) + g, h.length - 1),
                    _ = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

                function x() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (oe(t.virtual, {
                        from: b,
                        to: T,
                        offset: _,
                        slidesGrid: t.slidesGrid
                    }), u === b && d === T && !e) return t.slidesGrid !== p && _ !== m && t.slides.css(y, _ + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: _,
                    from: b,
                    to: T,
                    slides: function() {
                        for (var e = [], t = b; t <= T; t += 1) e.push(h[t]);
                        return e
                    }()
                }), void(t.params.virtual.renderExternalUpdate && x());
                var E = [],
                    S = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var C = u; C <= d; C += 1)(C < b || T < C) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + C + '"]').remove();
                for (var k = 0; k < h.length; k += 1) b <= k && k <= T && (void 0 === d || e ? S.push(k) : (d < k && S.push(k), k < u && E.push(k)));
                S.forEach(function(e) {
                    t.$wrapperEl.append(f(h[e], e))
                }), E.sort(function(e, t) {
                    return t - e
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(f(h[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(y, _ + "px"), x()
            },
            renderSlide: function(e, t) {
                var i = this,
                    n = i.params.virtual;
                if (n.cache && i.virtual.cache[t]) return i.virtual.cache[t];
                var r = n.renderSlide ? L(n.renderSlide.call(i, e, t)) : L('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return r.attr("data-swiper-slide-index") || r.attr("data-swiper-slide-index", t), n.cache && (i.virtual.cache[t] = r), r
            },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var n, r, t = this,
                    i = t.activeIndex,
                    a = i + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var o = 0; o < e.length; o += 1) e[o] && t.virtual.slides.unshift(e[o]);
                    a = i + e.length, s = e.length
                } else t.virtual.slides.unshift(e);
                t.params.virtual.cache && (n = t.virtual.cache, r = {}, Object.keys(n).forEach(function(e) {
                    var t = n[e],
                        i = t.attr("data-swiper-slide-index");
                    i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), r[parseInt(e, 10) + s] = t
                }), t.virtual.cache = r), t.virtual.update(!0), t.slideTo(a, 0)
            },
            removeSlide: function(e) {
                var t = this;
                if (null != e) {
                    var i = t.activeIndex;
                    if (Array.isArray(e))
                        for (var n = e.length - 1; 0 <= n; --n) t.virtual.slides.splice(e[n], 1), t.params.virtual.cache && delete t.virtual.cache[e[n]], e[n] < i && --i, i = Math.max(i, 0);
                    else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < i && --i, i = Math.max(i, 0);
                    t.virtual.update(!0), t.slideTo(i, 0)
                }
            },
            removeAllSlides: function() {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        },
        R = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                w(this, {
                    virtual: e(e({}, N), {}, {
                        slides: this.params.virtual.slides,
                        cache: {}
                    })
                })
            },
            on: {
                beforeInit: function(e) {
                    var t;
                    e.params.virtual.enabled && (e.classNames.push(e.params.containerModifierClass + "virtual"), t = {
                        watchSlidesProgress: !0
                    }, oe(e.params, t), oe(e.originalParams, t), e.params.initialSlide || e.virtual.update())
                },
                setTranslate: function(e) {
                    e.params.virtual.enabled && e.virtual.update()
                }
            }
        },
        F = {
            handle: function(e) {
                var t = this,
                    i = se(),
                    n = T(),
                    r = t.rtlTranslate,
                    a = e;
                a.originalEvent && (a = a.originalEvent);
                var s = a.keyCode || a.charCode,
                    o = t.params.keyboard.pageUpDown,
                    l = o && 33 === s,
                    c = o && 34 === s,
                    u = 37 === s,
                    d = 39 === s,
                    h = 38 === s,
                    p = 40 === s;
                if (!t.allowSlideNext && (t.isHorizontal() && d || t.isVertical() && p || c)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && u || t.isVertical() && h || l)) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || n.activeElement && n.activeElement.nodeName && ("input" === n.activeElement.nodeName.toLowerCase() || "textarea" === n.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (l || c || u || d || h || p)) {
                        var f = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var m = i.innerWidth,
                            g = i.innerHeight,
                            v = t.$el.offset();
                        r && (v.left -= t.$el[0].scrollLeft);
                        for (var y = [
                                [v.left, v.top],
                                [v.left + t.width, v.top],
                                [v.left, v.top + t.height],
                                [v.left + t.width, v.top + t.height]
                            ], w = 0; w < y.length; w += 1) {
                            var b = y[w];
                            0 <= b[0] && b[0] <= m && 0 <= b[1] && b[1] <= g && (f = !0)
                        }
                        if (!f) return
                    }
                    t.isHorizontal() ? ((l || c || u || d) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((c || d) && !r || (l || u) && r) && t.slideNext(), ((l || u) && !r || (c || d) && r) && t.slidePrev()) : ((l || c || h || p) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (c || p) && t.slideNext(), (l || h) && t.slidePrev()), t.emit("keyPress", s)
                }
            },
            enable: function() {
                var e = T();
                this.keyboard.enabled || (L(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                var e = T();
                this.keyboard.enabled && (L(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        $ = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0,
                    pageUpDown: !0
                }
            },
            create: function() {
                w(this, {
                    keyboard: e({
                        enabled: !1
                    }, F)
                })
            },
            on: {
                init: function(e) {
                    e.params.keyboard.enabled && e.keyboard.enable()
                },
                destroy: function(e) {
                    e.keyboard.enabled && e.keyboard.disable()
                }
            }
        };
    var j = {
            lastScrollTime: I(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function() {
                var e, t, i, n;
                return -1 < se().navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : (t = T(), (n = (i = "onwheel") in t) || ((e = t.createElement("div")).setAttribute(i, "return;"), n = "function" == typeof e[i]), !n && t.implementation && t.implementation.hasFeature && !0 !== t.implementation.hasFeature("", "") && (n = t.implementation.hasFeature("Events.wheel", "3.0")), n ? "wheel" : "mousewheel")
            },
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    n = 0,
                    r = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, r = 10 * i, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (n = e.deltaX), e.shiftKey && !n && (n = r, r = 0), (n || r) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, r *= 40) : (n *= 800, r *= 800)), n && !t && (t = n < 1 ? -1 : 1), r && !i && (i = r < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: n,
                    pixelY: r
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    i = this,
                    n = i.params.mousewheel;
                i.params.cssMode && t.preventDefault();
                var r = i.$el;
                if ("container" !== i.params.mousewheel.eventsTarget && (r = L(i.params.mousewheel.eventsTarget)), !i.mouseEntered && !r[0].contains(t.target) && !n.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var a = 0,
                    s = i.rtlTranslate ? -1 : 1,
                    o = j.normalize(t);
                if (n.forceToAxis)
                    if (i.isHorizontal()) {
                        if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                        a = -o.pixelX * s
                    } else {
                        if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                        a = -o.pixelY
                    }
                else a = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * s : -o.pixelY;
                if (0 === a) return !0;
                if (n.invert && (a = -a), i.params.freeMode) {
                    var l = {
                            time: I(),
                            delta: Math.abs(a),
                            direction: Math.sign(a)
                        },
                        c = i.mousewheel.lastEventBeforeSnap,
                        u = c && l.time < c.time + 500 && l.delta <= c.delta && l.direction === c.direction;
                    if (!u) {
                        i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
                        var d, h, p, f, m = i.getTranslate() + a * n.sensitivity,
                            g = i.isBeginning,
                            v = i.isEnd;
                        if (m >= i.minTranslate() && (m = i.minTranslate()), m <= i.maxTranslate() && (m = i.maxTranslate()), i.setTransition(0), i.setTranslate(m), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!g && i.isBeginning || !v && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0, 15 <= (d = i.mousewheel.recentWheelEvents).length && d.shift(), h = d.length ? d[d.length - 1] : void 0, p = d[0], d.push(l), h && (l.delta > h.delta || l.direction !== h.direction) ? d.splice(0) : 15 <= d.length && l.time - p.time < 500 && 1 <= p.delta - l.delta && l.delta <= 6 && (f = 0 < a ? .8 : .2, i.mousewheel.lastEventBeforeSnap = l, d.splice(0), i.mousewheel.timeout = D(function() {
                                i.slideToClosest(i.params.speed, !0, void 0, f)
                            }, 0)), i.mousewheel.timeout || (i.mousewheel.timeout = D(function() {
                                i.mousewheel.lastEventBeforeSnap = l, d.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5)
                            }, 500))), u || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), m === i.minTranslate() || m === i.maxTranslate()) return !0
                    }
                } else {
                    var y = {
                            time: I(),
                            delta: Math.abs(a),
                            direction: Math.sign(a),
                            raw: e
                        },
                        w = i.mousewheel.recentWheelEvents;
                    2 <= w.length && w.shift();
                    var b = w.length ? w[w.length - 1] : void 0;
                    if (w.push(y), (!b || y.direction !== b.direction || y.delta > b.delta || y.time > b.time + 150) && i.mousewheel.animateSlider(y), i.mousewheel.releaseScroll(y)) return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            animateSlider: function(e) {
                var t = this,
                    i = se();
                return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta) && (!(this.params.mousewheel.thresholdTime && I() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime) && (6 <= e.delta && I() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new i.Date).getTime(), !1)))
            },
            releaseScroll: function(e) {
                var t = this,
                    i = t.params.mousewheel;
                if (e.direction < 0) {
                    if (t.isEnd && !t.params.loop && i.releaseOnEdges) return !0
                } else if (t.isBeginning && !t.params.loop && i.releaseOnEdges) return !0;
                return !1
            },
            enable: function() {
                var e = this,
                    t = j.event();
                if (e.params.cssMode) return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (e.mousewheel.enabled) return !1;
                var i = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (i = L(e.params.mousewheel.eventsTarget)), i.on("mouseenter", e.mousewheel.handleMouseEnter), i.on("mouseleave", e.mousewheel.handleMouseLeave), i.on(t, e.mousewheel.handle), e.mousewheel.enabled = !0
            },
            disable: function() {
                var e = this,
                    t = j.event();
                if (e.params.cssMode) return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (!e.mousewheel.enabled) return !1;
                var i = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (i = L(e.params.mousewheel.eventsTarget)), i.off(t, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
            }
        },
        H = {
            update: function() {
                var e, t, i, n = this,
                    r = n.params.navigation;
                n.params.loop || (t = (e = n.navigation).$nextEl, (i = e.$prevEl) && 0 < i.length && (n.isBeginning ? i.addClass(r.disabledClass) : i.removeClass(r.disabledClass), i[n.params.watchOverflow && n.isLocked ? "addClass" : "removeClass"](r.lockClass)), t && 0 < t.length && (n.isEnd ? t.addClass(r.disabledClass) : t.removeClass(r.disabledClass), t[n.params.watchOverflow && n.isLocked ? "addClass" : "removeClass"](r.lockClass)))
            },
            onPrevClick: function(e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function(e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function() {
                var e, t, i = this,
                    n = i.params.navigation;
                (n.nextEl || n.prevEl) && (n.nextEl && (e = L(n.nextEl), i.params.uniqueNavElements && "string" == typeof n.nextEl && 1 < e.length && 1 === i.$el.find(n.nextEl).length && (e = i.$el.find(n.nextEl))), n.prevEl && (t = L(n.prevEl), i.params.uniqueNavElements && "string" == typeof n.prevEl && 1 < t.length && 1 === i.$el.find(n.prevEl).length && (t = i.$el.find(n.prevEl))), e && 0 < e.length && e.on("click", i.navigation.onNextClick), t && 0 < t.length && t.on("click", i.navigation.onPrevClick), oe(i.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this,
                    t = e.navigation,
                    i = t.$nextEl,
                    n = t.$prevEl;
                i && i.length && (i.off("click", e.navigation.onNextClick), i.removeClass(e.params.navigation.disabledClass)), n && n.length && (n.off("click", e.navigation.onPrevClick), n.removeClass(e.params.navigation.disabledClass))
            }
        },
        W = {
            update: function() {
                var e = this,
                    t = e.rtl,
                    n = e.params.pagination;
                if (n.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var r, i, a, s, o, l = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        c = e.pagination.$el,
                        u = e.params.loop ? Math.ceil((l - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > l - 1 - 2 * e.loopedSlides && (r -= l - 2 * e.loopedSlides), u - 1 < r && (r -= u), r < 0 && "bullets" !== e.params.paginationType && (r = u + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === n.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var d, h, p, f, m, g, v = e.pagination.bullets;
                        if (n.dynamicBullets && (e.pagination.bulletSize = v.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), c.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (n.dynamicMainBullets + 4) + "px"), 1 < n.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > n.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = n.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), d = r - e.pagination.dynamicBulletIndex, p = ((h = d + (Math.min(v.length, n.dynamicMainBullets) - 1)) + d) / 2), v.removeClass(n.bulletActiveClass + " " + n.bulletActiveClass + "-next " + n.bulletActiveClass + "-next-next " + n.bulletActiveClass + "-prev " + n.bulletActiveClass + "-prev-prev " + n.bulletActiveClass + "-main"), 1 < c.length) v.each(function(e) {
                            var t = L(e),
                                i = t.index();
                            i === r && t.addClass(n.bulletActiveClass), n.dynamicBullets && (d <= i && i <= h && t.addClass(n.bulletActiveClass + "-main"), i === d && t.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), i === h && t.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next"))
                        });
                        else {
                            var y = v.eq(r),
                                w = y.index();
                            if (y.addClass(n.bulletActiveClass), n.dynamicBullets) {
                                for (var b = v.eq(d), T = v.eq(h), _ = d; _ <= h; _ += 1) v.eq(_).addClass(n.bulletActiveClass + "-main");
                                if (e.params.loop)
                                    if (w >= v.length - n.dynamicMainBullets) {
                                        for (var x = n.dynamicMainBullets; 0 <= x; --x) v.eq(v.length - x).addClass(n.bulletActiveClass + "-main");
                                        v.eq(v.length - n.dynamicMainBullets - 1).addClass(n.bulletActiveClass + "-prev")
                                    } else b.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), T.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next");
                                else b.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), T.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next")
                            }
                        }
                        n.dynamicBullets && (f = Math.min(v.length, n.dynamicMainBullets + 4), m = (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 - p * e.pagination.bulletSize, g = t ? "right" : "left", v.css(e.isHorizontal() ? g : "top", m + "px"))
                    }
                    "fraction" === n.type && (c.find("." + n.currentClass).text(n.formatFractionCurrent(r + 1)), c.find("." + n.totalClass).text(n.formatFractionTotal(u))), "progressbar" === n.type && (i = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical", a = (r + 1) / u, o = s = 1, "horizontal" === i ? s = a : o = a, c.find("." + n.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + s + ") scaleY(" + o + ")").transition(e.params.speed)), "custom" === n.type && n.renderCustom ? (c.html(n.renderCustom(e, r + 1, u)), e.emit("paginationRender", c[0])) : e.emit("paginationUpdate", c[0]), c[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](n.lockClass)
                }
            },
            render: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        n = e.pagination.$el,
                        r = "";
                    if ("bullets" === t.type) {
                        for (var a = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, s = 0; s < a; s += 1) t.renderBullet ? r += t.renderBullet.call(e, s, t.bulletClass) : r += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        n.html(r), e.pagination.bullets = n.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', n.html(r)), "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', n.html(r)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function() {
                var e, i = this,
                    t = i.params.pagination;
                !t.el || 0 !== (e = L(t.el)).length && (i.params.uniqueNavElements && "string" == typeof t.el && 1 < e.length && (e = i.$el.find(t.el)), "bullets" === t.type && t.clickable && e.addClass(t.clickableClass), e.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (e.addClass("" + t.modifierClass + t.type + "-dynamic"), i.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && e.addClass(t.progressbarOppositeClass), t.clickable && e.on("click", "." + t.bulletClass, function(e) {
                    e.preventDefault();
                    var t = L(this).index() * i.params.slidesPerGroup;
                    i.params.loop && (t += i.loopedSlides), i.slideTo(t)
                }), oe(i.pagination, {
                    $el: e,
                    el: e[0]
                }))
            },
            destroy: function() {
                var e, t = this,
                    i = t.params.pagination;
                i.el && t.pagination.el && t.pagination.$el && 0 !== t.pagination.$el.length && ((e = t.pagination.$el).removeClass(i.hiddenClass), e.removeClass(i.modifierClass + i.type), t.pagination.bullets && t.pagination.bullets.removeClass(i.bulletActiveClass), i.clickable && e.off("click", "." + i.bulletClass))
            }
        },
        Y = {
            setTranslate: function() {
                var e, t, i, n, r, a, s, o, l, c, u = this;
                u.params.scrollbar.el && u.scrollbar.el && (e = u.scrollbar, t = u.rtlTranslate, i = u.progress, n = e.dragSize, r = e.trackSize, a = e.$dragEl, s = e.$el, o = u.params.scrollbar, c = (r - (l = n)) * i, t ? 0 < (c = -c) ? (l = n - c, c = 0) : r < -c + n && (l = r + c) : c < 0 ? (l = n + c, c = 0) : r < c + n && (l = r - c), u.isHorizontal() ? (a.transform("translate3d(" + c + "px, 0, 0)"), a[0].style.width = l + "px") : (a.transform("translate3d(0px, " + c + "px, 0)"), a[0].style.height = l + "px"), o.hide && (clearTimeout(u.scrollbar.timeout), s[0].style.opacity = 1, u.scrollbar.timeout = setTimeout(function() {
                    s[0].style.opacity = 0, s.transition(400)
                }, 1e3)))
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                var e, t, i, n, r, a, s, o = this;
                o.params.scrollbar.el && o.scrollbar.el && (t = (e = o.scrollbar).$dragEl, i = e.$el, t[0].style.width = "", t[0].style.height = "", n = o.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, a = (r = o.size / o.virtualSize) * (n / o.size), s = "auto" === o.params.scrollbar.dragSize ? n * r : parseInt(o.params.scrollbar.dragSize, 10), o.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = 1 <= r ? "none" : "", o.params.scrollbar.hide && (i[0].style.opacity = 0), oe(e, {
                    trackSize: n,
                    divider: r,
                    moveDivider: a,
                    dragSize: s
                }), e.$el[o.params.watchOverflow && o.isLocked ? "addClass" : "removeClass"](o.params.scrollbar.lockClass))
            },
            getPointerPosition: function(e) {
                return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
            },
            setDragPosition: function(e) {
                var t = this,
                    i = t.scrollbar,
                    n = t.rtlTranslate,
                    r = i.$el,
                    a = i.dragSize,
                    s = i.trackSize,
                    o = i.dragStartPos,
                    l = (i.getPointerPosition(e) - r.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : a / 2)) / (s - a);
                l = Math.max(Math.min(l, 1), 0), n && (l = 1 - l);
                var c = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * l;
                t.updateProgress(c), t.setTranslate(c), t.updateActiveIndex(), t.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this,
                    i = t.params.scrollbar,
                    n = t.scrollbar,
                    r = t.$wrapperEl,
                    a = n.$el,
                    s = n.$dragEl;
                t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === s[0] || e.target === s ? n.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), r.transition(100), s.transition(100), n.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), a.transition(0), i.hide && a.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    n = t.$el,
                    r = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), r.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this,
                    i = t.params.scrollbar,
                    n = t.scrollbar,
                    r = t.$wrapperEl,
                    a = n.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), r.transition("")), i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = D(function() {
                    a.css("opacity", 0), a.transition(400)
                }, 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function() {
                var e, t, i, n, r, a, s, o, l, c = this;
                c.params.scrollbar.el && (e = T(), t = c.scrollbar, i = c.touchEventsTouch, n = c.touchEventsDesktop, r = c.params, a = c.support, s = t.$el[0], o = !(!a.passiveListener || !r.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, l = !(!a.passiveListener || !r.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, a.touch ? (s.addEventListener(i.start, c.scrollbar.onDragStart, o), s.addEventListener(i.move, c.scrollbar.onDragMove, o), s.addEventListener(i.end, c.scrollbar.onDragEnd, l)) : (s.addEventListener(n.start, c.scrollbar.onDragStart, o), e.addEventListener(n.move, c.scrollbar.onDragMove, o), e.addEventListener(n.end, c.scrollbar.onDragEnd, l)))
            },
            disableDraggable: function() {
                var e, t, i, n, r, a, s, o, l, c = this;
                c.params.scrollbar.el && (e = T(), t = c.scrollbar, i = c.touchEventsTouch, n = c.touchEventsDesktop, r = c.params, a = c.support, s = t.$el[0], o = !(!a.passiveListener || !r.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, l = !(!a.passiveListener || !r.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, a.touch ? (s.removeEventListener(i.start, c.scrollbar.onDragStart, o), s.removeEventListener(i.move, c.scrollbar.onDragMove, o), s.removeEventListener(i.end, c.scrollbar.onDragEnd, l)) : (s.removeEventListener(n.start, c.scrollbar.onDragStart, o), e.removeEventListener(n.move, c.scrollbar.onDragMove, o), e.removeEventListener(n.end, c.scrollbar.onDragEnd, l)))
            },
            init: function() {
                var e, t, i, n, r, a = this;
                a.params.scrollbar.el && (e = a.scrollbar, t = a.$el, n = L((i = a.params.scrollbar).el), a.params.uniqueNavElements && "string" == typeof i.el && 1 < n.length && 1 === t.find(i.el).length && (n = t.find(i.el)), 0 === (r = n.find("." + a.params.scrollbar.dragClass)).length && (r = L('<div class="' + a.params.scrollbar.dragClass + '"></div>'), n.append(r)), oe(e, {
                    $el: n,
                    el: n[0],
                    $dragEl: r,
                    dragEl: r[0]
                }), i.draggable && e.enableDraggable())
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        q = {
            setTransform: function(e, t) {
                var i, n, r = this.rtl,
                    a = L(e),
                    s = r ? -1 : 1,
                    o = a.attr("data-swiper-parallax") || "0",
                    l = a.attr("data-swiper-parallax-x"),
                    c = a.attr("data-swiper-parallax-y"),
                    u = a.attr("data-swiper-parallax-scale"),
                    d = a.attr("data-swiper-parallax-opacity");
                l || c ? (l = l || "0", c = c || "0") : this.isHorizontal() ? (l = o, c = "0") : (c = o, l = "0"), l = 0 <= l.indexOf("%") ? parseInt(l, 10) * t * s + "%" : l * t * s + "px", c = 0 <= c.indexOf("%") ? parseInt(c, 10) * t + "%" : c * t + "px", null != d && (i = d - (d - 1) * (1 - Math.abs(t)), a[0].style.opacity = i), null == u ? a.transform("translate3d(" + l + ", " + c + ", 0px)") : (n = u - (u - 1) * (1 - Math.abs(t)), a.transform("translate3d(" + l + ", " + c + ", 0px) scale(" + n + ")"))
            },
            setTranslate: function() {
                var n = this,
                    e = n.$el,
                    t = n.slides,
                    r = n.progress,
                    a = n.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e) {
                    n.parallax.setTransform(e, r)
                }), t.each(function(e, t) {
                    var i = e.progress;
                    1 < n.params.slidesPerGroup && "auto" !== n.params.slidesPerView && (i += Math.ceil(t / 2) - r * (a.length - 1)), i = Math.min(Math.max(i, -1), 1), L(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e) {
                        n.parallax.setTransform(e, i)
                    })
                })
            },
            setTransition: function(n) {
                void 0 === n && (n = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(e) {
                    var t = L(e),
                        i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || n;
                    0 === n && (i = 0), t.transition(i)
                })
            }
        },
        V = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    n = e.targetTouches[1].pageX,
                    r = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(n - t, 2) + Math.pow(r - i, 2))
            },
            onGestureStart: function(e) {
                var t = this,
                    i = t.support,
                    n = t.params.zoom,
                    r = t.zoom,
                    a = r.gesture;
                if (r.fakeGestureTouched = !1, r.fakeGestureMoved = !1, !i.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    r.fakeGestureTouched = !0, a.scaleStart = V.getDistanceBetweenTouches(e)
                }
                a.$slideEl && a.$slideEl.length || (a.$slideEl = L(e.target).closest("." + t.params.slideClass), 0 === a.$slideEl.length && (a.$slideEl = t.slides.eq(t.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), a.$imageWrapEl = a.$imageEl.parent("." + n.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl && a.$imageEl.transition(0), t.zoom.isScaling = !0) : a.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.support,
                    i = this.params.zoom,
                    n = this.zoom,
                    r = n.gesture;
                if (!t.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    n.fakeGestureMoved = !0, r.scaleMove = V.getDistanceBetweenTouches(e)
                }
                r.$imageEl && 0 !== r.$imageEl.length ? (t.gestures ? n.scale = e.scale * n.currentScale : n.scale = r.scaleMove / r.scaleStart * n.currentScale, n.scale > r.maxRatio && (n.scale = r.maxRatio - 1 + Math.pow(n.scale - r.maxRatio + 1, .5)), n.scale < i.minRatio && (n.scale = i.minRatio + 1 - Math.pow(i.minRatio - n.scale + 1, .5)), r.$imageEl.transform("translate3d(0,0,0) scale(" + n.scale + ")")) : "gesturechange" === e.type && n.onGestureStart(e)
            },
            onGestureEnd: function(e) {
                var t = this,
                    i = t.device,
                    n = t.support,
                    r = t.params.zoom,
                    a = t.zoom,
                    s = a.gesture;
                if (!n.gestures) {
                    if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !i.android) return;
                    a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
                }
                s.$imageEl && 0 !== s.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, s.maxRatio), r.minRatio), s.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (s.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.device,
                    i = this.zoom,
                    n = i.gesture,
                    r = i.image;
                n.$imageEl && 0 !== n.$imageEl.length && (r.isTouched || (t.android && e.cancelable && e.preventDefault(), r.isTouched = !0, r.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, r.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this,
                    i = t.zoom,
                    n = i.gesture,
                    r = i.image,
                    a = i.velocity;
                if (n.$imageEl && 0 !== n.$imageEl.length && (t.allowClick = !1, r.isTouched && n.$slideEl)) {
                    r.isMoved || (r.width = n.$imageEl[0].offsetWidth, r.height = n.$imageEl[0].offsetHeight, r.startX = v(n.$imageWrapEl[0], "x") || 0, r.startY = v(n.$imageWrapEl[0], "y") || 0, n.slideWidth = n.$slideEl[0].offsetWidth, n.slideHeight = n.$slideEl[0].offsetHeight, n.$imageWrapEl.transition(0), t.rtl && (r.startX = -r.startX, r.startY = -r.startY));
                    var s = r.width * i.scale,
                        o = r.height * i.scale;
                    if (!(s < n.slideWidth && o < n.slideHeight)) {
                        if (r.minX = Math.min(n.slideWidth / 2 - s / 2, 0), r.maxX = -r.minX, r.minY = Math.min(n.slideHeight / 2 - o / 2, 0), r.maxY = -r.minY, r.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, r.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !r.isMoved && !i.isScaling) {
                            if (t.isHorizontal() && (Math.floor(r.minX) === Math.floor(r.startX) && r.touchesCurrent.x < r.touchesStart.x || Math.floor(r.maxX) === Math.floor(r.startX) && r.touchesCurrent.x > r.touchesStart.x)) return void(r.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(r.minY) === Math.floor(r.startY) && r.touchesCurrent.y < r.touchesStart.y || Math.floor(r.maxY) === Math.floor(r.startY) && r.touchesCurrent.y > r.touchesStart.y)) return void(r.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(), e.stopPropagation(), r.isMoved = !0, r.currentX = r.touchesCurrent.x - r.touchesStart.x + r.startX, r.currentY = r.touchesCurrent.y - r.touchesStart.y + r.startY, r.currentX < r.minX && (r.currentX = r.minX + 1 - Math.pow(r.minX - r.currentX + 1, .8)), r.currentX > r.maxX && (r.currentX = r.maxX - 1 + Math.pow(r.currentX - r.maxX + 1, .8)), r.currentY < r.minY && (r.currentY = r.minY + 1 - Math.pow(r.minY - r.currentY + 1, .8)), r.currentY > r.maxY && (r.currentY = r.maxY - 1 + Math.pow(r.currentY - r.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = r.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = r.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (r.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (r.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(r.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(r.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = r.touchesCurrent.x, a.prevPositionY = r.touchesCurrent.y, a.prevTime = Date.now(), n.$imageWrapEl.transform("translate3d(" + r.currentX + "px, " + r.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    n = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var r = 300,
                        a = 300,
                        s = n.x * r,
                        o = i.currentX + s,
                        l = n.y * a,
                        c = i.currentY + l;
                    0 !== n.x && (r = Math.abs((o - i.currentX) / n.x)), 0 !== n.y && (a = Math.abs((c - i.currentY) / n.y));
                    var u = Math.max(r, a);
                    i.currentX = o, i.currentY = c;
                    var d = i.width * e.scale,
                        h = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - d / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - h / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(u).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, i, n, r, a, s, o, l, c, u, d, h, p, f, m, g, v = this,
                    y = v.zoom,
                    w = v.params.zoom,
                    b = y.gesture,
                    T = y.image;
                b.$slideEl || (v.params.virtual && v.params.virtual.enabled && v.virtual ? b.$slideEl = v.$wrapperEl.children("." + v.params.slideActiveClass) : b.$slideEl = v.slides.eq(v.activeIndex), b.$imageEl = b.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), b.$imageWrapEl = b.$imageEl.parent("." + w.containerClass)), b.$imageEl && 0 !== b.$imageEl.length && (b.$slideEl.addClass("" + w.zoomedSlideClass), i = void 0 === T.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = T.touchesStart.x, T.touchesStart.y), y.scale = b.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, y.currentScale = b.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (m = b.$slideEl[0].offsetWidth, g = b.$slideEl[0].offsetHeight, n = b.$slideEl.offset().left + m / 2 - t, r = b.$slideEl.offset().top + g / 2 - i, o = b.$imageEl[0].offsetWidth, l = b.$imageEl[0].offsetHeight, c = o * y.scale, u = l * y.scale, p = -(d = Math.min(m / 2 - c / 2, 0)), f = -(h = Math.min(g / 2 - u / 2, 0)), (a = n * y.scale) < d && (a = d), p < a && (a = p), (s = r * y.scale) < h && (s = h), f < s && (s = f)) : s = a = 0, b.$imageWrapEl.transition(300).transform("translate3d(" + a + "px, " + s + "px,0)"), b.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")"))
            },
            out: function() {
                var e = this,
                    t = e.zoom,
                    i = e.params.zoom,
                    n = t.gesture;
                n.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? n.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : n.$slideEl = e.slides.eq(e.activeIndex), n.$imageEl = n.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass)), n.$imageEl && 0 !== n.$imageEl.length && (t.scale = 1, t.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass("" + i.zoomedSlideClass), n.$slideEl = void 0)
            },
            toggleGestures: function(e) {
                var t = this.zoom,
                    i = t.slideSelector,
                    n = t.passiveListener;
                this.$wrapperEl[e]("gesturestart", i, t.onGestureStart, n), this.$wrapperEl[e]("gesturechange", i, t.onGestureChange, n), this.$wrapperEl[e]("gestureend", i, t.onGestureEnd, n)
            },
            enableGestures: function() {
                this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0, this.zoom.toggleGestures("on"))
            },
            disableGestures: function() {
                this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1, this.zoom.toggleGestures("off"))
            },
            enable: function() {
                var e, t, i, n = this,
                    r = n.support,
                    a = n.zoom;
                a.enabled || (a.enabled = !0, e = !("touchstart" !== n.touchEvents.start || !r.passiveListener || !n.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, t = !r.passiveListener || {
                    passive: !1,
                    capture: !0
                }, i = "." + n.params.slideClass, n.zoom.passiveListener = e, n.zoom.slideSelector = i, r.gestures ? (n.$wrapperEl.on(n.touchEvents.start, n.zoom.enableGestures, e), n.$wrapperEl.on(n.touchEvents.end, n.zoom.disableGestures, e)) : "touchstart" === n.touchEvents.start && (n.$wrapperEl.on(n.touchEvents.start, i, a.onGestureStart, e), n.$wrapperEl.on(n.touchEvents.move, i, a.onGestureChange, t), n.$wrapperEl.on(n.touchEvents.end, i, a.onGestureEnd, e), n.touchEvents.cancel && n.$wrapperEl.on(n.touchEvents.cancel, i, a.onGestureEnd, e)), n.$wrapperEl.on(n.touchEvents.move, "." + n.params.zoom.containerClass, a.onTouchMove, t))
            },
            disable: function() {
                var e, t, i, n, r = this,
                    a = r.zoom;
                a.enabled && (e = r.support, r.zoom.enabled = !1, t = !("touchstart" !== r.touchEvents.start || !e.passiveListener || !r.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, i = !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }, n = "." + r.params.slideClass, e.gestures ? (r.$wrapperEl.off(r.touchEvents.start, r.zoom.enableGestures, t), r.$wrapperEl.off(r.touchEvents.end, r.zoom.disableGestures, t)) : "touchstart" === r.touchEvents.start && (r.$wrapperEl.off(r.touchEvents.start, n, a.onGestureStart, t), r.$wrapperEl.off(r.touchEvents.move, n, a.onGestureChange, i), r.$wrapperEl.off(r.touchEvents.end, n, a.onGestureEnd, t), r.touchEvents.cancel && r.$wrapperEl.off(r.touchEvents.cancel, n, a.onGestureEnd, t)), r.$wrapperEl.off(r.touchEvents.move, "." + r.params.zoom.containerClass, a.onTouchMove, i))
            }
        },
        X = {
            loadInSlide: function(e, c) {
                void 0 === c && (c = !0);
                var u, t, d = this,
                    h = d.params.lazy;
                void 0 !== e && 0 !== d.slides.length && (t = (u = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e)).find("." + h.elementClass + ":not(." + h.loadedClass + "):not(." + h.loadingClass + ")"), !u.hasClass(h.elementClass) || u.hasClass(h.loadedClass) || u.hasClass(h.loadingClass) || t.push(u[0]), 0 !== t.length && t.each(function(e) {
                    var n = L(e);
                    n.addClass(h.loadingClass);
                    var r = n.attr("data-background"),
                        a = n.attr("data-src"),
                        s = n.attr("data-srcset"),
                        o = n.attr("data-sizes"),
                        l = n.parent("picture");
                    d.loadImage(n[0], a || r, s, o, !1, function() {
                        var e, t, i;
                        null == d || !d || d && !d.params || d.destroyed || (r ? (n.css("background-image", 'url("' + r + '")'), n.removeAttr("data-background")) : (s && (n.attr("srcset", s), n.removeAttr("data-srcset")), o && (n.attr("sizes", o), n.removeAttr("data-sizes")), l.length && l.children("source").each(function(e) {
                            var t = L(e);
                            t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                        }), a && (n.attr("src", a), n.removeAttr("data-src"))), n.addClass(h.loadedClass).removeClass(h.loadingClass), u.find("." + h.preloaderClass).remove(), d.params.loop && c && (e = u.attr("data-swiper-slide-index"), u.hasClass(d.params.slideDuplicateClass) ? (t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")"), d.lazy.loadInSlide(t.index(), !1)) : (i = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]'), d.lazy.loadInSlide(i.index(), !1))), d.emit("lazyImageReady", u[0], n[0]), d.params.autoHeight && d.updateAutoHeight())
                    }), d.emit("lazyImageLoad", u[0], n[0])
                }))
            },
            load: function() {
                var i = this,
                    t = i.$wrapperEl,
                    n = i.params,
                    r = i.slides,
                    e = i.activeIndex,
                    a = i.virtual && n.virtual.enabled,
                    s = n.lazy,
                    o = n.slidesPerView;

                function l(e) {
                    if (a) {
                        if (t.children("." + n.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return 1
                    } else if (r[e]) return 1
                }

                function c(e) {
                    return a ? L(e).attr("data-swiper-slide-index") : L(e).index()
                }
                if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + n.slideVisibleClass).each(function(e) {
                    var t = a ? L(e).attr("data-swiper-slide-index") : L(e).index();
                    i.lazy.loadInSlide(t)
                });
                else if (1 < o)
                    for (var u = e; u < e + o; u += 1) l(u) && i.lazy.loadInSlide(u);
                else i.lazy.loadInSlide(e);
                if (s.loadPrevNext)
                    if (1 < o || s.loadPrevNextAmount && 1 < s.loadPrevNextAmount) {
                        for (var d = s.loadPrevNextAmount, h = o, p = Math.min(e + h + Math.max(d, h), r.length), f = Math.max(e - Math.max(h, d), 0), m = e + o; m < p; m += 1) l(m) && i.lazy.loadInSlide(m);
                        for (var g = f; g < e; g += 1) l(g) && i.lazy.loadInSlide(g)
                    } else {
                        var v = t.children("." + n.slideNextClass);
                        0 < v.length && i.lazy.loadInSlide(c(v));
                        var y = t.children("." + n.slidePrevClass);
                        0 < y.length && i.lazy.loadInSlide(c(y))
                    }
            }
        },
        G = {
            LinearSpline: function(e, t) {
                var i, n, r, a, s, o = function(e, t) {
                    for (n = -1, i = e.length; 1 < i - n;) e[r = i + n >> 1] <= t ? n = r : i = r;
                    return i
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (s = o(this.x, e), a = s - 1, (e - this.x[a]) * (this.y[s] - this.y[a]) / (this.x[s] - this.x[a]) + this.y[a]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new G.LinearSpline(t.slidesGrid, e.slidesGrid) : new G.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var i, n, r = this,
                    a = r.controller.control,
                    s = r.constructor;

                function o(e) {
                    var t = r.rtlTranslate ? -r.translate : r.translate;
                    "slide" === r.params.controller.by && (r.controller.getInterpolateFunction(e), n = -r.controller.spline.interpolate(-t)), n && "container" !== r.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (r.maxTranslate() - r.minTranslate()), n = (t - r.minTranslate()) * i + e.minTranslate()), r.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, r), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(a))
                    for (var l = 0; l < a.length; l += 1) a[l] !== t && a[l] instanceof s && o(a[l]);
                else a instanceof s && t !== a && o(a)
            },
            setTransition: function(t, e) {
                var i, n = this,
                    r = n.constructor,
                    a = n.controller.control;

                function s(e) {
                    e.setTransition(t, n), 0 !== t && (e.transitionStart(), e.params.autoHeight && D(function() {
                        e.updateAutoHeight()
                    }), e.$wrapperEl.transitionEnd(function() {
                        a && (e.params.loop && "slide" === n.params.controller.by && e.loopFix(), e.transitionEnd())
                    }))
                }
                if (Array.isArray(a))
                    for (i = 0; i < a.length; i += 1) a[i] !== e && a[i] instanceof r && s(a[i]);
                else a instanceof r && e !== a && s(a)
            }
        },
        U = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            makeElNotFocusable: function(e) {
                return e.attr("tabIndex", "-1"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t, i = this,
                    n = i.params.a11y;
                13 === e.keyCode && (t = L(e.target), i.navigation && i.navigation.$nextEl && t.is(i.navigation.$nextEl) && (i.isEnd && !i.params.loop || i.slideNext(), i.isEnd ? i.a11y.notify(n.lastSlideMessage) : i.a11y.notify(n.nextSlideMessage)), i.navigation && i.navigation.$prevEl && t.is(i.navigation.$prevEl) && (i.isBeginning && !i.params.loop || i.slidePrev(), i.isBeginning ? i.a11y.notify(n.firstSlideMessage) : i.a11y.notify(n.prevSlideMessage)), i.pagination && t.is("." + i.params.pagination.bulletClass) && t[0].click())
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                var e, t, i, n = this;
                !n.params.loop && n.navigation && (t = (e = n.navigation).$nextEl, (i = e.$prevEl) && 0 < i.length && (n.isBeginning ? (n.a11y.disableEl(i), n.a11y.makeElNotFocusable(i)) : (n.a11y.enableEl(i), n.a11y.makeElFocusable(i))), t && 0 < t.length && (n.isEnd ? (n.a11y.disableEl(t), n.a11y.makeElNotFocusable(t)) : (n.a11y.enableEl(t), n.a11y.makeElFocusable(t))))
            },
            updatePagination: function() {
                var i = this,
                    n = i.params.a11y;
                i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function(e) {
                    var t = L(e);
                    i.a11y.makeElFocusable(t), i.params.pagination.renderBullet || (i.a11y.addElRole(t, "button"), i.a11y.addElLabel(t, n.paginationBulletMessage.replace(/\{\{index\}\}/, t.index() + 1)))
                })
            },
            init: function() {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, i, n = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, n.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, n.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t, i = this;
                i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey)
            }
        },
        Q = {
            init: function() {
                var e = this,
                    t = se();
                if (e.params.history) {
                    if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var i = e.history;
                    i.initialized = !0, i.paths = Q.getPathValues(e.params.url), (i.paths.key || i.paths.value) && (i.scrollToSlide(0, i.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function() {
                var e = se();
                this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                var e = this;
                e.history.paths = Q.getPathValues(e.params.url), e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
            },
            getPathValues: function(e) {
                var t = se(),
                    i = e ? new URL(e) : t.location,
                    n = i.pathname.slice(1).split("/").filter(function(e) {
                        return "" !== e
                    }),
                    r = n.length;
                return {
                    key: n[r - 2],
                    value: n[r - 1]
                }
            },
            setHistory: function(e, t) {
                var i, n, r, a, s = this,
                    o = se();
                s.history.initialized && s.params.history.enabled && (i = s.params.url ? new URL(s.params.url) : o.location, n = s.slides.eq(t), r = Q.slugify(n.attr("data-history")), i.pathname.includes(e) || (r = e + "/" + r), (a = o.history.state) && a.value === r || (s.params.history.replaceState ? o.history.replaceState({
                    value: r
                }, null, r) : o.history.pushState({
                    value: r
                }, null, r)))
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, i) {
                var n = this;
                if (t)
                    for (var r = 0, a = n.slides.length; r < a; r += 1) {
                        var s, o = n.slides.eq(r);
                        Q.slugify(o.attr("data-history")) !== t || o.hasClass(n.params.slideDuplicateClass) || (s = o.index(), n.slideTo(s, e, i))
                    } else n.slideTo(0, e, i)
            }
        },
        K = {
            onHashCange: function() {
                var e = this,
                    t = T();
                e.emit("hashChange");
                var i = t.location.hash.replace("#", "");
                if (i !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var n = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + i + '"]').index();
                    if (void 0 === n) return;
                    e.slideTo(n)
                }
            },
            setHash: function() {
                var e, t, i = this,
                    n = se(),
                    r = T();
                i.hashNavigation.initialized && i.params.hashNavigation.enabled && (i.params.hashNavigation.replaceState && n.history && n.history.replaceState ? n.history.replaceState(null, null, "#" + i.slides.eq(i.activeIndex).attr("data-hash") || "") : (t = (e = i.slides.eq(i.activeIndex)).attr("data-hash") || e.attr("data-history"), r.location.hash = t || ""), i.emit("hashSet"))
            },
            init: function() {
                var e = this,
                    t = T(),
                    i = se();
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var n = t.location.hash.replace("#", "");
                    if (n)
                        for (var r = 0, a = e.slides.length; r < a; r += 1) {
                            var s, o = e.slides.eq(r);
                            (o.attr("data-hash") || o.attr("data-history")) !== n || o.hasClass(e.params.slideDuplicateClass) || (s = o.index(), e.slideTo(s, 0, e.params.runCallbacksOnInit, !0))
                        }
                    e.params.hashNavigation.watchState && L(i).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                var e = se();
                this.params.hashNavigation.watchState && L(e).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        Z = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = D(function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run()
                }, i)
            },
            start: function() {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function() {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            },
            onVisibilityChange: function() {
                var e = this,
                    t = T();
                "hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
            },
            onTransitionEnd: function(e) {
                var t = this;
                t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            }
        },
        J = {
            setTranslate: function() {
                for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
                    var n = e.slides.eq(i),
                        r = -n[0].swiperSlideOffset;
                    e.params.virtualTranslate || (r -= e.translate);
                    var a = 0;
                    e.isHorizontal() || (a = r, r = 0);
                    var s = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(n[0].progress), 0) : 1 + Math.min(Math.max(n[0].progress, -1), 0);
                    n.css({
                        opacity: s
                    }).transform("translate3d(" + r + "px, " + a + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var i, n = this,
                    t = n.slides,
                    r = n.$wrapperEl;
                t.transition(e), n.params.virtualTranslate && 0 !== e && (i = !1, t.transitionEnd(function() {
                    if (!i && n && !n.destroyed) {
                        i = !0, n.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) r.trigger(e[t])
                    }
                }))
            }
        },
        ee = {
            setTranslate: function() {
                var e, t = this,
                    i = t.$el,
                    n = t.$wrapperEl,
                    r = t.slides,
                    a = t.width,
                    s = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    c = t.browser,
                    u = t.params.cubeEffect,
                    d = t.isHorizontal(),
                    h = t.virtual && t.params.virtual.enabled,
                    p = 0;
                u.shadow && (d ? (0 === (e = n.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), n.append(e)), e.css({
                    height: a + "px"
                })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)));
                for (var f, m, g, v, y, w = 0; w < r.length; w += 1) {
                    var b = r.eq(w),
                        T = w;
                    h && (T = parseInt(b.attr("data-swiper-slide-index"), 10));
                    var _ = 90 * T,
                        x = Math.floor(_ / 360);
                    o && (_ = -_, x = Math.floor(-_ / 360));
                    var E = Math.max(Math.min(b[0].progress, 1), -1),
                        S = 0,
                        C = 0,
                        k = 0;
                    T % 4 == 0 ? (S = 4 * -x * l, k = 0) : (T - 1) % 4 == 0 ? (S = 0, k = 4 * -x * l) : (T - 2) % 4 == 0 ? (S = l + 4 * x * l, k = l) : (T - 3) % 4 == 0 && (S = -l, k = 3 * l + 4 * l * x), o && (S = -S), d || (C = S, S = 0);
                    var M, z, O = "rotateX(" + (d ? 0 : -_) + "deg) rotateY(" + (d ? _ : 0) + "deg) translate3d(" + S + "px, " + C + "px, " + k + "px)";
                    E <= 1 && -1 < E && (p = o ? 90 * -T - 90 * E : 90 * T + 90 * E), b.transform(O), u.slideShadows && (M = d ? b.find(".swiper-slide-shadow-left") : b.find(".swiper-slide-shadow-top"), z = d ? b.find(".swiper-slide-shadow-right") : b.find(".swiper-slide-shadow-bottom"), 0 === M.length && (M = L('<div class="swiper-slide-shadow-' + (d ? "left" : "top") + '"></div>'), b.append(M)), 0 === z.length && (z = L('<div class="swiper-slide-shadow-' + (d ? "right" : "bottom") + '"></div>'), b.append(z)), M.length && (M[0].style.opacity = Math.max(-E, 0)), z.length && (z[0].style.opacity = Math.max(E, 0)))
                }
                n.css({
                    "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                    "transform-origin": "50% 50% -" + l / 2 + "px"
                }), u.shadow && (d ? e.transform("translate3d(0px, " + (a / 2 + u.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + u.shadowScale + ")") : (f = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90), m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2), g = u.shadowScale, v = u.shadowScale / m, y = u.shadowOffset, e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (s / 2 + y) + "px, " + -s / 2 / v + "px) rotateX(-90deg)")));
                var P = c.isSafari || c.isWebView ? -l / 2 : 0;
                n.transform("translate3d(0px,0," + P + "px) rotateX(" + (t.isHorizontal() ? 0 : p) + "deg) rotateY(" + (t.isHorizontal() ? -p : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        te = {
            setTranslate: function() {
                for (var e = this, t = e.slides, i = e.rtlTranslate, n = 0; n < t.length; n += 1) {
                    var r = t.eq(n),
                        a = r[0].progress;
                    e.params.flipEffect.limitRotation && (a = Math.max(Math.min(r[0].progress, 1), -1));
                    var s, o, l = -180 * a,
                        c = 0,
                        u = -r[0].swiperSlideOffset,
                        d = 0;
                    e.isHorizontal() ? i && (l = -l) : (d = u, c = -l, l = u = 0), r[0].style.zIndex = -Math.abs(Math.round(a)) + t.length, e.params.flipEffect.slideShadows && (s = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"), o = e.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom"), 0 === s.length && (s = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), r.append(s)), 0 === o.length && (o = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(o)), s.length && (s[0].style.opacity = Math.max(-a, 0)), o.length && (o[0].style.opacity = Math.max(a, 0))), r.transform("translate3d(" + u + "px, " + d + "px, 0px) rotateX(" + c + "deg) rotateY(" + l + "deg)")
                }
            },
            setTransition: function(e) {
                var i, n = this,
                    t = n.slides,
                    r = n.activeIndex,
                    a = n.$wrapperEl;
                t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), n.params.virtualTranslate && 0 !== e && (i = !1, t.eq(r).transitionEnd(function() {
                    if (!i && n && !n.destroyed) {
                        i = !0, n.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) a.trigger(e[t])
                    }
                }))
            }
        },
        ie = {
            setTranslate: function() {
                for (var e = this, t = e.width, i = e.height, n = e.slides, r = e.slidesSizesGrid, a = e.params.coverflowEffect, s = e.isHorizontal(), o = e.translate, l = s ? t / 2 - o : i / 2 - o, c = s ? a.rotate : -a.rotate, u = a.depth, d = 0, h = n.length; d < h; d += 1) {
                    var p = n.eq(d),
                        f = r[d],
                        m = (l - p[0].swiperSlideOffset - f / 2) / f * a.modifier,
                        g = s ? c * m : 0,
                        v = s ? 0 : c * m,
                        y = -u * Math.abs(m),
                        w = a.stretch;
                    "string" == typeof w && -1 !== w.indexOf("%") && (w = parseFloat(a.stretch) / 100 * f);
                    var b = s ? 0 : w * m,
                        T = s ? w * m : 0,
                        _ = 1 - (1 - a.scale) * Math.abs(m);
                    Math.abs(T) < .001 && (T = 0), Math.abs(b) < .001 && (b = 0), Math.abs(y) < .001 && (y = 0), Math.abs(g) < .001 && (g = 0), Math.abs(v) < .001 && (v = 0), Math.abs(_) < .001 && (_ = 0);
                    var x, E, S = "translate3d(" + T + "px," + b + "px," + y + "px)  rotateX(" + v + "deg) rotateY(" + g + "deg) scale(" + _ + ")";
                    p.transform(S), p[0].style.zIndex = 1 - Math.abs(Math.round(m)), a.slideShadows && (x = s ? p.find(".swiper-slide-shadow-left") : p.find(".swiper-slide-shadow-top"), E = s ? p.find(".swiper-slide-shadow-right") : p.find(".swiper-slide-shadow-bottom"), 0 === x.length && (x = L('<div class="swiper-slide-shadow-' + (s ? "left" : "top") + '"></div>'), p.append(x)), 0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (s ? "right" : "bottom") + '"></div>'), p.append(E)), x.length && (x[0].style.opacity = 0 < m ? m : 0), E.length && (E[0].style.opacity = 0 < -m ? -m : 0))
                }
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ne = {
            init: function() {
                var e = this,
                    t = e.params.thumbs;
                if (e.thumbs.initialized) return !1;
                e.thumbs.initialized = !0;
                var i = e.constructor;
                return t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, oe(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), oe(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : y(t.swiper) && (e.thumbs.swiper = new i(oe({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick), !0
            },
            onThumbClick: function() {
                var e, t, i, n, r, a, s = this,
                    o = s.thumbs.swiper;
                o && (e = o.clickedIndex, (t = o.clickedSlide) && L(t).hasClass(s.params.thumbs.slideThumbActiveClass) || null != e && (a = o.params.loop ? parseInt(L(o.clickedSlide).attr("data-swiper-slide-index"), 10) : e, s.params.loop && (i = s.activeIndex, s.slides.eq(i).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, i = s.activeIndex), n = s.slides.eq(i).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(), r = s.slides.eq(i).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(), a = void 0 === n || void 0 !== r && r - i < i - n ? r : n), s.slideTo(a)))
            },
            update: function(e) {
                var t = this,
                    i = t.thumbs.swiper;
                if (i) {
                    var n, r, a, s, o, l = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView,
                        c = t.params.thumbs.autoScrollOffset,
                        u = c && !i.params.loop;
                    t.realIndex === i.realIndex && !u || (n = i.activeIndex, o = i.params.loop ? (i.slides.eq(n).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, n = i.activeIndex), r = i.slides.eq(n).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(), a = i.slides.eq(n).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(), s = void 0 === r ? a : void 0 === a ? r : a - n == n - r ? n : a - n < n - r ? a : r, t.activeIndex > t.previousIndex ? "next" : "prev") : (s = t.realIndex) > t.previousIndex ? "next" : "prev", u && (s += "next" === o ? c : -1 * c), i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(s) < 0 && (i.params.centeredSlides ? s = n < s ? s - Math.floor(l / 2) + 1 : s + Math.floor(l / 2) - 1 : n < s && (s = s - l + 1), i.slideTo(s, e ? 0 : void 0)));
                    var d = 1,
                        h = t.params.thumbs.slideThumbActiveClass;
                    if (1 < t.params.slidesPerView && !t.params.centeredSlides && (d = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (d = 1), d = Math.floor(d), i.slides.removeClass(h), i.params.loop || i.params.virtual && i.params.virtual.enabled)
                        for (var p = 0; p < d; p += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(h);
                    else
                        for (var f = 0; f < d; f += 1) i.slides.eq(t.realIndex + f).addClass(h)
                }
            }
        },
        re = [R, $, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null
                }
            },
            create: function() {
                w(this, {
                    mousewheel: {
                        enabled: !1,
                        lastScrollTime: I(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: [],
                        enable: j.enable,
                        disable: j.disable,
                        handle: j.handle,
                        handleMouseEnter: j.handleMouseEnter,
                        handleMouseLeave: j.handleMouseLeave,
                        animateSlider: j.animateSlider,
                        releaseScroll: j.releaseScroll
                    }
                })
            },
            on: {
                init: function(e) {
                    !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable()
                },
                destroy: function(e) {
                    e.params.cssMode && e.mousewheel.enable(), e.mousewheel.enabled && e.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                w(this, {
                    navigation: e({}, H)
                })
            },
            on: {
                init: function(e) {
                    e.navigation.init(), e.navigation.update()
                },
                toEdge: function(e) {
                    e.navigation.update()
                },
                fromEdge: function(e) {
                    e.navigation.update()
                },
                destroy: function(e) {
                    e.navigation.destroy()
                },
                click: function(e, t) {
                    var i, n = e.navigation,
                        r = n.$nextEl,
                        a = n.$prevEl;
                    !e.params.navigation.hideOnClick || L(t.target).is(a) || L(t.target).is(r) || (r ? i = r.hasClass(e.params.navigation.hiddenClass) : a && (i = a.hasClass(e.params.navigation.hiddenClass)), !0 === i ? e.emit("navigationShow") : e.emit("navigationHide"), r && r.toggleClass(e.params.navigation.hiddenClass), a && a.toggleClass(e.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                w(this, {
                    pagination: e({
                        dynamicBulletIndex: 0
                    }, W)
                })
            },
            on: {
                init: function(e) {
                    e.pagination.init(), e.pagination.render(), e.pagination.update()
                },
                activeIndexChange: function(e) {
                    (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
                },
                snapIndexChange: function(e) {
                    e.params.loop || e.pagination.update()
                },
                slidesLengthChange: function(e) {
                    e.params.loop && (e.pagination.render(), e.pagination.update())
                },
                snapGridLengthChange: function(e) {
                    e.params.loop || (e.pagination.render(), e.pagination.update())
                },
                destroy: function(e) {
                    e.pagination.destroy()
                },
                click: function(e, t) {
                    e.params.pagination.el && e.params.pagination.hideOnClick && 0 < e.pagination.$el.length && !L(t.target).hasClass(e.params.pagination.bulletClass) && (!0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"), e.pagination.$el.toggleClass(e.params.pagination.hiddenClass))
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function() {
                w(this, {
                    scrollbar: e({
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }, Y)
                })
            },
            on: {
                init: function(e) {
                    e.scrollbar.init(), e.scrollbar.updateSize(), e.scrollbar.setTranslate()
                },
                update: function(e) {
                    e.scrollbar.updateSize()
                },
                resize: function(e) {
                    e.scrollbar.updateSize()
                },
                observerUpdate: function(e) {
                    e.scrollbar.updateSize()
                },
                setTranslate: function(e) {
                    e.scrollbar.setTranslate()
                },
                setTransition: function(e, t) {
                    e.scrollbar.setTransition(t)
                },
                destroy: function(e) {
                    e.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function() {
                w(this, {
                    parallax: e({}, q)
                })
            },
            on: {
                beforeInit: function(e) {
                    e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                init: function(e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTranslate: function(e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTransition: function(e, t) {
                    e.params.parallax.enabled && e.parallax.setTransition(t)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function() {
                var n = this;
                w(n, {
                    zoom: e({
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    }, V)
                });
                var r = 1;
                Object.defineProperty(n.zoom, "scale", {
                    get: function() {
                        return r
                    },
                    set: function(e) {
                        var t, i;
                        r !== e && (t = n.zoom.gesture.$imageEl ? n.zoom.gesture.$imageEl[0] : void 0, i = n.zoom.gesture.$slideEl ? n.zoom.gesture.$slideEl[0] : void 0, n.emit("zoomChange", e, t, i)), r = e
                    }
                })
            },
            on: {
                init: function(e) {
                    e.params.zoom.enabled && e.zoom.enable()
                },
                destroy: function(e) {
                    e.zoom.disable()
                },
                touchStart: function(e, t) {
                    e.zoom.enabled && e.zoom.onTouchStart(t)
                },
                touchEnd: function(e, t) {
                    e.zoom.enabled && e.zoom.onTouchEnd(t)
                },
                doubleTap: function(e, t) {
                    e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
                },
                transitionEnd: function(e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
                },
                slideChange: function(e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function() {
                w(this, {
                    lazy: e({
                        initialImageLoaded: !1
                    }, X)
                })
            },
            on: {
                beforeInit: function(e) {
                    e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
                },
                init: function(e) {
                    e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && e.lazy.load()
                },
                scroll: function(e) {
                    e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
                },
                resize: function(e) {
                    e.params.lazy.enabled && e.lazy.load()
                },
                scrollbarDragMove: function(e) {
                    e.params.lazy.enabled && e.lazy.load()
                },
                transitionStart: function(e) {
                    e.params.lazy.enabled && (!e.params.lazy.loadOnTransitionStart && (e.params.lazy.loadOnTransitionStart || e.lazy.initialImageLoaded) || e.lazy.load())
                },
                transitionEnd: function(e) {
                    e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
                },
                slideChange: function(e) {
                    e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function() {
                w(this, {
                    controller: e({
                        control: this.params.controller.control
                    }, G)
                })
            },
            on: {
                update: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                resize: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                observerUpdate: function(e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                setTranslate: function(e, t, i) {
                    e.controller.control && e.controller.setTranslate(t, i)
                },
                setTransition: function(e, t, i) {
                    e.controller.control && e.controller.setTransition(t, i)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function() {
                w(this, {
                    a11y: e(e({}, U), {}, {
                        liveRegion: L('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    })
                })
            },
            on: {
                init: function(e) {
                    e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
                },
                toEdge: function(e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                fromEdge: function(e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                paginationUpdate: function(e) {
                    e.params.a11y.enabled && e.a11y.updatePagination()
                },
                destroy: function(e) {
                    e.params.a11y.enabled && e.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function() {
                w(this, {
                    history: e({}, Q)
                })
            },
            on: {
                init: function(e) {
                    e.params.history.enabled && e.history.init()
                },
                destroy: function(e) {
                    e.params.history.enabled && e.history.destroy()
                },
                transitionEnd: function(e) {
                    e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
                },
                slideChange: function(e) {
                    e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function() {
                w(this, {
                    hashNavigation: e({
                        initialized: !1
                    }, K)
                })
            },
            on: {
                init: function(e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.init()
                },
                destroy: function(e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.destroy()
                },
                transitionEnd: function(e) {
                    e.hashNavigation.initialized && e.hashNavigation.setHash()
                },
                slideChange: function(e) {
                    e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                w(this, {
                    autoplay: e(e({}, Z), {}, {
                        running: !1,
                        paused: !1
                    })
                })
            },
            on: {
                init: function(e) {
                    e.params.autoplay.enabled && (e.autoplay.start(), T().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
                },
                beforeTransitionStart: function(e, t, i) {
                    e.autoplay.running && (i || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
                },
                sliderFirstMove: function(e) {
                    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
                },
                touchEnd: function(e) {
                    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
                },
                destroy: function(e) {
                    e.autoplay.running && e.autoplay.stop(), T().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function() {
                w(this, {
                    fadeEffect: e({}, J)
                })
            },
            on: {
                beforeInit: function(e) {
                    var t;
                    "fade" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "fade"), t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    }, oe(e.params, t), oe(e.originalParams, t))
                },
                setTranslate: function(e) {
                    "fade" === e.params.effect && e.fadeEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "fade" === e.params.effect && e.fadeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function() {
                w(this, {
                    cubeEffect: e({}, ee)
                })
            },
            on: {
                beforeInit: function(e) {
                    var t;
                    "cube" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d"), t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    }, oe(e.params, t), oe(e.originalParams, t))
                },
                setTranslate: function(e) {
                    "cube" === e.params.effect && e.cubeEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "cube" === e.params.effect && e.cubeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function() {
                w(this, {
                    flipEffect: e({}, te)
                })
            },
            on: {
                beforeInit: function(e) {
                    var t;
                    "flip" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d"), t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    }, oe(e.params, t), oe(e.originalParams, t))
                },
                setTranslate: function(e) {
                    "flip" === e.params.effect && e.flipEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "flip" === e.params.effect && e.flipEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    scale: 1,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function() {
                w(this, {
                    coverflowEffect: e({}, ie)
                })
            },
            on: {
                beforeInit: function(e) {
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function(e) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
                },
                setTransition: function(e, t) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: !0,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function() {
                w(this, {
                    thumbs: e({
                        swiper: null,
                        initialized: !1
                    }, ne)
                })
            },
            on: {
                beforeInit: function(e) {
                    var t = e.params.thumbs;
                    t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
                },
                slideChange: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                update: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                resize: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                observerUpdate: function(e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                setTransition: function(e, t) {
                    var i = e.thumbs.swiper;
                    i && i.setTransition(t)
                },
                beforeDestroy: function(e) {
                    var t = e.thumbs.swiper;
                    t && e.thumbs.swiperCreated && t && t.destroy()
                }
            }
        }];
    return B.use(re), B
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function(e) {
    "use strict";

    function i(e, t) {
        e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
    }

    function C(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function R(e) {
        return "string" == typeof e
    }

    function p(e) {
        return "function" == typeof e
    }

    function k(e) {
        return "number" == typeof e
    }

    function r(e) {
        return void 0 === e
    }

    function M(e) {
        return "object" == typeof e
    }

    function I(e) {
        return !1 !== e
    }

    function t() {
        return "undefined" != typeof window
    }

    function z(e) {
        return p(e) || R(e)
    }

    function n(e) {
        return (nt = ht(e, it)) && ui
    }

    function F(e, t) {
        return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
    }

    function O(e, t) {
        return !t && console.warn(e)
    }

    function s(e, t) {
        return e && (it[e] = t) && nt && (nt[e] = t) || it
    }

    function P() {
        return 0
    }

    function B(e) {
        var t, i, n = e[0];
        if (M(n) || p(n) || (e = [e]), !(t = (n._gsap || {}).harness)) {
            for (i = ut.length; i-- && !ut[i].targetTest(n););
            t = ut[i]
        }
        for (i = e.length; i--;) e[i] && (e[i]._gsap || (e[i]._gsap = new Dt(e[i], t))) || e.splice(i, 1);
        return e
    }

    function N(e) {
        return e._gsap || B(vt(e))[0]._gsap
    }

    function a(e, t, i) {
        return (i = e[t]) && p(i) ? e[t]() : r(i) && e.getAttribute && e.getAttribute(t) || i
    }

    function f(e, t) {
        return (e = e.split(",")).forEach(t) || e
    }

    function $(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    }

    function o(e, t) {
        for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i;);
        return n < i
    }

    function l(e, t, i) {
        var n, r = k(e[1]),
            a = (r ? 2 : 1) + (t < 2 ? 0 : 1),
            s = e[a];
        if (r && (s.duration = e[1]), s.parent = i, t) {
            for (n = s; i && !("immediateRender" in n);) n = i.vars.defaults || {}, i = I(i.vars.inherit) && i.parent;
            s.immediateRender = I(n.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[a - 1]
        }
        return s
    }

    function j() {
        var e, t, i = at.length,
            n = at.slice(0);
        for (st = {}, e = at.length = 0; e < i; e++)(t = n[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0)
    }

    function c(e, t, i, n) {
        at.length && j(), e.render(t, i, n), at.length && j()
    }

    function u(e) {
        var t = parseFloat(e);
        return (t || 0 === t) && (e + "").match(tt).length < 2 ? t : R(e) ? e.trim() : e
    }

    function d(e) {
        return e
    }

    function H(e, t) {
        for (var i in t) i in e || (e[i] = t[i]);
        return e
    }

    function h(e, t) {
        for (var i in t) i in e || "duration" === i || "ease" === i || (e[i] = t[i])
    }

    function m(e, t) {
        for (var i in t) e[i] = M(t[i]) ? m(e[i] || (e[i] = {}), t[i]) : t[i];
        return e
    }

    function W(e, t) {
        var i, n = {};
        for (i in e) i in t || (n[i] = e[i]);
        return n
    }

    function L(e) {
        var t = e.parent || me,
            i = e.keyframes ? h : H;
        if (I(e.inherit))
            for (; t;) i(e, t.vars.defaults), t = t.parent || t._dp;
        return e
    }

    function g(e, t, i, n) {
        void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
        var r = t._prev,
            a = t._next;
        r ? r._next = a : e[i] === t && (e[i] = a), a ? a._prev = r : e[n] === t && (e[n] = r), t._next = t._prev = t.parent = null
    }

    function Y(e, t) {
        !e.parent || t && !e.parent.autoRemoveChildren || e.parent.remove(e), e._act = 0
    }

    function v(e, t) {
        if (e && (!t || t._end > e._dur || t._start < 0))
            for (var i = e; i;) i._dirty = 1, i = i.parent;
        return e
    }

    function y(e) {
        return e._repeat ? pt(e._tTime, e = e.duration() + e._rDelay) * e : 0
    }

    function w(e, t) {
        return (e - t._start) * t._ts + (0 <= t._ts ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    }

    function x(e) {
        return e._end = $(e._start + (e._tDur / Math.abs(e._ts || e._rts || je) || 0))
    }

    function b(e, t) {
        var i = e._dp;
        return i && i.smoothChildTiming && e._ts && (e._start = $(e._dp._time - (0 < e._ts ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), x(e), i._dirty || v(i, e)), e
    }

    function A(e, t) {
        var i;
        if ((t._time || t._initted && !t._dur) && (i = w(e.rawTime(), t), (!t._dur || mt(0, t.totalDuration(), i) - t._tTime > je) && t.render(i, !0)), v(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
            if (e._dur < e.duration())
                for (i = e; i._dp;) 0 <= i.rawTime() && i.totalTime(i._tTime), i = i._dp;
            e._zTime = -je
        }
    }

    function T(e, t, i, n) {
        return t.parent && Y(t), t._start = $(i + t._delay), t._end = $(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
            function(e, t, i, n, r) {
                void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
                var a, s = e[n];
                if (r)
                    for (a = t[r]; s && s[r] > a;) s = s._prev;
                s ? (t._next = s._next, s._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = s, t.parent = t._dp = e
            }(e, t, "_first", "_last", e._sort ? "_start" : 0), e._recent = t, n || A(e, t), e
    }

    function D(e, t) {
        return (it.ScrollTrigger || F("scrollTrigger", t)) && it.ScrollTrigger.create(t, e)
    }

    function _(e, t, i, n) {
        return jt(e, t), e._initted ? !i && e._pt && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && be !== Et.frame ? (at.push(e), e._lazy = [t, n]) : void 0 : 1
    }

    function E(e, t, i, n) {
        var r = e._repeat,
            a = $(t) || 0,
            s = e._tTime / e._tDur;
        return s && !n && (e._time *= a / e._dur), e._dur = a, e._tDur = r ? r < 0 ? 1e10 : $(a * (r + 1) + e._rDelay * r) : a, s && !n ? b(e, e._tTime = e._tDur * s) : e.parent && x(e), i || v(e.parent, e), e
    }

    function S(e) {
        return e instanceof Nt ? v(e) : E(e, e._dur)
    }

    function q(e, t) {
        var i, n, r = e.labels,
            a = e._recent || ft,
            s = e.duration() >= $e ? a.endTime(!1) : e._dur;
        return R(t) && (isNaN(t) || t in r) ? "<" === (i = t.charAt(0)) || ">" === i ? ("<" === i ? a._start : a.endTime(0 <= a._repeat)) + (parseFloat(t.substr(1)) || 0) : (i = t.indexOf("=")) < 0 ? (t in r || (r[t] = s), r[t]) : (n = +(t.charAt(i - 1) + t.substr(i + 1)), 1 < i ? q(e, t.substr(0, i - 1)) + n : s + n) : null == t ? s : +t
    }

    function V(e, t) {
        return e || 0 === e ? t(e) : t
    }

    function X(e) {
        return (e = (e + "").substr((parseFloat(e) + "").length)) && isNaN(e) ? e : ""
    }

    function G(e, t) {
        return e && M(e) && "length" in e && (!t && !e.length || e.length - 1 in e && M(e[0])) && !e.nodeType && e !== ge
    }

    function U(e) {
        return e.sort(function() {
            return .5 - Math.random()
        })
    }

    function Q(e) {
        if (p(e)) return e;
        var f = M(e) ? e : {
                each: e
            },
            m = Ot(f.ease),
            g = f.from || 0,
            v = parseFloat(f.base) || 0,
            y = {},
            t = 0 < g && g < 1,
            w = isNaN(g) || t,
            b = f.axis,
            T = g,
            _ = g;
        return R(g) ? T = _ = {
                center: .5,
                edges: .5,
                end: 1
            }[g] || 0 : !t && w && (T = g[0], _ = g[1]),
            function(e, t, i) {
                var n, r, a, s, o, l, c, u, d, h = (i || f).length,
                    p = y[h];
                if (!p) {
                    if (!(d = "auto" === f.grid ? 0 : (f.grid || [1, $e])[1])) {
                        for (c = -$e; c < (c = i[d++].getBoundingClientRect().left) && d < h;);
                        d--
                    }
                    for (p = y[h] = [], n = w ? Math.min(d, h) * T - .5 : g % d, r = w ? h * _ / d - .5 : g / d | 0, u = $e, l = c = 0; l < h; l++) a = l % d - n, s = r - (l / d | 0), p[l] = o = b ? Math.abs("y" === b ? s : a) : qe(a * a + s * s), c < o && (c = o), o < u && (u = o);
                    "random" === g && U(p), p.max = c - u, p.min = u, p.v = h = (parseFloat(f.amount) || parseFloat(f.each) * (h < d ? h - 1 : b ? "y" === b ? h / d : d : Math.max(d, h / d)) || 0) * ("edges" === g ? -1 : 1), p.b = h < 0 ? v - h : v, p.u = X(f.amount || f.each) || 0, m = m && h < 0 ? zt(m) : m
                }
                return h = (p[e] - p.min) / p.max || 0, $(p.b + (m ? m(h) : h) * p.v) + p.u
            }
    }

    function K(t) {
        var i = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
        return function(e) {
            return Math.floor(Math.round(parseFloat(e) / t) * t * i) / i + (k(e) ? 0 : X(e))
        }
    }

    function Z(l, e) {
        var c, u, t = Ue(l);
        return !t && M(l) && (c = t = l.radius || $e, l.values ? (l = vt(l.values), (u = !k(l[0])) && (c *= c)) : l = K(l.increment)), V(e, t ? p(l) ? function(e) {
            return u = l(e), Math.abs(u - e) <= c ? u : e
        } : function(e) {
            for (var t, i, n = parseFloat(u ? e.x : e), r = parseFloat(u ? e.y : 0), a = $e, s = 0, o = l.length; o--;)(t = u ? (t = l[o].x - n) * t + (i = l[o].y - r) * i : Math.abs(l[o] - n)) < a && (a = t, s = o);
            return s = !c || a <= c ? l[s] : e, u || s === e || k(e) ? s : s + X(e)
        } : K(l))
    }

    function J(e, t, i, n) {
        return V(Ue(e) ? !t : !0 === i ? !!(i = 0) : !n, function() {
            return Ue(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e + Math.random() * (t - e)) / i) * i * n) / n
        })
    }

    function ee(t, i, e) {
        return V(e, function(e) {
            return t[~~i(e)]
        })
    }

    function te(e) {
        for (var t, i, n, r, a = 0, s = ""; ~(t = e.indexOf("random(", a));) n = e.indexOf(")", t), r = "[" === e.charAt(t + 7), i = e.substr(t + 7, n - t - 7).match(r ? tt : Qe), s += e.substr(a, t - a) + J(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5), a = n + 1;
        return s + e.substr(a, e.length - a)
    }

    function ie(e, t, i) {
        var n, r, a, s = e.labels,
            o = $e;
        for (n in s)(r = s[n] - t) < 0 == !!i && r && o > (r = Math.abs(r)) && (a = n, o = r);
        return a
    }

    function ne(e) {
        return Y(e), e.progress() < 1 && wt(e, "onInterrupt"), e
    }

    function re(e, t, i) {
        return (6 * (e = e < 0 ? e + 1 : 1 < e ? e - 1 : e) < 1 ? t + (i - t) * e * 6 : e < .5 ? i : 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * bt + .5 | 0
    }

    function ae(e, t, i) {
        var n, r, a, s, o, l, c, u, d, h, p = e ? k(e) ? [e >> 16, e >> 8 & bt, e & bt] : 0 : Tt.black;
        if (!p) {
            if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Tt[e]) p = Tt[e];
            else if ("#" === e.charAt(0)) 4 === e.length && (e = "#" + (n = e.charAt(1)) + n + (r = e.charAt(2)) + r + (a = e.charAt(3)) + a), p = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & bt, e & bt];
            else if ("hsl" === e.substr(0, 3))
                if (p = h = e.match(Qe), t) {
                    if (~e.indexOf("=")) return p = e.match(Ke), i && p.length < 4 && (p[3] = 1), p
                } else s = +p[0] % 360 / 360, o = p[1] / 100, n = 2 * (l = p[2] / 100) - (r = l <= .5 ? l * (o + 1) : l + o - l * o), 3 < p.length && (p[3] *= 1), p[0] = re(s + 1 / 3, n, r), p[1] = re(s, n, r), p[2] = re(s - 1 / 3, n, r);
            else p = e.match(Qe) || Tt.transparent;
            p = p.map(Number)
        }
        return t && !h && (n = p[0] / bt, r = p[1] / bt, a = p[2] / bt, l = ((c = Math.max(n, r, a)) + (u = Math.min(n, r, a))) / 2, c === u ? s = o = 0 : (d = c - u, o = .5 < l ? d / (2 - c - u) : d / (c + u), s = c === n ? (r - a) / d + (r < a ? 6 : 0) : c === r ? (a - n) / d + 2 : (n - r) / d + 4, s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * l + .5)), i && p.length < 4 && (p[3] = 1), p
    }

    function se(e) {
        var i = [],
            n = [],
            r = -1;
        return e.split(_t).forEach(function(e) {
            var t = e.match(Ze) || [];
            i.push.apply(i, t), n.push(r += t.length + 1)
        }), i.c = n, i
    }

    function oe(e, t, i) {
        var n, r, a, s, o = "",
            l = (e + o).match(_t),
            c = t ? "hsla(" : "rgba(",
            u = 0;
        if (!l) return e;
        if (l = l.map(function(e) {
                return (e = ae(e, t, 1)) && c + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")"
            }), i && (a = se(e), (n = i.c).join(o) !== a.c.join(o)))
            for (s = (r = e.replace(_t, "1").split(Ze)).length - 1; u < s; u++) o += r[u] + (~n.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (a.length ? a : l.length ? l : i).shift());
        if (!r)
            for (s = (r = e.split(_t)).length - 1; u < s; u++) o += r[u] + l[u];
        return o + r[s]
    }

    function le(e) {
        var t, i = e.join(" ");
        if (_t.lastIndex = 0, _t.test(i)) return t = xt.test(i), e[1] = oe(e[1], t), e[0] = oe(e[0], t, se(e[1])), !0
    }

    function ce(e) {
        var t, i, n, r, a = (e + "").split("("),
            s = Ct[a[0]];
        return s && 1 < a.length && s.config ? s.config.apply(null, ~e.indexOf("{") ? [function(e) {
            for (var t, i, n, r = {}, a = e.substr(1, e.length - 3).split(":"), s = a[0], o = 1, l = a.length; o < l; o++) i = a[o], t = o !== l - 1 ? i.lastIndexOf(",") : i.length, n = i.substr(0, t), r[s] = isNaN(n) ? n.replace(Mt, "").trim() : +n, s = i.substr(t + 1).trim();
            return r
        }(a[1])] : (i = (t = e).indexOf("(") + 1, n = t.indexOf(")"), r = t.indexOf("(", i), t.substring(i, ~r && r < n ? t.indexOf(")", n + 1) : n).split(",").map(u))) : Ct._CE && kt.test(e) ? Ct._CE("", e) : s
    }

    function ue(e, t) {
        for (var i, n = e._first; n;) n instanceof Nt ? ue(n, t) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === t || (n.timeline ? ue(n.timeline, t) : (i = n._ease, n._ease = n._yEase, n._yEase = i, n._yoyo = t)), n = n._next
    }

    function de(e, t, i, n) {
        void 0 === i && (i = function(e) {
            return 1 - t(1 - e)
        }), void 0 === n && (n = function(e) {
            return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2
        });
        var r, a = {
            easeIn: t,
            easeOut: i,
            easeInOut: n
        };
        return f(e, function(e) {
            for (var t in Ct[e] = it[e] = a, Ct[r = e.toLowerCase()] = i, a) Ct[r + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Ct[e + "." + t] = a[t]
        }), 1
    }

    function he(t) {
        return function(e) {
            return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
        }
    }

    function pe(i, e, t) {
        function n(e) {
            return 1 === e ? 1 : r * Math.pow(2, -10 * e) * Xe((e - a) * o) + 1
        }
        var r = 1 <= e ? e : 1,
            a = (o = (t || (i ? .3 : .45)) / (e < 1 ? e : 1)) / He * (Math.asin(1 / r) || 0),
            s = "out" === i ? n : "in" === i ? function(e) {
                return 1 - n(1 - e)
            } : he(n),
            o = He / o;
        return s.config = function(e, t) {
            return pe(i, e, t)
        }, s
    }

    function fe(t, i) {
        function n(e) {
            return e ? --e * e * ((i + 1) * e + i) + 1 : 0
        }
        void 0 === i && (i = 1.70158);
        var e = "out" === t ? n : "in" === t ? function(e) {
            return 1 - n(1 - e)
        } : he(n);
        return e.config = function(e) {
            return fe(t, e)
        }, e
    }
    var me, ge, ve, ye, we, be, Te, _e, xe, Ee, Se, Ce, ke, Me, ze, Oe, Pe, Le, Ae, De, Ie, Be, Ne, Re = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        Fe = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        $e = 1e8,
        je = 1e-8,
        He = 2 * Math.PI,
        We = He / 4,
        Ye = 0,
        qe = Math.sqrt,
        Ve = Math.cos,
        Xe = Math.sin,
        Ge = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
        Ue = Array.isArray,
        Qe = /(?:-?\.?\d|\.)+/gi,
        Ke = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
        Ze = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        Je = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
        et = /[+-]=-?[\.\d]+/,
        tt = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
        it = {},
        nt = {},
        rt = {},
        at = [],
        st = {},
        ot = {},
        lt = {},
        ct = 30,
        ut = [],
        dt = "",
        ht = function(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        },
        pt = function(e, t) {
            return (e /= t) && ~~e === e ? ~~e - 1 : ~~e
        },
        ft = {
            _start: 0,
            endTime: P
        },
        mt = function(e, t, i) {
            return i < e ? e : t < i ? t : i
        },
        gt = [].slice,
        vt = function(e, t) {
            return !R(e) || t || !ve && St() ? Ue(e) ? (i = t, void 0 === n && (n = []), e.forEach(function(e) {
                return R(e) && !i || G(e, 1) ? n.push.apply(n, vt(e)) : n.push(e)
            }) || n) : G(e) ? gt.call(e, 0) : e ? [e] : [] : gt.call(ye.querySelectorAll(e), 0);
            var i, n
        },
        yt = function(t, e, i, n, r) {
            var a = e - t,
                s = n - i;
            return V(r, function(e) {
                return i + ((e - t) / a * s || 0)
            })
        },
        wt = function(e, t, i) {
            var n, r, a = e.vars,
                s = a[t];
            if (s) return n = a[t + "Params"], r = a.callbackScope || e, i && at.length && j(), n ? s.apply(r, n) : s.call(r)
        },
        bt = 255,
        Tt = {
            aqua: [0, bt, bt],
            lime: [0, bt, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, bt],
            navy: [0, 0, 128],
            white: [bt, bt, bt],
            olive: [128, 128, 0],
            yellow: [bt, bt, 0],
            orange: [bt, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [bt, 0, 0],
            pink: [bt, 192, 203],
            cyan: [0, bt, bt],
            transparent: [bt, bt, bt, 0]
        },
        _t = function() {
            var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (e in Tt) t += "|" + e + "\\b";
            return new RegExp(t + ")", "gi")
        }(),
        xt = /hsl[a]?\(/,
        Et = (Me = Date.now, ze = 500, Oe = 33, Pe = Me(), Le = Pe, De = Ae = 1e3 / 240, Be = {
            time: 0,
            frame: 0,
            tick: function() {
                Pt(!0)
            },
            deltaRatio: function(e) {
                return Ce / (1e3 / (e || 60))
            },
            wake: function() {
                we && (!ve && t() && (ge = ve = window, ye = ge.document || {}, it.gsap = ui, (ge.gsapVersions || (ge.gsapVersions = [])).push(ui.version), n(nt || ge.GreenSockGlobals || !ge.gsap && ge || {}), Se = ge.requestAnimationFrame), xe && Be.sleep(), Ee = Se || function(e) {
                    return setTimeout(e, De - 1e3 * Be.time + 1 | 0)
                }, _e = 1, Pt(2))
            },
            sleep: function() {
                (Se ? ge.cancelAnimationFrame : clearTimeout)(xe), _e = 0, Ee = P
            },
            lagSmoothing: function(e, t) {
                ze = e || 1e8, Oe = Math.min(t, ze, 0)
            },
            fps: function(e) {
                Ae = 1e3 / (e || 240), De = 1e3 * Be.time + Ae
            },
            add: function(e) {
                Ie.indexOf(e) < 0 && Ie.push(e), St()
            },
            remove: function(e) {
                var t;
                ~(t = Ie.indexOf(e)) && Ie.splice(t, 1) && t <= ke && ke--
            },
            _listeners: Ie = []
        }),
        St = function() {
            return !_e && Et.wake()
        },
        Ct = {},
        kt = /^[\d.\-M][\d.\-,\s]/,
        Mt = /["']/g,
        zt = function(t) {
            return function(e) {
                return 1 - t(1 - e)
            }
        },
        Ot = function(e, t) {
            return e && (p(e) ? e : Ct[e] || ce(e)) || t
        };

    function Pt(e) {
        var t, i, n, r, a = Me() - Le,
            s = !0 === e;
        if (ze < a && (Pe += a - Oe), (0 < (t = (n = (Le += a) - Pe) - De) || s) && (r = ++Be.frame, Ce = n - 1e3 * Be.time, Be.time = n /= 1e3, De += t + (Ae <= t ? 4 : Ae - t), i = 1), s || (xe = Ee(Pt)), i)
            for (ke = 0; ke < Ie.length; ke++) Ie[ke](n, Ce, r, e)
    }

    function Lt(e) {
        return e < 1 / 2.75 ? Ne * e * e : e < 1 / 2.75 * 2 ? Ne * Math.pow(e - 1.5 / 2.75, 2) + .75 : e < 1 / 2.75 * 2.5 ? Ne * (e -= 2.25 / 2.75) * e + .9375 : Ne * Math.pow(e - 2.625 / 2.75, 2) + .984375
    }
    f("Linear,Quad,Cubic,Quart,Quint,Strong", function(e, t) {
        var i = t < 5 ? t + 1 : t;
        de(e + ",Power" + (i - 1), t ? function(e) {
            return Math.pow(e, i)
        } : function(e) {
            return e
        }, function(e) {
            return 1 - Math.pow(1 - e, i)
        }, function(e) {
            return e < .5 ? Math.pow(2 * e, i) / 2 : 1 - Math.pow(2 * (1 - e), i) / 2
        })
    }), Ct.Linear.easeNone = Ct.none = Ct.Linear.easeIn, de("Elastic", pe("in"), pe("out"), pe()), Ne = 7.5625, de("Bounce", function(e) {
        return 1 - Lt(1 - e)
    }, Lt), de("Expo", function(e) {
        return e ? Math.pow(2, 10 * (e - 1)) : 0
    }), de("Circ", function(e) {
        return -(qe(1 - e * e) - 1)
    }), de("Sine", function(e) {
        return 1 === e ? 1 : 1 - Ve(e * We)
    }), de("Back", fe("in"), fe("out"), fe()), Ct.SteppedEase = Ct.steps = it.SteppedEase = {
        config: function(e, t) {
            void 0 === e && (e = 1);
            var i = 1 / e,
                n = e + (t ? 0 : 1),
                r = t ? 1 : 0;
            return function(e) {
                return ((n * mt(0, .99999999, e) | 0) + r) * i
            }
        }
    }, Fe.ease = Ct["quad.out"], f("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(e) {
        return dt += e + "," + e + "Params,"
    });
    var At, Dt = function(e, t) {
            this.id = Ye++, (e._gsap = this).target = e, this.harness = t, this.get = t ? t.get : a, this.set = t ? t.getSetter : Kt
        },
        It = ((At = Bt.prototype).delay = function(e) {
            return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay
        }, At.duration = function(e) {
            return arguments.length ? this.totalDuration(0 < this._repeat ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur
        }, At.totalDuration = function(e) {
            return arguments.length ? (this._dirty = 0, E(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, At.totalTime = function(e, t) {
            if (St(), !arguments.length) return this._tTime;
            var i = this._dp;
            if (i && i.smoothChildTiming && this._ts) {
                for (b(this, e); i.parent;) i.parent._time !== i._start + (0 <= i._ts ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), i = i.parent;
                !this.parent && this._dp.autoRemoveChildren && (0 < this._ts && e < this._tDur || this._ts < 0 && 0 < e || !this._tDur && !e) && T(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === je || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), c(this, e, t)), this
        }, At.time = function(e, t) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + y(this)) % this._dur || (e ? this._dur : 0), t) : this._time
        }, At.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
        }, At.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + y(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
        }, At.iteration = function(e, t) {
            var i = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (e - 1) * i, t) : this._repeat ? pt(this._tTime, i) + 1 : 1
        }, At.timeScale = function(e) {
            if (!arguments.length) return this._rts === -je ? 0 : this._rts;
            if (this._rts === e) return this;
            var t = this.parent && this._ts ? w(this.parent._time, this) : this._tTime;
            return this._rts = +e || 0, this._ts = this._ps || e === -je ? 0 : this._rts,
                function(e) {
                    for (var t = e.parent; t && t.parent;) t._dirty = 1, t.totalDuration(), t = t.parent;
                    return e
                }(this.totalTime(mt(-this._delay, this._tDur, t), !0))
        }, At.paused = function(e) {
            return arguments.length ? (this._ps !== e && ((this._ps = e) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (St(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= je) && Math.abs(this._zTime) !== je))), this) : this._ps
        }, At.startTime = function(e) {
            if (arguments.length) {
                this._start = e;
                var t = this.parent || this._dp;
                return !t || !t._sort && this.parent || T(t, this, e - this._delay), this
            }
            return this._start
        }, At.endTime = function(e) {
            return this._start + (I(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
        }, At.rawTime = function(e) {
            var t = this.parent || this._dp;
            return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? w(t.rawTime(e), this) : this._tTime : this._tTime
        }, At.globalTime = function(e) {
            for (var t = this, i = arguments.length ? e : t.rawTime(); t;) i = t._start + i / (t._ts || 1), t = t._dp;
            return i
        }, At.repeat = function(e) {
            return arguments.length ? (this._repeat = e, S(this)) : this._repeat
        }, At.repeatDelay = function(e) {
            return arguments.length ? (this._rDelay = e, S(this)) : this._rDelay
        }, At.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        }, At.seek = function(e, t) {
            return this.totalTime(q(this, e), I(t))
        }, At.restart = function(e, t) {
            return this.play().totalTime(e ? -this._delay : 0, I(t))
        }, At.play = function(e, t) {
            return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
        }, At.reverse = function(e, t) {
            return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
        }, At.pause = function(e, t) {
            return null != e && this.seek(e, t), this.paused(!0)
        }, At.resume = function() {
            return this.paused(!1)
        }, At.reversed = function(e) {
            return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -je : 0)), this) : this._rts < 0
        }, At.invalidate = function() {
            return this._initted = 0, this._zTime = -je, this
        }, At.isActive = function() {
            var e, t = this.parent || this._dp,
                i = this._start;
            return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= i && e < this.endTime(!0) - je))
        }, At.eventCallback = function(e, t, i) {
            var n = this.vars;
            return 1 < arguments.length ? (t ? (n[e] = t, i && (n[e + "Params"] = i), "onUpdate" === e && (this._onUpdate = t)) : delete n[e], this) : n[e]
        }, At.then = function(n) {
            var r = this;
            return new Promise(function(t) {
                function e() {
                    var e = r.then;
                    r.then = null, p(i) && (i = i(r)) && (i.then || i === r) && (r.then = e), t(i), r.then = e
                }
                var i = p(n) ? n : d;
                r._initted && 1 === r.totalProgress() && 0 <= r._ts || !r._tTime && r._ts < 0 ? e() : r._prom = e
            })
        }, At.kill = function() {
            ne(this)
        }, Bt);

    function Bt(e, t) {
        var i = e.parent || me;
        this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, E(this, +e.duration, 1, 1), this.data = e.data, _e || Et.wake(), i && T(i, this, t || 0 === t ? t : i._time, 1), e.reversed && this.reverse(), e.paused && this.paused(!0)
    }
    H(It.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -je,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Nt = function(n) {
        function e(e, t) {
            var i;
            return void 0 === e && (e = {}), (i = n.call(this, e, t) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = I(e.sortChildren), i.parent && A(i.parent, C(i)), e.scrollTrigger && D(C(i), e.scrollTrigger), i
        }
        i(e, n);
        var t = e.prototype;
        return t.to = function(e, t, i, n) {
            return new qt(e, l(arguments, 0, this), q(this, k(t) ? n : i)), this
        }, t.from = function(e, t, i, n) {
            return new qt(e, l(arguments, 1, this), q(this, k(t) ? n : i)), this
        }, t.fromTo = function(e, t, i, n, r) {
            return new qt(e, l(arguments, 2, this), q(this, k(t) ? r : n)), this
        }, t.set = function(e, t, i) {
            return t.duration = 0, t.parent = this, L(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, new qt(e, t, q(this, i), 1), this
        }, t.call = function(e, t, i) {
            return T(this, qt.delayedCall(0, e, t), q(this, i))
        }, t.staggerTo = function(e, t, i, n, r, a, s) {
            return i.duration = t, i.stagger = i.stagger || n, i.onComplete = a, i.onCompleteParams = s, i.parent = this, new qt(e, i, q(this, r)), this
        }, t.staggerFrom = function(e, t, i, n, r, a, s) {
            return i.runBackwards = 1, L(i).immediateRender = I(i.immediateRender), this.staggerTo(e, t, i, n, r, a, s)
        }, t.staggerFromTo = function(e, t, i, n, r, a, s, o) {
            return n.startAt = i, L(n).immediateRender = I(n.immediateRender), this.staggerTo(e, t, n, r, a, s, o)
        }, t.render = function(e, t, i) {
            var n, r, a, s, o, l, c, u, d, h, p, f, m = this._time,
                g = this._dirty ? this.totalDuration() : this._tDur,
                v = this._dur,
                y = this !== me && g - je < e && 0 <= e ? g : e < je ? 0 : e,
                w = this._zTime < 0 != e < 0 && (this._initted || !v);
            if (y !== this._tTime || i || w) {
                if (m !== this._time && v && (y += this._time - m, e += this._time - m), n = y, d = this._start, l = !(u = this._ts), w && (v || (m = this._zTime), !e && t || (this._zTime = e)), this._repeat && (p = this._yoyo, o = v + this._rDelay, n = $(y % o), y === g ? (s = this._repeat, n = v) : ((s = ~~(y / o)) && s === y / o && (n = v, s--), v < n && (n = v)), h = pt(this._tTime, o), !m && this._tTime && h !== s && (h = s), p && 1 & s && (n = v - n, f = 1), s !== h && !this._lock)) {
                    var b = p && 1 & h,
                        T = b === (p && 1 & s);
                    if (s < h && (b = !b), m = b ? 0 : v, this._lock = 1, this.render(m || (f ? 0 : $(s * o)), t, !v)._lock = 0, !t && this.parent && wt(this, "onRepeat"), this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1), m !== this._time || l != !this._ts) return this;
                    if (v = this._dur, g = this._tDur, T && (this._lock = 2, m = b ? v : -1e-4, this.render(m, !0), this.vars.repeatRefresh && !f && this.invalidate()), this._lock = 0, !this._ts && !l) return this;
                    ue(this, f)
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (c = function(e, t, i) {
                        var n;
                        if (t < i)
                            for (n = e._first; n && n._start <= i;) {
                                if (!n._dur && "isPause" === n.data && n._start > t) return n;
                                n = n._next
                            } else
                                for (n = e._last; n && n._start >= i;) {
                                    if (!n._dur && "isPause" === n.data && n._start < t) return n;
                                    n = n._prev
                                }
                    }(this, $(m), $(n))) && (y -= n - (n = c._start)), this._tTime = y, this._time = n, this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = e), m || !n || t || wt(this, "onStart"), m <= n && 0 <= e)
                    for (r = this._first; r;) {
                        if (a = r._next, (r._act || n >= r._start) && r._ts && c !== r) {
                            if (r.parent !== this) return this.render(e, t, i);
                            if (r.render(0 < r._ts ? (n - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (n - r._start) * r._ts, t, i), n !== this._time || !this._ts && !l) {
                                c = 0, a && (y += this._zTime = -je);
                                break
                            }
                        }
                        r = a
                    } else {
                        r = this._last;
                        for (var _ = e < 0 ? e : n; r;) {
                            if (a = r._prev, (r._act || _ <= r._end) && r._ts && c !== r) {
                                if (r.parent !== this) return this.render(e, t, i);
                                if (r.render(0 < r._ts ? (_ - r._start) * r._ts : (r._dirty ? r.totalDuration() : r._tDur) + (_ - r._start) * r._ts, t, i), n !== this._time || !this._ts && !l) {
                                    c = 0, a && (y += this._zTime = _ ? -je : je);
                                    break
                                }
                            }
                            r = a
                        }
                    }
                if (c && !t && (this.pause(), c.render(m <= n ? 0 : -je)._zTime = m <= n ? 1 : -1, this._ts)) return this._start = d, x(this), this.render(e, t, i);
                this._onUpdate && !t && wt(this, "onUpdate", !0), (y === g && g >= this.totalDuration() || !y && m) && (d !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || (!e && v || !(y === g && 0 < this._ts || !y && this._ts < 0) || Y(this, 1), t || e < 0 && !m || !y && !m || (wt(this, y === g ? "onComplete" : "onReverseComplete", !0), !this._prom || y < g && 0 < this.timeScale() || this._prom())))
            }
            return this
        }, t.add = function(e, t) {
            var i = this;
            if (k(t) || (t = q(this, t)), !(e instanceof It)) {
                if (Ue(e)) return e.forEach(function(e) {
                    return i.add(e, t)
                }), this;
                if (R(e)) return this.addLabel(e, t);
                if (!p(e)) return this;
                e = qt.delayedCall(0, e)
            }
            return this !== e ? T(this, e, t) : this
        }, t.getChildren = function(e, t, i, n) {
            void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === i && (i = !0), void 0 === n && (n = -$e);
            for (var r = [], a = this._first; a;) a._start >= n && (a instanceof qt ? t && r.push(a) : (i && r.push(a), e && r.push.apply(r, a.getChildren(!0, t, i)))), a = a._next;
            return r
        }, t.getById = function(e) {
            for (var t = this.getChildren(1, 1, 1), i = t.length; i--;)
                if (t[i].vars.id === e) return t[i]
        }, t.remove = function(e) {
            return R(e) ? this.removeLabel(e) : p(e) ? this.killTweensOf(e) : (g(this, e), e === this._recent && (this._recent = this._last), v(this))
        }, t.totalTime = function(e, t) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = $(Et.time - (0 < this._ts ? e / this._ts : (this.totalDuration() - e) / -this._ts))), n.prototype.totalTime.call(this, e, t), this._forcing = 0, this) : this._tTime
        }, t.addLabel = function(e, t) {
            return this.labels[e] = q(this, t), this
        }, t.removeLabel = function(e) {
            return delete this.labels[e], this
        }, t.addPause = function(e, t, i) {
            var n = qt.delayedCall(0, t || P, i);
            return n.data = "isPause", this._hasPause = 1, T(this, n, q(this, e))
        }, t.removePause = function(e) {
            var t = this._first;
            for (e = q(this, e); t;) t._start === e && "isPause" === t.data && Y(t), t = t._next
        }, t.killTweensOf = function(e, t, i) {
            for (var n = this.getTweensOf(e, i), r = n.length; r--;) Ft !== n[r] && n[r].kill(e, t);
            return this
        }, t.getTweensOf = function(e, t) {
            for (var i, n = [], r = vt(e), a = this._first, s = k(t); a;) a instanceof qt ? o(a._targets, r) && (s ? (!Ft || a._initted && a._ts) && a.globalTime(0) <= t && a.globalTime(a.totalDuration()) > t : !t || a.isActive()) && n.push(a) : (i = a.getTweensOf(r, t)).length && n.push.apply(n, i), a = a._next;
            return n
        }, t.tweenTo = function(e, t) {
            t = t || {};
            var i = this,
                n = q(i, e),
                r = t.startAt,
                a = t.onStart,
                s = t.onStartParams,
                o = qt.to(i, H(t, {
                    ease: "none",
                    lazy: !1,
                    time: n,
                    overwrite: "auto",
                    duration: t.duration || Math.abs((n - (r && "time" in r ? r.time : i._time)) / i.timeScale()) || je,
                    onStart: function() {
                        i.pause();
                        var e = t.duration || Math.abs((n - i._time) / i.timeScale());
                        o._dur !== e && E(o, e, 0, 1).render(o._time, !0, !0), a && a.apply(o, s || [])
                    }
                }));
            return o
        }, t.tweenFromTo = function(e, t, i) {
            return this.tweenTo(t, H({
                startAt: {
                    time: q(this, e)
                }
            }, i))
        }, t.recent = function() {
            return this._recent
        }, t.nextLabel = function(e) {
            return void 0 === e && (e = this._time), ie(this, q(this, e))
        }, t.previousLabel = function(e) {
            return void 0 === e && (e = this._time), ie(this, q(this, e), 1)
        }, t.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + je)
        }, t.shiftChildren = function(e, t, i) {
            void 0 === i && (i = 0);
            for (var n, r = this._first, a = this.labels; r;) r._start >= i && (r._start += e, r._end += e), r = r._next;
            if (t)
                for (n in a) a[n] >= i && (a[n] += e);
            return v(this)
        }, t.invalidate = function() {
            var e = this._first;
            for (this._lock = 0; e;) e.invalidate(), e = e._next;
            return n.prototype.invalidate.call(this)
        }, t.clear = function(e) {
            void 0 === e && (e = !0);
            for (var t, i = this._first; i;) t = i._next, this.remove(i), i = t;
            return this._time = this._tTime = this._pTime = 0, e && (this.labels = {}), v(this)
        }, t.totalDuration = function(e) {
            var t, i, n, r = 0,
                a = this,
                s = a._last,
                o = $e;
            if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -e : e));
            if (a._dirty) {
                for (n = a.parent; s;) t = s._prev, s._dirty && s.totalDuration(), o < (i = s._start) && a._sort && s._ts && !a._lock ? (a._lock = 1, T(a, s, i - s._delay, 1)._lock = 0) : o = i, i < 0 && s._ts && (r -= i, (!n && !a._dp || n && n.smoothChildTiming) && (a._start += i / a._ts, a._time -= i, a._tTime -= i), a.shiftChildren(-i, !1, -Infinity), o = 0), s._end > r && s._ts && (r = s._end), s = t;
                E(a, a === me && a._time > r ? a._time : r, 1, 1), a._dirty = 0
            }
            return a._tDur
        }, e.updateRoot = function(e) {
            if (me._ts && (c(me, w(e, me)), be = Et.frame), Et.frame >= ct) {
                ct += Re.autoSleep || 120;
                var t = me._first;
                if ((!t || !t._ts) && Re.autoSleep && Et._listeners.length < 2) {
                    for (; t && !t._ts;) t = t._next;
                    t || Et.sleep()
                }
            }
        }, e
    }(It);
    H(Nt.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });

    function Rt(e, t, i, n, r, a) {
        var s, o, l, c;
        if (ot[e] && !1 !== (s = new ot[e]).init(r, s.rawVars ? t[e] : function(e, t, i, n, r) {
                if (p(e) && (e = Ht(e, r, t, i, n)), !M(e) || e.style && e.nodeType || Ue(e) || Ge(e)) return R(e) ? Ht(e, r, t, i, n) : e;
                var a, s = {};
                for (a in e) s[a] = Ht(e[a], r, t, i, n);
                return s
            }(t[e], n, r, a, i), i, n, a) && (i._pt = o = new ai(i._pt, r, e, 0, 1, s.render, s, 0, s.priority), i !== Te))
            for (l = i._ptLookup[i._targets.indexOf(r)], c = s._props.length; c--;) l[s._props[c]] = o;
        return s
    }
    var Ft, $t = function(e, t, i, n, r, a, s, o, l) {
            p(n) && (n = n(r || 0, e, a));
            var c, u = e[t],
                d = "get" !== i ? i : p(u) ? l ? e[t.indexOf("set") || !p(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : u,
                h = p(u) ? l ? Qt : Ut : Gt;
            if (R(n) && (~n.indexOf("random(") && (n = te(n)), "=" === n.charAt(1) && (n = parseFloat(d) + parseFloat(n.substr(2)) * ("-" === n.charAt(0) ? -1 : 1) + (X(d) || 0))), d !== n) return isNaN(d * n) ? (u || t in e || F(t, n), function(e, t, i, n, r, a, s) {
                var o, l, c, u, d, h, p, f, m = new ai(this._pt, e, t, 0, 1, ei, null, r),
                    g = 0,
                    v = 0;
                for (m.b = i, m.e = n, i += "", (p = ~(n += "").indexOf("random(")) && (n = te(n)), a && (a(f = [i, n], e, t), i = f[0], n = f[1]), l = i.match(Je) || []; o = Je.exec(n);) u = o[0], d = n.substring(g, o.index), c ? c = (c + 1) % 5 : "rgba(" === d.substr(-5) && (c = 1), u !== l[v++] && (h = parseFloat(l[v - 1]) || 0, m._pt = {
                    _next: m._pt,
                    p: d || 1 === v ? d : ",",
                    s: h,
                    c: "=" === u.charAt(1) ? parseFloat(u.substr(2)) * ("-" === u.charAt(0) ? -1 : 1) : parseFloat(u) - h,
                    m: c && c < 4 ? Math.round : 0
                }, g = Je.lastIndex);
                return m.c = g < n.length ? n.substring(g, n.length) : "", m.fp = s, (et.test(n) || p) && (m.e = 0), this._pt = m
            }.call(this, e, t, d, n, h, o || Re.stringFilter, l)) : (c = new ai(this._pt, e, t, +d || 0, n - (d || 0), "boolean" == typeof u ? Jt : Zt, 0, h), l && (c.fp = l), s && c.modifier(s, this, e), this._pt = c)
        },
        jt = function e(t, i) {
            var n, r, a, s, o, l, c, u, d, h, p, f, m, g = t.vars,
                v = g.ease,
                y = g.startAt,
                w = g.immediateRender,
                b = g.lazy,
                T = g.onUpdate,
                _ = g.onUpdateParams,
                x = g.callbackScope,
                E = g.runBackwards,
                S = g.yoyoEase,
                C = g.keyframes,
                k = g.autoRevert,
                M = t._dur,
                z = t._startAt,
                O = t._targets,
                P = t.parent,
                L = P && "nested" === P.data ? P.parent._targets : O,
                A = "auto" === t._overwrite,
                D = t.timeline;
            if (!D || C && v || (v = "none"), t._ease = Ot(v, Fe.ease), t._yEase = S ? zt(Ot(!0 === S ? v : S, Fe.ease)) : 0, S && t._yoyo && !t._repeat && (S = t._yEase, t._yEase = t._ease, t._ease = S), !D) {
                if (f = (u = O[0] ? N(O[0]).harness : 0) && g[u.prop], n = W(g, rt), z && z.render(-1, !0).kill(), y) {
                    if (Y(t._startAt = qt.set(O, H({
                            data: "isStart",
                            overwrite: !1,
                            parent: P,
                            immediateRender: !0,
                            lazy: I(b),
                            startAt: null,
                            delay: 0,
                            onUpdate: T,
                            onUpdateParams: _,
                            callbackScope: x,
                            stagger: 0
                        }, y))), w)
                        if (0 < i) k || (t._startAt = 0);
                        else if (M && !(i < 0 && z)) return void(i && (t._zTime = i))
                } else if (E && M)
                    if (z) k || (t._startAt = 0);
                    else if (i && (w = !1), a = H({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: w && I(b),
                        immediateRender: w,
                        stagger: 0,
                        parent: P
                    }, n), f && (a[u.prop] = f), Y(t._startAt = qt.set(O, a)), w) {
                    if (!i) return
                } else e(t._startAt, je);
                for (t._pt = 0, b = M && I(b) || b && !M, r = 0; r < O.length; r++) {
                    if (c = (o = O[r])._gsap || B(O)[r]._gsap, t._ptLookup[r] = h = {}, st[c.id] && at.length && j(), p = L === O ? r : L.indexOf(o), u && !1 !== (d = new u).init(o, f || n, t, p, L) && (t._pt = s = new ai(t._pt, o, d.name, 0, 1, d.render, d, 0, d.priority), d._props.forEach(function(e) {
                            h[e] = s
                        }), d.priority && (l = 1)), !u || f)
                        for (a in n) ot[a] && (d = Rt(a, n, t, p, o, L)) ? d.priority && (l = 1) : h[a] = s = $t.call(t, o, a, "get", n[a], p, L, 0, g.stringFilter);
                    t._op && t._op[r] && t.kill(o, t._op[r]), A && t._pt && (Ft = t, me.killTweensOf(o, h, t.globalTime(0)), m = !t.parent, Ft = 0), t._pt && b && (st[c.id] = 1)
                }
                l && ri(t), t._onInit && t._onInit(t)
            }
            t._from = !D && !!g.runBackwards, t._onUpdate = T, t._initted = (!t._op || t._pt) && !m
        },
        Ht = function(e, t, i, n, r) {
            return p(e) ? e.call(t, i, n, r) : R(e) && ~e.indexOf("random(") ? te(e) : e
        },
        Wt = dt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        Yt = (Wt + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
        qt = function(S) {
            function r(e, t, i, n) {
                var r;
                "number" == typeof t && (i.duration = t, t = i, i = null);
                var a, s, o, l, c, u, d, h, p = (r = S.call(this, n ? t : L(t), i) || this).vars,
                    f = p.duration,
                    m = p.delay,
                    g = p.immediateRender,
                    v = p.stagger,
                    y = p.overwrite,
                    w = p.keyframes,
                    b = p.defaults,
                    T = p.scrollTrigger,
                    _ = p.yoyoEase,
                    x = r.parent,
                    E = (Ue(e) || Ge(e) ? k(e[0]) : "length" in t) ? [e] : vt(e);
                if (r._targets = E.length ? B(E) : O("GSAP target " + e + " not found. https://greensock.com", !Re.nullTargetWarn) || [], r._ptLookup = [], r._overwrite = y, w || v || z(f) || z(m)) {
                    if (t = r.vars, (a = r.timeline = new Nt({
                            data: "nested",
                            defaults: b || {}
                        })).kill(), a.parent = C(r), w) H(a.vars.defaults, {
                        ease: "none"
                    }), w.forEach(function(e) {
                        return a.to(E, e, ">")
                    });
                    else {
                        if (l = E.length, d = v ? Q(v) : P, M(v))
                            for (c in v) ~Wt.indexOf(c) && ((h = h || {})[c] = v[c]);
                        for (s = 0; s < l; s++) {
                            for (c in o = {}, t) Yt.indexOf(c) < 0 && (o[c] = t[c]);
                            o.stagger = 0, _ && (o.yoyoEase = _), h && ht(o, h), u = E[s], o.duration = +Ht(f, C(r), s, u, E), o.delay = (+Ht(m, C(r), s, u, E) || 0) - r._delay, !v && 1 === l && o.delay && (r._delay = m = o.delay, r._start += m, o.delay = 0), a.to(u, o, d(s, u, E))
                        }
                        a.duration() ? f = m = 0 : r.timeline = 0
                    }
                    f || r.duration(f = a.duration())
                } else r.timeline = 0;
                return !0 === y && (Ft = C(r), me.killTweensOf(E), Ft = 0), x && A(x, C(r)), (g || !f && !w && r._start === $(x._time) && I(g) && function e(t) {
                    return !t || t._ts && e(t.parent)
                }(C(r)) && "nested" !== x.data) && (r._tTime = -je, r.render(Math.max(0, -m))), T && D(C(r), T), r
            }
            i(r, S);
            var e = r.prototype;
            return e.render = function(e, t, i) {
                var n, r, a, s, o, l, c, u, d, h = this._time,
                    p = this._tDur,
                    f = this._dur,
                    m = p - je < e && 0 <= e ? p : e < je ? 0 : e;
                if (f) {
                    if (m !== this._tTime || !e || i || this._startAt && this._zTime < 0 != e < 0) {
                        if (n = m, u = this.timeline, this._repeat) {
                            if (s = f + this._rDelay, n = $(m % s), m === p ? (a = this._repeat, n = f) : ((a = ~~(m / s)) && a === m / s && (n = f, a--), f < n && (n = f)), (l = this._yoyo && 1 & a) && (d = this._yEase, n = f - n), o = pt(this._tTime, s), n === h && !i && this._initted) return this;
                            a !== o && (u && this._yEase && ue(u, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = i = 1, this.render($(s * a), !0).invalidate()._lock = 0))
                        }
                        if (!this._initted) {
                            if (_(this, e < 0 ? e : n, i, t)) return this._tTime = 0, this;
                            if (f !== this._dur) return this.render(e, t, i)
                        }
                        for (this._tTime = m, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = c = (d || this._ease)(n / f), this._from && (this.ratio = c = 1 - c), !n || h || t || wt(this, "onStart"), r = this._pt; r;) r.r(c, r.d), r = r._next;
                        u && u.render(e < 0 ? e : !n && l ? -je : u._dur * c, t, i) || this._startAt && (this._zTime = e), this._onUpdate && !t && (e < 0 && this._startAt && this._startAt.render(e, !0, i), wt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !t && this.parent && wt(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (e < 0 && this._startAt && !this._onUpdate && this._startAt.render(e, !0, !0), !e && f || !(m === this._tDur && 0 < this._ts || !m && this._ts < 0) || Y(this, 1), t || e < 0 && !h || !m && !h || (wt(this, m === p ? "onComplete" : "onReverseComplete", !0), !this._prom || m < p && 0 < this.timeScale() || this._prom()))
                    }
                } else ! function(e, t, i, n) {
                    var r, a, s = e.ratio,
                        o = t < 0 || !t && s && !e._start && e._zTime > je && !e._dp._lock || (e._ts < 0 || e._dp._ts < 0) && "isFromStart" !== e.data && "isStart" !== e.data ? 0 : 1,
                        l = e._rDelay,
                        c = 0;
                    if (l && e._repeat && (c = mt(0, e._tDur, t), pt(c, l) !== (a = pt(e._tTime, l)) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || n || e._zTime === je || !t && e._zTime) {
                        if (!e._initted && _(e, t, n, i)) return;
                        for (a = e._zTime, e._zTime = t || (i ? je : 0), i = i || t && !a, e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = c, i || wt(e, "onStart"), r = e._pt; r;) r.r(o, r.d), r = r._next;
                        e._startAt && t < 0 && e._startAt.render(t, !0, !0), e._onUpdate && !i && wt(e, "onUpdate"), c && e._repeat && !i && e.parent && wt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && Y(e, 1), i || (wt(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()))
                    } else e._zTime || (e._zTime = t)
                }(this, e, t, i);
                return this
            }, e.targets = function() {
                return this._targets
            }, e.invalidate = function() {
                return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), S.prototype.invalidate.call(this)
            }, e.kill = function(e, t) {
                if (void 0 === t && (t = "all"), !(e || t && "all" !== t) && (this._lazy = 0, this.parent)) return ne(this);
                if (this.timeline) {
                    var i = this.timeline.totalDuration();
                    return this.timeline.killTweensOf(e, t, Ft && !0 !== Ft.vars.overwrite)._first || ne(this), this.parent && i !== this.timeline.totalDuration() && E(this, this._dur * this.timeline._tDur / i, 0, 1), this
                }
                var n, r, a, s, o, l, c, u = this._targets,
                    d = e ? vt(e) : u,
                    h = this._ptLookup,
                    p = this._pt;
                if ((!t || "all" === t) && function(e, t) {
                        for (var i = e.length, n = i === t.length; n && i-- && e[i] === t[i];);
                        return i < 0
                    }(u, d)) return "all" === t && (this._pt = 0), ne(this);
                for (n = this._op = this._op || [], "all" !== t && (R(t) && (o = {}, f(t, function(e) {
                        return o[e] = 1
                    }), t = o), t = function(e, t) {
                        var i, n, r, a, s = e[0] ? N(e[0]).harness : 0,
                            o = s && s.aliases;
                        if (!o) return t;
                        for (n in i = ht({}, t), o)
                            if (n in i)
                                for (r = (a = o[n].split(",")).length; r--;) i[a[r]] = i[n];
                        return i
                    }(u, t)), c = u.length; c--;)
                    if (~d.indexOf(u[c]))
                        for (o in r = h[c], "all" === t ? (n[c] = t, s = r, a = {}) : (a = n[c] = n[c] || {}, s = t), s)(l = r && r[o]) && ("kill" in l.d && !0 !== l.d.kill(o) || g(this, l, "_pt"), delete r[o]), "all" !== a && (a[o] = 1);
                return this._initted && !this._pt && p && ne(this), this
            }, r.to = function(e, t, i) {
                return new r(e, t, i)
            }, r.from = function(e, t) {
                return new r(e, l(arguments, 1))
            }, r.delayedCall = function(e, t, i, n) {
                return new r(t, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: e,
                    onComplete: t,
                    onReverseComplete: t,
                    onCompleteParams: i,
                    onReverseCompleteParams: i,
                    callbackScope: n
                })
            }, r.fromTo = function(e, t, i) {
                return new r(e, l(arguments, 2))
            }, r.set = function(e, t) {
                return t.duration = 0, t.repeatDelay || (t.repeat = 0), new r(e, t)
            }, r.killTweensOf = function(e, t, i) {
                return me.killTweensOf(e, t, i)
            }, r
        }(It);
    H(qt.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), f("staggerTo,staggerFrom,staggerFromTo", function(i) {
        qt[i] = function() {
            var e = new Nt,
                t = gt.call(arguments, 0);
            return t.splice("staggerFromTo" === i ? 5 : 4, 0, 0), e[i].apply(e, t)
        }
    });

    function Vt(e, t, i) {
        return e.setAttribute(t, i)
    }

    function Xt(e, t, i, n) {
        n.mSet(e, t, n.m.call(n.tween, i, n.mt), n)
    }
    var Gt = function(e, t, i) {
            return e[t] = i
        },
        Ut = function(e, t, i) {
            return e[t](i)
        },
        Qt = function(e, t, i, n) {
            return e[t](n.fp, i)
        },
        Kt = function(e, t) {
            return p(e[t]) ? Ut : r(e[t]) && e.setAttribute ? Vt : Gt
        },
        Zt = function(e, t) {
            return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4, t)
        },
        Jt = function(e, t) {
            return t.set(t.t, t.p, !!(t.s + t.c * e), t)
        },
        ei = function(e, t) {
            var i = t._pt,
                n = "";
            if (!e && t.b) n = t.b;
            else if (1 === e && t.e) n = t.e;
            else {
                for (; i;) n = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round(1e4 * (i.s + i.c * e)) / 1e4) + n, i = i._next;
                n += t.c
            }
            t.set(t.t, t.p, n, t)
        },
        ti = function(e, t) {
            for (var i = t._pt; i;) i.r(e, i.d), i = i._next
        },
        ii = function(e, t, i, n) {
            for (var r, a = this._pt; a;) r = a._next, a.p === n && a.modifier(e, t, i), a = r
        },
        ni = function(e) {
            for (var t, i, n = this._pt; n;) i = n._next, n.p === e && !n.op || n.op === e ? g(this, n, "_pt") : n.dep || (t = 1), n = i;
            return !t
        },
        ri = function(e) {
            for (var t, i, n, r, a = e._pt; a;) {
                for (t = a._next, i = n; i && i.pr > a.pr;) i = i._next;
                (a._prev = i ? i._prev : r) ? a._prev._next = a: n = a, (a._next = i) ? i._prev = a : r = a, a = t
            }
            e._pt = n
        },
        ai = (si.prototype.modifier = function(e, t, i) {
            this.mSet = this.mSet || this.set, this.set = Xt, this.m = e, this.mt = i, this.tween = t
        }, si);

    function si(e, t, i, n, r, a, s, o, l) {
        this.t = t, this.s = n, this.c = r, this.p = i, this.r = a || Zt, this.d = s || this, this.set = o || Gt, this.pr = l || 0, (this._next = e) && (e._prev = this)
    }
    f(dt + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(e) {
        return rt[e] = 1
    }), it.TweenMax = it.TweenLite = qt, it.TimelineLite = it.TimelineMax = Nt, me = new Nt({
        sortChildren: !1,
        defaults: Fe,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), Re.stringFilter = le;
    var oi = {
        registerPlugin: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            t.forEach(function(e) {
                var t = (e = !e.name && e.default || e).name,
                    i = p(e),
                    n = t && !i && e.init ? function() {
                        this._props = []
                    } : e,
                    r = {
                        init: P,
                        render: ti,
                        add: $t,
                        kill: ni,
                        modifier: ii,
                        rawVars: 0
                    },
                    a = {
                        targetTest: 0,
                        get: 0,
                        getSetter: Kt,
                        aliases: {},
                        register: 0
                    };
                if (St(), e !== n) {
                    if (ot[t]) return;
                    H(n, H(W(e, r), a)), ht(n.prototype, ht(r, W(e, a))), ot[n.prop = t] = n, e.targetTest && (ut.push(n), rt[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
                }
                s(t, n), e.register && e.register(ui, n, ai)
            })
        },
        timeline: function(e) {
            return new Nt(e)
        },
        getTweensOf: function(e, t) {
            return me.getTweensOf(e, t)
        },
        getProperty: function(n, e, t, i) {
            R(n) && (n = vt(n)[0]);
            var r = N(n || {}).get,
                a = t ? d : u;
            return "native" === t && (t = ""), n ? e ? a((ot[e] && ot[e].get || r)(n, e, t, i)) : function(e, t, i) {
                return a((ot[e] && ot[e].get || r)(n, e, t, i))
            } : n
        },
        quickSetter: function(i, t, n) {
            if (1 < (i = vt(i)).length) {
                var r = i.map(function(e) {
                        return ui.quickSetter(e, t, n)
                    }),
                    a = r.length;
                return function(e) {
                    for (var t = a; t--;) r[t](e)
                }
            }
            i = i[0] || {};
            var s = ot[t],
                o = N(i),
                l = o.harness && (o.harness.aliases || {})[t] || t,
                c = s ? function(e) {
                    var t = new s;
                    Te._pt = 0, t.init(i, n ? e + n : e, Te, 0, [i]), t.render(1, t), Te._pt && ti(1, Te)
                } : o.set(i, l);
            return s ? c : function(e) {
                return c(i, l, n ? e + n : e, o, 1)
            }
        },
        isTweening: function(e) {
            return 0 < me.getTweensOf(e, !0).length
        },
        defaults: function(e) {
            return e && e.ease && (e.ease = Ot(e.ease, Fe.ease)), m(Fe, e || {})
        },
        config: function(e) {
            return m(Re, e || {})
        },
        registerEffect: function(e) {
            var n = e.name,
                r = e.effect,
                t = e.plugins,
                a = e.defaults,
                i = e.extendTimeline;
            (t || "").split(",").forEach(function(e) {
                return e && !ot[e] && !it[e] && O(n + " effect requires " + e + " plugin.")
            }), lt[n] = function(e, t, i) {
                return r(vt(e), H(t || {}, a), i)
            }, i && (Nt.prototype[n] = function(e, t, i) {
                return this.add(lt[n](e, M(t) ? t : (i = t) && {}, this), i)
            })
        },
        registerEase: function(e, t) {
            Ct[e] = Ot(t)
        },
        parseEase: function(e, t) {
            return arguments.length ? Ot(e, t) : Ct
        },
        getById: function(e) {
            return me.getById(e)
        },
        exportRoot: function(e, t) {
            void 0 === e && (e = {});
            var i, n, r = new Nt(e);
            for (r.smoothChildTiming = I(e.smoothChildTiming), me.remove(r), r._dp = 0, r._time = r._tTime = me._time, i = me._first; i;) n = i._next, !t && !i._dur && i instanceof qt && i.vars.onComplete === i._targets[0] || T(r, i, i._start - i._delay), i = n;
            return T(me, r, 0), r
        },
        utils: {
            wrap: function e(t, i, n) {
                var r = i - t;
                return Ue(t) ? ee(t, e(0, t.length), i) : V(n, function(e) {
                    return (r + (e - t) % r) % r + t
                })
            },
            wrapYoyo: function e(t, i, n) {
                var r = i - t,
                    a = 2 * r;
                return Ue(t) ? ee(t, e(0, t.length - 1), i) : V(n, function(e) {
                    return t + (r < (e = (a + (e - t) % a) % a || 0) ? a - e : e)
                })
            },
            distribute: Q,
            random: J,
            snap: Z,
            normalize: function(e, t, i) {
                return yt(e, t, 0, 1, i)
            },
            getUnit: X,
            clamp: function(t, i, e) {
                return V(e, function(e) {
                    return mt(t, i, e)
                })
            },
            splitColor: ae,
            toArray: vt,
            mapRange: yt,
            pipe: function() {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return function(e) {
                    return t.reduce(function(e, t) {
                        return t(e)
                    }, e)
                }
            },
            unitize: function(t, i) {
                return function(e) {
                    return t(parseFloat(e)) + (i || X(e))
                }
            },
            interpolate: function e(t, i, n, r) {
                var a = isNaN(t + i) ? 0 : function(e) {
                    return (1 - e) * t + e * i
                };
                if (!a) {
                    var s, o, l, c, u, d = R(t),
                        h = {};
                    if (!0 === n && (r = 1) && (n = null), d) t = {
                        p: t
                    }, i = {
                        p: i
                    };
                    else if (Ue(t) && !Ue(i)) {
                        for (l = [], c = t.length, u = c - 2, o = 1; o < c; o++) l.push(e(t[o - 1], t[o]));
                        c--, a = function(e) {
                            e *= c;
                            var t = Math.min(u, ~~e);
                            return l[t](e - t)
                        }, n = i
                    } else r || (t = ht(Ue(t) ? [] : {}, t));
                    if (!l) {
                        for (s in i) $t.call(h, t, s, "get", i[s]);
                        a = function(e) {
                            return ti(e, h) || (d ? t.p : t)
                        }
                    }
                }
                return V(n, a)
            },
            shuffle: U
        },
        install: n,
        effects: lt,
        ticker: Et,
        updateRoot: Nt.updateRoot,
        plugins: ot,
        globalTimeline: me,
        core: {
            PropTween: ai,
            globals: s,
            Tween: qt,
            Timeline: Nt,
            Animation: It,
            getCache: N,
            _removeLinkedListItem: g
        }
    };
    f("to,from,fromTo,delayedCall,set,killTweensOf", function(e) {
        return oi[e] = qt[e]
    }), Et.add(Nt.updateRoot), Te = oi.to({}, {
        duration: 0
    });

    function li(e, t) {
        for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t;) i = i._next;
        return i
    }

    function ci(e, r) {
        return {
            name: e,
            rawVars: 1,
            init: function(e, n, t) {
                t._onInit = function(e) {
                    var t, i;
                    if (R(n) && (t = {}, f(n, function(e) {
                            return t[e] = 1
                        }), n = t), r) {
                        for (i in t = {}, n) t[i] = r(n[i]);
                        n = t
                    }! function(e, t) {
                        var i, n, r, a = e._targets;
                        for (i in t)
                            for (n = a.length; n--;)(r = (r = e._ptLookup[n][i]) && r.d) && (r._pt && (r = li(r, i)), r && r.modifier && r.modifier(t[i], e, a[n], i))
                    }(e, n)
                }
            }
        }
    }
    var ui = oi.registerPlugin({
        name: "attr",
        init: function(e, t, i, n, r) {
            var a, s;
            for (a in t)(s = this.add(e, "setAttribute", (e.getAttribute(a) || 0) + "", t[a], n, r, 0, 0, a)) && (s.op = a), this._props.push(a)
        }
    }, {
        name: "endArray",
        init: function(e, t) {
            for (var i = t.length; i--;) this.add(e, i, e[i] || 0, t[i])
        }
    }, ci("roundProps", K), ci("modifiers"), ci("snap", Z)) || oi;
    qt.version = Nt.version = ui.version = "3.5.1", we = 1, t() && St();

    function di(e, t) {
        return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
    }

    function hi(e, t) {
        return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t)
    }

    function pi(e, t) {
        return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t)
    }

    function fi(e, t) {
        var i = t.s + t.c * e;
        t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t)
    }

    function mi(e, t) {
        return t.set(t.t, t.p, e ? t.e : t.b, t)
    }

    function gi(e, t) {
        return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t)
    }

    function vi(e, t, i) {
        return e.style[t] = i
    }

    function yi(e, t, i) {
        return e.style.setProperty(t, i)
    }

    function wi(e, t, i) {
        return e._gsap[t] = i
    }

    function bi(e, t, i) {
        return e._gsap.scaleX = e._gsap.scaleY = i
    }

    function Ti(e, t, i, n, r) {
        var a = e._gsap;
        a.scaleX = a.scaleY = i, a.renderTransform(r, a)
    }

    function _i(e, t, i, n, r) {
        var a = e._gsap;
        a[t] = i, a.renderTransform(r, a)
    }

    function xi(e, t) {
        var i = Hi.createElementNS ? Hi.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Hi.createElement(e);
        return i.style ? i : Hi.createElement(e)
    }

    function Ei(e, t, i) {
        var n = getComputedStyle(e);
        return n[t] || n.getPropertyValue(t.replace(yn, "-$1").toLowerCase()) || n.getPropertyValue(t) || !i && Ei(e, Sn(t) || t, 1) || ""
    }

    function Si() {
        "undefined" != typeof window && window.document && (Wi = (Hi = window.document).documentElement, qi = xi("div") || {
            style: {}
        }, Vi = xi("div"), _n = Sn(_n), xn = _n + "Origin", qi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Gi = !!Sn("perspective"), Yi = 1)
    }

    function Ci(e) {
        var t, i = xi("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            n = this.parentNode,
            r = this.nextSibling,
            a = this.style.cssText;
        if (Wi.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
            t = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = Ci
        } catch (e) {} else this._gsapBBox && (t = this._gsapBBox());
        return n && (r ? n.insertBefore(this, r) : n.appendChild(this)), Wi.removeChild(i), this.style.cssText = a, t
    }

    function ki(e, t) {
        for (var i = t.length; i--;)
            if (e.hasAttribute(t[i])) return e.getAttribute(t[i])
    }

    function Mi(t) {
        var i;
        try {
            i = t.getBBox()
        } catch (e) {
            i = Ci.call(t, !0)
        }
        return i && (i.width || i.height) || t.getBBox === Ci || (i = Ci.call(t, !0)), !i || i.width || i.x || i.y ? i : {
            x: +ki(t, ["x", "cx", "x1"]) || 0,
            y: +ki(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }

    function zi(e) {
        return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !Mi(e))
    }

    function Oi(e, t) {
        var i;
        t && (i = e.style, t in fn && t !== xn && (t = _n), i.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), i.removeProperty(t.replace(yn, "-$1").toLowerCase())) : i.removeAttribute(t))
    }

    function Pi(e, t, i, n, r, a) {
        var s = new ai(e._pt, t, i, 0, 1, a ? gi : mi);
        return (e._pt = s).b = n, s.e = r, e._props.push(i), s
    }

    function Li(e, t, i, n) {
        var r, a, s, o, l = parseFloat(i) || 0,
            c = (i + "").trim().substr((l + "").length) || "px",
            u = qi.style,
            d = wn.test(t),
            h = "svg" === e.tagName.toLowerCase(),
            p = (h ? "client" : "offset") + (d ? "Width" : "Height"),
            f = "px" === n,
            m = "%" === n;
        return n === c || !l || Cn[n] || Cn[c] ? l : ("px" === c || f || (l = Li(e, t, i, "px")), o = e.getCTM && zi(e), m && (fn[t] || ~t.indexOf("adius")) ? $(l / (o ? e.getBBox()[d ? "width" : "height"] : e[p]) * 100) : (u[d ? "width" : "height"] = 100 + (f ? c : n), a = ~t.indexOf("adius") || "em" === n && e.appendChild && !h ? e : e.parentNode, o && (a = (e.ownerSVGElement || {}).parentNode), a && a !== Hi && a.appendChild || (a = Hi.body), (s = a._gsap) && m && s.width && d && s.time === Et.time ? $(l / s.width * 100) : (!m && "%" !== c || (u.position = Ei(e, "position")), a === e && (u.position = "static"), a.appendChild(qi), r = qi[p], a.removeChild(qi), u.position = "absolute", d && m && ((s = N(a)).time = Et.time, s.width = a[p]), $(f ? r * l / 100 : r && l ? 100 / r * l : 0))))
    }

    function Ai(e, t, i, n) {
        var r;
        return Yi || Si(), t in Tn && "transform" !== t && ~(t = Tn[t]).indexOf(",") && (t = t.split(",")[0]), fn[t] && "transform" !== t ? (r = Pn(e, n), r = "transformOrigin" !== t ? r[t] : Ln(Ei(e, xn)) + " " + r.zOrigin + "px") : (r = e.style[t]) && "auto" !== r && !n && !~(r + "").indexOf("calc(") || (r = Mn[t] && Mn[t](e, t, i) || Ei(e, t) || a(e, t) || ("opacity" === t ? 1 : 0)), i && !~(r + "").indexOf(" ") ? Li(e, t, r, i) + i : r
    }

    function Di(e, t, i, n) {
        var r, a;
        i && "none" !== i || ((a = (r = Sn(t, e, 1)) && Ei(e, r, 1)) && a !== i ? (t = r, i = a) : "borderColor" === t && (i = Ei(e, "borderTopColor")));
        var s, o, l, c, u, d, h, p, f, m, g, v, y = new ai(this._pt, e.style, t, 0, 1, ei),
            w = 0,
            b = 0;
        if (y.b = i, y.e = n, i += "", "auto" === (n += "") && (e.style[t] = n, n = Ei(e, t) || n, e.style[t] = i), le(s = [i, n]), n = s[1], l = (i = s[0]).match(Ze) || [], (n.match(Ze) || []).length) {
            for (; o = Ze.exec(n);) h = o[0], f = n.substring(w, o.index), u ? u = (u + 1) % 5 : "rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5) || (u = 1), h !== (d = l[b++] || "") && (c = parseFloat(d) || 0, g = d.substr((c + "").length), (v = "=" === h.charAt(1) ? +(h.charAt(0) + "1") : 0) && (h = h.substr(2)), p = parseFloat(h), m = h.substr((p + "").length), w = Ze.lastIndex - m.length, m || (m = m || Re.units[t] || g, w === n.length && (n += m, y.e += m)), g !== m && (c = Li(e, t, d, m) || 0), y._pt = {
                _next: y._pt,
                p: f || 1 === b ? f : ",",
                s: c,
                c: v ? v * p : p - c,
                m: u && u < 4 ? Math.round : 0
            });
            y.c = w < n.length ? n.substring(w, n.length) : ""
        } else y.r = "display" === t && "none" === n ? gi : mi;
        return et.test(n) && (y.e = 0), this._pt = y
    }

    function Ii(e, t) {
        if (t.tween && t.tween._time === t.tween._dur) {
            var i, n, r, a = t.t,
                s = a.style,
                o = t.u,
                l = a._gsap;
            if ("all" === o || !0 === o) s.cssText = "", n = 1;
            else
                for (r = (o = o.split(",")).length; - 1 < --r;) i = o[r], fn[i] && (n = 1, i = "transformOrigin" === i ? xn : _n), Oi(a, i);
            n && (Oi(a, _n), l && (l.svg && a.removeAttribute("transform"), Pn(a, 1), l.uncache = 1))
        }
    }

    function Bi(e) {
        return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e
    }

    function Ni(e) {
        var t = Ei(e, _n);
        return Bi(t) ? zn : t.substr(7).match(Ke).map($)
    }

    function Ri(e, t) {
        var i, n, r, a, s = e._gsap || N(e),
            o = e.style,
            l = Ni(e);
        return s.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(r = e.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",") ? zn : l : (l !== zn || e.offsetParent || e === Wi || s.svg || (r = o.display, o.display = "block", (i = e.parentNode) && e.offsetParent || (a = 1, n = e.nextSibling, Wi.appendChild(e)), l = Ni(e), r ? o.display = r : Oi(e, "display"), a && (n ? i.insertBefore(e, n) : i ? i.appendChild(e) : Wi.removeChild(e))), t && 6 < l.length ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
    }

    function Fi(e, t, i, n, r, a) {
        var s, o, l, c = e._gsap,
            u = r || Ri(e, !0),
            d = c.xOrigin || 0,
            h = c.yOrigin || 0,
            p = c.xOffset || 0,
            f = c.yOffset || 0,
            m = u[0],
            g = u[1],
            v = u[2],
            y = u[3],
            w = u[4],
            b = u[5],
            T = t.split(" "),
            _ = parseFloat(T[0]) || 0,
            x = parseFloat(T[1]) || 0;
        i ? u !== zn && (o = m * y - g * v) && (l = _ * (-g / o) + x * (m / o) - (m * b - g * w) / o, _ = _ * (y / o) + x * (-v / o) + (v * b - y * w) / o, x = l) : (_ = (s = Mi(e)).x + (~T[0].indexOf("%") ? _ / 100 * s.width : _), x = s.y + (~(T[1] || T[0]).indexOf("%") ? x / 100 * s.height : x)), n || !1 !== n && c.smooth ? (w = _ - d, b = x - h, c.xOffset = p + (w * m + b * v) - w, c.yOffset = f + (w * g + b * y) - b) : c.xOffset = c.yOffset = 0, c.xOrigin = _, c.yOrigin = x, c.smooth = !!n, c.origin = t, c.originIsAbsolute = !!i, e.style[xn] = "0px 0px", a && (Pi(a, c, "xOrigin", d, _), Pi(a, c, "yOrigin", h, x), Pi(a, c, "xOffset", p, c.xOffset), Pi(a, c, "yOffset", f, c.yOffset)), e.setAttribute("data-svg-origin", _ + " " + x)
    }

    function $i(e, t, i) {
        var n = X(t);
        return $(parseFloat(t) + parseFloat(Li(e, "x", i + "px", n))) + n
    }

    function ji(e, t, i) {
        var n, r, a, s, o, l, c, u = Vi.style,
            d = i._gsap;
        for (r in u.cssText = getComputedStyle(i).cssText + ";position:absolute;display:block;", u[_n] = t, Hi.body.appendChild(Vi), n = Pn(Vi, 1), fn)(a = d[r]) !== (s = n[r]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (o = X(a) !== (c = X(s)) ? Li(i, r, a, c) : parseFloat(a), l = parseFloat(s), e._pt = new ai(e._pt, d, r, o, l - o, di), e._pt.u = c || 0, e._props.push(r));
        Hi.body.removeChild(Vi)
    }
    var Hi, Wi, Yi, qi, Vi, Xi, Gi, Ui = Ct.Power0,
        Qi = Ct.Power1,
        Ki = Ct.Power2,
        Zi = Ct.Power3,
        Ji = Ct.Power4,
        en = Ct.Linear,
        tn = Ct.Quad,
        nn = Ct.Cubic,
        rn = Ct.Quart,
        an = Ct.Quint,
        sn = Ct.Strong,
        on = Ct.Elastic,
        ln = Ct.Back,
        cn = Ct.SteppedEase,
        un = Ct.Bounce,
        dn = Ct.Sine,
        hn = Ct.Expo,
        pn = Ct.Circ,
        fn = {},
        mn = 180 / Math.PI,
        gn = Math.PI / 180,
        vn = Math.atan2,
        yn = /([A-Z])/g,
        wn = /(?:left|right|width|margin|padding|x)/i,
        bn = /[\s,\(]\S/,
        Tn = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        _n = "transform",
        xn = _n + "Origin",
        En = "O,Moz,ms,Ms,Webkit".split(","),
        Sn = function(e, t, i) {
            var n = (t || qi).style,
                r = 5;
            if (e in n && !i) return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1); r-- && !(En[r] + e in n););
            return r < 0 ? null : (3 === r ? "ms" : 0 <= r ? En[r] : "") + e
        },
        Cn = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        kn = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        Mn = {
            clearProps: function(e, t, i, n, r) {
                if ("isFromStart" !== r.data) {
                    var a = e._pt = new ai(e._pt, t, i, 0, 0, Ii);
                    return a.u = n, a.pr = -10, a.tween = r, e._props.push(i), 1
                }
            }
        },
        zn = [1, 0, 0, 1, 0, 0],
        On = {},
        Pn = function(e, t) {
            var i = e._gsap || new Dt(e);
            if ("x" in i && !t && !i.uncache) return i;
            var n, r, a, s, o, l, c, u, d, h, p, f, m, g, v, y, w, b, T, _, x, E, S, C, k, M, z, O, P, L, A = e.style,
                D = i.scaleX < 0,
                I = Ei(e, xn) || "0",
                B = n = r = s = o = l = c = u = d = 0,
                N = a = 1;
            return i.svg = !(!e.getCTM || !zi(e)), f = Ri(e, i.svg), i.svg && (E = !i.uncache && e.getAttribute("data-svg-origin"), Fi(e, E || I, !!E || i.originIsAbsolute, !1 !== i.smooth, f)), h = i.xOrigin || 0, p = i.yOrigin || 0, f !== zn && (y = f[0], w = f[1], b = f[2], T = f[3], B = _ = f[4], n = x = f[5], 6 === f.length ? (N = Math.sqrt(y * y + w * w), a = Math.sqrt(T * T + b * b), s = y || w ? vn(w, y) * mn : 0, (c = b || T ? vn(b, T) * mn + s : 0) && (a *= Math.cos(c * gn)), i.svg && (B -= h - (h * y + p * b), n -= p - (h * w + p * T))) : (L = f[6], O = f[7], k = f[8], M = f[9], z = f[10], P = f[11], B = f[12], n = f[13], r = f[14], o = (m = vn(L, z)) * mn, m && (E = _ * (g = Math.cos(-m)) + k * (v = Math.sin(-m)), S = x * g + M * v, C = L * g + z * v, k = _ * -v + k * g, M = x * -v + M * g, z = L * -v + z * g, P = O * -v + P * g, _ = E, x = S, L = C), l = (m = vn(-b, z)) * mn, m && (g = Math.cos(-m), P = T * (v = Math.sin(-m)) + P * g, y = E = y * g - k * v, w = S = w * g - M * v, b = C = b * g - z * v), s = (m = vn(w, y)) * mn, m && (E = y * (g = Math.cos(m)) + w * (v = Math.sin(m)), S = _ * g + x * v, w = w * g - y * v, x = x * g - _ * v, y = E, _ = S), o && 359.9 < Math.abs(o) + Math.abs(s) && (o = s = 0, l = 180 - l), N = $(Math.sqrt(y * y + w * w + b * b)), a = $(Math.sqrt(x * x + L * L)), m = vn(_, x), c = 2e-4 < Math.abs(m) ? m * mn : 0, d = P ? 1 / (P < 0 ? -P : P) : 0), i.svg && (E = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !Bi(Ei(e, _n)), E && e.setAttribute("transform", E))), 90 < Math.abs(c) && Math.abs(c) < 270 && (D ? (N *= -1, c += s <= 0 ? 180 : -180, s += s <= 0 ? 180 : -180) : (a *= -1, c += c <= 0 ? 180 : -180)), i.x = ((i.xPercent = B && Math.round(e.offsetWidth / 2) === Math.round(-B) ? -50 : 0) ? 0 : B) + "px", i.y = ((i.yPercent = n && Math.round(e.offsetHeight / 2) === Math.round(-n) ? -50 : 0) ? 0 : n) + "px", i.z = r + "px", i.scaleX = $(N), i.scaleY = $(a), i.rotation = $(s) + "deg", i.rotationX = $(o) + "deg", i.rotationY = $(l) + "deg", i.skewX = c + "deg", i.skewY = u + "deg", i.transformPerspective = d + "px", (i.zOrigin = parseFloat(I.split(" ")[2]) || 0) && (A[xn] = Ln(I)), i.xOffset = i.yOffset = 0, i.force3D = Re.force3D, i.renderTransform = i.svg ? Bn : Gi ? In : An, i.uncache = 0, i
        },
        Ln = function(e) {
            return (e = e.split(" "))[0] + " " + e[1]
        },
        An = function(e, t) {
            t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, In(e, t)
        },
        Dn = "0deg",
        In = function(e, t) {
            var i, n, r, a, s = t || this,
                o = s.xPercent,
                l = s.yPercent,
                c = s.x,
                u = s.y,
                d = s.z,
                h = s.rotation,
                p = s.rotationY,
                f = s.rotationX,
                m = s.skewX,
                g = s.skewY,
                v = s.scaleX,
                y = s.scaleY,
                w = s.transformPerspective,
                b = s.force3D,
                T = s.target,
                _ = s.zOrigin,
                x = "",
                E = "auto" === b && e && 1 !== e || !0 === b;
            !_ || f === Dn && p === Dn || (r = parseFloat(p) * gn, i = Math.sin(r), n = Math.cos(r), r = parseFloat(f) * gn, a = Math.cos(r), c = $i(T, c, i * a * -_), u = $i(T, u, -Math.sin(r) * -_), d = $i(T, d, n * a * -_ + _)), "0px" !== w && (x += "perspective(" + w + ") "), (o || l) && (x += "translate(" + o + "%, " + l + "%) "), !E && "0px" === c && "0px" === u && "0px" === d || (x += "0px" !== d || E ? "translate3d(" + c + ", " + u + ", " + d + ") " : "translate(" + c + ", " + u + ") "), h !== Dn && (x += "rotate(" + h + ") "), p !== Dn && (x += "rotateY(" + p + ") "), f !== Dn && (x += "rotateX(" + f + ") "), m === Dn && g === Dn || (x += "skew(" + m + ", " + g + ") "), 1 === v && 1 === y || (x += "scale(" + v + ", " + y + ") "), T.style[_n] = x || "translate(0, 0)"
        },
        Bn = function(e, t) {
            var i, n, r, a, s, o = t || this,
                l = o.xPercent,
                c = o.yPercent,
                u = o.x,
                d = o.y,
                h = o.rotation,
                p = o.skewX,
                f = o.skewY,
                m = o.scaleX,
                g = o.scaleY,
                v = o.target,
                y = o.xOrigin,
                w = o.yOrigin,
                b = o.xOffset,
                T = o.yOffset,
                _ = o.forceCSS,
                x = parseFloat(u),
                E = parseFloat(d),
                h = parseFloat(h),
                p = parseFloat(p);
            (f = parseFloat(f)) && (p += f = parseFloat(f), h += f), h || p ? (h *= gn, p *= gn, i = Math.cos(h) * m, n = Math.sin(h) * m, r = Math.sin(h - p) * -g, a = Math.cos(h - p) * g, p && (f *= gn, s = Math.tan(p - f), r *= s = Math.sqrt(1 + s * s), a *= s, f && (s = Math.tan(f), i *= s = Math.sqrt(1 + s * s), n *= s)), i = $(i), n = $(n), r = $(r), a = $(a)) : (i = m, a = g, n = r = 0), (x && !~(u + "").indexOf("px") || E && !~(d + "").indexOf("px")) && (x = Li(v, "x", u, "px"), E = Li(v, "y", d, "px")), (y || w || b || T) && (x = $(x + y - (y * i + w * r) + b), E = $(E + w - (y * n + w * a) + T)), (l || c) && (s = v.getBBox(), x = $(x + l / 100 * s.width), E = $(E + c / 100 * s.height)), s = "matrix(" + i + "," + n + "," + r + "," + a + "," + x + "," + E + ")", v.setAttribute("transform", s), _ && (v.style[_n] = s)
        };
    f("padding,margin,Width,Radius", function(t, i) {
        var e = "Bottom",
            o = (i < 3 ? ["Top", "Right", e, "Left"] : ["TopLeft", "TopRight", e + "Right", e + "Left"]).map(function(e) {
                return i < 2 ? t + e : "border" + e + t
            });
        Mn[1 < i ? "border" + t : t] = function(t, e, i, n, r) {
            var a, s;
            if (arguments.length < 4) return a = o.map(function(e) {
                return Ai(t, e, i)
            }), 5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s;
            a = (n + "").split(" "), s = {}, o.forEach(function(e, t) {
                return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0]
            }), t.init(e, s, r)
        }
    });
    var Nn, Rn, Fn, $n = {
        name: "css",
        register: Si,
        targetTest: function(e) {
            return e.style && e.nodeType
        },
        init: function(e, t, i, n, r) {
            var a, s, o, l, c, u, d, h, p, f, m, g, v, y, w, b, T, _, x, E, S, C, k, M, z, O, P, L, A, D, I, B = this._props,
                N = e.style;
            for (d in Yi || Si(), t)
                if ("autoRound" !== d && (s = t[d], !ot[d] || !Rt(d, t, i, n, e, r)))
                    if (c = typeof s, u = Mn[d], "function" === c && (c = typeof(s = s.call(i, n, e, r))), "string" === c && ~s.indexOf("random(") && (s = te(s)), u) u(this, e, d, s, i) && (w = 1);
                    else if ("--" === d.substr(0, 2)) this.add(N, "setProperty", getComputedStyle(e).getPropertyValue(d) + "", s + "", n, r, 0, 0, d);
            else if ("undefined" !== c) {
                if (a = Ai(e, d), l = parseFloat(a), (f = "string" === c && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), o = parseFloat(s), d in Tn && ("autoAlpha" === d && (1 === l && "hidden" === Ai(e, "visibility") && o && (l = 0), Pi(this, N, "visibility", l ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== d && "transform" !== d && ~(d = Tn[d]).indexOf(",") && (d = d.split(",")[0])), m = d in fn)
                    if (g || ((v = e._gsap).renderTransform || Pn(e), y = !1 !== t.smoothOrigin && v.smooth, (g = this._pt = new ai(this._pt, N, _n, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), "scale" === d) this._pt = new ai(this._pt, v, "scaleY", v.scaleY, f ? f * o : o - v.scaleY), B.push("scaleY", d), d += "X";
                    else {
                        if ("transformOrigin" === d) {
                            I = D = A = void 0, A = (L = s).split(" "), D = A[0], I = A[1] || "50%", "top" !== D && "bottom" !== D && "left" !== I && "right" !== I || (L = D, D = I, I = L), A[0] = kn[D] || D, A[1] = kn[I] || I, s = A.join(" "), v.svg ? Fi(e, s, 0, y, 0, this) : ((p = parseFloat(s.split(" ")[2]) || 0) !== v.zOrigin && Pi(this, v, "zOrigin", v.zOrigin, p), Pi(this, N, d, Ln(a), Ln(s)));
                            continue
                        }
                        if ("svgOrigin" === d) {
                            Fi(e, s, 1, y, 0, this);
                            continue
                        }
                        if (d in On) {
                            b = this, T = v, _ = d, x = l, S = f, O = k = C = void 0, M = R(E = s), z = parseFloat(E) * (M && ~E.indexOf("rad") ? mn : 1), P = x + (O = S ? z * S : z - x) + "deg", M && ("short" === (C = E.split("_")[1]) && (O %= 360) != O % 180 && (O += O < 0 ? 360 : -360), "cw" === C && O < 0 ? O = (O + 36e9) % 360 - 360 * ~~(O / 360) : "ccw" === C && 0 < O && (O = (O - 36e9) % 360 - 360 * ~~(O / 360))), b._pt = k = new ai(b._pt, T, _, x, O, hi), k.e = P, k.u = "deg", b._props.push(_);
                            continue
                        }
                        if ("smoothOrigin" === d) {
                            Pi(this, v, "smooth", v.smooth, s);
                            continue
                        }
                        if ("force3D" === d) {
                            v[d] = s;
                            continue
                        }
                        if ("transform" === d) {
                            ji(this, s, e);
                            continue
                        }
                    }
                else d in N || (d = Sn(d) || d);
                if (m || (o || 0 === o) && (l || 0 === l) && !bn.test(s) && d in N) o = o || 0, (h = (a + "").substr((l + "").length)) !== (p = X(s) || (d in Re.units ? Re.units[d] : h)) && (l = Li(e, d, a, p)), this._pt = new ai(this._pt, m ? v : N, d, l, f ? f * o : o - l, "px" !== p || !1 === t.autoRound || m ? di : fi), this._pt.u = p || 0, h !== p && (this._pt.b = a, this._pt.r = pi);
                else if (d in N) Di.call(this, e, d, a, s);
                else {
                    if (!(d in e)) {
                        F(d, s);
                        continue
                    }
                    this.add(e, d, e[d], s, n, r)
                }
                B.push(d)
            }
            w && ri(this)
        },
        get: Ai,
        aliases: Tn,
        getSetter: function(e, t, i) {
            var n = Tn[t];
            return n && n.indexOf(",") < 0 && (t = n), t in fn && t !== xn && (e._gsap.x || Ai(e, "x")) ? i && Xi === i ? "scale" === t ? bi : wi : (Xi = i || {}) && ("scale" === t ? Ti : _i) : e.style && !r(e.style[t]) ? vi : ~t.indexOf("-") ? yi : Kt(e, t)
        },
        core: {
            _removeProperty: Oi,
            _getMatrix: Ri
        }
    };
    ui.utils.checkPrefix = Sn, Fn = f((Nn = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (Rn = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(e) {
        fn[e] = 1
    }), f(Rn, function(e) {
        Re.units[e] = "deg", On[e] = 1
    }), Tn[Fn[13]] = Nn + "," + Rn, f("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(e) {
        var t = e.split(":");
        Tn[t[1]] = Fn[t[0]]
    }), f("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(e) {
        Re.units[e] = "px"
    }), ui.registerPlugin($n);
    var jn = ui.registerPlugin($n) || ui,
        Hn = jn.core.Tween;
    e.Back = ln, e.Bounce = un, e.CSSPlugin = $n, e.Circ = pn, e.Cubic = nn, e.Elastic = on, e.Expo = hn, e.Linear = en, e.Power0 = Ui, e.Power1 = Qi, e.Power2 = Ki, e.Power3 = Zi, e.Power4 = Ji, e.Quad = tn, e.Quart = rn, e.Quint = an, e.Sine = dn, e.SteppedEase = cn, e.Strong = sn, e.TimelineLite = Nt, e.TimelineMax = Nt, e.TweenLite = qt, e.TweenMax = Hn, e.default = jn, e.gsap = jn, "undefined" == typeof window || window !== e ? Object.defineProperty(e, "__esModule", {
        value: !0
    }) : delete window.default
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function(e) {
    "use strict";

    function Ee(e) {
        return e
    }

    function r() {
        return "undefined" != typeof window
    }

    function a() {
        return Ue || r() && (Ue = window.gsap) && Ue.registerPlugin && Ue
    }

    function Se(e) {
        return !!~p.indexOf(e)
    }

    function Ce(e, t) {
        return ~ut.indexOf(e) && ut[ut.indexOf(e) + 1][t]
    }

    function ke(t, e) {
        var i = e.s,
            n = e.sc,
            r = x.indexOf(t),
            a = n === Ct.sc ? 1 : 2;
        return ~r || (r = x.push(t) - 1), x[r + a] || (x[r + a] = Ce(t, i) || (Se(t) ? n : function(e) {
            return arguments.length ? t[i] = e : t[i]
        }))
    }

    function Me(e) {
        return Ce(e, "getBoundingClientRect") || (Se(e) ? function() {
            return Dt.width = Qe.innerWidth, Dt.height = Qe.innerHeight, Dt
        } : function() {
            return kt(e)
        })
    }

    function ze(e, t) {
        var i = t.s,
            n = t.d2,
            r = t.d,
            a = t.a;
        return (i = "scroll" + n) && (a = Ce(e, i)) ? a() - Me(e)()[r] : Se(e) ? Math.max(Ze[i], Je[i]) - (Qe["inner" + n] || Ze["client" + n] || Je["client" + n]) : e[i] - e["offset" + n]
    }

    function s(e, t) {
        for (var i = 0; i < T.length; i += 3) t && !~t.indexOf(T[i + 1]) || e(T[i], T[i + 1], T[i + 2])
    }

    function Oe(e) {
        return "string" == typeof e
    }

    function Pe(e) {
        return "function" == typeof e
    }

    function Le(e) {
        return "number" == typeof e
    }

    function Ae(e) {
        return "object" == typeof e
    }

    function o(e) {
        return Pe(e) && e()
    }

    function l(i, n) {
        return function() {
            var e = o(i),
                t = o(n);
            return function() {
                o(e), o(t)
            }
        }
    }

    function De(e) {
        return Qe.getComputedStyle(e)
    }

    function Ie(e, t) {
        for (var i in t) i in e || (e[i] = t[i]);
        return e
    }

    function Be(e, t) {
        var i = t.d2;
        return e["offset" + i] || e["client" + i] || 0
    }

    function c(t, i, e, n) {
        return e.split(",").forEach(function(e) {
            return t(i, e, n)
        })
    }

    function Ne(e, t, i) {
        return e.addEventListener(t, i, {
            passive: !0
        })
    }

    function Re(e, t, i) {
        return e.removeEventListener(t, i)
    }

    function Fe(e, t) {
        var i, n;
        return Oe(e) && ((n = ~(i = e.indexOf("=")) ? (e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0) && (e.indexOf("%") > i && (n *= t / 100), e = e.substr(0, i - 1)), e = n + (e in k ? k[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)), e
    }

    function $e(e, t, i, n, r, a, s) {
        var o = r.startColor,
            l = r.endColor,
            c = r.fontSize,
            u = r.indent,
            d = r.fontWeight,
            h = Ke.createElement("div"),
            p = Se(i) || "fixed" === Ce(i, "pinType"),
            f = -1 !== e.indexOf("scroller"),
            m = p ? Je : i,
            g = -1 !== e.indexOf("start"),
            v = g ? o : l,
            y = "border-color:" + v + ";font-size:" + c + ";color:" + v + ";font-weight:" + d + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return y += "position:" + (f && p ? "fixed;" : "absolute;"), !f && p || (y += (n === Ct ? S : C) + ":" + (a + parseFloat(u)) + "px;"), s && (y += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), h._isStart = g, h.setAttribute("class", "gsap-marker-" + e), h.style.cssText = y, h.innerText = t || 0 === t ? e + "-" + t : e, m.insertBefore(h, m.children[0]), h._offset = h["offset" + n.op.d2], M(h, 0, n, g), h
    }

    function u() {
        return g = g || m(R)
    }

    function je() {
        g || (g = m(R), ht || L("scrollStart"), ht = dt())
    }

    function He() {
        return !nt && f.restart(!0)
    }

    function d(e) {
        var t, i = Ue.ticker.frame,
            n = [],
            r = 0;
        if (_ !== i || ct) {
            for (I(); r < P.length; r += 4)(t = Qe.matchMedia(P[r]).matches) !== P[r + 3] && ((P[r + 3] = t) ? n.push(r) : I(1, P[r]) || Pe(P[r + 2]) && P[r + 2]());
            for (D(), r = 0; r < n.length; r++) t = n[r], lt = P[t], P[t + 2] = P[t + 1](e);
            B(lt = 0, 1), _ = i, L("matchMedia")
        }
    }

    function We() {
        return Re(W, "scrollEnd", We) || B(!0)
    }

    function Ye(e, t, i, n) {
        if (e.parentNode !== t) {
            for (var r, a = F.length, s = t.style, o = e.style; a--;) s[r = F[a]] = i[r];
            s.position = "absolute" === i.position ? "absolute" : "relative", "inline" === i.display && (s.display = "inline-block"), o[C] = o[S] = "auto", s.overflow = "visible", s.boxSizing = "border-box", s[mt] = Be(e, St) + Et, s[gt] = Be(e, Ct) + Et, s[Tt] = o[_t] = o.top = o.left = "0", At(n), o[mt] = o.maxWidth = i[mt], o[gt] = o.maxHeight = i[gt], o[Tt] = i[Tt], e.parentNode.insertBefore(t, e), t.appendChild(e)
        }
    }

    function qe(e) {
        for (var t = $.length, i = e.style, n = [], r = 0; r < t; r++) n.push($[r], i[$[r]]);
        return n.t = e, n
    }

    function Ve(e, t, i, n, r, a, s, o, l, c, u, d) {
        var h, p, f, m, g, v, y, w;
        return Pe(e) && (e = e(o)), Oe(e) && "max" === e.substr(0, 3) && (e = d + ("=" === e.charAt(4) ? Fe("0" + e.substr(3), i) : 0)), Le(e) ? s && M(s, i, n, !0) : (Pe(t) && (t = t(o)), h = et(t)[0] || Je, p = kt(h) || {}, f = e.split(" "), p && (p.left || p.top) || "none" !== De(h).display || (v = h.style.display, h.style.display = "block", p = kt(h), v ? h.style.display = v : h.style.removeProperty("display")), m = Fe(f[0], p[n.d]), g = Fe(f[1] || "0", i), e = p[n.p] - l[n.p] - c + m + r - g, s && M(s, g, n, i - g < 20 || s._isStart && 20 < g), i -= i - g), a && (y = e + i, w = a._isStart, d = "scroll" + n.d2, M(a, y, n, w && 20 < y || !w && (u ? Math.max(Je[d], Ze[d]) : a.parentNode[d]) <= y + 1), u && (l = kt(s), u && (a.style[n.op.p] = l[n.op.p] - n.op.m - a._offset + Et))), Math.round(e)
    }

    function Xe(e, t, i, n) {
        if (e.parentNode !== t) {
            var r, a, s = e.style;
            if (t === Je) {
                for (r in e._stOrig = s.cssText, a = De(e)) + r || H.test(r) || !a[r] || "string" != typeof s[r] || "0" === r || (s[r] = a[r]);
                s.top = i, s.left = n
            } else s.cssText = e._stOrig;
            Ue.core.getCache(e).uncache = 1, t.appendChild(e)
        }
    }

    function Ge(c, e) {
        var u, d, h = ke(c, e),
            p = "_scroll" + e.p2;
        return c[p] = h,
            function t(e, i, n, r, a) {
                var s = t.tween,
                    o = i.onComplete,
                    l = {};
                return s && s.kill(), u = Math.round(n), i[p] = e, (i.modifiers = l)[p] = function(e) {
                    return (e = Math.round(h())) !== u && e !== d ? (s.kill(), t.tween = 0) : e = n + r * s.ratio + a * s.ratio * s.ratio, d = u, u = Math.round(e)
                }, i.onComplete = function() {
                    t.tween = 0, o && o.call(s)
                }, s = t.tween = Ue.to(c, i)
            }
    }
    var Ue, h, Qe, Ke, Ze, Je, p, f, m, g, et, tt, it, v, nt, rt, y, at, w, b, T, st, ot, lt, _, ct = 1,
        ut = [],
        x = [],
        dt = Date.now,
        E = dt(),
        ht = 0,
        pt = 1,
        ft = Math.abs,
        t = "scrollLeft",
        i = "scrollTop",
        S = "right",
        C = "bottom",
        mt = "width",
        gt = "height",
        vt = "Right",
        yt = "Left",
        wt = "Top",
        bt = "Bottom",
        Tt = "padding",
        _t = "margin",
        xt = "Width",
        n = "Height",
        Et = "px",
        St = {
            s: t,
            p: "left",
            p2: yt,
            os: S,
            os2: vt,
            d: mt,
            d2: xt,
            a: "x",
            sc: function(e) {
                return arguments.length ? Qe.scrollTo(e, Ct.sc()) : Qe.pageXOffset || Ke[t] || Ze[t] || Je[t] || 0
            }
        },
        Ct = {
            s: i,
            p: "top",
            p2: wt,
            os: C,
            os2: bt,
            d: gt,
            d2: n,
            a: "y",
            op: St,
            sc: function(e) {
                return arguments.length ? Qe.scrollTo(St.sc(), e) : Qe.pageYOffset || Ke[i] || Ze[i] || Je[i] || 0
            }
        },
        kt = function(e, t) {
            var i = t && "matrix(1, 0, 0, 1, 0, 0)" !== De(e)[y] && Ue.to(e, {
                    x: 0,
                    y: 0,
                    xPercent: 0,
                    yPercent: 0,
                    rotation: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    skewX: 0,
                    skewY: 0
                }).progress(1),
                n = e.getBoundingClientRect();
            return i && i.progress(0).kill(), n
        },
        Mt = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        },
        zt = {
            toggleActions: "play",
            anticipatePin: 0
        },
        k = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        },
        M = function(e, t, i, n) {
            var r = {
                    display: "block"
                },
                a = i[n ? "os2" : "p2"],
                s = i[n ? "p2" : "os2"];
            e._isFlipped = n, r[i.a + "Percent"] = n ? -100 : 0, r[i.a] = n ? 1 : 0, r["border" + a + xt] = 1, r["border" + s + xt] = 0, r[i.p] = t, Ue.set(e, r)
        },
        Ot = [],
        Pt = {},
        z = {},
        O = [],
        P = [],
        L = function(e) {
            return z[e] && z[e].map(function(e) {
                return e()
            }) || O
        },
        A = [],
        D = function(e) {
            for (var t = 0; t < A.length; t += 4) e && A[t + 3] !== e || (A[t].style.cssText = A[t + 1], A[t + 2].uncache = 1)
        },
        I = function(e, t) {
            var i;
            for (at = 0; at < Ot.length; at++) i = Ot[at], t && i.media !== t || (e ? i.kill(1) : (i.scroll.rec || (i.scroll.rec = i.scroll()), i.revert()));
            D(t), t || L("revert")
        },
        B = function(e, t) {
            if (!ht || e) {
                var i = L("refreshInit");
                for (st && W.sort(), t || I(), at = 0; at < Ot.length; at++) Ot[at].refresh();
                for (i.forEach(function(e) {
                        return e && e.render && e.render(-1)
                    }), at = Ot.length; at--;) Ot[at].scroll.rec = 0;
                f.pause(), L("refresh")
            } else Ne(W, "scrollEnd", We)
        },
        N = 0,
        Lt = 1,
        R = function() {
            var e = Ot.length,
                t = dt(),
                i = 50 <= t - E,
                n = e && Ot[0].scroll();
            if (Lt = n < N ? -1 : 1, N = n, i && (ht && !rt && 200 < t - ht && (ht = 0, L("scrollEnd")), it = E, E = t), Lt < 0) {
                for (at = e; at--;) Ot[at] && Ot[at].update(0, i);
                Lt = 1
            } else
                for (at = 0; at < e; at++) Ot[at] && Ot[at].update(0, i);
            g = 0
        },
        F = ["left", "top", C, S, _t + bt, _t + vt, _t + wt, _t + yt, "display", "flexShrink", "float"],
        $ = F.concat([mt, gt, "boxSizing", "max" + xt, "max" + n, "position", _t, Tt, Tt + wt, Tt + vt, Tt + bt, Tt + yt]),
        j = /([A-Z])/g,
        At = function(e) {
            if (e)
                for (var t, i, n = e.t.style, r = e.length, a = 0; a < r; a += 2) i = e[a + 1], t = e[a], i ? n[t] = i : n[t] && n.removeProperty(t.replace(j, "-$1").toLowerCase())
        },
        Dt = {
            left: 0,
            top: 0
        },
        H = /(?:webkit|moz|length|cssText)/i;
    St.op = Ct;
    var W = (It.prototype.init = function(w, b) {
        var T, p, f, n, m, _, e, x, E, S, C, g, t, l, v, y, k, M, z, i, O, P, L, A, r, D, I, a, B, N, R, s, c, F, $, j, H, W, Y, q, V, X, o, G, U, Q, K, Z, u, J, ee, te, ie, ne, re, ae, se, d, oe, le, ce, h, ue, de, he, pe, fe, me, ge, ve, ye, we, be, Te, _e, xe;
        this.progress = 0, this.vars && this.kill(1), pt ? (T = (w = Ie(Oe(w) || Le(w) || w.nodeType ? {
            trigger: w
        } : w, zt)).horizontal ? St : Ct, p = w.onUpdate, f = w.toggleClass, n = w.id, m = w.onToggle, _ = w.onRefresh, e = w.scrub, x = w.trigger, E = w.pin, S = w.pinSpacing, C = w.invalidateOnRefresh, g = w.anticipatePin, t = w.onScrubComplete, l = w.onSnapComplete, v = w.once, y = w.snap, k = w.pinReparent, M = !e && 0 !== e, z = et(w.scroller || Qe)[0], i = Ue.core.getCache(z), O = Se(z), P = "pinType" in w ? "fixed" === w.pinType : O || "fixed" === Ce(z, "pinType"), L = [w.onEnter, w.onLeave, w.onEnterBack, w.onLeaveBack], A = M && w.toggleActions.split(" "), r = "markers" in w ? w.markers : zt.markers, D = !O && parseFloat(De(z)["border" + T.p2 + xt]) || 0, I = this, a = w.onRefreshInit && function() {
            return w.onRefreshInit(I)
        }, ge = z, ve = O, we = (ye = T).d, be = ye.d2, Te = ye.a, B = (Te = Ce(ge, "getBoundingClientRect")) ? function() {
            return Te()[we]
        } : function() {
            return (ve ? Qe["inner" + be] : ge["client" + be]) || 0
        }, me = z, N = !O || ~ut.indexOf(me) ? Me(me) : function() {
            return Dt
        }, I.media = lt, g *= 45, Ot.push(I), I.scroller = z, I.scroll = ke(z, T), $ = I.scroll(), I.vars = w, b = b || w.animation, "refreshPriority" in w && (st = 1), i.tweenScroll = i.tweenScroll || {
            top: Ge(z, Ct),
            left: Ge(z, St)
        }, I.tweenTo = R = i.tweenScroll[T.p], b && (b.vars.lazy = !1, b._initted || !1 !== b.vars.immediateRender && !1 !== w.immediateRender && b.render(0, !0, !0), I.animation = b.pause(), b.scrollTrigger = I, (h = Le(e) && e) && (ce = Ue.to(b, {
            ease: "power3",
            duration: h,
            onComplete: function() {
                return t && t(I)
            }
        })), oe = 0, n = n || b.vars.id), y && (Ae(y) || (y = {
            snapTo: y
        }), Ue.set(O ? [Je, Ze] : z, {
            scrollBehavior: "auto"
        }), c = Pe(y.snapTo) ? y.snapTo : "labels" === y.snapTo ? (_e = b, function(e) {
            var t, i = [],
                n = _e.labels,
                r = _e.duration();
            for (t in n) i.push(n[t] / r);
            return Ue.utils.snap(i, e)
        }) : Ue.utils.snap(y.snapTo), ue = y.duration || {
            min: .1,
            max: 2
        }, ue = Ae(ue) ? tt(ue.min, ue.max) : tt(ue, ue), de = Ue.delayedCall(y.delay || h / 2 || .1, function() {
            if (Math.abs(I.getVelocity()) < 10 && !rt) {
                var e = b && !M ? b.totalProgress() : I.progress,
                    t = (e - le) / (dt() - it) * 1e3 || 0,
                    i = ft(t / 2) * t / .185,
                    n = e + i,
                    r = tt(0, 1, c(n, I)),
                    a = I.scroll(),
                    s = Math.round(H + r * G),
                    o = R.tween;
                if (a <= W && H <= a && s !== a) {
                    if (o && !o._initted && o.data <= Math.abs(s - a)) return;
                    R(s, {
                        duration: ue(ft(.185 * Math.max(ft(n - e), ft(r - e)) / t / .05 || 0)),
                        ease: y.ease || "power3",
                        data: Math.abs(s - a),
                        onComplete: function() {
                            oe = le = b && !M ? b.totalProgress() : I.progress, l && l(I)
                        }
                    }, a, i * G, s - a - i * G)
                }
            } else I.isActive && de.restart(!0)
        }).pause()), n && (Pt[n] = I), x = I.trigger = et(x || E)[0], E = !0 === E ? x : et(E)[0], Oe(f) && (f = {
            targets: x,
            className: f
        }), E && (!1 === S || S === _t || (S = !(!S && "flex" === De(E.parentNode).display) && Tt), I.pin = E, !1 !== w.force3D && Ue.set(E, {
            force3D: !0
        }), (s = Ue.core.getCache(E)).spacer ? U = s.pinState : (s.spacer = Z = Ke.createElement("div"), Z.setAttribute("class", "pin-spacer" + (n ? " pin-spacer-" + n : "")), s.pinState = U = qe(E)), I.spacer = Z = s.spacer, d = De(E), ne = d[S + T.os2], J = Ue.getProperty(E), ee = Ue.quickSetter(E, T.a, Et), Ye(E, Z, d), K = qe(E)), r && (o = Ae(r) ? Ie(r, Mt) : Mt, V = $e("scroller-start", n, z, T, o, 0), X = $e("scroller-end", n, z, T, o, 0, V), u = V["offset" + T.op.d2], Y = $e("start", n, z, T, o, u), q = $e("end", n, z, T, o, u), P || ((xe = z).style.position = "absolute" === De(xe).position ? "absolute" : "relative", Ue.set([V, X], {
            force3D: !0
        }), ae = Ue.quickSetter(V, T.a, Et), se = Ue.quickSetter(X, T.a, Et))), I.revert = function(e) {
            var t, i, n, r = !1 !== e || !I.enabled,
                a = nt;
            r !== F && (r && (pe = Math.max(I.scroll(), I.scroll.rec || 0), he = I.progress, fe = b && b.progress()), Y && [Y, q, V, X].forEach(function(e) {
                return e.style.display = r ? "none" : "block"
            }), r && (nt = 1), I.update(r), nt = a, E && (r ? (t = E, i = Z, At(U), t.parentNode !== i || (n = i.parentNode) && (n.insertBefore(t, i), n.removeChild(i))) : k && I.isActive || Ye(E, Z, De(E), re)), F = r)
        }, I.refresh = function(e) {
            if (!nt && I.enabled)
                if (E && e && ht) Ne(It, "scrollEnd", We);
                else {
                    nt = 1, ce && ce.kill(), C && b && b.progress(0).invalidate(), F || I.revert();
                    for (var t, i, n, r, a, s, o, l, c = B(), u = N(), d = ze(z, T), h = 0, p = 0, f = w.end, m = w.endTrigger || x, g = w.start || (0 === w.start ? 0 : E || !x ? "0 0" : "0 100%"), v = x && Math.max(0, Ot.indexOf(I)) || 0, y = v; y--;) !(o = Ot[y].pin) || o !== x && o !== E || Ot[y].revert();
                    for (H = Ve(g, x, c, T, I.scroll(), Y, V, I, u, D, P, d) || (E ? -.001 : 0), Pe(f) && (f = f(I)), Oe(f) && !f.indexOf("+=") && (~f.indexOf(" ") ? f = (Oe(g) ? g.split(" ")[0] : "") + f : (h = Fe(f.substr(2), c), f = Oe(g) ? g : H + h, m = x)), W = Math.max(H, Ve(f || (m ? "100% 0" : d), m, c, T, I.scroll() + h, q, X, I, u, D, P, d)) || -.001, G = W - H || (H -= .01) && .001, h = 0, y = v; y--;)(o = (s = Ot[y]).pin) && s.start - s._pinPush < H && (t = s.end - s.start, o === x && (h += t), o === E && (p += t));
                    if (H += h, W += h, I._pinPush = p, Y && h && ((t = {})[T.a] = "+=" + h, Ue.set([Y, q], t)), E) t = De(E), r = T === Ct, n = I.scroll(), te = parseFloat(J(T.a)) + p, !d && 1 < W && ((O ? Je : z).style["overflow-" + T.a] = "scroll"), Ye(E, Z, t), K = qe(E), i = kt(E, !0), l = P && ke(z, r ? St : Ct)(), S && ((re = [S + T.os2, G + p + Et]).t = Z, (y = S === Tt ? Be(E, T) + G + p : 0) && re.push(T.d, y + Et), At(re), P && I.scroll(pe)), P && ((a = {
                        top: i.top + (r ? n - H : l) + Et,
                        left: i.left + (r ? l : n - H) + Et,
                        boxSizing: "border-box",
                        position: "fixed"
                    })[mt] = a.maxWidth = Math.ceil(i.width) + Et, a[gt] = a.maxHeight = Math.ceil(i.height) + Et, a[_t] = a[_t + wt] = a[_t + vt] = a[_t + bt] = a[_t + yt] = "0", a[Tt] = t[Tt], a[Tt + wt] = t[Tt + wt], a[Tt + vt] = t[Tt + vt], a[Tt + bt] = t[Tt + bt], a[Tt + yt] = t[Tt + yt], Q = function(e, t, i) {
                        for (var n, r = [], a = e.length, s = i ? 8 : 0; s < a; s += 2) n = e[s], r.push(n, n in t ? t[n] : e[s + 1]);
                        return r.t = e.t, r
                    }(U, a, k)), b ? (b.progress(1, !0), ie = J(T.a) - te + G + p, G !== ie && Q.splice(Q.length - 2, 2), b.progress(0, !0)) : ie = G;
                    else if (x && I.scroll())
                        for (i = x.parentNode; i && i !== Je;) i._pinOffset && (H -= i._pinOffset, W -= i._pinOffset), i = i.parentNode;
                    for (y = 0; y < v; y++) !(s = Ot[y].pin) || s !== x && s !== E || Ot[y].revert(!1);
                    I.start = H, I.end = W, ($ = j = I.scroll()) < pe && I.scroll(pe), I.revert(!1), nt = 0, fe && M && b.progress(fe, !0), he !== I.progress && (ce && b.totalProgress(he, !0), I.progress = he, I.update()), E && S && (Z._pinOffset = Math.round(I.progress * ie)), _ && _(I)
                }
        }, I.getVelocity = function() {
            return (I.scroll() - j) / (dt() - it) * 1e3 || 0
        }, I.update = function(e, t) {
            var i, n, r, a, s, o, l, c = I.scroll(),
                u = e ? 0 : (c - H) / G,
                d = u < 0 ? 0 : 1 < u ? 1 : u || 0,
                h = I.progress;
            t && (j = $, $ = c, y && (le = oe, oe = b && !M ? b.totalProgress() : d)), g && !d && E && !nt && !ct && ht && H < c + (c - j) / (dt() - it) * g && (d = 1e-4), d !== h && I.enabled && (l = (o = (s = I.isActive = !!d && d < 1) != (!!h && h < 1)) || !!d != !!h, I.direction = h < d ? 1 : -1, I.progress = d, M || (!ce || nt || ct ? b && b.totalProgress(d, !!nt) : (ce.vars.totalProgress = d, ce.invalidate().restart())), E && (e && S && (Z.style[S + T.os2] = ne), P ? l && (a = !e && h < d && c < W + 1 && c + 1 >= ze(z, T), k && (e || !s && !a ? Xe(E, Z) : (n = kt(E, !0), r = c - H, Xe(E, Je, n.top + (T === Ct ? r : 0) + Et, n.left + (T === Ct ? 0 : r) + Et))), At(s || a ? Q : K), ie !== G && d < 1 && s || ee(te + (1 !== d || a ? 0 : ie))) : ee(te + ie * d)), !y || R.tween || nt || ct || de.restart(!0), f && (o || v && d && (d < 1 || !ot)) && et(f.targets).forEach(function(e) {
                return e.classList[s || v ? "add" : "remove"](f.className)
            }), !p || M || e || p(I), l && !nt ? (i = d && !h ? 0 : 1 === d ? 1 : 1 === h ? 2 : 3, M && (a = !o && "none" !== A[i + 1] && A[i + 1] || A[i], b && ("complete" === a || "reset" === a || a in b) && ("complete" === a ? b.pause().totalProgress(1) : "reset" === a ? b.restart(!0).pause() : b[a]()), p && p(I)), !o && ot || (m && o && m(I), L[i] && L[i](I), v && (1 === d ? I.kill(!1, 1) : L[i] = 0), o || L[i = 1 === d ? 1 : 3] && L[i](I))) : M && p && !nt && p(I)), se && (ae(c + (V._isFlipped ? 1 : 0)), se(c))
        }, I.enable = function() {
            I.enabled || (I.enabled = !0, Ne(z, "resize", He), Ne(z, "scroll", je), a && Ne(It, "refreshInit", a), b && b.add ? Ue.delayedCall(.01, function() {
                return H || W || I.refresh()
            }) && (G = .01) && (H = W = 0) : I.refresh())
        }, I.disable = function(e, t) {
            if (I.enabled && (!1 !== e && I.revert(), I.enabled = I.isActive = !1, t || ce && ce.pause(), pe = 0, s && (s.uncache = 1), a && Re(It, "refreshInit", a), de && (de.pause(), R.tween && R.tween.kill() && (R.tween = 0)), !O)) {
                for (var i = Ot.length; i--;)
                    if (Ot[i].scroller === z && Ot[i] !== I) return;
                Re(z, "resize", He), Re(z, "scroll", je)
            }
        }, I.kill = function(e, t) {
            I.disable(e, t), n && delete Pt[n];
            var i = Ot.indexOf(I);
            Ot.splice(i, 1), i === at && 0 < Lt && at--, b && (b.scrollTrigger = null, e && b.render(-1), t || b.kill()), Y && [Y, q, V, X].forEach(function(e) {
                return e.parentNode.removeChild(e)
            }), s && (s.uncache = 1)
        }, I.enable()) : this.update = this.refresh = this.kill = Ee
    }, It.register = function(e) {
        var t, i, n;
        return h || (Ue = e || a(), r() && window.document && (Qe = window, Ke = document, Ze = Ke.documentElement, Je = Ke.body), Ue && (et = Ue.utils.toArray, tt = Ue.utils.clamp, Ue.core.globals("ScrollTrigger", It), Je && (m = Qe.requestAnimationFrame || function(e) {
            return setTimeout(e, 16)
        }, Ne(Qe, "mousewheel", je), p = [Qe, Ke, Ze, Je], Ne(Ke, "scroll", je), i = (t = Je.style).borderTop, t.borderTop = "1px solid #000", n = kt(Je), Ct.m = Math.round(n.top + Ct.sc()) || 0, St.m = Math.round(n.left + St.sc()) || 0, i ? t.borderTop = i : t.removeProperty("border-top"), v = setInterval(u, 200), Ue.delayedCall(.5, function() {
            return ct = 0
        }), Ne(Ke, "touchcancel", Ee), Ne(Je, "touchstart", Ee), c(Ne, Ke, "pointerdown,touchstart,mousedown", function() {
            return rt = 1
        }), c(Ne, Ke, "pointerup,touchend,mouseup", function() {
            return rt = 0
        }), y = Ue.utils.checkPrefix("transform"), $.push(y), h = dt(), f = Ue.delayedCall(.2, B).pause(), T = [Ke, "visibilitychange", function() {
            var e = Qe.innerWidth,
                t = Qe.innerHeight;
            Ke.hidden ? (w = e, b = t) : w === e && b === t || He()
        }, Ke, "DOMContentLoaded", B, Qe, "load", function() {
            return ht || B()
        }, Qe, "resize", He], s(Ne)))), h
    }, It.defaults = function(e) {
        for (var t in e) zt[t] = e[t]
    }, It.kill = function() {
        pt = 0, Ot.slice(0).forEach(function(e) {
            return e.kill(1)
        })
    }, It.config = function(e) {
        "limitCallbacks" in e && (ot = !!e.limitCallbacks);
        var t = e.syncInterval;
        t && clearInterval(v) || (v = t) && setInterval(u, t), "autoRefreshEvents" in e && (s(Re) || s(Ne, e.autoRefreshEvents || "none"))
    }, It.scrollerProxy = function(e, t) {
        var i = et(e)[0];
        Se(i) ? ut.unshift(Qe, t, Je, t, Ze, t) : ut.unshift(i, t)
    }, It.matchMedia = function(e) {
        var t, i, n, r, a;
        for (i in e) n = P.indexOf(i), r = e[i], "all" === (lt = i) ? r() : (t = Qe.matchMedia(i)) && (t.matches && (a = r()), ~n ? (P[n + 1] = l(P[n + 1], r), P[n + 2] = l(P[n + 2], a)) : (n = P.length, P.push(i, r, a), t.addListener ? t.addListener(d) : t.addEventListener("change", d)), P[n + 3] = t.matches), lt = 0;
        return P
    }, It.clearMatchMedia = function(e) {
        e || (P.length = 0), 0 <= (e = P.indexOf(e)) && P.splice(e, 4)
    }, It);

    function It(e, t) {
        h || It.register(Ue) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, t)
    }
    W.version = "3.5.1", W.saveStyles = function(e) {
        return e ? et(e).forEach(function(e) {
            var t = A.indexOf(e);
            0 <= t && A.splice(t, 4), A.push(e, e.style.cssText, Ue.core.getCache(e), lt)
        }) : A
    }, W.revert = function(e, t) {
        return I(!e, t)
    }, W.create = function(e, t) {
        return new W(e, t)
    }, W.refresh = function(e) {
        return e ? He() : B(!0)
    }, W.update = R, W.maxScroll = function(e, t) {
        return ze(e, t ? St : Ct)
    }, W.getScrollFunc = function(e, t) {
        return ke(et(e)[0], t ? St : Ct)
    }, W.getById = function(e) {
        return Pt[e]
    }, W.getAll = function() {
        return Ot.slice(0)
    }, W.isScrolling = function() {
        return !!ht
    }, W.addEventListener = function(e, t) {
        var i = z[e] || (z[e] = []);
        ~i.indexOf(t) || i.push(t)
    }, W.removeEventListener = function(e, t) {
        var i = z[e],
            n = i && i.indexOf(t);
        0 <= n && i.splice(n, 1)
    }, W.batch = function(e, t) {
        function i(e, t) {
            var i = [],
                n = [],
                r = Ue.delayedCall(s, function() {
                    t(i, n), i = [], n = []
                }).pause();
            return function(e) {
                i.length || r.restart(!0), i.push(e.trigger), n.push(e), o <= i.length && r.progress(1)
            }
        }
        var n, r = [],
            a = {},
            s = t.interval || .016,
            o = t.batchMax || 1e9;
        for (n in t) a[n] = "on" === n.substr(0, 2) && Pe(t[n]) && "onRefreshInit" !== n ? i(0, t[n]) : t[n];
        return Pe(o) && (o = o(), Ne(W, "refresh", function() {
            return o = t.batchMax()
        })), et(e).forEach(function(e) {
            var t = {};
            for (n in a) t[n] = a[n];
            t.trigger = e, r.push(W.create(t))
        }), r
    }, W.sort = function(e) {
        return Ot.sort(e || function(e, t) {
            return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0))
        })
    }, a() && Ue.registerPlugin(W), e.ScrollTrigger = W, e.default = W, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).LocomotiveScroll = t()
}(this, function() {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function r(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function e(e, t, i) {
        return t && r(e.prototype, t), i && r(e, i), e
    }

    function t(t, e) {
        var i, n = Object.keys(t);
        return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(t), e && (i = i.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        })), n.push.apply(n, i)), n
    }

    function i(r) {
        for (var e = 1; e < arguments.length; e++) {
            var a = null != arguments[e] ? arguments[e] : {};
            e % 2 ? t(Object(a), !0).forEach(function(e) {
                var t, i, n;
                t = r, n = a[i = e], i in t ? Object.defineProperty(t, i, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[i] = n
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : t(Object(a)).forEach(function(e) {
                Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
            })
        }
        return r
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && a(e, t)
    }

    function o(e) {
        return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function a(e, t) {
        return (a = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function l(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function c(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? l(e) : t
    }

    function u(e, t, i) {
        return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, i) {
            var n = function(e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = o(e)););
                return e
            }(e, t);
            if (n) {
                var r = Object.getOwnPropertyDescriptor(n, t);
                return r.get ? r.get.call(i) : r.value
            }
        })(e, t, i || e)
    }

    function b(e) {
        return function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
        }(e) || function(e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var d = {
            el: document,
            elMobile: document,
            name: "scroll",
            offset: [0, 0],
            repeat: !1,
            smooth: !1,
            smoothMobile: !1,
            direction: "vertical",
            lerp: .1,
            class: "is-inview",
            scrollbarContainer: !1,
            scrollbarClass: "c-scrollbar",
            scrollingClass: "has-scroll-scrolling",
            draggingClass: "has-scroll-dragging",
            smoothClass: "has-scroll-smooth",
            initClass: "has-scroll-init",
            getSpeed: !1,
            getDirection: !1,
            multiplier: 1,
            firefoxMultiplier: 50,
            touchMultiplier: 2,
            scrollFromAnywhere: !1
        },
        h = function() {
            function t() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                n(this, t), Object.assign(this, d, e), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowMiddle = this.windowHeight / 2, this.els = [], this.listeners = {}, this.hasScrollTicking = !1, this.hasCallEventSet = !1, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = {
                    scroll: {
                        x: 0,
                        y: 0
                    },
                    limit: this.html.offsetHeight
                }, this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, !1)
            }
            return e(t, [{
                key: "init",
                value: function() {
                    this.initEvents()
                }
            }, {
                key: "checkScroll",
                value: function() {
                    this.dispatchScroll()
                }
            }, {
                key: "checkResize",
                value: function() {
                    var e = this;
                    this.resizeTick || (this.resizeTick = !0, requestAnimationFrame(function() {
                        e.resize(), e.resizeTick = !1
                    }))
                }
            }, {
                key: "resize",
                value: function() {}
            }, {
                key: "initEvents",
                value: function() {
                    var t = this;
                    this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach(function(e) {
                        e.addEventListener("click", t.setScrollTo, !1)
                    })
                }
            }, {
                key: "setScrollTo",
                value: function(e) {
                    e.preventDefault(), this.scrollTo(e.currentTarget.getAttribute("data-".concat(this.name, "-href")) || e.currentTarget.getAttribute("href"), e.currentTarget.getAttribute("data-".concat(this.name, "-offset")))
                }
            }, {
                key: "addElements",
                value: function() {}
            }, {
                key: "detectElements",
                value: function(i) {
                    var n = this,
                        r = this.instance.scroll.y,
                        a = r + this.windowHeight;
                    this.els.forEach(function(e, t) {
                        !e || e.inView && !i || a >= e.top && r < e.bottom && n.setInView(e, t), e && e.inView && (a < e.top || r > e.bottom) && n.setOutOfView(e, t)
                    }), this.els = this.els.filter(function(e, t) {
                        return null !== e
                    }), this.hasScrollTicking = !1
                }
            }, {
                key: "setInView",
                value: function(e, t) {
                    this.els[t].inView = !0, e.el.classList.add(e.class), e.call && this.hasCallEventSet && (this.dispatchCall(e, "enter"), e.repeat || (this.els[t].call = !1)), e.repeat || e.speed || e.sticky || (!e.call || e.call && this.hasCallEventSet) && (this.els[t] = null)
                }
            }, {
                key: "setOutOfView",
                value: function(e, t) {
                    !e.repeat && void 0 === e.speed || (this.els[t].inView = !1), e.call && this.hasCallEventSet && this.dispatchCall(e, "exit"), e.repeat && e.el.classList.remove(e.class)
                }
            }, {
                key: "dispatchCall",
                value: function(e, t) {
                    this.callWay = t, this.callValue = e.call.split(",").map(function(e) {
                        return e.trim()
                    }), this.callObj = e, 1 == this.callValue.length && (this.callValue = this.callValue[0]);
                    var i = new Event(this.namespace + "call");
                    this.el.dispatchEvent(i)
                }
            }, {
                key: "dispatchScroll",
                value: function() {
                    var e = new Event(this.namespace + "scroll");
                    this.el.dispatchEvent(e)
                }
            }, {
                key: "setEvents",
                value: function(e, t) {
                    this.listeners[e] || (this.listeners[e] = []);
                    var i = this.listeners[e];
                    i.push(t), 1 === i.length && this.el.addEventListener(this.namespace + e, this.checkEvent, !1), "call" === e && (this.hasCallEventSet = !0, this.detectElements(!0))
                }
            }, {
                key: "unsetEvents",
                value: function(e, t) {
                    var i, n;
                    this.listeners[e] && ((n = (i = this.listeners[e]).indexOf(t)) < 0 || (i.splice(n, 1), 0 === i.index && this.el.removeEventListener(this.namespace + e, this.checkEvent, !1)))
                }
            }, {
                key: "checkEvent",
                value: function(e) {
                    var t = this,
                        i = e.type.replace(this.namespace, ""),
                        n = this.listeners[i];
                    n && 0 !== n.length && n.forEach(function(e) {
                        switch (i) {
                            case "scroll":
                                return e(t.instance);
                            case "call":
                                return e(t.callValue, t.callWay, t.callObj);
                            default:
                                return e()
                        }
                    })
                }
            }, {
                key: "startScroll",
                value: function() {}
            }, {
                key: "stopScroll",
                value: function() {}
            }, {
                key: "setScroll",
                value: function() {
                    this.instance.scroll = {
                        x: 0,
                        y: 0
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = this;
                    window.removeEventListener("resize", this.checkResize, !1), Object.keys(this.listeners).forEach(function(e) {
                        t.el.removeEventListener(t.namespace + e, t.checkEvent, !1)
                    }), this.listeners = {}, this.scrollToEls.forEach(function(e) {
                        e.removeEventListener("click", t.setScrollTo, !1)
                    })
                }
            }]), t
        }(),
        p = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function f(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var m = f(function(e, t) {
            e.exports = {
                polyfill: function() {
                    var e, s, l, c, i, t, u = window,
                        d = document;

                    function h(e, t) {
                        this.scrollLeft = e, this.scrollTop = t
                    }

                    function n(e) {
                        if (null === e || "object" != typeof e || void 0 === e.behavior || "auto" === e.behavior || "instant" === e.behavior) return !0;
                        if ("object" == typeof e && "smooth" === e.behavior) return !1;
                        throw new TypeError("behavior member of ScrollOptions " + e.behavior + " is not a valid value for enumeration ScrollBehavior.")
                    }

                    function r(e, t) {
                        return "Y" === t ? e.clientHeight + i < e.scrollHeight : "X" === t ? e.clientWidth + i < e.scrollWidth : void 0
                    }

                    function a(e, t) {
                        var i = u.getComputedStyle(e, null)["overflow" + t];
                        return "auto" === i || "scroll" === i
                    }

                    function p(e) {
                        var t, i, n, r, a = (c() - e.startTime) / s;
                        r = a = 1 < a ? 1 : a, t = .5 * (1 - Math.cos(Math.PI * r)), i = e.startX + (e.x - e.startX) * t, n = e.startY + (e.y - e.startY) * t, e.method.call(e.scrollable, i, n), i === e.x && n === e.y || u.requestAnimationFrame(p.bind(u, e))
                    }

                    function o(e, t, i) {
                        var n, r, a, s = c(),
                            o = e === d.body ? (r = (n = u).scrollX || u.pageXOffset, a = u.scrollY || u.pageYOffset, l.scroll) : (r = (n = e).scrollLeft, a = e.scrollTop, h);
                        p({
                            scrollable: n,
                            method: o,
                            startTime: s,
                            startX: r,
                            startY: a,
                            x: t,
                            y: i
                        })
                    }
                    "scrollBehavior" in d.documentElement.style && !0 !== u.__forceSmoothScrollPolyfill__ || (e = u.HTMLElement || u.Element, s = 468, l = {
                        scroll: u.scroll || u.scrollTo,
                        scrollBy: u.scrollBy,
                        elementScroll: e.prototype.scroll || h,
                        scrollIntoView: e.prototype.scrollIntoView
                    }, c = u.performance && u.performance.now ? u.performance.now.bind(u.performance) : Date.now, t = u.navigator.userAgent, i = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(t) ? 1 : 0, u.scroll = u.scrollTo = function() {
                        void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? o.call(u, d.body, void 0 !== arguments[0].left ? ~~arguments[0].left : u.scrollX || u.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : u.scrollY || u.pageYOffset) : l.scroll.call(u, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : u.scrollX || u.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : u.scrollY || u.pageYOffset))
                    }, u.scrollBy = function() {
                        void 0 !== arguments[0] && (n(arguments[0]) ? l.scrollBy.call(u, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : o.call(u, d.body, ~~arguments[0].left + (u.scrollX || u.pageXOffset), ~~arguments[0].top + (u.scrollY || u.pageYOffset)))
                    }, e.prototype.scroll = e.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== n(arguments[0])) {
                                var e = arguments[0].left,
                                    t = arguments[0].top;
                                o.call(this, this, void 0 === e ? this.scrollLeft : ~~e, void 0 === t ? this.scrollTop : ~~t)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                l.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }, e.prototype.scrollBy = function() {
                        void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior
                        }) : l.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
                    }, e.prototype.scrollIntoView = function() {
                        var e, t, i;
                        !0 !== n(arguments[0]) ? (t = (e = function(e) {
                            for (; e !== d.body && !1 === (0, i = r(t = e, "Y") && a(t, "Y"), n = r(t, "X") && a(t, "X"), i || n);) e = e.parentNode || e.host;
                            var t, i, n;
                            return e
                        }(this)).getBoundingClientRect(), i = this.getBoundingClientRect(), e !== d.body ? (o.call(this, e, e.scrollLeft + i.left - t.left, e.scrollTop + i.top - t.top), "fixed" !== u.getComputedStyle(e).position && u.scrollBy({
                            left: t.left,
                            top: t.top,
                            behavior: "smooth"
                        })) : u.scrollBy({
                            left: i.left,
                            top: i.top,
                            behavior: "smooth"
                        })) : l.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    })
                }
            }
        }),
        g = (m.polyfill, function() {
            function i() {
                var e, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                return n(this, i), e = c(this, o(i).call(this, t)), window.addEventListener("scroll", e.checkScroll, !1), m.polyfill(), e
            }
            return s(i, h), e(i, [{
                key: "init",
                value: function() {
                    this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), u(o(i.prototype), "init", this).call(this)
                }
            }, {
                key: "checkScroll",
                value: function() {
                    var e = this;
                    u(o(i.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.timestamp = Date.now()), this.instance.scroll.y = window.pageYOffset, this.els.length && (this.hasScrollTicking || (requestAnimationFrame(function() {
                        e.detectElements()
                    }), this.hasScrollTicking = !0))
                }
            }, {
                key: "addDirection",
                value: function() {
                    window.pageYOffset > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up")
                }
            }, {
                key: "addSpeed",
                value: function() {
                    window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / (Date.now() - this.timestamp) : this.instance.speed = 0
                }
            }, {
                key: "resize",
                value: function() {
                    this.els.length && (this.windowHeight = window.innerHeight, this.updateElements())
                }
            }, {
                key: "addElements",
                value: function() {
                    var u = this;
                    this.els = [], this.el.querySelectorAll("[data-" + this.name + "]").forEach(function(e, t) {
                        var i = e.dataset[u.name + "Class"] || u.class,
                            n = e.getBoundingClientRect().top + u.instance.scroll.y,
                            r = n + e.offsetHeight,
                            a = "string" == typeof e.dataset[u.name + "Offset"] ? e.dataset[u.name + "Offset"].split(",") : u.offset,
                            s = e.dataset[u.name + "Repeat"],
                            o = e.dataset[u.name + "Call"],
                            s = "false" != s && (null != s || u.repeat),
                            l = u.getRelativeOffset(a),
                            c = {
                                el: e,
                                id: t,
                                class: i,
                                top: n + l[0],
                                bottom: r - l[1],
                                offset: a,
                                repeat: s,
                                inView: !!e.classList.contains(i),
                                call: o
                            };
                        u.els.push(c)
                    })
                }
            }, {
                key: "updateElements",
                value: function() {
                    var a = this;
                    this.els.forEach(function(e, t) {
                        var i = e.el.getBoundingClientRect().top + a.instance.scroll.y,
                            n = i + e.el.offsetHeight,
                            r = a.getRelativeOffset(e.offset);
                        a.els[t].top = i + r[0], a.els[t].bottom = n - r[1]
                    }), this.hasScrollTicking = !1
                }
            }, {
                key: "getRelativeOffset",
                value: function(e) {
                    var t = [0, 0];
                    if (e)
                        for (var i = 0; i < e.length; i++) "string" == typeof e[i] ? e[i].includes("%") ? t[i] = parseInt(e[i].replace("%", "") * this.windowHeight / 100) : t[i] = parseInt(e[i]) : t[i] = e[i];
                    return t
                }
            }, {
                key: "scrollTo",
                value: function(e, t, i, n, r, a) {
                    var s, o = t ? parseInt(t) : 0;
                    if ("string" == typeof e) {
                        if ("top" === e) s = this.html;
                        else if ("bottom" === e) s = this.html.offsetHeight - window.innerHeight;
                        else if (!(s = document.querySelector(e))) return
                    } else if ("number" == typeof e) s = parseInt(e);
                    else {
                        if (!e || !e.tagName) return void console.warn("`targetOption` parameter is not valid");
                        s = e
                    }
                    o = "number" != typeof s ? s.getBoundingClientRect().top + o + this.instance.scroll.y : s + o, a && (o = o.toFixed(), window.addEventListener("scroll", function e() {
                        window.pageYOffset.toFixed() === o && (window.removeEventListener("scroll", e), a())
                    })), window.scrollTo({
                        top: o,
                        behavior: "smooth"
                    })
                }
            }, {
                key: "update",
                value: function() {
                    this.addElements(), this.detectElements()
                }
            }, {
                key: "destroy",
                value: function() {
                    u(o(i.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1)
                }
            }]), i
        }()),
        v = Object.getOwnPropertySymbols,
        y = Object.prototype.hasOwnProperty,
        w = Object.prototype.propertyIsEnumerable;
    var T = function() {
        try {
            if (!Object.assign) return;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return;
            for (var t = {}, i = 0; i < 10; i++) t["_" + String.fromCharCode(i)] = i;
            if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                    return t[e]
                }).join("")) return;
            var n = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                n[e] = e
            }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, n)).join("") ? void 0 : 1
        } catch (e) {
            return
        }
    }() ? Object.assign : function(e, t) {
        for (var i, n, r = function(e) {
                if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }(e), a = 1; a < arguments.length; a++) {
            for (var s in i = Object(arguments[a])) y.call(i, s) && (r[s] = i[s]);
            if (v) {
                n = v(i);
                for (var o = 0; o < n.length; o++) w.call(i, n[o]) && (r[n[o]] = i[n[o]])
            }
        }
        return r
    };

    function _() {}
    _.prototype = {
        on: function(e, t, i) {
            var n = this.e || (this.e = {});
            return (n[e] || (n[e] = [])).push({
                fn: t,
                ctx: i
            }), this
        },
        once: function(e, t, i) {
            var n = this;

            function r() {
                n.off(e, r), t.apply(i, arguments)
            }
            return r._ = t, this.on(e, r, i)
        },
        emit: function(e) {
            for (var t = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, r = i.length; n < r; n++) i[n].fn.apply(i[n].ctx, t);
            return this
        },
        off: function(e, t) {
            var i = this.e || (this.e = {}),
                n = i[e],
                r = [];
            if (n && t)
                for (var a = 0, s = n.length; a < s; a++) n[a].fn !== t && n[a].fn._ !== t && r.push(n[a]);
            return r.length ? i[e] = r : delete i[e], this
        }
    };
    var x = _,
        E = f(function(e, t) {
            (function() {
                function e(e, t, i, n) {
                    this.stability = null != e ? Math.abs(e) : 8, this.sensitivity = null != t ? 1 + Math.abs(t) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != n ? n : 150, this.lastUpDeltas = function() {
                        for (var e = [], t = 1, i = 2 * this.stability; 1 <= i ? t <= i : i <= t; 1 <= i ? t++ : t--) e.push(null);
                        return e
                    }.call(this), this.lastDownDeltas = function() {
                        for (var e = [], t = 1, i = 2 * this.stability; 1 <= i ? t <= i : i <= t; 1 <= i ? t++ : t--) e.push(null);
                        return e
                    }.call(this), this.deltasTimestamp = function() {
                        for (var e = [], t = 1, i = 2 * this.stability; 1 <= i ? t <= i : i <= t; 1 <= i ? t++ : t--) e.push(null);
                        return e
                    }.call(this)
                }(null !== t ? t : this).Lethargy = (e.prototype.check = function(e) {
                    var t;
                    return null != (e = e.originalEvent || e).wheelDelta ? t = e.wheelDelta : null != e.deltaY ? t = -40 * e.deltaY : null == e.detail && 0 !== e.detail || (t = -40 * e.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), 0 < t ? (this.lastUpDeltas.push(t), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(t), this.lastDownDeltas.shift(), this.isInertia(-1))
                }, e.prototype.isInertia = function(e) {
                    var t, i, n, r, a, s, o = -1 === e ? this.lastDownDeltas : this.lastUpDeltas;
                    return null === o[0] ? e : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && o[0] === o[2 * this.stability - 1]) && (i = o.slice(0, this.stability), t = o.slice(this.stability, 2 * this.stability), s = i.reduce(function(e, t) {
                        return e + t
                    }), r = t.reduce(function(e, t) {
                        return e + t
                    }), a = s / i.length, n = r / t.length, Math.abs(a) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && e)
                }, e.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }, e.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }, e)
            }).call(p)
        }),
        S = {
            hasWheelEvent: "onwheel" in document,
            hasMouseWheelEvent: "onmousewheel" in document,
            hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
            hasTouchWin: navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints,
            hasPointer: !!window.navigator.msPointerEnabled,
            hasKeyDown: "onkeydown" in document,
            isFirefox: -1 < navigator.userAgent.indexOf("Firefox")
        },
        C = Object.prototype.toString,
        k = Object.prototype.hasOwnProperty;

    function M(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    var z = E.Lethargy,
        O = "virtualscroll",
        P = N,
        L = 37,
        A = 38,
        D = 39,
        I = 40,
        B = 32;

    function N(e) {
        ! function(e) {
            if (!e) return console.warn("bindAll requires at least one argument.");
            var t = Array.prototype.slice.call(arguments, 1);
            if (0 === t.length)
                for (var i in e) k.call(e, i) && "function" == typeof e[i] && "[object Function]" == C.call(e[i]) && t.push(i);
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                e[r] = M(e[r], e)
            }
        }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, e && e.el && (this.el = e.el, delete e.el), this.options = T({
            mouseMultiplier: 1,
            touchMultiplier: 2,
            firefoxMultiplier: 15,
            keyStep: 120,
            preventTouch: !1,
            unpreventTouchClass: "vs-touchmove-allowed",
            limitInertia: !1,
            useKeyboard: !0,
            useTouch: !0
        }, e), this.options.limitInertia && (this._lethargy = new z), this._emitter = new x, this._event = {
            y: 0,
            x: 0,
            deltaX: 0,
            deltaY: 0
        }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = {
            passive: this.options.passive
        })
    }

    function R(e, t, i) {
        return (1 - i) * e + i * t
    }

    function F(e) {
        var t = {};
        if (window.getComputedStyle) {
            var i = getComputedStyle(e),
                n = i.transform || i.webkitTransform || i.mozTransform,
                r = n.match(/^matrix3d\((.+)\)$/);
            return r ? (t.x = r ? parseFloat(r[1].split(", ")[12]) : 0, t.y = r ? parseFloat(r[1].split(", ")[13]) : 0) : (r = n.match(/^matrix\((.+)\)$/), t.x = r ? parseFloat(r[1].split(", ")[4]) : 0, t.y = r ? parseFloat(r[1].split(", ")[5]) : 0), t
        }
    }

    function $(e) {
        for (var t = []; e && e !== document; e = e.parentNode) t.push(e);
        return t
    }
    N.prototype._notify = function(e) {
        var t = this._event;
        t.x += t.deltaX, t.y += t.deltaY, this._emitter.emit(O, {
            x: t.x,
            y: t.y,
            deltaX: t.deltaX,
            deltaY: t.deltaY,
            originalEvent: e
        })
    }, N.prototype._onWheel = function(e) {
        var t, i = this.options;
        this._lethargy && !1 === this._lethargy.check(e) || ((t = this._event).deltaX = e.wheelDeltaX || -1 * e.deltaX, t.deltaY = e.wheelDeltaY || -1 * e.deltaY, S.isFirefox && 1 == e.deltaMode && (t.deltaX *= i.firefoxMultiplier, t.deltaY *= i.firefoxMultiplier), t.deltaX *= i.mouseMultiplier, t.deltaY *= i.mouseMultiplier, this._notify(e))
    }, N.prototype._onMouseWheel = function(e) {
        var t;
        this.options.limitInertia && !1 === this._lethargy.check(e) || ((t = this._event).deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0, t.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta, this._notify(e))
    }, N.prototype._onTouchStart = function(e) {
        var t = e.targetTouches ? e.targetTouches[0] : e;
        this.touchStartX = t.pageX, this.touchStartY = t.pageY
    }, N.prototype._onTouchMove = function(e) {
        var t = this.options;
        t.preventTouch && !e.target.classList.contains(t.unpreventTouchClass) && e.preventDefault();
        var i = this._event,
            n = e.targetTouches ? e.targetTouches[0] : e;
        i.deltaX = (n.pageX - this.touchStartX) * t.touchMultiplier, i.deltaY = (n.pageY - this.touchStartY) * t.touchMultiplier, this.touchStartX = n.pageX, this.touchStartY = n.pageY, this._notify(e)
    }, N.prototype._onKeyDown = function(e) {
        var t = this._event;
        t.deltaX = t.deltaY = 0;
        var i = window.innerHeight - 40;
        switch (e.keyCode) {
            case L:
            case A:
                t.deltaY = this.options.keyStep;
                break;
            case D:
            case I:
                t.deltaY = -this.options.keyStep;
                break;
            case e.shiftKey:
                t.deltaY = i;
                break;
            case B:
                t.deltaY = -i;
                break;
            default:
                return
        }
        this._notify(e)
    }, N.prototype._bind = function() {
        S.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), S.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), S.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), S.hasPointer && S.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), S.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown)
    }, N.prototype._unbind = function() {
        S.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), S.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), S.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), S.hasPointer && S.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), S.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
    }, N.prototype.on = function(e, t) {
        this._emitter.on(O, e, t);
        var i = this._emitter.e;
        i && i[O] && 1 === i[O].length && this._bind()
    }, N.prototype.off = function(e, t) {
        this._emitter.off(O, e, t);
        var i = this._emitter.e;
        (!i[O] || i[O].length <= 0) && this._unbind()
    }, N.prototype.reset = function() {
        var e = this._event;
        e.x = 0, e.y = 0
    }, N.prototype.destroy = function() {
        this._emitter.off(), this._unbind()
    };
    var j = 4,
        H = 1e-7,
        W = 10,
        Y = "function" == typeof Float32Array;

    function q(e, t) {
        return 1 - 3 * t + 3 * e
    }

    function V(e, t, i) {
        return ((q(t, i) * e + (3 * i - 6 * t)) * e + 3 * t) * e
    }

    function X(e, t, i) {
        return 3 * q(t, i) * e * e + 2 * (3 * i - 6 * t) * e + 3 * t
    }

    function G(e) {
        return e
    }

    function U(a, t, s, i) {
        if (!(0 <= a && a <= 1 && 0 <= s && s <= 1)) throw new Error("bezier x values must be in [0, 1] range");
        if (a === t && s === i) return G;
        for (var o = new(Y ? Float32Array : Array)(11), e = 0; e < 11; ++e) o[e] = V(.1 * e, a, s);

        function n(e) {
            for (var t = 0, i = 1; 10 !== i && o[i] <= e; ++i) t += .1;
            var n = t + .1 * ((e - o[--i]) / (o[i + 1] - o[i])),
                r = X(n, a, s);
            return .001 <= r ? function(e, t, i, n) {
                for (var r = 0; r < j; ++r) {
                    var a = X(t, i, n);
                    if (0 === a) return t;
                    t -= (V(t, i, n) - e) / a
                }
                return t
            }(e, n, a, s) : 0 === r ? n : function(e, t, i, n, r) {
                for (var a, s, o = 0; 0 < (a = V(s = t + (i - t) / 2, n, r) - e) ? i = s : t = s, Math.abs(a) > H && ++o < W;);
                return s
            }(e, t, t + .1, a, s)
        }
        return function(e) {
            return 0 === e ? 0 : 1 === e ? 1 : V(n(e), t, i)
        }
    }
    var Q = 38,
        K = 40,
        Z = 32,
        J = 9,
        ee = 33,
        te = 34,
        ie = 36,
        ne = 35,
        re = function() {
            function a() {
                var e, t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                return n(this, a), window.scrollTo(0, 0), history.scrollRestoration = "manual", (e = c(this, o(a).call(this, t))).inertia && (e.lerp = .1 * e.inertia), e.isScrolling = !1, e.isDraggingScrollbar = !1, e.isTicking = !1, e.hasScrollTicking = !1, e.parallaxElements = [], e.stop = !1, e.scrollbarContainer = t.scrollbarContainer, e.checkKey = e.checkKey.bind(l(e)), window.addEventListener("keydown", e.checkKey, !1), e
            }
            return s(a, h), e(a, [{
                key: "init",
                value: function() {
                    var t = this;
                    this.html.classList.add(this.smoothClass), this.instance = i({
                        delta: {
                            x: 0,
                            y: 0
                        }
                    }, this.instance), this.vs = new P({
                        el: this.scrollFromAnywhere ? document : this.el,
                        mouseMultiplier: -1 < navigator.platform.indexOf("Win") ? 1 : .4,
                        firefoxMultiplier: this.firefoxMultiplier,
                        touchMultiplier: this.touchMultiplier,
                        useKeyboard: !1,
                        passive: !0
                    }), this.vs.on(function(e) {
                        t.stop || (t.isTicking || t.isDraggingScrollbar || (requestAnimationFrame(function() {
                            t.updateDelta(e), t.isScrolling || t.startScrolling()
                        }), t.isTicking = !0), t.isTicking = !1)
                    }), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.detectElements(), this.transformElements(!0, !0), this.checkScroll(!0), u(o(a.prototype), "init", this).call(this)
                }
            }, {
                key: "setScrollLimit",
                value: function() {
                    this.instance.limit = this.el.offsetHeight - this.windowHeight
                }
            }, {
                key: "startScrolling",
                value: function() {
                    this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass)
                }
            }, {
                key: "stopScrolling",
                value: function() {
                    this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = !1, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass)
                }
            }, {
                key: "checkKey",
                value: function(e) {
                    var t = this;
                    if (this.stop) e.keyCode == J && requestAnimationFrame(function() {
                        t.html.scrollTop = 0, document.body.scrollTop = 0
                    });
                    else {
                        switch (e.keyCode) {
                            case J:
                                requestAnimationFrame(function() {
                                    t.html.scrollTop = 0, document.body.scrollTop = 0, t.scrollTo(document.activeElement, -window.innerHeight / 2)
                                });
                                break;
                            case Q:
                                this.instance.delta.y -= 240;
                                break;
                            case K:
                                this.instance.delta.y += 240;
                                break;
                            case ee:
                                this.instance.delta.y -= window.innerHeight;
                                break;
                            case te:
                                this.instance.delta.y += window.innerHeight;
                                break;
                            case ie:
                                this.instance.delta.y -= this.instance.limit;
                                break;
                            case ne:
                                this.instance.delta.y += this.instance.limit;
                                break;
                            case Z:
                                document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (e.shiftKey ? this.instance.delta.y -= window.innerHeight : this.instance.delta.y += window.innerHeight);
                                break;
                            default:
                                return
                        }
                        this.instance.delta.y < 0 && (this.instance.delta.y = 0), this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass)
                    }
                }
            }, {
                key: "checkScroll",
                value: function(e) {
                    var t = this;
                    if (0 < arguments.length && void 0 !== e && e || this.isScrolling || this.isDraggingScrollbar) {
                        this.hasScrollTicking || (requestAnimationFrame(function() {
                            return t.checkScroll()
                        }), this.hasScrollTicking = !0), this.updateScroll();
                        var i = Math.abs(this.instance.delta.y - this.instance.scroll.y);
                        !this.animatingScroll && (i < .5 && 0 != this.instance.delta.y || i < .5 && 0 == this.instance.delta.y) && this.stopScrolling();
                        for (var n = this.sections.length - 1; 0 <= n; n--) this.sections[n].persistent || this.instance.scroll.y > this.sections[n].offset && this.instance.scroll.y < this.sections[n].limit ? (this.transform(this.sections[n].el, 0, -this.instance.scroll.y), this.sections[n].inView || (this.sections[n].inView = !0, this.sections[n].el.style.opacity = 1, this.sections[n].el.style.pointerEvents = "all", this.sections[n].el.setAttribute("data-".concat(this.name, "-section-inview"), ""))) : (this.sections[n].inView && (this.sections[n].inView = !1, this.sections[n].el.style.opacity = 0, this.sections[n].el.style.pointerEvents = "none", this.sections[n].el.removeAttribute("data-".concat(this.name, "-section-inview"))), this.transform(this.sections[n].el, 0, 0));
                        this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.timestamp = Date.now()), this.detectElements(), this.transformElements();
                        var r = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
                        this.transform(this.scrollbarThumb, 0, r), u(o(a.prototype), "checkScroll", this).call(this), this.hasScrollTicking = !1
                    }
                }
            }, {
                key: "resize",
                value: function() {
                    this.windowHeight = window.innerHeight, this.windowMiddle = this.windowHeight / 2, this.update()
                }
            }, {
                key: "updateDelta",
                value: function(e) {
                    this.instance.delta.y -= e.deltaY * this.multiplier, this.instance.delta.y < 0 && (this.instance.delta.y = 0), this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit)
                }
            }, {
                key: "updateScroll",
                value: function() {
                    this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll.y = R(this.instance.scroll.y, this.instance.delta.y, this.lerp) : this.instance.scroll.y > this.instance.limit ? this.setScroll(this.instance.scroll.x, this.instance.limit) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll.x, 0) : this.setScroll(this.instance.scroll.x, this.instance.delta.y)
                }
            }, {
                key: "addDirection",
                value: function() {
                    this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up")
                }
            }, {
                key: "addSpeed",
                value: function() {
                    this.instance.delta.y != this.instance.scroll.y ? this.instance.speed = (this.instance.delta.y - this.instance.scroll.y) / Math.max(1, Date.now() - this.timestamp) : this.instance.speed = 0
                }
            }, {
                key: "initScrollBar",
                value: function() {
                    this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar), this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar), this.instance.limit + this.windowHeight <= this.windowHeight || (this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px"), this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height)
                }
            }, {
                key: "reinitScrollBar",
                value: function() {
                    this.instance.limit + this.windowHeight <= this.windowHeight || (this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px"), this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height)
                }
            }, {
                key: "destroyScrollBar",
                value: function() {
                    this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar), window.removeEventListener("mouseup", this.releaseScrollBar), window.removeEventListener("mousemove", this.moveScrollBar), this.scrollbar.remove()
                }
            }, {
                key: "getScrollBar",
                value: function() {
                    this.isDraggingScrollbar = !0, this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass)
                }
            }, {
                key: "releaseScrollBar",
                value: function() {
                    this.isDraggingScrollbar = !1, this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass)
                }
            }, {
                key: "moveScrollBar",
                value: function(t) {
                    var i = this;
                    !this.isTicking && this.isDraggingScrollbar && (requestAnimationFrame(function() {
                        var e = 100 * (t.clientY - i.scrollbarBCR.top) / i.scrollbarHeight * i.instance.limit / 100;
                        0 < e && e < i.instance.limit && (i.instance.delta.y = e)
                    }), this.isTicking = !0), this.isTicking = !1
                }
            }, {
                key: "addElements",
                value: function() {
                    var _ = this;
                    this.els = [], this.parallaxElements = [], this.sections.forEach(function(e, T) {
                        _.sections[T].el.querySelectorAll("[data-".concat(_.name, "]")).forEach(function(e, t) {
                            var i, n, r = e.dataset[_.name + "Class"] || _.class,
                                a = e.dataset[_.name + "Repeat"],
                                s = e.dataset[_.name + "Call"],
                                o = e.dataset[_.name + "Position"],
                                l = e.dataset[_.name + "Delay"],
                                c = e.dataset[_.name + "Direction"],
                                u = "string" == typeof e.dataset[_.name + "Sticky"],
                                d = !!e.dataset[_.name + "Speed"] && parseFloat(e.dataset[_.name + "Speed"]) / 10,
                                h = "string" == typeof e.dataset[_.name + "Offset"] ? e.dataset[_.name + "Offset"].split(",") : _.offset,
                                p = e.dataset[_.name + "Target"],
                                f = void 0 !== p ? document.querySelector("".concat(p)) : e,
                                m = _.sections[T].inView ? f.getBoundingClientRect().top + _.instance.scroll.y - F(f).y : f.getBoundingClientRect().top - F(_.sections[T].el).y - F(f).y,
                                g = m + f.offsetHeight,
                                v = (g - m) / 2 + m;
                            u && (n = (i = e.getBoundingClientRect().top) - m, m += window.innerHeight, v = ((g = i + f.offsetHeight - e.offsetHeight - n) - m) / 2 + m), a = "false" != a && (null != a || _.repeat);
                            var y = [0, 0];
                            if (h)
                                for (var w = 0; w < h.length; w++) "string" == typeof h[w] ? h[w].includes("%") ? y[w] = parseInt(h[w].replace("%", "") * _.windowHeight / 100) : y[w] = parseInt(h[w]) : y[w] = h[w];
                            var b = {
                                el: e,
                                id: t,
                                class: r,
                                top: m + y[0],
                                middle: v,
                                bottom: g - y[1],
                                offset: h,
                                repeat: a,
                                inView: !!e.classList.contains(r),
                                call: s,
                                speed: d,
                                delay: l,
                                position: o,
                                target: f,
                                direction: c,
                                sticky: u
                            };
                            _.els.push(b), !1 === d && !u || _.parallaxElements.push(b)
                        })
                    })
                }
            }, {
                key: "addSections",
                value: function() {
                    var a = this;
                    this.sections = [];
                    var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                    0 === e.length && (e = [this.el]), e.forEach(function(e, t) {
                        var i = e.getBoundingClientRect().top - 1.5 * window.innerHeight - F(e).y,
                            n = i + e.getBoundingClientRect().height + 2 * window.innerHeight,
                            r = {
                                el: e,
                                offset: i,
                                limit: n,
                                inView: !1,
                                persistent: "string" == typeof e.dataset[a.name + "Persistent"]
                            };
                        a.sections[t] = r
                    })
                }
            }, {
                key: "transform",
                value: function(e, t, i, n) {
                    var r, a, s, o;
                    r = n ? (s = R((a = F(e)).x, t, n), o = R(a.y, i, n), "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(s, ",").concat(o, ",0,1)")) : "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(t, ",").concat(i, ",0,1)"), e.style.webkitTransform = r, e.style.msTransform = r, e.style.transform = r
                }
            }, {
                key: "transformElements",
                value: function(n, e) {
                    var r = this,
                        a = 1 < arguments.length && void 0 !== e && e,
                        s = this.instance.scroll.y + this.windowHeight,
                        o = this.instance.scroll.y + this.windowMiddle;
                    this.parallaxElements.forEach(function(e, t) {
                        var i = n ? 0 : !1;
                        if (e.inView || a) switch (e.position) {
                            case "top":
                                i = r.instance.scroll.y * -e.speed;
                                break;
                            case "elementTop":
                                i = (s - e.top) * -e.speed;
                                break;
                            case "bottom":
                                i = (r.instance.limit - s + r.windowHeight) * e.speed;
                                break;
                            default:
                                i = (o - e.middle) * -e.speed
                        }
                        e.sticky && (i = e.inView ? r.instance.scroll.y - e.top + window.innerHeight : r.instance.scroll.y < e.top - window.innerHeight && r.instance.scroll.y < e.top - window.innerHeight / 2 ? 0 : r.instance.scroll.y > e.bottom && r.instance.scroll.y > e.bottom + 100 && e.bottom - e.top + window.innerHeight), !1 !== i && ("horizontal" === e.direction ? r.transform(e.el, i, 0, !n && e.delay) : r.transform(e.el, 0, i, !n && e.delay))
                    })
                }
            }, {
                key: "scrollTo",
                value: function(e, t, i, n, r, a) {
                    var s, o = this,
                        l = 2 < arguments.length && void 0 !== i ? i : 1e3,
                        c = 3 < arguments.length && void 0 !== n ? n : [.25, 0, .35, 1],
                        u = 4 < arguments.length && void 0 !== r && r,
                        d = 5 < arguments.length ? a : void 0,
                        h = t ? parseInt(t) : 0,
                        c = U.apply(void 0, b(c));
                    if ("string" == typeof e) {
                        if ("top" === e) s = 0;
                        else if ("bottom" === e) s = this.instance.limit;
                        else if (!(s = document.querySelector(e))) return
                    } else if ("number" == typeof e) s = parseInt(e);
                    else {
                        if (!e || !e.tagName) return void console.warn("`targetOption` parameter is not valid");
                        s = e
                    }
                    if ("number" != typeof s) {
                        if (!$(s).includes(this.el)) return;
                        var p = s.getBoundingClientRect().top,
                            f = $(s).find(function(t) {
                                return o.sections.find(function(e) {
                                    return e.el == t
                                })
                            }),
                            m = 0;
                        f && (m = F(f).y), h = p + h - m
                    } else h = s + h;

                    function g(e) {
                        u ? o.setScroll(o.instance.delta.x, v + y * e) : o.instance.delta.y = v + y * e
                    }
                    var v = parseFloat(this.instance.delta.y),
                        y = Math.max(0, Math.min(h, this.instance.limit)) - v;
                    this.animatingScroll = !0, this.stopScrolling(), this.startScrolling();
                    var w = Date.now();
                    ! function e() {
                        var t = (Date.now() - w) / l;
                        1 < t ? (g(1), o.animatingScroll = !1, 0 == l && o.update(), d && d()) : (o.scrollToRaf = requestAnimationFrame(e), g(c(t)))
                    }()
                }
            }, {
                key: "update",
                value: function() {
                    this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0)
                }
            }, {
                key: "startScroll",
                value: function() {
                    this.stop = !1
                }
            }, {
                key: "stopScroll",
                value: function() {
                    this.stop = !0
                }
            }, {
                key: "setScroll",
                value: function(e, t) {
                    this.instance = i({}, this.instance, {
                        scroll: {
                            x: e,
                            y: t
                        },
                        delta: {
                            x: e,
                            y: t
                        },
                        speed: 0
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    u(o(a.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, !1)
                }
            }]), a
        }();
    return function() {
        function t() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            n(this, t), this.options = e, Object.assign(this, d, e), this.init()
        }
        return e(t, [{
            key: "init",
            value: function() {
                var e, t;
                this.smoothMobile || (this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints), !0 !== this.smooth || this.isMobile ? this.scroll = new g(this.options) : this.scroll = new re(this.options), this.scroll.init(), window.location.hash && (e = window.location.hash.slice(1, window.location.hash.length), (t = document.getElementById(e)) && this.scroll.scrollTo(t))
            }
        }, {
            key: "update",
            value: function() {
                this.scroll.update()
            }
        }, {
            key: "start",
            value: function() {
                this.scroll.startScroll()
            }
        }, {
            key: "stop",
            value: function() {
                this.scroll.stopScroll()
            }
        }, {
            key: "scrollTo",
            value: function(e, t, i, n, r, a) {
                this.scroll.scrollTo(e, t, i, n, r, a)
            }
        }, {
            key: "setScroll",
            value: function(e, t) {
                this.scroll.setScroll(e, t)
            }
        }, {
            key: "on",
            value: function(e, t) {
                this.scroll.setEvents(e, t)
            }
        }, {
            key: "off",
            value: function(e, t) {
                this.scroll.unsetEvents(e, t)
            }
        }, {
            key: "destroy",
            value: function() {
                this.scroll.destroy()
            }
        }]), t
    }()
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

function inViewport(e) {
    var t, i;
    return !(!e || 1 !== e.nodeType) && (i = document.documentElement, !!(t = e.getBoundingClientRect()) && 0 <= t.bottom && 0 <= t.right && t.top <= i.clientHeight && t.left <= i.clientWidth)
}

function animateLines(e) {
    if (app.settings && !app.settings.textAnimation) return !1;
    if (!e && "object" != typeof e && !e.target) return !1;
    var a = e.target,
        t = e.additional ? e.additional : "";
    if (!a.length) return !1;
    a.splitLines({
        additional: t
    }).each(function(e) {
        for (var t, i = a.closest("section"), n = i.attr("class"), r = (i.index(), !1), e = 0; e < this.length; e++) r = inViewport(this[e][0]);
        r ? (t = 1, void 0 === tl.labels[n] ? tl.addLabel(n) : t = 1.2, tl.from(this, {
            duration: .7,
            ease: "sine",
            y: "100%"
        }, t)) : TweenMax.from(this, {
            duration: .7,
            y: "100%",
            ease: "sine",
            delay: .1,
            scrollTrigger: {
                once: !0,
                scroller: app.scroller,
                trigger: this
            }
        })
    })
}! function(i) {
    "use strict";

    function j(e, t, i, n) {
        var r;
        return (i = i || q(e, null)) ? r = (e = i.getPropertyValue(t.replace(a, "-$1").toLowerCase())) || i.length ? e : i[t] : e.currentStyle && (r = (i = e.currentStyle)[t]), n ? r : parseInt(r, 10) || 0
    }

    function s(e) {
        return !!(e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]))
    }

    function _(e) {
        return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536
    }

    function l(e, t) {
        var i = -1 !== (e = e || "").indexOf("++"),
            n = 1;
        return i && (e = e.split("++").join("")),
            function() {
                return "<" + t + o + (e ? " class='" + e + (i ? n++ : "") + "'>" : ">")
            }
    }

    function H(e, t) {
        for (var i = t.length; - 1 < --i;) e.push(t[i])
    }

    function c(e) {
        for (var t = [], i = e.length, n = 0; n !== i; t.push(e[n++]));
        return t
    }

    function W(e, t, i) {
        for (var n; e && e !== t;) {
            if (n = e._next || e.nextSibling) return n.textContent.charAt(0) === i;
            e = e.parentNode || e._parent
        }
        return !1
    }

    function u(e, t, i, n, r, a, s) {
        var o, l, c, u, d, h, p, f, m, g, v, y, w = q(e),
            b = j(e, "paddingLeft", w),
            T = -999,
            _ = j(e, "borderBottomWidth", w) + j(e, "borderTopWidth", w),
            x = j(e, "borderLeftWidth", w) + j(e, "borderRightWidth", w),
            E = j(e, "paddingTop", w) + j(e, "paddingBottom", w),
            S = j(e, "paddingLeft", w) + j(e, "paddingRight", w),
            C = .2 * j(e, "fontSize"),
            k = j(e, "textAlign", w, !0),
            M = [],
            z = [],
            O = [],
            P = t.wordDelimiter || " ",
            L = t.span ? "span" : "div",
            A = t.type || t.split || "chars,words,lines",
            D = r && -1 !== A.indexOf("lines") ? [] : null,
            I = -1 !== A.indexOf("words"),
            B = -1 !== A.indexOf("chars"),
            N = "absolute" === t.position || !0 === t.absolute,
            R = t.linesClass,
            F = -1 !== (R || "").indexOf("++"),
            $ = [];
        for (D && 1 === e.children.length && e.children[0]._isSplit && (e = e.children[0]), F && (R = R.split("++").join("")), c = (l = e.getElementsByTagName("*")).length, d = [], o = 0; o < c; o++) d[o] = l[o];
        if (D || N)
            for (o = 0; o < c; o++)((h = (u = d[o]).parentNode === e) || N || B && !I) && (y = u.offsetTop, D && h && Math.abs(y - T) > C && ("BR" !== u.nodeName || 0 === o) && (p = [], D.push(p), T = y), N && (u._x = u.offsetLeft, u._y = y, u._w = u.offsetWidth, u._h = u.offsetHeight), D && ((u._isSplit && h || !B && h || I && h || !I && u.parentNode.parentNode === e && !u.parentNode._isSplit) && (p.push(u), u._x -= b, W(u, e, P) && (u._wordEnd = !0)), "BR" === u.nodeName && (u.nextSibling && "BR" === u.nextSibling.nodeName || 0 === o) && D.push([])));
        for (o = 0; o < c; o++) h = (u = d[o]).parentNode === e, "BR" !== u.nodeName ? (N && (m = u.style, I || h || (u._x += u.parentNode._x, u._y += u.parentNode._y), m.left = u._x + "px", m.top = u._y + "px", m.position = "absolute", m.display = "block", m.width = u._w + 1 + "px", m.height = u._h + "px"), !I && B ? u._isSplit ? (u._next = u.nextSibling, u.parentNode.appendChild(u)) : u.parentNode._isSplit ? (u._parent = u.parentNode, !u.previousSibling && u.firstChild && (u.firstChild._isFirst = !0), u.nextSibling && " " === u.nextSibling.textContent && !u.nextSibling.nextSibling && $.push(u.nextSibling), u._next = u.nextSibling && u.nextSibling._isFirst ? null : u.nextSibling, u.parentNode.removeChild(u), d.splice(o--, 1), c--) : h || (y = !u.nextSibling && W(u.parentNode, e, P), u.parentNode._parent && u.parentNode._parent.appendChild(u), y && u.parentNode.appendChild(Y.createTextNode(" ")), t.span && (u.style.display = "inline"), M.push(u)) : u.parentNode._isSplit && !u._isSplit && "" !== u.innerHTML ? z.push(u) : B && !u._isSplit && (t.span && (u.style.display = "inline"), M.push(u))) : D || N ? (u.parentNode && u.parentNode.removeChild(u), d.splice(o--, 1), c--) : I || e.appendChild(u);
        for (o = $.length; - 1 < --o;) $[o].parentNode.removeChild($[o]);
        if (D) {
            for (N && (g = Y.createElement(L), e.appendChild(g), v = g.offsetWidth + "px", y = g.offsetParent === e ? 0 : e.offsetLeft, e.removeChild(g)), m = e.style.cssText, e.style.cssText = "display:none;"; e.firstChild;) e.removeChild(e.firstChild);
            for (f = " " === P && (!N || !I && !B), o = 0; o < D.length; o++) {
                for (p = D[o], (g = Y.createElement(L)).style.cssText = "display:block;text-align:" + k + ";position:" + (N ? "absolute;" : "relative;"), R && (g.className = R + (F ? o + 1 : "")), O.push(g), c = p.length, l = 0; l < c; l++) "BR" !== p[l].nodeName && (u = p[l], g.appendChild(u), f && u._wordEnd && g.appendChild(Y.createTextNode(" ")), N && (0 === l && (g.style.top = u._y + "px", g.style.left = b + y + "px"), u.style.top = "0px", y && (u.style.left = u._x - y + "px")));
                0 === c ? g.innerHTML = "&nbsp;" : I || B || (X(g), V(g, String.fromCharCode(160), " ")), N && (g.style.width = v, g.style.height = u._h + "px"), e.appendChild(g)
            }
            e.style.cssText = m
        }
        N && (s > e.clientHeight && (e.style.height = s - E + "px", e.clientHeight < s && (e.style.height = s + _ + "px")), a > e.clientWidth && (e.style.width = a - S + "px", e.clientWidth < a && (e.style.width = a + x + "px"))), H(i, M), H(n, z), H(r, O)
    }
    var r = i.GreenSockGlobals || i,
        e = function(e) {
            for (var t = e.split("."), i = r, n = 0; n < t.length; n++) i[t[n]] = i = i[t[n]] || {};
            return i
        }("com.greensock.utils"),
        x = function(e) {
            var t = e.nodeType,
                i = "";
            if (1 === t || 9 === t || 11 === t) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) i += x(e)
            } else if (3 === t || 4 === t) return e.nodeValue;
            return i
        },
        Y = document,
        q = Y.defaultView ? Y.defaultView.getComputedStyle : function() {},
        a = /([A-Z])/g,
        E = /(?:\r|\n|\t\t)/g,
        S = /(?:\s\s+)/g,
        o = " style='position:relative;display:inline-block;" + (Y.all && !Y.addEventListener ? "*display:inline;*zoom:1;'" : "'"),
        n = e.SplitText = r.SplitText = function(e, t) {
            if ("string" == typeof e && (e = n.selector(e)), !e) throw "cannot split a null element.";
            this.elements = s(e) ? function(e) {
                for (var t, i, n = [], r = e.length, a = 0; a < r; a++)
                    if (t = e[a], s(t))
                        for (i = t.length, i = 0; i < t.length; i++) n.push(t[i]);
                    else n.push(t);
                return n
            }(e) : [e], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = t || {}, this.split(t)
        },
        V = function(e, t, i) {
            var n = e.nodeType;
            if (1 === n || 9 === n || 11 === n)
                for (e = e.firstChild; e; e = e.nextSibling) V(e, t, i);
            else 3 !== n && 4 !== n || (e.nodeValue = e.nodeValue.split(t).join(i))
        },
        X = function(e) {
            for (var t, i = c(e.childNodes), n = i.length, r = 0; r < n; r++)(t = i[r])._isSplit ? X(t) : (r && 3 === t.previousSibling.nodeType ? t.previousSibling.nodeValue += 3 === t.nodeType ? t.nodeValue : t.firstChild.nodeValue : 3 !== t.nodeType && e.insertBefore(t.firstChild, t), e.removeChild(t))
        },
        d = function(e, t, i, n) {
            var r, a, s = c(e.childNodes),
                o = s.length,
                l = "absolute" === t.position || !0 === t.absolute;
            if (3 !== e.nodeType || 1 < o) {
                for (t.absolute = !1, r = 0; r < o; r++) 3 === (a = s[r]).nodeType && !/\S+/.test(a.nodeValue) || (l && 3 !== a.nodeType && "inline" === j(a, "display", null, !0) && (a.style.display = "inline-block", a.style.position = "relative"), a._isSplit = !0, d(a, t, i, n));
                return t.absolute = l, void(e._isSplit = !0)
            }! function(e, t, i, n) {
                var r, a, s, o, l, c, u, d, h, p = t.span ? "span" : "div",
                    f = -1 !== (t.type || t.split || "chars,words,lines").indexOf("chars"),
                    m = "absolute" === t.position || !0 === t.absolute,
                    g = t.wordDelimiter || " ",
                    v = " " !== g ? "" : m ? "&#173; " : " ",
                    y = t.span ? "</span>" : "</div>",
                    w = !0,
                    b = Y.createElement("div"),
                    T = e.parentNode;
                for (T.insertBefore(b, e), b.textContent = e.nodeValue, T.removeChild(e), u = -1 !== (r = x(e = b)).indexOf("<"), !1 !== t.reduceWhiteSpace && (r = r.replace(S, " ").replace(E, "")), u && (r = r.split("<").join("{{LT}}")), l = r.length, a = (" " === r.charAt(0) ? v : "") + i(), s = 0; s < l; s++)
                    if ((c = r.charAt(s)) === g && r.charAt(s - 1) !== g && s) {
                        for (a += w ? y : "", w = !1; r.charAt(s + 1) === g;) a += v, s++;
                        s === l - 1 ? a += v : ")" !== r.charAt(s + 1) && (a += v + i(), w = !0)
                    } else "{" === c && "{{LT}}" === r.substr(s, 6) ? (a += f ? n() + "{{LT}}</" + p + ">" : "{{LT}}", s += 5) : 55296 <= c.charCodeAt(0) && c.charCodeAt(0) <= 56319 || 65024 <= r.charCodeAt(s + 1) && r.charCodeAt(s + 1) <= 65039 ? (d = _(r.substr(s, 2)), h = _(r.substr(s + 2, 2)), o = (d < 127462 || 127487 < d || h < 127462 || 127487 < h) && (h < 127995 || 127999 < h) ? 2 : 4, a += f && " " !== c ? n() + r.substr(s, o) + "</" + p + ">" : r.substr(s, o), s += o - 1) : a += f && " " !== c ? n() + c + "</" + p + ">" : c;
                e.outerHTML = a + (w ? y : ""), u && V(T, "{{LT}}", "<")
            }(e, t, i, n)
        },
        t = n.prototype;
    t.split = function(e) {
        this.isSplit && this.revert(), this.vars = e = e || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var t, i, n, r = this.elements.length, a = e.span ? "span" : "div", s = l(e.wordsClass, a), o = l(e.charsClass, a); - 1 < --r;) n = this.elements[r], this._originals[r] = n.innerHTML, t = n.clientHeight, i = n.clientWidth, d(n, e, s, o), u(n, e, this.chars, this.words, this.lines, i, t);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, t.revert = function() {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        for (var e = this._originals.length; - 1 < --e;) this.elements[e].innerHTML = this._originals[e];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, n.selector = i.$ || i.jQuery || function(e) {
        var t = i.$ || i.jQuery;
        return t ? (n.selector = t)(e) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
    }, n.version = "0.5.8"
}(_gsScope),
function() {
    "use strict";

    function e() {
        return (_gsScope.GreenSockGlobals || _gsScope).SplitText
    }
    "undefined" != typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd && define([], e)
}(),
function(e, t) {
    var i;
    "function" == typeof define && define.amd ? define(["module", "exports"], t) : "undefined" != typeof exports ? t(module, exports) : (t(i = {
        exports: {}
    }, i.exports), e.autosize = i.exports)
}(this, function(e, t) {
    "use strict";
    var i, n, u = "function" == typeof Map ? new Map : (i = [], n = [], {
            has: function(e) {
                return -1 < i.indexOf(e)
            },
            get: function(e) {
                return n[i.indexOf(e)]
            },
            set: function(e, t) {
                -1 === i.indexOf(e) && (i.push(e), n.push(t))
            },
            delete: function(e) {
                var t = i.indexOf(e); - 1 < t && (i.splice(t, 1), n.splice(t, 1))
            }
        }),
        d = function(e) {
            return new Event(e, {
                bubbles: !0
            })
        };
    try {
        new Event("test")
    } catch (e) {
        d = function(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t
        }
    }

    function r(r) {
        var i, n, a, e, s, t;

        function o(e) {
            var t = r.style.width;
            r.style.width = "0px", r.offsetWidth, r.style.width = t, r.style.overflowY = e
        }

        function l() {
            var e, t;
            0 !== r.scrollHeight && (e = function(e) {
                for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                    node: e.parentNode,
                    scrollTop: e.parentNode.scrollTop
                }), e = e.parentNode;
                return t
            }(r), t = document.documentElement && document.documentElement.scrollTop, r.style.height = "", r.style.height = r.scrollHeight + i + "px", n = r.clientWidth, e.forEach(function(e) {
                e.node.scrollTop = e.scrollTop
            }), t && (document.documentElement.scrollTop = t))
        }

        function c() {
            l();
            var e = Math.round(parseFloat(r.style.height)),
                t = window.getComputedStyle(r, null),
                i = "content-box" === t.boxSizing ? Math.round(parseFloat(t.height)) : r.offsetHeight;
            if (i < e ? "hidden" === t.overflowY && (o("scroll"), l(), i = "content-box" === t.boxSizing ? Math.round(parseFloat(window.getComputedStyle(r, null).height)) : r.offsetHeight) : "hidden" !== t.overflowY && (o("hidden"), l(), i = "content-box" === t.boxSizing ? Math.round(parseFloat(window.getComputedStyle(r, null).height)) : r.offsetHeight), a !== i) {
                a = i;
                var n = d("autosize:resized");
                try {
                    r.dispatchEvent(n)
                } catch (e) {}
            }
        }
        r && r.nodeName && "TEXTAREA" === r.nodeName && !u.has(r) && (a = n = i = null, e = function() {
            r.clientWidth !== n && c()
        }, s = function(t) {
            window.removeEventListener("resize", e, !1), r.removeEventListener("input", c, !1), r.removeEventListener("keyup", c, !1), r.removeEventListener("autosize:destroy", s, !1), r.removeEventListener("autosize:update", c, !1), Object.keys(t).forEach(function(e) {
                r.style[e] = t[e]
            }), u.delete(r)
        }.bind(r, {
            height: r.style.height,
            resize: r.style.resize,
            overflowY: r.style.overflowY,
            overflowX: r.style.overflowX,
            wordWrap: r.style.wordWrap
        }), r.addEventListener("autosize:destroy", s, !1), "onpropertychange" in r && "oninput" in r && r.addEventListener("keyup", c, !1), window.addEventListener("resize", e, !1), r.addEventListener("input", c, !1), r.addEventListener("autosize:update", c, !1), r.style.overflowX = "hidden", r.style.wordWrap = "break-word", u.set(r, {
            destroy: s,
            update: c
        }), "vertical" === (t = window.getComputedStyle(r, null)).resize ? r.style.resize = "none" : "both" === t.resize && (r.style.resize = "horizontal"), i = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(i) && (i = 0), c())
    }

    function a(e) {
        var t = u.get(e);
        t && t.destroy()
    }

    function s(e) {
        var t = u.get(e);
        t && t.update()
    }
    var o = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? ((o = function(e) {
        return e
    }).destroy = function(e) {
        return e
    }, o.update = function(e) {
        return e
    }) : ((o = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], r), e
    }).destroy = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], a), e
    }, o.update = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], s), e
    }), t.default = o, e.exports = t.default
}),
function(d, P) {
    "use strict";
    var L = d.jQuery || d.Zepto,
        s = 0,
        r = !1;

    function o(p, m, f, e, t) {
        var g = 0,
            l = -1,
            c = -1,
            v = !1,
            y = "afterLoad",
            w = "load",
            b = "error",
            T = "img",
            _ = "src",
            x = "srcset",
            E = "sizes",
            S = "background-image";

        function i() {
            var r, a, s, o;
            v = 1 < d.devicePixelRatio, f = n(f), 0 <= m.delay && setTimeout(function() {
                u(!0)
            }, m.delay), (m.delay < 0 || m.combined) && (e.e = (r = m.throttle, a = function(e) {
                "resize" === e.type && (l = c = -1), u(e.all)
            }, o = 0, function(e, t) {
                var i = new Date - o;

                function n() {
                    o = +new Date, a.call(p, e)
                }
                s && clearTimeout(s), r < i || !m.enableThrottle || t ? n() : s = setTimeout(n, r - i)
            }), e.a = function(e) {
                e = n(e), f.push.apply(f, e)
            }, e.g = function() {
                return f = L(f).filter(function() {
                    return !L(this).data(m.loadedName)
                })
            }, e.f = function(e) {
                for (var t = 0; t < e.length; t++) {
                    var i = f.filter(function() {
                        return this === e[t]
                    });
                    i.length && u(!1, i)
                }
            }, u(), L(m.appendScroll).on("scroll." + t + " resize." + t, e.e))
        }

        function n(e) {
            for (var t = m.defaultImage, i = m.placeholder, n = m.imageBase, r = m.srcsetAttribute, a = m.loaderAttribute, s = m._f || {}, o = 0, l = (e = L(e).filter(function() {
                    var e = L(this),
                        t = M(this);
                    return !e.data(m.handledName) && (e.attr(m.attribute) || e.attr(r) || e.attr(a) || s[t] !== P)
                }).data("plugin_" + m.name, p)).length; o < l; o++) {
                var c = L(e[o]),
                    u = M(e[o]),
                    d = c.attr(m.imageBaseAttribute) || n;
                u === T && d && c.attr(r) && c.attr(r, h(c.attr(r), d)), s[u] === P || c.attr(a) || c.attr(a, s[u]), u === T && t && !c.attr(_) ? c.attr(_, t) : u === T || !i || c.css(S) && "none" !== c.css(S) || c.css(S, "url('" + i + "')")
            }
            return e
        }

        function u(e, t) {
            if (f.length) {
                for (var i, n, r, a, s, o = t || f, l = !1, c = m.imageBase || "", u = m.srcsetAttribute, d = m.handledName, h = 0; h < o.length; h++) {
                    (e || t || k(o[h])) && (i = L(o[h]), n = M(o[h]), r = i.attr(m.attribute), a = i.attr(m.imageBaseAttribute) || c, s = i.attr(m.loaderAttribute), i.data(d) || m.visibleOnly && !i.is(":visible") || !((r || i.attr(u)) && (n === T && (a + r !== i.attr(_) || i.attr(u) !== i.attr(x)) || n !== T && a + r !== i.css(S)) || s) || (l = !0, i.data(d, !0), C(i, n, a, s)))
                }
                l && (f = L(f).filter(function() {
                    return !L(this).data(d)
                }))
            } else m.autoDestroy && p.destroy()
        }

        function C(t, e, i, n) {
            ++g;
            var r = function() {
                O("onError", t), z(), r = L.noop
            };
            O("beforeLoad", t);
            var a, s, o, l = m.attribute,
                c = m.srcsetAttribute,
                u = m.sizesAttribute,
                d = m.retinaAttribute,
                h = m.removeAttribute,
                p = m.loadedName,
                f = t.attr(d);
            n ? (a = function() {
                h && t.removeAttr(m.loaderAttribute), t.data(p, !0), O(y, t), setTimeout(z, 1), a = L.noop
            }, t.off(b).one(b, r).one(w, a), O(n, t, function(e) {
                e ? (t.off(w), a()) : (t.off(b), r())
            }) || t.trigger(b)) : ((s = L(new Image)).one(b, r).one(w, function() {
                t.hide(), e === T ? t.attr(E, s.attr(E)).attr(x, s.attr(x)).attr(_, s.attr(_)) : t.css(S, "url('" + s.attr(_) + "')"), t[m.effect](m.effectTime), h && (t.removeAttr(l + " " + c + " " + d + " " + m.imageBaseAttribute), u !== E && t.removeAttr(u)), t.data(p, !0), O(y, t), s.remove(), z()
            }), o = (v && f ? f : t.attr(l)) || "", s.attr(E, t.attr(u)).attr(x, t.attr(c)).attr(_, o ? i + o : null), s.complete && s.trigger(w))
        }

        function k(e) {
            var t = e.getBoundingClientRect(),
                i = m.scrollDirection,
                n = m.threshold,
                r = (0 <= c ? c : c = L(d).height()) + n > t.top && -n < t.bottom,
                a = (0 <= l ? l : l = L(d).width()) + n > t.left && -n < t.right;
            return "vertical" === i ? r : ("horizontal" === i || r) && a
        }

        function M(e) {
            return e.tagName.toLowerCase()
        }

        function h(e, t) {
            if (t) {
                var i = e.split(",");
                e = "";
                for (var n = 0, r = i.length; n < r; n++) e += t + i[n].trim() + (n !== r - 1 ? "," : "")
            }
            return e
        }

        function z() {
            --g, f.length || g || O("onFinishedAll")
        }

        function O(e, t, i) {
            return (e = m[e]) && (e.apply(p, [].slice.call(arguments, 1)), 1)
        }
        "event" === m.bind || r ? i() : L(d).on(w + "." + t, i)
    }

    function c(e, t) {
        var i = this,
            n = L.extend({}, i.config, t),
            r = {},
            a = n.name + "-" + ++s;
        return i.config = function(e, t) {
            return t === P ? n[e] : (n[e] = t, i)
        }, i.addItems = function(e) {
            return r.a && r.a("string" === L.type(e) ? L(e) : e), i
        }, i.getItems = function() {
            return r.g ? r.g() : {}
        }, i.update = function(e) {
            return r.e && r.e({}, !e), i
        }, i.force = function(e) {
            return r.f && r.f("string" === L.type(e) ? L(e) : e), i
        }, i.loadAll = function() {
            return r.e && r.e({
                all: !0
            }, !0), i
        }, i.destroy = function() {
            return L(n.appendScroll).off("." + a, r.e), L(d).off("." + a), r = {}, P
        }, o(i, n, e, r, a), n.chainable ? e : i
    }
    L.fn.Lazy = L.fn.lazy = function(e) {
        return new c(this, e)
    }, L.Lazy = L.lazy = function(e, t, i) {
        if (L.isFunction(t) && (i = t, t = []), L.isFunction(i)) {
            e = L.isArray(e) ? e : [e], t = L.isArray(t) ? t : [t];
            for (var n = c.prototype.config, r = n._f || (n._f = {}), a = 0, s = e.length; a < s; a++) n[e[a]] !== P && !L.isFunction(n[e[a]]) || (n[e[a]] = i);
            for (var o = 0, l = t.length; o < l; o++) r[t[o]] = e[0]
        }
    }, c.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: d,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: P,
        afterLoad: P,
        onError: P,
        onFinishedAll: P
    }, L(d).on("load", function() {
        r = !0
    })
}(window), window.scroll(0, 0), gsap.registerPlugin(ScrollTrigger), window.isMobile = function() {
    var e, t = !1;
    return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
};
var tl = gsap.timeline(),
    app = {
        wrapper: ".wrapper",
        scroller: ".wrapper",
        animateLines: animateLines,
        settings: "undefined" != typeof themeSettings && "object" == typeof themeSettings && null !== themeSettings ? themeSettings : {
            textAnimation: !0,
            customScroll: !0,
            parallax: !0,
            parallaxMobile: !1,
            noise: !0,
            scrollAnimation: !0
        },
        locoScroll: !1,
        customScrollUpdate: function() {
            app.locoScroll && setTimeout(function() {
                app.locoScroll.update()
            }, 50)
        },
        init: function() {
            app.settings.customScroll || (app.scroller = window);
            var e = app.settings.scrollAnimation ? .5 : 0;
            tl.to(app.wrapper, {
                autoAlpha: 1,
                duration: e
            })
        }
    };
app.init(), app.settings.customScroll && (app.locoScroll = new LocomotiveScroll({
        el: document.querySelector(app.scroller),
        smooth: !0,
        lerp: .15
    }), ScrollTrigger.scrollerProxy(app.scroller, {
        scrollTop: function(e) {
            return arguments.length ? app.locoScroll.scrollTo(e, 0, 0) : app.locoScroll.scroll.instance.scroll.y
        },
        getBoundingClientRect: function() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        pinType: document.querySelector(app.scroller).style.transform ? "transform" : "fixed"
    }), app.locoScroll.on("scroll", ScrollTrigger.update)),
    function(l) {
        l.fn.splitLines = function(e) {
            var t = !!e.additional && e.additional,
                i = l(this),
                n = new SplitText(i, {
                    type: "words"
                }).words,
                r = l(n).not(".switch div");
            r.wrap("<div class='word'>"), t && (r = r.add(t));
            var a = 0,
                s = r.first().parent().offset().top,
                o = [];
            return r.each(function() {
                var e = l(this),
                    t = e.parent(),
                    i = t.offset().top;
                i - s > t.height() + parseInt(t.css("margin-bottom")) && (s = i, a++), o[a] || (o[a] = []), o[a].push(e)
            }), l(o)
        }
    }(jQuery),
    function(e) {
        app.$wrapper = e(app.wrapper), e("img", app.$wrapper).on("load", function() {
            app.customScrollUpdate()
        })
    }(jQuery),
    function(o) {
        app.parallax = function(e, t) {
            if (!app.settings.parallax) return !1;
            if (app.settings.parallax && isMobile() && !app.settings.parallaxMobile) return !1;
            var i = e.img ? o(e.img) : o(e);
            if (i.data("inited")) return !1;
            i.data("inited", !0), t = t || 20;
            var n = i.parent(".img-holder"),
                r = i.get(0).naturalHeight || i.height(),
                a = i.get(0).naturalWidth || i.width();
            if (a <= 1 || r <= 1) return i.data("inited", !1), !1;
            n.wrapInner('<div class="img-holder--inner"></div>');
            var s = n.children(".img-holder--inner");
            Math.ceil(r / (1 + t / 100));
            y_from = "-" + t + "%", y_to = t + "%", s.css({}), gsap.timeline({
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: n,
                    scrub: 0,
                    start: "top bottom",
                    end: "bottom top"
                }
            }).from(i, {
                y: y_from
            }).to(i, {
                y: y_to
            }), app.customScrollUpdate()
        }
    }(jQuery),
    function(e) {
        var t, i, n, r = e(".hero-post");
        r.length && ((t = e(".heading", r)).length && app.animateLines({
            target: t
        }), (i = e(".year", r)).length && app.settings && app.settings.scrollAnimation && TweenLite.from(i, {
            duration: .7,
            y: "30%",
            rotation: "90deg",
            opacity: 0,
            ease: "sine",
            delay: 1,
            onComplete: function() {
                TweenLite.to(i, {
                    duration: .7,
                    ease: "sine",
                    rotation: "90deg",
                    scrollTrigger: {
                        scroller: app.scroller,
                        trigger: i,
                        scrub: .25,
                        start: "top " + i.offset().top,
                        end: "top top"
                    }
                })
            }
        }), (n = e(".hero-post-description", r)).length && app.animateLines({
            target: e(".col", n)
        }))
    }(jQuery),
    function(i) {
        i(".media-full-width, .media-images").each(function() {
            var t = i(this),
                e = 20,
                e = 1 == i(".col", t).length ? 30 : e;
            i("img", t).each(function() {
                0 !== this.naturalWidth && app.parallax(this, e), i(this).on("load", function() {
                    app.parallax(this, e), ScrollTrigger.refresh()
                })
            }), app.settings.lazyLoad && ScrollTrigger.create({
                trigger: t,
                start: "top bottom+=" + .8 * window.innerHeight,
                scroller: app.scroller,
                once: !0,
                onEnter: function(e) {
                    i("img", t).on("load", function() {
                        i(this).removeClass("lazy")
                    }), i("img", t).Lazy({
                        bind: "event",
                        delay: 0
                    })
                }
            })
        }), app.animateLines({
            target: i(".wysiwyg")
        });
        var e = i(".case-inner");
        e.length && (app.animateLines({
            target: i("h2, h3", e)
        }), app.animateLines({
            target: i(".item-text", e)
        }), i(".item-holder .img-holder img", e).on("load", function() {
            ScrollTrigger.refresh(), app.parallax(image)
        }))
    }(jQuery),
    function(r) {
        r("body").on("click", "a", function(e) {
            var t, i, n = r(this).attr("href");
            1 < n.length && "#" == n.charAt(0) && ((t = r(n)).length && (e.preventDefault(), app.locoScroll ? app.locoScroll.scrollTo(n) : (i = t.offset().top, window.scrollTo ? window.scrollTo({
                top: i,
                behavior: "smooth"
            }) : window.scroll(0, i))))
        })
    }(jQuery),
    function(t) {
        var e, i, n = t(".about");
        n.length && (e = t(".section-title", n), app.animateLines({
            target: e
        }), app.settings && app.settings.scrollAnimation && n.find('[class*="star"]').each(function() {
            var e = t(this);
            TweenLite.to(e, {
                duration: .5,
                rotate: "75deg",
                ease: "sine",
                stagger: .1,
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: e,
                    scrub: .25,
                    start: "top bottom",
                    end: "bottom top"
                }
            })
        }), i = t(".about-text", n), app.animateLines({
            target: i
        }))
    }(jQuery),
    function(t) {
        var e, i, n, r, a, s, o, l, c, u, d, h, p = t(".approach");
        p.length && (e = t(".section-title", p), app.animateLines({
            target: e
        }), (i = t(".img-holder svg", p)).length && (r = (n = t("circle", i).eq(0)).attr("cx"), a = n.attr("cy"), l = "M " + (r - (s = n.attr("r"))) + ", " + a + "a " + s + "," + s + " 0 1,0 " + 2 * s + ",0 a " + s + "," + s + " 0 1,0 -" + 2 * s + ",0", (o = document.createElementNS("http://www.w3.org/2000/svg", "path")).setAttribute("d", l), c = o.getTotalLength(), u = t("circle", i).eq(1), TweenMax.from(u, 8, {
            repeat: -1,
            onUpdate: function(e) {
                e = this.progress();
                e = c - c * e;
                var t = o.getPointAtLength(e);
                u.attr("cx", t.x).attr("cy", t.y)
            },
            scrollTrigger: {
                scroller: app.scroller,
                trigger: i
            }
        }), t("circle", i).not(n).not(u).each(function() {
            var e = t(this);
            TweenMax.from(e, .7, {
                scale: 0,
                transformOrigin: "center",
                delay: .2,
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: e
                }
            })
        }), d = t("path", i), TweenMax.from(d, .7, {
            scale: 0,
            transformOrigin: "center",
            delay: .2,
            scrollTrigger: {
                scroller: app.scroller,
                trigger: d
            }
        })), h = t(".text-holder", p), app.animateLines({
            target: h
        }))
    }(jQuery),
    function(i) {
        var e, t = i(".cases"),
            n = i(".grid", t);

        function r() {
            n.each(function() {
                var e = i(this);
                if (e.data("inited")) return !1;
                e.data("inited", !0), i("img", e).each(function() {
                    var t = i(this);
                    0 !== this.naturalWidth && app.parallax(this), app.settings.lazyLoad && ScrollTrigger.create({
                        trigger: t,
                        start: "top bottom+=" + .8 * window.innerHeight,
                        scroller: app.scroller,
                        once: !0,
                        onEnter: function(e) {
                            t.on("load", function() {
                                app.parallax(this), t.removeClass("lazy")
                            }), t.Lazy({
                                bind: "event",
                                delay: 0
                            })
                        }
                    })
                }), n.data("masonry") && e.masonry()
            })
        }

        function a() {
            768 <= window.innerWidth ? n.masonry({
                itemSelector: ".cases .grid-item",
                columnWidth: ".grid-sizer",
                stamp: ".stamp",
                percentPosition: !0,
                gutter: ".gutter-sizer",
                horizontalOrder: !0
            }) : n.data("masonry") && n.masonry("destroy"), r()
        }
        t.length && (n.on("layoutComplete", function() {
            ScrollTrigger.refresh()
        }), e = i(".section-title", t), app.animateLines({
            target: e
        }), i(".grid-item", n).each(function() {
            var e = i(this),
                t = i("svg", e);
            t.wrap('<span class="svg-holder" />'), app.animateLines({
                target: e,
                additional: t
            })
        }), a(), i(window).on("resize", function() {
            a()
        }))
    }(jQuery),
    function(e) {
        var t;
        app.settings && !app.settings.textAnimation || (t = e(".footer")).length && ($animation = e(".footer-logo", t).add(".socials", t).add(".mail", t), $animation.wrap('<div class="holder"></div>'), TweenLite.from($animation, {
            duration: .7,
            y: "100%",
            ease: "sine",
            delay: .1,
            scrollTrigger: {
                once: !0,
                scroller: app.scroller,
                trigger: $animation
            }
        }))
    }(jQuery),
    function(i) {
        var e, t = i(".form"),
            n = i(".section-title", t);
        n.length && ((e = i(".icon", n)).wrap('<div class="icon-holder"></div>'), app.animateLines({
            target: n,
            additional: e
        }));
        var r, a, s = i("textarea", t);
        autosize(s), i(window).on("wpcf7submit", function(e) {
            setTimeout(function() {
                app.customScrollUpdate()
            }, 300)
        }), app.settings && app.settings.scrollAnimation && (r = i("input, textarea", t).filter(":visible").not('[type="submit"]'), a = i('[type="submit"]', t), r.css("border", "none"), r.after('<div class="line" />'), r.each(function() {
            var e = i(this),
                t = e.next();
            TweenLite.from(e, {
                duration: .7,
                y: "100%",
                ease: "sine",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: e
                }
            }), TweenLite.to(t, {
                duration: .7,
                width: "100%",
                ease: "sine",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: e
                }
            })
        }), a.length && TweenLite.from(a, {
            duration: .7,
            y: "100%",
            ease: "sine",
            scrollTrigger: {
                scroller: app.scroller,
                trigger: a
            }
        }))
    }(jQuery),
    function(e) {
        var t, i;
        app.settings && !app.settings.textAnimation || (t = e(".header"), i = e(".header-holder", t), t.css({
            overflow: "hidden"
        }), tl.from(i, {
            duration: .8,
            y: t.outerHeight(),
            ease: "sine"
        }, .5), tl.addLabel("header"))
    }(jQuery),
    function(e) {
        var t;
        e("#modal-video").appendTo("body"), e(".hero").length && (t = e(".hero h1"), app.animateLines({
            target: t,
            additional: ".hero .arrow svg, .hero .switch, .hero .showreel a"
        }))
    }(jQuery),
    function(o) {
        var e, t, i, n, r, a, s = o(".industries");
        s.length && (e = o(".section-title", s), app.animateLines({
            target: e
        }), t = o(".grid-item", s), i = 0, n = t.first().offset().top, r = [], t.each(function() {
            var e = o(this),
                t = e.offset().top;
            t - n > e.height() && (n = t, i++), r[i] ? r[i] = r[i].add(e) : r[i] = e
        }), a = o(r), app.settings && app.settings.scrollAnimation && a.each(function(e) {
            var t = o(this);
            e++, t.css({
                overflow: "hidden"
            });
            var i = o(".grid-item-title", t).children(),
                n = o(".grid-item-line", t),
                r = o("ul", t),
                a = o("a", t),
                s = i.add(r);
            a.length && (TweenLite.from(i.add(a), {
                duration: .5,
                y: "100%",
                ease: "sine",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: s
                }
            }, e / 3), TweenLite.from(n, {
                duration: .5,
                width: "0%",
                ease: "sine",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: s
                },
                onComplete: function() {
                    o(this.targets()).removeAttr("style")
                }
            }, e / 3))
        }))
    }(jQuery),
    function(t) {
        var e, i, n, r, a = t("#modal-video iframe"),
            s = t(".thumbs"),
            o = t(".showreel"),
            l = a.attr("data-src");

        function c() {
            n || (l = l.replace(/\?.*/, "") + "?controls=0&transparent=0&title=0&byline=0&loop=1", a.attr("src", l), (n = new Vimeo.Player(a[0])).on("play", u), n.on("playing", u)), (window.player = n).setCurrentTime(0), setTimeout(function() {
                r.modal("show")
            }, 200)
        }

        function u(e) {
            s.fadeOut(150)
        }
        "about:blank" != l && (i = 1 < (e = l.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i)).length ? e[1] : e[0], n = !1, r = t("#modal-video"), t.getJSON("https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + i, {
            format: "json"
        }, function(e) {
            s.css("background-image", "url(" + e.thumbnail_url + ")")
        }), t(".switch").on("click", function(e) {
            e.preventDefault(), t(this).find("input").prop("checked", !0).trigger("change"), c()
        }), o.on("click", function(e) {
            e.preventDefault(), c()
        }), r.on("show.bs.modal", function(e) {
            n.play()
        }).on("hide.bs.modal", function(e) {
            n.pause()
        }).on("hidden.bs.modal", function() {
            t(".switch input").prop("checked", !1).trigger("change")
        }))
    }(jQuery);
var noise = function() {
    function t() {
        for (var e = r.createImageData(a, s), t = new Uint32Array(e.data.buffer), i = t.length, n = 0; n < i; n++) Math.random() < .5 && (t[n] = 4278190080);
        o.push(e)
    }

    function i() {
        9 === l ? l = 0 : l++, r.putImageData(o[l], 0, 0), window.setTimeout(function() {
            window.requestAnimationFrame(i)
        }, 50)
    }

    function e() {
        a = window.innerWidth, s = window.innerHeight, n.width = a, n.height = s;
        for (var e = 0; e < 10; e++) t();
        i()
    }
    var n, r, a, s, o = [],
        l = 0;
    ! function() {
        if (!(n = document.getElementById("noise"))) return;
        r = n.getContext("2d"), e()
    }()
};
(!app || app.settings && app.settings.noise) && noise(),
    function(i) {
        i(".services-text").each(function(e) {
            var t = i(this);
            new Swiper(this, {
                slidesPerView: "auto",
                freeMode: !0,
                speed: 1e4,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: !1
                },
                loop: !0,
                allowTouchMove: !1
            });
            app.settings && app.settings.scrollAnimation && TweenLite.to(t, {
                duration: .5,
                x: "-15%",
                ease: "sine",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: t,
                    scrub: .25,
                    start: "top bottom",
                    end: "bottom top"
                }
            })
        })
    }(jQuery),
    function(i) {
        var e, t = i(".text-row");
        t.length && (t.css({
            overflow: "hidden"
        }), e = i(".text-row--inner", t), app.settings && app.settings.scrollAnimation && t.each(function() {
            var e = i(this),
                t = i(".row", e);
            t.contents().clone();
            TweenLite.to(t, {
                duration: .5,
                x: "-10%",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: e,
                    scrub: .25,
                    start: "top bottom",
                    end: "bottom top"
                }
            })
        }), app.settings && app.settings.textAnimation && tl.from(e, {
            duration: .5,
            y: t.outerHeight(),
            ease: "sine",
            scrollTrigger: {
                scroller: app.scroller,
                trigger: t
            }
        }, "-=0.5"))
    }(jQuery),
    function(i) {
        var e, t, n, r = i(".values");
        r.length && (e = i(".section-title", r), app.animateLines({
            target: e
        }), t = i(".grid-values .grid-item"), app.settings && app.settings.scrollAnimation && t.each(function(e) {
            var t = i(this);
            TweenLite.from(t, {
                duration: .7,
                opacity: 0,
                delay: .2 * e,
                y: "10%",
                scrollTrigger: {
                    scroller: app.scroller,
                    trigger: t
                }
            })
        }), (n = i(".arrow svg", r)).length && TweenLite.from(n, {
            repeat: 4,
            duration: .7,
            yoyo: !0,
            ease: "elastic.easeOut",
            x: "-30%",
            delay: .7,
            scrollTrigger: {
                scroller: app.scroller,
                trigger: n
            }
        }))
    }(jQuery);