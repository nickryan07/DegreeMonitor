import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Accordion, View, Input, Form, Label, Picker, Content, Title, List, Button, Item, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';
import { alertError, alertSuccess } from '../../Alerts';

const dataArray = [
    { title: "Fall 2018", courses: ["CSE 4345", "A"] },
    { title: "Spring 2019", courses: [] },
    { title: "Summer 2019", courses: [] }
];

const styles = StyleSheet.create({
    accordion: {
        marginTop: 100,
    },
    headerStyle: {
        backgroundColor: variables.containerBgColor,
    },
    addButton: {
        margin: 20,
        alignSelf: 'center'
    },
});

class GPA extends Component { 
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center" ,
                //backgroundColor: "#A9DAD6" }}>
                backgroundColor: variables.brandTextLight }}>
                <Text style={{ fontWeight: "600", color: variables.containerBgColor }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="arrow-down" />
                    : <Icon style={{ fontSize: 18 }} name="arrow-up" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <Content>

                <Text
                    style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic",
                    }}
                >
                    {item.courses[0]}
                </Text>
                <Button rounded onPress={() => {
                    //this.handleSignOut()
                    //console.log(this.props.currentUser.profile)
                }} style={styles.addButton}>
                    <Text>
                        Add Course
                    </Text>
                </Button>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                <Header headerTitle="Courses" iconName="md-add-circle-outline" iconAction={() => {}} />
                <Content padder>
                    <Accordion
                        dataArray={dataArray}
                        expanded={0}
                        headerStyle={styles.headerStyle}
                        renderHeader={this._renderHeader} 
                        renderContent={this._renderContent}/>
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
})(GPA);