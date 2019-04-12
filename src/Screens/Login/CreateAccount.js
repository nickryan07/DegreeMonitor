import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image } from 'react-native';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right, Toast, Picker } from 'native-base';
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
    },
    activity: {
        margin: 12
    },
    logo: {
        marginBottom: 10,
        alignSelf: 'center'
    }
});
class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'key1'
        }

    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    renderCreateContent = () => {
        const { hidePassword, netId, password } = this.state;

        return (
            <Content padder>
                <Card style={styles.cardStyle}>
                    
                <H2 style={styles.loginTitle}>
                        Create an Account
                    </H2>

                    <Form>
                        <Item /*floatingLabel*/ style={styles.formField}> 
                            <Input placeholder="Name" value={password} onChangeText={this.handlePasswordChange}/>
                        </Item>
                        <Item /*floatingLabel*/ style={styles.formField}>
                            <Input placeholder="NetID" textContentType="username" value={netId} onChangeText={this.handleUserChange}/>
                        </Item>
                        <Item /*floatingLabel*/ style={styles.formField}> 
                            <Input placeholder="Password" secureTextEntry={hidePassword} textContentType="password"  value={password} onChangeText={this.handlePasswordChange}/>
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
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                    {/* TODO: load these from the back end? */}
                                    <Picker.Item label="Computer Engineering" value="key0" />
                                    <Picker.Item label="Computer Science" value="key1" />
                                    <Picker.Item label="Software Engineering" value="key2" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <Item /*floatingLabel*/ style={styles.formField}> 
                            <Input placeholder="Hours Completed" value={password} onChangeText={this.handlePasswordChange}/>
                        </Item>
                    </Form>
                    {this.state.loggingIn ? <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/> :
                    <Button rounded onPress={() => {
                        this.handleSignIn()
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

export default CreateAccount;