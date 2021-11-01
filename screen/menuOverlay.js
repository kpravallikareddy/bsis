import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text
} from 'react-native';

import styles from '../style/menuOverlayStyle.js'

export default class MenuOverlay extends Component {

    render() {
        let { 
            navigation,
            onToggleMenu 
        } = this.props
        return (
            <TouchableHighlight 
                onPress={() => {this.setState({open:!this.state.open})
                    
                }}
                style={styles.overlay}>
                <Text></Text>
            </TouchableHighlight>
        );
    }
}