import type { Context } from 'semantic-release';
import { NxOptions } from './types';

export const resolveConfig = (options: NxOptions, context: Context) => {
    options.targets = options.targets || [];
    options.projects = options.projects || [];
    options.customCommands = options.customCommands || [];
    options.extraArgs = options.extraArgs || [];
};
