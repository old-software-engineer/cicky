import { StyleSheet, Platform } from "react-native";

export const App = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black'
    },
})

export const Page = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    }
})

export const GameOverStyle = StyleSheet.create({
    h2: {
        fontSize: 20,
        color: 'black',
        ...Platform.select({
            ios: {
                fontFamily: 'Kohinoor Telugu',
            },
            android: {
                fontFamily: 'Roboto',
            }
        })
    },
    h3: {
        fontSize: 14,
        color: 'black',
        ...Platform.select({
            ios: {
                fontFamily: 'Kohinoor Telugu',
            },
            android: {
                fontFamily: 'Roboto',
            }
        })
    }
})