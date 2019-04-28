import React, { Component } from 'react';

import { StyleSheet, Platform } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { WaveIndicator } from 'react-native-indicators';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, Item, Input, Picker, Content, Form, DatePicker, Text, Icon, Grid, Row, Col } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';
import { alertError, alertSuccess } from '../../Alerts';


const platform = Platform.OS;
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    listItemStyle: {
        minWidth: 80
    }, 
    logoutButton: {
        margin: 50,
        alignSelf: 'center'
    },
    semesterRow: {
        backgroundColor: variables.brandTextLight,
        paddingBottom: 12,
        marginBottom: 10
    },
    pickerAndroid: {
        color: variables.brandPrimary,
    },
    pickerIOS: {
        marginTop: 5
    },
    settingsLabel: {
        width: 155
    },
    formField: {
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
    },
    saveIcon: {
        color: variables.containerBgColor,
        alignSelf: 'center',
        marginTop: 20
    },
    dateRow: {
        marginBottom: 10
    }
});
class Advising extends Component {
    constructor(props) {
        super(props);

        this.state = {
            semesterYear: this.props.currentUser.profile.semestersAdvising.semesterYear,
            semesterName: this.props.currentUser.profile.semestersAdvising.semesterName,
            startDate: this.props.currentUser.profile.advisingDates.startDate,
            censusDate: this.props.currentUser.profile.advisingDates.censusDate,
            dropDate: this.props.currentUser.profile.advisingDates.dropDate,
            advisingDate: this.props.currentUser.profile.advisingDates.advisingDate,
            graduationDate: this.props.currentUser.profile.advisingDates.graduationDate,
            finalsDate: this.props.currentUser.profile.advisingDates.finalsDate,
        }
    }

    onValueChange(value) {
        this.setState({
            semesterName: value
        });
    }

    updateSemester = () => {
        const { semesterName, semesterYear } = this.state;
        let data = {
            semesterName: semesterName,
            semesterYear: semesterYear,
        }
        Meteor.call('updateAdvisingSemester', data, (err) => {
            if(err) {
                alertError(err.reason);
            } else {
                alertSuccess('Semester Updated!');
            }
        });
    }

    formatDate = (date) => {
        if(Object.prototype.toString.call(date) === '[object Date]')
            return (date.getMonth()+1) + '/'+ (date.getDate()) + '/' +  date.getFullYear();
        else
            return ''
    }

    render() {
        const { semesterYear, semesterName, censusDate, dropDate, advisingDate, finalsDate, graduationDate, startDate } = this.state;
        return (
            <Container style={styles.container}>
            <Header headerTitle="Advising" iconName="ios-person" iconAction={() => {}} />
            <Content>
                    {this.props.currentUser ? 
                        <Form>
                            <Grid>
                                <Row style={styles.semesterRow}>
                                    <Col>
                                        <Item style={styles.formField}>
                                            <Picker
                                                mode="dialog"
                                                iosHeader="Select session"
                                                itemTextStyle= {{ color: variables.brandPrimary}}
                                                headerStyle = {{ backgroundColor: variables.containerBgColor}}
                                                textStyle = {{ color: variables.containerBgColor}}
                                                style={ platform === "ios" ? styles.pickerIOS : styles.pickerAndroid}
                                                headerBackButtonTextStyle= {{ color: variables.brandPrimary }}
                                                headerTitleStyle={{ color: '#ffffff' }}
                                                selectedValue={semesterName}
                                                onValueChange={this.onValueChange.bind(this)}
                                                >
                                                <Picker.Item label="Spring" value="Spring" />
                                                <Picker.Item label="Summer" value="Summer" />
                                                <Picker.Item label="Fall" value="Fall" />
                                                <Picker.Item label="Winter" value="Winter" />
                                            </Picker>
                                        </Item>    
                                    </Col>
                                    <Col>
                                        <Item style={styles.formField}>
                                            <Input placeholder="Year" value={semesterYear} onChangeText={(text) => this.setState({ semesterYear: text })}/>
                                        </Item>
                                    </Col>
                                    <Col>

                                            <Icon name="ios-save" style={styles.saveIcon} onPress={() => this.updateSemester()}/>
                                    </Col>
                                </Row>
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Start Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(startDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({startDate: date}, () => {
                                                        let data = {
                                                            censusDate: censusDate,
                                                            graduationDate: graduationDate,
                                                            startDate: date,
                                                            finalsDate: finalsDate,
                                                            dropDate: dropDate,
                                                            advisingDate: advisingDate
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {
                                                            
                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                                
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Census Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(censusDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({censusDate: date}, () => {
                                                        let data = {
                                                            censusDate: date,
                                                            graduationDate: graduationDate,
                                                            startDate: startDate,
                                                            finalsDate: finalsDate,
                                                            dropDate: dropDate,
                                                            advisingDate: advisingDate
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {
                                                            
                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Drop Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(dropDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({dropDate: date}, () => {
                                                        let data = {
                                                            censusDate: censusDate,
                                                            graduationDate: graduationDate,
                                                            startDate: startDate,
                                                            finalsDate: finalsDate,
                                                            dropDate: date,
                                                            advisingDate: advisingDate
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {
                                                            
                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Advising Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(advisingDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({advisingDate: date}, () => {
                                                        let data = {
                                                            censusDate: censusDate,
                                                            graduationDate: graduationDate,
                                                            startDate: startDate,
                                                            finalsDate: finalsDate,
                                                            dropDate: dropDate,
                                                            advisingDate: date
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {
                                                            
                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Graduation Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(graduationDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({graduationDate: date}, () => {
                                                        let data = {
                                                            censusDate: censusDate,
                                                            graduationDate: date,
                                                            startDate: startDate,
                                                            finalsDate: finalsDate,
                                                            dropDate: dropDate,
                                                            advisingDate: advisingDate
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {
                                                            
                                            
                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row style={styles.dateRow}>
                                    <Col style={styles.settingsLabel}>
                                        <Text style={commonStyles.settingsItem}>Finals Date:</Text>
                                    </Col>
                                    <Col>
                                        <Item> 
                                            {/* <Input label="Census Date" placeholderTextColor={variables.brandPrimary} value={censusDate} style={{color: variables.brandPrimary}} placeholder="Census Date" onChangeText={(text) => this.setState({ fName: text })}></Input> */}
                                            <DatePicker
                                                defaultDate={new Date(2019, 1, 1)}
                                                minimumDate={new Date(2015, 1, 1)}
                                                maximumDate={new Date(2024, 12, 31)}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                formatChosenDate={(date) => this.formatDate(date)}
                                                placeHolderText={this.formatDate(finalsDate)}
                                                textStyle={commonStyles.greenText}
                                                placeHolderTextStyle={commonStyles.greenText}
                                                onDateChange={(date) => {
                                                    this.setState({finalsDate: date}, () => {
                                                        let data = {
                                                            censusDate: censusDate,
                                                            graduationDate: graduationDate,
                                                            startDate: startDate,
                                                            finalsDate: date,
                                                            dropDate: dropDate,
                                                            advisingDate: advisingDate
                                                        }
                                                        Meteor.call('changeDates', data, (err) => {

                                                        })
                                                    })
                                                }
                                                }
                                                disabled={false}
                                                />
                                        </Item>
                                    </Col>
                                </Row>
                            </Grid>
                            
                            {
                                //this.renderDates(semester._id)
                            }
                        </Form>
                    : <WaveIndicator style={styles.activity} color={variables.brandPrimary} waveMode='outline' count={3} waveFactor={0.6}/>}
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
})(Advising);