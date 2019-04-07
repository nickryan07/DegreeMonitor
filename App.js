import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <StatusBar barStyle="light-content"/>
                <Expo.AppLoading />
            </React.Fragment>
        // <View style={styles.container}>
        //     <Text>Open up App.js to start working on your app!</Text>
        // </View>
        );
    }
}
