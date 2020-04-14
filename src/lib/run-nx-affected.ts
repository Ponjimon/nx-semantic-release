import type { Context } from 'semantic-release';
import { getNxBaseHeadRefArgs } from './get-nx-base-head-ref-args';
import { execSync } from 'child_process';
import { NxOptions } from './types';

export const runNxAffected = (options: NxOptions, context: Context) => {
    const { logger } = context;

    options.targets.forEach(target => {
        const command = `nx affected${
            options.parallel ? ' --parallel ' : ' '
        }--target=${target} ${getNxBaseHeadRefArgs(
            options,
            context
        )} ${options.extraArgs.join(' ')}`.replace(/\r?\n|\r/g, '');

        logger.log(`Running nx:affected on target ${target}`);

        execSync(command, { stdio: 'inherit' });
    });
};
