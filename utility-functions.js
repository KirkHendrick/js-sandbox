exports.util = (function () {

    'use strict';

    return {

        partial: function (fn, ...args) {
            return function partiallyApplied(...laterArgs) {
                return fn(...args, ...laterArgs);
            };
        },

        reverseArgs: function (fn) {
            return function argsReversed(...args) {
                return fn(...args.reverse());
            };
        },

        partialRight: function (fn, ...args) {
            return function partiallyRightApplied(...laterArgs) {
                return fn(...laterArgs, ...args.reverse());
            };
        },

        curry: function (fn, arity = fn.length) {
            return (function nextCurried(prevArgs) {
                return function curried(nextArg) {
                    const args = prevArgs.concat([nextArg]);

                    if(args.length >= arity) {
                        return fn(...args);
                    }
                    else {
                        return nextCurried(args);
                    }
                };
            })([]);
        },

        looseCurry: function (fn, arity = fn.length) {
            return (function nextCurried(prevArgs) {
                return function curried(...nextArgs) {
                    const args = prevArgs.concat(nextArgs);

                    if(args.length >= arity) {
                        return fn(...args);
                    }
                    else {
                        return nextCurried(args);
                    }
                };
            })([]);
        },

        uncurry: function (fn) {
            return function uncurried(...args) {
                let returnFn = fn;

                args.forEach(function (arg) {
                    returnFn = returnFn(arg);
                });

                return returnFn;
            };
        },

        unary: function (fn) {
            return function onlyOneArg(arg) {
                return fn(arg);
            }
        },

        identity: function (v) {
            return v;
        },

        constant: function (v) {
            return function () {
                return v;
            }
        },

        not: function (predicate) {
            return function negated(...args) {
                return !predicate(...args);
            }
        }
    };

})();
