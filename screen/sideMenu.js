import React, { Component } from 'react';
import {
    View, 
    Text 
} from 'react-native';

import MenuList from './containers/MenuList'
import MenuOverlay from './containers/MenuOverlay'

import styles from './style/SideMenuStyle'

export default class SideMenu extends Component {
    render() {        
        let { 
            navigation,
            onToggleMenu 
        } = this.props

        return (
            <View style={styles.container}>
                <MenuOverlay 
                    onToggleMenu={onToggleMenu}
                    navigation={navigation}
                />
                <View style={styles.menu}>
                    <MenuList 
                        onToggleMenu={onToggleMenu}
                        navigation={navigation} 
                    />
                </View>
            </View>
        );
    }
}