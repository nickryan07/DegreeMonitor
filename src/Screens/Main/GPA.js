import React, { Component } from 'react';

import { StyleSheet, StatusBar, Image, TextInput, Platform } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';
import Dialog from 'react-native-dialog';
import { WaveIndicator } from 'react-native-indicators';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Accordion, View, Content, Title, List, Button, SwipeRow, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';



const styles = StyleSheet.create({
    accordion: {
        marginTop: 100,
    },
    headerStyle: {
        backgroundColor: variables.containerBgColor,
    },
    addButton: {
        margin: 6,
        alignSelf: 'center',
    },
});

class GPA extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            showingAddSemester: false,
            showingAddCourse: false,
            newSemester: '',
            newYear: '',
            newCourse: '',
            newCourseGrade: '',
            selectedSemester: '',
        }
    }

    addSemester = () => {
        const { newSemester, newYear, showingAddSemester} = this.state;

        Meteor.call('addSemester', newSemester, newYear, (err) => {
            //console.log(err);
        });
        this.setState({
            showingAddSemester: !showingAddSemester,
            newSemester: '',
        });
    }

    addCourse = () => {
        const { newCourse, newCourseGrade, showingAddCourse, selectedSemester} = this.state;
        if(selectedSemester === '') {
            return;
        }
        Meteor.call('addCourse', newCourse, newCourseGrade, selectedSemester, (err) => {
            //console.log(err);
        });
        this.setState({
            showingAddCourse: !showingAddCourse,
            newCourse: '',
            newCourseGrade: '',
            selectedSemester: '',
        });
    }

    removeCourse = courseId => {
        Meteor.call('removeCourse', courseId, (err) => {
            //console.log(err);
        });
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
        const { showingAddCourse } = this.state;

        return (
            <Dialog.Container visible={showingAddCourse}>
                <Dialog.Title>
                    Add Course
                </Dialog.Title>
                <Dialog.Description>
                    Add a new course result.
                </Dialog.Description>
                <Dialog.Input onChangeText={(newCourse) => this.setState({newCourse})} placeholder="Course Identifier" />
                <Dialog.Input onChangeText={(newCourseGrade) => this.setState({newCourseGrade})} placeholder="Grade Received" />
                <Dialog.Button label="Cancel" onPress={() => {this.setState({showingAddCourse: !showingAddCourse})}}/>
                <Dialog.Button label="Add" onPress={() => {this.addCourse()}}/>
            </Dialog.Container>
        );
    }

    renderCourses = (semesterId) => {
        let courses = this.props.currentUser.profile.courses.filter(course => {
            //console.log(course.semesterId, semesterId, course.semesterId._str === semesterId._str)
            return course.semesterId._str === semesterId._str;
        });
        if(courses.length === 0) {
            return;
        }
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
                      <Text style={{color: variables.brandPrimary}}>{course.courseName}</Text>
                    </View>
                }
                right={
                    <Button danger onPress={() => {this.removeCourse(course._id)}}>
                      <Icon active name="trash" />
                    </Button>
                }>
            </SwipeRow>
            ))
        )
    }

    getGradePoints = (grade) => {
        switch(grade) {
            case 'A':
                return 4;
            case 'B':
                return 3;
            case 'C':
                return 2;
            case 'D':
                return 1;
            case 'F':
                return 0;
            default:
                return 0;
        }
    }

    getCreditHours = (course) => {
        let courseCode = course.split(' ')[1];
        return Number(courseCode.charAt(1));
    }

    calculateGPA = (semesterId) => {
        let courses = this.props.currentUser.profile.courses.filter(course => {
            return course.semesterId._str === semesterId._str;
        });
        if(courses.length === 0) {
            return "GPA: " + String(parseFloat(Math.round((0) * 100) / 100).toFixed(2));
        } else {
            let gradePoints = 0, creditHours = 0;
            courses.map((course, i) => {
                gradePoints += (this.getGradePoints(course.courseGrade)*this.getCreditHours(course.courseName));
                creditHours += this.getCreditHours(course.courseName);
            });
            if(creditHours === 0) {
                return "GPA: " + String(parseFloat(Math.round((0) * 100) / 100).toFixed(2));
            }
            return "GPA: " + String(parseFloat(Math.round((gradePoints/creditHours) * 100) / 100).toFixed(2));
        }
    }

    render() {
        const { showingAddSemester, showingAddCourse } = this.state;

        return (
            <Container>
                {this.renderAddSemester()}
                {this.renderAddCourse()}
                <Header headerTitle="Courses" iconName="md-add" iconAction={() => {this.setState({showingAddSemester: !showingAddSemester})}} />
                <Content>
                    
                        {this.props.currentUser ? this.props.currentUser.profile.semestersGPA.map((semester, i) => {
                            return(
                            <List key={i}>
                                <ListItem itemDivider style={{backgroundColor: variables.brandTextLight}}>
                                    <Left>
                                    <Text>
                                        {String(semester.semesterName + ' ' + semester.semesterYear)}
                                    </Text>
                                    </Left>
                                    <Right>
                                        
                                    <Text >
                                        {this.calculateGPA(semester._id)}
                                    </Text>
                                    </Right>
                                
                                </ListItem>
                                {this.renderCourses(semester._id)}
                                <Button iconLeft rounded style={styles.addButton} onPress={() => {
                                    this.setState({selectedSemester: semester._id}, () => {
                                        this.setState({showingAddCourse: !showingAddCourse})
                                    })}}>
                                    <Icon type="Entypo" name="add-to-list" />
                                    <Text>
                                        Add Course
                                    </Text>
                                </Button>
                            </List>
                            )
                        }): <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/>}
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