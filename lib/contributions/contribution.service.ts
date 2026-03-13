import {
    getContributionsByProjectId,
    type Contribution,
} from './contribution.model';

export type { Contribution };

/**
 * Service layer for project contributions.
 * Contains business logic and validation — keeps the controller clean.
 */
export async function fetchProjectContributions(
    projectId: string
): Promise<Contribution[]> {
    if (!projectId || typeof projectId !== 'string') {
        throw new Error('Invalid projectId provided.');
    }

    const contributions = await getContributionsByProjectId(projectId);
    return contributions;
}
