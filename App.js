import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Root, StyleProvider } from 'native-base';
import { AppLoading } from 'expo';
import Meteor, { withTracker } from 'react-native-meteor';

import Router from './src/Routing/Router';
import variables from "./native-base-theme/variables/commonColor";
import getTheme from './native-base-theme/components';


import config from './config.json';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            fontsLoaded: false,
        }
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
            'Entypo': require('@expo/vector-icons/fonts/Entypo.ttf'),
        });
        
        this.setState({fontsLoaded: true});
    }

    componentWillMount() {
        this.loadFonts();
        Meteor.connect('ws://' + config.serverAddress + ':3000/websocket');
    }

    render() {
        const { fontsLoaded } = this.state;
        if(!fontsLoaded) {
            return ( 
                <React.Fragment>
                    <StatusBar barStyle="light-content"/>
                    <AppLoading /> 
                </React.Fragment>
            );
        }

        return (
            <Root>
                <StyleProvider style={getTheme(variables)}>
                    <Router />
                </StyleProvider>
                <StatusBar barStyle="light-content"/>
            </Root>
        );
    }
}

export default withTracker( () => {
    return {
        currentUser: Meteor.user(),
    }
})(App);
