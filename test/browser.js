import { _extend as extend } from 'util';
import Path from 'path';

const defaults = {
  globalize: true,
  console: true,
  useEach: false,
  skipWindowCheck: false,
  html: `
    <!doctype html>
    <html>
      <head>
        <meta charset='utf-8'>
      </head>
    <body>
      <h1>Awesome</h1>
      <iframe src='https://github.com/Trip-Trax'></iframe>
      <ul>
        <li>Trip-Trax</li>
        <li>is software</li>
        <li>development</li>
        <li>company!</li>
      </ul>
    </body>
  </html>
  `
};

const blacklist = Object.keys(global);
blacklist.push('constructor');

module.exports = function (_options) {
  var options = extend(extend({}, defaults), _options)
  var keys = []
  var before = options.useEach ? global.beforeEach : global.before
  var after = options.useEach ? global.afterEach : global.after

  before(function (next) {
    if (global.window && !options.skipWindowCheck) {
      throw new Error(`mocha-jsdom: already a browser environment, or mocha-jsdom invoked
                       twice. use 'skipWindowCheck' to disable this check.`);
    }

    require('node-jsdom').env(
      extend(extend({}, options), { done: done })
    );

    function done (errors, window) {
      if (options.globalize) {
        propagateToGlobal(window);
      } else {
        global.window = window;
      }

      if (options.console) {
        window.console = global.console;
      }

      if (errors) {
        return next(getError(errors));
      }

      next(null);
    }
  });

  after(function () {
    if (options.globalize) {
      keys.forEach((key) => {
        delete global[key];
      });
    }

    delete global.window;
  });

  function propagateToGlobal (window) {
    for (var key in window) {
      if (!window.hasOwnProperty(key)) continue;
      if (~blacklist.indexOf(key)) continue;

      if (key in global) {
        if (process.env.JSDOM_VERBOSE) {
          console.warn(`[jsdom] Warning: skipping cleanup of global['${key}']`);
        }

        continue;
      }

      keys.push(key);
      global[key] = window[key];
    }
  }

  function getError (errors) {
    const { data } = errors[0];
    let { error: err } = data;

    err.message = `${err.message} [jsdom]`;

    if (err.stack) {
      err.stack = err.stack.split('\n')
        .reduce(function (list, line) {
          if (line.match(/node_modules.+(jsdom|mocha)/)) {
            return list;
          }

          line = line
            .replace(/file:\/\/.*<script>/g, '<script>')
            .replace(/:undefined:undefined/g, '');

          list.push(line);
          return list;
        }, []).join('\n');
    }

    return err;
  }
}
