import React, { Component } from 'react';

import { Header, Left, Body, Right, Icon, Button, Text, Title } from 'native-base';
import variables from "../../native-base-theme/variables/commonColor";

import { commonStyles } from '../Styles';

class TabHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { iconName } = this.props;
        return (
            <Header style={{backgroundColor: variables.containerBgColor, height: 75, paddingTop: 15}}>
                <Left>
                </Left>
                <Body>
                    <Title style={commonStyles.greenText}>{this.props.headerTitle}</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name={iconName} onPress={() => {}} style={commonStyles.icon}/>
                    </Button>
                </Right>
            </Header>
        );
    }
}

export default TabHeader;

