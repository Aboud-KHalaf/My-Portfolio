-- ============================================================
-- Migration: Create project_contributions table
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

CREATE TABLE IF NOT EXISTS public.project_contributions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id       uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title            text NOT NULL,
  description      text,
  contribution_type text,
  order_index      integer,
  created_at       timestamp with time zone DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.project_contributions ENABLE ROW LEVEL SECURITY;

-- Public read-only access (consistent with the projects table)
CREATE POLICY "Allow public read access"
  ON public.project_contributions
  FOR SELECT
  USING (true);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_contributions_project_id
  ON public.project_contributions (project_id);

CREATE INDEX IF NOT EXISTS idx_contributions_order
  ON public.project_contributions (project_id, order_index ASC);

-- ============================================================
-- EXAMPLE DATA (optional — remove before production)
-- Replace 'YOUR_PROJECT_UUID' with a real project id from the
-- projects table.
-- ============================================================
-- INSERT INTO public.project_contributions
--   (project_id, title, description, contribution_type, order_index)
-- VALUES
--   ('YOUR_PROJECT_UUID', 'Architected Clean Layer Separation',
--    'Designed the entire app using Clean Architecture with strict separation between Data, Domain, and Presentation layers.',
--    'Architecture', 1),
--   ('YOUR_PROJECT_UUID', 'Built Real-Time State Management',
--    'Implemented Bloc/Cubit state management across all features including session, feed, and notification streams.',
--    'Feature', 2),
--   ('YOUR_PROJECT_UUID', 'Optimized Supabase Query Performance',
--    'Reduced average API response time by 60% through targeted Postgres indexing and RLS policy restructuring.',
--    'Performance', 3);
