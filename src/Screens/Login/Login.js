import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right, Toast } from 'native-base';
import { Switch } from 'react-native-base-switch';
import { WaveIndicator } from 'react-native-indicators';


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
        margin: 20,
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

    

    handleUserChange = (text) => {
        this.setState({netId: text})
    }

    handlePasswordChange = (text) => {
        this.setState({password: text})
    }

    handleSignIn = () => {
        this.setState({loggingIn: true})
    }

    renderLoginContent = () => {
        const { hidePassword, netId, password } = this.state;

        return (
            <Content padder>
                <Card style={styles.cardStyle}>
                <Content>
                    
                <H2 style={styles.loginTitle}>
                        Degree Monitor
                    </H2>
                    <Image source={require('../../../assets/icon-login.png')} style={styles.logo}/>

                    <Form>
                        <Item regular /*floatingLabel*/ style={styles.formField}>
                            <Input placeholder="NetID" textContentType="username" value={netId} onChangeText={this.handleUserChange}/>
                        </Item>
                        <Item regular /*floatingLabel*/ style={styles.formField}> 
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
                    {this.state.loggingIn ? <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/> :
                    <Button rounded onPress={() => {
                        this.handleSignIn()
                        //this.props.navigation.navigate('RoutineList')
                    }} style={styles.loginButton}>
                        <Text>
                            Login
                        </Text>
                    </Button>

                    }
                    </Content>
                </Card>
            </Content>
        )
    }

    render() {

        return (
            <Container style={styles.container}>
                
                {this.renderLoginContent()}
                <StatusBar barStyle="light-content"/>
            </Container>
        );
    }
}

export default Login;