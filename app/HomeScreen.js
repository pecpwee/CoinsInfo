import React, { Component } from 'react';
import { View, Text, FlatList, Picker, TextInput, Alert } from 'react-native'
import ToolbarSearchBox from './ToolbarSearchBox'
import FavorateRepo from "./FavorateLocalRepo";
import PriceRemoteRepo from "./PriceRemoteRepo";
import PriceListView from "./PriceListView";


export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <ToolbarSearchBox onChangeText={params.onChangeSearchBoxText} />
            , title: 'Price'
            , tabBarOnPress({ previousScene, jumpToIndex, scene }) {
                jumpToIndex(scene.index);
                params.onTabFocused()

            }
        };
    }

    constructor() {
        super()
        this.state = {
            isRefreshing: false
            , datas: {
                all: [],
                eth: [],
                btc: [],
                cny: []
            }
            , currentShowListData: []
            , coinBaseUnitKeyword: 'all'
            , searchBoxKeyWord: ''
            , coinBaseNames: []
        }
    }

    async _fetchRemoteData() {
        this.setState((prevState) => {
            return { ...prevState, isRefreshing: true }
        })
        let resultObj = await PriceRemoteRepo.fetchDataFromServer();

        try {
            this.setState((prevState) => {
                return {
                    ...prevState
                    , isRefreshing: false
                    , completeListData: resultObj.all
                    , coinBaseNames: resultObj.coinBaseNames
                    , datas: resultObj,
                    currentShowListData:
                        PriceRemoteRepo.filterArrayByKeywords(resultObj[prevState.coinBaseUnitKeyword]
                            , prevState.searchBoxKeyWord)
                }
            })

        } catch (error) {
            this.setState((prevState) => {
                return { ...prevState, isRefreshing: false }
            })
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            onChangeSearchBoxText: this.onChangeSearchBoxText.bind(this),
            onTabFocused: this._onTabFocused.bind(this)
        });
        this._fetchRemoteData()
        FavorateRepo.loadFavorateSet()


    }
    _onTabFocused() {//maybe change the favorate item
        this.setState((prevState) => {
            return {
                ...prevState
            }
        })

    }

    componentWillUnmount() {
        FavorateRepo.saveFavorateSet()
    }

    onChangeSearchBoxText(text) {
        this.setState((prevState, props) => {
            return {
                ...prevState, searchBoxKeyWord: text
                , currentShowListData: PriceRemoteRepo.filterArrayByKeywords(
                    prevState.datas[prevState.coinBaseUnitKeyword], text)
            }
        })
    }

    _onListItemPressed(itemName) {
        this.props.navigation.navigate('Detail', {
            itemName: itemName
        })
    }


    _onListItemFavorateChange(itemName) {
        if (FavorateRepo.has(itemName)) {
            FavorateRepo.delete(itemName)
        } else {
            FavorateRepo.add(itemName)
        }
    }


    _onCoinBaseChanged(value) {
        this.setState((prevState, props) => {
            return {
                ...prevState, coinBaseUnitKeyword: value
                , currentShowListData: PriceRemoteRepo.filterArrayByKeywords(prevState.datas[value], prevState.searchBoxKeyWord)
            }
        })
    }

    _filterCoinbas
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ top: 0, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Picker style={{ width: 100 }}
                        selectedValue={this.state.coinBaseUnitKeyword}
                        onValueChange={(value, pos) => {
                            this._onCoinBaseChanged(value)
                        }}
                        mode={"dropdown"}
                    >
                        {
                            (this.state.coinBaseNames.length > 0) ?
                                this.state.coinBaseNames.map((value, key) =>
                                    <Picker.Item label={value.toUpperCase()} value={value.toLowerCase()} key={key} />
                                ) : []
                        }

                        {/* <Picker.Item label="ALL" value="all" />
                        <Picker.Item label="CNY" value="cny" />
                        <Picker.Item label="BTC" value="btc" />
                        <Picker.Item label="ETH" value="eth" />*/}
                    </Picker>
                </View>
                <PriceListView
                    style={{ flex: 1 }}
                    onRequestFresh={this._fetchRemoteData.bind(this)}
                    datas={this.state.currentShowListData}
                    onListItemPressed={this._onListItemPressed.bind(this)}
                    onListItemFavoratedChanged={this._onListItemFavorateChange.bind(this)}
                    isRefreshing={this.state.isRefreshing}
                    isItemStared={(name) => FavorateRepo.has(name)}
                />

            </View >
        )
    }
}

