// Loose mapping from flow wineKey -> search terms
// Used to find the top-rated matching wine_instance joined to wines_master
export const wineKeySearchTerms: Record<string, string[]> = {
  chinon: ['chinon', 'loire'],
  white_burgundy: ['burgundy', 'bourgogne blanc', 'chardonnay'],
  orange_wine: ['orange'],
  xinomavro: ['xinomavro'],
  chianti: ['chianti', 'tuscany'],
  australian_red: ['australia', 'shiraz'],
  port: ['port', 'porto'],
  tokaji_late_harvest: ['tokaji', 'tokaj'],
  white_boxed_wine: ['bag in box', 'box', 'boxed'],
  red_magnum: ['magnum'],
  zweigelt: ['zweigelt'],
  pignoletto: ['pignoletto'],
  champagne: ['champagne'],
};

// Wine keys that should exclude sparkling wines (still wines only)
export const excludeSparklingFor: Set<string> = new Set([
  'chinon',
  'white_burgundy',
  'orange_wine',
  'xinomavro',
  'chianti',
  'australian_red',
  'port',
  'tokaji_late_harvest',
  'white_boxed_wine',
  'red_magnum',
]);

