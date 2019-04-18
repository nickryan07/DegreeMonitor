import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right, Toast, Picker, Grid, Label } from 'native-base';
import { Switch } from 'react-native-base-switch';
import { WaveIndicator } from 'react-native-indicators';
import { commonStyles } from '../../Styles';

import { alertError, alertSuccess } from '../../Alerts';


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
        marginLeft: 20,
        marginRight: 20,
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
        marginLeft: 5,
        marginRight: 5
    }
});
class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'Computer Science',
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
            selected: value
        });
    }

    addUser = () => {
        const { password, netID, fName, lName, hours, totalGradePoints, major } = this.state;

        const data = {
            courses: [],
            username: netID,
            password: password, 
            firstName: fName,
            lastName: lName,
            hoursTaken: Number(hours),
            totalGradePoints: Number(totalGradePoints),
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
        const { netId, password, totalGradePoints, hours, fName, lName, selected } = this.state;

        return (
            <Content padder>
                <Card style={commonStyles.card}>
                    
                <H2 style={styles.loginTitle}>
                        Create an Account
                    </H2>

                    <Form>
                            <Item style={styles.formField}>
                        <Grid>
                            <Grid container>
                                <Grid item style={styles.gridItem}>
                                    <Input bordered placeholder="First Name" value={fName} onChangeText={(text) => this.setState({ fName: text })}/>
                                </Grid>
                                <Grid item style={styles.gridItem}>
                                    <Input placeholder="Last Name" value={lName} onChangeText={(text) => this.setState({ lName: text })}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Item>
                        <Item /*floatingLabel*/ style={styles.formField}>
                            <Input placeholder="NetID" textContentType="username" value={netId} onChangeText={(text) => this.setState({ netID: text })}/>
                        </Item>
                        <Item /*floatingLabel*/ style={styles.formField}> 
                            <Input placeholder="Password" secureTextEntry textContentType="password"  value={password} onChangeText={(text) => this.setState({ password: text })}/>
                        </Item>
                        <ListItem style={styles.formField}>
                            <Left>
                                
                                <Text>
                                    Major: 
                                </Text>
                            </Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select major"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ minWidth: 200 }}
                                    itemTextStyle= {{ color: variables.brandPrimary}}
                                    headerStyle = {{ backgroundColor: variables.containerBgColor}}
                                    headerBackButtonTextStyle= {{ color: variables.brandPrimary }}
                                    headerTitleStyle={{ color: '#ffffff' }}
                                    selectedValue={selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                    {/* TODO: load these from the back end? */}
                                    <Picker.Item label="Computer Engineering" value="Computer Engineering" />
                                    <Picker.Item label="Computer Science" value="Computer Science" />
                                    <Picker.Item label="Software Engineering" value="Software Engineering" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <Item /*floatingLabel*/ style={styles.formField}>
                            <Grid>
                                <Grid container>
                                    <Grid item style={styles.gridItem}>
                                        <Input id='hours' placeholder="Hours Completed" keyboardType='number-pad' value={hours} onChangeText={(text) => this.setState({ hours: text })}/>
                                    </Grid>
                                    <Grid item style={styles.gridItem}>
                                        <Input placeholder="Grade Points" keyboardType='number-pad' value={totalGradePoints} onChangeText={(text) => this.setState({ totalGradePoints: text })}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Item>
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