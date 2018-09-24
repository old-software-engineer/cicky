import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Dialog } from '../../static/styles/Dialog';

class Alert extends PureComponent {
    render() {

        if (Platform.OS === 'ios') {
            switch (this.props.state.color) {
                case "red":
                    return <View style={ Dialog.red}><Text>{this.props.state.msg}</Text></View>;

                case "green":
                    return <View style={Dialog.green}><Text>{this.props.state.msg}</Text></View>;

                default:
                    return <View />;
            }
        }
        else {
            switch (this.props.state.color) {
                case "red":
                    return <View style={[styles.shadows, Dialog.red]}><Text>{this.props.state.msg}</Text></View>;

                case "green":
                    return <View style={[styles.shadows, Dialog.green]}><Text>{this.props.state.msg}</Text></View>;

                default:
                    return <View />;
            }
        }
    }
}

const mapStateToProps = (state) => {
    return ({ state: state })
}

export default connect(mapStateToProps)(Alert);