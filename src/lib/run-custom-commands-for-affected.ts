import type { Context } from 'semantic-release';
import { execSync } from 'child_process';
import { getNxBaseHeadRefArgs } from './get-nx-base-head-ref-args';
import { NxOptions } from './types';

export const runCustomCommandsForAffected = (
    options: NxOptions,
    context: Context
) => {
    const {
        logger,
        nextRelease: { version },
    } = context;

    if (options.customCommands.length === 0) {
        logger.log('No custom commands provided for nx affected projects.');
    }

    if (options.projects.length === 0) {
        logger.log(
            'No projects specified! Will run custom commands over all affected projects.'
        );
    }

    let affectedProjects = execSync(
        `nx affected:apps --plain ${getNxBaseHeadRefArgs(
            options,
            context
        )}`.replace(/\r?\n|\r/g, '')
    )
        .toString()
        .replace(/\r?\n|\r/g, '')
        .split(' ');

    affectedProjects =
        options.projects.length === 0
            ? affectedProjects
            : affectedProjects.filter(p => options.projects.includes(p));

    if (affectedProjects.length === 0) {
        logger.log('No relevant projects were affected.');
        return;
    }

    affectedProjects.forEach(project => {
        options.customCommands.forEach(command => {
            logger.log(
                `Running command "${command}" for affected project ${project} and version ${version}`
            );
            const thisProjectCommand = command
                .replace('$project', project)
                .replace('$version', version)
                .replace(/\r?\n|\r/g, '');
            execSync(thisProjectCommand, { stdio: 'inherit' });
        });
    });
};
