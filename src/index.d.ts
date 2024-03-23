declare module 'coinmarketcap-api' {
  export = CoinMarketCap;

  /**
   * @param apiKey - API key for accessing the CoinMarketCap API
   * @param [Options] - Options for the CoinMarketCap instance
   * @param [options.version] - Version of API. Defaults to 'v2'
   * @param [options.fetcher] - fetch function to use. Defaults to node-fetch
   * @param [options.config] - = Configuration for fetch request
   */
  declare class CoinMarketCap {
    constructor(apiKey: string, Options?: any);
    /**
     * Get a paginated list of all cryptocurrencies by CoinMarketCap ID.
     * @example
     * const client = new CoinMarketCap('api key')
     * client.getIdMap().then(console.log).catch(console.error)
     * client.getIdMap({listingStatus: 'inactive', limit: 10}).then(console.log).catch(console.error)
     * client.getIdMap({symbol: 'BTC,ETH'}).then(console.log).catch(console.error)
     * client.getIdMap({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
     * client.getIdMap({sort: 'cmc_rank'}).then(console.log).catch(console.error)
     * @param [options] - Options for the request:
     * @param [options.listingStatus = "active"] - active or inactive coins
     * @param [options.start = 1] - Return results from rank start and above
     * @param options.limit - Only returns limit number of results
     * @param options.symbol - Comma separated list of symbols, will ignore the other options
     * @param [options.sort = "id"] - Sort results by the options at https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyMap
     */
    getIdMap(options?: {
      listingStatus?: string;
      start?: number | string;
      limit: number | string;
      symbol: string[] | string;
      sort?: string;
    }): void;
    /**
     * Get static metadata for one or more cryptocurrencies.
     * Either id or symbol is required, but passing in both is not allowed.
     * @example
     * const client = new CoinMarketCap('api key')
     * client.getMetadata({id: '1'}).then(console.log).catch(console.error)
     * client.getMetadata({id: [1, 2]}).then(console.log).catch(console.error)
     * client.getMetadata({symbol: 'BTC,ETH'}).then(console.log).catch(console.error)
     * client.getMetadata({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
     * @param [options] - Options for the request:
     * @param options.id - One or more comma separated cryptocurrency IDs
     * @param options.symbol - One or more comma separated cryptocurrency symbols
     */
    getMetadata(options?: {
      id: any[] | string | number;
      symbol: string[] | string;
    }): void;
    /**
     * Get information on all tickers.
     * Start and limit options can only be used when currency or ID is not given.
     * Currency and ID cannot be passed in at the same time.
     * @example
     * const client = new CoinMarketCap('api key')
     * client.getTickers({limit: 3}).then(console.log).catch(console.error)
     * client.getTickers({convert: 'EUR'}).then(console.log).catch(console.error)
     * client.getTickers({start: 0, limit: 5}).then(console.log).catch(console.error)
     * client.getTickers({sort: 'name'}).then(console.log).catch(console.error)
     * @param [options] - Options for the request
     * @param [options.start = 1] - Return results from rank start and above
     * @param [options.limit = 100] - Only returns limit number of results [1..5000]
     * @param [options.convert = "USD"] - Return info in terms of another currency
     * @param [options.sort = "market_cap"] - Sort results by the options at https://pro.coinmarketcap.com/api/v1#operation/getV1CryptocurrencyListingsLatest
     * @param [options.sortDir] - Direction in which to order cryptocurrencies ("asc" | "desc")
     * @param [options.cryptocurrencyType = "all"] - Type of cryptocurrency to include ("all" | "coins" | "tokens")
     */
    getTickers(options?: {
      start?: number | string;
      limit?: number | string;
      convert?: string[] | string;
      sort?: string;
      sortDir?: string;
      cryptocurrencyType?: string;
    }): void;
    /**
     * Get latest market quote for 1 or more cryptocurrencies.
     * @example
     * const client = new CoinMarketCap('api key')
     * client.getQuotes({id: '1'}).then(console.log).catch(console.error)
     * client.getQuotes({id: [1, 2], convert: 'USD,EUR'}).then(console.log).catch(console.error)
     * client.getQuotes({symbol: 'BTC,ETH'}).then(console.log).catch(console.error)
     * client.getQuotes({symbol: ['BTC', 'ETH']}).then(console.log).catch(console.error)
     * @param [options] - Options for the request:
     * @param options.id - One or more comma separated cryptocurrency IDs
     * @param options.symbol - One or more comma separated cryptocurrency symbols
     * @param [options.convert = "USD"] - Return quotes in terms of another currency
     */
    getQuotes(
      options?:
        | {
            id: any[] | string | number;
            convert?: string[] | string;
          }
        | {
            symbol: string[] | string;
            convert?: string[] | string;
          },
    ): void;
    /**
     * Get global information
     * @example
     * const client = new CoinMarketCap()
     * client.getGlobal('GBP').then(console.log).catch(console.error)
     * client.getGlobal({convert: 'GBP'}).then(console.log).catch(console.error)
     * @param options - Options for the request:
     * @param [options.convert = "USD"] - Return quotes in terms of another currency
     */
    getGlobal(options: { convert?: string[] | string }): void;
  }
}
