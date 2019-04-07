import React from 'react';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import variables from "../../native-base-theme/variables/commonColor";

import Login from '../Screens/Login/Login';

const primaryRouteStack = createStackNavigator({
    Login: {
        screen: Login,
        
    }, 
}, {
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