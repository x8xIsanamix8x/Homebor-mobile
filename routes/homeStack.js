import { createStackNavigator} from 'react-navigation-stack';
import About from '../screens/about';
import Header from '../shared/header';
import React from 'react';
import Calendar from '../screens/Calendar';

const screens = {
    Calendar: {
        screen: Calendar,
        navigationOptions:({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='About GameZone' />,
            }
        }
    },
    
}


export default HomeStack;