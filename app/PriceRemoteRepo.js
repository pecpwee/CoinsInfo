
const URL_BASE = 'https://bb.otcbtc.com'
const URL_TICKER = '/api/v2/tickers'
export default class PriceRemoteRepo {


    static cachedResultObj
    constructor() {
    }
    static async fetchDataFromWithCheckCache() {
        if (cachedResultObj != null
            && (new Date().getTime() - cachedResultObj.time > 30 * 1000)) {
            return cachedResultObj
        }

        return this.fetchDataFromServer()
    }

    static timeCheck() {

    }

    static async fetchDataFromServer() {

        try {
            let response = await fetch(URL_BASE + URL_TICKER, {
                method: 'GET'
            })
            console.log('get data ok')
            let jsonObj = await response.json()
            let resultObj = {
                all: [],
                // cny: [],
                // btc: [],
                // eth: [],
                // time: null //replace with dynamic create
            }
            Object.keys(jsonObj).forEach(
                (element) => {
                    resultObj.all.push({ key: element, name: element, data: jsonObj[element] })
                    let coinbaseStr = element.substring(element.indexOf('_') + 1)//example:'otc_btc' 
                    if(!resultObj.hasOwnProperty(coinbaseStr)){
                        resultObj[coinbaseStr] =[]
                    }
                    resultObj[coinbaseStr].push({ key: element, name: element, data: jsonObj[element] })
                });
            resultObj.coinBaseNames = Object.keys(resultObj)
            resultObj.time = new Date().getTime()
            cachedResultObj = resultObj
            return resultObj;

        } catch (error) {
            console.log(error)
        }

    }


    //var args.arg0:array,arg1..n:key word
    static filterArrayIfContainsKeywords(origArray) {
        let argNum = arguments.length
        if (argNum == 1) {
            return []
        }
        let filterKeyList = []
        for (let i = 1; i < arguments.length; i++) {
            if (arguments[i] == null || arguments[i] == '') {
                continue
            }
            filterKeyList.push(arguments[i].toLowerCase())
        }

        let resultList = origArray.filter((element, index, array) => {
            let lowerName = element.name.toLowerCase();
            for (let i = 0; i < filterKeyList.length; i++) {
                let isIncluded = lowerName.includes(filterKeyList[i])
                if (isIncluded) {
                    return true
                }
            }

            return false
        })
        return resultList
    }
    //var args
    static filterArrayByKeywords(origArray) {
        let argNum = arguments.length
        if (argNum == 1) {
            return origArray
        }
        let filterKeyList = []
        for (let i = 1; i < arguments.length; i++) {
            if (arguments[i] == null || arguments[i] == '') {
                continue
            }
            filterKeyList.push(arguments[i].toLowerCase())
        }
        let resultList = origArray.filter((element, index, array) => {
            let lowerName = element.name.toLowerCase();
            for (let i = 0; i < filterKeyList.length; i++) {
                let isIncluded = lowerName.includes(filterKeyList[i])
                if (!isIncluded) {
                    return false
                }
            }

            return true
        })
        return resultList
    }
}