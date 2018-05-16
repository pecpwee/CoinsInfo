import React, { Component } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import StarButton from './StarButton';
import { PriceRemoteRepo } from "./PriceRemoteRepo";

const defaultProps = {
    onRequestFresh: () => { },
    datas: [],
    onListItemPressed: () => { },
    onListItemFavoratedChanged: (name) => { },
    isItemStared: (name) => { },
    isRefreshing: false
}

export default class PriceListView extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }


    _renderListItem({ item }) {
        return (

            <View style={{
                height: 70
            }}
            >
                <TouchableOpacity style={{
                    flex: 1
                    , flexDirection: 'row'
                    , alignItems: 'center'
                    , justifyContent: "space-between"
                }}
                    onPress={() => {
                        this.props.onListItemPressed(item.name)
                    }}
                >
                    <Text style={{ flex: 3, width: 110, fontSize: 25 }}>
                        {item.name.replace('_', '/').toUpperCase()}
                    </Text>
                    <View style={{
                        width: 70, flex: 1
                    }}>
                        <Text style={{ flex: 1, fontSize: 10 }}>
                            {'last: ' + item.data.ticker.last.substring(0, 7)}
                        </Text>

                        <Text style={{ flex: 1, fontSize: 10 }}>
                            {'vol:  ' + item.data.ticker.vol.substring(0, 7)}
                        </Text>
                        <Text style={{ flex: 1, fontSize: 10, color: 'red' }}>
                            {'low:  ' + item.data.ticker.low.substring(0, 7)}
                        </Text>
                        <Text style={{ flex: 1, fontSize: 10, color: 'green' }}>
                            {'high: ' + item.data.ticker.high.substring(0, 7)}
                        </Text>
                    </View>
                    <StarButton
                        style={{ flex: 1, width: 25, height: 25 }}
                        onStarButtonPressed={
                            () => {
                                this.props.onListItemFavoratedChanged(item.name)
                            }
                        }
                        isStared={this.props.isItemStared(item.name)}
                    >

                    </StarButton>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        return (
            <FlatList
                {...this.props}
                data={this.props.datas}
                ItemSeparatorComponent={() => {
                    return (<View style={{ backgroundColor: 'black', height: 2 }}>
                    </View>)
                }}

                onRefresh={() => { this.props.onRequestFresh() }}
                refreshing={this.props.isRefreshing}
                renderItem={this._renderListItem.bind(this)}

            />

        )
    }
}