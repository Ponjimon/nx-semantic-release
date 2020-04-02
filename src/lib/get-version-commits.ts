import type { Context } from 'semantic-release';
import { execSync } from 'child_process';
import { NxOptions } from './types';

const getCommitOfLastVersion = (options: NxOptions, context: Context) => {
    const { lastRelease } = context;

    if (lastRelease?.gitHead) {
        return lastRelease.gitHead;
    }

    const command = 'git rev-list --max-parents=0 HEAD';
    const lastCommit = execSync(command).toString();
    return lastCommit;
};

const getCommitOfNextVersion = (options: NxOptions, context: Context) => {
    const { nextRelease } = context;

    return nextRelease?.gitHead;
};

export const getVersionCommits = (options: NxOptions, context: Context) => ({
    lastVersionCommit: getCommitOfLastVersion(options, context),
    nextVersionCommit: getCommitOfNextVersion(options, context),
});
