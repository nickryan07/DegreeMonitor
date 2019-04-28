import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right } from 'native-base';
import { Switch } from 'react-native-base-switch';
import { WaveIndicator } from 'react-native-indicators';
import { commonStyles } from '../../Styles';

import { alertError } from '../../Alerts';


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
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
    
    activity: {
        margin: 12
    },
    logo: {
        marginBottom: 10,
        alignSelf: 'center'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            netId: '',
            password: '',
            hidePassword: true,
            loggingIn: false,
        }
    }

    handleTextChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    

    handleUserChange = (text) => {
        this.setState({netId: text});
    }

    handlePasswordChange = (text) => {
        this.setState({password: text});
    }

    handleSignIn = () => {
        const { netId, password } = this.state;

        Meteor.loginWithPassword(netId, password, (error) => {
            if(error) {
                alertError(error.reason);
            }
        });
    }

    isLoggingIn = () => {
        Accounts.onLogin((res) => {
            if(Meteor.userId()) {
                this.props.navigation.navigate('Homepage');
            }
        });
    }

    componentWillMount() {
        this.isLoggingIn();
    }

    renderLoginContent = () => {
        const { hidePassword, netId, password } = this.state;

        return (
            <Content padder>
                <Card style={commonStyles.card}>
                    
                <H2 style={commonStyles.title}>
                        Degree Monitor
                    </H2>
                    <Image source={require('../../../assets/icon-login.png')} style={styles.logo}/>

                    <Form >
                        <Item rounded /*floatingLabel*/ style={commonStyles.formField}>
                            <Input placeholder="NetID" textContentType="username" value={netId} onChangeText={this.handleUserChange}/>
                        </Item>
                        <Item rounded /*floatingLabel*/ style={styles.formField}> 
                            <Input placeholder="Password" secureTextEntry={hidePassword} textContentType="password"  value={password} onChangeText={this.handlePasswordChange}/>
                        </Item>
                        <ListItem style={styles.formField}>
                            <Left>
                                <Text>Show password?</Text>
                            </Left>
                            <Right>
                                <Switch active={hidePassword} onChangeState={() => {this.setState({hidePassword: !hidePassword})}} inactiveButtonColor={variables.brandPrimary} inactiveButtonPressedColor={variables.brandPrimary}></Switch>
                            </Right>
                        </ListItem>
                        <ListItem style={styles.formField} onPress={() => {this.props.navigation.navigate('CreateAccount')}}>
                            <Left>
                                <Text>Create Account</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />    
                            </Right>
                        </ListItem>
                    </Form>
                    {this.props.isLoggingIn ? <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/> :
                    <Button rounded onPress={() => {
                        this.handleSignIn()
                    }} style={styles.loginButton}>
                        <Text>
                            Login
                        </Text>
                    </Button>
                    
                    }
                </Card>
            </Content>
        )
    }

    render() {

        return (
            <Container style={commonStyles.container} scrollEnabled={false}>
                
                {this.renderLoginContent()}
                <StatusBar barStyle="light-content"/>
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
})(Login);