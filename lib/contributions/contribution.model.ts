import { supabase } from '@/lib/supabase';

export interface Contribution {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    contribution_type: string | null;
    order_index: number | null;
    created_at: string;
}

/**
 * Fetches all contributions for a given project, ordered by order_index ASC.
 * Returns an empty array if no contributions exist or Supabase is not configured.
 */
export async function getContributionsByProjectId(
    projectId: string
): Promise<Contribution[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('project_contributions')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('[contribution.model] Error fetching contributions:', error.message);
        return [];
    }

    return data ?? [];
}
