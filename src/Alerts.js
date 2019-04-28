import { Alert } from 'react-native';

export const alertError = (err) => {
    // Works on both iOS and Android
    Alert.alert(
        'Error!',
        `${err}`,
        [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
}

export const alertSuccess = (err) => {
    // Works on both iOS and Android
    Alert.alert(
        'Success!',
        `${err}`,
        [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
}