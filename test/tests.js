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

    describe('#not', function () {
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
    });
});

