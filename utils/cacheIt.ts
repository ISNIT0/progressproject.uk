const cache: Record<string, Promise<any>> = {};
const cacheActive: Record<string, boolean> = {};

export function cacheIt(
  baseCacheKey: string,
  cacheTimeMs: number,
  func: (...args: any[]) => Promise<any>
) {
  return function (...args: any[]) {
    const cacheKey = baseCacheKey + args.join("|");
    const cachedValPromise = cache[cacheKey];

    if (cacheActive[cacheKey] && cachedValPromise) {
      console.info(`Cache hit for [${cacheKey}]`);
      return cachedValPromise;
    }

    const ret = func(...args);
    if (cacheKey in cache) {
      ret.then((val) => {
        cache[cacheKey] = ret;
        return val;
      });
    } else {
      cache[cacheKey] = ret;
    }
    cacheActive[cacheKey] = true;
    setTimeout(() => delete cacheActive[cacheKey], cacheTimeMs);
    console.info(`Cache miss for [${cacheKey}]`);

    return cachedValPromise || ret;
  };
}
