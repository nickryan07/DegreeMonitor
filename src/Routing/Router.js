import React from 'react';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import variables from "../../native-base-theme/variables/commonColor";

import Login from '../Screens/Login/Login';
import CreateAccount from '../Screens/Login/CreateAccount';
import Homepage from '../Screens/Main/Homepage';
import Settings from '../Screens/Main/Settings';
import GPA from '../Screens/Main/GPA';
import { Icon } from 'native-base';
import { commonStyles } from '../Styles';



//icons
/**
 * 1 - home, entypo
 * 2 - ios-school, ionicons
 * 3 - calendar, entypo
 * 4 - ios-settings, ionicons
 */
const loggedInStack = createBottomTabNavigator({
    Home: {
        screen: Homepage,
        navigationOptions: {
            headerLeft: null,
        }
    },
    GPA: {
        screen: GPA,
        navigationOptions: {
            headerLeft: null,
        }
    },
    Advising: {
        screen: Homepage,
        navigationOptions: {
            headerLeft: null,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerLeft: null,
        }
    },
}, {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: () => {
            let iconName = 'home';
            let iconType = 'Ionicons';
            if (navigation.state.routeName === 'Home') {
                iconName = 'home';
                iconType = 'Entypo'
            } else if (navigation.state.routeName === 'GPA') {
                iconName = 'ios-school';
                iconType = 'Ionicons'
            } else if (navigation.state.routeName === 'Advising') {
                iconName = 'calendar';
                iconType = 'Entypo'
            } else if (navigation.state.routeName === 'Settings') {
                iconName = 'ios-settings';
                iconType = 'Ionicons'
            }
            return <Icon type={iconType} name={iconName} size={25} style={commonStyles.icon}/>
        },
    }),
    tabBarOptions: {
        activeTintColor: variables.brandPrimary,
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#D4DCCB',//variables.containerBgColor,
        }
    }
})

const primaryRouteStack = createStackNavigator({
    Login: {
        screen: Login,
    },
    CreateAccount: {
        screen: CreateAccount,
    },
    Homepage: {
        screen: loggedInStack,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
            title: "DegreeMonitor"
        }
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