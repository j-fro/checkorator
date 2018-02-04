import * as test from 'tape';
import {
    aNumber,
    aString,
    anArray,
    notNull,
    present,
    notUndefined,
    longerThan,
    shorterThan,
    length
} from './helpers';

test('aString passes strings and fails others', t => {
    t.plan(7);
    t.isEqual(aString('x'), true);
    t.isNot(aString(5), true);
    t.isNot(aString({}), true);
    t.isNot(aString([]), true);
    t.isNot(aString(true), true);
    t.isNot(aString(null), true);
    t.isNot(aString(undefined), true);
});

test('aNumber passes numbers and fails others', t => {
    t.plan(7);
    t.isEqual(aNumber(5), true);
    t.isNot(aNumber('x'), true);
    t.isNot(aNumber({}), true);
    t.isNot(aNumber([]), true);
    t.isNot(aNumber(true), true);
    t.isNot(aNumber(null), true);
    t.isNot(aNumber(undefined), true);
});

test('anArray passes arrays and fails others', t => {
    t.plan(9);
    t.isEqual(anArray([]), true);
    t.isEqual(anArray([5]), true);
    t.isEqual(anArray(['x']), true);
    t.isNot(anArray('x'), true);
    t.isNot(anArray(5), true);
    t.isNot(anArray({}), true);
    t.isNot(anArray(true), true);
    t.isNot(anArray(null), true);
    t.isNot(anArray(undefined), true);
});

test('notNull passes anything but null', t => {
    t.plan(7);
    t.isEqual(notNull(undefined), true);
    t.isEqual(notNull('x'), true);
    t.isEqual(notNull(5), true);
    t.isEqual(notNull([]), true);
    t.isEqual(notNull({}), true);
    t.isEqual(notNull(true), true);
    t.isNot(notNull(null), true);
});

test('notUndefined passes anything but undefined', t => {
    t.plan(7);
    t.isEqual(notUndefined(null), true);
    t.isEqual(notUndefined('x'), true);
    t.isEqual(notUndefined(5), true);
    t.isEqual(notUndefined([]), true);
    t.isEqual(notUndefined({}), true);
    t.isEqual(notUndefined(true), true);
    t.isNot(notUndefined(undefined), true);
});

test('present passes anything but null or undefined', t => {
    t.plan(7);
    t.isEqual(present('x'), true);
    t.isEqual(present(5), true);
    t.isEqual(present([]), true);
    t.isEqual(present({}), true);
    t.isEqual(present(true), true);
    t.isNot(present(undefined), true);
    t.isNot(present(null), true);
});

test('longerThan(5) passes arrays or strings longer than 5', t => {
    t.plan(9);
    t.isNot(longerThan(5)('x'), true);
    t.isEqual(longerThan(5)('xxxxxx'), true);
    t.isNot(longerThan(5)([]), true);
    t.isEqual(longerThan(5)([1, 2, 3, 4, 5, 6]), true);
    t.isNot(longerThan(5)(5), true);
    t.isNot(longerThan(5)({}), true);
    t.isNot(longerThan(5)(true), true);
    t.isNot(longerThan(5)(undefined), true);
    t.isNot(longerThan(5)(null), true);
});

test('shorterThan(5) passes arrays or strings shorter than 5', t => {
    t.plan(9);
    t.isEqual(shorterThan(5)('xxxx'), true);
    t.isNot(shorterThan(5)('xxxxx'), true);
    t.isEqual(shorterThan(5)([1, 2, 3, 4]), true);
    t.isNot(shorterThan(5)([1, 2, 3, 4, 5]), true);
    t.isNot(shorterThan(5)(5), true);
    t.isNot(shorterThan(5)({}), true);
    t.isNot(shorterThan(5)(true), true);
    t.isNot(shorterThan(5)(undefined), true);
    t.isNot(shorterThan(5)(null), true);
});

test('length(5) passes arrays or strings exactly length 5', t => {
    t.plan(11);
    t.isNot(length(5)('x'), true);
    t.isEqual(length(5)('xxxxx'), true);
    t.isNot(length(5)('xxxxxx'), true);
    t.isNot(length(5)([]), true);
    t.isEqual(length(5)([1, 2, 3, 4, 5]), true);
    t.isNot(length(5)([1, 2, 3, 4, 5, 6]), true);
    t.isNot(length(5)(5), true);
    t.isNot(length(5)({}), true);
    t.isNot(length(5)(true), true);
    t.isNot(length(5)(undefined), true);
    t.isNot(length(5)(null), true);
});
