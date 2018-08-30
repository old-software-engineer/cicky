import React from 'react';
import { BackHandler, Text, View, StyleSheet, TextInput, Button, ToastAndroid, Image, Platform, ScrollView, KeyboardAvoidingView } from 'react-native'
import Board from './Board';
import io from 'socket.io-client';
import CusButton from "./CustomButton";
import Logo from '../static/images/retro_logo.png';
import { base } from "../static/styles/base";
import { IosStyles } from '../static/styles/Ios';
import { AndroidStyles } from '../static/styles/Android';

const socketUrl = 'ws://clicky96server.herokuapp.com'
const socketEndPoint = 'https://socket-io-expo-backend-dtyxsdtzxb.now.sh'

export default class Login extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            passName: null,
            socket: null,
            data: null,
            isConnected: false,
            players: null,
        }
        this.setName = this.setName.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.hideDialog = this.hideDialog.bind(this)

    }

    setName = function () {
        if (this.state.name) {
            this.state.socket.emit('RECIEVE_USER_NAME', this.state.name)
            this.props.navigation.navigate('BoardNavigator', {},
                {
                    type: "Navigate",
                    routeName: "SecondView",
                    params: { name: this.state.name, socket: this.state.socket }
                }
            )
        }
        else {
            this.showDialog('Can not leave the name blank', 'red')
        }
    }

    //Alert dialog
    showDialog = function (message, color) {
        this.setState({ msg: message })
        this.setState({ color: color })
        setTimeout(this.hideDialog, 3000)
    }

    //Disposing alert
    hideDialog = function () {
        this.setState({ msg: null })
        this.setState({ color: null })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Can not go back now', ToastAndroid.SHORT);
        return true;
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        const skt = io(socketEndPoint, {
            transports: ['websocket'],
        });

        skt.on('ping', data => {
            this.setState(data);
        });

        const socket = io(socketUrl, {
            transports: ['websocket'],
        })

        //socket.emit('SEND_PLAYER')
        //socket.on('PLAYER_LIST', (player)=>{this.setState({players: player})})

        this.setState({ socket: socket })
        this.setState({ passName: this.state.name })

    }

    androidLogin = function () {
        return (
            <View style={AndroidStyles.login} >
                <KeyboardAvoidingView behavior='padding' enabled>
                    <Image source={Logo} style={{ alignSelf: 'center', width: 70, height: 100, }} />
                    <View>
                        <TextInput style={{ padding: 10, color: 'white', }} placeholder={'Enter your name'} placeholderTextColor={'white'} onChangeText={(text) => this.setState({ name: text })} underlineColorAndroid='white' />
                    </View>
                    <Button title='Submit' onPress={this.setName} color='grey' />
                    {/* <Text style={styles.h2}>
                        ping response: {this.state.data}
                    </Text> */}
                </KeyboardAvoidingView>
                {(() => {
                    switch (this.state.color) {
                        case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                        case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                        default: return <View />;
                    }
                })()}
            </View>

        )
    }

    iosLogin = function () {
        return (
            <ScrollView behavior='padding' style={IosStyles.login} >
                <KeyboardAvoidingView behavior='padding' enabled>
                    <View style={{ marginTop: 200, alignItems: 'stretch', }}>
                        <Image source={Logo} style={{ alignSelf: 'center', width: 70, height: 100, }} />
                        <View>
                            <TextInput style={{ margin: 20, padding: 10, backgroundColor: 'grey' }} placeholder={'Enter your name'} placeholderTextColor={'white'} onChangeText={(text) => this.setState({ name: text })} />
                        </View>
                        <CusButton title='Submit' onPress={this.setName} />
                        {/* <Text style={styles.h2}>
                            ping response: {this.state.data}
                        </Text> */}
                    </View>
                </KeyboardAvoidingView>
                {(() => {
                    switch (this.state.color) {
                        case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                        case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                        default: return <View />;
                    }
                })()}
            </ScrollView>
        )
    }

    render() {
        if (Platform.OS === 'ios') {

            return this.iosLogin()
        }
        else {

            return this.androidLogin()
        }

    }
}

const styles = StyleSheet.create({
    h2: {
        color: 'white',
        fontSize: 20,
        ...Platform.select({
            ios: {
                fontFamily: 'Kohinoor Telugu',
            },
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
});

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSocket(socketRecieved) {
            dispatch(setSocket(socketRecieved));
        },

        setName(nameRecieved) {
            dispatch(setName(nameRecieved));
        },

        showDialog(message, colour) {
            dispatch(showDialog(message, colour));
            setTimeout(() => { dispatch(hideDialog()) }, 3000);
        },

    }
}