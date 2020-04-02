import type { Context } from 'semantic-release';
import { NxOptions } from './types';

export const verifyNx = (options: NxOptions, context: Context) => {
    if (!Array.isArray(options.targets)) {
        throw new Error(
            `Invalid type "${typeof options.targets}" of "targets". It must be an array!`
        );
    }

    if (!Array.isArray(options.customCommands)) {
        throw new Error(
            `Invalid type "${typeof options.customCommands}" of "customCommands". It must be an array!`
        );
    }
};
