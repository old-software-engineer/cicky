import { StyleSheet } from "react-native";

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

export const Dialog = StyleSheet.create({
    green: {
        padding: 20,
        margin: 20,
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#56F9BB'
    },
    red: {
        padding: 20,
        margin: 20,
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#f8577e'
    },
})