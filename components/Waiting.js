import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Platform, Image } from "react-native";
import { List, ListItem, Card, Icon } from 'react-native-elements';
import { Container, Footer, Content, Item, Input, Button } from "native-base";
import { showDialog, hideDialog } from '../actions/Actions';
import { connect } from 'react-redux';
import { Page } from "../static/styles/base";
import Board from './Board';
import ChatBox from './ChatBox';
import Alert from "./Dialogs/Alert";

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

class Waiting extends Component {

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
        super(props);

        this.showTimer = this.showTimer.bind(this);
        this.setData = this.setData.bind(this);
        this.NotEnoughPlayers = this.NotEnoughPlayers.bind(this);
        this.showMessage = this.showMessage.bind(this);

        //gettign players
        this.props.navigation.state.params.socket.on('PLAYER_LIST', this.setData = (nicknames) => this.setState({ data: nicknames }));

        //When minimun players=false(EVENT)
        this.props.navigation.state.params.socket.on('NOT_ENOUGH_PLAYERS', this.NotEnoughPlayers);

        //On Message
        this.props.navigation.state.params.socket.on('SHOW_MESSAGE', this.showMessage);

        //Asking for players
        this.props.navigation.state.params.socket.emit('SEND_PLAYER', this.setData);

        //On Time recieved
        this.props.navigation.state.params.socket.on('TIMER', this.showTimer);

        //On Chat message recieved
        this.props.navigation.state.params.socket.on('CHAT', (msg, name, color) => { this.setState({ chatColor: color, name: name, message: msg }) });
    }

    //Displaying server messages
    showMessage = function (msg, color) {
        if (msg === 'Starting game session. Starting count down.') {
            this.props.showDialog(msg, color)
            this.props.navigation.state.params.socket.emit('START_TIMER')
        }
        else {
            this.props.showDialog(msg, color)
        }
    }

    //Setting the data player list
    setData = function (names) {
        this.props.setData({ data: names })
    }

    //When players are not enough
    NotEnoughPlayers = function () {
        this.props.showDialog('Not enough players, try again in a little bit.', 'red')
    }

    //Showing Timer
    showTimer = function (timeLeft) {
        this.setState({ time: timeLeft })
        if (timeLeft < 1) {
            this.props.navigation.navigate('Board', { name: this.props.navigation.state.params.name, socket: this.props.navigation.state.params.socket })
        }
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
                    <Alert />
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

const mapDispatchToProps = (dispatchEvent) => {
    return {
        showDialog: (msg, color) => {
            dispatchEvent(showDialog(msg, color));
            setTimeout(() => { dispatchEvent(hideDialog()) }, 3000);
        },
    }
}

export default connect(null,mapDispatchToProps)(Waiting);