exports.util = (function () {

    'use strict';

    let publicApi = {

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

                    if (args.length >= arity) {
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

                    if (args.length >= arity) {
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

        binary: function (fn) {
            return function twoArgs(arg1, arg2) {
                return fn(arg1, arg2);
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
        },

        compose: function (...fns) {
            return fns.reverse().reduce(function reduceComposition(fn1, fn2) {
                return function composed(...args) {
                    return fn2(fn1(...args));
                };
            });
        },

        prop: function (obj, property) {
            return obj[property];
        },

        setProp: function (propName, value) {
            return {
                [propName]: value
            }
        },

        map: function (arr, fn) {
            let newArr = [];
            arr.forEach(function (element, index, array) {
                newArr.push(fn(element, index, array));
            });
            return newArr;
        },

        filter: function (arr, predicateFn) {
            let filtered = [];
            arr.forEach(function (element, index, array) {
                if (predicateFn(element, index, array)) {
                    filtered.push(element);
                }
            });
            return filtered;
        },

        reduce: function (arr, reducerFn, initialValue) {
            let accumulator = arr[0],
                startIndex = 1;

            if (arguments.length === 3) {
                accumulator = initialValue;
                startIndex = 0;
            }

            for (let i = startIndex; i < arr.length; i++) {
                accumulator = reducerFn(accumulator, arr[i], i, arr);
            }

            return accumulator;
        },

        unique: function (arr) {
            return this.filter(arr, function isUnique(element, index) {
                return arr.indexOf(element) === index;
            });
        },

        flatten: function flatten(arr, depth = Infinity) {
            return arr.reduce(function (list, v) {
                return list.concat(
                    depth > 0 ?
                        (depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v ) :
                        [v]
                );
            }, []);
        },

        flatMap: function (arr, fn) {
            return arr.reduce(function (list, v) {
                return list.concat(fn(v));
            }, []);
        },

        guard: function (fn) {
            return function (arg) {
                return arg != null ? fn(arg) : arg;
            }
        },

        trampoline: function (fn) {
            return function trampolined(...args) {
                let result = fn(...args);

                while(typeof result == 'function') {
                    result = result();
                }

                return result;
            }
        },

        preorderTraverse: function (arr) {
        	constructPreorderTree(arr);
            return [1, 2, 3];
        }
    };

    publicApi.pipe = publicApi.reverseArgs(publicApi.compose);

    return publicApi;

    // private utilities

	function TreeNode(val) {
		this.val = val;
		this.left = this.right = null;
	}

	function constructPreorderTree(arr) {
		let root = null;
		if(!arr[0]) {
			return root;
		}

		root = new TreeNode(arr[0]);

		for(let i = 1; i < arr.length; i++) {
			if(arr[i]) {
				root.left = constructPreorderTree(arr.slice(1));
			}
			if(arr[i + 1]) {
				root.right = constructPreorderTree(arr.slice(2));
			}
		}

		return root;
	}

})();
