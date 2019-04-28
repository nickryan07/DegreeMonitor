import React, { Component } from 'react';

import { StyleSheet, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, Left, Picker, Grid, Row, Col } from 'native-base';
import { WaveIndicator } from 'react-native-indicators';
import { commonStyles } from '../../Styles';

import { alertError, alertSuccess } from '../../Alerts';



const platform = Platform.OS;
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loginTitle: {
        marginTop: 25,
        marginBottom: 15,
        alignSelf: 'center',
        color: variables.brandPrimary,
    },
    loginButton: {
        margin: 20,
        alignSelf: 'center'
    },
    formField: {
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
    },
    bgColor: {
        backgroundColor: variables.brandPrimary,
    },
    cardStyle: {
        backgroundColor: 'white',
    },
    activity: {
        margin: 12
    },
    logo: {
        marginBottom: 10,
        alignSelf: 'center'
    },
    gridItem: {
    },
    
    pickerAndroid: {
        color: variables.containerBgColor,
    },
    pickerIOS: {
    }
});
class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            major: 'Computer Science',
            fName: '',
            lName: '',
            netID: '',
            password: '',
            hours: '',
            gradePoints: '',

        }

    }

    onValueChange(value) {
        this.setState({
            major: value
        });
    }

    addUser = () => {
        const { password, netID, fName, lName, hours, currentGPA, major } = this.state;
        
        const data = {
            courses: [],
            username: netID,
            password: password, 
            firstName: fName,
            lastName: lName,
            hoursTaken: Number(hours),
            currentGPA: Number(currentGPA),
            major: major,
        }

        Accounts.createUser(data, (error) => {
            if(error) {
                alertError(error.reason);
            } else {
                alertSuccess('Account Created');
            }
        });
    }

    renderCreateContent = () => {
        const { netId, password, currentGPA, hours, fName, lName, major } = this.state;

        return (
            <Content padder>
                <Card style={commonStyles.card}>
                    
                    <H2 style={styles.loginTitle}>
                        Create an Account
                    </H2>

                    <Form>
                        <Grid>
                            <Row>
                                <Col item style={styles.gridItem}>
                                    <Item style={styles.formField}>
                                        <Input bordered placeholder="First Name" value={fName} onChangeText={(text) => this.setState({ fName: text })}/>
                                    </Item>
                                </Col>
                                <Col item style={styles.gridItem}>
                                    <Item style={styles.formField}>
                                        <Input placeholder="Last Name" value={lName} onChangeText={(text) => this.setState({ lName: text })}/>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Item /*floatingLabel*/ style={styles.formField}>
                                        <Input placeholder="NetID" textContentType="username" value={netId} onChangeText={(text) => this.setState({ netID: text })}/>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Item /*floatingLabel*/ style={styles.formField}> 
                                        <Input placeholder="Password" secureTextEntry textContentType="password"  value={password} onChangeText={(text) => this.setState({ password: text })}/>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>

                            
                                <Col style={{width: 80}}>
                                    <Left>
                                        <Text style={{marginTop: 23, marginLeft: 20, color: variables.containerBgColor}}>
                                            Major: 
                                        </Text>
                                    </Left>
                                </Col>
                                <Col>
                                    <Item style={styles.formField}>
                                        <Picker
                                            mode="dialog"
                                            iosHeader="Select major"
                                            iosIcon={<Icon style={commonStyles.greenText} name="arrow-down" />}
                                            itemTextStyle= {{ color: variables.brandPrimary}}
                                            headerStyle = {{ backgroundColor: variables.containerBgColor}}
                                            textStyle = {{ color: variables.containerBgColor}}
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
                                <Col item style={styles.gridItem}>
                                    <Item style={styles.formField}>
                                        <Input id='hours' placeholder="Hours Completed" keyboardType='number-pad' value={hours} onChangeText={(text) => this.setState({ hours: text })}/>
                                    </Item>
                                </Col>
                                <Col item style={styles.gridItem}>
                                    <Item style={styles.formField}>
                                        <Input placeholder="Current GPA" keyboardType='decimal-pad' value={currentGPA} onChangeText={(text) => this.setState({ currentGPA: text })}/>
                                    </Item>
                                </Col>
                            </Row>
                        </Grid>
                    </Form>
                    {this.state.loggingIn ? <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/> :
                    <Button rounded onPress={() => {
                        this.addUser()
                    }} style={styles.loginButton}>
                        <Text>
                            Create Account
                        </Text>
                    </Button>

                    }
                </Card>
            </Content>
        )
    }

    render() {
        return (
            <Container>
                {this.renderCreateContent()}
            </Container>
        )
    }
}

export default withTracker( () => {
    return {
        userId: Meteor.userId(),
        currentUser: Meteor.user(),
        isLoggingIn: Meteor.loggingIn()
    }
})(CreateAccount);