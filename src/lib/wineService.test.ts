import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTopWineByKey } from './wineService';

// Mock the supabaseClient module
vi.mock('./supabaseClient', () => ({
  supabase: null,
  hasSupabaseConfig: false,
  supabaseInitError: null,
}));

describe('wineService', () => {
  describe('fetchTopWineByKey', () => {
    it('should validate wineKey input', async () => {
      await expect(fetchTopWineByKey('')).rejects.toThrow('Invalid wineKey');
    });

    it('should return null when supabase is not configured', async () => {
      const result = await fetchTopWineByKey('white_burgundy');
      expect(result).toBeNull();
    });

    it('should accept valid wineKey strings', async () => {
      const result = await fetchTopWineByKey('white_burgundy');
      // Should not throw, returns null because supabase is mocked as not configured
      expect(result).toBeNull();
    });

    it('should reject wineKey longer than 100 characters', async () => {
      const longKey = 'a'.repeat(101);
      await expect(fetchTopWineByKey(longKey)).rejects.toThrow('Invalid wineKey');
    });
  });
});
