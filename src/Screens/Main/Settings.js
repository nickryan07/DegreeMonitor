import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
// import { Container, H2, Icon, Form, Text, Input, Item, Content, Card, Button, Body, ListItem, Left, Right, Toast, Picker, Grid, Label } from 'native-base';
import { Container, Header, Input, Form, Label, Picker, Content, List, Button, Item, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
// import { Switch } from 'react-native-base-switch';
import { WaveIndicator } from 'react-native-indicators';
import { commonStyles } from '../../Styles';

import { alertError, alertSuccess } from '../../Alerts';

const styles = StyleSheet.create({
    listItemStyle: {
        minWidth: 80
    }
});

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'Computer Science',
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        const { selected } = this.state;
        return (
            <Container style={commonStyles.container}>
                
                <Content>
                    <Form>
                <Item >
                    <Left>
                        <Text style={commonStyles.lightText}>First Name</Text>
                    </Left>
                        
                    <Input label="First Name" placeholderTextColor={variables.brandPrimary} placeholder="Current Name"></Input>
                    
                </Item>
                <Item >
                    <Left>
                        <Text style={commonStyles.lightText}>Last Name</Text>
                    </Left>
                    
                        
                    <Input placeholderTextColor={variables.brandPrimary} placeholder="Current Last Name"></Input>
                    
                </Item>
                <Item >
                    <Left>
                        <Text style={commonStyles.lightText}>
                            Major: 
                        </Text>
                    </Left>
                    <Body>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select major"
                            iosIcon={<Icon style={commonStyles.greenText} name="arrow-down" />}
                            itemTextStyle= {{ color: variables.brandPrimary}}
                            headerStyle = {{ backgroundColor: variables.containerBgColor}}
                            textStyle = {{ color: variables.brandPrimary}}
                            style={{ maxWidth: 200 }}
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
                    </Body>
                </Item>
                </Form>
                </Content>
            </Container>
        );
    }
}

export default Settings;