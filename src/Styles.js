import { StyleSheet } from 'react-native';
import variables from "../native-base-theme/variables/commonColor";


export const commonStyles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column', 
        justifyContent: 'center',
    },
    formField: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    title: {
        marginTop: 25, 
        marginBottom: 15,
        alignSelf: 'center',
        color: variables.brandPrimary,
    },
    card: {
        backgroundColor: variables.brandTextLight,
        margin: 20,
    },
    cardItem: {
        backgroundColor: variables.containerBgColor,
    },
    cardBody: {
        backgroundColor: variables.containerBgColor,
        alignSelf: 'center',
        margin: 45
    },
    cardIcon: {
        color: variables.brandPrimary,
        fontSize: 18,
        marginRight: 2,
        marginLeft: 2,
    },
    icon: {
        color: variables.brandPrimary,
    },
    headerIcon: {
        color: variables.brandPrimary,
        fontSize: 26,
    },
    greenText: {
        color: variables.brandPrimary,
    },
    lightText: {
        color: variables.brandTextLight,
    },
    listItemStyle: {
        paddingBottom: 10
    },
    settingsItem: {
        marginTop: 18,
        marginLeft: 10,
        color: variables.brandTextLight
    },
    settingsPicker: {
        marginTop: 14,
        marginLeft: 10,
        color: variables.brandTextLight
    },
});