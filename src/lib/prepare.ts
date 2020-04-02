import type { Context } from 'semantic-release';
import { runNxAffected } from './run-nx-affected';
import { runCustomCommandsForAffected } from './run-custom-commands-for-affected';
import { NxOptions } from './types';

export const prepare = (options: NxOptions, context: Context) => {
    const { logger } = context;

    runNxAffected(options, context);
    runCustomCommandsForAffected(options, context);

    return true;
};
