import React, { Component } from 'react';
import {
    Image, TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

const defaultProps = {
    onStarButtonPressed: () => { },
    isStared: false
}
export default class StarButton extends React.Component {

    constructor(props) {
        super()
        this.state = {
            isStared: props.isStared
        }
    }

    static getDerivedStateFromProps(nextProp, prevState) {
        if (nextProp.isStared != prevState.isStared) {
            return {
                ...prevState,
                isStared: nextProp.isStared
            }
        }

    }
    render() {

        return (<TouchableOpacity
            {...this.props}
            activeOpacity={1}
            onPress={() => {
                this.setState((prevState) => {
                    return { ...prevState, isStared: !prevState.isStared }
                })
                this.props.onStarButtonPressed()
            }}>
            {this.state.isStared ?
                <Image
                    style={{ flex: 1 }}
                    source={require('./image/select_star.png')}
                    resizeMode={'contain'}
                /> :
                <Image
                    style={{ flex: 1 }}

                    source={require('./image/unselect_star.png')}
                    resizeMode={'contain'}


                />
            }
        </TouchableOpacity>
        )

    }
}
