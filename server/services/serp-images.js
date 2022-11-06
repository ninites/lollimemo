const SerpApi = require('google-search-results-nodejs');

const API_KEY = "0773b402bd65aa17777b543673d8093ff012791fd09996b612315db83cf6917b"

class SerpImages {
    constructor(SerpApi) {
        this._search = new SerpApi.GoogleSearch(API_KEY);
    }

    async search(parameters) {
        const result = await new Promise((resolve, reject) => {
            this._search.json(parameters, (data) => {
                resolve(data)
            })
        })
        return result
    }
}

const instance = new SerpImages(SerpApi)

module.exports.SerpImagesSingleton = instance 