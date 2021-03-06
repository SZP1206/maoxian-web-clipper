;(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CJS
    module.exports = factory(require('../env.js'));
  } else {
    // browser or other
    root.MxWcLog = factory(root.MxWcENV);
  }
})(this, function(ENV, undefined) {
  "use strict";

  const exports = {};

  let logLevel = 'debug';
  try {
    logLevel = (window && window.location && window.location.search.indexOf('debug') > 0 && 'debug') || (ENV && ENV.logLevel || 'debug');
  } catch(e) {
    logLevel = 'debug';
  }

  const levels = ["debug", "info", "warn", "error"];
  if (!levels.includes(logLevel)) {
    console.warn("Invalid logLevel:", logLevel);
  }
  const shouldLog = {};

  {
    let startLogging = false;
    for (const level of levels) {
      if (logLevel === level) {
        startLogging = true;
      }
      if (startLogging) {
        shouldLog[level] = true;
      }
    }
  }

  function stub() {}
  exports.debug = exports.info = exports.warn = exports.error = stub;

  if (shouldLog.debug) { exports.debug = console.debug; }
  if (shouldLog.info) { exports.info = console.info; }
  if (shouldLog.warn) { exports.warn = console.warn; }
  if (shouldLog.error) { exports.error = console.error; }

  return exports;
});
