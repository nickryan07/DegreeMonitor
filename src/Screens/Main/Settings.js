import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Input, Grid, Row, Col, Form, Label, Picker, Content, Title, List, Button, Item, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';
import { alertError, alertSuccess } from '../../Alerts';


const platform = Platform.OS;
const styles = StyleSheet.create({
    listItemStyle: {
        minWidth: 80
    }, 
    logoutButton: {
        margin: 50,
        alignSelf: 'center'
    },
    pickerAndroid: {
        color: variables.brandPrimary,
    },
    pickerIOS: {

    },
    settingsLabel: {
        width: 155
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

    handleSaveProfile = () => {
        const { fName, lName, hoursTaken, currentGPA, major } = this.state;
        
        const data = {
            firstName: fName,
            lastName: lName,
            hoursTaken: Number(hoursTaken),
            currentGPA: Number(currentGPA),
            major: major,
        }

        Meteor.call('updateProfile', data, (err) => {
            if(err) {
                alertError(err.reason);
            } else {
                alertSuccess('Profile Updated!');
            }

        });
    }

    onValueChange(value) {
        this.setState({
            major: value
        });
    }

    renderSettingsContent = () => {
        const { fName, lName, hoursTaken, currentGPA, major } = this.state;
        return (
            <Content padder>
            {this.props.currentUser ? 
                <Form>
                    <Grid>
                        <Row>
                            <Col style={styles.settingsLabel}>
                                <Text style={commonStyles.settingsItem}>First Name:</Text>
                            </Col>
                            <Col>
                                <Item> 
                                    <Input label="First Name" placeholderTextColor={variables.brandPrimary} value={fName} style={{color: variables.brandPrimary}} placeholder="Current First Name" onChangeText={(text) => this.setState({ fName: text })}></Input>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.settingsLabel}>
                                <Text style={commonStyles.settingsItem}>Last Name:</Text>
                            </Col>
                            <Col>
                                <Item>   
                                    <Input placeholderTextColor={variables.brandPrimary} value={lName} style={{color: variables.brandPrimary}} placeholder="Current Last Name" onChangeText={(text) => this.setState({ lName: text })}></Input>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.settingsLabel}>
                                <Text style={commonStyles.settingsPicker}>
                                    Major: 
                                </Text>
                            </Col>
                            <Col>
                                <Item>
                                    <Picker
                                        mode="dialog"
                                        iosHeader="Select major"
                                        iosIcon={<Icon style={commonStyles.brandPrimary} name="arrow-down" />}
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
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col style={styles.settingsLabel}>
                                <Text style={commonStyles.settingsItem}>Hours Completed:</Text>
                            </Col>
                            <Col>    
                                <Item>   
                                    <Input placeholderTextColor={variables.brandPrimary} value={String(hoursTaken)} style={{color: variables.brandPrimary}} placeholder="Hours Completed" onChangeText={(text) => this.setState({ hoursTaken: text })}></Input>
                                </Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={styles.settingsLabel}>
                                <Text style={commonStyles.settingsItem}>Current GPA:</Text>
                            </Col>
                            <Col>
                                <Item> 
                                    <Input placeholderTextColor={variables.brandPrimary} value={String(currentGPA)} style={{color: variables.brandPrimary}} placeholder="Current GPA" onChangeText={(text) => this.setState({ currentGPA: text })}></Input>
                                </Item>
                            </Col>
                        </Row>
                    </Grid>
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
        );
    }

    render() {
        const { fName, lName, hoursTaken, currentGPA, major } = this.state;
        return (
            <Container style={commonStyles.container}>
                {this.props.currentUser ? <Header headerTitle="Settings" iconName="ios-save" iconAction={() => {this.handleSaveProfile()}} />
                    : <React.Fragment />}
                {this.props.currentUser ?this.renderSettingsContent() : <React.Fragment />}
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