import 'reflect-metadata';
import { ValidationFn, ValidationMap, MetadataValidationMap } from './is';

type ValidationList =
    | (ValidationFn | ValidationMap)[]
    | { [index: number]: ValidationFn | ValidationMap };

type ClassDecorator = <T extends { new (...args: any[]): {} }>(t: T) => T;
export const check = (validationList?: ValidationList): ClassDecorator => {
    console.log('validationList', validationList);

    return target => {
        console.log('target', target);

        console.log('fun name', target.name);

        return class extends target {
            constructor(...args: any[]) {
                const checks = Reflect.getOwnMetadata('checkorator', target);
                console.log('checks', checks);
                super(args);
            }
        };
    };
};

// const runChecks = (name: string) => (list: ValidationList) => (map: MetadataValidationMap) => {
//     Object.keys(list)
// }

const runChecks = (name: string) => (checks: ValidationList | MetadataValidationMap) => (
    args: any[]
) => {};

const runChecksOnMap = (name: string) => (checks: MetadataValidationMap) => (args: any[]) => {
    Object.entries(checks).forEach(runSingleCheck(name)(args));
};

const runChecksOnList = (name: string) => (checks: ValidationFn[]) => (args: any[]) => {
    Object.entries(checks.reduce((m, c, i) => ({ ...m, [i]: { fn: c } }), {})).forEach(
        runSingleCheck(name)(args)
    );
};

const runSingleCheck = (name: string) => (args: any[]) => ([index, check]: [
    string,
    { fn: ValidationFn; name: string | symbol | undefined }
]) => {
    console.assert(check.fn(args[parseInt(index)]), `${name}: parameter #${index} failed check`);
};
