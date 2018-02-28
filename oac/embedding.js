/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.2 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs, require, define;
! function(global, setTimeout) {
    function commentReplace(e, t) {
        return t || ""
    }

    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var i;
            for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var i;
            for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var i;
        for (i in e)
            if (hasProp(e, i) && t(e[i], i)) break
    }

    function mixin(e, t, i, r) {
        return t && eachProp(t, function(t, n) {
            !i && hasProp(e, n) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)))
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, i, r) {
        var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n
    }

    function newContext(e) {
        function t(e) {
            var t, i;
            for (t = 0; t < e.length; t++)
                if (i = e[t], "." === i) e.splice(t, 1), t -= 1;
                else if (".." === i) {
                if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function i(e, i, r) {
            var n, o, a, s, u, c, d, p, f, l, h, m, g = i && i.split("/"),
                v = y.map,
                x = v && v["*"];
            if (e && (e = e.split("/"), d = e.length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[d]) && (e[d] = e[d].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || x)) {
                a = e.split("/");
                e: for (s = a.length; s > 0; s -= 1) {
                    if (c = a.slice(0, s).join("/"), g)
                        for (u = g.length; u > 0; u -= 1)
                            if (o = getOwn(v, g.slice(0, u).join("/")), o && (o = getOwn(o, c))) {
                                p = o, f = s;
                                break e
                            }!l && x && getOwn(x, c) && (l = getOwn(x, c), h = s)
                }!p && l && (p = l, f = h), p && (a.splice(0, f, p), e = a.join("/"))
            }
            return n = getOwn(y.pkgs, e), n ? n : e
        }

        function r(e) {
            isBrowser && each(scripts(), function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function n(e) {
            var t = getOwn(y.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(), q.require.undef(e), q.makeRequire(null, {
                skipMap: !0
            })([e]), !0
        }

        function o(e) {
            var t, i = e ? e.indexOf("!") : -1;
            return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]
        }

        function a(e, t, r, n) {
            var a, s, u, c, d = null,
                p = t ? t.name : null,
                f = e,
                l = !0,
                h = "";
            return e || (l = !1, e = "_@r" + (T += 1)), c = o(e), d = c[0], e = c[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = s && s.normalize ? s.normalize(e, function(e) {
                return i(e, p, n)
            }) : e.indexOf("!") === -1 ? i(e, p, n) : e : (h = i(e, p, n), c = o(h), d = c[0], h = c[1], r = !0, a = q.nameToUrl(h))), u = !d || s || r ? "" : "_unnormalized" + (A += 1), {
                prefix: d,
                name: h,
                parentMap: t,
                unnormalized: !!u,
                url: a,
                originalName: f,
                isDefine: l,
                id: (d ? d + "!" + h : h) + u
            }
        }

        function s(e) {
            var t = e.id,
                i = getOwn(S, t);
            return i || (i = S[t] = new q.Module(e)), i
        }

        function u(e, t, i) {
            var r = e.id,
                n = getOwn(S, r);
            !hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e), n.error && "error" === t ? i(n.error) : n.on(t, i)) : "defined" === t && i(j[r])
        }

        function c(e, t) {
            var i = e.requireModules,
                r = !1;
            t ? t(e) : (each(i, function(t) {
                var i = getOwn(S, t);
                i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)))
            }), r || req.onError(e))
        }

        function d() {
            globalDefQueue.length && (each(globalDefQueue, function(e) {
                var t = e[0];
                "string" == typeof t && (q.defQueueMap[t] = !0), O.push(e)
            }), globalDefQueue = [])
        }

        function p(e) {
            delete S[e], delete k[e]
        }

        function f(e, t, i) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, n) {
                var o = r.id,
                    a = getOwn(S, o);
                !a || e.depMatched[n] || i[o] || (getOwn(t, o) ? (e.defineDep(n, j[o]), e.check()) : f(a, t, i))
            }), i[r] = !0)
        }

        function l() {
            var e, t, i = 1e3 * y.waitSeconds,
                o = i && q.startTime + i < (new Date).getTime(),
                a = [],
                s = [],
                u = !1,
                d = !0;
            if (!x) {
                if (x = !0, eachProp(k, function(e) {
                        var i = e.map,
                            c = i.id;
                        if (e.enabled && (i.isDefine || s.push(e), !e.error))
                            if (!e.inited && o) n(c) ? (t = !0, u = !0) : (a.push(c), r(c));
                            else if (!e.inited && e.fetched && i.isDefine && (u = !0, !i.prefix)) return d = !1
                    }), o && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = q.contextName, c(e);
                d && each(s, function(e) {
                    f(e, {}, {})
                }), o && !t || !u || !isBrowser && !isWebWorker || w || (w = setTimeout(function() {
                    w = 0, l()
                }, 50)), x = !1
            }
        }

        function h(e) {
            hasProp(j, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
        }

        function m(e, t, i, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1)
        }

        function g(e) {
            var t = e.currentTarget || e.srcElement;
            return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (d(); O.length;) {
                if (e = O.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                h(e)
            }
            q.defQueueMap = {}
        }
        var x, b, q, E, w, y = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            S = {},
            k = {},
            M = {},
            O = [],
            j = {},
            P = {},
            R = {},
            T = 1,
            A = 1;
        return E = {
            require: function(e) {
                return e.require ? e.require : e.require = q.makeRequire(e.map)
            },
            exports: function(e) {
                if (e.usingExports = !0, e.map.isDefine) return e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(y.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, b = function(e) {
            this.events = getOwn(M, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function(e, t, i, r) {
                r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, q.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void q.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var e = this.map.url;
                P[e] || (P[e] = !0, q.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e, t, i = this.map.id,
                        r = this.depExports,
                        n = this.exports,
                        o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        n = q.execCb(i, o, r, n)
                                    } catch (t) {
                                        e = t
                                    } else n = q.execCb(i, o, r, n);
                                    if (this.map.isDefine && void 0 === n && (t = this.module, t ? n = t.exports : this.usingExports && (n = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                } else n = o;
                                if (this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad)) {
                                    var a = [];
                                    each(this.depMaps, function(e) {
                                        a.push(e.normalizedMap || e)
                                    }), req.onResourceLoad(q, this.map, a)
                                }
                                p(i), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(q.defQueueMap, i) || this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    r = a(e.prefix);
                this.depMaps.push(r), u(r, "defined", bind(this, function(r) {
                    var n, o, d, f = getOwn(R, this.map.id),
                        l = this.map.name,
                        h = this.map.parentMap ? this.map.parentMap.name : null,
                        m = q.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function(e) {
                        return i(e, h, !0)
                    }) || ""), o = a(e.prefix + "!" + l, this.map.parentMap), u(o, "defined", bind(this, function(e) {
                        this.map.normalizedMap = o, this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), d = getOwn(S, o.id), void(d && (this.depMaps.push(o), this.events.error && d.on("error", bind(this, function(e) {
                        this.emit("error", e)
                    })), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : (n = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), n.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function(e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
                        }), c(e)
                    }), n.fromText = bind(this, function(i, r) {
                        var o = e.name,
                            u = a(o),
                            d = useInteractive;
                        r && (i = r), d && (useInteractive = !1), s(u), hasProp(y.config, t) && (y.config[o] = y.config[t]);
                        try {
                            req.exec(i)
                        } catch (e) {
                            return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]))
                        }
                        d && (useInteractive = !0), this.depMaps.push(u), q.completeLoad(o), m([o], n)
                    }), void r.load(e.name, m, n, y))
                })), q.enable(r, this), this.pluginMaps[r.id] = r
            },
            enable: function() {
                k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var i, r, n;
                    if ("string" == typeof e) {
                        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id)) return void(this.depExports[t] = n(this));
                        this.depCount += 1, u(e, "defined", bind(this, function(e) {
                            this.undefed || (this.defineDep(t, e), this.check())
                        })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function(e) {
                            this.emit("error", e)
                        }))
                    }
                    i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(S, e.id);
                    t && !t.enabled && q.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var i = this.events[e];
                i || (i = this.events[e] = []), i.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, q = {
            config: y,
            contextName: e,
            registry: S,
            defined: j,
            urlFetched: P,
            defQueue: O,
            defQueueMap: {},
            Module: b,
            makeModuleMap: a,
            nextTick: req.nextTick,
            onError: c,
            configure: function(e) {
                if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
                    var t = e.urlArgs;
                    e.urlArgs = function(e, i) {
                        return (i.indexOf("?") === -1 ? "?" : "&") + t
                    }
                }
                var i = y.shim,
                    r = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    r[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e
                }), e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (R[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), i[t] = e
                }), y.shim = i), e.packages && each(e.packages, function(e) {
                    var t, i;
                    e = "string" == typeof e ? {
                        name: e
                    } : e, i = e.name, t = e.location, t && (y.paths[i] = e.location), y.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(S, function(e, t) {
                    e.inited || e.map.unnormalized || (e.map = a(t, null, !0))
                }), (e.deps || e.callback) && q.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, n) {
                function o(i, r, u) {
                    var d, p, f;
                    return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, o) : (p = a(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function() {
                        v(), f = s(a(null, t)), f.skipMap = n.skipMap, f.init(i, r, u, {
                            enabled: !0
                        }), l()
                    }), o)
                }
                return n = n || {}, mixin(o, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var r, n = e.lastIndexOf("."),
                            o = e.split("/")[0],
                            a = "." === o || ".." === o;
                        return n !== -1 && (!a || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0)
                    },
                    defined: function(e) {
                        return hasProp(j, a(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = a(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e)
                    }
                }), t || (o.undef = function(e) {
                    d();
                    var i = a(e, t, !0),
                        n = getOwn(S, e);
                    n.undefed = !0, r(e), delete j[e], delete P[i.url], delete M[e], eachReverse(O, function(t, i) {
                        t[0] === e && O.splice(i, 1)
                    }), delete q.defQueueMap[e], n && (n.events.defined && (M[e] = n.events), p(e))
                }), o
            },
            enable: function(e) {
                var t = getOwn(S, e.id);
                t && s(e).enable()
            },
            completeLoad: function(e) {
                var t, i, r, o = getOwn(y.shim, e) || {},
                    a = o.exports;
                for (d(); O.length;) {
                    if (i = O.shift(), null === i[0]) {
                        if (i[0] = e, t) break;
                        t = !0
                    } else i[0] === e && (t = !0);
                    h(i)
                }
                if (q.defQueueMap = {}, r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
                    if (!(!y.enforceDefine || a && getGlobal(a))) return n(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                    h([e, o.deps || [], o.exportsFn])
                }
                l()
            },
            nameToUrl: function(e, t, i) {
                var r, n, o, a, s, u, c, d = getOwn(y.pkgs, e);
                if (d && (e = d), c = getOwn(R, e)) return q.nameToUrl(c, t, i);
                if (req.jsExtRegExp.test(e)) s = e + (t || "");
                else {
                    for (r = y.paths, n = e.split("/"), o = n.length; o > 0; o -= 1)
                        if (a = n.slice(0, o).join("/"), u = getOwn(r, a)) {
                            isArray(u) && (u = u[0]), n.splice(0, o, u);
                            break
                        }
                    s = n.join("/"), s += t || (/^data\:|^blob\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s
                }
                return y.urlArgs && !/^blob\:/.test(s) ? s + y.urlArgs(e, s) : s
            },
            load: function(e, t) {
                req.load(q, e, t)
            },
            execCb: function(e, t, i, r) {
                return t.apply(r, i)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = g(e);
                    q.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = g(e);
                if (!n(t.id)) {
                    var i = [];
                    return eachProp(S, function(e, r) {
                        0 !== r.indexOf("_@r") && each(e.depMaps, function(e) {
                            if (e.id === t.id) return i.push(r), !0
                        })
                    }), c(makeError("scripterror", 'Script error for "' + t.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), e, [t.id]))
                }
            }
        }, q.require = q.makeRequire(), q
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
            if ("interactive" === e.readyState) return interactiveScript = e
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.2",
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, i, r) {
            var n, o, a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []), o && o.context && (a = o.context), n = getOwn(contexts, a), n || (n = contexts[a] = req.s.newContext(a)), o && n.configure(o), n.require(e, t, i)
        }, req.config = function(e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(e) {
            setTimeout(e, 4)
        } : function(e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, i) {
            var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
        }, req.load = function(e, t, i) {
            var r, n = e && e.config || {};
            if (isBrowser) return r = req.createNode(n, t, i), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, n.onNodeCreated && n.onNodeCreated(r, n, t, i), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
            if (isWebWorker) try {
                setTimeout(function() {}, 0), importScripts(i), e.completeLoad(t)
            } catch (r) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, r, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || mainScript.indexOf("!") !== -1 || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(e, t, i) {
            var r, n;
            "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(e, i) {
                t.push(i)
            }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")])), n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);
window.bitech_bootstrap_baseUrl = 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/ui/api/';
window.bitech_contextUrl = 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/ui/';
window.bitech_requirejs_config = {
    waitSeconds: 600,
    locale: 'en_US',
    paths: {
        'application/application': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'application/application_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_ar',
        'application/application_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_cs',
        'application/application_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_da',
        'application/application_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_de',
        'application/application_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_el',
        'application/application_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_es',
        'application/application_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_et',
        'application/application_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_fi',
        'application/application_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_fr',
        'application/application_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_fr-CA',
        'application/application_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_he',
        'application/application_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_hr',
        'application/application_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_hu',
        'application/application_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_it',
        'application/application_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_ja',
        'application/application_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_ko',
        'application/application_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_lt',
        'application/application_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_lv',
        'application/application_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_nl',
        'application/application_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_no',
        'application/application_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_pl',
        'application/application_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_pt',
        'application/application_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_pt-PT',
        'application/application_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_ro',
        'application/application_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_ru',
        'application/application_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_sk',
        'application/application_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_sv',
        'application/application_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_th',
        'application/application_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_tr',
        'application/application_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_zh-Hans',
        'application/application_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application_zh-Hant',
        'com-company-autoRefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055',
        'com-company-autoRefresh/autoRefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/autoRefresh',
        'com-company-autoRefresh/autoRefreshIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/autoRefreshIcon',
        'com-company-autoRefresh/autoRefreshstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/autoRefreshstyles',
        'com-company-autoRefresh/loading': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/loading',
        'com-company-autoRefresh/loading_1': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/loading_1',
        'com-company-autoRefresh/oneTimeRefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/oneTimeRefresh',
        'com-company-autoRefresh/refresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/refresh',
        'com-company-autoRefresh/stop': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/stop',
        'com-company-autoRefresh/timerRefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-autoRefresh/1.0.0.1492420892055/timerRefresh',
        'com-company-base64ImgViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-base64ImgViz/1.0.0.1480088032340',
        'com-company-base64ImgViz/base64ImgViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-base64ImgViz/1.0.0.1480088032340/base64ImgViz',
        'com-company-base64ImgViz/base64ImgVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-base64ImgViz/1.0.0.1480088032340/base64ImgVizIcon',
        'com-company-base64ImgViz/base64ImgVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-base64ImgViz/1.0.0.1480088032340/base64ImgVizdatamodelhandler',
        'com-company-base64ImgViz/base64ImgVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-base64ImgViz/1.0.0.1480088032340/base64ImgVizstyles',
        'com-company-bulletViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241',
        'com-company-bulletViz/bullet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/bullet',
        'com-company-bulletViz/bulletViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/bulletViz',
        'com-company-bulletViz/bulletVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/bulletVizIcon',
        'com-company-bulletViz/bulletVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/bulletVizdatamodelhandler',
        'com-company-bulletViz/bulletVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/bulletVizstyles',
        'com-company-bulletViz/d3_tip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-bulletViz/1.0.0.1488174198241/d3_tip',
        'com-company-calcModifier': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calcModifier/1.0.0.1500306693353',
        'com-company-calcModifier/calcModifier': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calcModifier/1.0.0.1500306693353/calcModifier',
        'com-company-calcModifier/calcModifierIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calcModifier/1.0.0.1500306693353/calcModifierIcon',
        'com-company-calcModifier/calcModifierIcon0': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calcModifier/1.0.0.1500306693353/calcModifierIcon0',
        'com-company-calcModifier/calcModifierstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calcModifier/1.0.0.1500306693353/calcModifierstyles',
        'com-company-calendarViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calendarViz/1.0.0.1487044592623',
        'com-company-calendarViz/calendarViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calendarViz/1.0.0.1487044592623/calendarViz',
        'com-company-calendarViz/calendarVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calendarViz/1.0.0.1487044592623/calendarVizIcon',
        'com-company-calendarViz/calendarVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calendarViz/1.0.0.1487044592623/calendarVizdatamodelhandler',
        'com-company-calendarViz/calendarVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-calendarViz/1.0.0.1487044592623/calendarVizstyles',
        'com-company-clusterMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361',
        'com-company-clusterMapViz/clusterMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/clusterMapViz',
        'com-company-clusterMapViz/clusterMapVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/clusterMapVizIcon',
        'com-company-clusterMapViz/clusterMapVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/clusterMapVizdatamodelhandler',
        'com-company-clusterMapViz/clusterMapVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/clusterMapVizstyles',
        'com-company-clusterMapViz/mapsConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/mapsConfig',
        'com-company-clusterMapViz/oraclemapsv2': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-clusterMapViz/1.0.0.1502872909361/oraclemapsv2',
        'com-company-collapsibleTreeViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-collapsibleTreeViz/1.0.0.1495106664042',
        'com-company-collapsibleTreeViz/collapsibleTreeViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-collapsibleTreeViz/1.0.0.1495106664042/collapsibleTreeViz',
        'com-company-collapsibleTreeViz/collapsibleTreeVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-collapsibleTreeViz/1.0.0.1495106664042/collapsibleTreeVizIcon',
        'com-company-collapsibleTreeViz/collapsibleTreeVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-collapsibleTreeViz/1.0.0.1495106664042/collapsibleTreeVizdatamodelhandler',
        'com-company-collapsibleTreeViz/collapsibleTreeVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-collapsibleTreeViz/1.0.0.1495106664042/collapsibleTreeVizstyles',
        'com-company-dimPlayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762',
        'com-company-dimPlayer/dimPlayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/dimPlayer',
        'com-company-dimPlayer/dimPlayerIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/dimPlayerIcon',
        'com-company-dimPlayer/dimPlayerdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/dimPlayerdatamodelhandler',
        'com-company-dimPlayer/dimPlayerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/dimPlayerstyles',
        'com-company-dimPlayer/pause': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/pause',
        'com-company-dimPlayer/play': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/play',
        'com-company-dimPlayer/stop': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-dimPlayer/1.0.0.1490848006762/stop',
        'com-company-ganttViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527',
        'com-company-ganttViz/backup_working': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/backup_working',
        'com-company-ganttViz/demo-gantt-taskbars': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/demo-gantt-taskbars',
        'com-company-ganttViz/ganttViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/ganttViz',
        'com-company-ganttViz/ganttVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/ganttVizIcon',
        'com-company-ganttViz/ganttVizIcon1': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/ganttVizIcon1',
        'com-company-ganttViz/ganttVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/ganttVizdatamodelhandler',
        'com-company-ganttViz/ganttVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-ganttViz/1.0.0.1487044596527/ganttVizstyles',
        'com-company-governance': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022',
        'com-company-governance/convertDataSet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/convertDataSet',
        'com-company-governance/dataFlowsMetaData': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/dataFlowsMetaData',
        'com-company-governance/dataSetsMetaData': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/dataSetsMetaData',
        'com-company-governance/governance': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/governance',
        'com-company-governance/governanceIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/governanceIcon',
        'com-company-governance/governancestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/governancestyles',
        'com-company-governance/loading': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/loading',
        'com-company-governance/saveDataSet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/saveDataSet',
        'com-company-governance/uploadFile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/uploadFile',
        'com-company-governance/xmltoJSON': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-governance/1.0.0.1509432014022/xmltoJSON',
        'com-company-heatMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445',
        'com-company-heatMapViz/heatMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/heatMapViz',
        'com-company-heatMapViz/heatMapVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/heatMapVizIcon',
        'com-company-heatMapViz/heatMapVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/heatMapVizdatamodelhandler',
        'com-company-heatMapViz/heatMapVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/heatMapVizstyles',
        'com-company-heatMapViz/mapsConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/mapsConfig',
        'com-company-heatMapViz/oraclemapsv2': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-heatMapViz/1.0.0.1502872910445/oraclemapsv2',
        'com-company-linesOnMap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125',
        'com-company-linesOnMap/linesOnMap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/linesOnMap',
        'com-company-linesOnMap/linesOnMapIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/linesOnMapIcon',
        'com-company-linesOnMap/linesOnMapIcon1': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/linesOnMapIcon1',
        'com-company-linesOnMap/linesOnMapdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/linesOnMapdatamodelhandler',
        'com-company-linesOnMap/linesOnMapstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/linesOnMapstyles',
        'com-company-linesOnMap/oraclemapsv2': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-linesOnMap/1.0.0.1502872912125/oraclemapsv2',
        'com-company-nboxViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-nboxViz/1.0.0.1487044597804',
        'com-company-nboxViz/nboxViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-nboxViz/1.0.0.1487044597804/nboxViz',
        'com-company-nboxViz/nboxVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-nboxViz/1.0.0.1487044597804/nboxVizIcon',
        'com-company-nboxViz/nboxVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-nboxViz/1.0.0.1487044597804/nboxVizdatamodelhandler',
        'com-company-nboxViz/nboxVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-nboxViz/1.0.0.1487044597804/nboxVizstyles',
        'com-company-pictoViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pictoViz/1.0.0.1487044598309',
        'com-company-pictoViz/pictoViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pictoViz/1.0.0.1487044598309/pictoViz',
        'com-company-pictoViz/pictoVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pictoViz/1.0.0.1487044598309/pictoVizIcon',
        'com-company-pictoViz/pictoVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pictoViz/1.0.0.1487044598309/pictoVizdatamodelhandler',
        'com-company-pictoViz/pictoVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pictoViz/1.0.0.1487044598309/pictoVizstyles',
        'com-company-pointsMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130',
        'com-company-pointsMapViz/mapsConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/mapsConfig',
        'com-company-pointsMapViz/oraclemapsv2': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/oraclemapsv2',
        'com-company-pointsMapViz/pointsMapViz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/pointsMapViz',
        'com-company-pointsMapViz/pointsMapVizIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/pointsMapVizIcon',
        'com-company-pointsMapViz/pointsMapVizdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/pointsMapVizdatamodelhandler',
        'com-company-pointsMapViz/pointsMapVizstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-pointsMapViz/1.0.0.1502872913130/pointsMapVizstyles',
        'com-company-rowExpander': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259',
        'com-company-rowExpander/': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259/',
        'com-company-rowExpander/rowExpander': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259/rowExpander',
        'com-company-rowExpander/rowExpanderIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259/rowExpanderIcon',
        'com-company-rowExpander/rowExpanderdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259/rowExpanderdatamodelhandler',
        'com-company-rowExpander/rowExpanderstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/com-company-rowExpander/1.0.0.1495169866259/rowExpanderstyles',
        'common/sacSessionState': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static//bi-sac-config-mgr/js/common/sacSessionState',
        'css': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'css/libs/oj/v3.1.0/alta/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/css/libs/oj/v3.1.0/alta/images',
        'customElements': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'd3js': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'dataenrich/dataenrich': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'dataenrich/dataenrich_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_ar',
        'dataenrich/dataenrich_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_cs',
        'dataenrich/dataenrich_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_da',
        'dataenrich/dataenrich_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_de',
        'dataenrich/dataenrich_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_el',
        'dataenrich/dataenrich_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_es',
        'dataenrich/dataenrich_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_et',
        'dataenrich/dataenrich_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_fi',
        'dataenrich/dataenrich_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_fr',
        'dataenrich/dataenrich_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_fr-CA',
        'dataenrich/dataenrich_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_he',
        'dataenrich/dataenrich_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_hr',
        'dataenrich/dataenrich_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_hu',
        'dataenrich/dataenrich_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_it',
        'dataenrich/dataenrich_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_ja',
        'dataenrich/dataenrich_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_ko',
        'dataenrich/dataenrich_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_lt',
        'dataenrich/dataenrich_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_lv',
        'dataenrich/dataenrich_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_nl',
        'dataenrich/dataenrich_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_no',
        'dataenrich/dataenrich_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_pl',
        'dataenrich/dataenrich_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_pt',
        'dataenrich/dataenrich_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_pt-PT',
        'dataenrich/dataenrich_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_ro',
        'dataenrich/dataenrich_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_ru',
        'dataenrich/dataenrich_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_sk',
        'dataenrich/dataenrich_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_sv',
        'dataenrich/dataenrich_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_th',
        'dataenrich/dataenrich_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_tr',
        'dataenrich/dataenrich_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_zh-Hans',
        'dataenrich/dataenrich_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich_zh-Hant',
        'filters/filters': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'filters/filters_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_ar',
        'filters/filters_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_cs',
        'filters/filters_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_da',
        'filters/filters_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_de',
        'filters/filters_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_el',
        'filters/filters_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_es',
        'filters/filters_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_et',
        'filters/filters_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_fi',
        'filters/filters_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_fr',
        'filters/filters_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_fr-CA',
        'filters/filters_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_he',
        'filters/filters_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_hr',
        'filters/filters_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_hu',
        'filters/filters_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_it',
        'filters/filters_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_ja',
        'filters/filters_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_ko',
        'filters/filters_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_lt',
        'filters/filters_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_lv',
        'filters/filters_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_nl',
        'filters/filters_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_no',
        'filters/filters_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_pl',
        'filters/filters_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_pt',
        'filters/filters_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_pt-PT',
        'filters/filters_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_ro',
        'filters/filters_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_ru',
        'filters/filters_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_sk',
        'filters/filters_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_sv',
        'filters/filters_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_th',
        'filters/filters_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_tr',
        'filters/filters_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_zh-Hans',
        'filters/filters_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters_zh-Hant',
        'hammerjs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'homepage/homepage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'homepage/homepage_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_ar',
        'homepage/homepage_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_cs',
        'homepage/homepage_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_da',
        'homepage/homepage_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_de',
        'homepage/homepage_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_el',
        'homepage/homepage_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_es',
        'homepage/homepage_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_et',
        'homepage/homepage_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_fi',
        'homepage/homepage_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_fr',
        'homepage/homepage_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_fr-CA',
        'homepage/homepage_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_he',
        'homepage/homepage_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_hr',
        'homepage/homepage_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_hu',
        'homepage/homepage_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_it',
        'homepage/homepage_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_ja',
        'homepage/homepage_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_ko',
        'homepage/homepage_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_lt',
        'homepage/homepage_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_lv',
        'homepage/homepage_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_nl',
        'homepage/homepage_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_no',
        'homepage/homepage_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_pl',
        'homepage/homepage_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_pt',
        'homepage/homepage_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_pt-PT',
        'homepage/homepage_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_ro',
        'homepage/homepage_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_ru',
        'homepage/homepage_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_sk',
        'homepage/homepage_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_sv',
        'homepage/homepage_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_th',
        'homepage/homepage_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_tr',
        'homepage/homepage_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_zh-Hans',
        'homepage/homepage_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage_zh-Hant',
        'images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/images',
        'is': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'jet-composites/ActioMgr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static//bi-sac-config-mgr/js/jet-composites/ActioMgr',
        'jet-composites/oracle-dv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'jet-composites/oracle-dv/loader': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'jet-composites/oracle-dv/viewModel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'jjv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'jquery': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'jquery-mobile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/jquery-mobile',
        'jqueryui-amd': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/data': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/disable-selection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/effect': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/effects/effect-slide': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/escape-selector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/focusable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/form': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/form-reset-mixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/ie': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/jquery-1-7': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/keycode': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/labels': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/plugin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/position': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/safe-active-element': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/safe-blur': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/scroll-parent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/tabbable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/unique-id': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/version': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widget': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/draggable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/menu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/mouse': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/resizable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/slider': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/sortable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'jqueryui-amd/widgets/tooltip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'knockout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'knockout-mapping': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'obitech-academy': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-academy/0.1.0.2e2ee9dc0a49',
        'obitech-academy/academy': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-academy/academystyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-academy/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-academy/0.1.0.2e2ee9dc0a49/images',
        'obitech-academy/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-academy/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-academy/producttour': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-academy/producttourstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-advancedanalyticsgadgetdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-advancedanalyticsgadgetdialog/0.1.0.3c02db0eef9b',
        'obitech-advancedanalyticsgadgetdialog/advancedanalyticsgadgetdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-advancedanalyticsgadgetdialog/advancedanalyticsgadgetstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-advancedanalyticsgadgetdialog/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-advancedanalyticsgadgetdialog/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-application': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-application/0.1.0.e9c9269e2ec3',
        'obitech-application/appPagePluginConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-application/0.1.0.e9c9269e2ec3/appPagePluginConfigSchema',
        'obitech-application/application': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/apppagepluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/baseapplicationpagecomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/bi-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/bitech-base-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/bitechfonticonstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/bitechjetoverrides': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/bootstrap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/documentnode': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/extendable-ui-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/fonts': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-application/0.1.0.e9c9269e2ec3/fonts',
        'obitech-application/gadgets': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/gadgetstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/gadgetstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-application/0.1.0.e9c9269e2ec3/images',
        'obitech-application/nls/extendable-ui-definitions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/gadgets.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/richtexteditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/root/extendable-ui-definitions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/root/gadgets.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/nls/root/richtexteditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/richtexteditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/richtexteditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/tooltip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-application/tooltipstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-appservices/0.1.0.f0ff27068917',
        'obitech-appservices/accessibilityutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/action-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/actiondescription': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/actionregistry': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/applicationstatus': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/appstate': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/askandanswermanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/asyncjobservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/basepagepluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/catalogsearchmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/choiceformatter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenumanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenuoption': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenustyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenustylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contextmenutouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/contributionmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/cspmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datadroptargets': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dataflowservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datareplicationservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dataset': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datasetdrophandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datasetmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datasettransformscript': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datasettransformscriptstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/datasetutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dateconvertutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dateformatdefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dateformatter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/dateutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/desktopservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/desktopservicestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/embeddingservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/errorMessageService': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/errormessageservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/externaleventsfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/featuredefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/featuremanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/flexcontainermixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/floatingpanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/floatingpanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/formatelement': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/formattingservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/gadgetfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/htmlcomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-appservices/0.1.0.f0ff27068917/images',
        'obitech-appservices/jetperftest': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/logger': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/messagecomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/messagecomponentstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/messagecomponentstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/messageformatter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/metadatautils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/mixinutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/mmdmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/modelmetadatamanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/modelservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nameutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/action-definitions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/askandanswermanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/catalogsearchmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/cspmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/dateconvertutils.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/dateformatter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/dateformatter.notranslate.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/errorMessageService.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/formattingservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/gadgetfactory.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/messagecomponent.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/mmdmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/progressService.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/action-definitions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/askandanswermanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/catalogsearchmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/cspmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/dateconvertutils.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/dateformatter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/dateformatter.notranslate.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/errorMessageService.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/formattingservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/gadgetfactory.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/messagecomponent.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/mmdmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/progressService.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/securitymanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/socialprovider.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/root/undomanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/securitymanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/socialprovider.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/nls/undomanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/numberformatter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/numberformatterutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/pageitemmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/pagescollectionmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/panelcomponentmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/panelcomponentmixinstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/panelscollectionmanagermixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/panelscollectionmanagermixinstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/platformfeatures': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/progressService': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/progressSpinner': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-appservices/0.1.0.f0ff27068917/progressSpinner',
        'obitech-appservices/progressdisplayermixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/progresspane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/progresspanestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/resizablecomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/responsiveutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/responsiveutils-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/scheduleservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/screenshotservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/scriptservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/securitymanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/sequenceservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/sessioninfo': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/sessiontimeoutdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/sessiontimeoutdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/sessiontimeoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/slider': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/socialprovider': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/stretchbox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/stretchboxstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/stretchflexcontainermixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/touchlayoututils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/touchlayoututilsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/undomanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/urlmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/urlutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/usagetrackingservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-appservices/userprefs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-binby': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-binby/0.1.0.cf1737de402d',
        'obitech-binby/binByIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-binby/0.1.0.cf1737de402d/binByIcon',
        'obitech-binby/binby': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/binbydialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/binbydialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/binbygadgets': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/binbymodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-binby/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-bipsview': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-bipsview/0.1.0.e3b95847e00e',
        'obitech-bipsview/legacyTablePivotLogicalDataModelUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-browse': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-browse/0.1.0.6b0d181fabb5',
        'obitech-browse/browse': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/browseCategory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/browseCustomizeDialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/browsestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/day0Service': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-browse/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-canvasstage-table': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-canvasstage-table/1.0.0.b7af10eb6bb8',
        'obitech-canvasstage-table/canvas-stage-table': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-table/canvas-stage-table-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-table/dataelementpropertiesdialogutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-table/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-table/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-canvasstage-tile/1.0.0.eeea01405ccd',
        'obitech-canvasstage-tile/canvas-stage-tile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/canvas-stage-tile-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/canvasstagetilestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/groupselector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/splitdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-canvasstage-tile/transformfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-catalog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-catalog/0.1.0.5d958d06c38b',
        'obitech-catalog/baseitemactiondialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/baseitemactiondialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalogartifactmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalogartifactrenderer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalogartifactstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalogcollectionsfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/catalogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/deleteitemdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/itempropertiesdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/itempropertiesdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/locationselectorpanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/locationselectorpanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/moveitemdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/moveitemdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/newfolderdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/newfolderdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/renamedialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-catalog/renamedialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-cca': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-cca/1.0.0.89b1581ca310',
        'obitech-circlepack': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-circlepack/1.0.0.d40687408261',
        'obitech-circlepack/circlePack': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-circlepack/circlePackIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-circlepack/1.0.0.d40687408261/circlePackIcon',
        'obitech-circlepack/circlePackStyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-circlepack/circlePackdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-circlepack/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-circlepack/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-cluster': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-cluster/0.1.0.2d67720e89af',
        'obitech-cluster/cluster': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/clusterbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/clustermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/clustermodelbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/clustersIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-cluster/0.1.0.2d67720e89af/clustersIcon',
        'obitech-cluster/criteriaupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-cluster/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-common': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e',
        'obitech-common/bootstraphelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/bootstraphelper',
        'obitech-common/bootstraphelperstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/bootstraphelperstyles',
        'obitech-common/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/images',
        'obitech-common/loginfailedstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/loginfailedstyles',
        'obitech-common/loginhelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/loginhelper',
        'obitech-common/loginhelperstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/loginhelperstyles',
        'obitech-common/timeouthelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-common/0.1.0.3ae7379be35e/timeouthelper',
        'obitech-console': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-console/0.1.0.3f05c0dc4a26',
        'obitech-console/console': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/consoledefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/consolestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/customplugindrophandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/customplugins': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/custompluginsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/datareplication': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/datareplicationstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-console/0.1.0.3f05c0dc4a26/images',
        'obitech-console/managemapdata': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/managemapdatastyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/datareplication.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/managemapdata.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/root/datareplication.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/root/managemapdata.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/safedomain': 'https://paypalmicroservice.herokuapp.com',
        'obitech-console/safedomain': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/safedomainstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/socialintegration': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-console/socialintegrationstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-data-replication': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-data-replication/0.1.0.9ca174a4e093',
        'obitech-data-replication/datareplication-base-connection-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-base-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-container': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-dataflow-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-diagram': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-page': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-replicateobjects-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-source-connection-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplication-target-connection-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplicationsteppluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/datareplicationstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-data-replication/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-dataenrich': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataenrich/1.0.0.5470cda08471',
        'obitech-dataenrich/columnenricher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/columnenrichermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/dataEnricherConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataenrich/1.0.0.5470cda08471/dataEnricherConfigSchema',
        'obitech-dataenrich/dataEnricherHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/dataEnricherModelConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataenrich/1.0.0.5470cda08471/dataEnricherModelConfigSchema',
        'obitech-dataenrich/dataEnricherModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/dataenricher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/dataenrichermodelbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/vizlevelenricher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataenrich/vizlevelenrichermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-dataprep': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataprep/0.1.0.afca41784c62',
        'obitech-dataprep/abstractsteppluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/analyticsutil': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/columnbineditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/columnbineditor-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/columnmergeeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/columnmergeeditor-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-addcolumn-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-addcolumn-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-adddataset-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-adddataset-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-applymodel-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-applyscript-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-bincolumn-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-createcube-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-createcube-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-createmodel-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-cumulativeaggr-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-cumulativeaggr-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-diagram': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-diagram-layout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-editcolumn-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-filter-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-filter-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-filterbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-groupby-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-groupby-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-grouping-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-join-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-layout-manager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-mergecolumn-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-rename-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-savedataset-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-savedataset-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-savemodel-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-selectcolumns-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-splitcolumn-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-sqlgenerator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-steps-popup': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-union-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-union-step-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflow-upload-step': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/dataflowSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataprep/0.1.0.afca41784c62/dataflowSchema',
        'obitech-dataprep/dataflowbasestep': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/diagramstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/flow-preview-table': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/flow-preview-table-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/flowcontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/flowcontainerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataprep/0.1.0.afca41784c62/images',
        'obitech-dataprep/nls/flow-preview-table-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/nls/flowcontainer-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/nls/root/flow-preview-table-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/nls/root/flowcontainer-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/scriptoptionseditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/sliderThumbLineImage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataprep/0.1.0.afca41784c62/sliderThumbLineImage',
        'obitech-dataprep/steppluginconfigschema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dataprep/0.1.0.afca41784c62/steppluginconfigschema',
        'obitech-dataprep/steppluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dataprep/workbenchstepeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-datasources': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-datasources/0.1.0.a1211174297d',
        'obitech-datasources/dataartifactmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/dataartifactrenderer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/dataartifactstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/datasetstorage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/datasetstoragestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/datasources': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/datasourcesstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-datasources/0.1.0.a1211174297d/images',
        'obitech-datasources/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-datasources/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-daterangefilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-daterangefilter/0.1.0.eeea01405ccd',
        'obitech-daterangefilter/daterangefilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/daterangefilterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/daterangefilterstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/daterangefiltertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-daterangefilter/sliderTouchThumbImage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-daterangefilter/0.1.0.eeea01405ccd/sliderTouchThumbImage',
        'obitech-donut': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-donut/0.1.0.4c715c0e17ec',
        'obitech-donut/donut': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-donut/donutdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-donut/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-donut/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dssconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78',
        'obitech-dssconnection/analysisconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/apiauthorization': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/apiconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/baseconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/basedatabaseconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/basedatasourceblockcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/basedatasourcesqlcardstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/bisoapTypeConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/bisoapTypeConfig',
        'obitech-dssconnection/connectionConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/connectionConfig',
        'obitech-dssconnection/connectioncardstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/connectioncredentialdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/connectionnames': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/connectiontypecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/createnewconnectiontypecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/databaseTypeConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/databaseTypeConfig',
        'obitech-dssconnection/databaseconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/datadirectclouddatabaseconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/dssconnectionHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/elasticsearchdatabaseconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/fileuploadblockcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/fileuploadcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/images',
        'obitech-dssconnection/msaccessdatabaseconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/oAuthTypeConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/oAuthTypeConfig',
        'obitech-dssconnection/olapTypeConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/olapTypeConfig',
        'obitech-dssconnection/olapconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/restTypeConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssconnection/0.1.0.b71051158f78/restTypeConfig',
        'obitech-dssconnection/restconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/salesforcedatabaseconnection': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssconnection/vendorauthenticationcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssdataset/0.1.0.b90de71a1e58',
        'obitech-dssdataset/abstractcatalogbasedobjectlistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/abstractcatalogbasedsourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/abstractfilebasedgeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/abstractfilebasedquerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysisgeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissalistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysisselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcelistcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcepreviewcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcesqlcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissourcetabcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/analysissqlpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/apisourcelistcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/apisourcepreviewcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/apisourcetabcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcelistcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcepreviewcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcesqlcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basedatasourcetabcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basegeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/baselistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/baseselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basesqlpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/basetabpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/cataloggeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/catalogselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/catalogsourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/catalogsourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/catalogsourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/connectionobjectlist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/connectionobjectstree': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasedetaillistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasefilterspane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasegeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasequerypanestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databaseselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcelistcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcepreviewcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcesqlcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesourcetabcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/databasesqlpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/datapreviewpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/datasetConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssdataset/0.1.0.b90de71a1e58/datasetConfig',
        'obitech-dssdataset/datasetuimodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/datasetuimodelmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/datasourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/datasourcerefreshcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/dssdatasetHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filecataloggeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filecatalogselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filecatalogsourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filecatalogsourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filecatalogsourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filegeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filepreviewcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filerefreshcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filesourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filesourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/filterbardatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/logicsqlgenerator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/olapgeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/olapselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/olapsourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/olapsourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/olapsourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/querybuilder-ui-properties-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/sqlgenerator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/sqlgeneratorConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dssdataset/0.1.0.b90de71a1e58/sqlgeneratorConfig',
        'obitech-dssdataset/sqlgeneratorfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/tablecataloggeneralpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/tablecatalogselectcolumnpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/tablecatalogsourcelistpage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/tablecatalogsourcequerycard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dssdataset/tablecatalogsourcequerypane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-dvtchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-dvtchart/1.0.0.84b5b0392a8f',
        'obitech-dvtchart/advancedanalyticsupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/barLineAreaChart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/barLineAreaChartDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/barlineareasparkchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/bidvtchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/bidvtchart-defs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/bidvtchartstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/bidvtsparkchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/boxplot': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/boxplotDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/categoricalScatterDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/categoricalscatterupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/dvtChartDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/jetAutomationSupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/legacyChartLogicalDataModelUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/legacyChartViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/legacyComboChartViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/waterfall': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-dvtchart/waterfallForecast': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-embedding': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-embedding/0.1.0.fe9b50ace76e',
        'obitech-embedding/embedding': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-embedding/0.1.0.fe9b50ace76e/embedding',
        'obitech-expressionfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-expressionfilter/0.1.0.973acb29c653',
        'obitech-expressionfilter/expressionfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/expressionfilterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/expressionfilterstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/expressionfiltertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/expressionfiltertwopartformula': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-expressionfilter/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-extensionpoints': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd',
        'obitech-extensionpoints/basepluginconfigschema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/basepluginconfigschema',
        'obitech-extensionpoints/basepluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/bootstrapHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/colorSchemeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/componentStatusEventCallbackConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/componentStatusEventCallbackConfig',
        'obitech-extensionpoints/eventCallback': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/eventCallbackConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/eventCallbackConfig',
        'obitech-extensionpoints/extensionPointHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/extensionPointHandlerConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/extensionPointHandlerConfig',
        'obitech-extensionpoints/funcCallConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/funcCallConfig',
        'obitech-extensionpoints/moduleDependency': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/moduleDependencyDeclaration': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/moduleDependencyDeclarationConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/moduleDependencyDeclarationConfig',
        'obitech-extensionpoints/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/requirejsConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/requirejsConfig',
        'obitech-extensionpoints/scriptExtensionPointUtils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-extensionpoints/skinHandlerConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-extensionpoints/0.1.0.19d7ada2dbbd/skinHandlerConfig',
        'obitech-filter-utils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-filter-utils/0.1.0.6618d24f134d',
        'obitech-filter-utils/filtertouchutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-filter-utils/filterutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-forecast': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-forecast/0.1.0.df272dc8cef5',
        'obitech-forecast-shaper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-forecast-shaper/0.1.0.42f920bd2e49',
        'obitech-forecast-shaper/forecast-shaper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-forecast-shaper/forecast-shaper-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-forecast-shaper/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-forecast-shaper/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-forecast/forecast': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-forecast/forecastIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-forecast/0.1.0.df272dc8cef5/forecastIcon',
        'obitech-forecast/forecastmodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-forecast/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-forecast/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-framework': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-framework/0.1.0.4dfcfc99173e',
        'obitech-framework/actioncontext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/bitset': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/bitsetworker': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/browserdom': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/componentFactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/componentFactoryConfig': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-framework/0.1.0.4dfcfc99173e/componentFactoryConfig',
        'obitech-framework/componentStatusPublisher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/cssutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/heap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-framework/0.1.0.4dfcfc99173e/images',
        'obitech-framework/jetchartfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jetfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jetfactorystyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jetfactorystylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/json-schema-draft04': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jsonSchemaValidator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jsonutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/jsx': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/knockoututils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/legacySupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/mathutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/md5hash': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/messageformat': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/murmur3hash': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/jsx.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/root/jsx.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/root/sqlfunctionlist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/nls/sqlfunctionlist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/propertyholder': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/schemabackedpropertyholder': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/sizzlepatcher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/sqlfunctionlist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/uif-component': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/uif-mvc': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/uif-promise': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/useragent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-framework/xmlutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-gridview': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-gridview/0.1.0.463e61c585e7',
        'obitech-gridview/bicubegriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/bidatagriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/columnformatupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/gridviewcommon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/gridviewstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/jetdatagrid': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridview/sizehelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridvizhost': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-gridvizhost/0.1.0.67c82f7457ad',
        'obitech-gridvizhost/autovizinnertypeupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridvizhost/gridvizhost': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridvizhost/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-gridvizhost/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-header': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-header/0.1.0.63afb7841ffa',
        'obitech-header/header': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-header/headerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-header/headerutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-header/headerviewmodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-header/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-header/0.1.0.63afb7841ffa/images',
        'obitech-header/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-header/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-homepage/0.1.0.b4550ab8a4d8',
        'obitech-homepage/baseareapagecomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/baseareapagestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/baseartifactrenderer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/baseartifactsareapage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/baseartifactsareapagestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/baseartifactstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/basehomestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/filedropmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/homefindcontent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/homefindcontentstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/homesensecomplete': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/homeshell': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/homeshellstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/hometokenizedsearchfield': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-homepage/0.1.0.b4550ab8a4d8/images',
        'obitech-homepage/multiviewlist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/multiviewliststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/pathcrumbs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/pathcrumbsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/reportgallery': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/reportgallerystyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/search': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/searchitemrenderer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/searchitemstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-homepage/searchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-image': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-image/1.0.0.58739591ff6f',
        'obitech-image/image': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-image/imagepanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-image/imagestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-image/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-image/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-invalidvizplaceholder': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-invalidvizplaceholder/1.0.0.42f920bd2e49',
        'obitech-invalidvizplaceholder/invalidvizplaceholder': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-invalidvizplaceholder/invalidvizplaceholderstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-invalidvizplaceholder/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-invalidvizplaceholder/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-jobs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-jobs/0.1.0.07e347cf12d5',
        'obitech-jobs/jobs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-jobs/jobspage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-jobs/0.1.0.07e347cf12d5/jobspage',
        'obitech-jobs/jobsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-jobs/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-jobs/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-legend': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-legend/0.1.0.a27488492af7',
        'obitech-legend/legend': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-legend/legendandvizcontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-legend/legendstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-legend/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-legend/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-list': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-list/0.1.0.d66dcafa77d6',
        'obitech-list/list': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-list/listdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-list/liststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-list/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-list/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-listfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d',
        'obitech-listfilter/clearImageDwn': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/clearImageDwn',
        'obitech-listfilter/clearImageEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/clearImageEna',
        'obitech-listfilter/clearImageHov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/clearImageHov',
        'obitech-listfilter/deleteImageDis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/deleteImageDis',
        'obitech-listfilter/deleteImageDwn': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/deleteImageDwn',
        'obitech-listfilter/deleteImageEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/deleteImageEna',
        'obitech-listfilter/deleteImageHov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/deleteImageHov',
        'obitech-listfilter/disableImageEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/disableImageEna',
        'obitech-listfilter/enableImageEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-listfilter/0.1.0.8269fefcb87d/enableImageEna',
        'obitech-listfilter/listfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-listfilter/listfilterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-listfilter/listfilterstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-listfilter/listfiltertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-listfilter/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-listfilter/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-map': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b',
        'obitech-map/abstracttilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/baidutilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/bingtilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/cartotilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/customopenstreetmaptilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/googletilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/heretilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/images',
        'obitech-map/indeterminate_progress_bar.gif': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/indeterminate_progress_bar.gif',
        'obitech-map/indeterminate_progress_bar_complete.png': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/indeterminate_progress_bar_complete.png',
        'obitech-map/legacyMapViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/locationboxtilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/map': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/map-definitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/mapdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/mapstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/maptileconfigpluginhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/maptilelayerutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/maptilepluginconfigschema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/maptilepluginconfigschema',
        'obitech-map/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/omaps_api_va': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/omaps_api_va',
        'obitech-map/omaps_api_va_styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/openstreetmaptilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/oraclebitilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/oraclemapstilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/polyselectAct': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/polyselectAct',
        'obitech-map/polyselectDis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/polyselectDis',
        'obitech-map/polyselectEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/polyselectEna',
        'obitech-map/polyselectHov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/polyselectHov',
        'obitech-map/rectangleselectAct': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/rectangleselectAct',
        'obitech-map/rectangleselectDis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/rectangleselectDis',
        'obitech-map/rectangleselectEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/rectangleselectEna',
        'obitech-map/rectangleselectHov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-map/0.1.0.43b99dcc618b/rectangleselectHov',
        'obitech-map/stamentilelayer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-map/va_maps': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-marking': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-marking/1.0.0.49da719b6b8b',
        'obitech-marking/marking': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-modeler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-modeler/0.1.0.e934270c72f1',
        'obitech-modeler/modeler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-modeler/modelerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-modeler/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-modeler/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-network': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-network/0.1.0.8269fefcb87d',
        'obitech-network/chorddiagram': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/chorddiagramdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/chorddiagramstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/circularnetwork': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/circularnetworkdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/graphdata': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/network': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/networkbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/networkdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/networkdatamodelhandlerbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/networkdatamodelshapes': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/networkdvtbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/ojcircularnetworklayout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/ojdiagramlayoutcommon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/ojforcedirectedlayout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/ojsankeylayout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/ojtreelayout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/sankey': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/sankeydatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/tidytree': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-network/treedatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-numberrangefilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-numberrangefilter/0.1.0.df37a2647950',
        'obitech-numberrangefilter/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/numberrangefilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/numberrangefilterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/numberrangefilterstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/numberrangefiltertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-numberrangefilter/resetImageEna': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-numberrangefilter/0.1.0.df37a2647950/resetImageEna',
        'obitech-numberrangefilter/sliderThumbImage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-numberrangefilter/0.1.0.df37a2647950/sliderThumbImage',
        'obitech-numberrangefilter/sliderThumbLineImage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-numberrangefilter/0.1.0.df37a2647950/sliderThumbLineImage',
        'obitech-numberrangefilter/sliderTouchThumbImage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-numberrangefilter/0.1.0.df37a2647950/sliderTouchThumbImage',
        'obitech-outlier': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-outlier/0.1.0.e97db86cd651',
        'obitech-outlier/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-outlier/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-outlier/outlier': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-outlier/outliermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-outlier/outliersIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-outlier/0.1.0.e97db86cd651/outliersIcon',
        'obitech-overlaytext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-overlaytext/1.0.0.5340cc000eff',
        'obitech-overlaytext/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-overlaytext/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-overlaytext/overlaytext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-overlaytext/textOverlayIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-overlaytext/1.0.0.5340cc000eff/textOverlayIcon',
        'obitech-parallelcoordinates': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-parallelcoordinates/1.0.0.87c96c932b03',
        'obitech-parallelcoordinates/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/paracoordclustermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/paracoordoutliermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/parallelcoordinates': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/parallelcoordinatesDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-parallelcoordinates/parallelcoordinatesstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-performancetile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-performancetile/0.1.0.dd80f29a7b7f',
        'obitech-performancetile/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-performancetile/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-performancetile/performancetile': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-performancetile/performancetile-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-performancetile/performancetiledatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-piechart/0.1.0.bd52c388a157',
        'obitech-piechart/legacyPieChartViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart/piechart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart/piechartViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-piechart/piedatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-pivot': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-pivot/0.1.0.397bec81d97f',
        'obitech-pivot/jetpivot': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-pivot/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-pivot/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-pivot/pivotDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-pluginframework': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-pluginframework/1.0.0.cb0be3795831',
        'obitech-pluginframework/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-pluginframework/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-pluginframework/pluginframework': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-previewtable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-previewtable/1.0.0.b7af10eb6bb8',
        'obitech-previewtable/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-previewtable/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-previewtable/previewtable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-previewtable/previewtablestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-projectbrowser': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-projectbrowser/0.1.0.23e582e52b4c',
        'obitech-projectbrowser/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-projectbrowser/0.1.0.23e582e52b4c/images',
        'obitech-projectbrowser/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-projectbrowser/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-projectbrowser/projectbrowser': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-projectbrowser/projectbrowserstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-query': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-query/0.1.0.1874eebf63c0',
        'obitech-query/queryenricher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-query/queryenrichermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-referenceline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-referenceline/0.1.0.df272dc8cef5',
        'obitech-referenceline/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-referenceline/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-referenceline/referenceLineIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-referenceline/0.1.0.df272dc8cef5/referenceLineIcon',
        'obitech-referenceline/referenceline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-referenceline/referencelinemodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-refobject': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-refobject/0.1.0.8b6d65282ad7',
        'obitech-refobject/refobjectenricher': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-refobject/refobjectenrichermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-report': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da',
        'obitech-report-container': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report-container/0.1.0.2e34ae9ac413',
        'obitech-report-container/dataflowreportcontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report-container/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report-container/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report-container/reportcontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/analysisdatasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/analyticslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/annotationlayoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/apidatasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/application-fonts': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/application-fonts',
        'obitech-report/basecolormapeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basecolorpanelcomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basecolorpicker': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basecolorselectorutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basecreationcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basedatasourcecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basedatasourcelist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/baseeditormodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basefindcontent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basefindcontentstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/baselist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/baseliststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/baseliststylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/basemanagecolors': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertiesdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertiesdialogmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertieseditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertiespaneltouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertiespopup': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/basepropertiespopupstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/basesensecomplete': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/breadcrumbs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/breadcrumbsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvas': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvascomponentmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvascomponentmanagerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvascomponentmanagerstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvascomponentmanagertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvaseslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvasesliststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvaseslisttouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvaseslisttouchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvasobjectslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvaspropertiesdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/canvaspropertiesdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvasstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvasstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/canvastouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/catalogdatasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/codeeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/codeeditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/coloreditormodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colormapeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colormapeditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colormapeditorstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colormapeditortouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpaletteeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpaletteeditordialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpaletteeditormodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpaletteeditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorpaletteeditorstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorpicker': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpickerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorpickerstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorpickertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpropertiespanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorpropertiespanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorselectorutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/colorselectorutilsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorselectorutilsstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/colorselectorutilstouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/columnpicker': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/columnpickerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/contentpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/contentpanestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/contentpanestylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/contentpanetouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/contributivetoolbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/contributivetoolbarstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/createdesktopdatasourcecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/createdesktopdatasourcecardstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/createnewconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/createnewdatasourcecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataactiongadgets': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataactiongadgetsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/dataactionpanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/databasedatasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataelementstree': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataelementstreetouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataelementstreeutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataflowslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataflowtoollist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcecommon/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/datasourcecommon/images',
        'obitech-report/datasourcedialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcedialogfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcedialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourcedialogstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourcedialogtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourceinspector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourceinspectorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourcelistcard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcelistcardtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcemodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourcepermissions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcepermissionsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcepropertiesstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourceslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourcetooltipstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/datasourcetooltiputils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datasourceutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/datavisualization': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/dataviztooltipmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/discussionbrowser': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/discussionbrowserstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/discussionbrowsertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/discussionbrowsertouchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/drillpanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/drillpanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/embeddableviz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/explaindialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/explainstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/expressioneditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/expressioneditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/expressionmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/filterBarScissorsPNG': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/filterBarScissorsPNG',
        'obitech-report/filterbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/filterbarstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/filterbarstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/filterbartouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/filtercontrollist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/filterpanelstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/filterpaneltouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/filtervisualization': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/fingerpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/fingerpane/images/Dimension': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/Dimension',
        'obitech-report/fingerpane/images/dataset_16': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/dataset_16',
        'obitech-report/fingerpane/images/dataset_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/dataset_16_mono',
        'obitech-report/fingerpane/images/dataset_dimension_16': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/dataset_dimension_16',
        'obitech-report/fingerpane/images/dataset_fact_16': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/dataset_fact_16',
        'obitech-report/fingerpane/images/fp-data-element': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp-data-element',
        'obitech-report/fingerpane/images/fp-data-element-selected': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp-data-element-selected',
        'obitech-report/fingerpane/images/fp-visualizations': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp-visualizations',
        'obitech-report/fingerpane/images/fp-visualizations-selected': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp-visualizations-selected',
        'obitech-report/fingerpane/images/fp_canvas_objects_24_act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_canvas_objects_24_act',
        'obitech-report/fingerpane/images/fp_canvas_objects_24_dis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_canvas_objects_24_dis',
        'obitech-report/fingerpane/images/fp_canvas_objects_24_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_canvas_objects_24_ena',
        'obitech-report/fingerpane/images/fp_canvas_objects_24_hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_canvas_objects_24_hov',
        'obitech-report/fingerpane/images/fp_data_elements_24_act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_elements_24_act',
        'obitech-report/fingerpane/images/fp_data_elements_24_dis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_elements_24_dis',
        'obitech-report/fingerpane/images/fp_data_elements_24_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_elements_24_ena',
        'obitech-report/fingerpane/images/fp_data_elements_24_hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_elements_24_hov',
        'obitech-report/fingerpane/images/fp_data_sources_24_act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_sources_24_act',
        'obitech-report/fingerpane/images/fp_data_sources_24_dis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_sources_24_dis',
        'obitech-report/fingerpane/images/fp_data_sources_24_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_sources_24_ena',
        'obitech-report/fingerpane/images/fp_data_sources_24_hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_data_sources_24_hov',
        'obitech-report/fingerpane/images/fp_visualizations_24_act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_visualizations_24_act',
        'obitech-report/fingerpane/images/fp_visualizations_24_dis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_visualizations_24_dis',
        'obitech-report/fingerpane/images/fp_visualizations_24_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_visualizations_24_ena',
        'obitech-report/fingerpane/images/fp_visualizations_24_hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/fp_visualizations_24_hov',
        'obitech-report/fingerpane/images/func_database_24_act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/func_database_24_act',
        'obitech-report/fingerpane/images/func_database_24_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/func_database_24_ena',
        'obitech-report/fingerpane/images/measure': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/measure',
        'obitech-report/fingerpane/images/qual_folderclosed_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_folderclosed_16_mono',
        'obitech-report/fingerpane/images/qual_folderopen_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_folderopen_16_mono',
        'obitech-report/fingerpane/images/qual_ml_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_ml_16_mono',
        'obitech-report/fingerpane/images/qual_model_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_model_16_mono',
        'obitech-report/fingerpane/images/qual_timer_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_timer_16_mono',
        'obitech-report/fingerpane/images/qual_vs_16_mono': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/qual_vs_16_mono',
        'obitech-report/fingerpane/images/search': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/search',
        'obitech-report/fingerpane/images/spinner': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/spinner',
        'obitech-report/fingerpane/images/spinnerJet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/fingerpane/images/spinnerJet',
        'obitech-report/fingerpaneactions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/fingerpanestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/fingerpanestylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/fingerpanetouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/freeformlayoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/gadgetdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/gadgetdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/gadgetdialogstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/images',
        'obitech-report/images/delete': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/images/delete',
        'obitech-report/images/func_add_16_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/images/func_add_16_ena',
        'obitech-report/images/splitterhc_ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/images/splitterhc_ena',
        'obitech-report/inlinetoolbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/inlinetoolbarstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/insightcomponentmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/insightcomponentmanagerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/insightcomponentmanagerstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/insightcomponentmanagertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/insightlist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/insightliststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/insightlisttouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/insightlisttouchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/inspector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/inspectorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/jettreehelpermixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/layout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/layoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/layoutstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/layoutstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/layouttouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/listlayoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/managecolorspopup': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/managecolorspopupstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/managecolorspopupstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/managecolorspopuptouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/maximizeviewpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/mlmodelinspector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/mlmodelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/namespaces': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/navigationlinkspreprocessor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/nls/baselist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/breadcrumbs.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/canvas.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/codeeditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/colormapeditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/colorpropertiespanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/contentpane.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/createdesktopdatasourcecard.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/dataaction.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/datasourcedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/datasourceinspector.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/datasourcepermissions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/datasourceproperties.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/datasourceutils.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/drillpanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/explaindialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/expressioneditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/filtervisualization.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/gadgetdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/layout.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/managecolorspopup.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/mlmodel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/reportgadgets.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/reportpropertiesdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/reportrichtexteditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/reporttoolbar.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/baselist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/breadcrumbs.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/canvas.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/codeeditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/colormapeditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/colorpropertiespanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/contentpane.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/createdesktopdatasourcecard.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/dataaction.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/datasourcedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/datasourceinspector.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/datasourcepermissions.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/datasourceproperties.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/datasourceutils.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/drillpanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/explaindialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/expressioneditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/filtervisualization.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/gadgetdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/layout.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/managecolorspopup.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/mlmodel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/reportgadgets.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/reportpropertiesdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/reportrichtexteditor.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/reporttoolbar.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/savedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/search.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/selectconnection-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/selectdatasourcelist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/selectuserrole.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/socialmessagedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/stepnavigator.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/storynavigator.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/storypageheader.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/toolbar.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/root/viewselectdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/savedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/search.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/selectconnection-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/selectdatasourcelist.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/selectuserrole.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/socialmessagedialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/stepnavigator.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/storynavigator.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/storypageheader.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/toolbar.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/nls/viewselectdialog.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/numberformat': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/numberformat-defs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/olapdatasourceproperties': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/plussigngray': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/plussigngray',
        'obitech-report/plussignwhite': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/plussignwhite',
        'obitech-report/projectprocessor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/projectpropertiesstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/recttool': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/renderingcontext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/report': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportcolumninfo': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportcomponentmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportenvironmentspanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportfindcontent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportfindcontentstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportfindcontentstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportfindcontenttouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportgadgets': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportgadgetstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportheader': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportheaderstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportheaderstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportheadertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportnode': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportpropertiesdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportrichtexteditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportrichtexteditorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportsensecomplete': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportsensecompletestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportsensecompletestylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportsensecompletetouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reporttoolbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reporttoolbarstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportui': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportuipanelsmanagertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportuipanelsmanagertouchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportuistyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportuitabbedpagescollectionmixin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/reportuitabbedpagescollectionmixinstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/reportuitouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/resizerepositionwidget': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/savedialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/savedialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/savedialogstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/savedialogtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/scriptdatasourcecard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/searchfield': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/searchfieldstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchfieldstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchoptionspanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/searchoptionspanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchoptionspanelstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchoptionspaneltouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/searchpanelstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchpaneltouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/searchstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/searchutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/selectconnectioncard': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/selectdatasourcelist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/selectdatasourceliststyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/selectdatasourceliststylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/selectuserrole': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/selectuserrolestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/semimodalpane': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/sequenceslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/splitlayoutmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/splitlayoutmanagerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/splitlayoutmanagerstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/splitter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/splitterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/staticservicesreport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/stepNavigatorNext16Act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorNext16Act',
        'obitech-report/stepNavigatorNext16Ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorNext16Ena',
        'obitech-report/stepNavigatorNext16Hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorNext16Hov',
        'obitech-report/stepNavigatorPrev16Act': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorPrev16Act',
        'obitech-report/stepNavigatorPrev16Ena': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorPrev16Ena',
        'obitech-report/stepNavigatorPrev16Hov': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-report/0.1.0.b35ad42f64da/stepNavigatorPrev16Hov',
        'obitech-report/stepnavigator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/stepnavigatorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/stepnavigatorstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/storynavigator': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/storynavigatorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/storynavigatortouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/storypageheader': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/storypageheaderstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/storypagepropertiesdialogutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/tokenizedsearchfield': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/tokenizedsearchfieldstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/tokenizedsearchfieldstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/tokenizedsearchfieldtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewdetailspanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewdetailspanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/viewdetailspanelstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/viewdetailspaneltouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewmodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewselectdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewselectdialogmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/viewselectdialogstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/viewselectdialogstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-report/viewselectdialogtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/visualization': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/visualizationslist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/vizcontext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-report/vizdatamodelsmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-reportservices/0.1.0.b78fcf12a6fe',
        'obitech-reportservices/annotationmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/annotationmanagerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/annotationmodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/colorDataModelUtils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/colorMapper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/colorSchemes': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/colorUtils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/columnstatsservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/data': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dataactioncommon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dataactionmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/datablendingmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/datablendingupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/datamodelmapper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/datamodelshapes': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/discussionmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dnddraggable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dnddraggablestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/dndmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dndmanagerscrollableutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/dndmanagerscrollableutilsstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/eventmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/events': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/eventtypes': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/exportscreenshotmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/filemanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/filterfactory': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/filtermanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/filtermodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/gesturesupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/insightmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/interactionservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/legacyReportUpgradeCleanupHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/legacyReportUpgrader': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/legacyviewxml': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/lockmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/logicalDataModel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/logicaldatamodelhelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/markingservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/mlmodelmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/navigationactionservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/nls/annotationmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/data.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/dataactionservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/datablending.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/datamodelshapes.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/dndmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/eventmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/exportscreenshotmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/filemanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/filter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/insightmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/interactionservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/lockmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/logicaldatamodelhelper.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/marking.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/reportdatasourcesstatemanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/reportmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/reportxml.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/annotationmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/data.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/dataactionservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/datablending.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/datamodelshapes.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/dndmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/eventmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/exportscreenshotmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/filemanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/filter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/insightmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/interactionservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/lockmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/logicaldatamodelhelper.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/marking.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/reportmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/reportxml.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/screenshotmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/serverevents.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/root/sorting.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/screenshotmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/serverevents.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/nls/sorting.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/pinchsupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/projecttemplatehelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/qdr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportSettings': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportactioncontextmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportcontext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportdatasourceseventsequencer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportdatasourcesstatemanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportjson': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportmetadatamanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportstatedefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportstatus': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportvizstatus': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/reportxml': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-reportservices/schemas/annotationSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/filterControlSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/logicalDataModelSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/projectDefinitionsSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/reportstateschema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/v1/projectConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/v1/projectCriteriaSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/v2/dataactionsschema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/v2/nativeProjectSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/schemas/v2/projectCriteriaSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/screenshotmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/serverevents': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/shapeservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/sizeservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/snapshotsupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/sortinghelper': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/sortingupgradehandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/state': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/swipesupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/thumbnailmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/touchmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/touchutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/upgradehandlerbase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/upgradeservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-reportservices/viztypeswitchmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'obitech-requirecss': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-requirecss/0.1.0.6237a23f77ed',
        'obitech-requireis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-requireis/1.0.0.5340cc000eff',
        'obitech-requireis/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-requireis/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-requirejs-optional': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-requirejs-optional/1.0.0.64b93cb846c4',
        'obitech-scatterchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-scatterchart/0.1.0.228d44328051',
        'obitech-scatterchart/legacyScatterChartLogicalDataModelUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/legacyScatterChartViewConfigUpgradeHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/referenceline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/scatterChartDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/scatterchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterchart/trendline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterplotmatrix': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-scatterplotmatrix/0.1.0.a4abce3d2fb5',
        'obitech-scatterplotmatrix/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterplotmatrix/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterplotmatrix/scatterplotmatrix': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-scatterplotmatrix/scatterplotmatrixstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-schedule': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-schedule/0.1.0.d945978b169e',
        'obitech-schedule/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-schedule/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-schedule/schedulecontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-schedule/schedulecontainer-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-sequence/0.1.0.0280dd109043',
        'obitech-sequence/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence/sequence': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence/sequencecontainer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence/sequencecontainerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-sequence/sequenceeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-serversupport': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852',
        'obitech-serversupport/dataapi-bootstrap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/dataapi-bootstrap',
        'obitech-serversupport/jsruntime-init': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/jsruntime-init',
        'obitech-serversupport/logger-consolesink': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/logger-consolesink',
        'obitech-serversupport/nashorn-additions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/nashorn-additions',
        'obitech-serversupport/require-bootstrap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/require-bootstrap',
        'obitech-serversupport/xmldom-dom': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/xmldom-dom',
        'obitech-serversupport/xmldom-parser': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/xmldom-parser',
        'obitech-serversupport/xmldom-sax': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-serversupport/1.0.0.417e9fef4852/xmldom-sax',
        'obitech-share': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-share/0.1.0.97cb10c16cf0',
        'obitech-share/apfoptionstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/apfservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/emailmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/emailservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/emailservicestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportdataservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportfilemanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportimageservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportmanagerutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportpdfservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportpptdefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportpptservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportscreenshotconf': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportscreenshotconfdialogstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportscreenshotconfdialogtouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportscreenshotconfstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/exportscreenshotutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/apf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/email.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/emailmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/exportdata.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/exportfilemanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/exportpdf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/exportppt.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/exportscreenshotconf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/printmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/apf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/email.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/emailmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/exportdata.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/exportfilemanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/exportpdf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/exportppt.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/exportscreenshotconf.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/printmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/sharecontextmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/sharepalette.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/socialmediaosn.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/socialmediaservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/socialmediaslack.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/socialmediatwitter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/root/socialmediatwitterwebintent.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/sharecontextmanager.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/sharepalette.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/socialmediaosn.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/socialmediaservice.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/socialmediaslack.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/socialmediatwitter.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/nls/socialmediatwitterwebintent.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/printmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/sharecontextmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/sharepalette': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/sharepalettemanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/sharepalettestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/sharepaletteutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediaoauthservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediaosnservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediaservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediaslackservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediatwitterservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-share/socialmediatwitterwebintentservice': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'obitech-stage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-stage/0.1.0.50644ff37f8b',
        'obitech-stage/canvas-stage': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvas-stage-facet-view': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvas-stage-facet-view-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvas-stage-raw-view': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvas-stage-raw-view-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvas-stage-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/canvasstagetabsmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/convertdatepopup': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/convertdatepopupstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/diagrammer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/diagrammerpanel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/diagrammerpanelstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/diagrammerstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-stage/0.1.0.50644ff37f8b/images',
        'obitech-stage/nls/canvas-stage-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/convertdatepopup.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/diagrammer.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/diagrammerpanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/root/canvas-stage-messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/root/convertdatepopup.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/root/diagrammer.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/nls/root/diagrammerpanel.messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-stage/transform-manager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-studio': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-studio/0.1.0.8c1e78cb40d4',
        'obitech-studio/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-studio/0.1.0.8c1e78cb40d4/images',
        'obitech-studio/modelquality': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/modelrelated': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/numericmodelquality': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studio': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studioartifactmanager': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studioartifactrenderer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studioartifactstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studioinspector': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/studiostyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-studio/uploadscriptdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-sunburst': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-sunburst/0.1.0.cd6b1d8fa243',
        'obitech-sunburst/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-sunburst/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-sunburst/sunburst': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-sunburst/sunburstdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-table/0.1.0.fcdb1fa05d8c',
        'obitech-table/bitabulargriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table/jettable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table/tableDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-table/tabularview': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tagcloud': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-tagcloud/1.0.0.d66dcafa77d6',
        'obitech-tagcloud/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tagcloud/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tagcloud/tagcloud': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tagcloud/tagclouddatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tagcloud/tagcloudstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-textbox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-textbox/1.0.0.9637155ef02e',
        'obitech-textbox/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-textbox/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-textbox/textbox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-textbox/textboxstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-thirdparty': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98',
        'obitech-thirdparty/caja/html-css-sanitizer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/caja/html-sanitizer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/canvg': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/canvg-master/rgbcolor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/canvg-master/stackblur': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/ckeditor/ckeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/ckeditor',
        'obitech-thirdparty/ckeditor/ckeditor-jquery': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/ckeditor-jquery',
        'obitech-thirdparty/ckeditor/config': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/config',
        'obitech-thirdparty/ckeditor/contents': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/contents',
        'obitech-thirdparty/ckeditor/lang': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/lang',
        'obitech-thirdparty/ckeditor/plugins': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/plugins',
        'obitech-thirdparty/ckeditor/skins': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/skins',
        'obitech-thirdparty/ckeditor/styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/ckeditor/styles',
        'obitech-thirdparty/codemirror/addon/display/autorefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/addon/display/placeholder': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/addon/hint/bitechexpression-hint': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/addon/hint/show-hint': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/addon/hint/show-hint-bitechstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/addon/hint/show-hint-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/lib/codemirror': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/lib/codemirrorstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/mode/bitechexpression': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/mode/sql': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/mode/xml': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/codemirror/theme/bitech': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/d3parallel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/d3parallelcss': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/filesaver': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/html2canvas': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jquery-custom-scrollbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jquery-custom-scrollbar-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jquery-mobile-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/jquery-mobile-styles',
        'obitech-thirdparty/jqueryui/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/jqueryui/images',
        'obitech-thirdparty/jqueryui/jqueryui-resizable-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jqueryui/jqueryui-slider-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jqueryui/jqueryui-smoothness-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jqueryui/jqueryui-tooltip-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/jspdf': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/jspdf',
        'obitech-thirdparty/jszip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-thirdparty/0.1.0.96dedb306d98/jszip',
        'obitech-thirdparty/openajaxhub': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/spectrum': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-thirdparty/spectrumstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'obitech-timeline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-timeline/1.0.0.228d44328051',
        'obitech-timeline/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-timeline/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-timeline/timeline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-timeline/timelineDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-timeline/timelinestyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tooltip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-tooltip/0.1.0.42f920bd2e49',
        'obitech-tooltip/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tooltip/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tooltip/tooltip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-tooltip/tooltipstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-topbottomfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-topbottomfilter/0.1.0.eeea01405ccd',
        'obitech-topbottomfilter/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-topbottomfilter/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-topbottomfilter/topbottomfilter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-topbottomfilter/topbottomfilterstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-topbottomfilter/topbottomfilterstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-topbottomfilter/topbottomfiltertouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/filters/1.0.0.973acb29c653/filters',
        'obitech-treemap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-treemap/0.1.0.ac18ad04c1e9',
        'obitech-treemap/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-treemap/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-treemap/treemap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-treemap/treemapdatamodelhandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-trellis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-trellis/0.1.0.551cfca8f2af',
        'obitech-trellis/jettrellis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-trellis/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-trellis/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-trellis/trellisgriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-trendline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-trendline/0.1.0.295b888579a7',
        'obitech-trendline/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-trendline/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-trendline/trendLineIcon': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-trendline/0.1.0.295b888579a7/trendLineIcon',
        'obitech-trendline/trendline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-trendline/trendlinemodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/dataenrich/1.0.0.cf1737de402d/dataenrich',
        'obitech-ui-components': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-ui-components/0.1.0.ea51a25502aa',
        'obitech-ui-components/columngroupeditor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-ui-components/columngroupeditor-styles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-ui-components/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-ui-components/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'obitech-va-landing': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-va-landing/0.1.0.0837f56adde3',
        'obitech-va-landing/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-va-landing/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-va-landing/va-landing': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-va-landing/valandingstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/homepage/1.0.0.b4550ab8a4d8/homepage',
        'obitech-viz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-viz/1.0.0.62e3b43ce746',
        'obitech-viz/dataModelHandlerDefinitions': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/embeddableDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/genericDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-viz/1.0.0.62e3b43ce746/images',
        'obitech-viz/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/tabularDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/viewdatadropinfo': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/viewdatadropinfostyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/viewdatadropinfostylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/viewdatadropinfotouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/visualizationConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-viz/1.0.0.62e3b43ce746/visualizationConfigSchema',
        'obitech-viz/visualizationDataModelConfigSchema': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-viz/1.0.0.62e3b43ce746/visualizationDataModelConfigSchema',
        'obitech-viz/visualizationHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/vizDataModelHandler': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/vizDataModelHandlerBase': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/vizcommonstyles': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-viz/vizcommonstylestouch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-vizhost': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/obitech-vizhost/0.1.0.7459888ec3e3',
        'obitech-vizhost/nls/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-vizhost/nls/root/messages': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitech-vizhost/vizhost': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'obitechcss': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'ojL10n': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'ojdnd': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojet/ojet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojet/ojet_base': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'ojs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtAxis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtChart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtDiagram': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtGantt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtGauge': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtLegend': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtNBox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtOverview': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtPanZoomCanvas': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtPictoChart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtSubcomponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtTagCloud': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtThematicMap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtTimeAxis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtTimeComponent': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtTimeline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtToolkit': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/internal-deps/dvt/DvtTreeView': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojL10n': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojaccordion': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojanimation': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojarraydatagriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojarraypagingdatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojarraytabledatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojbutton': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojchart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcheckboxset': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcollapsible': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcollectiondatagriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcollectionpagingdatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcollectiontabledatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcollectiontreedatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcolor': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcolorpalette': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcolorspectrum': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcomponentcore': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcomponents': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcomposite': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcomposite-knockout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojconveyorbelt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcore': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcube': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojcustomelement': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatacollection-common': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatacollection-utils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatagrid': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatagrid-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatasource-common': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdatetimepicker': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdiagram': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdialog': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdomscroller': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojdvt-base': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojeditablevalue': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojfilmstrip': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojflattenedtreedatagriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojflattenedtreetabledatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojgantt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojgauge': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojindexer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojindexermodeltreedatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojinputnumber': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojinputtext': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojjquery-hammer': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojjsondiagramdatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojjsontreedatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojknockout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojknockout-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojknockout-validation': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojkoshared': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojlegend': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojlistview': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojlistviewdnd': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmasonrylayout': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmenu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmessaging': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmodel': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmodule': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojmoduleanimations': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojnavigationlist': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojnbox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojoffcanvas': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpagingcontrol': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpagingcontrol-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpagingdatagriddatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpagingtabledatasource': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpictochart': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpopup': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpopupcore': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojprogressbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojpulltorefresh': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojradiocheckbox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojradioset': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojrouter': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojrowexpander': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojselectcombobox': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojslider': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojsunburst': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojswipetoreveal': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojswitch': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtable': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtable-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtabs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtagcloud': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojthematicmap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtime-base': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtimeaxis': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtimeline': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtimeutils': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtimezonedata': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtoolbar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtouchproxy': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtrain': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtree': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtree-model': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojtreemap': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojvalidation': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojvalidation-base': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojvalidation-datetime': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/ojvalidation-number': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/styles/alta/alta': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'ojs/styles/alta/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/ojs/styles/alta/fonts',
        'ojs/styles/common/images': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/ojs/styles/common/images',
        'ojtranslations': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/ojtranslations',
        'optional': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'oracle-jet': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8',
        'oracle-jet/require': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/require',
        'oracle-jet/resources/internal-deps': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/oracle-jet/3.1.0.b4550ab8a4d8/resources/internal-deps',
        'promise': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'report/report': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report',
        'report/report_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_ar',
        'report/report_base': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_base',
        'report/report_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_cs',
        'report/report_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_da',
        'report/report_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_de',
        'report/report_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_el',
        'report/report_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_es',
        'report/report_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_et',
        'report/report_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_fi',
        'report/report_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_fr',
        'report/report_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_fr-CA',
        'report/report_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_he',
        'report/report_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_hr',
        'report/report_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_hu',
        'report/report_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_it',
        'report/report_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_ja',
        'report/report_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_ko',
        'report/report_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_lt',
        'report/report_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_lv',
        'report/report_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_nl',
        'report/report_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_no',
        'report/report_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_pl',
        'report/report_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_pt',
        'report/report_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_pt-PT',
        'report/report_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_ro',
        'report/report_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_ru',
        'report/report_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_sk',
        'report/report_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_sv',
        'report/report_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_th',
        'report/report_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_tr',
        'report/report_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_zh-Hans',
        'report/report_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/report/1.0.0.b35ad42f64da/report_zh-Hant',
        'sac-resources': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static//bi-sac-config-mgr/js/resources',
        'signals': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet',
        'skin': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/application/1.0.0.e9c9269e2ec3/application',
        'text': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/ojet/1.0.0.b4550ab8a4d8/ojet_base',
        'thirdparty/thirdparty': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/thirdparty/1.0.0.96dedb306d98/thirdparty',
        'viz/viz': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz',
        'viz/viz_ar': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_ar',
        'viz/viz_cs': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_cs',
        'viz/viz_da': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_da',
        'viz/viz_de': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_de',
        'viz/viz_el': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_el',
        'viz/viz_es': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_es',
        'viz/viz_et': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_et',
        'viz/viz_fi': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_fi',
        'viz/viz_fr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_fr',
        'viz/viz_fr-CA': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_fr-CA',
        'viz/viz_he': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_he',
        'viz/viz_hr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_hr',
        'viz/viz_hu': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_hu',
        'viz/viz_it': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_it',
        'viz/viz_ja': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_ja',
        'viz/viz_ko': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_ko',
        'viz/viz_lt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_lt',
        'viz/viz_lv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_lv',
        'viz/viz_nl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_nl',
        'viz/viz_no': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_no',
        'viz/viz_pl': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_pl',
        'viz/viz_pt': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_pt',
        'viz/viz_pt-PT': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_pt-PT',
        'viz/viz_ro': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_ro',
        'viz/viz_ru': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_ru',
        'viz/viz_sk': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_sk',
        'viz/viz_sv': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_sv',
        'viz/viz_th': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_th',
        'viz/viz_tr': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_tr',
        'viz/viz_zh-Hans': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_zh-Hans',
        'viz/viz_zh-Hant': 'https://ucf4-obi0321-gse.oracledemos.com:443/dv/static/viz/1.0.0.a27488492af7/viz_zh-Hant',
    },
    shim: {
        'obitech-thirdparty/d3parallel': {
            'deps': ['d3js', ],
            'exports': 'd3'
        },
        'obitech-thirdparty/ckeditor/ckeditor-jquery': {
            'deps': ['jquery', 'obitech-thirdparty/ckeditor/ckeditor', 'obitech-thirdparty/ckeditor/styles', 'obitech-thirdparty/ckeditor/config', ],
            'exports': '$'
        },
        'obitech-thirdparty/canvg-master/stackblur': {
            'exports': 'stackblur'
        },
        'obitechcss!obitech-report/reportstyles': {
            'deps': ['obitechcss!obitech-application/bitechfonticonstyles', ],
        },
        'obitech-thirdparty/openajaxhub': {
            'exports': 'OpenAjax'
        },
        'jquery-mobile': {
            'deps': ['jquery', 'obitechcss!obitech-thirdparty/jquery-mobile-styles', ],
            'exports': '$'
        },
        'obitech-thirdparty/codemirror/addon/hint/show-hint': {
            'deps': ['obitechcss!obitech-thirdparty/codemirror/addon/hint/show-hint-styles', 'obitechcss!obitech-thirdparty/codemirror/addon/hint/show-hint-bitechstyles', ],
        },
        'obitech-thirdparty/jquery-custom-scrollbar': {
            'deps': ['jquery', 'obitechcss!obitech-thirdparty/jquery-custom-scrollbar-styles', ],
            'exports': '$'
        },
        'obitech-thirdparty/canvg-master/rgbcolor': {
            'exports': 'rgbcolor'
        },
        'obitech-thirdparty/filesaver': {
            'exports': 'saveAs'
        },
        'obitech-thirdparty/html2canvas': {
            'exports': 'html2canvas'
        },
        'obitech-thirdparty/ckeditor/config': {
            'deps': ['obitech-thirdparty/ckeditor/ckeditor', ],
            'exports': 'CKEDITOR'
        },
        'obitech-thirdparty/ckeditor/ckeditor': {
            'deps': ['obitechcss!obitech-thirdparty/ckeditor/contents', ],
            'exports': 'CKEDITOR'
        },
        'obitech-thirdparty/canvg': {
            'deps': ['obitech-thirdparty/canvg-master/rgbcolor', 'obitech-thirdparty/canvg-master/stackblur', ],
            'exports': 'canvg'
        },
        'obitech-thirdparty/codemirror/lib/codemirror': {
            'deps': ['obitechcss!obitech-thirdparty/codemirror/lib/codemirrorstyles', 'obitechcss!obitech-thirdparty/codemirror/theme/bitech', ],
        },
        'obitech-forecast-shaper/forecast-shaper': {
            'deps': ['jquery', 'd3js', ],
        },
        'obitech-thirdparty/ckeditor/styles': {
            'deps': ['obitech-thirdparty/ckeditor/ckeditor', ],
            'exports': 'CKEDITOR'
        },
        'obitech-scatterplotmatrix/scatterplotmatrix': {
            'deps': ['jquery', 'd3js', ],
        },
        'obitech-thirdparty/spectrum': {
            'deps': ['obitechcss!obitech-thirdparty/spectrumstyles', ],
        },
    },
};
window.bitech_requirejs = requirejs.config(window.bitech_requirejs_config);
//Copyright Â© 1997, 2016, Oracle and/or its affiliates.
//All rights reserved.

/**
 *  @fileoverview embedding API implementation
 *  Author Raveesh
 */

/**
 *  @module obitech-embedding/embedding
 */

if (oracle === undefined) {
    var oracle = {};
}

if (oracle.bi === undefined) {
    oracle.bi = {};
}

if (oracle.bi.tech === undefined) {
    oracle.bi.tech = {};
}

requirejs.config({
    config: {
        text: {
            useXhr: function( /*url, protocol, hostname, port*/ ) {
                return true;
            }
        }
    }
});

var jsx;

window.bitech_requirejs(['obitech-framework/jsx', 'jet-composites/oracle-dv/loader'],
    function(jsxAPI) {
        jsx = jsxAPI;
    });

oracle.bi.tech.bootstrap = function(fOnSuccess, fOnFailure) {
    window.bitech_requirejs(['obitech-application/bootstrap'],
        function(bootstrap) {

            var _fOnSuccess = function() {
                if (jsx.isFunction(fOnSuccess)) {
                    fOnSuccess();
                }
            };

            var _fOnFailure = function() {
                if (jsx.isFunction(fOnFailure)) {
                    fOnFailure();
                }
            };

            var sBaseURL = window.bitech_bootstrap_baseUrl;

            var oBootstrapOptions = {};
            oBootstrapOptions.baseUrl = sBaseURL;

            window.bitech_embedding_mode = true;

            bootstrap.bootstrapApplication(_fOnSuccess, _fOnFailure, oBootstrapOptions);
        });
};

oracle.bi.tech.renderProject = function(oConfigJSON) {
    window.bitech_requirejs(['obitech-application/bootstrap',
            'obitech-application/bi-definitions'
        ],
        function(bootstrap, definitions) {

            var oReportOptions = {
                sInitialUseCaseType: definitions.ReportUseCaseType.REPORTING,
                eRenderMode: definitions.ReportRenderMode.EMBEDDED_MODE,
                hostedComponentOptions: {},
                bDisableDialogs: true
            };

            //Define the hosted component options for the Report
            oReportOptions.hostedComponentOptions[definitions.Splitter_ID] = false;
            oReportOptions.hostedComponentOptions[definitions.ReportHeader_ID] = false;
            oReportOptions.hostedComponentOptions[definitions.DatasourceDialog_ID] = false;

            var _fRenderProjectOnAppAvailability = function(oApp, oReportOpts) {
                var oEmbeddingService = oApp.getHostingContext().getService(definitions.EmbeddingService_SERVICE_NAME);

                if (oEmbeddingService) {
                    oEmbeddingService.renderProject(oConfigJSON, oReportOpts);
                }
            };

            var _fOnSuccess = function() {
                var oAppInstance = bootstrap.getApplicationInstance();
                _fRenderProjectOnAppAvailability(oAppInstance, oReportOptions);

                return definitions.EmbeddingResultCodes.SUCCESS;
            };

            var _fOnFailure = function() {
                return definitions.EmbeddingResultCodes.FAILURE;
            };

            var oApp = bootstrap.getApplicationInstance();

            if (jsx.isNull(oApp)) {
                oracle.bi.tech.bootstrap(_fOnSuccess, _fOnFailure);
            } else {
                _fRenderProjectOnAppAvailability(oApp, oReportOptions);
            }
        });
};

oracle.bi.tech.launchProject = function(oConfigJSON) {
    var sContextURL = window.bitech_contextUrl;

    var sURLPath = sContextURL + "project.jsp?reportpath=" + oConfigJSON.projectPath;

    window.open(sURLPath);
};

oracle.bi.tech.addFilters = function(aFilters) {
    window.bitech_requirejs(['obitech-application/bootstrap',
            'obitech-application/bi-definitions'
        ],
        function(bootstrap, definitions) {
            var oApp = bootstrap.getApplicationInstance();
            var oEmbeddingService = oApp.getHostingContext().getService(definitions.EmbeddingService_SERVICE_NAME);

            if (oEmbeddingService) {
                oEmbeddingService.addFiltersToReports(aFilters);
            }
        });
};
