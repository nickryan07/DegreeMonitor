import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Root, StyleProvider } from 'native-base';

import Router from './src/Routing/Router';
import variables from "./native-base-theme/variables/commonColor";
import getTheme from './native-base-theme/components';


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
            <Root>
                <StyleProvider style={getTheme(variables)}>
                    <Router />
                </StyleProvider>
                <StatusBar barStyle="light-content"/>
            </Root>
        );
    }
}
