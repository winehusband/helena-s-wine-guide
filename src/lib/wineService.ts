import { supabase, hasSupabaseConfig, supabaseInitError } from './supabaseClient';
import { wineKeySearchTerms, excludeSparklingFor } from './wineKeyMap';
import {
  PRICE_THRESHOLD_NEVER_SHOW,
  PRICE_THRESHOLD_SHOW_WITH_MESSAGE,
  QUERY_LIMIT_WITH_FILTER,
  QUERY_LIMIT_NO_FILTER
} from './constants';
import { z } from 'zod';

const wineKeySchema = z.string().min(1).max(100);

export interface WineRow {
  id: string;
  rating: number | null;
  specific_price: number | null;
  purchased_from_store: string | null;
  wines_master?: {
    name: string | null;
    appellation: string | null;
    region: string | null;
    country: string | null;
    style: string | null;
  } | null;
}

async function fetchTopByTerm(term: string, excludeSparkling: boolean = false): Promise<WineRow | null> {
  if (!supabase) return null;

  // Fetch more results to filter client-side if needed
  const limit = excludeSparkling ? QUERY_LIMIT_WITH_FILTER : QUERY_LIMIT_NO_FILTER;

  let query = supabase
    .from('wine_instances')
    .select('id,specific_price,purchased_from_store,rating,wines_master!inner(name,appellation,region,country,style)')
    .or(
      [
        `name.ilike.%${term}%`,
        `appellation.ilike.%${term}%`,
        `region.ilike.%${term}%`,
        `country.ilike.%${term}%`,
      ].join(','),
      { foreignTable: 'wines_master' },
    )
    .order('rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  if (!data || data.length === 0) return null;

  // Filter out sparkling wines client-side if requested
  if (excludeSparkling) {
    const filtered = (data as WineRow[]).filter(row => {
      const style = row.wines_master?.style;
      return style !== 'Sparkling' && style !== 'sparkling';
    });
    return filtered.length > 0 ? filtered[0] : null;
  }

  return data[0] as WineRow;
}

async function fetchBudgetAlternative(term: string, maxPrice: number = PRICE_THRESHOLD_SHOW_WITH_MESSAGE, excludeSparkling: boolean = false): Promise<WineRow | null> {
  if (!supabase) return null;

  // Fetch more results to filter client-side if needed
  const limit = excludeSparkling ? QUERY_LIMIT_WITH_FILTER : QUERY_LIMIT_NO_FILTER;

  let query = supabase
    .from('wine_instances')
    .select('id,specific_price,purchased_from_store,rating,wines_master!inner(name,appellation,region,country,style)')
    .or(
      [
        `name.ilike.%${term}%`,
        `appellation.ilike.%${term}%`,
        `region.ilike.%${term}%`,
        `country.ilike.%${term}%`,
      ].join(','),
      { foreignTable: 'wines_master' },
    )
    .lte('specific_price', maxPrice)
    .order('rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  if (!data || data.length === 0) return null;

  // Filter out sparkling wines client-side if requested
  if (excludeSparkling) {
    const filtered = (data as WineRow[]).filter(row => {
      const style = row.wines_master?.style;
      return style !== 'Sparkling' && style !== 'sparkling';
    });
    return filtered.length > 0 ? filtered[0] : null;
  }

  return data[0] as WineRow;
}

export interface WineRecommendation {
  wine: WineRow;
  isAlternative: boolean; // true if showing an expensive wine (> £20) with "not made of money" message
}

export async function fetchTopWineByKey(wineKey: string, showMostExpensive: boolean = false): Promise<WineRecommendation | null> {
  // Validate input
  const validationResult = wineKeySchema.safeParse(wineKey);
  if (!validationResult.success) {
    throw new Error(`Invalid wineKey: ${validationResult.error.message}`);
  }

  if (!hasSupabaseConfig || !supabase || supabaseInitError) return null;
  const terms = wineKeySearchTerms[wineKey] || [wineKey.replace(/_/g, ' ')];
  const shouldExcludeSparkling = excludeSparklingFor.has(wineKey);

  for (const term of terms) {
    // First, get the highest-rated wine
    const topWine = await fetchTopByTerm(term, shouldExcludeSparkling);
    if (!topWine) continue;

    // If showMostExpensive is true, skip all price filtering and just return the top wine
    if (showMostExpensive) {
      return { wine: topWine, isAlternative: false };
    }

    const price = topWine.specific_price;

    // Never show wines over the maximum threshold, find alternative without message
    if (price !== null && price > PRICE_THRESHOLD_NEVER_SHOW) {
      const budgetWine = await fetchBudgetAlternative(term, PRICE_THRESHOLD_SHOW_WITH_MESSAGE, shouldExcludeSparkling);
      if (budgetWine) {
        return { wine: budgetWine, isAlternative: false };
      }
      // If no budget alternative found, skip this term
      continue;
    }

    // If price is over threshold (but not over max), show the expensive wine WITH message
    if (price !== null && price > PRICE_THRESHOLD_SHOW_WITH_MESSAGE) {
      return { wine: topWine, isAlternative: true };
    }

    // Price is at or below threshold, return the top wine without message
    return { wine: topWine, isAlternative: false };
  }

  return null;
}
