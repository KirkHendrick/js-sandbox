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
        }

    };


})();
