import React from 'react';
import { View, Platform, Image, StyleSheet } from 'react-native';
import CustomButton from 'react-native-really-awesome-button';
import logo from '../static/images/retro.png';
// import { Audio } from "expo";
import _ from 'lodash';
import { ListItem, Text } from "react-native-elements";
import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
    transports: ['websocket'],
})

var clicks = 0;
var target;
var name = null;
var setColor = true;
var enable = false;
var gameOn = false;
var first = true;


const colorArray = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blue', 'blueviolet',
    'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
    'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkgoldenrod', 'darkgrey', 'darkgreen', 'darkkhaki',
    'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategrey',
    'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'gold', 'goldenrod', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo',
    'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
    'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategrey', 'lightsteelblue', 'lightyellow',]

export default class Board extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            color: null,
            msg: null,
            bgActiveColor: null,
            btnColor: 'white',
            btc1: 'white', btc2: 'white', btc3: 'white', btc4: 'white', btc5: 'white', btc6: 'white',
            btc7: 'white', btc8: 'white', btc9: 'white', btc10: 'white', btc11: 'white', btc12: 'white',
            btc13: 'white', btc14: 'white', btc15: 'white', btc16: 'white', btc17: 'white', btc18: 'white',
            btc19: 'white', btc20: 'white', btc21: 'white', btc22: 'white', btc23: 'white', btc24: 'white',

        }

        name = this.props.navigation.state.params.name

        this.showWinner = this.showWinner.bind(this)
        this.resetClient = this.resetClient.bind(this)
        this.startGame = this.startGame.bind(this)
        this.lightTheFire = this.lightTheFire.bind(this)
        this.clickyClick = this.clickyClick.bind(this)
        this.stopGame = this.stopGame.bind(this)

        this.hideDialog = this.hideDialog.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.btcReset = this.btcReset.bind(this)

        //Throtteling click events
        this.throttledClick = _.throttle(this.clickyClick, 1500);

        socket.on('RETURN_TARGET', this.lightTheFire)

        //Asking for target button(EVENT) and starting game(ACTION)
        this.props.navigation.state.params.socket.on('START_GAME', this.startGame)

        //On getting target(EVENT)
        this.props.navigation.state.params.socket.on('RETURN_TARGET', this.lightTheFire)

        //Reset Button
        this.props.navigation.state.params.socket.on('RESET_BUTTON', this.btcReset)

        //On stop(EVENT)
        this.props.navigation.state.params.socket.on('STOP_GAME', this.stopGame)

        //Winner result (EVENT)
        this.props.navigation.state.params.socket.on('WINNER_NAME', this.showWinner)

        //On reset (EVENT)
        this.props.navigation.state.params.socket.on('RESET_CLIENT', this.resetClient)
    }

    startGame = function () {
        gameOn = true
        this.props.navigation.state.params.socket.emit('TARGET_BUTTON')
        this.showDialog('Game will now start', 'green')
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

    //Declaring Winner
    showWinner = function (winnerName) {
        if (winnerName != null) {
            this.props.navigation.state.params.socket.emit('RESET_SERVER')
            this.props.navigation.navigate('GameOverView', {}, {
                type: "Navigate",
                routeName: "SecondView",
                params: { winnerName: winnerName }
            })
        }
        this.props.navigation.state.params.socket.emit('STOP')
    }

    //Resetting variables
    resetClient = function () {
        target = 0
        clicks = 0
        gameOn = false
        setColor = true
        first = true
        this.props.navigation.state.params.socket.emit('RESET_SERVER')
    }

    //Game Over
    stopGame = function (stop) {
        if (stop) {
            this.showDialog(stop, 'red')
        }
        this.props.navigation.state.params.socket.emit('CAL_WINNER')
    }

    //Displaying target on Board
    lightTheFire = function (targetRecieved) {

        this.setState({ btnColor: colorArray[targetRecieved] }, function () {
            gameOn = true
            target = targetRecieved

            switch (targetRecieved) {
                case 1:
                    this.setState({ btc1: this.state.btnColor });
                    break;

                case 2:
                    this.setState({ btc2: this.state.btnColor });
                    break;

                case 3:
                    this.setState({ btc3: this.state.btnColor });
                    break;

                case 4:
                    this.setState({ btc4: this.state.btnColor });
                    break;

                case 5:
                    this.setState({ btc5: this.state.btnColor });
                    break;

                case 6:
                    this.setState({ btc6: this.state.btnColor });
                    break;

                case 7:
                    this.setState({ btc7: this.state.btnColor });
                    break;

                case 8:
                    this.setState({ btc8: this.state.btnColor });
                    break;

                case 9:
                    this.setState({ btc9: this.state.btnColor });
                    break;

                case 10:
                    this.setState({ btc10: this.state.btnColor });
                    break;

                case 11:
                    this.setState({ btc11: this.state.btnColor });
                    break;

                case 12:
                    this.setState({ btc12: this.state.btnColor });
                    break;

                case 13:
                    this.setState({ btc13: this.state.btnColor });
                    break;

                case 14:
                    this.setState({ btc14: this.state.btnColor });
                    break;

                case 15:
                    this.setState({ btc15: this.state.btnColor });
                    break;

                case 16:
                    this.setState({ btc16: this.state.btnColor });
                    break;

                case 17:
                    this.setState({ btc17: this.state.btnColor });
                    break;

                case 18:
                    this.setState({ btc18: this.state.btnColor });
                    break;

                case 19:
                    this.setState({ btc19: this.state.btnColor });
                    break;

                case 20:
                    this.setState({ btc20: this.state.btnColor });
                    break;

                case 21:
                    this.setState({ btc21: this.state.btnColor });
                    break;

                case 22:
                    this.setState({ btc22: this.state.btnColor });
                    break;

                case 23:
                    this.setState({ btc23: this.state.btnColor });
                    break;

                case 24:
                    this.setState({ btc24: this.state.btnColor });
                    break;

                default:
                    this.showDialog('HAHAHA this might be an error(color)', 'red');
                    break;
            }
        })


    }

    //Reseeting button
    btcReset = function (idRecieved, nameRecieved) {
        target = idRecieved
        if (first) {
            first = false
            this.props.navigation.state.params.socket.emit('START');
        }
        switch (idRecieved) {
            case 1:
                if (this.state.btc1 != 'white') {
                    this.setState({ btc1: 'white' }, function () {
                    });
                }
                break;

            case 2:
                if (this.state.btc2 != 'white') {
                    this.setState({ btc2: 'white' }, function () {
                    });
                }
                break;

            case 3:
                if (this.state.btc3 != 'white') {
                    this.setState({ btc3: 'white' }, function () {
                    });
                }
                break;

            case 4:
                if (this.state.btc4 != 'white') {

                    this.setState({ btc4: 'white' }, function () {
                    });

                }
                break;

            case 5:
                if (this.state.btc5 != 'white') {
                    this.setState({ btc5: 'white' }, function () {
                    });
                }
                break;

            case 6:
                if (this.state.btc6 != 'white') {
                    this.setState({ btc6: 'white' }, function () {
                    });
                }
                break;

            case 7:
                if (this.state.btc7 != 'white') {
                    this.setState({ btc7: 'white' }, function () {
                    });
                }
                break;

            case 8:
                if (this.state.btc8 != 'white') {
                    this.setState({ btc8: 'white' }, function () {
                    });
                }
                break;

            case 9:
                if (this.state.btc9 != 'white') {
                    this.setState({ btc9: 'white' }, function () {
                    });

                }
                break;

            case 10:
                if (this.state.btc10 != 'white') {
                    this.setState({ btc10: 'white' }, function () {
                    });
                }
                break;

            case 11:
                if (this.state.btc11 != 'white') {
                    this.setState({ btc11: 'white' }, function () {
                    });
                }
                break;

            case 12:
                if (this.state.btc12 != 'white') {
                    this.setState({ btc12: 'white' }, function () {
                    });
                }
                break;

            case 13:
                if (this.state.btc13 != 'white') {
                    this.setState({ btc13: 'white' }, function () {
                    });
                }
                break;

            case 14:
                if (this.state.btc14 != 'white') {
                    this.setState({ btc14: 'white' }, function () {
                    });
                }
                break;

            case 15:
                if (this.state.btc15 != 'white') {
                    this.setState({ btc15: 'white' }, function () {
                    });
                }
                break;

            case 16:
                if (this.state.btc16 != 'white') {
                    this.setState({ btc16: 'white' }, function () {
                    });
                }
                break;

            case 17:
                if (this.state.btc17 != 'white') {
                    this.setState({ btc17: 'white' }, () => {
                    });
                }
                break;

            case 18:
                if (this.state.btc18 != 'white') {
                    this.setState({ btc18: 'white' }, () => {
                    });
                }
                break;

            case 19:
                if (this.state.btc19 != 'white') {
                    this.setState({ btc19: 'white' }, function () {
                    });
                }
                break;

            case 20:
                if (this.state.btc20 != 'white') {
                    this.setState({ btc20: 'white' }, function () {
                    });
                }
                break;

            case 21:
                if (this.state.btc21 != 'white') {
                    this.setState({ btc21: 'white' }, function () {
                    });
                }
                break;

            case 22:
                if (this.state.btc22 != 'white') {
                    this.setState({ btc22: 'white' }, function () {
                    });

                }
                break;

            case 23:
                if (this.state.btc23 != 'white') {
                    this.setState({ btc23: 'white' }, function () {
                    });
                }
                break;

            case 24:
                if (this.state.btc24 != 'white') {
                    this.setState({ btc24: 'white' }, function () {
                    });
                }
                break;

            default:
                this.showDialog('HAHAHA this might be an error(click)', 'red');
                break;
        }
    }

    //To do on button click
    clickyClick = async function (idRecieved) {

        // const soundObject = new Expo.Audio.Sound();
        // try {

        //     await soundObject.loadAsync(require('./res/click.mp3'));
        //     await soundObject.playAsync();
        //     // Your sound is playing!
        // } catch (error) {

        //     // An error occurred!
        // }
        if (gameOn) {
            if (idRecieved == target) {
                this.props.navigation.state.params.socket.emit('COLLECTION', idRecieved);
            }
            else {
                this.btcReset(idRecieved, name)
            }
        }
    }

    //It's a surprize XD
    surprizeMe = function () {
        var randonIndex = Math.floor((Math.random() * 73) + 1)
        return randonIndex
    }

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'black',
            }} >
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center' }}>

                    <View style={{
                        paddingTop: 10,
                        flexDirection: 'row',
                        backgroundColor: 'black',
                    }} >
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='aliceblue' backgroundColor={this.state.btc1} raiseLevel={7} height={50} width={50} onPress={() => { this.throttledClick(1) /*this.clickyClick(1)*/ }} ><Text style={{ color: 'black' }} >
                            {}
                        </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='antiquewhite' backgroundColor={this.state.btc2} raiseLevel={7} height={50} width={50} onPress={() => { this.throttledClick(2) /*this.clickyClick(2)*/ }} ><Text style={{ color: 'black' }} >
                            {}
                        </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='aqua' backgroundColor={this.state.btc3} raiseLevel={7} height={50} width={50} onPress={() => { this.throttledClick(3) /*this.clickyClick(3)*/ }} ><Text style={{ color: 'black' }} >
                            {}
                        </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='aquamarine' backgroundColor={this.state.btc4} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(4)
                            //this.clickyClick(4)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='azure' backgroundColor={this.state.btc5} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(5)
                            //this.clickyClick(5)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='beige' backgroundColor={this.state.btc6} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(7)
                            //this.clickyClick(6)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'black',
                    }} >
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='bisque' backgroundColor={this.state.btc7} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(7)
                            //this.clickyClick(7)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='silver' backgroundColor={this.state.btc8} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(8)
                            //this.clickyClick(8)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='blue' backgroundColor={this.state.btc9} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(9)
                            //this.clickyClick(9)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='blueviolet' backgroundColor={this.state.btc10} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(10)
                            //this.clickyClick(10)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='brown' backgroundColor={this.state.btc11} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(11)
                            //this.clickyClick(11)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='burlywood' backgroundColor={this.state.btc12} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(12)
                            //this.clickyClick(12)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'black',
                    }} >
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='cadetblue' backgroundColor={this.state.btc13} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(13)
                            //this.clickyClick(13)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='chartreuse' backgroundColor={this.state.btc14} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(14)
                            //this.clickyClick(14)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='chocolate' backgroundColor={this.state.btc15} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(15)
                            //this.clickyClick(15)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='coral' backgroundColor={this.state.btc16} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(16)
                            //this.clickyClick(16)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='cornflowerblue' backgroundColor={this.state.btc17} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(17)
                            //this.clickyClick(17)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='cornsilk' backgroundColor={this.state.btc18} raiseLevel={7} height={50} width={50} onPress={() => {
                            this.throttledClick(18)
                            //this.clickyClick(18)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'black',
                    }} >
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='crimson' backgroundColor={this.state.btc19} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(19)
                            //this.clickyClick(19)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='cyan' backgroundColor={this.state.btc20} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(20)
                            //this.clickyClick(20)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='darkgray' backgroundColor={this.state.btc21} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(21)
                            //this.clickyClick(21)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='darkgreen' backgroundColor={this.state.btc22} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(22)
                            //this.clickyClick(22)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='darkkhaki' backgroundColor={this.state.btc23} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(23)
                            //this.clickyClick(23)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                        <View style={{ padding: 2, }}><CustomButton backgroundActive='darkorchid' backgroundColor={this.state.btc24} raiseLevel={10} height={50} width={50} onPress={() => {
                            this.throttledClick(24)
                            //this.clickyClick(24)
                        }} ><Text style={{ color: 'black' }} >
                                {}
                            </Text></CustomButton></View>
                    </View>


                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: 'grey',
                    justifyContent: 'center',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                }} >
                    <CustomButton onPress={async () => {
                        // const soundObject = new Expo.Audio.Sound();
                        // try {
                        //     await soundObject.loadAsync(require('./res/click.mp3'));
                        //     await soundObject.playAsync();
                        //     // Your sound is playing!
                        // } catch (error) {
                        //     // An error occurred!
                        // }
                        this.setState({ bgActiveColor: colorArray[this.surprizeMe()] })
                    }} backgroundActive={this.state.bgActiveColor} height={125} width={110} backgroundColor='white' raiseLevel={8} borderWidth={2} borderColor='black' backgroundDarker='black' >
                        <Image source={logo} style={{ height: 120, width: 84, }} />
                    </CustomButton>
                    {(() => {
                        switch (this.state.color) {
                            case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                            case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                            default: return <View />;
                        }
                    })()}
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    shadows: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 1 },
                shadowRadius: 10,
                shadowOpacity: 1,
            },
            android: {
                elevation: 4,
            }
        })
    },
})