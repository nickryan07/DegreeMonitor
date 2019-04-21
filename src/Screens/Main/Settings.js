import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Input, Form, Label, Picker, Content, Title, List, Button, Item, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';


const platform = Platform.OS;
const styles = StyleSheet.create({
    listItemStyle: {
        minWidth: 80
    }, 
    logoutButton: {
        margin: 20,
        alignSelf: 'center'
    },
    pickerAndroid: {
        minWidth: 30,
        color: variables.brandPrimary,
        marginLeft: 10,
    },
    pickerIOS: {
        minWidth: 30,
        marginLeft: 10,
    }
});

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            major: props.currentUser.profile.major,
            fName: props.currentUser.profile.firstName,
            lName: props.currentUser.profile.lastName,
            hoursTaken: props.currentUser.profile.hoursTaken,
            currentGPA: props.currentUser.profile.currentGPA,
        }
    }

    handleSignOut = () => {
        Meteor.logout((error) => {
            if(error) {
                alertAPI(error.reason);
            } else {
                this.props.navigation.navigate('Login');
            }
        })
    }

    onValueChange(value) {
        this.setState({
            major: value
        });
    }

    render() {
        const { fName, lName, hoursTaken, currentGPA, major } = this.state;
        return (
            <Container style={commonStyles.container}>
                <Header headerTitle="Settings" iconName="ios-save"/>
                <Content padder>
                {this.props.currentUser ? 
                    <Form>
                        <Item>
                            <Left>
                                <Text style={commonStyles.lightText}>First Name</Text>
                            </Left>
                                
                            <Input label="First Name" placeholderTextColor={variables.brandPrimary} value={fName} style={{color: variables.brandPrimary}} placeholder="Current Name"></Input>
                            
                        </Item>
                        <Item>
                            <Left>
                                <Text style={commonStyles.lightText}>Last Name</Text>
                            </Left>
                            
                                
                            <Input placeholderTextColor={variables.brandPrimary} value={lName} style={{color: variables.brandPrimary}} placeholder="Current Last Name"></Input>
                            
                        </Item>
                        <Item>
                            <Left>
                                <Text style={commonStyles.lightText}>
                                    Major: 
                                </Text>
                            </Left>
                                <Picker
                                    mode="dialog"
                                    iosHeader="Select major"
                                    iosIcon={<Icon style={commonStyles.greenText} name="arrow-down" />}
                                    itemTextStyle= {{ color: variables.brandPrimary}}
                                    headerStyle = {{ backgroundColor: variables.containerBgColor}}
                                    textStyle = {{ color: variables.brandPrimary}}
                                    style={ platform === "ios" ? styles.pickerIOS : styles.pickerAndroid}
                                    headerBackButtonTextStyle= {{ color: variables.brandPrimary }}
                                    headerTitleStyle={{ color: '#ffffff' }}
                                    selectedValue={major}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                    {/* TODO: load these from the back end? */}
                                    <Picker.Item label="Computer Engineering" value="Computer Engineering" />
                                    <Picker.Item label="Computer Science" value="Computer Science" />
                                    <Picker.Item label="Software Engineering" value="Software Engineering" />
                                </Picker>
                        </Item>
                        <Item>
                            <Left>
                                <Text style={commonStyles.lightText}>Hours Completed</Text>
                            </Left>
                            
                                
                            <Input placeholderTextColor={variables.brandPrimary} value={String(hoursTaken)} style={{color: variables.brandPrimary}} placeholder="Hours Completed"></Input>
                            
                        </Item>
                        <Item>
                            <Left>
                                <Text style={commonStyles.lightText}>Current GPA</Text>
                            </Left>
                            
                                
                            <Input placeholderTextColor={variables.brandPrimary} value={String(currentGPA)} style={{color: variables.brandPrimary}} placeholder="Current GPA"></Input>
                            
                        </Item>
                    </Form> 
                    : <React.Fragment />
                    }
                    <Button rounded onPress={() => {
                        this.handleSignOut()
                        console.log(this.props.currentUser.profile)
                    }} style={styles.logoutButton}>
                        <Text>
                            Log Out
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default withTracker( () => {
    return {
        userId: Meteor.userId(),
        currentUser: Meteor.user(),
        isLoggingIn: Meteor.loggingIn()
    }
})(Settings);