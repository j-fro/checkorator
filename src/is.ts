import 'reflect-metadata';

export type ValidationFn = <T>(a: T) => boolean;
export interface ValidationMap {
    [key: string]: ValidationFn | ValidationMap;
}

export interface MetadataValidationMap {
    [key: string]: { fn: ValidationFn; name: string | symbol | undefined };
}

export const is = (fn: ValidationFn, name?: string): ParameterDecorator => {
    return (target, key, parameterIndex): void => {
        console.log('key', key);
        const newCheck = buildNewCheck(parameterIndex)(name || key)(fn);
        const existingChecks = getMetadata('checkorator')(target);
        const updateMetadata = addToMetadata('checkorator')(target);
        if (existingChecks == null) {
            updateMetadata(newCheck);
        } else {
            const updatedChecks = { ...existingChecks, ...newCheck };
            updateMetadata(updatedChecks);
        }
    };
};

const buildNewCheck = (index: number) => (name?: string | symbol) => (
    fn: ValidationFn
): MetadataValidationMap => ({ [index.toString()]: { fn, name } });

const getMetadata = (key: string) => (target: object) =>
    Reflect.getOwnMetadata(key, target) as MetadataValidationMap | undefined;

const addToMetadata = (key: string) => (target: object) => (value: MetadataValidationMap) =>
    Reflect.defineMetadata(key, value, target);
