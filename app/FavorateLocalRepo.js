import React, {Component} from 'react';
import {AsyncStorage} from 'react-native'

const KEY_FAVORATE_LIST_SET = 'favoratelist'
const FavorateItemSet = new Set()

export default class FavorateRepo {

    static add(item) {
        if (item === null) {
            return
        }
        FavorateItemSet.add(item)
    }

    static delete(item) {
        if (item === null) {
            return
        }
        FavorateItemSet.delete(item)
    }

    static getRawSet() {
        return FavorateItemSet
    }

    static has(item) {
        return FavorateItemSet.has(item)
    }

    static async loadFavorateSet() {
        try {
            const strVal = await AsyncStorage.getItem(KEY_FAVORATE_LIST_SET)
            let array = JSON.parse(strVal)
            let resultSet = new Set()
            array.forEach((v) => {
                resultSet.add(v)
            })

            FavorateItemSet = resultSet
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    static async saveFavorateSet() {
        let array = Array.from(FavorateItemSet);
        let arrayVal = JSON.stringify(array)
        try {
            const value = await AsyncStorage.setItem(KEY_FAVORATE_LIST_SET, arrayVal)
        } catch (error) {
            console.log(error)
        }
    }
}
