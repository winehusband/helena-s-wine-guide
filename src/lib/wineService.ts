import { supabase, hasSupabaseConfig, supabaseInitError } from './supabaseClient';
import { wineKeySearchTerms, excludeSparklingFor } from './wineKeyMap';

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
  const limit = excludeSparkling ? 50 : 1;

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

async function fetchBudgetAlternative(term: string, maxPrice: number = 15, excludeSparkling: boolean = false): Promise<WineRow | null> {
  if (!supabase) return null;

  // Fetch more results to filter client-side if needed
  const limit = excludeSparkling ? 50 : 1;

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

export async function fetchTopWineByKey(wineKey: string): Promise<WineRecommendation | null> {
  if (!hasSupabaseConfig || !supabase || supabaseInitError) return null;
  const terms = wineKeySearchTerms[wineKey] || [wineKey.replace(/_/g, ' ')];
  const shouldExcludeSparkling = excludeSparklingFor.has(wineKey);

  for (const term of terms) {
    // First, get the highest-rated wine
    const topWine = await fetchTopByTerm(term, shouldExcludeSparkling);
    if (!topWine) continue;

    const price = topWine.specific_price;

    // Never show wines over £50, find alternative without message
    if (price !== null && price > 50) {
      const budgetWine = await fetchBudgetAlternative(term, 20, shouldExcludeSparkling);
      if (budgetWine) {
        return { wine: budgetWine, isAlternative: false };
      }
      // If no budget alternative found, skip this term
      continue;
    }

    // If price is over £20 (but ≤ £50), show the expensive wine WITH message
    if (price !== null && price > 20) {
      return { wine: topWine, isAlternative: true };
    }

    // Price is £20 or less, return the top wine without message
    return { wine: topWine, isAlternative: false };
  }

  return null;
}
