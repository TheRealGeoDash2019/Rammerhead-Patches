var r = function(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}, i = function(e, n, r) {
  const t = (function(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
  });

  return (n && t(e.prototype, n), r && t(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e);
}, o = function(e, t) {
  return (e % t + t) % t
}, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-", u = "_rhs", l = function() {
  for (var e = "", t = a.split(""); t.length > 0;) e += t.splice(Math.floor(Math.random() * t.length), 1)[0];
  return e
}, s = function() {
  "use strict";

  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l();
    r(this, e), this.dictionary = t
  }
  return i(e, [{
    key: "shuffle",
    value: function(e) {
      if (e.startsWith(u)) return e;
      for (var t = "", n = 0; n < e.length; n++) {
        var r = e.charAt(n),
          i = a.indexOf(r);
        "%" === r && e.length - n >= 3 ? (t += r, t += e.charAt(++n), t += e.charAt(++n)) : t += -1 === i ? r : this.dictionary.charAt(o(i + n, a.length))
      }
      return u + t
    }
  }, {
    key: "unshuffle",
    value: function(e) {
      if (!e.startsWith(u)) return e;
      e = e.slice(u.length);
      for (var t = "", n = 0; n < e.length; n++) {
        var r = e.charAt(n),
          i = this.dictionary.indexOf(r);
        "%" === r && e.length - n >= 3 ? (t += r, t += e.charAt(++n), t += e.charAt(++n)) : t += -1 === i ? r : a.charAt(o(i - n, a.length))
      }
      return t
    }
  }]), e
}();
s.baseDictionary = a, s.shuffledIndicator = u, s.generateDictionary = l;

module.exports = s;