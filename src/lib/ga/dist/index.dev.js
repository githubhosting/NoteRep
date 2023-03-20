"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = exports.pageview = void 0;

// log the pageview with their URL
var pageview = function pageview(url) {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url
  });
}; // log specific events happening.


exports.pageview = pageview;

var event = function event(_ref) {
  var action = _ref.action,
      params = _ref.params;
  window.gtag('event', action, params);
};

exports.event = event;