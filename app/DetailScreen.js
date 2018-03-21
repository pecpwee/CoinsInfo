import React, { Component } from 'react';
import { View, Text, Picker, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native'
import { VictoryChart, VictoryCandlestick, VictoryAxis, VictoryTheme, VictoryBar } from 'victory-native'

const URL_BASE = 'https://bb.otcbtc.com/api/v2/klines?'
export default class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        this.itemName = params ? params.itemName : null;

        return {
            title: itemName.replace('_', '/').toUpperCase()
        };
    }

    constructor() {
        super();
        this.state = {
            name: 'detail',
            candleDataArray: null,
            volumnDataArray: null,
            pickerIntervalVal: '1Days',
            isRefreshing: false
        }
        this.itemName = ''

    }

    componentDidMount() {
        this._fetchDataDefault(this.itemName)
    }

    /**
     * [
  [
    1517833860, // An integer represents the seconds elapsed since Unix epoch.
    0.001159,   // K line open price
    0.001162,   // K line highest price
    0.001157,   // K line lowest price
    0.001158,   // K line close price
    1000        // K line volume
  ],
]
     */

    _fetchData(marketname, count, period) {
        this.setState((prevstate, props) => {
            return {
                ...prevstate
                , isRefreshing: true
            }
        })

        let requestMarketName = marketname.replace('_', '')

        //market=otbeth&limit=10&period=1
        let requestUrl = URL_BASE + `market=${requestMarketName}&limit=${count}&period=${period}`
        fetch(requestUrl, {
            method: 'GET'
        })
            .then((response) => {
                if (response.ok) {
                    console.log('get data ok')
                    return response.json()
                }
            })
            .then((serverKlineArray) => {
                let klinesData = [];
                let volumnData = []
                for (var i = 0; i < serverKlineArray.length; i++) {
                    klinesData.push(
                        {
                            x: this._getTimeForLineChart(serverKlineArray[i][0])
                            , open: serverKlineArray[i][1]
                            , close: serverKlineArray[i][4]
                            , high: serverKlineArray[i][2]
                            , low: serverKlineArray[i][3]
                        })
                    volumnData.push({
                        x: this._getTimeForLineChart(serverKlineArray[i][0])
                        , y: serverKlineArray[i][5]
                    })
                }


                this.setState((prevstate, props) => {
                    return {
                        ...prevstate
                        , candleDataArray: klinesData
                        , volumnDataArray: volumnData
                        , isRefreshing: false
                    }
                })

            })
            .catch((error) => {
                this.setState((prevstate, props) => {
                    return {
                        ...prevstate,
                        isRefreshing: false
                    }
                })
            })
    }
    _fetchDataDefault(marketname) {
        this._fetchData(marketname, 30, 1440)
    }
    _getTimeForLineChart(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        // let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate();
        let hour = a.getHours();
        // let min = a.getMinutes();
        // let sec = a.getSeconds();
        let time = month + '/' + date
        return time;
    }

    render() {

        const { params = {} } = this.props.navigation.state;
        this.itemName = params ? params.itemName : null;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ top: 0, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{
                        alignItems: 'center'
                        , justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 18, textAlign: 'center' }} >
                            Time Interval
                        </Text>
                    </View>
                    <Picker style={{ width: 150 }}
                        selectedValue={this.state.pickerIntervalVal}
                        onValueChange={(value, pos) => {
                            this.setState((prevstate, props) => {
                                return {
                                    ...prevstate,
                                    pickerIntervalVal: value
                                }
                            })

                            this._fetchData(this.itemName, 30, value)
                        }}
                        mode={"dropdown"}
                    >
                        {/* <Picker.item label='5Min' value='5' /> */}
                        {/* <Picker.item label='1Hours' value='60' /> */}
                        {/* <Picker.item label='6Hours' value='360' /> */}
                        {/* <Picker.item label='12Hours' value='720' /> */}
                        <Picker.Item label="1Days" value="1440" />
                        <Picker.Item label="3Days" value="4320" />
                        <Picker.Item label="7Days" value="10080" />

                    </Picker>


                </View>
                <ScrollView style={{ flex: 1 }}
                    onStartShouldSetResponderCapture={() => true}
                    onMoveShouldSetResponderCapture={() => true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => {
                                this._fetchData()
                            }}
                        >
                        </RefreshControl>
                    }
                >
                    <View>
                        {this.state.candleDataArray != null && this.state.candleDataArray.length > 0 ?
                            (
                                <VictoryChart>
                                    <VictoryAxis label={'date'} tickCount={7} />
                                    <VictoryAxis dependentAxis label={'price'} />
                                    <VictoryCandlestick
                                        candleColors={{ positive: "red", negative: "green" }}

                                        data={this.state.candleDataArray} /></VictoryChart>
                            ) : null}
                        {this.state.volumnDataArray != null && this.state.volumnDataArray.length > 0 ? (
                            <VictoryChart                >
                                <VictoryAxis label={'date'} tickCount={7} />
                                <VictoryAxis dependentAxis label={'volumn'} />

                                <VictoryBar
                                    data={this.state.volumnDataArray}
                                />
                            </VictoryChart>) : null}
                        {this.hasCandleData && this.hasVolumnData == false ?
                            (<Text style={{ flex: 1, fontSize: 20 }}>
                                No Data available,Server not ready
                        </Text>) : null
                        }
                    </View>

                </ScrollView >
            </View >)
    }

}