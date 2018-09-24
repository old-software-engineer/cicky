import React from "react";
import { View, StyleSheet, BackHandler, Platform, BackAndroid } from "react-native";
// import { Audio } from 'expo';
import { Button, Icon, Text } from "react-native-elements";
import { GameOverStyle } from '../static/styles/base';

export default class GameOver extends React.Component {
    constructor(props) {
        super(props)
        // this.play()
    }

    // play = async () => {
    //     const soundObject = new Expo.Audio.Sound();
    //     try {
    //         await soundObject.loadAsync(require('./res/winner.mp3'));
    //         await soundObject.playAsync();
    //         // Your sound is playing!
    //     } catch (error) {
    //         // An error occurred!
    //     }
    // }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        this.props.navigation.navigate('Login');
        return true;
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <Text style={GameOverStyle.h2}>Winner:</Text>
                <Text style={[GameOverStyle.h2, { fontWeight: 'bold' }]}>{this.props.navigation.state.params.winnerName}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }} >
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            raised
                            name='replay'
                            type='simple-community-icons'
                            color='#f50'
                            onPress={() => this.props.navigation.navigate('Login')} />
                        <Text style={[GameOverStyle.h3, style = { fontWeight: 'bold' }]}>Play again</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            raised
                            name='exit-to-app'
                            type='material-community-icons'
                            color='#f50'
                            onPress={() => {
                                Platform.select({
                                    android: BackAndroid.exitApp(),
                                })
                            }} />
                        <Text style={[GameOverStyle.h3, style = { fontWeight: 'bold' }]}>Exit</Text>
                    </View>
                </View>
            </View>
        );
    }
}
