import NodeCache from 'node-cache';

class Cache {
  private nCache: NodeCache;
  constructor(ttlSeconds: number = 300) {
    this.nCache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  public set<T>(key: string, value: T): void {
    this.nCache.set(key, value);
  }

  get<T>(key: string) {
    return this.nCache.get(key);
  }

  delete<T>(key: string) {
    this.nCache.del(key);
  }

  clear() {
    this.nCache.flushAll();
  }

  has(key: string) {
    return this.nCache.has(key);
  }
}

const cache = new Cache();

export const setCache = <T>(key: string, value: T) => cache.set(key, value);
export const getCache = <T>(key: string) => cache.get(key);
export const deleteCache = <T>(key: string) => cache.delete(key);
export const clearCache = <T>() => cache.clear();
export const hasCache = <T>(key: string) => cache.has(key);

export default cache;
