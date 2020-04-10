import type { Context } from 'semantic-release';
import { resolveConfig, verifyNx, prepare as prepareNx } from './lib';
import { NxOptions } from './lib/types';

let verified: boolean;

export const verifyConditions = async (
    options: NxOptions,
    context: Context
) => {
    resolveConfig(options, context);

    verifyNx(options, context);
    verified = true;
};

export const prepare = async (options: NxOptions, context: Context) => {
    resolveConfig(options, context);

    if (!verified) {
        verifyNx(options, context);
        verified = true;
    }

    return prepareNx(options, context);
};

export * from './lib';
