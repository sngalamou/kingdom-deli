// @ngc/config/sanity
//
// Single source of truth for Sanity client construction across all NGC clients.
// Each client workspace can call this with overrides if it needs to.

import { createClient, type SanityClient } from '@sanity/client';

interface NgcSanityClientOptions {
  projectId?: string;
  dataset?: string;
  token?: string;
  useCdn?: boolean;
  apiVersion?: string;
}

/**
 * Returns a Sanity client. Falls back to env vars when options are omitted,
 * which is what most pages in client workspaces will do.
 *
 * Required env (or option): SANITY_PROJECT_ID
 * Optional: SANITY_DATASET (defaults to 'production'), SANITY_TOKEN
 */
export function ngcSanityClient(options: NgcSanityClientOptions = {}): SanityClient {
  const projectId = options.projectId ?? process.env.SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error(
      '[@ngc/config/sanity] No projectId provided and SANITY_PROJECT_ID is not set. ' +
        'Set the env var or pass projectId explicitly.'
    );
  }
  return createClient({
    projectId,
    dataset: options.dataset ?? process.env.SANITY_DATASET ?? 'production',
    token: options.token ?? process.env.SANITY_TOKEN,
    useCdn: options.useCdn ?? true,
    apiVersion: options.apiVersion ?? '2024-01-01',
  });
}
