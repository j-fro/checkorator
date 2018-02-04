type IsA = (x: any) => boolean;

export const aString: IsA = x => typeof x === 'string';

export const aNumber: IsA = x => typeof x === 'number';

export const anArray: IsA = x => Array.isArray(x);

export const notNull: IsA = x => x !== null;

export const notUndefined: IsA = x => x !== undefined;

export const present: IsA = x => x != null;

export const longerThan = (n: number): IsA => x =>
    aString(x) || anArray(x) ? (x as string | any[]).length > n : false;

export const shorterThan = (n: number): IsA => x =>
    aString(x) || anArray(x) ? (x as string | any[]).length < n : false;

export const length = (n: number): IsA => x =>
    aString(x) || anArray(x) ? (x as string | any[]).length === n : false;
