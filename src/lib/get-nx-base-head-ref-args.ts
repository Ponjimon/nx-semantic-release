import type { Context } from 'semantic-release';
import { getVersionCommits } from './get-version-commits';
import { NxOptions } from './types';

export const getNxBaseHeadRefArgs = (options: NxOptions, context: Context) => {
    const { lastVersionCommit, nextVersionCommit } = getVersionCommits(
        options,
        context
    );

    return `--base=${lastVersionCommit} --head=${nextVersionCommit}`;
};
