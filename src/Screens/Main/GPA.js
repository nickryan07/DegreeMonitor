import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';
import Dialog from 'react-native-dialog';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Accordion, View, Content, Title, List, Button, SwipeRow, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';


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
        margin: 6,
        alignSelf: 'center'
    },
});

class GPA extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            showingAddSemester: false,
            newSemester: '',
            newYear: '',
        }
    }

    renderAddSemester = () => {
        const { showingAddSemester } = this.state;

        return (
            <Dialog.Container visible={showingAddSemester}>
                <Dialog.Title>
                    Add Semester
                </Dialog.Title>
                <Dialog.Description>
                    Add a new semester to begin adding courses.
                </Dialog.Description>
                <Dialog.Input onChangeText={(newSemester) => this.setState({newSemester})} placeholder="Session" />
                <Dialog.Input onChangeText={(newYear) => this.setState({newYear})} placeholder="Year" />
                <Dialog.Button label="Cancel" onPress={() => {this.setState({showingAddSemester: !showingAddSemester})}}/>
                <Dialog.Button label="Add" onPress={() => {this.addSemester()}}/>
            </Dialog.Container>
        );
    }

    renderAddCourse = () => {
        const { showingAddSemester } = this.state;

        return (
            <Dialog.Container visible={showingAddSemester}>
                <Dialog.Title>
                    Add Course
                </Dialog.Title>
                <Dialog.Description>
                    Add a new course result.
                </Dialog.Description>
                <Dialog.Input onChangeText={(newSemester) => this.setState({newSemester})} placeholder="Course Identifier" />
                <Dialog.Input onChangeText={(newYear) => this.setState({newYear})} placeholder="Grade Received" />
                <Dialog.Button label="Cancel" onPress={() => {this.setState({showingAddSemester: !showingAddSemester})}}/>
                <Dialog.Button label="Add" onPress={() => {this.addCourse()}}/>
            </Dialog.Container>
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
        const { showingAddSemester } = this.state;

        return (
            <Container>
                {this.renderAddSemester()}
                {this.renderAddCourse()}
                <Header headerTitle="Courses" iconName="md-add" iconAction={() => {this.setState({showingAddSemester: !showingAddSemester})}} />
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
                                <Button iconLeft rounded style={styles.addButton}>
                                    <Icon type="Entypo" name="add-to-list" />
                                    <Text>
                                        Add Course
                                    </Text>
                                </Button>
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