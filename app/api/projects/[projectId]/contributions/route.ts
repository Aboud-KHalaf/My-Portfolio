import { NextRequest, NextResponse } from 'next/server';
import { fetchProjectContributions } from '@/lib/contributions/contribution.service';

/**
 * GET /api/projects/[projectId]/contributions
 *
 * Returns an ordered list of contributions for a specific project.
 * Responds with an empty array [] if no contributions exist.
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params;

        if (!projectId) {
            return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
        }

        const contributions = await fetchProjectContributions(projectId);

        return NextResponse.json({ contributions }, { status: 200 });
    } catch (err: any) {
        console.error('[contributions route] Error:', err.message);
        return NextResponse.json(
            { error: 'Failed to fetch contributions.' },
            { status: 500 }
        );
    }
}
