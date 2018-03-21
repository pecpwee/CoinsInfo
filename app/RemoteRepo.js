
const URL_BASE = 'https://bb.otcbtc.com'
const URL_TICKER = '/api/v2/tickers'

export default class RemoteRepo {

    static fetchData() {

        this.setState((prevState, props) => {
            return {
                ...prevState, isRefreshing: true
            }
        })
        fetch(URL_BASE + URL_TICKER, {
            method: 'GET'
        })
            .then((response) => {
                console.log('get data ok')
                return response.json()

            }).then((jsonObj) => {
                let array = [];
                Object.keys(jsonObj).forEach(
                    (element) => {
                        array.push({ name: element, data: jsonObj[element] })
                    });
                return array
            })
    }
}