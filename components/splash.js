import React from "react";
import { View } from "react-native";
import { Text, Avatar } from "react-native-elements";
import Img from '../static/images/retro_logo.png';
import FadeInView from './FadeIn';
import { Page } from "../static/styles/base";

export default class Splash extends React.PureComponent {
    componentDidMount() {
        setTimeout(() => { this.props.navigation.navigate('Login') }, 5000)
    };
    render() {
        return (
            <View style={Page.body}>
                <Avatar 
                large
                rounded
                activeOpacity={0.7}
                source={Img}
                />
                <FadeInView time={4000}>
                    <Text h2>Welcome to Clicky</Text>
                </FadeInView>
            </View>
        )
    }
}