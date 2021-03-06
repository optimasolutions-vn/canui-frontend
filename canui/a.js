! function(e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("react"));
  else if ("function" == typeof define && define.amd) define(["react"], t);
  else {
    var n = t("object" == typeof exports ? require("react") : e.React);
    for (var r in n)("object" == typeof exports ? exports : e)[r] = n[r]
  }
}(this, function(e) {
  return function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: r
      })
    }, t.n = function(e) {
      var n = e && e.__esModule ? function() {
        return e.default
      } : function() {
        return e
      };
      return t.d(n, "a", n), n
    }, t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 6)
  }([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = void 0;
    "undefined" != typeof window && (r = window.document.createElement("a"));
    t.omit = function(e, t) {
      return Object.keys(e).reduce(function(n, r) {
        return -1 === t.indexOf(r) && (n[r] = e[r]), n
      }, {})
    }, t.parseAsURL = function(e) {
      return r || (r = window.document.createElement("a")), r.href = e, {
        protocol: r.protocol,
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname,
        search: r.search,
        hash: r.hash,
        host: r.host,
        toString: function() {
          return this.protocol + "//" + this.host + ("/" === this.pathname ? "" : this.pathname) + this.search + this.hash
        }
      }
    }, t.getQueryStringValue = function(e) {
      return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(e).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
    }, t.getHashValue = function(e) {
      var t = window.location.hash.match(new RegExp(e + "=([^&]*)"));
      return t ? t[1] : null
    }, t.cleanLocation = function() {
      if (window.history && window.history.pushState) {
        var e = window.location,
          t = e.protocol,
          n = e.host,
          r = e.pathname,
          o = e.search,
          i = e.hash,
          a = /access_token/.test(i) ? "" : i || "",
          s = o.split("&").reduce(function(e, t, n) {
            var r = /rslCallback=/.test(t) || /code=/.test(t) || /state=/.test(t) || /error=/.test(t) || /error_reason=/.test(t);
            return 0 === n && r ? "?" : 0 === n ? t : r ? e : e + "&" + t
          }, "");
        return s = "?" === s ? "" : s, window.history.pushState({
          html: document.body.innerHTML,
          pageTitle: document.title
        }, "", t + "//" + n + r + s + a), !0
      }
    }, t.rslError = function(e) {
      var t = [];
      return t.push("[" + e.provider + "][" + e.type + "] " + e.description), e.error && t.push(JSON.stringify(e.error, null, 2)), Error(t.join("\n\nORIGINAL ERROR: "))
    }, t.timestampFromNow = function(e) {
      var t = new Date;
      return t.setSeconds(t.getSeconds() + e)
    }
  }, function(e, t) {
    ! function(e) {
      "use strict";

      function t(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
      }

      function n(e) {
        return "string" != typeof e && (e = String(e)), e
      }

      function r(e) {
        var t = {
          next: function() {
            var t = e.shift();
            return {
              done: void 0 === t,
              value: t
            }
          }
        };
        return y.iterable && (t[Symbol.iterator] = function() {
          return t
        }), t
      }

      function o(e) {
        this.map = {}, e instanceof o ? e.forEach(function(e, t) {
          this.append(t, e)
        }, this) : Array.isArray(e) ? e.forEach(function(e) {
          this.append(e[0], e[1])
        }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
          this.append(t, e[t])
        }, this)
      }

      function i(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
      }

      function a(e) {
        return new Promise(function(t, n) {
          e.onload = function() {
            t(e.result)
          }, e.onerror = function() {
            n(e.error)
          }
        })
      }

      function s(e) {
        var t = new FileReader,
          n = a(t);
        return t.readAsArrayBuffer(e), n
      }

      function u(e) {
        var t = new FileReader,
          n = a(t);
        return t.readAsText(e), n
      }

      function c(e) {
        for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
        return n.join("")
      }

      function l(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
      }

      function d() {
        return this.bodyUsed = !1, this._initBody = function(e) {
          if (this._bodyInit = e, e)
            if ("string" == typeof e) this._bodyText = e;
            else if (y.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
            else if (y.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
            else if (y.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
            else if (y.arrayBuffer && y.blob && w(e)) this._bodyArrayBuffer = l(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
            else {
              if (!y.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !b(e)) throw new Error("unsupported BodyInit type");
              this._bodyArrayBuffer = l(e)
            } else this._bodyText = "";
          this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : y.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        }, y.blob && (this.blob = function() {
          var e = i(this);
          if (e) return e;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function() {
          return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
        }), this.text = function() {
          var e = i(this);
          if (e) return e;
          if (this._bodyBlob) return u(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(c(this._bodyArrayBuffer));
          if (this._bodyFormData) throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText)
        }, y.formData && (this.formData = function() {
          return this.text().then(h)
        }), this.json = function() {
          return this.text().then(JSON.parse)
        }, this
      }

      function f(e) {
        var t = e.toUpperCase();
        return k.indexOf(t) > -1 ? t : e
      }

      function p(e, t) {
        t = t || {};
        var n = t.body;
        if (e instanceof p) {
          if (e.bodyUsed) throw new TypeError("Already read");
          this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new o(e.headers)), this.method = e.method, this.mode = e.mode, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new o(t.headers)), this.method = f(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(n)
      }

      function h(e) {
        var t = new FormData;
        return e.trim().split("&").forEach(function(e) {
          if (e) {
            var n = e.split("="),
              r = n.shift().replace(/\+/g, " "),
              o = n.join("=").replace(/\+/g, " ");
            t.append(decodeURIComponent(r), decodeURIComponent(o))
          }
        }), t
      }

      function m(e) {
        var t = new o;
        return e.split(/\r?\n/).forEach(function(e) {
          var n = e.split(":"),
            r = n.shift().trim();
          if (r) {
            var o = n.join(":").trim();
            t.append(r, o)
          }
        }), t
      }

      function g(e, t) {
        t || (t = {}), this.type = "default", this.status = "status" in t ? t.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new o(t.headers), this.url = t.url || "", this._initBody(e)
      }
      if (!e.fetch) {
        var y = {
          searchParams: "URLSearchParams" in e,
          iterable: "Symbol" in e && "iterator" in Symbol,
          blob: "FileReader" in e && "Blob" in e && function() {
            try {
              return new Blob, !0
            } catch (e) {
              return !1
            }
          }(),
          formData: "FormData" in e,
          arrayBuffer: "ArrayBuffer" in e
        };
        if (y.arrayBuffer) var v = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
          w = function(e) {
            return e && DataView.prototype.isPrototypeOf(e)
          },
          b = ArrayBuffer.isView || function(e) {
            return e && v.indexOf(Object.prototype.toString.call(e)) > -1
          };
        o.prototype.append = function(e, r) {
          e = t(e), r = n(r);
          var o = this.map[e];
          this.map[e] = o ? o + "," + r : r
        }, o.prototype.delete = function(e) {
          delete this.map[t(e)]
        }, o.prototype.get = function(e) {
          return e = t(e), this.has(e) ? this.map[e] : null
        }, o.prototype.has = function(e) {
          return this.map.hasOwnProperty(t(e))
        }, o.prototype.set = function(e, r) {
          this.map[t(e)] = n(r)
        }, o.prototype.forEach = function(e, t) {
          for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
        }, o.prototype.keys = function() {
          var e = [];
          return this.forEach(function(t, n) {
            e.push(n)
          }), r(e)
        }, o.prototype.values = function() {
          var e = [];
          return this.forEach(function(t) {
            e.push(t)
          }), r(e)
        }, o.prototype.entries = function() {
          var e = [];
          return this.forEach(function(t, n) {
            e.push([n, t])
          }), r(e)
        }, y.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
        var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        p.prototype.clone = function() {
          return new p(this, {
            body: this._bodyInit
          })
        }, d.call(p.prototype), d.call(g.prototype), g.prototype.clone = function() {
          return new g(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new o(this.headers),
            url: this.url
          })
        }, g.error = function() {
          var e = new g(null, {
            status: 0,
            statusText: ""
          });
          return e.type = "error", e
        };
        var _ = [301, 302, 303, 307, 308];
        g.redirect = function(e, t) {
          if (-1 === _.indexOf(t)) throw new RangeError("Invalid status code");
          return new g(null, {
            status: t,
            headers: {
              location: e
            }
          })
        }, e.Headers = o, e.Request = p, e.Response = g, e.fetch = function(e, t) {
          return new Promise(function(n, r) {
            var o = new p(e, t),
              i = new XMLHttpRequest;
            i.onload = function() {
              var e = {
                status: i.status,
                statusText: i.statusText,
                headers: m(i.getAllResponseHeaders() || "")
              };
              e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL");
              var t = "response" in i ? i.response : i.responseText;
              n(new g(t, e))
            }, i.onerror = function() {
              r(new TypeError("Network request failed"))
            }, i.ontimeout = function() {
              r(new TypeError("Network request failed"))
            }, i.open(o.method, o.url, !0), "include" === o.credentials && (i.withCredentials = !0), "responseType" in i && y.blob && (i.responseType = "blob"), o.headers.forEach(function(e, t) {
              i.setRequestHeader(t, e)
            }), i.send(void 0 === o._bodyInit ? null : o._bodyInit)
          })
        }, e.fetch.polyfill = !0
      }
    }("undefined" != typeof self ? self : this)
  }, function(e, t, n) {
    e.exports = n(9)()
  }, function(t, n) {
    t.exports = e
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = n(11),
      i = r(o),
      a = n(12),
      s = r(a),
      u = n(13),
      c = r(u),
      l = n(17),
      d = r(l),
      f = n(18),
      p = r(f),
      h = n(20),
      m = r(h);
    t.default = {
      amazon: i.default,
      github: c.default,
      google: d.default,
      facebook: s.default,
      instagram: p.default,
      linkedin: m.default
    }
  }, function(e, t, n) {
    "use strict";

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      i = function() {
        function e(t) {
          r(this, e), this._provider = t, this._profile = {
            id: void 0,
            name: void 0,
            firstName: void 0,
            lastName: void 0,
            email: void 0,
            profilePicUrl: void 0,
            gender: void 0
          }, this._token = {
            accessToken: void 0,
            expiresAt: void 0
          }
        }
        return o(e, [{
          key: "provider",
          set: function(e) {
            this._provider = e
          },
          get: function() {
            return this._provider
          }
        }, {
          key: "profile",
          set: function(e) {
            this._profile = e
          },
          get: function() {
            return this._profile
          }
        }, {
          key: "token",
          set: function(e) {
            this._token = e
          },
          get: function() {
            return this._token
          }
        }]), e
      }();
    t.default = i
  }, function(e, t, n) {
    n(1), e.exports = n(7)
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.OldSocialLogin = void 0;
    var s = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
      },
      u = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      c = n(8);
    Object.defineProperty(t, "OldSocialLogin", {
      enumerable: !0,
      get: function() {
        return r(c).default
      }
    });
    var l = n(2),
      d = r(l),
      f = n(3),
      p = r(f),
      h = n(21),
      m = r(h),
      g = n(4),
      y = r(g),
      v = n(5),
      w = r(v),
      b = n(0),
      k = n(22),
      _ = r(k),
      P = function(e) {
        var t, n;
        return n = t = function(t) {
          function n(t) {
            o(this, n);
            var r = i(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t));
            return r.isStateless = !e.prototype.render, r.state = {
              isLoaded: !1,
              isConnected: !1,
              isFetching: !1
            }, r.sdk = y.default[t.provider], r.accessToken = null, r.fetchProvider = "instagram" === t.provider || "github" === t.provider, r.loadPromise = Promise.resolve(), r.node = null, r.onLoginSuccess = r.onLoginSuccess.bind(r), r.onLoginFailure = r.onLoginFailure.bind(r), r.onLogoutFailure = r.onLogoutFailure.bind(r), r.onLogoutSuccess = r.onLogoutSuccess.bind(r), r.login = r.login.bind(r), r.logout = r.logout.bind(r), r.setInstance = r.setInstance.bind(r), r
          }
          return a(n, t), u(n, [{
            key: "componentDidMount",
            value: function() {
              var e = this,
                t = this.props,
                n = t.appId,
                r = t.autoCleanUri,
                o = t.autoLogin,
                i = t.gatekeeper,
                a = t.redirect,
                u = t.scope,
                c = t.version;
              this.loadPromise = (0, _.default)(this.sdk.load({
                appId: n,
                redirect: a,
                gatekeeper: i,
                scope: u,
                version: c
              }).then(function(t) {
                return r && (0, b.cleanLocation)(), t && (e.accessToken = t), e.setState(function(e) {
                  return s({}, e, {
                    isLoaded: !0
                  })
                }, function() {
                  (o || e.accessToken) && (e.fetchProvider && !e.accessToken ? e.sdk.login(n, a).catch(e.onLoginFailure) : e.sdk.checkLogin(!0).then(e.onLoginSuccess, e.onLoginFailure))
                }), null
              }, this.onLoginFailure))
            }
          }, {
            key: "componentWillReceiveProps",
            value: function(e) {
              var t = this,
                n = this.props,
                r = n.appId,
                o = n.gatekeeper;
              "github" !== n.provider || o || r === e.appId || this.setState(function() {
                return {
                  isLoaded: !1,
                  isFetching: !1,
                  isConnected: !1
                }
              }, function() {
                t.sdk.load(e.appId).then(function() {
                  t.setState(function(e) {
                    return s({}, e, {
                      isLoaded: !0
                    })
                  })
                }, t.onLoginFailure)
              })
            }
          }, {
            key: "componentWillUnmount",
            value: function() {
              this.loadPromise.cancel(), this.node = null
            }
          }, {
            key: "setInstance",
            value: function(e) {
              this.node = e, "function" == typeof this.props.getInstance && this.props.getInstance(e)
            }
          }, {
            key: "login",
            value: function() {
              var e = this;
              if (!navigator.onLine && this.props.onInternetFailure) {
                if (!1 === this.props.onInternetFailure()) return
              }!this.state.isLoaded || this.state.isConnected || this.state.isFetching ? this.state.isLoaded && this.state.isConnected ? this.props.onLoginFailure("User already connected") : this.state.isLoaded && this.state.isFetching ? this.props.onLoginFailure("Fetching user") : this.state.isLoaded ? this.props.onLoginFailure("Unknown error") : this.props.onLoginFailure("SDK not loaded") : this.setState(function(e) {
                return s({}, e, {
                  isFetching: !0
                })
              }, function() {
                e.sdk.login().then(e.onLoginSuccess, e.onLoginFailure)
              })
            }
          }, {
            key: "onLoginSuccess",
            value: function(e) {
              var t = this.props,
                n = t.onLoginSuccess,
                r = t.provider,
                o = new w.default(r),
                i = this.sdk.generateUser(e);
              o.profile = i.profile, o.token = i.token, this.node ? this.setState(function(e) {
                return s({}, e, {
                  isFetching: !1,
                  isConnected: !0
                })
              }, function() {
                "function" == typeof n && n(o)
              }) : "function" == typeof n && n(o)
            }
          }, {
            key: "onLoginFailure",
            value: function(e) {
              var t = this.props.onLoginFailure;
              this.node ? this.setState(function(e) {
                return s({}, e, {
                  isFetching: !1,
                  isConnected: !1
                })
              }, function() {
                "function" == typeof t && t(e)
              }) : "function" == typeof t && t(e)
            }
          }, {
            key: "logout",
            value: function() {
              this.state.isLoaded && this.state.isConnected ? this.sdk.logout().then(this.onLogoutSuccess, this.onLogoutFailure) : this.state.isLoaded && !this.state.isConnected ? this.props.onLoginFailure("User not connected") : this.props.onLoginFailure("SDK not loaded")
            }
          }, {
            key: "onLogoutSuccess",
            value: function() {
              var e = this.props.onLogoutSuccess;
              this.node ? this.setState(function(e) {
                return s({}, e, {
                  isConnected: !1
                })
              }, function() {
                "function" == typeof e && e()
              }) : "function" == typeof e && e()
            }
          }, {
            key: "onLogoutFailure",
            value: function(e) {
              "function" == typeof this.props.onLoginFailure && this.props.onLoginFailure(e)
            }
          }, {
            key: "render",
            value: function() {
              var t = (0, b.omit)(this.props, ["appId", "scope", "autoCleanUri", "autoLogin", "gatekeeper", "getInstance", "onLoginFailure", "onLoginSuccess", "onLogoutFailure", "onLogoutSuccess", "provider", "redirect", "onInternetFailure", "ref"]),
                n = {};
              return (this.props.onLogoutFailure || this.props.onLogoutSuccess) && (n = {
                triggerLogout: this.logout
              }), this.isStateless || (n = s({}, n, {
                ref: this.setInstance
              })), this.state.isLoaded ? p.default.createElement(e, s({
                triggerLogin: this.login
              }, n, t)) : null
            }
          }]), n
        }(f.Component), t.propTypes = {
          appId: d.default.string.isRequired,
          autoCleanUri: d.default.bool,
          autoLogin: d.default.bool,
          gatekeeper: d.default.string,
          getInstance: d.default.func,
          onLoginFailure: d.default.func,
          onLoginSuccess: d.default.func,
          onLogoutFailure: d.default.func,
          onLogoutSuccess: d.default.func,
          onInternetFailure: d.default.func,
          provider: d.default.oneOf(m.default.providers).isRequired,
          redirect: function(e, t, n) {
            if ("instagram" === e.provider && (!e[t] || "string" != typeof e[t])) return new Error("Missing required `" + t + "` prop of type `string` on " + n + ".")
          },
          scope: d.default.oneOfType([d.default.array, d.default.string])
        }, n
      };
    t.default = P
  }, function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function a(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var s = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }(),
      u = n(2),
      c = r(u),
      l = n(3),
      d = r(l),
      f = n(4),
      p = r(f),
      h = n(5),
      m = r(h),
      g = function(e) {
        function t(e) {
          o(this, t);
          var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return n.id = "sl" + Math.floor(65535 * Math.random()), n.handleSocialLoginInvokeSuccess = n.handleSocialLoginInvokeSuccess.bind(n), n.handleSocialLoginInvokeFailure = n.handleSocialLoginInvokeFailure.bind(n), n.handleLogin = n.handleLogin.bind(n), n
        }
        return a(t, e), s(t, [{
          key: "handleSocialLoginInvokeSuccess",
          value: function(e) {
            var t = this.props,
              n = t.callback,
              r = t.provider,
              o = new m.default,
              i = void 0,
              a = void 0;
            switch (r) {
              case "google":
                var s = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile(),
                  u = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(!0);
                i = {
                  id: s.getId(),
                  name: s.getName(),
                  firstName: s.getGivenName(),
                  lastName: s.getFamilyName(),
                  email: s.getEmail(),
                  profilePicURL: s.getImageUrl()
                }, a = {
                  accessToken: u.access_token,
                  idToken: u.id_token,
                  scope: u.scope,
                  expiresIn: u.expires_in,
                  firstIssued_at: u.first_issued_at,
                  expiresAt: u.expires_at
                };
                break;
              case "facebook":
                i = {
                  id: e.id,
                  name: e.name,
                  firstName: e.first_name,
                  lastName: e.last_name,
                  email: e.email,
                  profilePicURL: e.picture.data.url
                }, a = {
                  accessToken: e.authResponse.accessToken,
                  expiresAt: e.authResponse.expiresIn
                };
                break;
              case "linkedin":
                i = {
                  id: window.IN.ENV.auth.member_id,
                  name: e.values[0].firstName + " " + e.values[0].lastName,
                  firstName: e.values[0].firstName,
                  lastName: e.values[0].lastName,
                  email: e.values[0].emailAddress,
                  profilePicURL: e.values[0].pictureUrl
                }, a = {
                  accessToken: void 0
                };
                var c = new Date;
                c.setSeconds(c.getSeconds() + window.IN.ENV.auth.oauth_expires_in), o.token.expiresAt = c;
                break;
              default:
                throw new Error("Provider ???" + r + "??? isn???t supported.")
            }
            o.provider = r, o.profile = i, o.token = a, n(o, null)
          }
        }, {
          key: "handleSocialLoginInvokeFailure",
          value: function(e) {
            this.props.callback(null, e)
          }
        }, {
          key: "handleLogin",
          value: function(e, t) {
            var n = this,
              r = this.props,
              o = r.appId,
              i = r.provider,
              a = r.version,
              s = this.handleSocialLoginInvokeSuccess;
            "facebook" === i ? (window.FB.init({
              appId: o,
              xfbml: !0,
              version: "v" + a
            }), window.FB.login(function(e) {
              var t = e;
              window.FB.api("/me", {
                fields: "email,name,id,first_name,last_name,picture"
              }, function(e) {
                Object.assign(e, t), s(e)
              })
            }, {
              scope: "email"
            })) : "linkedin" === i && window.IN.User.authorize(function(e) {
              window.IN.API.Profile("me").fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "emailAddress"]).result(function(e) {
                s(e)
              }).error(function(e) {
                n.handleSocialLoginInvokeFailure(e)
              })
            })
          }
        }, {
          key: "componentDidMount",
          value: function() {
            var e = this.props.appId;
            "google" === this.props.provider ? p.default.google.oldLoad(e, this.id, this.handleSocialLoginInvokeSuccess, this.handleSocialLoginInvokeFailure) : "facebook" === this.props.provider ? p.default.facebook.oldLoad(e) : "linkedin" === this.props.provider && p.default.linkedin.oldLoad(e)
          }
        }, {
          key: "getProfile",
          value: function() {
            window.IN.API.Profile("me").fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "emailAddress"]).result(function(e) {
              alert(e)
            })
          }
        }, {
          key: "render",
          value: function() {
            return d.default.createElement("div", {
              id: this.id,
              onClick: this.handleLogin
            }, this.props.children)
          }
        }]), t
      }(l.Component);
    g.propTypes = {
      appId: c.default.string.isRequired,
      callback: c.default.func,
      children: c.default.oneOfType([c.default.string, c.default.number, c.default.element, c.default.node]).isRequired,
      provider: c.default.oneOf(["facebook", "google", "linkedin"]).isRequired,
      version: c.default.string
    }, g.defaultProps = {
      version: "2.8"
    }, t.default = g
  }, function(e, t, n) {
    "use strict";

    function r() {}

    function o() {}
    var i = n(10);
    o.resetWarningCache = r, e.exports = function() {
      function e(e, t, n, r, o, a) {
        if (a !== i) {
          var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw s.name = "Invariant Violation", s
        }
      }

      function t() {
        return e
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: o,
        resetWarningCache: r
      };
      return n.PropTypes = n, n
    }
  }, function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
      },
      o = n(0),
      i = ["profile"],
      a = function(e) {
        var t = e.appId,
          n = e.scope;
        return new Promise(function(e) {
          if (document.getElementById("amazon-sdk")) return e();
          Array.isArray(n) ? i = i.concat(n) : "string" == typeof n && n && (i = i.concat(n.split(","))), i = i.reduce(function(e, t) {
            return "string" == typeof t && -1 === e.indexOf(t) && e.push(t.trim()), e
          }, []);
          var r = document.getElementsByTagName("script")[0],
            o = document.createElement("script");
          o.src = "https://api-cdn.amazon.com/sdk/login1.js", o.id = "amazon-sdk", o.async = !0, window.onAmazonLoginReady = function() {
            return window.amazon.Login.setClientId(t), e()
          }, r ? r.parentNode.appendChild(o) : document.appendChild(o)
        })
      },
      s = function() {
        return new Promise(function(e, t) {
          window.amazon.Login.authorize({
            scope: i
          }, function(n) {
            return n.error ? t((0, o.rslError)({
              provider: "amazon",
              type: "auth",
              description: "Authentication failed",
              error: n
            })) : l(n).then(e, t)
          })
        })
      },
      u = function() {
        return new Promise(function(e, t) {
          return s().then(e, t)
        })
      },
      c = function() {
        return new Promise(function(e) {
          return window.amazon.Login.logout(), e()
        })
      },
      l = function(e) {
        return new Promise(function(t, n) {
          window.amazon.Login.retrieveProfile(e.access_token, function(i) {
            return i.error ? n((0, o.rslError)({
              provider: "amazon",
              type: "get_profile",
              description: "Failed to get user profile",
              error: i
            })) : t(r({}, e, i))
          })
        })
      },
      d = function(e) {
        return {
          profile: {
            id: e.profile.CustomerId,
            name: e.profile.Name,
            firstName: e.profile.Name,
            lastName: e.profile.Name,
            email: e.profile.PrimaryEmail,
            profilePicURL: void 0
          },
          token: {
            accessToken: e.access_token,
            expiresAt: (0, o.timestampFromNow)(e.expires_in)
          }
        }
      };
    t.default = {
      checkLogin: s,
      generateUser: d,
      load: a,
      login: u,
      logout: c
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
      },
      o = n(0),
      i = ["public_profile", "email"],
      a = function(e) {
        var t = e.appId,
          n = e.scope,
          r = e.version;
        return new Promise(function(e) {
          if (document.getElementById("facebook-jssdk")) return e();
          Array.isArray(n) ? i = i.concat(n) : "string" == typeof n && n && (i = i.concat(n.split(","))), i = i.reduce(function(e, t) {
            return "string" == typeof t && -1 === e.indexOf(t) && e.push(t.trim()), e
          }, []).join(",");
          var o = document.getElementsByTagName("script")[0],
            a = document.createElement("script");
          a.src = "https://connect.facebook.net/en_US/sdk.js", a.id = "facebook-jssdk", window.fbAsyncInit = function() {
            return window.FB.init({
              appId: t,
              xfbml: !0,
              version: r || "v5.0"
            }), e()
          }, o ? o.parentNode.appendChild(a) : document.appendChild(a)
        })
      },
      s = function(e) {
        return new Promise(function(t, n) {
          if (!e.authResponse) return n((0, o.rslError)({
            provider: "facebook",
            type: "auth",
            description: "Authentication failed",
            error: e
          }));
          switch (e.status) {
            case "connected":
              d().then(function(n) {
                return t(r({}, n, e.authResponse))
              });
              break;
            case "not_authorized":
            case "unknown":
              return n((0, o.rslError)({
                provider: "facebook",
                type: "auth",
                description: "Authentication has been cancelled or an unknown error occurred",
                error: e
              }))
          }
        })
      },
      u = function() {
        return new Promise(function(e, t) {
          window.FB.getLoginStatus(function(n) {
            return s(n).then(e, t)
          })
        })
      },
      c = function() {
        return new Promise(function(e, t) {
          window.FB.login(function(n) {
            return s(n).then(e, t)
          }, {
            scope: i
          })
        })
      },
      l = function() {
        return new Promise(function(e) {
          window.FB.logout(e)
        })
      },
      d = function() {
        return new Promise(function(e) {
          window.FB.api("/me", "GET", {
            fields: "email,name,id,first_name,last_name,picture"
          }, e)
        })
      },
      f = function(e) {
        return {
          profile: {
            id: e.id,
            name: e.name,
            firstName: e.first_name,
            lastName: e.last_name,
            email: e.email,
            profilePicURL: e.picture.data.url
          },
          token: {
            accessToken: e.accessToken,
            expiresAt: (0, o.timestampFromNow)(e.expiresIn)
          }
        }
      },
      p = function(e) {
        var t = "fb-client",
          n = document.getElementsByTagName("script")[0],
          r = void 0;
        document.getElementById(t) || (r = document.createElement("script"), r.id = t, r.src = "//connect.facebook.net/en_US/all.js", r.onLoad = function() {
          window.fbAsyncInit = function() {
            window.FB.init({
              appId: e,
              xfbml: !0,
              version: "v3.3"
            })
          }
        }, n.parentNode.insertBefore(r, n))
      };
    t.default = {
      checkLogin: u,
      generateUser: f,
      load: a,
      login: c,
      logout: l,
      oldLoad: p
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(14),
      o = function(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(r),
      i = n(0),
      a = !1,
      s = void 0,
      u = void 0,
      c = void 0,
      l = void 0;
    "undefined" == typeof window || window.fetch || n(1);
    var d = function(e) {
        var t = e.appId,
          n = e.gatekeeper,
          r = e.redirect,
          d = e.scope;
        return new Promise(function(e, f) {
          if (!t) return f((0, i.rslError)({
            provider: "github",
            type: "load",
            description: "Cannot load SDK without appId",
            error: null
          }));
          if (c = t, !n) return e();
          s = n, a = !0;
          var p = (0, i.parseAsURL)(r),
            h = ["user"];
          if (Array.isArray(d) ? h = d : "string" == typeof d && d && (h = d.split(",")), h = h.reduce(function(e, t) {
              return "string" == typeof t && -1 === e.indexOf(t) && e.push(t.trim()), e
            }, []).join("%20"), p.search = p.search ? p.search + "&rslCallback=github" : "?rslCallback=github", l = "https://github.com/login/oauth/authorize?client_id=" + c + "&redirect_uri=" + encodeURIComponent(p.toString()) + "&scope=" + h + "&state=" + (0, o.default)(r, o.default.URL), "github" !== (0, i.getQueryStringValue)("rslCallback")) return e();
          m().then(function(t) {
            return u = t, e(u)
          }).catch(f)
        })
      },
      f = function() {
        return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? p() : !u && a ? Promise.reject((0, i.rslError)({
          provider: "github",
          type: "access_token",
          description: "No access token available",
          error: null
        })) : new Promise(function(e, t) {
          window.fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: new Headers({
              Authorization: "Bearer " + (u || c)
            }),
            body: JSON.stringify({
              query: "query { viewer { login, name, email, avatarUrl, id } }"
            })
          }).then(function(e) {
            return e.json()
          }).then(function(n) {
            return n.message || n.errors ? t((0, i.rslError)({
              provider: "github",
              type: "check_login",
              description: "Failed to fetch user data",
              error: n
            })) : e(n)
          }).catch(function() {
            return t((0, i.rslError)({
              provider: "github",
              type: "check_login",
              description: "Failed to fetch user data due to window.fetch() error",
              error: null
            }))
          })
        })
      },
      p = function() {
        return new Promise(function(e, t) {
          f().then(function(t) {
            return e(t)
          }).catch(function(e) {
            if (!a) return t(e);
            window.open(l, "_self")
          })
        })
      },
      h = function() {
        return new Promise(function(e, t) {
          return t((0, i.rslError)({
            provider: "github",
            type: "logout",
            description: "Cannot logout from github provider",
            error: null
          }))
        })
      },
      m = function() {
        return new Promise(function(e, t) {
          var n = (0, i.getQueryStringValue)("code");
          if (!n) return t(new Error("Authorization code not found"));
          window.fetch(s + "/authenticate/" + n).then(function(e) {
            return e.json()
          }).then(function(n) {
            return n.error || !n.token ? t((0, i.rslError)({
              provider: "github",
              type: "access_token",
              description: "Got error from fetch access token",
              error: n
            })) : e(n.token)
          }).catch(function(e) {
            return t((0, i.rslError)({
              provider: "github",
              type: "access_token",
              description: "Failed to fetch user data due to window.fetch() error",
              error: e
            }))
          })
        })
      },
      g = function(e) {
        var t = e.data.viewer;
        return {
          profile: {
            id: t.id,
            name: t.login,
            firstName: t.name,
            lastName: t.name,
            email: t.email,
            profilePicURL: t.avatarUrl
          },
          token: {
            accessToken: u || c,
            expiresAt: 1 / 0
          }
        }
      };
    t.default = {
      checkLogin: f,
      generateUser: g,
      load: d,
      login: p,
      logout: h
    }
  }, function(e, t, n) {
    function r(e) {
      var t = [];
      return e.replace(/[a-fA-F0-9]{2}/g, function(e) {
        t.push(parseInt(e, 16))
      }), t
    }

    function o(e) {
      e = unescape(encodeURIComponent(e));
      for (var t = new Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
      return t
    }

    function i(e, t, n, i) {
      if ("string" == typeof e && (e = o(e)), "string" == typeof t && (t = r(t)), !Array.isArray(e)) throw TypeError("name must be an array of bytes");
      if (!Array.isArray(t) || 16 != t.length) throw TypeError("namespace must be uuid string or an Array of 16 byte values");
      var u = a(t.concat(e));
      return u[6] = 15 & u[6] | 80, u[8] = 63 & u[8] | 128, n || s(u)
    }
    var a = n(15),
      s = n(16);
    i.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", i.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", e.exports = i
  }, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
      switch (e) {
        case 0:
          return t & n ^ ~t & r;
        case 1:
          return t ^ n ^ r;
        case 2:
          return t & n ^ t & r ^ n & r;
        case 3:
          return t ^ n ^ r
      }
    }

    function o(e, t) {
      return e << t | e >>> 32 - t
    }

    function i(e) {
      var t = [1518500249, 1859775393, 2400959708, 3395469782],
        n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      if ("string" == typeof e) {
        var i = unescape(encodeURIComponent(e));
        e = new Array(i.length);
        for (var a = 0; a < i.length; a++) e[a] = i.charCodeAt(a)
      }
      e.push(128);
      for (var s = e.length / 4 + 2, u = Math.ceil(s / 16), c = new Array(u), a = 0; a < u; a++) {
        c[a] = new Array(16);
        for (var l = 0; l < 16; l++) c[a][l] = e[64 * a + 4 * l] << 24 | e[64 * a + 4 * l + 1] << 16 | e[64 * a + 4 * l + 2] << 8 | e[64 * a + 4 * l + 3]
      }
      c[u - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32), c[u - 1][14] = Math.floor(c[u - 1][14]), c[u - 1][15] = 8 * (e.length - 1) & 4294967295;
      for (var a = 0; a < u; a++) {
        for (var d = new Array(80), f = 0; f < 16; f++) d[f] = c[a][f];
        for (var f = 16; f < 80; f++) d[f] = o(d[f - 3] ^ d[f - 8] ^ d[f - 14] ^ d[f - 16], 1);
        for (var p = n[0], h = n[1], m = n[2], g = n[3], y = n[4], f = 0; f < 80; f++) {
          var v = Math.floor(f / 20),
            w = o(p, 5) + r(v, h, m, g) + y + t[v] + d[f] >>> 0;
          y = g, g = m, m = o(h, 30) >>> 0, h = p, p = w
        }
        n[0] = n[0] + p >>> 0, n[1] = n[1] + h >>> 0, n[2] = n[2] + m >>> 0, n[3] = n[3] + g >>> 0, n[4] = n[4] + y >>> 0
      }
      return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, 255 & n[0], n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, 255 & n[1], n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, 255 & n[2], n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, 255 & n[3], n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, 255 & n[4]]
    }
    e.exports = i
  }, function(e, t) {
    function n(e, t) {
      var n = t || 0,
        o = r;
      return o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]]
    }
    for (var r = [], o = 0; o < 256; ++o) r[o] = (o + 256).toString(16).substr(1);
    e.exports = n
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(0),
      o = function(e) {
        var t = e.appId,
          n = e.scope;
        return new Promise(function(e, o) {
          var i = document.getElementsByTagName("script")[0],
            a = document.createElement("script");
          a.src = "https://apis.google.com/js/platform.js", a.id = "gapi-client", a.onload = function() {
            window.gapi.load("auth2", function() {
              window.gapi.auth2.getAuthInstance() ? e() : window.gapi.auth2.init({
                client_id: t,
                fetchBasicProfile: !0,
                scope: n ? Array.isArray(n) && n.join(" ") || n : null
              }).then(function() {
                return e()
              }, function(e) {
                return o((0, r.rslError)({
                  provider: "google",
                  type: "load",
                  description: "Failed to load SDK",
                  error: e
                }))
              })
            })
          }, i ? i.parentNode.appendChild(a) : document.appendChild(a)
        })
      },
      i = function() {
        return new Promise(function(e, t) {
          var n = window.gapi.auth2.getAuthInstance();
          return n.isSignedIn.get() ? e(n.currentUser.get()) : t((0, r.rslError)({
            provider: "google",
            type: "check_login",
            description: "Not authenticated",
            error: null
          }))
        })
      },
      a = function() {
        return new Promise(function(e, t) {
          window.gapi.auth2.getAuthInstance().signIn().then(function() {
            return i().then(e, t)
          }, function(e) {
            return t((0, r.rslError)({
              provider: "google",
              type: "auth",
              description: "Authentication failed",
              error: e
            }))
          })
        })
      },
      s = function() {
        return new Promise(function(e, t) {
          window.gapi.auth2.getAuthInstance().signOut().then(e, t)
        })
      },
      u = function(e) {
        var t = "",
          n = e.getBasicProfile(),
          r = e.getAuthResponse(!0),
          o = new XMLHttpRequest;
        if (o.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + r.access_token, !1), o.send(null), 200 === o.status) {
          var i = o.responseText;
          t = JSON.parse(i).gender
        }
        return {
          profile: {
            id: n.getId(),
            name: n.getName(),
            firstName: n.getGivenName(),
            lastName: n.getFamilyName(),
            email: n.getEmail(),
            profilePicURL: n.getImageUrl(),
            gender: t
          },
          token: {
            accessToken: r.access_token,
            idToken: r.id_token,
            scope: r.scope,
            expiresIn: r.expires_in,
            firstIssued_at: r.first_issued_at,
            expiresAt: r.expires_at
          }
        }
      },
      c = function(e, t, n, r) {
        var o = document.createElement("script");
        o.src = "https://apis.google.com/js/platform.js", o.id = "gapi-client", o.onload = function() {
          window.gapi.load("auth2", function() {
            window.gapi.auth2.getAuthInstance() || window.gapi.auth2.init({
              client_id: e
            }), window.gapi.auth2.getAuthInstance().attachClickHandler(t, {}, n, r)
          })
        }, 0 === document.getElementsByTagName("script").length ? document.appendChild(o) : document.getElementsByTagName("script")[0].parentNode.appendChild(o)
      };
    t.default = {
      checkLogin: i,
      generateUser: u,
      load: o,
      login: a,
      logout: s,
      oldLoad: c
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(19),
      o = function(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }(r),
      i = n(0),
      a = void 0,
      s = void 0,
      u = function(e) {
        var t = e.appId,
          n = e.redirect,
          r = e.scope;
        return new Promise(function(e, o) {
          var u = (0, i.parseAsURL)(n),
            c = ["basic"];
          if (Array.isArray(r) ? c = c.concat(r) : "string" == typeof r && r && (c = c.concat(r.split(","))), c = c.reduce(function(e, t) {
              return "string" == typeof t && -1 === e.indexOf(t) && e.push(t.trim()), e
            }, []).join("+"), u.search = u.search ? u.search + "&rslCallback=instagram" : "?rslCallback=instagram", a = "https://api.instagram.com/oauth/authorize/?client_id=" + t + "&scope=" + c + "&redirect_uri=" + encodeURIComponent(u.toString()) + "&response_type=token", "instagram" === (0, i.getQueryStringValue)("rslCallback")) {
            if ((0, i.getQueryStringValue)("error")) return o((0, i.rslError)({
              provider: "instagram",
              type: "auth",
              description: "Authentication failed",
              error: {
                error_reason: (0, i.getQueryStringValue)("error_reason"),
                error_description: (0, i.getQueryStringValue)("error_description")
              }
            }));
            s = (0, i.getHashValue)("access_token")
          }
          return e(s)
        })
      },
      c = function() {
        return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? l() : s ? new Promise(function(e, t) {
          (0, o.default)("https://api.instagram.com/v1/users/self/?access_token=" + s).then(function(e) {
            return e.json()
          }).then(function(n) {
            return 200 !== n.meta.code ? t((0, i.rslError)({
              provider: "instagram",
              type: "check_login",
              description: "Failed to fetch user data",
              error: n.meta
            })) : e({
              data: n.data,
              accessToken: s
            })
          }).catch(function(e) {
            return t({
              fetchErr: !0,
              err: (0, i.rslError)({
                provider: "instagram",
                type: "check_login",
                description: "Failed to fetch user data due to fetch error",
                error: e
              })
            })
          })
        }) : Promise.reject((0, i.rslError)({
          provider: "instagram",
          type: "access_token",
          description: "No access token available",
          error: null
        }))
      },
      l = function() {
        return new Promise(function(e, t) {
          c().then(function(t) {
            return e(t)
          }).catch(function(e) {
            if (e.fetchErr) return t(e.err);
            window.open(a, "_self")
          })
        })
      },
      d = function() {
        return new Promise(function(e) {
          return s = void 0, e()
        })
      },
      f = function(e) {
        return {
          profile: {
            id: e.data.id,
            name: e.data.full_name,
            firstName: e.data.full_name,
            lastName: e.data.full_name,
            email: void 0,
            profilePicURL: e.data.profile_picture
          },
          token: {
            accessToken: e.accessToken,
            expiresAt: 1 / 0
          }
        }
      };
    t.default = {
      checkLogin: c,
      generateUser: f,
      load: u,
      login: l,
      logout: d
    }
  }, function(e, t, n) {
    var r, o, i;
    ! function(n, a) {
      o = [t, e], r = a, void 0 !== (i = "function" == typeof r ? r.apply(t, o) : r) && (e.exports = i)
    }(0, function(e, t) {
      "use strict";

      function n() {
        return "jsonp_" + Date.now() + "_" + Math.ceil(1e5 * Math.random())
      }

      function r(e) {
        try {
          delete window[e]
        } catch (t) {
          window[e] = void 0
        }
      }

      function o(e) {
        var t = document.getElementById(e);
        t && document.getElementsByTagName("head")[0].removeChild(t)
      }

      function i(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          i = e,
          s = t.timeout || a.timeout,
          u = t.jsonpCallback || a.jsonpCallback,
          c = void 0;
        return new Promise(function(a, l) {
          var d = t.jsonpCallbackFunction || n(),
            f = u + "_" + d;
          window[d] = function(e) {
            a({
              ok: !0,
              json: function() {
                return Promise.resolve(e)
              }
            }), c && clearTimeout(c), o(f), r(d)
          }, i += -1 === i.indexOf("?") ? "?" : "&";
          var p = document.createElement("script");
          p.setAttribute("src", "" + i + u + "=" + d), t.charset && p.setAttribute("charset", t.charset), p.id = f, document.getElementsByTagName("head")[0].appendChild(p), c = setTimeout(function() {
            l(new Error("JSONP request to " + e + " timed out")), r(d), o(f), window[d] = function() {
              r(d)
            }
          }, s), p.onerror = function() {
            l(new Error("JSONP request to " + e + " failed")), r(d), o(f), c && clearTimeout(c)
          }
        })
      }
      var a = {
        timeout: 5e3,
        jsonpCallback: "callback",
        jsonpCallbackFunction: null
      };
      t.exports = i
    })
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = n(0),
      o = function(e) {
        var t = e.appId;
        return new Promise(function(e) {
          if (document.getElementById("linkedin-client")) return e();
          var n = document.getElementsByTagName("script")[0],
            r = document.createElement("script");
          r.src = "//platform.linkedin.com/in.js?async=true", r.id = "linkedin-client", r.onload = function() {
            return window.IN.init({
              api_key: t
            }), e()
          }, n ? n.parentNode.appendChild(r) : document.appendChild(r)
        })
      },
      i = function() {
        return new Promise(function(e, t) {
          return window.IN.User.isAuthorized() ? u().then(e, t) : t((0, r.rslError)({
            provider: "linkedin",
            type: "check_login",
            description: "Not authenticated",
            error: null
          }))
        })
      },
      a = function() {
        return new Promise(function(e, t) {
          window.IN.User.authorize(function() {
            return i().then(u).then(e).catch(t)
          })
        })
      },
      s = function() {
        return new Promise(function(e) {
          window.IN.User.logout(e)
        })
      },
      u = function() {
        return new Promise(function(e, t) {
          window.IN.API.Profile("me").fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl", "emailAddress"]).result(e).error(function(e) {
            return t((0, r.rslError)({
              provider: "linkedin",
              type: "get_profile",
              description: "Failed to get user profile",
              error: e
            }))
          })
        })
      },
      c = function(e) {
        return {
          profile: {
            id: window.IN.ENV.auth.member_id,
            name: e.values[0].firstName + " " + e.values[0].lastName,
            firstName: e.values[0].firstName,
            lastName: e.values[0].lastName,
            email: e.values[0].emailAddress,
            publicProfileURL: e.values[0].publicProfileUrl,
            profilePicURL: e.values[0].pictureUrl
          },
          token: {
            accessToken: window.IN.ENV.auth.oauth_token,
            expiresAt: (0, r.timestampFromNow)(window.IN.ENV.auth.oauth_expires_in)
          }
        }
      },
      l = function(e) {
        var t = "li-client",
          n = document.getElementsByTagName("script")[0],
          r = void 0;
        document.getElementById(t) || (r = document.createElement("script"), r.id = t, r.src = "//platform.linkedin.com/in.js?async=true", r.onload = function() {
          window.IN.init({
            api_key: e,
            authorize: !0
          })
        }, n.parentNode.insertBefore(r, n))
      };
    t.default = {
      checkLogin: i,
      generateUser: c,
      load: o,
      login: a,
      logout: s,
      oldLoad: l
    }
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var r = {
      providers: ["amazon", "facebook", "github", "google", "instagram", "linkedin"]
    };
    t.default = r
  }, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function(e) {
      var t = !1;
      return {
        promise: new Promise(function(n, r) {
          e.then(function(e) {
            return t ? r(new Error({
              isCanceled: !0
            })) : n(e)
          }), e.catch(function(e) {
            return r(t ? new Error({
              isCanceled: !0
            }) : e)
          })
        }),
        cancel: function() {
          t = !0
        }
      }
    }
  }])
});
