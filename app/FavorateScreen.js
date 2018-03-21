import React, { Component } from 'react';
import { View } from 'react-native'
import PriceListView from './PriceListView';
import PriceRemoteRepo from './PriceRemoteRepo';
import FavorateRepo from "./FavorateLocalRepo";

const defaultProp = {

}
export default class FavorateScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Favorate',
            tabBarOnPress({ previousScene, jumpToIndex, scene }) {
                jumpToIndex(scene.index);
                if (typeof (params.onTabFocused) == 'function') {
                    params.onTabFocused()
                }
            }

        };
    }

    constructor() {
        super()
        this.state = {
            completeListData: [],
            filteredListData: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onTabFocused: this._onTabFocused.bind(this)
        });
        this._fetchData()
    }
    componentWillUnmount() {

    }

    _onTabFocused() {
        this.setState((prevState) => {
            return {
                ...prevState
                , filteredListData: PriceRemoteRepo.filterArrayIfContainsKeywords(prevState.completeListData, ...FavorateRepo.getRawSet())
            }
        })

    }

    _onListItemPressed(itemName) {
        this.props.navigation.navigate('Detail', {
            itemName: itemName
        })

    }
    _onListItemFavorateChange(itemName) {
        //todo delete it！！！！
        FavorateRepo.delete(itemName)
        this.setState((prevState) => {
            return {
                ...prevState
                , filteredListData: PriceRemoteRepo.filterArrayIfContainsKeywords(prevState.completeListData, ...FavorateRepo.getRawSet())
            }
        })
    }

    async _fetchData() {
        this.setState((state) => {
            return { ...state, isRefreshing: true }
        })
        let dataObj = await PriceRemoteRepo.fetchDataFromWithCheckCache()
        this.setState((prevState) => {
            return {
                ...prevState
                , completeListData: dataObj.all
                , filteredListData: PriceRemoteRepo.filterArrayIfContainsKeywords(dataObj.all, ...FavorateRepo.getRawSet())
                , isRefreshing: false
            }
        })
    }

    render() {

        return (
            <PriceListView
                style={{ flex: 1 }}
                onRequestFresh={this._fetchData.bind(this)}
                datas={this.state.filteredListData}
                onListItemPressed={this._onListItemPressed.bind(this)}
                onListItemFavoratedChanged={this._onListItemFavorateChange.bind(this)}
                isRefreshing={this.state.isRefreshing}
                isItemStared={(name) => FavorateRepo.has(name)}
            />
        )
    }

}