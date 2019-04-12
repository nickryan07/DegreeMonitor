import React from 'react';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import variables from "../../native-base-theme/variables/commonColor";

import Login from '../Screens/Login/Login';
import CreateAccount from '../Screens/Login/CreateAccount';

const primaryRouteStack = createStackNavigator({
    Login: {
        screen: Login,
        
    },
    CreateAccount: {
        screen: CreateAccount,
    }
}, {
    
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:  variables.containerBgColor,
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 0,
        },
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
        headerTintColor: variables.brandPrimary,
    }, 
});

export default createAppContainer(primaryRouteStack);