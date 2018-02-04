import 'reflect-metadata';
import { ValidationFn, ValidationMap, MetadataValidationMap } from './is';

type ValidationList =
    | (ValidationFn | ValidationMap)[]
    | { [index: number]: ValidationFn | ValidationMap };

type ClassDecorator = <T extends { new (...args: any[]): {} }>(t: T) => T;
export const check = (): ClassDecorator => {
    return target => {
        class Checked extends target {
            constructor(...args: any[]) {
                const checks: MetadataValidationMap | undefined = Reflect.getOwnMetadata(
                    'checkorator',
                    target
                );

                runChecks(target.name)(checks)(args);

                super(args);
            }
        }
        Object.defineProperty(Checked, 'name', {
            value: `Checked${target.name}`
        });
        return Checked;
    };
};

const runChecks = (name: string) => (
    checks: ValidationList | MetadataValidationMap | undefined
) => (args: any[]) => {
    if (checks == null) {
        return;
    } else if (isMetadataMap(checks)) {
        runChecksOnMap(name)(checks)(args);
    } else {
        runChecksOnList(name)(checks as ValidationFn[])(args);
    }
};

const runChecksOnMap = (name: string) => (checks: MetadataValidationMap) => (args: any[]) => {
    Object.entries(checks).forEach(runSingleCheck(name, args));
};

const runChecksOnList = (name: string) => (checks: ValidationFn[]) => (args: any[]) => {
    const listAsMap: MetadataValidationMap = checks.reduce(
        (m, c, i) => ({ ...m, [i]: { fn: c } }),
        {}
    );
    Object.entries(listAsMap).forEach(runSingleCheck(name, args));
};

const runSingleCheck = (name: string, args: any[]) => ([index, check]: [
    string,
    { fn: ValidationFn; name: string | symbol | undefined }
]) => {
    console.assert(check.fn(args[parseInt(index)]), `${name}: parameter #${index} failed check`);
};

function isMetadataMap(
    candidate: MetadataValidationMap | ValidationList
): candidate is MetadataValidationMap {
    if (candidate == null) {
        return false;
    }
    const keys = Object.keys(candidate);
    if (keys.length < 1) {
        return false;
    }
    const elemToCheck = (candidate as MetadataValidationMap)[keys[0]];
    return (
        typeof elemToCheck.fn === 'function' &&
        (typeof elemToCheck.name === 'string' || elemToCheck.name === undefined)
    );
}
