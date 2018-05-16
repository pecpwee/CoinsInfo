import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native'

export default class ToolbarSearchBox extends React.Component {

    constructor() {
        super()
        this.state = {
            isInputBoxShow: false
        }


    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
                {this.state.isInputBoxShow ?
                    <TextInput style={{ flex: 1, width: 60 }}
                        onChangeText={
                            (text) => {
                                this.props.onChangeText(text)
                            }}
                    /> : null}

                <Button title={this.state.isInputBoxShow ? 'OK' : 'Search'} style={{ flex: 1, width: 70 }}
                    onPress={() => { this.setState({ ...this.state, isInputBoxShow: !this.state.isInputBoxShow }) }} />
            </View>
        )
    }
}