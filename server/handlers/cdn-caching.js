const _ = require("lodash");

exports.addCacheHeadersToResult = function addCacheHeadersToResult(res, cacheKeys) {
  if(cacheKeys) {
    if(cacheKeys === 'PRIVATE'){
      res.setHeader('Cache-Control', "private,no-cache,no-store,max-age=0");
      res.setHeader('Vary', "Accept-Encoding");
      res.setHeader('Surrogate-Control', "private,no-cache,no-store,max-age=0");
    } else {
      res.setHeader('Cache-Control', "public,max-age=15,s-maxage=240,stale-while-revalidate=300,stale-if-error=14400");
      res.setHeader('Vary', "Accept-Encoding");

      // Cloudflare Headers
      res.setHeader('Cache-Tag', _(cacheKeys).uniq().join(","));
      
      // Fastly Header
      res.setHeader('Surrogate-Control', "public,max-age=240,stale-while-revalidate=300,stale-if-error=14400");
      res.setHeader('Surrogate-Key', _(cacheKeys).uniq().join(" "));
    }
    
  } else {
    res.setHeader('Cache-Control', "public,max-age=15,s-maxage=15");
    res.setHeader('Vary', "Accept-Encoding");
    res.setHeader('Surrogate-Control', "public,max-age=15,s-maxage=15");
  }
  return res;
}