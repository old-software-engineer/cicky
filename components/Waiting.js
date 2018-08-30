import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Platform, Image } from "react-native";
import { List, ListItem, Card, Icon } from 'react-native-elements';
import Board from './Board';
import { Container, Footer, Content, Item, Input, Button } from "native-base";

var index = 0;

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: {},
            textTemp: ''
        }
    }

    render() {
        console.log(typeof (this.state.text))
        var i = index;
        if (this.props.message) {
            return (
                <Container>
                    <Content>
                        <ScrollView>{
                            !this.state.textTemp || !this.props.name ?
                                <View><Text></Text></View>
                                :
                                <View><Text>{this.props.name} is typing...</Text></View>
                        }
                            {<View backgroundColor={this.props.color}>
                                {this.props.name}:
                                {
                                    Object.keys(this.state.text).map((item, index) => (
                                        item
                                    ))
                                }
                                {/* <View backgroundColor={this.props.color} style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item}:</Text>
                                            <Text style={{ alignSelf: 'center' }}>{}</Text>
                                        </View> */}
                            </View>}
                        </ScrollView>
                    </Content>
                    <Item style={{ flexDirection: 'row' }}>
                        <Input ref='myTextInput' placeholder='Enter chat message' onChangeText={(text) => this.setState({ textTemp: text })} />
                        <Button style={{ paddingVertical: 10, justifyContent: 'center', paddingHorizontal: 20 }} onPress={() => {
                            this.refs.myTextInput.setNativeProps({ text: null }); this.props.socket.emit('CHAT_RECIEVED', this.state.textTemp);
                            this.setState({
                                text: {
                                    name: this.props.name,
                                    message: this.props.message
                                }
                            })
                        }}>
                            <Icon name='send' type='font-awesome' />
                        </Button>
                    </Item>
                </Container>
            )
        }
        else {debugger
            return (
                <Container>
                    <Content>
                        <ScrollView>
                            {
                                !this.state.textTemp || !this.props.name ?
                                    <View><Text></Text></View>
                                    :
                                    <View><Text>{this.props.name} is typing...</Text></View>
                            }
                        </ScrollView>
                    </Content>
                    <Item style={{ flexDirection: 'row' }}>
                        <Input ref='myTextInput2' placeholder='Enter chat message' onChangeText={(text) => this.setState({ text })} />
                        <Button style={{ paddingVertical: 10, justifyContent: 'center', paddingHorizontal: 20 }} onPress={() => { this.refs.myTextInput2.setNativeProps({ text: '' }); this.props.socket.emit('CHAT_RECIEVED', this.state.text) }}>
                            <Icon name='send' type='font-awesome' />
                        </Button>
                    </Item>
                </Container>
            )
        }debugger
    }
}

class FetchData extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                {
                    this.props.data.map((item, index) => (
                        <List containerStyle={{ marginTop: 0 }}>
                            <ListItem
                                hideChevron
                                key={index}
                                title={item}
                                leftIcon={{ type: 'font-awesome', name: 'user-secret' }} />
                        </List>
                    ))
                }
            </View>
        );
    }
}

export default class Waiting extends Component {

    state = {
        name: this.props.navigation.state.params.name,
        data: null,
        time: null,
        color: null,
        message: null,
        name: null,
        chatColor: null,
    }
    constructor(props) {
        super(props)

        this.showTimer = this.showTimer.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.NotEnoughPlayers = this.NotEnoughPlayers.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.setData = this.setData.bind(this)
        this.showMessage = this.showMessage.bind(this)

        //gettign players
        this.props.navigation.state.params.socket.on('PLAYER_LIST', this.setData = (nicknames) => this.setState({ data: nicknames }))

        //When minimun players=false(EVENT)
        this.props.navigation.state.params.socket.on('NOT_ENOUGH_PLAYERS', this.NotEnoughPlayers)

        //On Message
        this.props.navigation.state.params.socket.on('SHOW_MESSAGE', this.showMessage)

        //Asking for players
        this.props.navigation.state.params.socket.emit('SEND_PLAYER', this.setData)

        //On Time recieved
        this.props.navigation.state.params.socket.on('TIMER', this.showTimer)

        //On Chat message recieved
        this.props.navigation.state.params.socket.on('CHAT', (msg, name, color) => { this.setState({ chatColor: color, name: name, message: msg }) })
    }

    //Displaying server messages
    showMessage = function (msg, color) {
        if (msg === 'Starting game session. Starting count down.') {
            this.showDialog(msg, color)
            this.props.navigation.state.params.socket.emit('START_TIMER')
        }
        else {
            this.showDialog(msg, color)
        }
    }

    //Setting the data player list
    setData = function (names) {
        this.setData({ data: names })
    }

    //When players are not enough
    NotEnoughPlayers = function () {
        this.showDialog('Not enough players, try again in a little bit.', 'red')
    }

    //Showing Timer
    showTimer = function (timeLeft) {
        this.setState({ time: timeLeft })
        if (timeLeft < 1) {
            this.props.navigation.navigate('Board', { name: this.props.navigation.state.params.name, socket: this.props.navigation.state.params.socket })
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

    render() {
        if (this.state.data) {
            return (
                <View style={{
                    flex: 1,
                }}>
                    <FetchData socket={this.props.navigation.state.params.socket} data={this.state.data} />
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{this.state.time}</Text>
                    <ChatBox socket={this.props.navigation.state.params.socket} message={this.state.message} name={this.state.name} color={this.state.chatColor} />
                    {
                        (() => {
                            switch (this.state.color) {
                                case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                                case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                                default: return <View />;
                            }
                        })()
                    }
                </View>
            )
        }
        else {
            return (
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 60, width: 60 }} source={require('../static/images/load.gif')} />
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    shadows: {
        ...Platform.select({
            ios: {
                shadowColor: 'grey',
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