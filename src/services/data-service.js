export default class DataService {
  _apiBeatStars = `https://main.v2.beatstars.com/search/trending_searches?index=all`;
  _apiAirBitTags = `https://api.airbit.com/tags/autocomplete`;
  _apiAirBitTopSellingBeatsTags = `https://api.airbit.com/charts/marketplace_top_selling_beats?period=30&expand=user,tags,stats`;

  getBeatStarsTagDataByDate = async ({ startDate, endDate }) => {
    return await this.getResource(
      `${this._apiBeatStars}&startDate=${startDate}&endDate=${endDate}`);
  };

  getAirBitPopularTags = async () => {
    return await this.getResource(this._apiAirBitTags);
  };

  getAirBitTopSellingBeatsTags = async () => {
    return await this.getResource(
      this._apiAirBitTopSellingBeatsTags);
  };

  getResource = async (url) => {
    try {
      const res = await fetch(url);

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
}
