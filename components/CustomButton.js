import React, { Component } from 'react'
import { Text, TouchableHighlight, StyleSheet, } from 'react-native'

export default class CustomButton extends Component {
    render() {
        const { title, onPress } = this.props
        return (
            <TouchableHighlight style={styles.btnStyle} onPress={onPress}>

                <Text style={styles.txtStyle}>
                    {title}
                </Text>

            </TouchableHighlight>
        );
    }
}

//height: 50,
//width: 80,

const styles = StyleSheet.create({
    btnStyle: {
        alignSelf: 'stretch',
        padding: 5,
        backgroundColor: 'darkgrey',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: 'grey',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 8,
        marginLeft: 4,
    },

    txtStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
});