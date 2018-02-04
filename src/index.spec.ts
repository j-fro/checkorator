import * as test from 'tape';
import { is } from './is';
import { check } from './check';
import { aString } from './helpers';

test('It passes with no parameters', t => {
    @check()
    class Test {
        constructor() {}
    }
    const fn = () => {
        new Test();
    };

    t.doesNotThrow(fn);

    t.end();
});

test('It passes with params and no checks', t => {
    @check()
    class Test {
        constructor(public foo: string) {}
    }
    const fn = () => {
        new Test('x');
    };

    t.doesNotThrow(fn);

    t.end();
});

test('It passes with one check', t => {
    @check()
    class Test {
        foo: string;
        constructor(@is(aString) foo: string) {
            this.foo = foo;
        }
    }
    const fn = () => {
        new Test('x');
    };

    t.doesNotThrow(fn);

    t.end();
});

test('It throws with one wrong param', t => {
    @check()
    class Test {
        foo: string;
        constructor(@is(aString) foo: string) {
            this.foo = foo;
        }
    }
    const fn = () => {
        new Test(5 as any);
    };

    t.throws(fn, /AssertionError/);

    t.end();
});
