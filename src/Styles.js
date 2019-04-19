import { StyleSheet, StatusBar, Image } from 'react-native';
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
    icon: {
        color: variables.brandPrimary,
    },
    greenText: {
        color: variables.brandPrimary,
    },
    lightText: {
        color: variables.brandTextLight,
    },
    listItemStyle: {
        paddingBottom: 100
    }
});