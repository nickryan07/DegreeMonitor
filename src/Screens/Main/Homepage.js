import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, Easing } from 'react-native';
import Meteor, { Accounts, withTracker } from 'react-native-meteor';

import variables from "../../../native-base-theme/variables/commonColor";
import { Container, H2, H1, H3, Icon, Form, Text, Input, Item, Content, Card, CardItem, Button, ListItem, Left, Right, Toast, Picker } from 'native-base';
import { commonStyles } from '../../Styles';
import Header from '../../Components/Header';

import { AnimatedCircularProgress } from 'react-native-circular-progress';


class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            fill: Math.round((props.currentUser.profile.hoursTaken/121)*100),
        }
    }

    componentDidMount() {
        this.circularProgress.animate(Math.round((this.props.currentUser.profile.hoursTaken/121)*100), 2500, Easing.quad);
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

    renderHomeContent = () => {
        return (
            <Content padder>
                <Card style={commonStyles.card}>
                    <H1 style={commonStyles.title}>
                        Welcome, {this.props.currentUser.profile.firstName}!
                    </H1>
                    </Card>
                    <AnimatedCircularProgress
                        style={commonStyles.cardBody}
                        ref={(ref) => this.circularProgress = ref}
                        size={140}
                        width={12}
                        fill={Math.round((this.props.currentUser.profile.hoursTaken/121)*100)}
                        tintColor={variables.brandPrimary}
                        onAnimationComplete={() => {}}
                        backgroundColor={variables.containerBgColor}>
                        {
                            (fill) => (
                                <Text style={{color: '#d3d3d3'}}>
                                    { Math.round((this.props.currentUser.profile.hoursTaken/121)*100) } %
                                    {'\n'}
                                    Complete
                                </Text>
                            )
                        }
                        </AnimatedCircularProgress>
                    <Card style={commonStyles.cardItem}>
                    <CardItem bordered style={commonStyles.cardItem}>
                        <Icon active type="MaterialIcons" name="class" style={commonStyles.cardIcon} />
                        <Text style={commonStyles.lightText}>
                            Classification:
                        </Text>
                        <Right>
                            <Text style={commonStyles.greenText}>
                                {this.getClassification()}
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered style={commonStyles.cardItem}>
                        <Icon active type="FontAwesome" name="graduation-cap" style={commonStyles.cardIcon} />
                        <Text style={commonStyles.lightText}>
                            Graduation:
                        </Text>
                        <Right>
                            <Text style={commonStyles.greenText}>
                                Spring 2019
                            </Text>
                        </Right>
                        
                    </CardItem>
                    <CardItem bordered style={commonStyles.cardItem}>
                        <Icon active type="Ionicons" name="ios-star" style={commonStyles.cardIcon} />
                        <Text style={commonStyles.lightText}>
                            Current GPA: 
                        </Text>
                        <Right>
                            <Text style={commonStyles.greenText}>
                                {this.props.currentUser.profile.currentGPA}
                            </Text>
                        </Right>
                        </CardItem>
                    <CardItem bordered style={commonStyles.cardItem}>
                        <Icon active type="Ionicons" name="ios-star" style={commonStyles.cardIcon} />
                        <Text style={commonStyles.lightText}>
                            Major GPA: 
                        </Text>
                        <Right>
                            <Text style={commonStyles.greenText}>
                                3.82
                            </Text>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        );
    }

    render() {

        return (
            <Container>
                <Header headerTitle="Home" iconName="ios-home" iconAction={() => {}}/>
                
                {this.props.currentUser ? this.renderHomeContent() : <React.Fragment />}
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