import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, H1, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right, Toast, Picker } from 'native-base';
import { commonStyles } from '../../Styles';



class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            name: 'John Doe',

        }
    }

    render() {
        const { name } = this.state;
        return (
            <Container>
                <Card style={commonStyles.card}>
                    <H1 style={commonStyles.title}>
                        Welcome, {name}!
                    </H1>
                </Card>
                <Card style={commonStyles.card}>
                    <H2 style={commonStyles.title}>
                        Classification : Super Senior
                        Graduation: Spring 2019
                    </H2>
                </Card>
                <Card style={commonStyles.card}>
                    <H2 style={commonStyles.title}>
                        Current GPA: 3.69
                        Major GPA: 3.82
                    </H2>
                </Card>
            </Container>
        )
    }

}

export default Homepage;