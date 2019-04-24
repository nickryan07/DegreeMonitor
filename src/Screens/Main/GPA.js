import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Accordion, View, Content, Title, List, Button, SwipeRow, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';

const dataArray = [
    { title: "Fall 2018", courses: ["CSE 4345", "A"] },
    { title: "Spring 2019", courses: [] },
    { title: "Summer 2019", courses: [] }
];

const testData = [
    { semester: 'Fall', year: '2018', courses: [
        ['CSE', '4314', 'A'],
        ['CSE', '4310', 'B'],
        ['CSE', '4305', 'A'],
        ['CSE', '4316', 'A'],
    ]},
    {semester: 'Spring', year: '2019', courses: [
        ['CSE', '4314', 'A'],
        ['CSE', '4310', 'B'],
        ['CSE', '4305', 'A'],
        ['CSE', '4316', 'A'],
    ]}
]

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

    renderCourses = courses => {
        return (
            courses.map((course, i) => (

                // <ListItem key={i}>
                //     <Text>{course[1]}</Text>
                // </ListItem>
                <SwipeRow
                style={{backgroundColor: variables.containerBgColor}}
                key={i}
                disableRightSwipe
                rightOpenValue={-75}
                body={
                    <View>
                      <Text style={{color: variables.brandPrimary}}>{course[1]}</Text>
                    </View>
                }
                right={
                    <Button danger onPress={() => alert('Trash')}>
                      <Icon active name="trash" />
                    </Button>
                }>
                
            </SwipeRow>
            ))
        )
    }

    render() {
        return (
            <Container>
                <Header headerTitle="Courses" iconName="md-add-circle-outline" iconAction={() => {}} />
                <Content>
                    
                        {testData.map((semester, i) => {
                            return(
                            <List key={i}>
                            <ListItem itemDivider style={{backgroundColor: variables.brandTextLight}}>
                                <Text >
                                    {String(semester.semester +  ' ' + semester.year)}
                                </Text>
                            </ListItem>
                            {this.renderCourses(semester.courses)}
                            </List>
                            )
                        })}
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