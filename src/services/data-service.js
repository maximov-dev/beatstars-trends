export default class DataService {
    _apiBase = `https://main.v2.beatstars.com/search/trending_searches?index=all`;
    

    getDataByDate = async ({ startDate, endDate }) => {
        return await this.getResource(`${this._apiBase}&startDate=${startDate}&endDate=${endDate}`);
    }

    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
      };
}
