'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var address = require('@ethersproject/address');
var compact = _interopDefault(require('lodash/compact'));
var filter = _interopDefault(require('lodash/filter'));
var find = _interopDefault(require('lodash/find'));
var keyBy = _interopDefault(require('lodash/keyBy'));
var matchesProperty = _interopDefault(require('lodash/matchesProperty'));
var merge = _interopDefault(require('lodash/merge'));
var pick = _interopDefault(require('lodash/pick'));
var some = _interopDefault(require('lodash/some'));
var uniq = _interopDefault(require('lodash/uniq'));
var path = require('path');
var os = require('os');
var z = require('zod');
var fs = require('fs');
var partition = _interopDefault(require('lodash/partition'));
var degit = _interopDefault(require('degit'));
var isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var isString = _interopDefault(require('lodash/isString'));
var mapValues = _interopDefault(require('lodash/mapValues'));
var mkdirp = _interopDefault(require('mkdirp'));
var mapKeys = _interopDefault(require('lodash/mapKeys'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var getSVGColors = _interopDefault(require('get-svg-colors'));
var unionBy = _interopDefault(require('lodash/unionBy'));
var fetch = _interopDefault(require('node-fetch'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var CONTRACT_MAP_REPO = 'metamask/contract-metadata';
var CONTRACT_MAP_OUTPUT_PATH = /*#__PURE__*/path.resolve( /*#__PURE__*/os.tmpdir(), 'contract-metadata');
var ETHEREUM_LISTS_REPO = 'ethereum-lists/tokens/tokens/eth';
var ETHEREUM_LISTS_OUTPUT_PATH = /*#__PURE__*/path.resolve( /*#__PURE__*/os.tmpdir(), 'ethereum-lists/tokens');
/**
 * @todo add semver or hash of the fetched JSON object
 */

var TokenListItemSchema = /*#__PURE__*/z.string().url().nonempty();
var TokenListTypeSchema = /*#__PURE__*/z.record(TokenListItemSchema);
/**
 *  @constant {TokenList} TOKEN_LISTS
 *  @description defines external token lists to aggregate
 *  @note there is no versioning in these semantics
 */

var TOKEN_LISTS = {
  coingecko: 'https://tokens.coingecko.com/uniswap/all.json'
};
var TokenListEnumSchema = /*#__PURE__*/z.enum(['coingecko']);
/**
 * @exports SSocialSchema
 * @description social media profile links
 */

var SocialSchema = /*#__PURE__*/z.object({
  blog: /*#__PURE__*/z.string().optional(),
  chat: /*#__PURE__*/z.string().optional(),
  discord: /*#__PURE__*/z.string().optional(),
  facebook: /*#__PURE__*/z.string().optional(),
  forum: /*#__PURE__*/z.string().optional(),
  github: /*#__PURE__*/z.string().optional(),
  gitter: /*#__PURE__*/z.string().optional(),
  instagram: /*#__PURE__*/z.string().optional(),
  linkedin: /*#__PURE__*/z.string().optional(),
  medium: /*#__PURE__*/z.string().optional(),
  reddit: /*#__PURE__*/z.string().optional(),
  slack: /*#__PURE__*/z.string().optional(),
  telegram: /*#__PURE__*/z.string().optional(),
  twitter: /*#__PURE__*/z.string().optional(),
  youtube: /*#__PURE__*/z.string().optional()
});
var TokenDeprecationSchema = /*#__PURE__*/z.object({
  new_address: /*#__PURE__*/z.string().optional()
});
var TokenExtensionsSchema = /*#__PURE__*/z.object({
  color: /*#__PURE__*/z.string().optional(),
  isChefCurated: /*#__PURE__*/z.boolean().optional(),
  isVerified: /*#__PURE__*/z.boolean().optional(),
  shadowColor: /*#__PURE__*/z.string().optional()
});
/**
 * @exports TokenSchema
 *  @summary token schema that is used to parse the JSON files.
 */

var TokenSchema = /*#__PURE__*/z.object({
  address: /*#__PURE__*/z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  chainId: /*#__PURE__*/z.number().optional(),
  decimals: /*#__PURE__*/z.number().min(0),
  deprecation: /*#__PURE__*/TokenDeprecationSchema.optional(),
  extensions: /*#__PURE__*/TokenExtensionsSchema.optional(),
  name: /*#__PURE__*/z.string(),
  social: /*#__PURE__*/SocialSchema.optional(),
  symbol: /*#__PURE__*/z.string(),
  website: /*#__PURE__*/z.string().optional()
});
/**
 * @exports RawContractMapTokenSchema
 * @summary token data that is loaded from the JSON files.
 */

var RawContractMapTokenSchema = /*#__PURE__*/z.object({
  address: /*#__PURE__*/z.string(),
  decimals: /*#__PURE__*/z.union([/*#__PURE__*/z.string(), /*#__PURE__*/z.number()]),
  name: /*#__PURE__*/z.string(),
  symbol: /*#__PURE__*/z.string()
});
/**
 *  @exports RawEthereumListsTokenSchema
 *  @summary token data that is loaded from the JSON files.
 *  These are generally Optional fields
 */

var RawEthereumListsTokenSchema = /*#__PURE__*/z.object({
  address: /*#__PURE__*/z.string().optional(),
  decimals: /*#__PURE__*/z.union([z.string(), z.number()]).optional(),
  deprecation: /*#__PURE__*/TokenDeprecationSchema.optional(),
  name: /*#__PURE__*/z.string().optional(),
  social: /*#__PURE__*/SocialSchema.optional(),
  symbol: /*#__PURE__*/z.string().optional(),
  website: /*#__PURE__*/z.string().optional()
});

var constants = {
  __proto__: null,
  CONTRACT_MAP_REPO: CONTRACT_MAP_REPO,
  CONTRACT_MAP_OUTPUT_PATH: CONTRACT_MAP_OUTPUT_PATH,
  ETHEREUM_LISTS_REPO: ETHEREUM_LISTS_REPO,
  ETHEREUM_LISTS_OUTPUT_PATH: ETHEREUM_LISTS_OUTPUT_PATH,
  TokenListItemSchema: TokenListItemSchema,
  TokenListTypeSchema: TokenListTypeSchema,
  TOKEN_LISTS: TOKEN_LISTS,
  TokenListEnumSchema: TokenListEnumSchema,
  SocialSchema: SocialSchema,
  TokenDeprecationSchema: TokenDeprecationSchema,
  TokenExtensionsSchema: TokenExtensionsSchema,
  TokenSchema: TokenSchema,
  RawContractMapTokenSchema: RawContractMapTokenSchema,
  RawEthereumListsTokenSchema: RawEthereumListsTokenSchema
};

/**
 * Fetch a Git repository and return the file system path of the folder containing the repository.
 *
 * @return {Promise<void>}
 */

var fetchRepository = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(repoUrl, outputPath) {
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var emitter = degit(repoUrl, {
                // caching can cause problems and should stay disabled.
                cache: false,
                // forcibly overwrite any existing files in the directory
                force: true
              });
              return emitter.clone(outputPath).then(resolve)["catch"](function (error) {
                reject();
                throw new Error("Failed to fetch repo " + repoUrl + ": " + (error.message || error));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchRepository(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Reads and parses a JSON file. Throws an error if the file could not be read or if the JSON is invalid.
 *
 * @param {string} file
 * @return {Promise<T>}
 * @template T
 */

var parseJsonFile = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(file) {
    var json;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fs.promises.readFile(file, 'utf8');

          case 3:
            json = _context.sent;
            return _context.abrupt("return", JSON.parse(json));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error("Failed to parse file " + file + ": " + _context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function parseJsonFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Validate raw token data, by checking if the required values are set and if the decimals are larger than or equal to
 * zero. This will strip any unknown fields and rename the 'decimals' field to 'decimal' for compatibility.
 *
 * @param {RawEthereumListsToken} token
 * @return {boolean}
 */

var validateTokenData = function validateTokenData(token) {
  var normalizedTokenData = _extends({}, pick(token, Object.keys(RawEthereumListsTokenSchema.shape)), {
    deprecation: pick(token.deprecation, Object.keys(TokenDeprecationSchema.shape)),
    social: pick(token.social, Object.keys(SocialSchema.shape))
  });

  var validToken = TokenSchema.parse(normalizedTokenData);
  var validSocial = SocialSchema.parse(normalizedTokenData.social);
  return _extends({}, validToken, {
    social: validSocial
  });
};
/**
 * Sort erc-tokens alphabetically by symbol.
 *
 * @param {Token[]} tokens
 * @return {Token[]}
 */

var sortTokens = function sortTokens(tokens) {
  return tokens.sort(function (a, b) {
    return a.symbol.localeCompare(b.symbol);
  });
};
/**
 * Creates the output folder if it does not exist yet.
 *
 * @param {string} path
 * @return {Promise<void>}
 */

var createOutputFolder = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(path) {
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fs.promises.access(path);

          case 3:
            _context2.next = 10;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);

            if (!(_context2.t0.code !== 'ENOENT')) {
              _context2.next = 9;
              break;
            }

            throw new Error("Failed to create output folder: " + _context2.t0.message);

          case 9:
            mkdirp.sync(path);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function createOutputFolder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function mapValuesDeep(v, callback) {
  return isPlainObject(v) ? mapValues(v, function (v) {
    return mapValuesDeep(v, callback);
  }) : callback(v);
}
/**
 * Recursively loop through an token's values and `trim()` any values which are strings.
 *
 * @param {Token} token
 * @return {Token}
 */


var deeplyTrimAllTokenStrings = function deeplyTrimAllTokenStrings(token) {
  return mapValuesDeep(token, function (v) {
    return isString(v) ? v.trim() : v;
  });
};
/**
 * Write the  ERC List JSON file to disk.
 *
 * @param {Token[]} tokens
 * @param {string} path
 * @param {string} name
 * @return {Promise<void>}
 */

var writeToDisk = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(tokens, path$1, name) {
    var json;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return createOutputFolder(path$1);

          case 2:
            json = JSON.stringify(tokens, null, 2);
            return _context3.abrupt("return", fs.promises.writeFile(path.resolve(path$1, name), json, 'utf8'));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function writeToDisk(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Partition tokens array into two categories: unique vs duplicates, according to their token symbol
 * @param {Token[]} tokens
 * @return {Token[][]}
 */

var partitionByUniqueness = function partitionByUniqueness(tokens) {
  var _partition = partition(tokens, function (token) {
    var dups = filter(tokens, ['symbol', token.symbol]);
    return dups.length === 1;
  }),
      uniqueTokens = _partition[0],
      duplicateTokens = _partition[1];

  return [uniqueTokens, duplicateTokens];
};
/**
 * Finds deprecated tokens and replaces them with the data
 * for the latest version of the token
 *
 * @param {Token[]} tokens
 *
 * @return {Token[]}
 */

function resolveDeprecations(tokens) {
  return tokens.map(function (_ref) {
    var deprecation = _ref.deprecation,
        token = _objectWithoutPropertiesLoose(_ref, ["deprecation"]);

    return !(deprecation != null && deprecation.new_address) ? token : tokens.find(matchesProperty('address', deprecation.new_address)) || token;
  });
}
/**
 * Load the token JSON files from directory, and then validate them
 * against our token schema
 *
 * @return {Token[]}
 */

function parseEthereumListsTokenFiles() {
  return _parseEthereumListsTokenFiles.apply(this, arguments);
}
/**
 * Fetch the latest commit from `ethereum-lists/tokens` repo and parse
 * the saved JSON files
 *
 * @return {Token[][]}
 */

function _parseEthereumListsTokenFiles() {
  _parseEthereumListsTokenFiles = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
    var files;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fs.promises.readdir(ETHEREUM_LISTS_OUTPUT_PATH);

          case 2:
            files = _context2.sent;
            return _context2.abrupt("return", files.reduce( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(tokens, file) {
                var jsonFile, tokenData, token;
                return runtime_1.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        jsonFile = path.resolve(ETHEREUM_LISTS_OUTPUT_PATH, file);
                        _context.next = 3;
                        return parseJsonFile(jsonFile);

                      case 3:
                        tokenData = _context.sent;
                        token = validateTokenData(tokenData);
                        _context.t0 = Promise;
                        _context.t1 = [];
                        _context.next = 9;
                        return tokens;

                      case 9:
                        _context.t2 = _context.sent;
                        _context.t3 = [token];
                        _context.t4 = _context.t1.concat.call(_context.t1, _context.t2, _context.t3);
                        return _context.abrupt("return", _context.t0.resolve.call(_context.t0, _context.t4));

                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }(), Promise.resolve([])));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parseEthereumListsTokenFiles.apply(this, arguments);
}

function parseEthereumLists() {
  return _parseEthereumLists.apply(this, arguments);
}

function _parseEthereumLists() {
  _parseEthereumLists = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchRepository(ETHEREUM_LISTS_REPO, ETHEREUM_LISTS_OUTPUT_PATH);

          case 2:
            return _context3.abrupt("return", parseEthereumListsTokenFiles().then(resolveDeprecations).then(partitionByUniqueness));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _parseEthereumLists.apply(this, arguments);
}

function parseOverrideFile() {
  return _parseOverrideFile.apply(this, arguments);
}

function _parseOverrideFile() {
  _parseOverrideFile = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var jsonFile;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // load svg manifest JSON file from directory
            jsonFile = path.resolve(process.cwd(), 'chef.json');
            return _context.abrupt("return", parseJsonFile(jsonFile).then(function (override) {
              return mapKeys(override, function () {
                if ((arguments.length <= 1 ? undefined : arguments[1]) === 'ETH') return arguments.length <= 1 ? undefined : arguments[1];
                return address.getAddress(arguments.length <= 1 ? undefined : arguments[1]);
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseOverrideFile.apply(this, arguments);
}

function parseContractMap() {
  return _parseContractMap.apply(this, arguments);
}

function _parseContractMap() {
  _parseContractMap = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var jsonFile, contractMap;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchRepository(CONTRACT_MAP_REPO, CONTRACT_MAP_OUTPUT_PATH);

          case 2:
            // load contract map JSON file from directory
            jsonFile = path.resolve(CONTRACT_MAP_OUTPUT_PATH, 'contract-map.json');
            _context.next = 5;
            return parseJsonFile(jsonFile);

          case 5:
            contractMap = _context.sent;
            return _context.abrupt("return", Object.keys(contractMap).map(function (address) {
              return _extends({}, contractMap[address], {
                address: address
              });
            }) // remove any unknown/undesirable keys from each token object.
            .map(function (token) {
              return pick(token, Object.keys(RawContractMapTokenSchema.shape));
            }) // remove any tokens from the array if they contain null values for the
            // keys that we care about.
            .filter(function (token) {
              return Object.values(token).some(isEmpty);
            }).map(validateTokenData));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseContractMap.apply(this, arguments);
}

var SVG_ORIGINALS_REPO = 'spothq/cryptocurrency-icons';
var SVG_ORIGINALS_OUTPUT_PATH = /*#__PURE__*/path.resolve( /*#__PURE__*/os.tmpdir(), SVG_ORIGINALS_REPO);
var SVG_OVERRIDES_REPO = 'mikedemarais/react-coin-icon/assets/overrides';
var SVG_OVERRIDES_OUTPUT_PATH = /*#__PURE__*/path.resolve( /*#__PURE__*/os.tmpdir(), SVG_OVERRIDES_REPO);

function parseOriginalSVGIcons() {
  return _parseOriginalSVGIcons.apply(this, arguments);
}

function _parseOriginalSVGIcons() {
  _parseOriginalSVGIcons = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var jsonFile;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchRepository(SVG_ORIGINALS_REPO, SVG_ORIGINALS_OUTPUT_PATH);

          case 2:
            // load svg manifest JSON file from directory
            jsonFile = path.resolve(SVG_ORIGINALS_OUTPUT_PATH, 'manifest.json');
            return _context.abrupt("return", parseJsonFile(jsonFile));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseOriginalSVGIcons.apply(this, arguments);
}

function parseOverrideSVGIcons() {
  return _parseOverrideSVGIcons.apply(this, arguments);
}

function _parseOverrideSVGIcons() {
  _parseOverrideSVGIcons = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
    var files;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchRepository(SVG_OVERRIDES_REPO, SVG_OVERRIDES_OUTPUT_PATH);

          case 2:
            _context3.next = 4;
            return fs.promises.readdir(SVG_OVERRIDES_OUTPUT_PATH);

          case 4:
            files = _context3.sent;
            return _context3.abrupt("return", files.reduce( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(svgTokens, file) {
                var svgPath, svg, fillColor, svgToken;
                return runtime_1.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        svgPath = path.resolve(SVG_OVERRIDES_OUTPUT_PATH, file);
                        _context2.next = 3;
                        return fs.promises.readFile(svgPath, 'utf8');

                      case 3:
                        svg = _context2.sent;
                        // Attempt to get SVG's "color" by reading it's first "fill"
                        // value (which is usually the icon's background).
                        fillColor = getSVGColors(svg).fills[0];
                        svgToken = undefined;

                        if (fillColor) {
                          svgToken = {
                            symbol: file.split('.')[0].toUpperCase()
                          };
                        } else {
                          console.error("Unable to adjust Chef's derived colorsfrom the: `" + file + "`");
                        }

                        _context2.t0 = Promise;
                        _context2.t1 = compact;
                        _context2.t2 = [];
                        _context2.next = 12;
                        return svgTokens;

                      case 12:
                        _context2.t3 = _context2.sent;
                        _context2.t4 = [svgToken];
                        _context2.t5 = _context2.t2.concat.call(_context2.t2, _context2.t3, _context2.t4);
                        _context2.t6 = (0, _context2.t1)(_context2.t5);
                        return _context2.abrupt("return", _context2.t0.resolve.call(_context2.t0, _context2.t6));

                      case 17:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }(), Promise.resolve([])));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _parseOverrideSVGIcons.apply(this, arguments);
}

function parseSVGIconTokenFiles() {
  return _parseSVGIconTokenFiles.apply(this, arguments);
}

function _parseSVGIconTokenFiles() {
  _parseSVGIconTokenFiles = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
    var originals, overrides;
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return parseOriginalSVGIcons();

          case 2:
            originals = _context4.sent;
            _context4.next = 5;
            return parseOverrideSVGIcons();

          case 5:
            overrides = _context4.sent;
            return _context4.abrupt("return", unionBy(originals, overrides, 'symbol'));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _parseSVGIconTokenFiles.apply(this, arguments);
}

function reduceArrayToObject(array) {
  return array.reduce(function (item, culm) {
    return Object.assign(culm, item);
  }, {});
}

/**

TODO

const omitTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => !tags.includes(tag));

const pickTokenWithTag = (tokens: any[], tag: string) =>
  tokens.filter(({ tags = [] }: TokenListStoreType) => tags.includes(tag));

  */
// const { aave, sushibar } = TokenListEnumSchema.enum;

function parseTokenLists() {
  return _parseTokenLists.apply(this, arguments);
}

function _parseTokenLists() {
  _parseTokenLists = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
    var listsArray;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all(TokenListEnumSchema.options.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(list) {
                return runtime_1.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(resolve, reject) {
                            return runtime_1.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    return _context.abrupt("return", // fetch the TokenList from remote uri
                                    fetch(TOKEN_LISTS[list]).then(function (res) {
                                      return res.json();
                                    }).then(function (_ref3) {
                                      var _resolve;

                                      var tags = _ref3.tags,
                                          tokens = _ref3.tokens;
                                      return resolve((_resolve = {}, _resolve[list] = {
                                        tags: tags,
                                        tokens: tokens
                                      }, _resolve));
                                    })["catch"](reject));

                                  case 1:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x2, _x3) {
                            return _ref2.apply(this, arguments);
                          };
                        }()));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 2:
            listsArray = _context3.sent;
            return _context3.abrupt("return", reduceArrayToObject(listsArray.map(function (list) {
              //     const listName = Object.keys(list)[0];
              var newList = _extends({}, list);
              /**
               
              TODO
              
                    if (listName === sushibar) {
                      newList[sushibar].tokens = omitTokenWithTag(newList[sushibar].tokens, 'bases');
                    }
              
                    if (listName === onsen) {
                      newList[onsen].tokens = [
                        ...pickTokenWithTag(newList[onsen].tokens, '*'),
                        ...pickTokenWithTag(newList[onsen].tokens, '*'),
                      ];
                    }
                    
              */


              return newList;
            })));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _parseTokenLists.apply(this, arguments);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
console.log(' 🍣 rolling up the token list ');

function normalizeList(list) {
  return keyBy(list, function (_ref) {
    var address$1 = _ref.address;
    return address.getAddress(address$1);
  });
} // Entry point


_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
  var contractMapTokens, _yield$parseEthereumL, uniqueEthereumListTokens, duplicateEthereumListTokens, sushiswapOverrides, svgIcons, tokenListTokens, coingecko, preferredTokenLists, sources, defaultSources, allKnownTokenAddresses, resolveTokenInfo, buildTokenList, tokens;

  return runtime_1.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          buildTokenList = function _buildTokenList() {
            return allKnownTokenAddresses.map(function (tokenAddress) {
              var token = resolveTokenInfo(tokenAddress);
              var overrideToken = sushiswapOverrides[tokenAddress];
              var _token$chainId = token.chainId,
                  chainId = _token$chainId === void 0 ? 1 : _token$chainId,
                  color = token.color,
                  decimals = token.decimals,
                  name = token.name,
                  shadowColor = token.shadowColor,
                  symbol = token.symbol;
              var isSushiBar = sources.preferred.map(Object.keys).flat().includes(tokenAddress);

              if (isSushiBar) {
                var logoData = svgIcons.find(function (item) {
                  return item.symbol === symbol;
                });
                color = logoData == null ? void 0 : logoData.color;
              }
              /**
               * @extends TokenExtensionsType
               */


              var extensions = {
                color: (overrideToken == null ? void 0 : overrideToken.color) || color,
                isChefCurated: overrideToken != null && overrideToken.isCurated ? true : undefined,
                isVerified: isSushiBar || overrideToken != null && overrideToken.isCurated ? true : undefined,
                shadowColor: (overrideToken == null ? void 0 : overrideToken.shadowColor) || shadowColor
              };
              return deeplyTrimAllTokenStrings(_extends({
                address: tokenAddress,
                chainId: chainId,
                decimals: decimals,
                name: (overrideToken == null ? void 0 : overrideToken.name) || name,
                symbol: (overrideToken == null ? void 0 : overrideToken.symbol) || symbol
              }, compact(Object.values(extensions)).length ? {
                extensions: extensions
              } : undefined));
            });
          };

          resolveTokenInfo = function _resolveTokenInfo(tokenAddress) {
            function matchToken(_ref4) {
              var address$1 = _ref4.address;
              return address.getAddress(address$1) === address.getAddress(tokenAddress);
            }

            var lists = pick(tokenListTokens, Object.keys(tokenListTokens).filter(function (list) {
              return some(tokenListTokens[list].tokens, matchToken);
            }));

            if (Object.keys(lists).length === 1) {
              return find(lists[Object.keys(lists)[0]].tokens, matchToken);
            } else if (Object.keys(lists).length > 1) {
              var listNames = Object.keys(lists);

              if (listNames.includes(TokenListEnumSchema["enum"].coingecko)) {
                return find(lists.coingecko.tokens, matchToken);
              }
            }

            return defaultSources[tokenAddress];
          };

          _context.next = 4;
          return parseContractMap();

        case 4:
          contractMapTokens = _context.sent;
          _context.next = 7;
          return parseEthereumLists();

        case 7:
          _yield$parseEthereumL = _context.sent;
          uniqueEthereumListTokens = _yield$parseEthereumL[0];
          duplicateEthereumListTokens = _yield$parseEthereumL[1];
          _context.next = 12;
          return parseOverrideFile();

        case 12:
          sushiswapOverrides = _context.sent;
          _context.next = 15;
          return parseSVGIconTokenFiles();

        case 15:
          svgIcons = _context.sent;
          _context.next = 18;
          return parseTokenLists();

        case 18:
          tokenListTokens = _context.sent;
          coingecko = tokenListTokens.coingecko, preferredTokenLists = _objectWithoutPropertiesLoose(tokenListTokens, ["coingecko"]);
          sources = {
            "default": [duplicateEthereumListTokens, uniqueEthereumListTokens, contractMapTokens, coingecko.tokens.flat()].map(normalizeList),
            preferred: [Object.values(preferredTokenLists).map(function (_ref3) {
              var tokens = _ref3.tokens;
              return tokens;
            }).flat()].map(normalizeList)
          };
          defaultSources = merge.apply(void 0, [{}].concat(sources["default"]));
          allKnownTokenAddresses = uniq(compact([].concat(sources["default"].map(Object.keys).flat(), sources.preferred.map(Object.keys).flat())).map(address.getAddress));
          _context.next = 25;
          return sortTokens(buildTokenList());

        case 25:
          tokens = _context.sent;
          _context.next = 28;
          return writeToDisk({
            name: 'SushiSwap Menu List',
            timestamp: new Date().toISOString(),
            logoURI: 'https://avatars.githubusercontent.com/u/72222929?s=200&v=4',
            version: {
              major: 1,
              minor: 2,
              patch: 1
            },
            keywords: ['sushiswap'],
            tokens: tokens
          }, path.resolve(process.cwd(), './output'), 'sushiswap-token-list.json');

        case 28:
          console.log('# of "isCuratedActive" tokens: ', filter(tokens, matchesProperty('extensions.isCuratedActive', true)).length);
          console.log('# of "isSushiBar" tokens: ', filter(tokens, matchesProperty('extensions.isSushiBar', true)).length);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

exports.Types = constants;
//# sourceMappingURL=sushiswap-token-list.cjs.development.js.map
