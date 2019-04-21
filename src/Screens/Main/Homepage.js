import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, H1, H3, Icon, Form, Text, Input, Item, Content, Card, Button, ListItem, Left, Right, Toast, Picker } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';



class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            name: props.currentUser.profile.firstName,

        }
    }

    /**
     * TODO: needs testing
     */
    getClassification = () => {
        if(!this.props.currentUser) {
            return "Unknown";
        }
        if(this.props.currentUser.profile.hoursTaken <= 30) {
            return "Freshman";
        } else if(this.props.currentUser.profile.hoursTaken <= 60) {
            return "Sophmore";
        } else if(this.props.currentUser.profile.hoursTaken <= 90) {
            return "Junior";
        } else if(this.props.currentUser.profile.hoursTaken <= 160) {
            return "Senior";
        }
    }

    render() {
        const { name } = this.state;
        return (
            <Container>
                <Header headerTitle="Home" iconName="ios-home"/>
                <Content padder>
                    <Card style={commonStyles.card}>
                        <H1 style={commonStyles.title}>
                            Welcome, {this.props.currentUser.profile.firstName}!
                        </H1>
                    </Card>
                    <Card style={commonStyles.card}>
                        <H2 style={commonStyles.title}>
                            Classification : {this.getClassification()}
                            {"\n"}
                            Graduation: Spring 2019
                        </H2>
                    </Card>
                    <Card style={commonStyles.card}>
                        <H3 style={commonStyles.title}>
                            Current GPA: {this.props.currentUser.profile.currentGPA}
                            {"\n"}
                            Major GPA: TODO
                        </H3>
                    </Card>
                </Content>
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
})(Homepage);