const assert = require('assert'),
    _ = require('../utility-functions').util;

describe('Utility Functions: ', function () {
    describe('#partial()', function () {
        it('should return a function', function () {
            const fn = _.partial();

            assert.ok(typeof fn === 'function');
        });

        it('should return a function with a partially applied second argument', function () {
            function add(a, b) {
                return a + b;
            }

            const addOne = _.partial(add, 1);

            assert.deepEqual(
                add(1, 3),
                addOne(3)
            );
        });

        it('should accept multiple arguments to apply', function () {
            function add(a, b, c) {
                return a + b + c;
            }

            const addOneAndTwo = _.partial(add, 1, 2);

            assert.deepEqual(
                add(1, 2, 3),
                addOneAndTwo(3)
            );
        });

        it('can be used multiple times', function () {
            function add(a, b, c) {
                return a + b + c;
            }

            const addOne = _.partial(add, 1),
                addOneAndTwo = _.partial(addOne, 2);

            assert.deepEqual(
                add(1, 2, 3),
                addOneAndTwo(3)
            );
        });
    });

    describe('#reverseArgs()', function () {
        it('should return a function with its arguments reversed', function () {
            function output(a, b) {
                return a + b;
            }

            const reversed = _.reverseArgs(output);

            assert.deepEqual(
                'arg1arg2',
                output('arg1', 'arg2')
            );

            assert.deepEqual(
                'arg2arg1',
                reversed('arg1', 'arg2')
            );
        });
    });

    describe('#partialRight()', function () {
        it('should return a function with its right-most argument applied', function () {
            function output(a, b, c) {
                return a + b + c;
            }

            const rightApplied = _.partialRight(output, 'arg3');

            assert.deepEqual(
                output('arg1', 'arg2', 'arg3'),
                rightApplied('arg1', 'arg2')
            );
        });
    });

    describe('#curry()', function () {
        it('should return a function that can chain its arguments', function () {
            function add(a, b) {
                return a + b;
            }

            const curriedAdd = _.curry(add);

            assert.deepEqual(
                add(1, 3),
                curriedAdd(1)(3)
            );
        });

        it('should curry a function with multiple parameters', function () {
            function add(a, b, c, d) {
                return a + b + c + d;
            }

            const curriedAdd = _.curry(add);

            assert.deepEqual(
                add(1, 3, 3, 9),
                curriedAdd(1)(3)(3)(9)
            );
        });
    });

    describe('#looseCurry()', function () {
        it('should curry a function using multiple arguments', function () {
            function add(a, b, c) {
                return a + b + c;
            }

            const curriedAdd = _.looseCurry(add);

            assert.deepEqual(
                add(1, 2, 3),
                curriedAdd(1, 2)(3)
            );
        });
    });

    describe('#uncurry()', function () {
        it('should allow a curried function to be called with its arguments at once', function () {
            function add(a, b, c, d) {
                return a + b + c + d;
            }

            const curriedAdd = _.curry(add),
                uncurriedAdd = _.uncurry(curriedAdd);

            assert.deepEqual(
                curriedAdd(1)(3)(3)(9),
                uncurriedAdd(1, 3, 3, 9)
            );
        });
    });

    describe('#unary()', function () {
        it('should return a function that only calls the first argument', function () {
            function testArguments(arg1, arg2) {
                if (arg2) {
                    return arg2;
                }
                return arg1;
            }

            const oneArg = _.unary(testArguments);

            assert.deepEqual(
                'arg2',
                testArguments('arg1', 'arg2')
            );

            assert.deepEqual(
                'arg1',
                oneArg('arg1')
            );
        });

        it('should ignore all other arguments', function () {
            function testArguments(arg1, arg2) {
                if (arg2) {
                    return arg2;
                }
                return arg1;
            }

            const oneArg = _.unary(testArguments);

            assert.deepEqual(
                'arg2',
                testArguments('arg1', 'arg2')
            );

            assert.deepEqual(
                'arg1',
                oneArg('arg1', 'arg2')
            );
        });
    });

    describe('#binary()', function () {
        it('should return a function that only uses the first two arguments of the given function', function () {
            function sum(...args) {
                let sum = 0;
                args.forEach(function (arg) {
                    sum += arg;
                });
                return sum;
            }

            assert.deepEqual(5, sum(2, 3));
            assert.deepEqual(5, sum(2, 2, 1));

            const binarySum = _.binary(sum);

            assert.deepEqual(
                5,
                binarySum(3, 2)
            );

            assert.deepEqual(
                5,
                binarySum(3, 2, 3)
            );

            assert.deepEqual(
                5,
                binarySum(3, 2, 3, 5, 9, 9)
            );
        });
    });

    describe('#identity()', function () {
        it('should return the value passed in', function () {
            assert.deepEqual(
                'testInput',
                _.identity('testInput')
            );
        });
    });

    describe('#constant()', function () {
        it('should return a function that returns the value passed in', function () {
            const testValue = 'testValue';

            assert.deepEqual(
                'testValue',
                _.constant('testValue')()
            );
        });
    });

    describe('#not()', function () {
        it('should return the results if the predicate is not met', function () {
            function isFive(v) {
                return v === 5;
            }

            const isntFive = _.not(isFive);

            assert.ok(isFive(5));

            assert.deepEqual(
                false,
                isntFive(5)
            );
        });

        it('should not return the results if the predicate is met', function () {
            function isFive(v) {
                return v === 5;
            }

            const isntFive = _.not(isFive);

            assert.ok(isFive(5));

            assert.ok(isntFive(9));
        });
    });

    describe('#compose()', function () {
        it('should return the composition of two functions', function () {
            function timesTen(a) {
                return 10 * a;
            }

            function timesTwenty(a) {
                return 20 * a;
            }

            const timesTwoHundred = _.compose(timesTen, timesTwenty);

            assert.deepEqual(
                timesTwenty(timesTen(5)),
                timesTwoHundred(5)
            );
        });

        it('should be able to compose more than 2 functions', function () {
            function timesTen(a) {
                return 10 * a;
            }

            function timesTwenty(a) {
                return 20 * a;
            }

            const timesTwoThousand = _.compose(timesTen, timesTwenty, timesTen);

            assert.deepEqual(
                timesTen(timesTwenty(timesTen(5))),
                timesTwoThousand(5)
            );
        });

        it('should execute functions from right to left', function () {
            function doubleString(str) {
                return str + str;
            }

            function addHello(str) {
                return str + 'hello';
            }

            const doubleThenHello = _.compose(addHello, doubleString);

            assert.deepEqual(
                addHello(doubleString('test')),
                doubleThenHello('test')
            );
        });
    });

    describe('#pipe()', function () {
        it('should compose functions from left to right', function () {
            function doubleString(str) {
                return str + str;
            }

            function addHello(str) {
                return str + 'hello';
            }

            const doubleThenHello = _.pipe(doubleString, addHello);

            assert.deepEqual(
                addHello(doubleString('test')),
                doubleThenHello('test')
            );
        });
    });

    describe('#prop()', function () {
        it('should return the value at given property of given object', function () {
            const obj = {
                value: 'testValue'
            };

            const value = _.prop(obj, 'value');

            assert.deepEqual('testValue', value);
        });
    });

    describe('#setProp()', function () {
        it('should set the given property to a given value on a new object', function () {
            const result = _.setProp('value', true);

            assert.ok(result.value);
        });
    });

    describe('#map()', function () {
        it('should perform the given function operation on each element of an array', function () {
            function add3(v) {
                return v + 3;
            }

            const arr = [1, 2, 3],
                addedArr = _.map(arr, add3);

            assert.deepEqual(4, addedArr[0]);
            assert.deepEqual(5, addedArr[1]);
            assert.deepEqual(6, addedArr[2]);
        });

        it('should not mutate the original array', function () {
            function add3(v) {
                return v + 3;
            }

            const arr = [1, 2, 3],
                addedArr = _.map(arr, add3);

            assert.deepEqual(1, arr[0]);
            assert.deepEqual(2, arr[1]);
            assert.deepEqual(3, arr[2]);
        });
    });

    describe('#filter()', function () {
        it('should return an array that only has elements that match the predicate function', function () {
            function lessThanFive(v) {
                return v < 5;
            }

            const arr = [4, 5, 8, 0, 1, 7],
                filteredArr = _.filter(arr, lessThanFive);

            assert.deepEqual(3, filteredArr.length);
            assert.deepEqual(4, filteredArr[0]);
            assert.deepEqual(0, filteredArr[1]);
            assert.deepEqual(1, filteredArr[2]);
        });

        it('should not mutate original array', function () {
            function lessThanFive(v) {
                return v < 5;
            }

            const arr = [4, 5, 8, 0, 1, 7],
                filteredArr = _.filter(arr, lessThanFive);

            assert.deepEqual(6, arr.length);
        });
    });

    describe('#reduce()', function () {
        it('should use given reducer function to accumulate data in array', function () {
            function sum(accumulator, value) {
                return accumulator + value;
            }

            const arr = [5, 10, 15],
                arrSum = _.reduce(arr, sum);

            assert.deepEqual(
                5 + 10 + 15,
                arrSum
            );
        });

        it('should take an initial value as a parameter', function () {
            function sum(accumulator, value) {
                return accumulator + value;
            }

            const arr = [10, 15],
                arrSum = _.reduce(arr, sum, 5);

            assert.deepEqual(
                5 + 10 + 15,
                arrSum
            );

        });
    });
});

