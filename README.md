# @checkorator

Checkorator is a library providing a simple decorator system for asserting function parameters.

## Usage

Checkorator is designed to be used with `typescript` decorators.

To assert that a parameter is not null or undefined:

```ts
import { check, is, present } from 'checkorator';

@check()
class Foo {
    private bar: string;

    constructor(@is(present) bar: string) {
        this.bar = bar;
    }
}
```

If we manage to pass in a bad value:

```ts
new Foo(undefined as any);

// Assertion Error: Foo: parameter #1 failed check
```

## Reference

### Decorators

#### `check(): ClassDecorator`

Used to decorate a class. Will run all existing checks when the constructor is called.

e.g.

```ts
@check()
class Foo {}
```

#### `is(fn: (x: any) => boolean): ParameterDecorator`

Used to decorator function parameters. Adds the supplied function as a check on the decorated parameter. Can be used with helper functions from this library, or any function that takes one parameter and returns a boolean;

e.g.

```ts
constructor(@is(aString) foo: string) {}
```

or

```ts
constructor(@is(x => x === 'this exact string') foo: string) {}
```

### `is` Helpers

#### `present(x: any): boolean`

Fails if the value is `null` or `undefined`

e.g.

```ts
constructor(@is(present) foo: string) {}
```

#### `notNull(x: any): boolean`

Fails if the value is `null` (`undefined` will pass);

e.g.

```ts
constructor(@is(notNull) foo: string) {}
```

#### `notUndefined(x: any): boolean`

Fails if the value is `undefined` (`null` will pass);

e.g.

```ts
constructor(@is(notUndefined) foo: string) {}
```

#### `aString(x: any): boolean`

Passes if the value is `typeof 'string'`

e.g.

```ts
constructor(@is(aString) foo: string) {}
```

#### `aNumber(x: any): boolean`

Passes if the value is `typeof 'number'`

e.g.

```ts
constructor(@is(aNumber) foo: number) {}
```

#### `anArray(x: any): boolean`

Checks the value with `Array.isArray`

e.g.

```ts
constructor(@is(anArray) foo: string[]) {}
```

### Helper Factories

#### `longerThan(n: number): (x: any) => boolean`

Passes if the value an array or string longer than `n`

e.g.

```ts
constructor(@is(longerThan(5)) foo: string) {}
```

#### `shorterThan(n: number): (x: any) => boolean`

Passes if the value an array or string shorter than `n`

e.g.

```ts
constructor(@is(shorterThan(5)) foo: number[]) {}
```

#### `length(n: number): (x: any) => boolean`

Passes if the value an array or string with length of exactly `n`

e.g.

```ts
constructor(@is(length(5)) foo: string) {}
```

## Roadmap

### Short term feature goals:

1. `is` should also allow a map of recursively defined checks for asserting deep properties
2. `is` should preserve parameter names if possible
3. `is` should allow optionally defining failure output
4. `check` should allow passing an array of checks or a number-indexed map of checks to augment/replace `is`
5. Continue to define useful helpers for `is` when found.
