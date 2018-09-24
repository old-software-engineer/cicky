import React from 'react';
import { View, ScrollView, } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Container, Footer, Content, Item, Input, Button } from 'native-base';

var index = 0;

export default class ChatBox extends React.PureComponent {
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
        else {
            debugger
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
        } debugger
    }
}